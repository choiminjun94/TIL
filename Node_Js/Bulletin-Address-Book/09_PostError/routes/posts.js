// routes/posts.js
// 주소록 만들기 contacts route참고 
var express  = require('express');
var router = express.Router();
var Post = require('../models/Post');

// Index 
router.get('/', function(req, res){
  Post.find({})                  
  //나중에 생성된 data가 위로 오도록 정렬합니다.
  .populate('author') // 1
  // Model.populate()함수는 relationship이 형성되어 있는 항목의 값을 생성해 줍니다. 
  // 현재 post의 author에는 user의 id가 기록되어 있는데, 이 값을 바탕으로 실제 user의 값을 author에 생성하게 됩니다
  .sort('-createdAt')            
  //.sort()함수는 string이나 object를 받아서 데이터 정렬방법을 정의
  // 문자열로 표현하는 경우 정렬할 항목명을 문자열로 넣으면 오름차순으로 정렬
  // 내림차순인 경우 -를 앞에 붙여줍니다

  .exec(function(err, posts){    
    if(err) return res.json(err);
    res.render('posts/index', {posts:posts});
  });
  // exec함수 앞에 DB에서 데이터를 어떻게 찾을지, 어떻게 정렬할지 등등을 함수로 표현
  // exec안의 함수에서 해당 data를 받아와서 할일을 정하는 구조입니다.
});


// New
router.get('/new', function(req, res){
  res.render('posts/new');
});
// "/contacts/new"에 get 요청이 오는 경우
// 새로운 주소록을 만드는 form이 있는 views/contacts/new.ejs를 render합니다.


// create
router.post('/', function(req, res){
  req.body.author = req.user._id; 
  //글을 작성할때는 req.user._id를 가져와서 post의 author에 기록합니다.
  // req.user는 로그인을 하면 passport에서 자동으로 생성해 줍니다 
  Post.create(req.body, function(err, post){
    if(err) return res.json(err);
    res.redirect('/posts');
  });
});
// "/contacts"에 post 요청이 오는 경우 :
// "/contacts/new"에서 폼을 전달받는 경우입니다.
// 모델.create은 DB에 data를 생성하는 함수입니다
// 에러가 있지 않을 경우 값을 반환하라

// show
router.get('/:id', function(req, res){
  Post.findOne({_id:req.params.id}) 
  .populate('author')             
  .exec(function(err, post){      
    if(err) return res.json(err);
    res.render('posts/show', {post:post});
  });
});
// :id처럼 route에 콜론(:)을 사용하면 해당 위치의 값을 받아 req.params에 넣게 됩니다
// Post.findOne은 DB에서 해당 model의 document를 하나 찾는 함수입니다. 
//  Model.findOne은 조건에 맞는 결과를 하나 찾아 object로 전달합니다.
//  index와 마찬가지로 show에도 .populate()함수를 추가하였습니다.
// (검색 결과가 없다면 null이 전달됩니다.)


// edit
router.get('/:id/edit', function(req, res){
  Post.findOne({_id:req.params.id}, function(err, post){
    if(err) return res.json(err);
    res.render('posts/edit', {post:post});
  });
});
// "contacts/:id/edit"에 get 요청이 오는 경우
// Post.findOne이 다시 사용되었습니다. 검색 결과를 받아 views/contacts/edit.ejs를 render합니다.


// update
router.put('/:id', function(req, res){
  req.body.updatedAt = Date.now(); //2
  Post.findOneAndUpdate({_id:req.params.id}, req.body, function(err, post){
    if(err) return res.json(err);
    res.redirect("/posts/"+req.params.id);
  });
});
// "contacts/:id"에 put 요청이 오는 경우 :
// Model.findOneAndUpdate는 DB에서 해당 model의 document를 하나 찾아 그 data를 수정하는 함수입니다.


// destroy
router.delete('/:id', function(req, res){
  Post.deleteOne({_id:req.params.id}, function(err){
    if(err) return res.json(err);
    res.redirect('/posts');
  });
});
// "contacts/:id"에 delete 요청이 오는 경우 
// Model.deleteOne은 DB에서 해당 model의 document를 하나 찾아 삭제하는 함수입니다. 
// 첫번째 parameter로 찾을 조건을 object로 입력하고 data를 찾은 후 callback함수를 호출합니다
// Data 삭제후 "/contacts"로 redirect합니다.

module.exports = router;