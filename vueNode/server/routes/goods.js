let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Goods  =require('../models/goods');
mongoose.connect('mongodb://127.0.0.1:27017/lhf');
mongoose.connection.on('connected',function () {
  console.log('链接成功')
});
mongoose.connection.on('error',function () {
  console.log('链接失败')
});
router.get('/',function (req,res,next) {
  let page = parseInt(req.param("page")) ; //获取路径参数传过来的值
  let pageSize = parseInt(req.param("pageSize")) ;
  let sort = req.param('sort');
  let priceGt = req.param('priceGt');
  let priceLt = req.param('priceLt');
  let skip = (page - 1) * pageSize;
  let params = { };
  if( priceGt!="" && priceLt!=""){
    params = {
      productPrice:{
        $gt:parseInt(priceGt),
        $lt:parseInt(priceLt)
      }
    };
  }





  // res.end(params.toString());
  let goodsModel = Goods.find(params).skip(skip).limit(pageSize);//每页多少条，跳过多少条
  // let goodsModel = Goods.find(params).skip(skip).limit(pageSize);//每页多少条，跳过多少条

  goodsModel.sort({ 'productPrice':sort }); //排序  1 :正序 -1 倒序
  goodsModel.exec(function (err,doc) {
    if(err){
      res.json({
        status:'001',
        msg:err.message
      })
    }else{
      res.json({
        status:'000',
        msg:"",
        result:{
          count:doc.length,
          list:doc
        }
      })
    }
  })
});
module.exports = router;
