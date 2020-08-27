const test = require('ava');
const { statement } = require('../src/statement');

test('should return correct statement \
when statement \
given playType is tragedy and audience is 40', t => {
  //given
  let invoice = {
    'customer': 'BigCo',
    'performances': [
      {
        'playID': 'hamlet',
        'audience': 40,
      }
    ],
  };
  let plays = {
    'hamlet': {
      'name': 'Hamlet',
      'type': 'tragedy',
    },
  };

  const result = statement(invoice, plays);

  t.is(result, 'Statement for BigCo\n \
Hamlet: $500.00 (40 seats)\n\
Amount owed is $500.00\n\
You earned 10 credits \n');
});
