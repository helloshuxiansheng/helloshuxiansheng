let user = require('./user') ;
console.log(user.sayHello());
const http = require('http');
const url = require('url');
const util  = require('util');
http.createServer((req,res)=>{
  console.log();
}).listen(3000,'127.0.0.1',()=>{
  console.log('open 127.0.0.1:3000')
});
