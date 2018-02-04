import { parseXRBAccount } from './addressValidatorUtils'; // copied javascript source code from raiwebwallet
var WAValidator = require('wallet-address-validator');

// generic function that trees down into the currency-specific validation functions
export function determineCryptoCurrencyGeneric(sAddress) {
  let oResponse;
  if (isValidBTCAddress(sAddress)) {
    return oResponse = {bValidAddress: true, sCryptoCurrency: 'BTC'};
  } else if (isValidETHAddress(sAddress)) {
    return oResponse = {bValidAddress: true, sCryptoCurrency: 'ETH'};
  } else if (isValidLTCAddress(sAddress)) {
    return oResponse = {bValidAddress: true, sCryptoCurrency: 'LTC'};
  } else if (isValidXRBAddress(sAddress)) {
    return oResponse = {bValidAddress: true, sCryptoCurrency: 'XRB'};
  } else {
    return;
  }
}
function isValidBTCAddress(sAddress) {
  return WAValidator.validate(sAddress, 'BTC');
}
function isValidETHAddress(sAddress) {
  // source code copied from ethereumjs-utils, cuz their damn thing wont minify with webpack https://github.com/ethereumjs/ethereumjs-util/blob/757ba73457b372a76379046ac38c438c93618302/index.js#L446
  return /^0x[0-9a-fA-F]{40}$/.test(sAddress)
}
function isValidLTCAddress(sAddress) {
  return WAValidator.validate(sAddress, 'LTC');
}
function isValidXMRAddress(sAddress) {
  // from https://monero.stackexchange.com/questions/1502/what-do-monero-addresses-have-in-common
  // They consist of 95 characters
  // They start with a 4
  // The second character can only be a number (0-9), or letters A or B
  return sAddress.length === 95 && sAddress[0] === "4" && (sAddress[1].match(/[0-9]/) || sAddress[1] === "A" || sAddress[1] === "B");
}
function isValidXRBAddress(sAddress) {
  return parseXRBAccount(sAddress);
}

export default { determineCryptoCurrencyGeneric };
