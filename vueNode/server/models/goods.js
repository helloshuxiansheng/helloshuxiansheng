let mongoose = require('mongoose');
let  Schema = mongoose.Schema;//导入mongoose.Schema模型
//创建Schema模型，定义模型中的属性和类型
let productSchema = new Schema({
  "productId": { type :String},
  "productName":String,
  "prodcutPrice":Number,
  "prodcutImg":String
});
// 导出Schema模型，并命名
module.exports = mongoose.model('Good',productSchema);
