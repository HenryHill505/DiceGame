
//////////////InitializeGame////////////////////////
	let text1 = document.getElementById("text-line-1");
	let text2 = document.getElementById("text-line-2");
	let text3 = document.getElementById("text-line-2");

	let player = new playerCharacter;
	seedInventory(player);

  let onNewScene = true;
  let onStealth = false;
	let onCombat = false;
	let onPostCombat = false;

	text1.innerHTML = "Blah blah starter text 1";
////////////////HoldGlobalVariables////////////////
let chosenTerrain;
let chosenEnemy;
//////////////////////////////////////////////////

function stepGame(){
	refreshHUD();

  if(onNewScene){
    //Establish new scene and enemy
    chosenTerrain = pickTerrain();
    printText("You arrive at a "+chosenTerrain.name+".");
    chosenEnemy = pickEnemy();
    printText("You see a "+chosenEnemy.name);

    onNewScene = false;
		if(stealthCheck(player.stealth, chosenEnemy.spot)){
			printText("The "+chosenEnemy.name+" sees you!")
    	onStealth = true;
		} else {
			printText("The "+chosenEnemy.name+" sees you!");
			onCombat = true;
		}
		console.log("End newScene")

  }else if (onStealth) {
    //Resolve the stealth phase
    resolvePlayerAction(player,chosenEnemy);
		onStealth = false;
		onCombat = true;
		console.log("End Stealth");

  }else if (onCombat){
		//Combat phase
		let playerAction = getPlayerCombatAction();
		let returnedStatValue = resolvePlayerAction(player, playerAction, chosenEnemy);
		enemyTurn(player, chosenEnemy);
		resetStatChanges(playerAction,player,returnedStatValue);

		console.log("Player Health: "+player.health);
		console.log("Enemy Health: "+ chosenEnemy.health);

		if (chosenEnemy.health<=0) {
				onCombat = false;
				onPostCombat = true;
				printText("You have defeated the "+chosenEnemy.name);
			}
		if(player.health<=0){
			onCombat = false;
			onPostCombat = true;
			printText("You have been slain by the "+chosenEnemy.name);
		}
	} else if (onPostCombat){
		//Wrap up combat then jump to a new scene
		if(player.health<=0){
			console.log("dead");
			displayGameOver(player.victories,player.gold)
		}else{
			let goldWon = rollDie(chosenEnemy.goldDie);
			let lootWon = "nothing else"
			player.gold += goldWon;
			printText("You find "+goldWon+" pieces of gold and " + lootWon + " on the "+chosenEnemy.name+"'s remains");
			onPostCombat = false;
			onNewScene = true;
		}
	}
}//End stepGame()

//////////////////////////////////
/////////Function List///////////
////////////////////////////////
// function inputBoxValue(){
// 	let inputValue = getElementById("action-input-box").value;
// 	return inputValue;
// }

function attackHit(targetArmorClass,hitBonus){
	if (rollDie(20)+hitBonus>=targetArmorClass) {
		return true;
	} else {
		return false;
	}
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

function displayStats(player){
	console.log("AC: "+player.armorClass+"AttackBonus: "+player.attackBonus+"DR: "+player.damageResistance);
}

function enemyTurn(playerObject,foeObject){
	if (foeObject.health>0&&foeObject.willAttack()){
		if (attackHit(playerObject.armorClass,foeObject.hitBonus)){
			console.log("The "+foeObject.name+"'s attack hits!");
			playerObject.health -= foeObject.rollDamage()-playerObject.damageResistance;
			if(foeObject.statusInfliction !=="none"){
				playerObject.statusEffect = foeObject.statusInfliction;
			}
		} else {
			console.log("The "+foeObject.name+" misses.");
		}
	}
}

function getPlayerCombatAction(){
	let chosenAction = document.getElementById("action-input-box").value.charAt(0).toLowerCase();
	return chosenAction
}

function manageInventory(playerObject){
	let inventoryPrompt = createInventoryPrompt(playerObject)
	let targetItemIndex = parseInt(prompt(inventoryPrompt));

	while (!Number.isInteger(targetItemIndex)||(targetItemIndex>playerObject.inventory.length)||targetItemIndex<=0){
		targetItemIndex = parseInt(prompt("Invalid entry. Choose item by number. \n"+inventoryPrompt));
	}
	targetItemIndex -= 1;
	playerObject.inventory[targetItemIndex].use(playerObject);
}

function pickEnemy(){
  let enemyArray = [enemyBlob,enemyGoblin,enemyRat,enemyTroll];
  return new enemyArray[rollDie(enemyArray.length)-1];
}
function pickTerrain(){
  let terrainArray = [terrainForestGlade,terrainRiverBed]
  return new terrainArray[rollDie(terrainArray.length)-1];
}

function printText(text){
  text3.innerHTML = text2.innerHTML;
  text2.innerHTML = text1.innerHTML;
  text1.innerHTML = text;
	console.log(text);
}

function refreshHUD(){
	healthDisplay = document.getElementById("health-display");
	goldDisplay = document.getElementById("gold-display");
	victoryDisplay = document.getElementById("victory-display");
	armorDisplay = document.getElementById("armor-display");
	weaponDisplay = document.getElementById("weapon-display");

	healthDisplay.innerHTML = "Health: " +player.health;
	goldDisplay.innerHTML = "Gold: "+player.gold;
	victoryDisplay.innerHTML = "Victories: "+player.victories;
	if (player.armorBody !== null){
		armorDisplay.innerHTML = "Armor: " + player.armorBody.name;
		armorDisplay.title = "AC: " + player.armorBody.armorClassModifier + " DR: " + player.armorBody.damageResistanceModifier + " Attack: " + player.armorBody.attackBonusModifier
	}
	weaponDisplay.innerHTML = "Weapon: " + player.weapon.name;
	weaponDisplay.title = "Damage: 1d" + player.weapon.damageDie;

}

function resolvePlayerAction(playerObject,chosenAction,foeObject){
  switch(chosenAction){
    case "a":
      if (attackHit(foeObject.armorClass,playerObject.attackBonus)){
        printText("You hit the " + foeObject.name + " with your " + playerObject.weapon.name);
        foeObject.health -= rollDie(playerObject.weapon.damageDie)-foeObject.damageResistance;
      }
      else {
        printText("You miss with your "+ playerObject.weapon.name);
      }
      break;
    case "b":
      statValue = playerObject.damageResistance;
      playerObject.damageResistance += 2;
      printText("You block, raising your DR to "+playerObject.damageResistance);
      return statValue;
      break;
    case "c":
      if (attackHit(foeObject.armorClass,playerObject.attackBonus+2)){
        printText("Your charge hits!");
        foeObject.health -= rollDie(playerObject.weapon.damageDie)-foeObject.damageResistance;
      }
      else {
        printText("Your charge misses.");
      }
      statValue = playerObject.armorClass;
      playerObject.armorClass -= 2;
      printText("Your charge has left you with an AC of "+ playerObject.armorClass);
      return statValue
      break;
    case "d":
      statValue = playerObject.armorClass;
      playerObject.armorClass += 2;
      printText("You dodge, raising your AC to "+ playerObject.armorClass);
      return statValue;
      break;
    case "i":
      manageInventory(playerObject);
      break;
  }
}

function resetStatChanges(action,playerObject,statValue){
	if(statValue !== undefined){
		switch(action){
			case "b":
				playerObject.damageResistance = statValue;
				printText("Player DR reset to "+playerObject.damageResistance);
				break;
			case "c":
				playerObject.armorClass = statValue;
				printText("Player AC reset to " +playerObject.armorClass);
				break;
			case "d":
				playerObject.armorClass = statValue;
				printText("Player AC reset to "+playerObject.armorClass);
				break;
		}
	}

	if(playerObject.statusEffect==="paralyze"&&rollDie(4) === 4){
		printText("Your break through the paralysis!");
		playerObject.statusEffect = "none";
	}
}

function rollDie(sideCount){
	return Math.floor(Math.random()*sideCount)+1;
}

function seedInventory(playerObject){
	let dagger = new weaponSteelDagger;
	let healthPotion = new itemHealthPotion;
	let greasyMail = new armorBodyGreasyMail;
	let raggedMantle = new armorBodyRaggedMantle;
	playerObject.inventory.push(dagger);
	playerObject.inventory.push(healthPotion);
	playerObject.inventory.push(greasyMail);
	playerObject.inventory.push(raggedMantle);
}

function stealthCheck(playerStealth, enemySpot){
    return rollDie(20)+playerStealth>rollDie(20)+enemySpot;
}
