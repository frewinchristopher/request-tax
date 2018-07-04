pragma solidity ^0.4.19;

/* import "./SafeMath.sol"; // open zeppelin's smartmath */

contract Invoicing {

  // events! (one for each function right now)
  event InvoiceStored(bool bStored);
  event InvoiceValid(string sMessageCode);

  struct Invoice {
    address requestId;
    bool isValue;
  }

  mapping (uint => Invoice) public invoiceHashToPayerId;
  mapping (uint => Invoice) public invoiceHashToPayeeId;

  /// @notice This function verifies if the invoice is valid for this sender.
  /// @notice It returns true only if:
  /// @notice 1. the invoice actually exists AND
  /// @notice 2. the company is the real owner of the invoice
  /// @param _requestorRequestId The Request ID of the person requesting if the PDF is valid
  /// @param _invoiceHash The keccak256 hash of the base64 string of the PDF
  function validateInvoice(address _requestorRequestId, uint _invoiceHash) public {
    uint _count = 0;
    if (invoiceHashToPayeeId[_invoiceHash].isValue) { // first check that the invoice actually exists
      _count++;
    }
    if (invoiceHashToPayerId[_invoiceHash].isValue) {
      _count++;
    }
     // we should find this request ID / hash combo exactly twice (for both involved parties) - if count is 0 the invoice doesn't exist, if it is 1 something fishy is going on (invoice assigned to only one party)
     if (_count == 0) {
       InvoiceValid('noExist'); // this invoice ID does not exist
       return;
     }
     if (_count == 1) {
       InvoiceValid('error'); // this invoice ID does not exist
       return;
     }

    // otherwise it exists, figure out if 1. it is the payee requesting, 2. it is the payer requesting, or 3. they are not the owner and return false
    if (invoiceHashToPayeeId[_invoiceHash].requestId == _requestorRequestId) { // so were they the payee?
      InvoiceValid('payee');
    } else if (invoiceHashToPayerId[_invoiceHash].requestId == _requestorRequestId) { // or the payer?
      InvoiceValid('payer');
    } else {
      InvoiceValid('notOwner'); // they are not either, somehow they had an invoice from a different party (but they won't know that)
    }
  }
  /// @notice The biggun' for RequestTax - generates a the (unfortunately giant) list of parameters is as follows:
  /// @param _type --> client, identifier if msg.sender is payer or payee
  /// @param uniqInvoiceNonce --> global nonce generated on contract
  /// @param toCompanyName --> client
  /// @param toCompanyStreet --> client
  /// @param toCompanyCity --> client
  /// @param toCompanyZIP --> client
  /// @param toCompanyStateDistrict --> client
  /// @param toCompanyCountry --> client
  /// @param toCompanyTelephone --> client
  /// @param fromCompanyName --> client
  /// @param fromCompanyStreet --> client
  /// @param fromCompanyContactPerson --> client
  /// @param fromCompanyTelephone --> client
  /// @param description --> client
  /// @param supplyDate --> client
  /// @param invoiceDate --> client
  /// @param amount --> client
  /// @param VATAmount --> client, but determined
  /// @param totalAmount --> client calculated
  /// @param generatedUnixTime --> at submission time (button press)
  /// @param pdfVersion --> client defined and maintained, reverse compatible, specific per company if desired, otherwise default Request Invoice PDF (though also with version)
  /// @param pdfBase64 --> compiled with the corresponding pdfVersion
  /* function storeInvoiceComplex(string _type, uint _payeeRequestId, uint _invoiceId) public {
    if (_type == "asPayer") {
      invoiceToPayer[_invoiceId] = msg.sender;
      invoiceToPayee[_invoiceId] = _payeeRequestId;
    }
    if (_type == "asPayee") {
      invoiceToPayer[_invoiceId] = _payeeRequestId;
      invoiceToPayee[_invoiceId] = msg.sender;
    }
  } */

  /// @notice This function is the simplest way of storing an invoice on the request network, such that it is visible
  /// only two the payer and payee involved, and the parameters in the exact order are as follows:
  /// @param _payeeRequestId The payee Request ID
  /// @param _payeeRequestId The payer Request ID
  /// @param _invoiceHash the keccak256 hash of the base64 string of the invoice
  function storeInvoiceSimple(address _payeeRequestId, address _payerRequestId, uint _invoiceHash) public {
      invoiceHashToPayeeId[_invoiceHash].requestId = _payeeRequestId;
      invoiceHashToPayeeId[_invoiceHash].isValue = true;
      invoiceHashToPayerId[_invoiceHash].requestId = _payerRequestId;
      invoiceHashToPayerId[_invoiceHash].isValue = true;
      InvoiceStored(true);
  }
}
