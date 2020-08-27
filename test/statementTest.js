const test = require('ava');
const { statement, htmlStatement } = require('../src/statement');

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

test('should return correct statement \
when statement \
given playType is tragedy and audience is 20', t => {
  //given
  let invoice = {
    'customer': 'BigCo',
    'performances': [
      {
        'playID': 'hamlet',
        'audience': 20,
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
Hamlet: $400.00 (20 seats)\n\
Amount owed is $400.00\n\
You earned 0 credits \n');
});

test('should return correct html statement when htmlStatement given', t=>{
  //given
  let invoice = {
    'customer': 'BigCo',
    'performances': [
      {
        'playID': 'hamlet',
        'audience': 55,
      },
      {
        'playID': 'as-like',
        'audience': 35,
      },
      {
        'playID': 'othello',
        'audience': 40,
      },
    ],
  };
  let plays = {
    'hamlet': {
      'name': 'Hamlet',
      'type': 'tragedy',
    },
    'as-like': {
      'name': 'As You Like It',
      'type': 'comedy',
    },
    'othello': {
      'name': 'Othello',
      'type': 'tragedy',
    },
  };

  //when
  const result = htmlStatement(invoice, plays);

  t.is(result, '<h1>Statement for BigCo</h1>\n' +
    '<table>\n' +
    '<tr><th>play</th><th>seats</th><th>cost</th></tr>' +
    '<tr><td>Hamlet</td><td>55</td><td>$650.00</td></tr>\n' +
    '<tr><td>As You Like It</td><td>35</td><td>$580.00</td></tr>\n' +
    '<tr><td>Othello</td><td>40</td><td>$500.00</td></tr>\n' +
    '</table>\n' +
    '<p>Amount owed is <em>$1,730.00</em></p>\n' +
    '<p>You earned <em>47</em> credits</p>\n');

})