var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser'); // 1
// body-parser module를 bodyPaser 변수에 담습니다
var app = express();

// DB setting
mongoose.set('useNewUrlParser', true);    // 1
mongoose.set('useFindAndModify', false);  // 1
mongoose.set('useCreateIndex', true);     // 1
mongoose.set('useUnifiedTopology', true); // 1
// 1. mongoose의 몇몇 글로벌 설정을 해 주는 부분입니다. 저 부분이 바뀔 일은 왠만하면 없기 때문에 그냥 항상 저렇게 설정하고 쓰시면 됩니다.
mongoose.connect('mongodb+srv://test_username:0000@cluster0-amulf.mongodb.net/test?retryWrites=true&w=majority');
var db = mongoose.connection; //3
// 3.mongoose의 db object를 가져와 db변수에 넣는 과정, 이 db변수에는 DB와 관련된 리스너 함수들이 있다.

// db가 성공적으로 연결된 경우
db.once('open', function(){
  console.log('DB connected');
});
//  db연결이 실패 했을때
db.on('error', function(err){
  console.log('DB ERROR : ', err);
});

// Other settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json()); // 2
//  json 형식의 데이터를 받는다는 설정
app.use(bodyParser.urlencoded({extended:true})); // 3
//  urlencoded data를 extended 알고리듬을 사용해서 분석한다는 설정입니다

// DB schema // 4
var contactSchema = mongoose.Schema({
  name:{type:String, required:true, unique:true},
  email:{type:String},
  phone:{type:String}
});
// 데이터베이스에 정보를 어떠한 형식으로 저장할 지를 지정해 주는 부분입니다.
// contact라는 형태의 데이터를 DB에 저장할 텐데, 이 contact는 name, email, phone의 항목들을 가지고 있으며 새 항목 모두 String 타입입니다. 
// name은 값이 반드시 입력되어야 하며(required), 값이 중복되면 안된다(unique)는 추가 설정이 있습니다.

var Contact = mongoose.model('contact', contactSchema); // 5
// mongoose.model함수를 사용하여 contact schema의 model을 생성합니다.
// Contact object는 mongoDB의 contact collection의 model이며 DB에 접근하여 data를 변경할 수 있는 함수들을 가지고 있습니다

// Routes


// Home 
app.get('/', function(req, res){
  res.redirect('/contacts');
});
// "/"에 get 요청이 오는 경우 :
// /contacts로 redirect하는 코드입니다.

// Contacts - Index // 7
app.get('/contacts', function(req, res){
  Contact.find({}, function(err, contacts){
    if(err) return res.json(err);
    res.render('contacts/index', {contacts:contacts});
  });
});
// "/contacts"에 get 요청이 오는 경우 :
// 에러가 있다면 에러를 json형태로 웹브라우저에 표시하고, 
// 에러가 없다면 검색 결과를 받아 views/contacts/index.ejs를 render(페이지를 다이나믹하게 제작)합니다.
// - 모델.find 함수는 DB에서 검색조건에 맞는 모델(여기서는 Contact) data를 찾고 콜백_함수를 호출하는 함수입니다.
// - 모델.find의 검색조건은 Object 형태로 전달되는데 빈 Object({})를 전달하는 경우(=검색조건 없음) DB에서 해당 모델의 모든 data를 return합니다.
//  - 모델.find의 콜백_함수는 function(에러, 검색결과)의 형태입니다(


// Contacts - New // 8
app.get('/contacts/new', function(req, res){
  res.render('contacts/new');
});
// "/contacts/new"에 get 요청이 오는 경우 :
// 새로운 주소록을 만드는 form이 있는 views/contacts/new.ejs를 render합니다.

// Contacts - create // 9
app.post('/contacts', function(req, res){
  Contact.create(req.body, function(err, contact){
    if(err) return res.json(err);
    res.redirect('/contacts');
  });
})
//  "/contacts"에 post 요청이 오는 경우 :
//  "/contacts/new"에서 폼을 전달받는 경우입니다
//  모델.create은 DB에 data를 생성하는 함수입니다.
// 첫번째 parameter로 생성할 data의 object(여기서는 req.body)를 받는다. - 
// 두번째 parameter로 콜백 함수를 받습니다
// 모델.create의 callback 함수(여기서는 function(err, contact){ ... } 부분) 는 
// 첫번째 parameter로 error를 받고 두번째 parameter로 생성된 data를 받습니다. 
// 생성된 data는 항상 하나이므로 parameter이름으로 단수형인 contact를 사용하였습니다.
// 에러없이 contact data가 생성되면 /contacts로 redirect합니다.

// Port setting
var port = 3001;
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});