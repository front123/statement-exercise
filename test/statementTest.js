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

test('should return correct statement \
when statement \
given playType is comedy and audience is 40', t => {
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
      'type': 'comedy',
    },
  };

  const result = statement(invoice, plays);

  t.is(result, 'Statement for BigCo\n \
Hamlet: $620.00 (40 seats)\n\
Amount owed is $620.00\n\
You earned 18 credits \n');
});

test('should return error message \
when statement \
given unknown type', t => {
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
      'type': 'helloworld',
    },
  };

  try {
    statement(invoice, plays);
  } catch (error) {
    t.is(error.message, 'unknown type: helloworld');
  }
});

test('should return correct statement \
when statement \
given playType is comedy and audience is 10', t => {
  //given
  let invoice = {
    'customer': 'BigCo',
    'performances': [
      {
        'playID': 'hamlet',
        'audience': 10,
      }
    ],
  };
  let plays = {
    'hamlet': {
      'name': 'Hamlet',
      'type': 'comedy',
    },
  };

  const result = statement(invoice, plays);

  t.is(result, 'Statement for BigCo\n \
Hamlet: $330.00 (10 seats)\n\
Amount owed is $330.00\n\
You earned 2 credits \n');
});