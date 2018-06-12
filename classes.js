class enemyGoblin {
	constructor(){
		this.name = "Goblin";
		this.health = 20;
		this.armorClass = 10;
		this.damageResistance = 0;
		this.hitBonus = 2;
		this.damageDie = 6;
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
	}
}

// let Goblin = new GoblinEnemy;

// console.log(Goblin.health);
// Goblin.health = 1;
// console.log(Goblin.health);
