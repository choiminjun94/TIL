var express = require('express');
var mongoose = require('mongoose');
var app = express();

// DB setting
mongoose.set('useNewUrlParser', true);    // 1
mongoose.set('useFindAndModify', false);  // 1
mongoose.set('useCreateIndex', true);     // 1
mongoose.set('useUnifiedTopology', true); // 1
mongoose.connect('mongodb+srv://test_username:0000@cluster0-amulf.mongodb.net/test?retryWrites=true&w=majority'); // 2
var db = mongoose.connection; //3
//4
db.once('open', function(){
  console.log('DB connected');
});
// DB연결은 앱이 실행되면 단 한번만 일어나는 이벤트 입니다. 그러므로 db.once('이벤트_이름',콜백_함수) 함수를 사용
//5
db.on('error', function(err){
  console.log('DB ERROR : ', err);
});
//error는 DB접속시 뿐만 아니라, 다양한 경우에 발생할 수 있기 때문에 db.on('이벤트_이름',콜백_함수)함수를 사용합니다.

// Other settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
// app.use(express.static(__dirname + '/public'))는 '현재_위치/public' route를 static폴더로 지정하라는 명령어가 됩니다. 즉 '/'에 접속하면 '현재_위치/public'를, '/css'에 접속하면 '현재_위치/public/css'를 연결해 줍니다.

// Port setting
var port = 3000;
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});