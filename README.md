# RequestTax

This demo is live on https://request-tax.herokuapp.com

Request Tax is a series of React Components and Solidity Smart Contracts that enabled Business to business (B2B) invoicing as well as calculating value added tax (VAT) and sales tax in real time on the Request Network.

**\*\*This project is in beta stage! No contracts have been deployed to any of the test or main Nthereum networks!**

# Developers - Getting Started

- clone this repository:

`git clone https://github.com/frewinchristopher/request-tax.git`

- start it up with:

`npm install`

`npm run dev`

- your browser should open to localhost:3000

- in a separate console, start an instance of Ethereum's testrpc:

`testrpc`

- in a browser, open Ethereum's Remix IDE (http://remix.ethereum.org/)

- in the 'Environment' input, select 'Web3 Provider'

- select 'OK' when it asks 'Are you sure you want to connect to an Ethereum node?'

- in the field, provide the web3 provider endpoint (this is default to be localhost:8545; after issuing the `testrpc` command, you should see something like `Listening on localhost:8545` in the console)

- once connected to the `testrpc`, copy the contents of `/src/contracts/Invoicing.sol` into Remix IDE

- compile and deploy (button 'Create') the smart contract

- use this deployed address in the address field in the app

- use any of the 10 addresses issued in the `testrpc` as 'Request IDs' in the app


# Request ID and Company Maintenance

As part of the RequestTax Project, businesses will soon be able update, edit, and delete their contact information. This contact information can be used in invoices. When there is no information on the company yet or a company is using the Request Network for the first time, a company can simply use their Request ID and additional address and contact information can be filled in later. In short, a Request ID is the main key that can be linked to all of a company's public information on the Request Network.

# Invoicing Smart Contract

The Invoicing module, which stores and secures hash representations of business to business invoices, is already partly written in `/src/contracts/`

# Value Added Tax Smart Contract

Value added tax, which represents most of the taxed world outside the US, will be written in `ValueAddedTax.sol`.

# Sales Tax Smart Contract

Sales Tax, which is primarily in the United States, will be written in `SalesTax.sol`.

# Real Time Tax to Government Entities

If businesses so wish, they can always provide a third party, that is, a government or state entity, to all their B2B transactions. This third party will share all the permissions any two trading would share with each other. This will be written in `ThirdParty.sol`.
