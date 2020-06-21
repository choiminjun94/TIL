var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var flash = require('connect-flash'); 
var session = require('express-session');
var passport = require('./config/passport');
//config/passport module를 passport 변수에 담았습니다
var app = express();

// DB setting
mongoose.set('useNewUrlParser', true);
//mongoose의 몇몇 글로벌 설정을 해 주는 부분입니다. 
mongoose.set('useFindAndModify', false);
//mongoose의 몇몇 글로벌 설정을 해 주는 부분입니다. 
mongoose.set('useCreateIndex', true);
//mongoose의 몇몇 글로벌 설정을 해 주는 부분입니다. 
mongoose.set('useUnifiedTopology', true);
//mongoose의 몇몇 글로벌 설정을 해 주는 부분입니다. 
mongoose.connect('mongodb+srv://test_username:0000@cluster0-amulf.mongodb.net/test?retryWrites=true&w=majority'); 
//DB connect를 Setting을 담당하는 부분 : 나 같은 경우 Mongdb atlas 주소를 입력
var db = mongoose.connection;
//mongoose의 db object를 가져와 db변수에 넣는 과정입니다.
db.once('open', function(){
  console.log('DB connected');
});
db.on('error', function(err){
  console.log('DB ERROR : ', err);
});

// Other settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
//json 형식의 데이터를 받는다는 설정
app.use(bodyParser.urlencoded({extended:true}));
//urlencoded data를 extended 알고리즘을 사용해서 분석하는 설정입니다
app.use(methodOverride('_method'));
// _method의 query로 들어오는 값으로 HTTP method를 바꿉니다
app.use(flash());
app.use(session({secret:'MySecret', resave:true, saveUninitialized:true})); 
// app.use(session({secret:'MySecret', resave:true, saveUninitialized:true}));가 반드시 필요합니다.) 

// Passport // 2
app.use(passport.initialize());
//  passport.initialize()는 passport를 초기화 시켜주는 함수
app.use(passport.session());
//passport.session()는 passport를 session과 연결해 주는 함수로 둘다 반드시 필요합니다.
//로그인을 구현하기 위해서는 express-session package와 session생성 코드 
//app.use(session({secret:'MySecret', resave:true, saveUninitialized:true}));가 반드시 필요합니다.) - other에 위치

// Custom Middlewares // 3
// app.use에 함수를 넣은 것을 middleware라고 합니다.

app.use(function(req,res,next){
  res.locals.isAuthenticated = req.isAuthenticated();
  // req.isAuthenticated()는 passport에서 제공하는 함수로, 현재 로그인이 되어있는지 아닌지를true,false로 return합니다.
  // res.locals.isAuthenticated는 ejs에서 user가 로그인이 되어 있는지 아닌지를 확인하는데 사용되고

  res.locals.currentUser = req.user;
  // req.user는 passport에서 추가하는 항목으로 로그인이 되면 session으로 부터 user를 deserialize하여 생성됩니다.
  // res.locals.currentUser는 로그인된 user의 정보를 불러오는데 사용됩니다.
  next();
});
// app.use에 있는 함수는 request가 올때마다 route에 상관없이 무조건 해당 함수가 실행됩니다
// route과도 마찬가지로 반드시 route 위에 위치해야 합니다.
// app.use에 들어가는 함수는 route에 들어가는 함수와 동일한 req, res, next의 3개의 parameter를 가집니다.
// 함수안에 반드시 next()를 넣어줘야 다음으로 진행이 됩니다.


// Routes
app.use('/', require('./routes/home'));
//'./routes/home'을 가져와 사용
app.use('/posts', require('./routes/posts')); // 1
app.use('/users', require('./routes/users')); // 1

// Port setting
var port = 3001;
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});