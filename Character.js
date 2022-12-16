import {
  getPlaceholderDiceHtml,
  getDiceRollArray,
  getHealthPercentage,
} from "./functions.js";

function Character(data) {
  Object.assign(this, data);

  this.maxHealth = this.health;

  this.diceHtml = getPlaceholderDiceHtml(this.diceCount);

  this.setDiceHtml = function () {
    this.currentDiceScore = getDiceRollArray(this.diceCount);
    this.diceHtml = this.currentDiceScore
      .map((dice) => {
        return `<div class="dice">${dice}</div>`;
      })
      .join("");
  };

  this.takeDamage = function (currentDiceScore) {
    this.attackScore = currentDiceScore.reduce((total, num) => total + num);
    this.health -= this.attackScore;
    if (this.health <= 0) {
      this.health = 0;
      this.dead = true;
    }
  };

  this.healthPercentage = function () {
    const percent = getHealthPercentage(this.maxHealth, this.health);
    return percent;
  };

  this.getCharacterHtml = function () {
    const { name, avatar, health, diceHtml, percent } = this;
    const healtBar = this.healthPercentage();

    return `<div class="character-card">
              <h1 class="name">${name}</h1>
              <img src="${avatar}" alt="" class="avatar">
              <div class="health-container">
                <div class="health-label">health: ${health}</div>
                <div class="health-bar-outer ">
                  <div class="health-bar-inner ${
                    healtBar <= 25 ? "danger" : ""
                  }" style="width: ${healtBar}%"></div>
                </div>
              </div>
              <div class="dice-container">${diceHtml}</div>
          </div>`;
  };
}

export default Character;
