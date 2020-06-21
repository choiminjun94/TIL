var express = require('express');
// express module를 express 변수에 담습니다.
var mongoose = require('mongoose');
// mongoose module를 mongoose 변수에 담습니다.
var bodyParser = require('body-parser'); 
// body-parser module를 bodyPaser 변수에 담습니다.
var methodOverride = require('method-override'); 
// method-override module을 methodOverride변수에 담습니다.
var app = express();

// DB setting
mongoose.set('useNewUrlParser', true); 
// mongoose의 몇몇 글로벌 설정을 해 주는 부분입니다
mongoose.set('useFindAndModify', false);  
// mongoose의 몇몇 글로벌 설정을 해 주는 부분입니다
mongoose.set('useCreateIndex', true);
// mongoose의 몇몇 글로벌 설정을 해 주는 부분입니다
mongoose.set('useUnifiedTopology', true); 
// mongoose의 몇몇 글로벌 설정을 해 주는 부분입니다
mongoose.connect('mongodb+srv://test_username:0000@cluster0-amulf.mongodb.net/test?retryWrites=true&w=majority');
/***************************************************************/
// node.js에서 기본으로 제공되는 process.env 오브젝트는 환경변수들을 가지고 있는 객체입니다. 
// 저는 DB connection string을 "MONGO_DB"라는 이름의 환경변수에 저장하였기 때문에 node.js코드상에서 process.env.MONGO_DB로 해당 값을 불러올 수 있습니다.
// Mac같은 경우 따로 환경변수를 잡아주지 않기 때문에 atlas 경로만 넣어주면 된다. Window환경에서 적용해야 하기 때문에 적용
/***************************************************************/
var db = mongoose.connection; 
// mongoose의 db object를 가져와 db변수에 넣는 과정입니다. 이 db변수에는 DB와 관련된 이벤트 리스너 함수들이 있습니다. 

// Other settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
//json 형식의 데이터를 받는다는 설정
app.use(bodyParser.urlencoded({extended:true}));
//urlencoded data를 extended 알고리즘을 사용해서 분석한다는 설정입니다
app.use(methodOverride('_method')); 
// _method의 query로 들어오는 값으로 HTTP method를 바꿉니다

/***************************************************************/
/*app.use(bodyParser.urlencoded({extended:true}));
/*app.use(methodOverride('_method')); 
/* 위에 코드 둘다 bodyParser를 사용하기 위해 필요한 코드 // 5번 코드
/***************************************************************/

// DB schema 
var contactSchema = mongoose.Schema({
  name:{type:String, required:true, unique:true},
  email:{type:String},
  phone:{type:String}
});
// mongoose.Schema 함수로 DB에서 사용할 schema를 설정. 데이터베이스에 정보를 어떠한 형식으로 저장할 지를 지정해 주는 부분입니다.
// name은 값이 반드시 입력되어야 하며(required), 값이 중복되면 안된다(unique)는 추가 설정이 있습니다

var Contact = mongoose.model('contact', contactSchema);
/***************************************************************/
// mongoose.model함수를 사용하여 contact schema의 model을 생성합니다.
// mongoose.model함수의 첫번째 parameter는 mongoDB에서 사용되는 콜렉션의 이름
// 두번째는 mongoose.Schema로 생성된 오브젝트입니다. 
// DB에 있는 contact라는 데이터 콜렉션을 현재 코드의 Contact라는 변수에 연결해 주는 역할을 합니다.
/***************************************************************/

// Routes

// Home
app.get('/', function(req, res){
  res.redirect('/contacts');
});
// contacts로 redirect하는 코드입니다.

// Contacts - Index
app.get('/contacts', function(req, res){
  Contact.find({}, function(err, contacts){
    if(err) return res.json(err);
    res.render('contacts/index', {contacts:contacts});
  });
});
// 에러가 있다면 에러를 json형태로 웹브라우저에 표시
// 에러가 없다면 검색 결과를 받아 views/contacts/index.ejs를 render(페이지를 다이나믹하게 제작)합니다.

// Contacts - New 
app.get('/contacts/new', function(req, res){
  res.render('contacts/new');
});
// "/contacts/new"에 get 요청이 오는 경우 :
// 새로운 주소록을 만드는 form이 있는 views/contacts/new.ejs를 render합니다.


// Contacts - create
app.post('/contacts', function(req, res){
  Contact.create(req.body, function(err, contact){
    if(err) return res.json(err);
    res.redirect('/contacts');
  });
});
// "/contacts"에 post 요청이 오는 경우 :
// "/contacts/new"에서 폼을 전달받는 경우입니다

// Contacts - show 
app.get('/contacts/:id', function(req, res){
  Contact.findOne({_id:req.params.id}, function(err, contact){
    if(err) return res.json(err);
    res.render('contacts/show', {contact:contact});
  });
});
// _method의 query로 들어오는 값으로 HTTP method를 바꿉니다

// Contacts - edit
app.get('/contacts/:id/edit', function(req, res){
  Contact.findOne({_id:req.params.id}, function(err, contact){
    if(err) return res.json(err);
    res.render('contacts/edit', {contact:contact});
  });
});
//contacts/:id/edit"에 get 요청이 오는 경우 :
//Model.findOne이 다시 사용되었습니다. 검색 결과를 받아 views/contacts/edit.ejs를 render합니다

// Contacts - update // 5
app.put('/contacts/:id', function(req, res){
  Contact.findOneAndUpdate({_id:req.params.id}, req.body, function(err, contact){
    if(err) return res.json(err);
    res.redirect('/contacts/'+req.params.id);
  });
});
//"contacts/:id"에 put 요청이 오는 경우 :
//Model.findOneAndUpdate는 DB에서 해당 model의 document를 하나 찾아 그 data를 수정하는 함수입니다.


// Contacts - destroy // 6
app.delete('/contacts/:id', function(req, res){
  Contact.deleteOne({_id:req.params.id}, function(err){
    if(err) return res.json(err);
    res.redirect('/contacts');
  });
});
//contacts/:id"에 delete 요청이 오는 경우 :
//Model.deleteOne은 DB에서 해당 model의 document를 하나 찾아 삭제하는 함수입니다. 첫번째 parameter로 찾을 조건을 object로 입력하고 data를 찾은 후 callback함수를 호출합니다.
//Data 삭제후 "/contacts"로 redirect합니다.


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