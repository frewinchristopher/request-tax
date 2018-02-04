import axios from 'axios';

// ethereum API - etherscan
const ETH_API_START = "http://api.etherscan.io/api?module=account&action=txlist&address=";
const ETH_API_END = "&startblock=0&endblock=99999999&sort=asc&apikey=D5VZY7FYF3JZA1IZPTNV6ZCC34YIG29Q28";

// bitcoin API - blockcypher
const BTC_API_START = "https://api.blockcypher.com/v1/btc/main/addrs/";
const BTC_API_END = "/full";

// litecoin API - socoin
const LTC_API_START = "https://chain.so/api/v2/get_tx_spent/LTC/"

// Doge API - socoin
const DOGE_API_START = "https://chain.so/api/v2/get_tx_spent/DOGE/"

// generic function that trees into all others
export async function getTransactionsGeneric(sAddress, sCryptoCurrency) {
  let aTransactions;
  console.log(sCryptoCurrency);
  switch (sCryptoCurrency) {
    case 'BTC':
      return aTransactions = await getBTCTransactions(sAddress);
    case 'ETH':
      return aTransactions = await getETHTransactions(sAddress);
    case 'LTC':
      return aTransactions = await getLTCTransactions(sAddress);
    case 'XRB':
      return aTransactions = await getXRBTransactions(sAddress);
    default:
      return aTransactions = null;
  }
}

async function getBTCTransactions(sAddress) {
  var aRawTransactions, oDate, sLocaleDateTime, sValue;
  var aTransactions = [];
  var aFromAddresses = [];
  var aToAddresses = [];
  const response = await axios(BTC_API_START + sAddress + BTC_API_END)
  console.log(response);
  aRawTransactions = response.data.txs;
  aRawTransactions.forEach((oTransaction) => {
    console.log(oTransaction);
    oDate = new Date(oTransaction.timeStamp*1000); // convert UNIX timestamp
    sLocaleDateTime = oDate.toLocaleDateString() + " " + oDate.toLocaleTimeString(); // date to human readable string
    sValue = (parseFloat(oTransaction.total) / 100000000).toString(); // TODO: include bignumber.js?

    // figure out 'to' and 'from' addresses
    aFromAddresses = oTransaction.inputs[0].addresses;
    aToAddresses = oTransaction.outputs[0].addresses;

    if (aFromAddresses.includes(sAddress)) {
      aTransactions.push({cryptocurrency: 'BTC', amount: sValue, to: aToAddresses, time: sLocaleDateTime, unixTime: oTransaction.timeStamp});
    } else {
      aTransactions.push({cryptocurrency: 'BTC', amount: sValue, from: aFromAddresses, time: sLocaleDateTime, unixTime: oTransaction.timeStamp});
    }
  });
  return aTransactions;
}

async function getETHTransactions(sAddress) {
  var aRawTransactions, oDate, sLocaleDateTime, sValue;
  var aTransactions = [];
  const response = await axios(ETH_API_START + sAddress + ETH_API_END)
  console.log(response);
  aRawTransactions = response.data.result;
  aRawTransactions.forEach((oTransaction) => {
    oDate = new Date(oTransaction.timeStamp*1000); // convert UNIX timestamp
    sLocaleDateTime = oDate.toLocaleDateString() + " " + oDate.toLocaleTimeString(); // date to human readable string
    sValue = (parseFloat(oTransaction.value) / 1000000000000000000).toString(); // TODO: include bignumber.js?
    oTransaction.to = oTransaction.to.toLowerCase();
    sAddress = sAddress.toLowerCase();
    if (oTransaction.to !== sAddress) {
      aTransactions.push({cryptocurrency: 'ETH', amount: sValue, to: oTransaction.to, time: sLocaleDateTime, unixTime: oTransaction.timeStamp});
    } else {
      console.log("tis a from my lord");
      aTransactions.push({cryptocurrency: 'ETH', amount: sValue, from: oTransaction.from, time: sLocaleDateTime, unixTime: oTransaction.timeStamp});
    }
  });
  return aTransactions;
}

async function getLTCTransactions(sAddress) {
  var aRawTransactions, oDate, sLocaleDateTime, sValue;
  var aTransactions = [];
  const response = await axios(LTC_API_START + sAddress)
  console.log(response);
  aRawTransactions = response.data.result;
  aRawTransactions.forEach((oTransaction) => {
    oDate = new Date(oTransaction.timeStamp*1000); // convert UNIX timestamp
    sLocaleDateTime = oDate.toLocaleDateString() + " " + oDate.toLocaleTimeString(); // date to human readable string
    sValue = (parseFloat(oTransaction.value) / 1000000000000000000).toString(); // TODO: include bignumber.js?
    oTransaction.to = oTransaction.to.toLowerCase();
    sAddress = sAddress.toLowerCase();
    if (oTransaction.to !== sAddress) {
      aTransactions.push({cryptocurrency: 'ETH', amount: sValue, to: oTransaction.to, time: sLocaleDateTime, unixTime: oTransaction.timeStamp});
    } else {
      console.log("tis a from my lord");
      aTransactions.push({cryptocurrency: 'ETH', amount: sValue, from: oTransaction.from, time: sLocaleDateTime, unixTime: oTransaction.timeStamp});
    }
  });
  return aTransactions;
}

async function getXRBTransactions(sAddress) {

}

async function getDOGETransactions(sAddress) {

}

export default { getTransactionsGeneric };
