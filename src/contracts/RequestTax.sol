pragma solidity ^0.4.19;

import "./Ownable.sol";

// interface to access sales tax invoicing contract
contract SalesTaxInvoicingInterface {
  function getInvoice(uint256 _invoiceId) external view returns (
    bool contractFound
  );
}

// interface to access value added tax invoicing contract
contract ValueAddedTaxInvoicingInterface {
  function getInvoice(uint256 _invoiceId) external view returns (
    bool contractFound
  );
}

/// @title
/// @author Christopher Frewin
/// @notice For now, this contract just adds a multiply function
contract RequestTax is Ownable {

  SalesTaxInvoicingInterface salesTaxInvoicingContract;
  ValueAddedTaxInvoicingInterface valueAddedTaxInvoicingContract;

  function setSalesTaxInvoicingContractAddress(address _address) external onlyOwner {
      salesTaxInvoicingContract = SalesTaxInvoicingInterface(_address);
  }
  function setValueAddedTaxInvoicingContractAddress(address _address) external onlyOwner {
      valueAddedTaxInvoicingContract = ValueAddedTaxInvoicingInterface(_address);
  }
}
