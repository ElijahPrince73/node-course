const fs = require('fs');
const http = require('http');
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
////////////////////////////////

const server = http.createServer((req, res) => {
  res.end('hello world')
})

server.listen(8080, '127.0.0.1', () => {
  console.log('listening on port 8080');
})