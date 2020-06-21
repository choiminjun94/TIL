var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
// body-parser module를 bodyPaser 변수에 담습니다
// 역할 조사
var methodOverride = require('method-override');
// method-override module을 methodOverride변수에 담습
// 역할 조사
var app = express();

// DB setting
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
// mongoose의 몇몇 글로벌 설정을 해 주는 부분입니다. 저 부분이 바뀔 일은 왠만하면 없기 때문에 그냥 항상 저렇게 설정하고 쓰시면 됩니다.
// mongoose.connect(process.env.MONGO_DB); -- 윈도우에서 사용시 이용하는 코드
mongoose.connect('mongodb+srv://test_username:0000@cluster0-amulf.mongodb.net/test?retryWrites=true&w=majority');
// mongo altes의 주소 - 맥이나 우분투에서 사용시 주소를 통채로 넣어야 한다

var db = mongoose.connection;
db.once('open', function(){
  console.log('DB connected');
});
// 'open' db연결이 성공 했을때 나오는 메시지
db.on('error', function(err){
  console.log('DB ERROR : ', err);
});
// 'error' db연결이 실패 했을때 나오는 메시지


// Other settings
app.set('view engine', 'ejs');
//조사 -
app.use(express.static(__dirname+'/public'));
//조사 -
app.use(bodyParser.json());
// json형식의 데이터를 받는다는 설정
app.use(bodyParser.urlencoded({extended:true}));
// urlencoded data를 extended 알고리듬을 사용해서 분석한다는 설정입니다
app.use(methodOverride('_method'));
// _method의 query로 들어오는 값을 HTTP method를 바꾼다.
// ex) http://example.com/category/id?_method=delete를 받으면 _method의 값인 delete을 읽어
// 해당 request의 HTTP method를 delete으로 바꾼다.

// Routes
// 라우팅 리소스 별로 모듈을 만들어 라우팅 로직을 구현. 클라이언트에서 요청 별로 어떤 로직을 수행할지 정해놓은 파일
// (java에서 Controller 역할)
app.use('/', require('./routes/home'));
app.use('/posts', require('./routes/posts'));
app.use('/users', require('./routes/users')); 

// Port setting
var port = 3000;
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});
