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

	chooseAction(){
		if (isFatigued){
			console.log(this.name+" is recovering from it's last attack");
			isFatigued = false;
		} else if (isChargingMove){
			console.log("The troll unleashes a devastating swing");
			isChargingMove = false;
			isFatigued = true;
		} else if (this.health<=15&&rollDie(3)=3){
			isChargingAttack = true;
			console.log("The troll pulls back his club in preparation for a mighty swing...");
		} else {

		}
	}

	rollDamage(){
		if (isFatigued){
			return rollDie(this.specialDamageDie);
		} else {
			return rollDie(this.damageDie);
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
	}

	rollDamage(){
	if (isFatigued){
		return rollDie(this.specialDamageDie);
	} else {
		return rollDie(this.damageDie);
	}
}
}

// let Goblin = new GoblinEnemy;

// console.log(Goblin.health);
// Goblin.health = 1;
// console.log(Goblin.health);
