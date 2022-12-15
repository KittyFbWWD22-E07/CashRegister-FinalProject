const rewire = require('rewire');

describe('cashCounter', () => {
  it('Should be defined', () => {
    const rewire = require('rewire');
    const solution = rewire('../solution');
    const cashCounter = solution.__get__('cashCounter');
    expect(cashCounter).toBeDefined();
  });
  it('Should tender exact change with available denominations', () => {
    const rewire = require('rewire');
    const solution = rewire('../solution');
    const cashCounter = solution.__get__('cashCounter');
    expect(cashCounter(1, 50)).toEqual([
      { '20 Euro': 2 },
      { '5 Euro': 1 },
      { '2 Euro': 2 },
    ]);
    expect(cashCounter(33.33, 50)).toEqual([
      { '10 Euro': 1 },
      { '5 Euro': 1 },
      { '1 Euro': 1 },
      { '0.5 Cent': 1 },
      { '0.1 Cent': 1 },
      { '0.05 Cent': 1 },
      { '0.02 Cent': 1 },
    ]);
    expect(cashCounter(46.67, 50)).toEqual([
      { '2 Euro': 1 },
      { '1 Euro': 1 },
      { '0.2 Cent': 1 },
      { '0.1 Cent': 1 },
      { '0.02 Cent': 1 },
      { '0.01 Cent': 1 },
    ]);
  });
});
