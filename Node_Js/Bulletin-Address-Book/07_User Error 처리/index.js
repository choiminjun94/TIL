var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var flash = require('connect-flash'); 
var session = require('express-session');
var app = express();

// DB setting
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb+srv://test_username:0000@cluster0-amulf.mongodb.net/test?retryWrites=true&w=majority'); // 2
var db = mongoose.connection;
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
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(flash());
app.use(session({secret:'MySecret', resave:true, saveUninitialized:true})); 

// Routes
app.use('/', require('./routes/home'));
app.use('/posts', require('./routes/posts')); // 1
app.use('/users', require('./routes/users')); // 1

// Port setting
var port = 3001;
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});