"use strict";

const cardArray = [
  {
    dataId: 0,
    name: "bumblebee-2",
    class: "bumblebee-2",
  },
  {
    dataId: 1,
    name: "bumblebee-2",
    class: "bumblebee-2",
  },
  {
    dataId: 2,
    name: "bumblebee-3",
    class: "bumblebee-3",
  },
  {
    dataId: 3,
    name: "bumblebee-3",
    class: "bumblebee-3",
  },
  {
    dataId: 4,
    name: "bumblebee-4",
    class: "bumblebee-4",
  },
  {
    dataId: 5,
    name: "bumblebee-4",
    class: "bumblebee-4",
  },
  {
    dataId: 6,
    name: "bumblebee-5",
    class: "bumblebee-5",
  },
  {
    dataId: 7,
    name: "bumblebee-5",
    class: "bumblebee-5",
  },
  {
    dataId: 8,
    name: "bumblebee-6",
    class: "bumblebee-6",
  },
  {
    dataId: 9,
    name: "bumblebee-6",
    class: "bumblebee-6",
  },
  {
    dataId: 10,
    name: "bumblebee-7",
    class: "bumblebee-7",
  },
  {
    dataId: 11,
    name: "bumblebee-7",
    class: "bumblebee-7",
  },
];

function shuffleAndSplitCardArray(array) {
  const copyOfArray = [...array];
  // Shuffle cards in the array:
  copyOfArray.sort(() => Math.random() - 0.5);

  // Split the shuffled array in 4 arrays with 3 cards each (because there are 4 columns with three rows in the game board)
  let newCardArray = [];
  const colCount = 4;
  const fourPartIndex = copyOfArray.length / colCount;
  for (let i = 0; i < copyOfArray.length; i += fourPartIndex) {
    const miniArray = copyOfArray.slice(i, i + fourPartIndex);
    newCardArray.push(miniArray);
  }
  return newCardArray;
}

function createGameBoard() {
  const newCardArray = shuffleAndSplitCardArray(cardArray);
  for (let i = 0; i < newCardArray.length; i++) {
    for (let j = 0; j < newCardArray[i].length; j++) {
      let card = document.createElement("div");
      card.setAttribute("class", `hex back-card`);
      card.setAttribute("data-id", `${newCardArray[i][j].dataId}`);
      document.querySelector(`.col-${i}`).appendChild(card);
      card.addEventListener("click", openCard);
    }
  }
}
createGameBoard();

let openedCard = null;
let firstCardId;
let secondCardId;
let attemptCount = 0;

function openCard() {
  const cardId = this.getAttribute("data-id"); // lai varētu locate'ot kārti
  this.setAttribute("class", `hex ${cardArray[cardId].class}`);
  const cardName = cardArray[cardId].name;
  if (openedCard === null) {
    openedCard = cardName;
    firstCardId = cardId;
  } else {
    secondCardId = cardId;
    setTimeout(() => {
      checkMatch(cardName);
    }, 500);

    // Remove event listener from rest of the closed cards:
    const allCards = document.querySelectorAll(".back-card");
    for (let i = 0; i < allCards.length; i++) {
      allCards[i].removeEventListener("click", openCard);
    }
  }
}

function checkMatch(cardTwo) {
  const firstCard = document.querySelector(`[data-id="${firstCardId}"]`);
  const secondCard = document.querySelector(`[data-id="${secondCardId}"]`);
  if (openedCard === cardTwo) {
    firstCard.removeEventListener("click", openCard);
    secondCard.removeEventListener("click", openCard);
  } else {
    firstCard.setAttribute("class", "hex back-card");
    secondCard.setAttribute("class", "hex back-card");
  }
  openedCard = null;

  attemptCount += 1;
  document.querySelector(".attempts").textContent = attemptCount;

  // Add back event listeners to the rest of the closed cards:
  const allCards = document.querySelectorAll(".back-card");
  for (let i = 0; i < allCards.length; i++) {
    allCards[i].addEventListener("click", openCard);
  }
}

const newGameButton = document.querySelector(".new-game");
newGameButton.addEventListener("click", resetGame);

let highScore = 0;
function resetGame() {
  if (
    !document
      .querySelectorAll("hex")
      .forEach((e) => e.classList.contains("back-card")) &&
    attemptCount != 0
  ) {
    if (highScore === 0) {
      document.querySelector(".high-score").textContent = attemptCount;
      highScore = attemptCount;
    } else if (attemptCount < highScore) {
      document.querySelector(".high-score").textContent = attemptCount;
    }

    document.querySelectorAll(".hex").forEach((e) => e.remove());
    createGameBoard();

    attemptCount = 0;
    document.querySelector(".attempts").textContent = 0;
  }
}
