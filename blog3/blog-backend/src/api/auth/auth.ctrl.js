import Joi from '@hapi/joi';
import User from '../../models/user'
 
export const register = async ctx =>{
    const schema = Joi.object().keys({
        username : Joi.string()
        .alphanum()
        .min(3)
        .max(20)
        .required(),
    password : Joi.string().required(),
    });
    const result = schema.validate(ctx.request.body)
    if(result.error){
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }
    const { username, password } = ctx.request.body;
    try{
        const exists = await User.findByUsername(username);
        if(exists){
            ctx,status = 409;
            return;
        }
        const user = new User({
            username,
        });
        await user.setPassword(password);
        await user.save();

        ctx.body = user.serialize();
    }catch(e){
        ctx.throw(500,e);
    }
};

export const login = async ctx => {
    const { username, password } = ctx.request.body;
  
    // username, password가 없으면 에러 처리
    if (!username || !password) {
      ctx.status = 401; // Unauthorized
      return;
    }
  
    try {
      const user = await User.findByUsername(username);
      // 계정이 존재하지 않으면 에러 처리
      if (!user) {
        ctx.status = 401;
        return;
      }
      const valid = await user.checkPassword(password);
      // 잘못된 비밀번호
      if (!valid) {
        ctx.status = 401;
        return;
      }
      ctx.body = user.serialize();
    } catch (e) {
      ctx.throw(500, e);
    }
  };

export const check = async ctx =>{

}

export const logout = async ctx => {

}