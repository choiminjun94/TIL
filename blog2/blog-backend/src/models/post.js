import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
  title: String,
  body: String,
  tags: [String], // 문자열로 이루어진 배열
  publishedDate: {
    type: Date,
    default: Date.now, // 현재 날짜를 기본값으로 지정
  },
  user : {
    _id : mongoose.Types.ObjectId,
    username : String,
  },
});

const Post = mongoose.model('Post', PostSchema);
// Post - 스키마 이름 || PostSchema - 스키마 객체
export default Post;