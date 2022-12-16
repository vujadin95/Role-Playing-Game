import characterData from "./data.js";
import Character from "./Character.js";

const monsters = ["orc", "demon", "goblin"];
let buttonIsWaiting = false;

function getMonster() {
  const nextMonsterData = characterData[monsters.shift()];
  return nextMonsterData ? new Character(nextMonsterData) : {};
}

function endGame() {
  const endMessage =
    hero.health === 0 && monster.health
      ? "No victors - all creatures are dead"
      : hero.health > 0
      ? "The Wizard Wins"
      : "The monstes are Victorious";
  const endEmoji = hero.health > 0 ? "🔮" : "☠️";
  setTimeout(() => {
    document.body.innerHTML = `
                <div class="end-game">
                  <h2>Game Over</h2>
                  <h3>${endMessage}</h3>
                  <p class="end-emoji">${endEmoji}</p>
                </div>
            `;
  }, 1500);
}

function attack() {
  if (!buttonIsWaiting) {
    hero.setDiceHtml();
    monster.setDiceHtml();
    hero.takeDamage(monster.currentDiceScore);
    monster.takeDamage(hero.currentDiceScore);

    if (hero.dead) {
      endGame();
    }
    if (monster.dead) {
      buttonIsWaiting = true;

      if (monsters.length > 0) {
        setTimeout(() => {
          monster = getMonster();
          render();
          buttonIsWaiting = false;
        }, 1500);
      } else {
        endGame();
      }
    }

    render();
  }
}

document.getElementById("attack-button").addEventListener("click", attack);

function render() {
  document.getElementById("hero").innerHTML = hero.getCharacterHtml();
  document.getElementById("monster").innerHTML = monster.getCharacterHtml();
}

const hero = new Character(characterData.hero);
let monster = getMonster();

render();
