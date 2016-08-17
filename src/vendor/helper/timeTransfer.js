export const millseconds2DateDiff = (input) => {
  var msecStr = input.toString().replace(/\/Date\(([-]?\d+)\)\//gi, "$1"); // => '1419492640000' ：通过正则替换，获取毫秒字符串
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
    var DIFF = HourDiff + '小时前';
  }
  return DIFF
}

export const dateTime2DateDiff = (input) => {
  input = new Date(input);
  input = input.getTime();
  var msecStr = input.toString().replace(/\/Date\(([-]?\d+)\)\//gi, "$1"); // => '1419492640000' ：通过正则替换，获取毫秒字符串
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
