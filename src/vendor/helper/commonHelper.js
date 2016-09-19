//根据频道id获取默认的配图
export const getHolderByChannelId = (channelid) =>{
  var data = {
    "12a73cc79d534fdc9d5e297521fab8ac":"http://imageservice.pine-soft.com/B924FBA67E45410EB3D14D7D1B9D496F.jpg",//游学
    "171f13c86a6c481cb8ed19017de2a37b":"http://imageservice.pine-soft.com/2A679ED19CBD48679D1FF7E7FB2799AB.jpg",//公务员
    "1aa0e2a7425947479cb587910ec24369":"http://imageservice.pine-soft.com/565AC787CE5F45D8A55B53E87F3048A8.jpg",//行业资讯
    "37889929215a4bf3a4924d311899a529":"http://imageservice.pine-soft.com/2CC2CFBC6169455F89C94AC4567FA288.jpg",//生活
    "38a2576141d94728a3dcaf6ce162df31":"http://imageservice.pine-soft.com/69A70354EFE04A8EB13766D81D976E82.jpg",//实习
    "4660babd9e0b441e9fc1bf03fe1d79dd":"http://imageservice.pine-soft.com/F0A8AC0F583C40BFB3431EC7EAD07B18.jpg",//培训
    "47c37dd2113242cda653138d8817afe9":"http://imageservice.pine-soft.com/D1EC067D31CB4C78B1A17B5C4E0A447D.jpg",//校园
    "47d7347367004833b52781aeea2b04ab":"http://imageservice.pine-soft.com/E136D4088E464161AA25EBBEA6CEC573.jpg",//考研
    "7d9fa28b3880417faf786595f469580f":"http://imageservice.pine-soft.com/C52F197DB6BE426B99EAE38E50CD5479.jpg",//志愿者
    "87e435e2fcc442d59ccaed8d2f17b408":"http://imageservice.pine-soft.com/D3AD3E77AF3648F6A83462D0325527F2.jpg",//创业
    "ab9e57bef3614a9b88c442f13de0b3ea":"http://imageservice.pine-soft.com/97F8612B8D6145AEAB6847401CD30BD2.jpg",//留学
    "db191f54eee84a16a55e877ac407d9c1":"http://imageservice.pine-soft.com/C5FCA7524EB046F8831FC43F307C2754.jpg",//求职
    "df9b6cdd5e5f40039021f34c36c5a32c":"http://imageservice.pine-soft.com/8AD71DE09E8F4F2B91C468E4E56D21D8.jpg",//英语
    "e3effd03e54e4710aa558384f645c393":"http://imageservice.pine-soft.com/6FA20062B166493CAF87080BA27C131C.jpg"//间隔年
  }
  if(data[channelid] === undefined){
    return "";
  }
  return data[channelid]+"@1000w_1e_1c_90q";
}

//根据网址获取来源：如  http://www.dgtle.com/   返回 数字尾巴

export const getWebNameByWebAdress = (webAdress) =>{
  var data = {
    
  }

}
