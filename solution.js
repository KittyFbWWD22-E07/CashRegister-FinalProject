
function cashCounter(price, paidAmt) {
     // call the cashCounter to access cashBox
     let cashCounter = createCashCounter();
     // calculate the total amount of money available in the cashBox
     let cashBoxTotal = cashCounter()
                        .map(obj => Object.entries(obj))
                        .flat()
                        .reduce((acc, entry) => acc + (Number(entry[0]) * entry[1]), 0);
     console.log(cashBoxTotal);
     // create an array of the denominations used in the cashBox
     const currencyDenoms = cashCounter()
                           .map(obj => Number(Object.keys(obj)))
                           .flat();
     console.log(currencyDenoms);
     // calculate the change
     let totalChange = paidAmt - price;
     // output for exceptions
     // check if amount paid is enough to cover price
     if (totalChange < 0 && Math.abs(totalChange) === 1) {
        console.log(`Customer should pay 1 more Euro.`);
      } else if (totalChange < 0 && Math.abs(totalChange) < 1) {
            console.log(`Customer should pay ${Math.abs(totalChange) * 100} more cents.`);
      } else if (totalChange < 0 && Math.abs(totalChange) > 1) {
            console.log(`Customer should pay ${Math.abs(totalChange)} more Euros.`);
      }
     // check if cash box is empty or not enough coins
     if (cashBoxTotal < totalChange || cashBoxTotal === 0) {
            console.log('No change is available!');
      }
        // if totalChange < cashBoxTotal proceed as follows
        // divide totalChange by each denomination of currencyDenoms array once it is less than or equal to the totalChange due
        else if (cashBoxTotal > totalChange) {
            let changeArray = [];
            

        }
     return changeArray;


}

    const createCashCounter = function () {
            let cashBox = [
                { 50: 10 },
                { 20: 10 },
                { 10: 10 },
                { 5: 25 },
                { 2: 25 },
                { 1: 25 },
                { 0.5: 25 },
                { 0.2: 25 },
                { 0.1: 25 },
                { 0.05: 25 },
                { 0.02: 25 },
                { 0.01: 25 },
            ];

            return function () {
                return cashBox; // ??????
        }
    }




// const createCashCounter = function () {
//     return function () {

//         return cashBox; // ??????
//     }

// }

// let cashBox = [
//     { 50: 10 },
//     { 20: 10 },
//     { 10: 10 },
//     { 5: 25 },
//     { 2: 25 },
//     { 1: 25 },
//     { 0.5: 25 },
//     { 0.2: 25 },
//     { 0.1: 25 },
//     { 0.05: 25 },
//     { 0.02: 25 },
//     { 0.01: 25 },
// ];
// const cashCounter = createCashCounter();
// console.log(cashCounter);
// console.log(cashBox);

console.log(cashCounter(3.75, 50));
// [
// { '20 Euro': 2 },
// { '5 Euro': 1 },
// { '1 Euro': 1 },
// { '0.2 Cent': 1 },
// { '0.05 Cent': 1 }
// ]
