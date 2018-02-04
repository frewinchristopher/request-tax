const sPreString = "import React from 'react'\n" +
"import PropTypes from 'prop-types'\n" +
"import RequestTaxButton from 'request-tax-button'; // remember to install with 'npm install --save request-tax-button' !!!\n" +
"\n" +
"const oSettings = {\n";

const sPostString = "}\n" +
"\n" +
"class RequestTaxButtonCustom extends React.Component {\n" +
"  render () {\n" +
"    return (\n" +
"      <RequestTaxButton {...oSettings}/>\n" +
"    )\n" +
"  }\n" +
"}\n"+
"\n" +
"export default RequestTaxButtonCustom;";

export function generateComponentCode(oState) {
  var sStateString = "";
  // converts the button's state object into a string to print to the file
  for (var property in oState) {
    if (oState[property] !== true && oState[property] !== false) {
      sStateString += '\t' + property + ': "' + oState[property] +'",\n';
    } else {
      sStateString += '\t' + property + ': ' + oState[property] +',\n';
    }
  }
  sStateString.slice(0,-2); // remove trailing comma and newline
  return sPreString + sStateString + sPostString;
}

export function copyTextToClipboard(sText) {
  var bResult = true; // assume at first this process will work ;)
  var textArea = document.createElement("textarea");

  //
  // *** This styling is an extra step which is likely not required. ***
  //
  // Why is it here? To ensure:
  // 1. the element is able to have focus and selection.
  // 2. if element was to flash render it has minimal visual impact.
  // 3. less flakyness with selection and copying which **might** occur if
  //    the textarea element is not visible.
  //
  // The likelihood is the element won't even render, not even a flash,
  // so some of these are just precautions. However in IE the element
  // is visible whilst the popup box asking the user for permission for
  // the web page to copy to the clipboard.
  //

  // Place in top-left corner of screen regardless of scroll position.
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = '2em';
  textArea.style.height = '2em';

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0;

  // Clean up any borders.
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';

  // Avoid flash of white box if rendered for any reason.
  textArea.style.background = 'transparent';


  textArea.value = sText;

  document.body.appendChild(textArea);

  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
    bResult = false;
  }
  document.body.removeChild(textArea);
  return bResult;
}

export default { generateComponentCode };
