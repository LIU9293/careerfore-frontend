

export const betterText = (htmlString) => {

  //-- remove BR tags and replace them with line break
  htmlString=htmlString.replace(/<br>/gi, "");
  htmlString=htmlString.replace(/<br\s\/>/gi, "");
  htmlString=htmlString.replace(/<br\/>/gi, "");
  htmlString=htmlString.replace(/<br.*?>/gi, "");

  //-- get rid of more than 2 spaces:
  //htmlString = htmlString.replace(/ +(?= )/gi,'');
  htmlString = htmlString.replace(/\s\s+/gi,"");

  //-- remove all styles in <P> tags
  htmlString=htmlString.replace(/<p.*?>/gi, "<p>");
  //htmlString=htmlString.replace(/<\/p>/gi, "</p>");

  htmlString=htmlString.replace(/<span.*?>/gi, "");
  htmlString=htmlString.replace(/<\/span>/gi, "");

  // -- remove <a> tags
  htmlString=htmlString.replace(/<a.*?>/gi, "");
  htmlString=htmlString.replace(/<\/a>/gi, "");

  // -- remove <font> tags
  htmlString=htmlString.replace(/<font.*?>/gi, "");
  htmlString=htmlString.replace(/<\/font>/gi, "");

  // -- remove strong tag \ em tag
  htmlString=htmlString.replace(/<strong.*?>/gi, "");
  htmlString=htmlString.replace(/<\/strong>/gi, "");
  htmlString=htmlString.replace(/<em.*?>/gi, "");
  htmlString=htmlString.replace(/<\/em>/gi, "");

  // --clear all styles and all classes for anything
  htmlString=htmlString.replace(/style=".*?"/gi, "");
  htmlString=htmlString.replace(/class=".*?"/gi, "");

  //-- remove all inside SCRIPT and STYLE tags
  htmlString=htmlString.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
  htmlString=htmlString.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");

  //-- get rid of more than 2 multiple line breaks:
  htmlString=htmlString.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "");

  // get rid of tab
  htmlString = htmlString.replace(/\t/gi, '')

  //get rid of html-encoded characters:
  htmlString=htmlString.replace(/&nbsp;/gi," ");
  htmlString=htmlString.replace(/&amp;/gi,"&");
  htmlString=htmlString.replace(/&quot;/gi,'"');
  htmlString=htmlString.replace(/&lt;/gi,'<');
  htmlString=htmlString.replace(/&gt;/gi,'>');

  return htmlString;
}


export const article2HTML = (postid,cover) =>{
  let h =`
  <!DOCTYPE html>
  <html lang="zh-cn">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
    </head>
    <body>
      <style type="text/css">
        html, body{
          overflow-x: hidden;
          width:100%;
          background-color: #fff;
          padding:0;margin:0;
          box-sizing: border-box;
        }
        .content > img{
          width:calc( 100% + 40px );
          margin: 20px -20px 20px -20px;
        }
        .content > p > img{
          width:calc( 100% + 40px );
          margin: 20px -20px 20px -20px;
        }
        .content{
          overflow-x: hidden;
          font-size:18px;
          line-height: 30px;
          color: #4b4c4c;
          display:block;
          padding:0 20px 0 20px;
          margin:20px 0 0 0;
          text-align: left;
          font-family: "PingFang SC", "Microsoft JhengHei";
          zoom:1
        }
        .comment{
          position: relative;
          box-sizing: border-box;
          font-size:12px;
          line-height: 30px;
          color: #4b4c4c;
          display:block;
          padding:0 20px 0 20px;
          margin:80px 0 20px 0;
          text-align: left;
          font-family: "PingFang SC", "Microsoft JhengHei";
        }
        .commentBox>img{
          display: inline;
          margin: auto;
          height:40px;
          width:40px;
          border-radius:50%;
          vertical-align: middle;
        }
        .commentBox>a{
          text-decoration:none;
          color: #4b4c4c;
        }
        .commentBox>span{
          padding-left: 100px;
        }
        .comment>.commentContent{
          font-size: 16px;
          padding-left: 55px;
          margin-bottom: 10px;
        }
        .coverIMG{
          width:calc( 100%);
        }
        .firstChild{
          width:100%;
          position: relative;
          font-family: "PingFang SC", "Microsoft JhengHei";
          font-size:16px;
          line-height: 30px;
        }
        .firstChild>img{
          width: 50px;
          height: 50px;
          display: block;
          border-radius: 50%;
          margin:auto;
        }
        .firstChild>h2{
          color:#4b4c4c;
          line-height: 40px;
          padding: 0px 20px 0px 20px;
        }
        .firstChild>.category{
          text-align: center;
        }
        .like{
          position: relative;
          height: 20px;
          font-family: "PingFang SC", "Microsoft JhengHei";
          color:#4b4c4c;
        }
        .Postlike{
          position: relative;
          padding-right: 10px;
          font-family: "PingFang SC", "Microsoft JhengHei";
          color:#4b4c4c;
          float: right;
        }
        hr{
          margin:0 0 20px 0;
          padding: 0;
          border: 0;
          background-color:#cacdd2;
          height: 1px;

        }

      </style>
      <!-- HTML Content -->
      <div id='cover' class='cover'>
      </div>
      <div id='firstChild' class='firstChild'>
      </div>
       <div id='content' class='content'>
       </div>
       <div id="like" class="like">
       </div>
       <div id='comment' class='comment'>
       </div>
       <div id='noComment' class='noComment'>
       </div>

       <script>

       //base64
       var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
       function base64decode(str){
           var c1, c2, c3, c4;
           var i, len, out;
           len = str.length;
           i = 0;
           out = "";
           while (i < len) {
               /* c1 */
               do {
                   c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
               }
               while (i < len && c1 == -1);
               if (c1 == -1)
                   break;
               /* c2 */
               do {
                   c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
               }
               while (i < len && c2 == -1);
               if (c2 == -1)
                   break;
               out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
               /* c3 */
               do {
                   c3 = str.charCodeAt(i++) & 0xff;
                   if (c3 == 61)
                       return out;
                   c3 = base64DecodeChars[c3];
               }
               while (i < len && c3 == -1);
               if (c3 == -1)
                   break;
               out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
               /* c4 */
               do {
                   c4 = str.charCodeAt(i++) & 0xff;
                   if (c4 == 61)
                       return out;
                   c4 = base64DecodeChars[c4];
               }
               while (i < len && c4 == -1);
               if (c4 == -1)
                   break;
               out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
           }
           return out;
       }

       function utf8to16(str){
           var out, i, len, c;
           var char2, char3;
           out = "";
           len = str.length;
           i = 0;
           while (i < len) {
               c = str.charCodeAt(i++);
               switch (c >> 4) {
                   case 0:
                   case 1:
                   case 2:
                   case 3:
                   case 4:
                   case 5:
                   case 6:
                   case 7:
                       // 0xxxxxxx
                       out += str.charAt(i - 1);
                       break;
                   case 12:
                   case 13:
                       // 110x xxxx 10xx xxxx
                       char2 = str.charCodeAt(i++);
                       out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                       break;
                   case 14:
                       // 1110 xxxx10xx xxxx10xx xxxx
                       char2 = str.charCodeAt(i++);
                       char3 = str.charCodeAt(i++);
                       out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
                       break;
               }
           }
           return out;
       }
          //ajax
          function RESTRequest(RequestObject, callback) {
            var ServerDomainRoot = "http://mysleep.imwork.net:49539/AMSService/app";
          	var MyXMLHttpRequest = new XMLHttpRequest();
          	MyXMLHttpRequest.onreadystatechange = function() {
          		switch(MyXMLHttpRequest.readyState) {
          			case 0:
          				break;
          			case 1:
          				break;
          			case 2:
          				break;
          			case 3:
          				break;
          			case 4:
          				if(MyXMLHttpRequest.status == 200) {
          					callback(null, MyXMLHttpRequest.responseText);
          				} else {
          					callback(MyXMLHttpRequest.status);
          				}
          		}
          	}
          	MyXMLHttpRequest.open("POST", ServerDomainRoot);
          	MyXMLHttpRequest.setRequestHeader("Content-Type", "text/plain");
          	MyXMLHttpRequest.send(JSON.stringify(RequestObject));
          }

          //我们需要 postID 和 封面图
          var PostID = ${postid};
          var CoverURL =${cover};
          var queryObj = {
            FunctionRouteName: 'ZQ.APP.Found.PostsInfo',
            RequestObjectString: JSON.stringify({
              PostsId: PostID,
              UserID: ''
            })
          }
          var queryComment = {
            FunctionRouteName: 'ZQ.APP.Found.CommentInfo',
            RequestObjectString: JSON.stringify({
              PostsId: PostID,
              UserID: '',
              PageNum:1
            })
          }
          //时间转换
          function millseconds2DateDiff(input){
            var msecStr = input.toString().replace(/\\/Date\\(([-]?\\d+)\\)\\//gi, "$1"); // => '1419492640000' ：通过正则替换，获取毫秒字符串
            var msesInt = Number.parseInt(msecStr); // 毫秒字符串转换成数值
            var dt = new Date(); // 初始化Date对象
            var HourDiff = Math.trunc((dt.getTime() - msesInt)/(1000 * 60 * 60));
            if(HourDiff>720){
              var MonthDiff = Math.trunc(HourDiff/720);
              var DIFF = MonthDiff + '个月前';
            } else if (HourDiff>24){
              var DayDiff = Math.trunc(HourDiff/24);
              var DIFF = DayDiff + '天前';
            } else {
              var DIFF = HourDiff + '小时前'
            }
            return DIFF
          }

          function betterText(htmlString){
            //-- remove BR tags and replace them with line break
            htmlString=htmlString.replace(/<br>/gi, "");
            htmlString=htmlString.replace(/<br\\s\\/>/gi, "");
            htmlString=htmlString.replace(/<br\\/>/gi, "");
            htmlString=htmlString.replace(/<br.*?>/gi, "");

            //-- get rid of more than 2 spaces:
            //htmlString = htmlString.replace(/ +(?= )/gi,'');
            htmlString = htmlString.replace(/\\s\\s+/gi,"");

            //-- remove all styles in <P> tags
            htmlString=htmlString.replace(/<p.*?>/gi, "<p>");
            //htmlString=htmlString.replace(/<\\/p>/gi, "</p>");

            htmlString=htmlString.replace(/<span.*?>/gi, "");
            htmlString=htmlString.replace(/<\\/span>/gi, "");

            // -- remove <a> tags
            htmlString=htmlString.replace(/<a.*?>/gi, "");
            htmlString=htmlString.replace(/<\\/a>/gi, "");

            // -- remove strong tag \\ em tag
            htmlString=htmlString.replace(/<strong.*?>/gi, "");
            htmlString=htmlString.replace(/<\\/strong>/gi, "");
            htmlString=htmlString.replace(/<em.*?>/gi, "");
            htmlString=htmlString.replace(/<\\/em>/gi, "");

            // --clear all styles and all classes for anything
            htmlString=htmlString.replace(/style=".*?"/gi, "");
            htmlString=htmlString.replace(/class=".*?"/gi, "");

            //-- remove all inside SCRIPT and STYLE tags
            htmlString=htmlString.replace(/<script.*>[\\w\\W]{1,}(.*?)[\\w\\W]{1,}<\\/script>/gi, "");
            htmlString=htmlString.replace(/<style.*>[\\w\\W]{1,}(.*?)[\\w\\W]{1,}<\\/style>/gi, "");

            //-- get rid of more than 2 multiple line breaks:
            htmlString=htmlString.replace(/(?:(?:\\r\\n|\\r|\\n)\\s*){2,}/gim, "");

            // get rid of tab
            htmlString = htmlString.replace(/\\t/gi, '');

            //get rid of html-encoded characters:
            htmlString=htmlString.replace(/&nbsp;/gi," ");
            htmlString=htmlString.replace(/&amp;/gi,"&");
            htmlString=htmlString.replace(/&quot;/gi,'"');
            htmlString=htmlString.replace(/&lt;/gi,'<');
            htmlString=htmlString.replace(/&gt;/gi,'>');

            return htmlString;
          }

          window.onload = function(){
            //添加首图信息
            if(CoverURL === ''){
              document.getElementById('cover').style.display = 'none';
            }  else {
              document.getElementById('cover').style.display = 'block';
              var img = "<img class='coverIMG' src='" + CoverURL + "' />";
              document.getElementById('cover').innerHTML = img;
            }
            RESTRequest(queryObj,function(err,res){
              if(err){console.log(err)} else {
                var PostData = JSON.parse(utf8to16(base64decode(JSON.parse(res).ResponseObjectString)));
                console.log(PostData);
                var PostContent = PostData.PostosInfo.Content;
                var PostTitle = PostData.PostosInfo.PostsTitle;
                var PostUserUrl = PostData.PostosInfo.UserHeadUrl;
                var PostName = PostData.PostosInfo.UserName;
                var PostDate = millseconds2DateDiff(PostData.PostosInfo.PostsDate);
                var PostChannel = PostData.PostosInfo.ChannelName;
                var PostLike=PostData.PostosInfo.LikeNum;
                var PostCollection=PostData.PostosInfo.CollectionNumbers;
                var PostRead=PostData.PostosInfo.ReadNum;
                //调用帖子详情信息
                 document.getElementById('content').innerHTML = betterText(PostContent);
                //调用用户名，帖子板块，发表时间
                 var firstChildHTML='';
                 firstChildHTML = firstChildHTML + "<h2 style='text-align:center'>" +PostTitle+ "</h2>"+"<img src='"+PostUserUrl+"'/>"+"<div class='category'>"+PostName+"·"+PostChannel+"·"+PostDate+"</div>";
                 document.getElementById('firstChild').innerHTML = firstChildHTML;
                //调用帖子收藏数和点赞数以及阅读数
                 var LikeHTML='';
                 LikeHTML=LikeHTML+"<div class='Postlike'><span class='love'><i class='love_icon'></i>赞·"+PostLike+"</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class='collect'><i class='collect_icon'></i>收藏·"+PostCollection+"</span>&nbsp;&nbsp;&nbsp;&nbsp;阅读数·"+PostRead+"</div><br><br><hr><div style='padding-left:20px'>|&nbsp;最新评论：</div>";
                 document.getElementById('like').innerHTML=LikeHTML;
              }
            });

             //调用评论信息
             RESTRequest(queryComment,function(err,res){
               if(err){console.log(err)} else {
                var PostComment = JSON.parse(JSON.parse(res).ResponseObjectString);
                console.log(PostComment);
                if(PostComment.CommentNum === 0){
                  //render NO-Comment View
                  document.getElementById('comment').style.display='none';
                  document.getElementById('noComment').style.display='block';
                  var noCommentHTML='';
                  noCommentHTML = noCommentHTML + "<div class='nocomment1'><p>还没有发表评论哦，你是第一个，快来抢沙发。</p></div>";
                  document.getElementById('noComment').innerHTML = noCommentHTML;
                  // console.log(noCommentHTML);
                } else {
                  var CommentList = PostComment.CommentList;
                  // console.log(CommentList);
                  var CommentHTML = '';
                  var CommentData = [];

                  for(var i=0;i<CommentList.length;i++){
                    var CommentContent = CommentList[i].Content;
                    var CommentUserName = CommentList[i].UserNickName;
                    var CommentLike=CommentList[i].IsLike;
                    var CommentTime = millseconds2DateDiff(CommentList[i].ReleaseTime);
                    var UserID=CommentList[i].UserID;
                    var data = {
                      CommentContent: CommentContent,
                      CommentUserName: CommentUserName,
                      CommentLike: CommentLike,
                      CommentTime: CommentTime,
                      UserID: UserID,
                    };
                    CommentData.push(data);
                    var queryUserAvatar = {
                      FunctionRouteName: 'ZQ.APP.Resume.UserBaseInfo',
                      RequestObjectString: JSON.stringify({
                        UserId: UserID,
                      })
                    };
                  }
                  CommentData.map((data) => {
                    let queryUserAvatar = {
                          FunctionRouteName: 'ZQ.APP.Resume.UserBaseInfo',
                          RequestObjectString: JSON.stringify({
                            UserId: data.UserID,
                          })
                        };
                    RESTRequest(queryUserAvatar,function(err,res){
                      if(err){console.log(err)} else {
                        var CommentUserInfo = JSON.parse(JSON.parse(res).ResponseObjectString);
                        var CommentUserAvatar=CommentUserInfo.UserHeadImg;
                        CommentHTML = CommentHTML + "<div class='commentBox'><img src='"+CommentUserAvatar+"'/>&nbsp;&nbsp;&nbsp;&nbsp;" +data.CommentUserName+ "&nbsp;&nbsp;&nbsp;&nbsp;" + data.CommentTime + "</div><div class='commentContent'>" + data.CommentContent + "<span style='font-size:10px;float:right'>喜欢&nbsp;" + data.CommentLike + "</span></div><hr>";
                        document.getElementById('comment').innerHTML = CommentHTML;
                      }
                    })
                  })
                  /*
                  RESTRequest(queryUserAvatar,function(err,res){
                    if(err){console.log(err)} else {
                      var CommentUserInfo = JSON.parse(JSON.parse(res).ResponseObjectString);
                      // console.log(CommentUserInfo);
                      var CommentUserAvatar=CommentUserInfo.UserHeadImg;
                      CommentHTML = CommentHTML + "<div class='commentBox'><img src='"+CommentUserAvatar+"'/>&nbsp;&nbsp;&nbsp;&nbsp;" +CommentUserName+ "&nbsp;&nbsp;&nbsp;&nbsp;" + CommentTime + "<span>喜欢" + CommentLike + "&nbsp;&nbsp;&nbsp;&nbsp;回复" + CommentLevel + "</span></div><div class='commentContent'>" + CommentContent + "</div><hr>";
                      document.getElementById('comment').innerHTML = CommentHTML;
                      // console.log(CommentHTML);
                    }
                  })*/


                }
               }
             });

             //推荐

          }
       </script>
      </body>
    </html>

  `

  return h;
}
