import { getData, getDataBase64 } from './basis.js';

//获取活动首页列表
export const getPlaygroundList = (AreaID, pageCurrent, pageSize, callback) => {
  let queryObj = {
    areaID: AreaID,
    PageCurrent: pageCurrent,
    PageSize: pageSize
  }
  getDataBase64('ZQ.APP.ActivityManage.GetActivityList', queryObj, (err, data)=>{
    if(err){
      callback(err)
    } else {
      if (data.ResultCode === 1){
        callback(null, data.ActivityList);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}

//获取活动详情
export const getPlaygroundPost = (id, userid, callback) => {
  let queryObj = {
    ActivityID: id,
    UserID: userid
  };
  getDataBase64('ZQ.APP.ActivityManage.GetActivityByID', queryObj, (err, data)=>{
    if(err){
      callback(err)
    } else {
      if (data.ResultCode === 1){
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}

//查看一个用户已经报名的活动
export const getUserActivities = (userid, callback) => {
  let queryObj = {
    UserId: userid
  };
  getData('ZQ.APP.Mime.UserActivity', queryObj, (err, data) => {
    if(err){
      callback(err)
    } else {
      if (data.ResultCode === 1){
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}
