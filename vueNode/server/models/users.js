let mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
  'userID':String,
  'userNum':String,
  'userPwd':String,
  'orderList':Array,
  'carList':[
    {
      'productID':String,
      'productName':String,
      'prodcutPrice':String,
      'checked':String,
      'productNum':String
    }
  ],
  'addressList':Array
});
