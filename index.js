const fs = require('fs');
const http = require('http');
const url = require('url');

const replaceTemplate = require('./modules/replaceTemplate.js')
////////////////////////////////
///////// Files ////////
////////////////////////////////
//Blocking , synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')

// console.log(textIn);
// const textOut = `This is what we know about the avocado ${textIn}. \n Created on ${Date.now()}`

// fs.writeFileSync('./txt/output.txt', textOut)

// Non-blocking asynchronous way

// fs.readFile('./txt/start.txt','utf-8' ,(err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`,'utf-8' ,(err, data2) => {
//     console.log(data2);
//       fs.readFile(`./txt/append.txt`,'utf-8' ,(err, data3) => {
//         console.log(data3);

//         fs.writeFile('./txt/final.txt',`${data2}\n${data3}`, 'utf-8' ,(err) => {
//           console.log('File created');
//         })
//       })
//   })
// })

////////////////////////////////
///////// Server ////////
//////////////////////////// ////

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const productData = JSON.parse(data)

const server = http.createServer((req, res) => {
  const{ query, pathname } = url.parse(req.url, true)
  
  // Overview page
  if(pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
        'Content-type': 'text/html'
    })

    const cardsHTML = productData.map((item) => replaceTemplate(tempCard, item)).join('')
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHTML)

    res.end(output)

  // Product page
  } else if(pathname === '/product') {
    const product = productData[query.id]
    
    res.writeHead(200, {
      'Content-type': 'text/html'
    })
    const output = replaceTemplate(tempProduct, product)
    
    res.end(output)

  // API 
  } else if (pathname === '/api') {
      res.writeHead(200, {
        'Content-type': 'application/json'
      })
      res.end(data)

  // Not found
  } else {
    // Have to set headers before sending back the response
    res.writeHead(404, { 
      statusMessage: 'Page Not Found', 
      'Content-type': 'text/html' 
    })
    res.end('<h1>This page could not be found</h1>')
  }
})

server.listen(8080, '127.0.0.1', () => {
  console.log('listening on port 8080');
}) 