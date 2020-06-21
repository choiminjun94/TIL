var mongoose = require('mongoose');

// schema - schema(Readme에 정의)
var postSchema = mongoose.Schema({
  // title, body, createdAt, updatedAt으로 구성
  title:{type:String, required:true},
  body:{type:String, required:true},
  createdAt:{type:Date, default:Date.now},
  // default 항목으로 기본 값을 지정할 수 있습니다. 
  // 함수명을 넣으면 해당 함수의 return이 기본값이 됩니다
  updatedAt:{type:Date},
});

// model & export
var Post = mongoose.model('post', postSchema);
module.exports = Post;