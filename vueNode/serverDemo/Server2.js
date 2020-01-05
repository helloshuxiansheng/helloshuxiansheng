let http = require('http');
let url  = require('url');
let fs = require('fs');
http.createServer((req,res)=>{
 let  pathname = url.parse(req.url).pathname;
 // res.end(pathname);
 // console.log("file:"+ typeof  pathname);
 // fs.readFile(pathname.substring(1),function (err,data) {
 //   if(err){
 //     res.writeHead(404,{
 //       'Content-Type':"text/html"
 //     })
 //   }else{
 //     res.writeHead(200,{
 //       'Content-Type':'text/html'
 //     });
 //     res.write(data.toString())
 //   }
 //   res.end();
 // })
  let readFileUrl ='./'+pathname.substring(1)+'.html';
  fs.readFile(readFileUrl, function (err,data) {
    if(err){
      res.writeHead(404,{
        'Content-Type':'text/html'
      });
    }else{
      res.writeHead(200,{
        'Content-Type':'text/html'
      });
      res.write(data.toString());
    }

    res.end();
  });
 // console.log('file:'+pathname.substring(1))
}).listen(3000,'127.0.0.1',()=>{
  console.log('open:127.0.0.1');
});
