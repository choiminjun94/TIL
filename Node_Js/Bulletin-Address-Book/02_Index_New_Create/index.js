var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser'); // 1
var app = express();

// DB setting
mongoose.set('useNewUrlParser', true);    // 1
mongoose.set('useFindAndModify', false);  // 1
mongoose.set('useCreateIndex', true);     // 1
mongoose.set('useUnifiedTopology', true); // 1
mongoose.connect('mongodb+srv://test_username:0000@cluster0-amulf.mongodb.net/test?retryWrites=true&w=majority');
//mongoose.connect(process.env.MONGO_DB); - 윈도우인 경우 이렇게 하기 
//의미 : process.env 오브젝트는 환경변수들을 가지고 있는 객체 - "MONGO_DB"라는 이름의 환경변수에 저장하였기 때문에 node.js코드상에서 process.env.MONGO_DB로 해당 값을 불러올 수 있습니다.

// Other settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json()); // 2
app.use(bodyParser.urlencoded({extended:true})); // 3

// DB schema // 4
var contactSchema = mongoose.Schema({
  name:{type:String, required:true, unique:true},
  email:{type:String},
  phone:{type:String}
});
var Contact = mongoose.model('contact', contactSchema); // 5

// Routes
// Home // 6
app.get('/', function(req, res){
  res.redirect('/contacts');
});
// Contacts - Index // 7
app.get('/contacts', function(req, res){
  Contact.find({}, function(err, contacts){
    if(err) return res.json(err);
    res.render('contacts/index', {contacts:contacts});
  });
});
// Contacts - New // 8
app.get('/contacts/new', function(req, res){
  res.render('contacts/new');
});
// Contacts - create // 9
app.post('/contacts', function(req, res){
  Contact.create(req.body, function(err, contact){
    if(err) return res.json(err);
    res.redirect('/contacts');
  });
});

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

// Port setting
var port = 3000;
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});