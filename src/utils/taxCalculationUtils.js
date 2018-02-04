import axios from 'axios';

const priceHistoricalAPI = "https://min-api.cryptocompare.com/data/pricehistorical?";

// for transaction values of same kind (BTC-BTC), (ETH-ETH)
async function getTransactionTimeValue(sCryptoCurrency, sFiatCurrency, iUnixTime) {
  try {
    return await axios(priceHistoricalAPI + "fsym=" + sCryptoCurrency + "&tsyms="+ sCryptoCurrency + "," + sFiatCurrency + "&ts=" + iUnixTime)
  } catch (e) {
    console.error(e); // 💩
  }
}

// for transaction values of like-kind exchanges (BTC-ETH), (ETH-REQ) etc
async function getLikeKindTimeValue(sCryptoCurrencyFrom, sCryptoCurrencyTo, sFiatCurrency, iUnixTime) {
  try {
    await axios(priceHistoricalAPI + "fsym=" + sCryptoCurrencyFrom + "&tsyms="+ sCryptoCurrencyTo + "," + sFiatCurrency + "&ts=" + iUnixTime)
  } catch (e) {
    console.error(e); // 💩
  }
}

async function getBoth(oTransaction, sFiatCurrency, iCurrentTime) {
  let transactionTimeValue = await getTransactionTimeValue(oTransaction.cryptocurrency, sFiatCurrency, oTransaction.unixTime); // value at time of transaction
  let currentTimeValue = await getTransactionTimeValue(oTransaction.cryptocurrency, sFiatCurrency, iCurrentTime); // current value
  return {...oTransaction, "transactionTimeValue": transactionTimeValue, "currentTimeValue": currentTimeValue};// spread everything from transaction, but include these calculated prices :)
}

// for each transaction, calculates the value of the transaction at transaction time and present day
export async function generateTaxData(aTransactions, sFiatCurrency) {
  var iCurrentTime = Math.round((new Date()).getTime() / 1000);; // current unix time to evaluate - TODO: allow user to set this to a specific date time for optimum taxes?
  var aTaxData = []; // the giant array which we are to fill
  await Promise.all(aTransactions.map(async (oTransaction) => {
    var oNewObj = await getBoth(oTransaction, sFiatCurrency, iCurrentTime);
    return aTaxData.push(oNewObj);
  })).then((completed) => {
    console.log("completed:");
    console.log(aTaxData);
    return aTaxData;
  }); // return the completed array once all promises have resolved
}

// function getBoth(oTransaction, sFiatCurrency, iCurrentTime, fn) {
//   let transactionTimeValue = await getTransactionTimeValue(oTransaction.cryptocurrency, sFiatCurrency, oTransaction.unixTime); // value at time of transaction
//   let currentTimeValue = await getTransactionTimeValue(oTransaction.cryptocurrency, sFiatCurrency, iCurrentTime); // current value
//   return {...oTransaction, "transactionTimeValue": transactionTimeValue, "currentTimeValue": currentTimeValue};// spread everything from transaction, but include these calculated prices :)
// }

// function generateTaxData(aTransactions) {
//     var i = 0,
//         length = aTransactions.length,
//         fn = function() {
//             if(i < length) {
//                 console.log(aTransactions[i]);
//                 getBoth(aTransactions[i], sFiatCurrency, iCurrentTime, fn);
//                 i++;
//             }
//         };
//
//     fn();
// }

export default { generateTaxData };
