var express = require('express');
var mongoose = require('mongoose');
var app = express();

// DB setting
mongoose.set('useNewUrlParser', true);    // 1
mongoose.set('useFindAndModify', false);  // 1
mongoose.set('useCreateIndex', true);     // 1
mongoose.set('useUnifiedTopology', true); // 1
// 1. mongoose의 몇몇 글로벌 설정을 해 주는 부분입니다. 저 부분이 바뀔 일은 왠만하면 없기 때문에 그냥 항상 저렇게 설정하고 쓰시면 됩니다.
mongoose.connect('mongodb+srv://test_username:0000@cluster0-amulf.mongodb.net/test?retryWrites=true&w=majority'); // 2
var db = mongoose.connection; //3
// 3.mongoose의 db object를 가져와 db변수에 넣는 과정, 이 db변수에는 DB와 관련된 리스너 함수들이 있다.

//4 - db가 성공적으로 연결된 경우
db.once('open', function(){
  console.log('DB connected');
});›
//5 - db연결이 실패 했을때
db.on('error', function(err){
  console.log('DB ERROR : ', err);
});

// Other settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));

// Port setting
var port = 3000;
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});