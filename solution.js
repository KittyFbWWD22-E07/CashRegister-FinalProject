
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

        return function (price, paidAmt) {
            // calculate the total amount of money available in the cashBox
            let cashBoxTotal = cashBox
                               .map(obj => Object.entries(obj))
                               .flat()
                               .reduce((acc, entry) => acc + (Number(entry[0]) * entry[1]), 0);

            // calculate the change
            let totalChange = paidAmt - price;

            let changeArray = [];

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
                // let changeArray = [];
                // add paid cash to cash box
                    cashBox.forEach(denom => {if (paidAmt >= Object.keys(denom) ) {
                        let denomCount = Math.floor(paidAmt / Object.keys(denom));
                        denom[Object.keys(denom)] += denomCount;
                        paidAmt = parseFloat((paidAmt % Object.keys(denom)).toFixed(2));
                    }})

                    // console.log(cashBox);

                // deduct change from cash Box
                cashBox.forEach(denom => {if (totalChange >= Object.keys(denom) ) {
                    let denomCount = Math.floor(totalChange / Object.keys(denom));
                    if (Object.keys(denom) >= 1) {
                        changeArray.push({[Object.keys(denom) + ' Euro'] : denomCount});
                    } else
                        changeArray.push({[Object.keys(denom) + ' Cent'] : denomCount});

                    denom[Object.keys(denom)] -= denomCount;
                    totalChange = parseFloat((totalChange % Object.keys(denom)).toFixed(2));
                }})


               }
            return changeArray;


       }
}

cashCounter = createCashCounter();

console.log(cashCounter(3.75, 50));
// [
// { '20 Euro': 2 },
// { '5 Euro': 1 },
// { '1 Euro': 1 },
// { '0.2 Cent': 1 },
// { '0.05 Cent': 1 }
// ]

console.log(cashCounter(4.5, 20));
// [ { '10 Euro': 1 }, { '5 Euro': 1 }, { '0.5 Cent': 1 } ]
