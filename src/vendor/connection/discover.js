import { getData, getDataBase64 } from './basis.js';

//获取轮播图
export const getCarousel = (callback) => {
  getData('ZQ.APP.Found.HomeFig', {}, (err,data)=>{
    if(err){callback(err)} else {
      if (data.ResultCode === 1){
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}

//发现首页获取帖子列表
export const getDiscoverList = (userID, pageNumber, perPageNumber, callback) => {
  let queryObj = {
    userID: userID,
    PageNumber: pageNumber,
    PerPageNumber: perPageNumber,
  }
  getDataBase64('ZQ.APP.Found.GetPostsList', queryObj, (err, data)=>{
    if (err) {
      callback(err);
    }  else {
      if (data.ResultCode === 1){
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}

//获取发现帖子详情
export const getDiscoverPost = (postID, userID, callback) => {
  let queryObj = {
    PostsId: postID,
    UserID: userID
  }
  getDataBase64('ZQ.APP.Found.PostsInfo', queryObj, (err, data) => {
    if(err){
      callback(err);
    } else {
      if (data.ResultCode === 1){
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}

//发布发现帖子
export const postDiscoverArticle = (userid, title, cover, category, HTMLcontent, type, coverSRC, postid, callback) => {
  let queryObj = {
    UserId: userid,
    PostsTitle: title,
    PostsFrontCover: cover,
    PostsChannel: category,
    PostsContent: HTMLcontent,
    PostType: type,
    PostFrontCoverSrc: coverSRC,
    PostsId: postid,
  }
  console.log(queryObj);
  getData('ZQ.APP.Found.Posts', queryObj, (err, data) => {
    if(err){
      callback(err);
    } else {
      console.log(data);
      if (data.ResultCode === 1){
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}

//获取发现帖子评论
export const getDiscoverPostComment = (userid,postsId,pageNum,callback) => {
  let queryObj = {
    UserID: userid,
    PostsId: postsId,
    PageNum: pageNum
  };
  getData('ZQ.APP.Found.CommentInfo', queryObj, (err, data) => {
    if(err){
      callback(err);
    } else {
      if (data.ResultCode === 1){
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}

//获得发现筛选列表
export const getDiscoverFilterList = (callback) => {
  let queryObj = {};
  getData('ZQ.APP.Found.GetChannelList', queryObj, (err, data) => {
    if (err){callback(err)} else {
      if (data.ResultCode === 1){
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      };
    }
  })
}

//获得用户筛选列表
export const getMyDiscoverFilterList = (userid, callback) => {
  let queryObj = {
    UserID: userid
  };
  getData('ZQ.APP.Found.MyChannel', queryObj, (err, data) => {
    if (err){callback(err)} else {
      if (data.ResultCode === 1){
        callback(null, data);
      } else{
        callback(data.ResultMessage);
      };
    }
  })
}

//更新用户筛选列表
export const updateMyDiscoverFilterList = (userid, channels, callback) => {
  let queryObj = {
    UserID: userid,
    Channels: channels
  };
  getData('ZQ.APP.Found.UpdateChannel', queryObj, (err, data) => {
    if (err){callback(err)} else {
      console.log(data)
      if (data.ResultCode === 1){
        callback(null, data);
      } else {
        callback(data.ResultMessage);
      };
    }
  })
}

//点赞
export const clickLove = (userID,objectID,state,callback)=>{
  let queryObj = {
    UserID: userID,
    ObjectID: objectID,
    State:state
  };
  getData("ZQ.APP.Found.AppLike",queryObj,(err,data)=>{
    if(err){
      callback(err);
    }else {
      console.log(data);
      if(data.ResultCode === 1){
        callback(null, data);
      }else {
        callback(data.ResultMessage);
      };
    }
  })
}

//获取频道查询帖子信息

export const getpostlistbychannel = (channelid, pagecurrent, pagecount, callback ) => {
  let queryObj={
    ChannelId: channelid,
    PageCurrent: pagecurrent,
    PageCount: pagecount,
  }

  getData('ZQ.APP.Found.ByChannelGetPostList', queryObj, ( err, data ) => {
    if(err){
      callback(err)
    } else {
      if (data.ResultCode === 1){
        callback(null, data.PostsList);
      } else {
        callback(data.ResultMessage);
      }
    }
  })
}

//获取精华帖子信息

export const getnicepostlist = ( pagecurrent, pagecount, callback ) => {
  let queryObj={
    PageCurrent: pagecurrent,
    PageCount: pagecount,
  }
  getData('ZQ.APP.Found.NicePostList', queryObj, (err, data) => {
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
