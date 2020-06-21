var express = require('express');
var router = express.Router();

// Home
router.get('/', function(req, res){
  res.render('home/welcome');
  // res.render은 보는 템플리트를 렌더링합니다.
});
router.get('/about', function(req, res){
  res.render('home/about');
});

module.exports = router;
// exports 와 module.exports 가 같은 객체를 참조
