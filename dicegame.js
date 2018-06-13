"use strict";

runGame();

//let newSquare = new square;
//console.log(newSquare.area);

function attackHit(targetArmorClass,hitBonus){
	if (rollDie(20)+hitBonus>=targetArmorClass) {
		return true;
	} else {
		return false;
	}
}

function awardGold(){
	let goldPiecesWon = rollDie(10);
	console.log("You find "+goldPiecesWon+" gold pieces on your slain foe.");
	return goldPiecesWon;
}

function createInventoryPrompt(playerObject) {
	let inventorySize = playerObject.inventory.length;
	let inventoryString = "Choose item to equip, unequip, or use: \n";
	for(let i=0;i<inventorySize;i++) {
		inventoryString +=i+1;
		inventoryString +="."+playerObject.inventory[i].name+ " ";
	}
	return inventoryString;
}

function displayGameOver(victories,goldPieces){
	console.log("After winning " +victories+ " fights, you fall to your last opponent.\nYou accrued "+goldPieces+ " pieces of gold before your death.\nGame Over.");	
}

function getPlayerAction() {
	let playerAction = prompt("What will you do? (A)ttack, (B)lock, (C)harge, (D)odge, (I)nventory").charAt(0).toLowerCase();
	while (playerAction !== "a"&&playerAction !== "b"&&playerAction !=="c"&&playerAction !=="d"&&playerAction !=="i"){
		playerAction = prompt("Invalid choice. Choose a valid Action (A), (B), (C), (D), or (I)")
	}
	return playerAction;
}

// function getPlayerActionFromPage() {
// 	// console.log("start of function");
// 	let textBox = document.getElementById("action-input-box");
// 	let button = document.getElementById("input-button");
// 	let action = null;

// 	button.onclick = function(){
// 		action = textBox.value;
// 		console.log(action);
// 	}

// 	// console.log(action);
// 	// console.log("end of function");
// }


function manageInventory(playerObject){
	let targetItemIndex = prompt(createInventoryPrompt(playerObject))-1;
	playerObject.useItem(playerObject.inventory[targetItemIndex]);
}

//If the players stats are augmented, returns the original value for resetting at the end of the round.
function resolvePlayerAction(action,playerObject,foeObject){
	if (playerObject.statusEffect !== "paralyze"){
		let statValue;
		switch (action){
			case "a":
				if (attackHit(foeObject.armorClass,playerObject.attackBonus)){
					console.log("Your attack hits!");
					foeObject.health -= rollDie(playerObject.damageDie)-foeObject.damageResistance;
				}
				else {
					console.log("Your attack misses.");
				}
				break;

			case "b":
				statValue = playerObject.damageResistance;
				playerObject.damageResistance += 2;
				console.log("You block, raising your DR to "+playerObject.damageResistance);
				return statValue;
				break;
			case "c":
				if (attackHit(foeObject.armorClass,playerObject.attackBonus+2)){
					console.log("Your charge hits!");
					foeObject.health -= rollDie(playerObject.damageDie)-foeObject.damageResistance;
				}
				else {
					console.log("Your charge misses.");
				}
				statValue = playerObject.armorClass;
				playerObject.armorClass -= 2;
				console.log("Your charge has left you with an AC of "+ playerObject.armorClass);
				return statValue
				break;
			case "d":
				statValue = playerObject.armorClass;
				playerObject.armorClass += 2;
				console.log("You dodge, raising your AC to "+ playerObject.armorClass);
				return statValue;
				break;
			case "i":
				manageInventory(playerObject);
				break;
		}
	} else {
		console.log("You have been paralyzed! You cannot move!")
	}
}

function resetStatChanges(action,playerObject,statValue){
	if(statValue !== undefined){
		switch(action){
			case "b":
				playerObject.damageResistance = statValue;
				console.log("Player DR reset to "+playerObject.damageResistance);
				break;
			case "c":
				playerObject.armorClass = statValue;
				console.log("Player AC reset to " +playerObject.armorClass);
				break;
			case "d":
				playerObject.armorClass = statValue;
				console.log("Player AC reset to "+playerObject.armorClass);
				break;
		}
	}

	if(playerObject.statusEffect==="paralyze"&&rollDie(4) === 4){
		console.log("Your break through the paralysis!");
		playerObject.statusEffect = "none";
	}
}

function rollDie(sideCount){
	return Math.floor(Math.random()*sideCount)+1;
}

function runCombat(player){
	let foeArray = [enemyBlob,enemyGoblin,enemyRat,enemyTroll,enemyZombie];

	let foe = new foeArray[rollDie(5)-1];
	console.log("A "+foe.name+ " appears!")

	while(player.health>0&&foe.health>0){
		//Get and execute player action
		let playerMove = getPlayerAction();
		let originalStatValue = resolvePlayerAction(playerMove,player,foe);

		//Execute Foe Attack
		if (foe.health>0&&foe.willAttack()){
			if (attackHit(player.armorClass,foe.hitBonus)){
				console.log("The "+foe.name+" hits!");
				player.health -= foe.rollDamage()-player.damageResistance;
				if(foe.statusInfliction !=="none"){
					player.statusEffect = foe.statusInfliction;
				}
			} else {
				console.log("The "+foe.name+" misses.");
			}
		}

		console.log("Player HP: "+player.health+" "+foe.name+" HP: "+foe.health);
		resetStatChanges(playerMove,player,originalStatValue);
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
	
	let player = new playerCharacter;
	seedInventory(player);
	while (player.health>0){
		transitionScene();
		player.health = runCombat(player);
		if (player.health>0){
			player.victories++
			player.gold += awardGold();
		}
	}
	displayGameOver(player.victories,player.gold)	
}

function seedInventory(playerObject){
	let dagger = new weaponSteelDagger;
	let sword = new weaponSteelLongsword;
	playerObject.inventory.push(dagger);
	playerObject.inventory.push(sword);
}

function transitionScene(){
	let transitionText = ["Your journey takes you to", "You find yourself in", "You step into", "You come to"];
	let newScene = [" a cave.", " a forest glade.", " a dusty riverbed.", " a mountain pass."];
	
	console.log(transitionText[rollDie(4)-1]+newScene[rollDie(4)-1]);
}
