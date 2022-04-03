const { default: axios } = require("axios");

const { writeFile, readFile } = require("./file");
const moda = require("./moda");
const { sleep } = require("./timer");
const { getRandomInt } = require("./utils");

async function storeGameResults() {
  const gameResults = [];
  const MAX = 2488;
  for(let i = 1; i < MAX; i++) {
    try {
      const {data: result} = await axios.get(`https://servicebus2.caixa.gov.br/portaldeloterias/api/lotofacil/${i}`);
      if (result.listaDezenas) {
        gameResults.push(result.listaDezenas.join(';'));
      }
      writeFile('game-results.json', gameResults);
    } catch {}
    await sleep(getRandomInt(1, 5) * 1000); // delay entre uma requisição e outra
  }
}

function storeSumResultingValues(results) {
  const sumResultingValues = results.map((result) => {
    const sum = result.split(';')
        .reduce((previous, current) => previous + Number(current), 0);
    console.log(sum);
    return sum;
  });
  writeFile('game-results-sum.json', sumResultingValues);
}

function storeSumResultingValues(sumResultingValues) {
  writeFile('game-results-sum-ordered.json', sumResultingValues.sort((a, b) => {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  }));
}

function generateLuckyNumbers(moda) {
  while(true) {
    const luckyNumbers = [];
    while(luckyNumbers.length !== 15) {
      const luckyNumber = getRandomInt(1, 25);
      if (!luckyNumbers.find((ln) => ln === luckyNumber)) {
        luckyNumbers.push(luckyNumber);
      }
    }
    if (luckyNumbers.reduce((previous, current) => previous + current, 0) === moda) {
      return luckyNumbers;
    }
  }
}

function getGameResults() {
  const results = readFile('game-results.json');
  const sumResultingValues = readFile('game-results-sum.json');
  const modaResult = moda(sumResultingValues);
  console.log('Moda: ', modaResult);
  console.log(generateLuckyNumbers(modaResult));
}

getGameResults();
