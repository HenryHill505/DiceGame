// for (let i=0;i<1000;i++){
// 	console.log(rollDie(5));
// }

runGame();

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

function runGame(){
	let globalplayerHealth = 20;
	let victoryCounter = 0;
	let goldCounter = 0;
	while (globalplayerHealth>0){
		transitionScene();
		globalplayerHealth = runCombat(globalplayerHealth)
		if (globalplayerHealth>0){
			victoryCounter++
			goldCounter += awardGold();
		};
	}

	displayGameOver(victoryCounter,goldCounter)	
}

function runCombat(playerHealth){
	// let foeHealth = 20;
	let playerAC = 12;
	// let foeAC = 10;
	let foeArray = [enemyGoblin,enemyRat,enemyTroll,enemyZombie];

	let foe = new foeArray[rollDie(4)-1];
	console.log("A "+foe.name+ " appears!")

	while(playerHealth>0&&foe.health>0){
		//Get and execute player action
		let playerMove = getPlayerAction();
		if (playerMove === "A"){
			if (attackHit(foe.armorClass)){
				console.log("Your attack hits!");
				foe.health -= rollDie(8);
			}
			else {
				console.log("Your attack misses.");
			}
		}
		//Execute Foe Attack
		if (foe.health>0&&attackHit(playerAC)){
			console.log("Your foe hits!");
			playerHealth -= rollDie(foe.damageDie);
		} else {
			console.log("Your foe misses.");
		}

		console.log("Player HP: "+playerHealth+" Foe Health: "+foe.health);
	}

	//Display Combat Result
	if (playerHealth<=0){
		console.log("You have been defeated by your foe.");
	} else if (foe.health<=0){
		console.log("You have defeated your foe!");
	} else {
		console.log("BUG Combat resolution is bugged BUG");
	}

	return playerHealth;
}

function attackHit(targetAC){
	if (rollDie(20)>targetAC) {
		return true;
	} else {
		return false;
	}
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

function transitionScene(){
	let transitionText = ["Your journey takes you to", "You find yourself in", "You step into", "You come to"];
	let newScene = [" a cave.", " a forest glade.", " a dusty riverbed.", " a mountain pass."];
	let newEnemy = ["A hairy troll","A snarling foe","A putrified zombie","A filthy rat"];
	let confrontationText =[" accosts you!", " blocks your path!", " leaps upon you from behind!", " attacks you!"];

	console.log(transitionText[rollDie(4)-1]+newScene[rollDie(4)-1]);
	//console.log(newEnemy[rollDie(4)-1]+confrontationText[rollDie(4)-1]);
}
