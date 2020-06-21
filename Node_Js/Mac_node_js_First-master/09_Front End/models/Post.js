var mongoose = require('mongoose');

// schema
var postSchema = mongoose.Schema({
  title:{type:String, required:true},
   //title 값은 반드시 존재 해야 한다.(required)
  body:{type:String, required:true},
  //body 값은 반드시 존재 해야 한다.(required)
  createdAt:{type:Date, default:Date.now},
  // default 항목으로 기본 값을 지정할 수 있습니다. 함수명을 넣으면 해당 함수의 return이 기본값이 됩니다
  updatedAt:{type:Date},
});

// model & export
var Post = mongoose.model('post', postSchema);
module.exports = Post;
