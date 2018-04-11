const express = require('express'),
      bodyParser = require('body-parser'),
      fs = require('fs');
    //   multer = require('multer');

var server = express();
server.use(express.static(__dirname));
server.use(bodyParser.urlencoded())
// 请求部分
server.get('/api/test1',function(req,res){
    console.log('收到请求');
    console.log(req.query)
    res.status(200).json(req.query)
    res.status(200).json()
     
})

server.listen(3000,function(){
    console.log('server run!');
})