import track from '../index.js';
track.init({url:"http://locahost:3000"});
// 主动触发按钮post数据
document.querySelector("#active").onclick=function(event){
    track.send({sign:"hahaha",data:{name:1,age:2}})
}

// 不触发主动发送，比如异常上报