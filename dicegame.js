for (let i=0;i<1000;i++){
	console.log(rollDie(5));
}

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
	let foeHealth = 20;
	let playerAC = 12;
	let foeAC = 10;

	while(playerHealth>0&&foeHealth>0){
		//Get and execute player action
		let playerMove = getPlayerAction();
		if (playerMove === "Attack"||playerMove === "1"){
			if (attackHit(foeAC)){
				console.log("Your attack hits!");
				foeHealth -= rollDie(8);
			}
			else {
				console.log("Your attack misses.");
			}
		}
		//Execute Foe Attack
		if (foeHealth>0&&attackHit(playerAC)){
			console.log("Your foe hits!");
			playerHealth -= rollDie(6);
		} else {
			console.log("Your foe misses.");
		}

		console.log("Player HP: "+playerHealth+" Foe Health: "+foeHealth);
	}

	//Display Combat Result
	if (playerHealth<=0){
		console.log("You have been defeated by your foe.");
	} else if (foeHealth<=0){
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
	let playerAction = prompt("Choose an Action (1.Attack)");
	while (playerAction !== "1"&&playerAction !== "Attack"){
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
	let newEnemy = ["A hairy troll","A snarling goblin","A putrified zombie","A filthy rat"];
	let confrontationText =[" accosts you!", " blocks your path!", " leaps upon you from behind!", " attacks you!"];

	console.log(transitionText[rollDie(4)-1]+newScene[rollDie(4)-1]);
	console.log(newEnemy[rollDie(4)-1]+confrontationText[rollDie(4)-1]);
}
