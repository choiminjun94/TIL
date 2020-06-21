var mongoose = require('mongoose');

// schema - schema(Readme에 정의)
var postSchema = mongoose.Schema({
  // title, body, createdAt, updatedAt으로 구성
  title:{type:String, required:true},
  body:{type:String, required:true},
  author:{type:mongoose.Schema.Types.ObjectId, ref:'user', required:true}, 
  //  post schema에 author를 추가해 줍니다. 또한 ref:'user'를 통해 이 항목의 데이터가 user collection의 id와 연결됨을 mongoose에 알립니다. 
  // 이렇게 하여 user의 user.id와 post의 post.author가 연결되어 user와 post의 relationship이 형성되었습니다.
  
  createdAt:{type:Date, default:Date.now},
  // default 항목으로 기본 값을 지정할 수 있습니다. 
  // 함수명을 넣으면 해당 함수의 return이 기본값이 됩니다
  updatedAt:{type:Date},
});

// model & export
var Post = mongoose.model('post', postSchema);
module.exports = Post;