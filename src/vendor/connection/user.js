import { getData, getDataBase64 } from './basis.js';

//用户发短信 type = 注册，忘记密码，绑定手机
export const sendSMS = (phone, type, callback) => {
  let queryObj = {
    PhoneNumber: phone,
    Type: type
  };
  getData('ZQ.APP.Account.SendSMS', queryObj, (err,data) => {
    if(err){callback(err)} else {
      if (data.ResultCode === 1){
        console.log('发送短信成功，返回的数据是：');
        console.log(data);
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}

//用户注册
export const userRegister = (phone, code, password, c_id, ios_token, callback) => {
  let queryObj = {
    PhoneNumber: phone,
    Codes: code,
    PassWord: password,
    C_ID: c_id,
    IOS_Token: ios_token
  };
  getData('ZQ.APP.Account.Registered', queryObj, (err,data) => {
    if(err){callback(err)} else {
      if (data.ResultCode === 1){
        console.log('用户注册成功，返回的数据是：');
        console.log(data);
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}

//用户登陆
export const userLogin = (phone, password, c_id, ios_token, callback) => {
  let queryObj = {
    PhoneNumber: phone,
    PassWord: password,
    C_ID: c_id,
    IOS_Token: ios_token
  };
  getData('ZQ.APP.Account.Login', queryObj, (err,data) => {
    if(err){callback(err)} else {
      if (data.ResultCode === 1){
        console.log('用户登陆成功，返回的数据是：');
        console.log(data);
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}


//用户基本信息
export const getUserInfo = (userid, callback) => {
  let queryObj = {
    UserId: userid,
  };
  getData('ZQ.APP.Mime.UserBaseInfo', queryObj, (err, data) => {
    if(err){callback(err)} else {
      if (data.ResultCode === 1){
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}

//我的帖子
export const getUserArticles = (userid, callback) =>{
  let queryObj = {
    UserId: userid,
  };
  getData('ZQ.APP.Mime.UserArticle', queryObj, (err, data) => {
    if(err){callback(err)} else {
      if (data.ResultCode === 1){
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}
