class enemyGoblin {
	constructor(){
		this.name = "Goblin";
		this.health = 20;
		this.armorClass = 10;
		this.damageResistance = 0;
		this.hitBonus = 2;
		this.damageDie = 6;
		this.isFatigued = false;
	}

	rollDamage(){
	if (isFatigued){
		return rollDie(this.specialDamageDie);
	} else {
		return rollDie(this.damageDie);
	}
}

}

class enemyTroll {
	constructor(){
		this.name = "Troll";
		this.health = 30;
		this.armorClass = 10;
		this.damageResistance = 0;
		this.hitBonus = 0;
		this.damageDie = 8;
		this.specialDamageDie = 12;
		this.isFatigued = false;
		this.isChargingMove = false;
	}



	rollDamage(){
		if (this.isFatigued){
			console.log("DamageDie: "+this.specialDamageDie);
			return rollDie(this.specialDamageDie);
		} else {
			console.log("DamageDie: "+this.damageDie);
			return rollDie(this.damageDie);
		}
	}

	//Decide if the troll will unleash a special attack, normal attack, or do nothing
	willAttack(){
		if (this.isFatigued){
			console.log(this.name+" is recovering from it's last attack");
			this.isFatigued = false;
			return false;
		} else if (this.isChargingMove){
			console.log("The troll unleashes a devastating swing");
			this.isChargingMove = false;
			this.isFatigued = true;
			return true;
		} else if (this.health<=15&&rollDie(1)===1){
			this.isChargingMove = true;
			console.log("The troll pulls back his club in preparation for a mighty swing...");
			return false
		} else {
			return true
		}
	}
}

class enemyRat {
	constructor(){
		this.name = "Rat";
		this.health = 10;
		this.armorClass = 15;
		this.damageResistance = 0;
		this.hitBonus = 1;
		this.damageDie = 4;
		this.isFatigued = false;
	}

	rollDamage(){
	if (isFatigued){
		return rollDie(this.specialDamageDie);
	} else {
		return rollDie(this.damageDie);
	}
}
}

class enemyZombie {
	constructor(){
		this.name = "Zombie";
		this.health = 30;
		this.armorClass = 5;
		this.damageResistance = 0;
		this.hitBonus = 0;
		this.damageDie = 4;
		this.isFatigued = false;
		this.isChargingMove = false;
		this.statusInfliction = "none"
	}

	rollDamage(){
		if (isFatigued){
			return rollDie(this.specialDamageDie);
		} else {
			return rollDie(this.damageDie);
		}
	}

	willAttack(){
		if (this.isFatigued){
			this.isFatigued = false;
			this.statusInfliction = false;
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

class playerCharacter {
	constructor() {
		this.health = 30;
		this.gold = 0;
		this.victories = 0;
		this.statusEffect = "none";
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


