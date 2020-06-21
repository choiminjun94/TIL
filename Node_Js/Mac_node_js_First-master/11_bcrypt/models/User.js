// models/User.js

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs'); // 1

// schema // 1
var userSchema = mongoose.Schema({
  username:{type:String, required:[true,'Username is required!'], unique:true},
  password:{type:String, required:[true,'Password is required!'], select:false},
  name:{type:String, required:[true,'Name is required!']},
  email:{type:String}
},{
  toObject:{virtuals:true}
});
// 첫번째는 true/false 값이고, 두번째는 에러메세지입니다.
// 그냥 true/false을 넣을 경우 기본 에러메세지가 나오고, 위와 같이 배열을 사용해서 에러메세지 내용을 원하는 대로 변경할 수 있습니다.

// virtuals // 2
userSchema.virtual('passwordConfirmation')
  .get(function(){ return this._passwordConfirmation; })
  .set(function(value){ this._passwordConfirmation=value; });

userSchema.virtual('originalPassword')
  .get(function(){ return this._originalPassword; })
  .set(function(value){ this._originalPassword=value; });

userSchema.virtual('currentPassword')
  .get(function(){ return this._currentPassword; })
  .set(function(value){ this._currentPassword=value; });

userSchema.virtual('newPassword')
  .get(function(){ return this._newPassword; })
  .set(function(value){ this._newPassword=value; });
// DB에 저장되는 값 이외의 항목이 필요할 땐 virtual 항목으로 만듭니다. 
// 즉 passwordConfirmation, originalPassword, currentPassword, newPassword는 회원가입, 
// 회원정보 수정을 위해 필요한 항목이지만, DB에 저장할 필요는 없는 값들입니다. 이처럼 DB에 저장될 필요는 없지만, 
// model에서 사용하고 싶은 항목들은 virtual로 만듭니다.

// password validation // password를 DB에 생성, 수정하기 전에 값이 유효(valid)한지 확인(validate)을 하는 코드를 작성합니다
userSchema.path('password').validate(function(v) {
  var user = this; // 3-1
  //  validation callback 함수 속에서 this는 user model입니다. 헷갈리지 않도록 user 변수에 넣었습니다.

  // create user // 3-3
  if(user.isNew){ // 3-2
    //model.isNew 항목은 해당 모델이 생성되는 경우에는 true, 아니면 false의 값을 가집니다. 
    //이 항목을 이용해서 현재 password validation이 '회원가입' 단계인지, 아니면 '회원 정보 수정'단계인지를 알 수 있습니다.
    if(!user.passwordConfirmation){
      user.invalidate('passwordConfirmation', 'Password Confirmation is required.');
    }

    if(user.password !== user.passwordConfirmation) {
      user.invalidate('passwordConfirmation', 'Password Confirmation does not matched!');
    }
  }
  // 회원가입의 경우 password confirmation값이 없는 경우와, 
  // password값이 password confirmation값과 다른 경우에 유효하지않음처리(invalidate)를 하게 됩니다. 
  // model.invalidate함수를 사용하며, 첫번째는 인자로 항목이름, 두번째 인자로 에러메세지를 받습니다.

  // update user // 3-4
  if(!user.isNew){
    if(!user.currentPassword){
      user.invalidate('currentPassword', 'Current Password is required!');
    }
    else if(!bcrypt.compareSync(user.currentPassword, user.originalPassword)){ // 2
      user.invalidate('currentPassword', 'Current Password is invalid!');
    }

    if(user.newPassword !== user.passwordConfirmation) {
      user.invalidate('passwordConfirmation', 'Password Confirmation does not matched!');
    }
  }
});
// 회원 정보 수정의 경우 current password값이 없는 경우와, 
// current password값이 original password값과 다른 경우, 
// new password값과 password confirmation값이 다른 경우 invalidate합시다. 
// 회원정보 수정시에는 항상 비밀번호를 수정하는 것은 아니기 때문에 new password와 password confirmation값이 없어도 에러는 아닙니다.
// hash password // 3
userSchema.pre('save', function (next){
  var user = this;
  if(!user.isModified('password')){ // 3-1
    return next();
  }
  else {
    user.password = bcrypt.hashSync(user.password); //3-2
    return next();
  }
});

// model methods // 4
userSchema.methods.authenticate = function (password) {
  var user = this;
  return bcrypt.compareSync(password,user.password);
};

// model & export
var User = mongoose.model('user',userSchema);
module.exports = User;