
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

    return function (price, paidCash) {
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

        // calculate the total amount of money available in the cashBox
        let cashBoxTotal = cashBox
            .map(obj => Object.entries(obj))
            .flat()
            .reduce((acc, entry) => acc + (Number(entry[0]) * entry[1]), 0);

        // calculate the change
        let totalChange = paidCash - price;

        // create array to store change
        let changeArray = [];

        // output for exceptions
        // check if amount paid is enough to cover price
        if (totalChange < 0 && Math.abs(totalChange) === 1) {
            return `Customer should pay 1 more Euro.`;
        } else if (totalChange < 0 && Math.abs(totalChange) < 1) {
            return `Customer should pay ${Math.abs(totalChange.toFixed(2)) * 100} more cents.`;
        } else if (totalChange < 0 && Math.abs(totalChange) > 1) {
            return `Customer should pay ${Math.abs(totalChange.toFixed(2))} more Euros.`;
        }

        // check if cash box is empty or not enough coins
        if (cashBoxTotal < totalChange || cashBoxTotal === 0) {
            return 'No change is available!';
        }
        // if there is enough money in the cash box to return change proceed as follows:
        // divide totalChange by each denomination of currency if it is less than or equal to the totalChange due
        else if (cashBoxTotal > totalChange) {

            console.log('Cash box before adding paid cash:', cashBox);
            // add paid cash to cash box
            cashBox.forEach(denom => {
                if (paidCash >= Object.keys(denom)) {
                    let denomCount = Math.floor(paidCash / Object.keys(denom));
                    denom[Object.keys(denom)] += denomCount;
                    paidCash = parseFloat((paidCash % Object.keys(denom)).toFixed(2));

                }
            });

            console.log('Cash box after adding paid cash:', cashBox);

            // deduct change from cash Box
            cashBox.forEach(denom => {
                if (totalChange >= Object.keys(denom) && denom[Object.keys(denom)] > 0) {
                    let denomCount = Math.floor(totalChange / Object.keys(denom));
                    if (denomCount > denom[Object.keys(denom)]) {
                        denomCount = denom[Object.keys(denom)];
                    }
                    if (Object.keys(denom) >= 1) {
                        changeArray.push({ [Object.keys(denom) + ' Euro']: denomCount });
                    } else
                        changeArray.push({ [Object.keys(denom) + ' Cent']: denomCount });

                    denom[Object.keys(denom)] -= denomCount;
                    totalChange = parseFloat((totalChange - denomCount * Object.keys(denom)).toFixed(2));

                }
            });

            console.log('Cash box after deducting change:', cashBox);

        }
        return changeArray;

    }

}

const cashCounter = createCashCounter();

console.log('TEST 1');
console.log('The Customer receives:', cashCounter(3.75, 50), '\n');
// [
// { '20 Euro': 2 },
// { '5 Euro': 1 },
// { '1 Euro': 1 },
// { '0.2 Cent': 1 },
// { '0.05 Cent': 1 }
// ]
console.log('TEST 2');
console.log('The Customer receives:', cashCounter(4.50, 20), '\n');
// [ { '10 Euro': 1 }, { '5 Euro': 1 }, { '0.5 Cent': 1 } ]

console.log('TEST 3');
console.log('The Customer receives:', cashCounter(4, 3), '\n');
// 'Customer should pay 1 more Euro.'

console.log('TEST 4');
console.log('The Customer receives:', cashCounter(3.80, 3), '\n');
// 'Customer should pay 80 more cents.'

console.log('TEST 5');
console.log('The Customer receives:', cashCounter(16.75, 15), '\n');
// 'Customer should pay 1.75 more Euros.'

console.log('TEST 6');
console.log('The Customer receives:', cashCounter(25.50, 1500), '\n');
// ' No change is Available!'

// console.log('TEST 7: user input');
// const readlineSync = require('readline-sync');

// const costOfItems = readlineSync.question('Please enter the total price of the items: ');
// const cashPaid = readlineSync.question('Please enter the amount of cash given by customer: ');
// console.log('The customer receives:', cashCounter(costOfItems, cashPaid));
