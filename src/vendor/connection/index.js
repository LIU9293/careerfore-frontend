import { getData, getDataBase64, postImage, uploadImageToQiniu } from './basis';
import { getPlaygroundList, getPlaygroundPost } from './activity';

import { getCarousel, getDiscoverList, getDiscoverPost, postDiscoverArticle, getDiscoverPostComment, getDiscoverFilterList, getMyDiscoverFilterList, updateMyDiscoverFilterList,clickLove} from './discover';
import { sendSMS, userRegister, userLogin, getUserInfo, getUserArticles } from './user';

import { secretaryMessage, activityMessage, unreadMessage, unreadMessageContent } from './message';

module.exports = {
  getData, //抓数据基础接口，输入(FunctionRouteName,QueryObjectName,callback)
  getDataBase64, //抓base64转码过的数据
  postImage, //传图片到自己的服务器，输入（图片base64,callback)
  uploadImageToQiniu, //传图片到七牛，输入（图片base64,callback)
  getPlaygroundList, //获取活动列表，输入(AreaID, pageCurrent, pageSize, callback)
  getPlaygroundPost, //获取活动详情，输入(id, userid, callback)
  getCarousel, //获取发现轮播图，参数只有一个callback
  getDiscoverList, //获取发现帖子列表，参数(userID, pageNumber, perPageNumber, callback)
  getDiscoverPost, //获取发现帖子详情，参数(postID, userID, callback)
  postDiscoverArticle, //发现板块发布帖子，输入(userid, title, cover, category, HTMLcontent, type, coverSRC, postid, callback)
  getDiscoverPostComment, //获取发现帖子评论，输入(userid,postsId,pageNum,callback)
  getDiscoverFilterList, //获取发现文章筛选列表，参数只有callback
  getMyDiscoverFilterList, //获取用户已经订阅的筛选列表，参数(userid, callback)
  updateMyDiscoverFilterList, // 更新用户订阅筛选列表，参数(userid, channels, callback)
  clickLove,//点赞
  sendSMS, //发送短信，参数(phone, type, callback)，type是（注册／忘记密码／绑定手机）
  userRegister, //用户注册，(phone, code, password, c_id, ios_token, callback)
  userLogin, //用户登录，(phone, password, c_id, ios_token, callback)
  getUserInfo, //获取用户基本信息，(userid, callback),
  secretaryMessage, //获取小秘书消息，(userid, Type, callback)
  activityMessage, //获取活动消息，(userid, callback)
  unreadMessage, //获取未读消息，(userid, callback)
  unreadMessageContent, //获取未读消息内容，(userid, senderid, callback)
  getUserArticles, //获取用户发布的文章，(userid, callback)
}
