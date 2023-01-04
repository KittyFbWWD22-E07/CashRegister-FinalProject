
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


        // calculate the total amount of money available in the cashBox
        let cashBoxTotal = cashBox
            .map(obj => Object.entries(obj))
            .flat()
            .reduce((acc, entry) => acc + (Number(entry[0]) * entry[1]), 0);

        // calculate total of paid cash
        const totalPaidCash = paidCash.reduce((acc, paidDenomArray) => acc + (paidDenomArray[0] * paidDenomArray[1]), 0);

        // calculate the change
        let totalChange = parseFloat((totalPaidCash - price).toFixed(2));
        let change = totalChange;

        // create array to store change
        let changeArray = [];

        // output for exceptions
        // check if amount paid is enough to cover price
        if (totalChange < 0 && Math.abs(totalChange) === 1) {
            return `Customer should pay 1 more Euro.`;
        } else if (totalChange < 0 && Math.abs(totalChange) < 1) {
            return `Customer should pay ${Math.abs(totalChange) * 100} more cents.`;
        } else if (totalChange < 0 && Math.abs(totalChange) > 1) {
            return `Customer should pay ${Math.abs(totalChange)} more Euros.`;
        }

        // check if cash box is empty or not enough coins
        if (cashBoxTotal < totalChange || cashBoxTotal === 0) {
            return 'No change is available!';
        }
        // if there is enough money in the cash box to return change proceed as follows:
        // divide totalChange by each denomination of currency if it is less than or equal to the totalChange due
        else if (cashBoxTotal > totalChange) {

            console.log('Cash box before adding paid cash:', cashBox);

            // add paid cash to cash box a follows

            const cashBoxDenoms = [];
            for (const denom of cashBox) {
                for (key in denom) {
                    cashBoxDenoms.push(Number(key));
                }
            }
            for (const paidCashDenom of paidCash) {
                if (!cashBoxDenoms.includes(paidCashDenom[0])) {
                    cashBox.unshift({ [paidCashDenom[0]]: paidCashDenom[1] })
                } else
                    cashBox.forEach(denom => {
                        let denomVal = Object.keys(denom)[0];
                        if (paidCashDenom[0] === Number(denomVal)) {
                            let denomCount = paidCashDenom[1];
                            denom[denomVal] += denomCount;

                        }
                    });
            }

            console.log('Cash box after adding paid cash:', cashBox);

            // deduct change from cash Box
            cashBox.forEach(denom => {
                let denomVal = Object.keys(denom)[0];
                if (totalChange >= Number(denomVal) && denom[denomVal] > 0) {
                    let denomCount = Math.floor(totalChange / Number(denomVal));
                    if (denomCount > denom[denomVal]) {
                        denomCount = denom[denomVal];
                    }

                    if (Number(denomVal) >= 1) {
                        changeArray.push({ [denomVal + ' Euro']: denomCount });
                    } else
                        changeArray.push({ [denomVal + ' Cent']: denomCount });

                    denom[denomVal] -= denomCount;
                    totalChange = parseFloat((totalChange - denomCount * Number(denomVal)).toFixed(2));

                }
            });

            console.log('Cash box after deducting change:', cashBox, '\n');
            console.log(`Price: €${price}`);
            console.log(`Cash paid: €${totalPaidCash}`);
            console.log(`Change: €${change}`);

        }
        return changeArray;

    }

}

cashCounter = createCashCounter();

console.log('TEST 1');
console.log('The Customer receives:', cashCounter(3.75, [[100, 1]]), '\n');
// [
// { '20 Euro': 2 },
// { '5 Euro': 1 },
// { '1 Euro': 1 },
// { '0.2 Cent': 1 },
// { '0.05 Cent': 1 }
// ]
console.log('TEST 2');
console.log('The Customer receives:', cashCounter(4.50, [[20, 1]]), '\n');
// [ { '10 Euro': 1 }, { '5 Euro': 1 }, { '0.5 Cent': 1 } ]

console.log('TEST 3');
console.log('The Customer receives:', cashCounter(4, [[2, 1], [1, 1]]), '\n');
// 'Customer should pay 1 more Euro.'

console.log('TEST 4');
console.log('The Customer receives:', cashCounter(3.80, [[2, 1], [1, 1]]), '\n');
// 'Customer should pay 80 more cents.'

console.log('TEST 5');
console.log('The Customer receives:', cashCounter(16.33, [[5, 3]]), '\n');
// 'Customer should pay 1.75 more Euros.'

console.log('TEST 6');
console.log('The Customer receives:', cashCounter(90, [[50, 75]]), '\n');
// ' No change is Available!'

console.log('TEST 7');
console.log('The Customer receives:', cashCounter(35.50, [[10, 4], [0.50, 1]]), '\n');

// console.log('TEST 8: user input');
// const readlineSync = require('readline-sync');

// const costOfItems = readlineSync.question('Please enter the total price of the items: ');
// const cashPaid = readlineSync.question('Please enter the amount of cash given by customer: ');
// console.log('The customer receives:', cashCounter(costOfItems, cashPaid));
