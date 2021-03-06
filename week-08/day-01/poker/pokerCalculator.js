'use strict';

//Sort:
function sortArrays(blackHand, whiteHand, row) {
  blackHand.sort((a, b) => row.indexOf(a[0]) - row.indexOf(b[0]));
  whiteHand.sort((a, b) => row.indexOf(a[0]) - row.indexOf(b[0]));
};

//High card:
function checkHighCards(blackHand, whiteHand, row, rowWithNames, score) {
  let highestBIndex = row.indexOf(blackHand[4][0]);
  let highestWIndex = row.indexOf(whiteHand[4][0]);

  if (highestBIndex > highestWIndex) {
    score.winner = 'Black';
    score.winnerCardValue = rowWithNames[highestBIndex];
    score.winStrategy = 'High card';
  }

  if (highestWIndex > highestBIndex) {
    score.winner = 'White';
    score.winnerCardValue = rowWithNames[highestWIndex];
    score.winStrategy = 'High card';
  }
}

//Pair:
function checkPairs(blackHand, whiteHand, row, rowWithNames, score) {
  let whitePairIndex = -1;
  let blackPairIndex = -1;
  let winnerBlackCardIndex = -1;
  let winnerWhiteCardIndex = -1;

  for (let i = 0; i < 4; i++) {
    if (blackHand[i][0] === blackHand[i + 1][0]) {
      blackPairIndex = i;
      winnerBlackCardIndex = row.indexOf(blackHand[blackPairIndex][0]);
    }
    if (whiteHand[i][0] === whiteHand[i + 1][0]) {
      whitePairIndex = i;
      winnerWhiteCardIndex = row.indexOf(whiteHand[whitePairIndex][0]);
    }
  }

  if (blackPairIndex !== -1 && winnerBlackCardIndex > winnerWhiteCardIndex) {
    score.winner = 'Black';
    score.winStrategy = 'Pair';
    score.winnerCardValue = rowWithNames[winnerBlackCardIndex];
  }

  if (whitePairIndex !== -1 && winnerBlackCardIndex < winnerWhiteCardIndex) {
    score.winner = 'White';
    score.winStrategy = 'Pair';
    score.winnerCardValue = rowWithNames[winnerWhiteCardIndex];
  }
}

//Drill:
function checkDrill(blackHand, whiteHand, row, rowWithNames, score) {
  let whiteDrillIndex = -1;
  let blackDrillIndex = -1;
  let winnerBlackDrillIndex = -1;
  let winnerWhiteDrillIndex = -1;

  for (let i = 0; i < 3; i++) {
    if (blackHand[i][0] === blackHand[i + 1][0] && blackHand[i][0] === blackHand[i + 2][0]) {
      blackDrillIndex = i;
      winnerBlackDrillIndex = row.indexOf(blackHand[blackDrillIndex][0]);
    }
    if (whiteHand[i][0] === whiteHand[i + 1][0] && whiteHand[i][0] === whiteHand[i + 2][0]) {
      whiteDrillIndex = i;
      winnerWhiteDrillIndex = row.indexOf(whiteHand[whiteDrillIndex][0]);
    }
  }

  if (winnerBlackDrillIndex !== -1 && winnerBlackDrillIndex > winnerWhiteDrillIndex) {
    score.winner = 'Black';
    score.winStrategy = 'Drill';
    score.winnerCardValue = rowWithNames[winnerBlackDrillIndex];
  }

  if (winnerWhiteDrillIndex !== -1 && winnerBlackDrillIndex < winnerWhiteDrillIndex) {
    score.winner = 'White';
    score.winStrategy = 'Drill';
    score.winnerCardValue = rowWithNames[winnerWhiteDrillIndex];
  }
}

//Flush:
function checkFlush(blackHand, whiteHand, row, rowWithNames, score) {
  let winnerBlackFlushValue = -1;
  let winnerWhiteFlushValue = -1;
  let winnerBlackFlushIndex = -1;
  let winnerWhiteFlushIndex = -1;
  if (blackHand[0][1] === blackHand[1][1] &&
    blackHand[0][1] === blackHand[2][1] &&
    blackHand[0][1] === blackHand[3][1] &&
    blackHand[0][1] === blackHand[4][1]) {
    winnerBlackFlushValue = blackHand[4][0];
    winnerBlackFlushIndex = row.indexOf(winnerBlackFlushValue);
  }

  if (whiteHand[0][1] === whiteHand[1][1] &&
    whiteHand[0][1] === whiteHand[2][1] &&
    whiteHand[0][1] === whiteHand[3][1] &&
    whiteHand[0][1] === whiteHand[4][1]) {
    winnerWhiteFlushValue = whiteHand[4][0];
    winnerWhiteFlushIndex = row.indexOf(winnerWhiteFlushValue);
  }

  if (winnerBlackFlushIndex !== -1 && winnerBlackFlushIndex > winnerWhiteFlushIndex) {
    score.winner = 'Black';
    score.winStrategy = 'Flush';
    score.winnerCardValue = blackHand[0][1];
  }

  if (winnerWhiteFlushIndex !== -1 && winnerBlackFlushIndex < winnerWhiteFlushIndex) {
    score.winner = 'White';
    score.winStrategy = 'Flush';
    score.winnerCardValue = whiteHand[0][1];
  }
}



module.exports = (blackHand, whiteHand) => {
  let row = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
  let rowWithNames = ['2', '3', '4', '5', '6', '7', '8', '9', 'Ten', 'Jumbo', 'Queen', 'King', 'Ace'];
  
  let score = {
    winner: '',
    winnerCardValue: '',
    winStrategy: ''
  }
  //Sort:
  sortArrays(blackHand, whiteHand, row);

  //High card:
  checkHighCards(blackHand, whiteHand, row, rowWithNames, score);

  //Pair:
  checkPairs(blackHand, whiteHand, row, rowWithNames, score);

  //Drill:
  checkDrill(blackHand, whiteHand, row, rowWithNames, score);

  //Flush:
  checkFlush(blackHand, whiteHand, row, rowWithNames, score);

  let result = `${score.winner} wins! - (${score.winStrategy}: ${score.winnerCardValue})`;
  return result;
}
