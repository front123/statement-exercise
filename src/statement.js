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

function buildStatementData(invoice, plays){
  let details = [];
  let totalAmount = 0;
  let volumeCredits = 0;
  let customer = invoice.customer;
  invoice.performances.map(perf => {
    const play = plays[perf.playID];
    let thisAmount = computeAmount(play.type, perf);
    let volumeCredit = addCredits(perf.audience, play.type);
    totalAmount += thisAmount;
    volumeCredits += volumeCredit;
    details.push({
      playName: play.name,
      audience: perf.audience,
      thisAmount,
      volumeCredit
    })
  })
  return {
    customer,
    totalAmount,
    volumeCredits,
    details
  }
}

function generateNormalStatement(invoice, plays){
  let data = buildStatementData(invoice, plays);
  let result = `Statement for ${data.customer}\n`;
  for (let detail of data.details) {
    result += ` ${detail.playName}: ${format(detail.thisAmount / 100)} (${detail.audience} seats)\n`;
  }
  result += `Amount owed is ${format(data.totalAmount / 100)}\n`;
  result += `You earned ${data.volumeCredits} credits \n`;
  return result;
}

function generateHtmlStatement(invoice, plays){
  let data = buildStatementData(invoice, plays);
  let result = `<h1>Statement for ${data.customer}</h1>\n<table>\n<tr><th>play</th><th>seats</th><th>cost</th></tr>`;
  for (let detail of data.details) {
    result += `<tr><td>${detail.playName}</td><td>${detail.audience}</td><td>${format(detail.thisAmount / 100)}</td></tr>\n`;
  }
  result += `</table>\n<p>Amount owed is <em>${format(data.totalAmount / 100)}</em></p>\n`;
  result += `<p>You earned <em>${data.volumeCredits}</em> credits</p>\n`;
  return result;
  
}

function statement(invoice, plays) {
  return generateNormalStatement(invoice, plays);
}

function htmlStatement(invoice, plays) {
  return generateHtmlStatement(invoice, plays);
}

module.exports = {
  statement,
  htmlStatement
};
