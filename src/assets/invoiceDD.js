// pdfmake requires a a variable called dd, which stands for 'document definition'
const dd = {
    footer: {
        stack: [
            {
                text: 'A hash of this invoice document was stored on the Ethereum Blockchain and can be verified, only by payer or payee at\n',
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
      text: 'Your Company Name',
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
          text: ['Invoice For:\n\tClient\'s Name\n',
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
      text: 'Subject:\n\n',
      alignment: 'left'
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
        'Subtotal\n',
        'VAT\n',
        'Amount Due\n',
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
      text: 'Subject:\n\n',
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

export default dd;
