"use strict";

class enemy {
	constructor(){
		this.armorClass = 1;
		this.damageResistance = 0;
		this.damageDie = 1;
		this.goldDie = 4;
		this.health = 1;
		this.hitBonus = 0;
		this.isChargingMove = false;
		this.isFatigued = false;
		this.lootArray = [itemHealthPotion, weaponSteelLongsword];
		this.name = "Enemy";
		this.specialDamageDie = 1;
		this.statusInfliction = "none";
	}

	awardLoot(playerObject){
		let arraySize = this.lootArray.size;
		playerObject.inventory.push(this.lootArray[rollDie(arraySize-1)])
	}

	rollDamage(){
		return rollDie(this.damageDie);
	}

	willAttack(){
		return true;
	}
}

class enemyBlob extends enemy {
	constructor(){
		super();
		this.goldDie = 1;
		this.name = "Blob";
	}
}

class enemyGoblin extends enemy {
	constructor(){
		super()
		this.armorClass = 10;
		this.damageDie = 6;
		this.goldDie = 6;
		this.health = 20;
		this.hitBonus = 2;
		this.isFatigued = false;
		this.name = "Goblin";
	}
}

class enemyRat extends enemy {
	constructor(){
		super();
		this.armorClass = 15;
		this.damageDie = 4;
		this.goldDie = 4;
		this.health = 10;
		this.hitBonus = 1;		
		this.name = "Rat";
	}
}

class enemyTroll extends enemy {
	constructor(){
		super();
		this.armorClass = 10;
		this.damageDie = 8;
		this.damageResistance = 0;
		this.goldDie = 10;
		this.health = 30;
		this.hitBonus = 0;
		this.isChargingMove = false;
		this.name = "Troll";
		this.specialDamageDie = 12;
	}

	rollDamage(){
		if (this.isFatigued){
			return rollDie(this.specialDamageDie);
		} else {
			return rollDie(this.damageDie);
		}
	}

	//Decide if the troll will unleash a special attack, normal attack, or do nothing
	willAttack(){
		if (this.isFatigued){
			console.log("The"+this.name+" is recovering from it's last attack");
			this.isFatigued = false;
			return false;
		} else if (this.isChargingMove){
			console.log("The "+this.name+" unleashes a devastating swing");
			this.isChargingMove = false;
			this.isFatigued = true;
			return true;
		} else if (rollDie(4)===1){
			this.isChargingMove = true;
			console.log("The "+this.name+" pulls back his club in preparation for a mighty swing...");
			return false
		} else {
			return true
		}
	}
}

class enemyZombie extends enemy{
	constructor(){
		super();
		this.armorClass = 5;
		this.damageDie = 4;
		this.damageResistance = 0;
		this.goldDie = 8;
		this.health = 30;
		this.hitBonus = 0;
		this.isChargingMove = false;
		this.name = "Zombie";
		this.statusInfliction = "none";
	}
	//Decide if the zombie will unleash a special attack, normal attack, or do nothing
	willAttack(){
		if (this.isFatigued){
			this.isFatigued = false;
			this.statusInfliction = "none";
			console.log("The "+this.name + " is recovering from its last attack.");
			return false;
		} else if (this.isChargingMove){
			this.isChargingMove = false;
			this.isFatigued = true;
			this.statusInfliction = "paralyze";
			console.log("The " +this.name+ " bites at you!");
			return true;
		} else if (rollDie(3)===3){
			this.isChargingMove = true;
			console.log("The " + this.name + " opens wide its putrid maw.");
			return false;
		} else {
			console.log("The " + this.name +" attacks.");
			return true;
		}
	}
}

class item{
	constructor(){
		this.name = "Consumable item";
	}
	consume(playerObject){
		let itemIndex = playerObject.inventory.indexOf(this);
		playerObject.inventory.splice(itemIndex, 1);
	}
	use(playerObject){
		this.consume(playerObject);
	}
}

class itemHealthPotion extends item{
	constructor(){
		super();
		this.name = "Health Potion";
	}
	use(playerObject){
		playerObject.health += 4+rollDie(4);
		this.consume(playerObject);
	}
}

class playerCharacter {
	constructor() {
		this.armorClass = 12;
		this.attackBonus = 2;
		this.damageResistance = 1;
		this.damageDie = 8;
		this.gold = 0;
		this.health = 30;
		this.inventory = [];
		this.statusEffect = "none";		
		this.victories = 0;
		this.weapon = new weaponBareHands;
	}

	takeStatusInfliction(status) {
		switch(status){
			case "paralyze":
				this.statusEffect = "paralyze";
				console.log("You have been parlyzed!");
				break;
			case "poison":
				this.statusEffect = "poison";
				console.log("You have been poisoned");
				break;
		}
	}
}

class weapon {
	constructor() {
		this.damageDie = 1;
		this.name = "weapon";
		this.position = "weapon"
		this.statusInfliction = "none";
	}

	use(playerObject){
		playerObject.weapon = this;
		console.log("You wield your " + this.name);
	}
}

class weaponBareHands extends weapon {
	constructor() {
		super();
		this.damageDie = 2;
		this.name = "Bare Hands";
	}
}

class weaponSteelDagger extends weapon {
	constructor() {
		super();
		this.damageDie = 4;
		this.name = "Steel Dagger";
	}
}

class weaponSteelLongsword extends weapon {
	constructor(){
		super();
		this.damageDie = 6;
		this.name = "Steel Longsword";
	}
}