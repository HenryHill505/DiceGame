// for (let i=0;i<1000;i++){
// 	console.log(rollDie(5));
// }

runGame();

function attackHit(targetAC,hitBonus){
	if (rollDie(20)+hitBonus>=targetAC) {
		return true;
	} else {
		return false;
	}
}

function awardGold(){
	goldPiecesWon = rollDie(10);
	console.log("You find "+goldPiecesWon+" gold pieces on your slain foe.");
	return goldPiecesWon;
}

function displayGameOver(victories,goldPieces){
	console.log("After winning " +victories+ " fights, you fall to your last opponent");
	console.log("You accrued "+goldPieces+ " pieces of gold before your death");
	console.log("Game Over");	
}

function getPlayerAction() {
	let playerAction = prompt("What will you do? (A)ttack, (B)lock, (E)vade, (I)nventory").charAt(0);
	while (playerAction !== "A"){
		playerAction = prompt("Invalid choice. Choose a valid Action (1.Attack)")
	}
	return playerAction;
}

function rollDie(sideCount){
	return Math.floor(Math.random()*sideCount)+1;
}

function runCombat(player){
	// let foeHealth = 20;
	//let playerAC = 12;
	// let foeAC = 10;
	// let foeArray = [enemyGoblin,enemyRat,enemyTroll,enemyZombie];

	// let foe = new foeArray[rollDie(4)-1];
	let foe = new enemyTroll;
	console.log("A "+foe.name+ " appears!")

	while(player.health>0&&foe.health>0){
		//Get and execute player action
		let playerMove = getPlayerAction();
		if (playerMove === "A"){
			if (attackHit(foe.armorClass,player.attackBonus)){
				console.log("Your attack hits!");
				foe.health -= rollDie(8)-foe.damageResistance;
			}
			else {
				console.log("Your attack misses.");
			}
		}

		//Execute Foe Attack
		if (foe.health>0&&foe.willAttack()){
			if (attackHit(player.armorClass,foe.hitBonus)){
				console.log("The "+foe.name+" hits!");
				player.health -= foe.rollDamage();
			} else {
				console.log("The "+foe.name+" misses.");
			}
		}

		console.log("Player HP: "+player.health+" "+foe.name+" HP: "+foe.health);
	}

	//Display Combat Result
	if (player.health<=0){
		console.log("You have been defeated by the " +foe.name+"!");
	} else if (foe.health<=0){
		console.log("You have defeated the "+foe.name+"!");
	}

	return player.health;
}

function runGame(){
	// let globalplayerHealth = 50;
	// let victoryCounter = 0;
	// let goldCounter = 0;
	let player = new playerCharacter;
	while (player.health>0){
		transitionScene();
		player.health = runCombat(player);
		if (player.health>0){
			player.victories++
			player.gold += awardGold();
		};
	}

	displayGameOver(player.victories,player.gold)	
}

function transitionScene(){
	let transitionText = ["Your journey takes you to", "You find yourself in", "You step into", "You come to"];
	let newScene = [" a cave.", " a forest glade.", " a dusty riverbed.", " a mountain pass."];
	let newEnemy = ["A hairy troll","A snarling foe","A putrified zombie","A filthy rat"];
	let confrontationText =[" accosts you!", " blocks your path!", " leaps upon you from behind!", " attacks you!"];

	console.log(transitionText[rollDie(4)-1]+newScene[rollDie(4)-1]);
	//console.log(newEnemy[rollDie(4)-1]+confrontationText[rollDie(4)-1]);
}
