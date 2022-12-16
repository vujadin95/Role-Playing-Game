function getDiceRollArray(diceCount) {
  return new Array(diceCount).fill(0).map((dice) => {
    return Math.floor(Math.random() * 6 + 1);
  });
}

function getPlaceholderDiceHtml(diceCount) {
  return new Array(diceCount)
    .fill("")
    .map((dice) => {
      return `<div class="dice placeholder-text">${dice}</div>`;
    })
    .join("");
}

function getHealthPercentage(health, maxHealth) {
  return (maxHealth / health) * 100;
}

export { getDiceRollArray, getPlaceholderDiceHtml, getHealthPercentage };
