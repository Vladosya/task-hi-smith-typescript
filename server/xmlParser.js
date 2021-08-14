/* eslint-disable node/handle-callback-err */
/* eslint-disable no-console */
const fs = require('fs')
const xml2js = require('xml2js')

const parser = new xml2js.Parser()

fs.readFile('example.xml', (_err, data) => {
  parser.parseString(data, (_err, result) => {
    console.log('result.rss.channel:', result.rss)
    fs.writeFileSync('./data.json', JSON.stringify(result.rss.channel), 'utf-8')
  })
})
