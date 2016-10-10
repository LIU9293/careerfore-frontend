const express = require('express')
const path = require('path')
const port = process.env.PORT || 80
const app = express()

var bodyParser = require('body-parser');
var crypto = require('crypto')
var request = require('request');
var XMLJS = require('xml2js');
var middlewares = require('express-middlewares-js');
var urlencode = require('urlencode');

app.use(bodyParser.urlencoded({ extended: false }));

// 通常用于加载静态资源
app.use(express.static(__dirname + '/dist'))


app.get('/about', function (request, response){
  response.sendFile(path.resolve(__dirname, 'dist', 'About.html'))
})

app.get('/recruitment', function (request, response){
  response.sendFile(path.resolve(__dirname, 'dist', 'Recruitment.html'))
})

// get 验证服务器的有效性(与微信服务器进行通信)
app.get('/wechat_receive_server',function(req,res) {
  console.log(req.method)
  var signature = req.query.signature
  var timestamp = req.query.timestamp
  var nonce = req.query.nonce
  var echostr = req.query.echostr
  var token = "Lock1234"
  console.log(signature,timestamp,nonce,echostr)
  var array = [token,timestamp,nonce]
  array.sort()
  var str = array.join('')
  var shasum = crypto.createHash('sha1');
  shasum.update(str);
  var sha1String = shasum.digest('hex');
  if(sha1String == signature){
    res.send(echostr)
  }else {
    res.send("invalid")
  }
})

// post 接受用户的普通消息和事件消息(微信服务器发送数据包到本服务器)
app.post('/wechat_receive_server',function (req,res) {
  var parser = new XMLJS.Parser();
  req.on('data',function(data) {
    parser.parseString(data.toString(),function(jsonerr, result){
      var item = result.xml;
      var touser = item.ToUserName
      var fromuser = item.FromUserName
      var content = item.Content
      var arr = content[0].split("+")
      if(arr.length !== 2){
        var timpspan = Date.parse(new Date())
        res.send(`<xml>
                      <ToUserName><![CDATA[${fromuser}]]></ToUserName>
                      <FromUserName><![CDATA[${touser}]]></FromUserName>
                      <CreateTime>${timpspan}</CreateTime>
                      <MsgType><![CDATA[text]]></MsgType>
                      <Content><![CDATA[已经收到了， 爱你 。比心😀]]></Content>
                      </xml>`)
      } else {
        var name = arr[0]
        var tel = arr[1]
        var uri = "http://www.careerfore.com:9092/wechat_activity_sign/"+urlencode(name)+"/"+tel;
        request(uri,function(err,data,body) {
          var msg = []
          if(err){
            msg.push("请求失败,稍后再试")
          }else {
            body = JSON.parse(body)
            if(body.data.length > 0){
              var tmpStr = "";
              for(var i = 0;i< body.data.length ; i++){
                var obj = body.data[i];
                tmpStr += `活动标题 : <a>${obj.Title}</a> \r\n`;
                tmpStr += `活动地点 : <a>${obj.Location}</a> \r\n`;
                tmpStr += `活动时间 : <a>${obj.Time}</a> \r\n`;
                if(i == body.data.length -1){
                  tmpStr += `--------------------------`
                }else{
                  tmpStr += `--------------------------\r\n`
                }
              }
              msg.push(tmpStr)
            }else {
              msg.push("暂无您的报名信息")
            }
          }
          var timpspan = Date.parse(new Date())
          res.send(`<xml>
                        <ToUserName><![CDATA[${fromuser}]]></ToUserName>
                        <FromUserName><![CDATA[${touser}]]></FromUserName>
                        <CreateTime>${timpspan}</CreateTime>
                        <MsgType><![CDATA[text]]></MsgType>
                        <Content><![CDATA[${msg[0]}]]></Content>
                        </xml>`)
        })
      }
    })
  })

})

// 在你应用 JavaScript 文件中包含了一个 script 标签
// 的 index.html 中处理任何一个 route
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

app.listen(port)
console.log("server started on port " + port)
