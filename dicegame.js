// for (let i=0;i<1000;i++){
// 	console.log(rollDie(20));
// }

runGame();

function runGame(){
	let globalplayerHealth = 20;
	let victoryCounter = 0;
	while (globalplayerHealth>0){
		transitionScene();
		globalplayerHealth = runCombat(globalplayerHealth)
		if (globalplayerHealth>0){victoryCounter++};
	}
	console.log("After winning " +victoryCounter+ " fights, you fall to your last opponent");
	console.log("Game Over");
}

function runCombat(playerHealth){
	let foeHealth = 20;
	// let playerHealth = playerHealth;
	let playerAC = 12;
	let foeAC = 10;

	while(playerHealth>0&&foeHealth>0){
		//Get and execute player action
		let playerMove = getPlayerMove();
		if (playerMove === "Attack"||playerMove === "1"){
			if (attackHit(foeAC)){
				console.log("PlayerHits");
				foeHealth -= rollDie(8);
			}
			else {
				console.log("PlayerMisses");
			}
		}
		//Execute Foe Attack
		if (attackHit(playerAC)){
			console.log("Your foe hits!");
			playerHealth -= rollDie(6);
		} else {
			console.log("Your foe misses.");
		}

		console.log("Player HP: "+playerHealth+"Foe Health: "+foeHealth);
	}

	//Display Combat Result
	if (playerHealth<=0){
		console.log("You have been defeated by your foe");
	} else if (foeHealth<=0){
		console.log("You have defeated your foe");
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

function getPlayerMove() {
	let playerAction = prompt("Choose an Action (1.Attack)");
	while (playerAction !== "1"&&playerAction !== "Attack"){
		playerAction = prompt("Invalid choice. Choose a valid Action (1.Attack)")
	}
	return playerAction;
}

function rollDie(sideCount){
	return Math.ceil(Math.random()*sideCount);
}

function transitionScene(){
	let transitionText = ["Your journey takes you to", "You find yourself in", "You step into", "You come to"];
	let newScene = [" a cave.", " a forest glade.", " a dusty riverbed.", " a mountain pass."]

	console.log(transitionText[rollDie(4)-1]+newScene[rollDie(4)-1]);
}
