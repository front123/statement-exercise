const { PlayType } = require('./constant');

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

function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
  const format = createNumberFormat();
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = computeAmount(play.type, perf);
    // add volume credits
    volumeCredits += Math.max(perf.audience - 30, 0);
    // add extra credit for every ten comedy attendees
    if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5);
    //print line for this order
    result += ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
    totalAmount += thisAmount;
  }
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits \n`;
  return result;
}

module.exports = {
  statement,
};
