 var express = require('express');
// 설치한 express module을 불러와서 변수(express)에 담습니다.
// require(모듈_이름) 함수는 node.js에서 기본적으로 주어지는 함수로, modules폴더 안에 설치된 모듈을 불러오는 함수입니다.
 
var app = express();
// express를 실행하여 app object를 초기화 합니다.
// express 모듈을 express 변수에 담고, express()로 app object를 초기화 하는 것은 Express framework에서 항상 가장 처음하는 것이므로 따라해 줍니다.

app.get('/', function(req,res) { // '/'위치에 'get'요청을 받는 경우
res.send('Hello World'); // 'Hello world를 보냄
});

var port = 3000; // 사용할 포트 번호를 port 변수에 넣습니다. 
app.listen(port, function(){ // port변수를 이용하여 3000번 포트에 node.js 서버를 연결합니다.
  console.log('server on! http://localhost:'+port); //서버가 실행되면 콘솔창에 표시될 메세지입니다.
});

// request에 관련된 값들과 함수들이 저장되어 있는 object. HTTP request header, 요청 url, cookies, query, body 등의 정보가 저장되어 있습니다.
// response에 관련된 값들과 함수들이 저장되어 있는 object. HTTP response header, cookies, HTTP code 등의 정보를 확인하고 값을 변경할 수도 있습니다.