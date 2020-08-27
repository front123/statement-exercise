const { PlayType } = require('./constant');
const format = createNumberFormat();

function tragedyTypeComputeAmount(perf) {
  let thisAmount = 40000;
  if (perf.audience > 30) {
    thisAmount += 1000 * (perf.audience - 30);
  }
  return thisAmount;
}

function comedyTypeComputeAmount(perf) {
  let thisAmount = 30000;
  if (perf.audience > 20) {
    thisAmount += 10000 + 500 * (perf.audience - 20);
  }
  thisAmount += 300 * perf.audience;
  return thisAmount;
}

function computeAmount(playType, perf) {
  let thisAmount = 0;
  switch (playType) {
    case PlayType.TRAGEDY:
      thisAmount = tragedyTypeComputeAmount(perf);
      break;
    case PlayType.COMEDY:
      thisAmount = comedyTypeComputeAmount(perf);
      break;
    default:
      throw new Error(`unknown type: ${playType}`);
  }
  return thisAmount;
}

function createNumberFormat(){
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;
}

function addCredits(audience, playType){
  let credits = 0;
  // add volume credits
  credits += Math.max(audience - 30, 0);
  // add extra credit for every ten comedy attendees
  if ('comedy' === playType) credits += Math.floor(audience / 5);
  return credits;
}

function generateNormalStatement(invoice, plays){
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = computeAmount(play.type, perf);
    volumeCredits += addCredits(perf.audience, play.type);
    result += ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
    totalAmount += thisAmount;
  }
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits \n`;
  return result;
}

function statement(invoice, plays) {
  return generateNormalStatement(invoice, plays);
}

module.exports = {
  statement,
};
