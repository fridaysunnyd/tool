/**
 * 倒计时(含天)
 * @param {时间戳} end 
 * @param {时间校正} dif 
 */
export function countTime(end, dif) {
  const now = new Date().getTime() - dif;
  //时间差
  const leftTime = end - now;
  //定义变量 d,h,m,s保存倒计时的时间
  let d, h, m, s;
  if (leftTime > 0) {
    d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
    h = Math.floor((leftTime / 1000 / 60 / 60) % 24);
    m = Math.floor((leftTime / 1000 / 60) % 60);
    s = Math.floor((leftTime / 1000) % 60);
  } else {
    return;
  }
  //将倒计时赋值到div中
  if (this.$refs.hour) {
    this.$refs.day.innerHTML = d;
    this.$refs.hour.innerHTML = h > 9 ? h : "0" + h;
    this.$refs.minute.innerHTML = m > 9 ? m : "0" + m;
    this.$refs.second.innerHTML = s > 9 ? s : "0" + s;
  }
  //递归每秒调用countTime方法，显示动态时间效果
  setTimeout(() => {
    countTime.call(this, end, dif)
  }, 1000);
}
/**
 * 数值格式化(000,000)
 * @param {any} str 
 */
export function formatNumber(str) {
  //formatNumber(undefined) === undefined ---------> true
  if (!str) {
    return
  }
  str = str.toString();
  const strF = str.split(".")[0];
  const strB = str.split(".")[1];
  const re = /(?=(?!\b)(\d{3})+$)/g;
  return strB ? strF.replace(re, ",") + "." + strB : strF.replace(re, ",");
}
/**
 * 时间戳格式化
 * @param {*} time 
 * @param {String} type 
 */
export function formatTime(time, type) {
  if (!time) {
    return "";
  }
  let unixtime = time;
  let unixTimestamp = new Date(unixtime);
  let Y = unixTimestamp.getFullYear();
  let M =
    unixTimestamp.getMonth() + 1 > 9 ?
    unixTimestamp.getMonth() + 1 :
    "0" + (unixTimestamp.getMonth() + 1);
  let D =
    unixTimestamp.getDate() > 9 ?
    unixTimestamp.getDate() :
    "0" + unixTimestamp.getDate();
  let H =
    unixTimestamp.getHours() > 9 ?
    unixTimestamp.getHours() :
    "0" + unixTimestamp.getHours();
  let F =
    unixTimestamp.getMinutes() > 9 ?
    unixTimestamp.getMinutes() :
    "0" + unixTimestamp.getMinutes();
  let S =
    unixTimestamp.getSeconds() > 9 ?
    unixTimestamp.getSeconds() :
    "0" + unixTimestamp.getSeconds();
  if (type === 'year') {
    let toDay = Y + "-" + M + "-" + D;
    return toDay;
  } else if (type === 'month') {
    let toDay = M + "-" + D + " " + H + ":" + F;
    return toDay;
  } else {
    let toDay = Y + "-" + M + "-" + D + " " + H + ":" + F + ":" + S;
    return toDay;
  }
}
/**
 * 调用移动端方法
 * @param {移动端类型} type 
 * @param {事件名} eventName 
 * @param {传递标识} message 
 */
export function mobileEvent(type, eventName, message) {
  if (type === 'ios') {
    window.webkit.messageHandlers[eventName].postMessage(message)
    return
  } else if (type === 'android') {
    window.nativeObjectHelp[eventName](message);
    return
  }
}
