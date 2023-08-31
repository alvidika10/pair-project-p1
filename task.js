const pdf = require('pdfjs')
const fs = require('fs')


const doc = new pdf.Document({
    font:    require('pdfjs/font/Helvetica'),
    padding: 10
  })
  doc.pipe(fs.createWriteStream('output.pdf'))
  
  // render something onto the document
  
  return doc.end()