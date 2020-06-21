 var express = require('express');
// 설치한 express module을 불러와서 변수(express)에 담습니다.
// require(모듈_이름) 함수는 node.js에서 기본적으로 주어지는 함수로, modules폴더 안에 설치된 모듈을 불러오는 함수입니다.
 
var app = express();
// express를 실행하여 app object를 초기화 합니다.
// express 모듈을 express 변수에 담고, express()로 app object를 초기화 하는 것은 Express framework에서 항상 가장 처음하는 것이므로 따라해 줍니다.

app.use(express.static(__dirname + '/public'));
// app.use(콜백 함수)
// app.get과 마찬가지로 req, res, next의 parameter가 콜백 함수로 자동으로 전달됩니다. 
// 하지만 app.get과 다르게 HTTP method나 route에 상관없이 서버에 요청이 올 때마다 무조건 콜백함수가 실행됩니다.
// __dirname은 node.js에서 프로그램이 실행중인 파일의 위치를 나타내는 global variable입니다.
// app.use(express.static(__dirname + '/public'))는 '현재_위치/public' route를 static폴더로 지정하라는 명령어가 됩니다. 
// 즉 '/'에 접속하면 '현재_위치/public'를, '/css'에 접속하면 '현재_위치/public/css'를 연결해 줍니다.

var port = 3000; // 사용할 포트 번호를 port 변수에 넣습니다. 
app.listen(port, function(){ // port변수를 이용하여 3000번 포트에 node.js 서버를 연결합니다.
  console.log('server on! http://localhost:'+port); //서버가 실행되면 콘솔창에 표시될 메세지입니다.
});

// request에 관련된 값들과 함수들이 저장되어 있는 object. HTTP request header, 요청 url, cookies, query, body 등의 정보가 저장되어 있습니다.
// response에 관련된 값들과 함수들이 저장되어 있는 object. HTTP response header, cookies, HTTP code 등의 정보를 확인하고 값을 변경할 수도 있습니다.