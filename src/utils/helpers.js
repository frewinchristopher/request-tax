export default function injectFieldsIntoInvoice(payeeID, payerID, description, amount, taxPercent, sCryptoCurrency) {
  console.log(payeeID);
  console.log(payerID);
  console.log(description);
  console.log(amount);
  console.log(taxPercent);
  console.log(sCryptoCurrency);

  var sTotalPrice = (amount * (1 + (taxPercent / 100))).toString(); // float for price including tax

  const dd = {
    info: {
      Title: '',
      Author: '',
      Subject: '',
      Keywords: '',
      Creator: 'Request Network',
      Producer: 'Request Network',
      CreationDate: '',
      ModDate: '',
      Trapped: ''
    },
      footer: {
          stack: [
              {
                  text: 'A hash of this invoice was stored on the Ethereum blockchain and can be verified (only by the payer or payee) at:\n',
                  style: ['quote', 'small']
              },
              {
                  text: 'https://request-tax.herokuapp.com/verify-invoice',
                  link: 'https://request-tax.herokuapp.com/verify-invoice',
                  style: ['small', 'link']
              }
          ],
          margin: [72,40]
      },
    content: [
      {
        text: 'Your Company Name (Request ID: ' + payeeID + ')',
        style: 'header'
      },
      {
        text: [
          'From: Your Name\n',
          'Address Line 1\n',
          'Address Line 2\n',
          'City, State, Zip Code\n\n'
        ],
        alignment: 'right'
      },
      {
        alignment: 'justify',
        columns: [
          {
            text: ['Invoice For:\n\tClient\'s Name (Request ID: ' + payerID + ')\n',
            '\t\tAddress Line 1\n',
            '\t\tAddress Line 2\n',
            '\t\tCity, State, Zip Code\n']
          },
          {
            text: ['Invoice ID <here>\n',
            'Issue Date <here>\n',
            'PO Number <here>\n',
            'Due Date <here>\n\n'],
            alignment: 'right'
          }
        ]
      },
      {
        style: 'tableExample',
        table: {
          headerRows: 1,
          body: [
            [{text: 'Description', style: 'tableHeader'}, {text: 'Quantity', style: 'tableHeader'}, {text: 'Unit Price', style: 'tableHeader'}, {text: 'Amount', style: 'tableHeader'}],
            ['Sample value 1', 'Sample value 2', 'Sample value 3', 'Sample value 3'],
            ['Sample value 1', 'Sample value 2', 'Sample value 3', 'Sample value 3'],
            ['Sample value 1', 'Sample value 2', 'Sample value 3', 'Sample value 3'],
            ['Sample value 1', 'Sample value 2', 'Sample value 3', 'Sample value 3'],
            ['Sample value 1', 'Sample value 2', 'Sample value 3', 'Sample value 3'],
          ]
        },
        layout: {
          fillColor: function (i, node) {
            return (i % 2 === 0) ? '#CCCCCC' : null;
          }
        },
        alignment: 'center'
      },
      {
        text: [
          'Subtotal: ' + amount + ' ' + sCryptoCurrency + '\n',
          'VAT: ' + taxPercent + '%\n',
          'Amount Due: ' + sTotalPrice + ' ' + sCryptoCurrency + '\n'
        ],
        alignment: 'right'
      },
      {
        table: {
          widths: ['*'],
          body: [[" "], [" "]]
        },
        layout: {
          hLineWidth: function(i, node) {
            return (i === 0 || i === node.table.body.length) ? 0 : 2;
          },
          vLineWidth: function(i, node) {
            return 0;
          },
        }
      },
      {
        text: 'Subject/Description: ' + description,
        alignment: 'left'
      }
    ],
      pageSize: 'LETTER',
      pageMargins: 72,
    styles: {
      header: {
        fontSize: 18,
        bold: true
      },
      bigger: {
        fontSize: 15,
        italics: true
      },
      tableExample: {
        margin: [80, 15, 15, 80]
      },
      quote: {
  			italics: true
  		},
  		small: {
  			fontSize: 8
  		},
  		link: {
  		    fontSize: 8,
  		    color: 'blue',
  		    decoration: 'underline'
  		}
    }
  };
  return dd;
}
