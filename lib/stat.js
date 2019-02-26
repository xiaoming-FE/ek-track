/******************
 * @file stat.js
 * @desc 打点统计主代码
 * @author leinov
 * @date:2019-02-15
 ******************/
import eventUtil from './eventUtil';
import Report from './report';
import Browser from './browser';

class Stat {
  constructor() {
    this.postData = {}; // 向后端发送请求的数据包
    this.sendData = this.sendData.bind(this);
    this.currentTagInfo = {}; // 当前点击元素的基本信息
    this.setTimeFun = this.setTimeFun.bind(this);
    this.lastClickFun = this.lastClickFun.bind(this);
    this.eventQueueData = [];
    this.screen = `${window.screen.width},${window.screen.height}`;
    this.activeSend = this.activeSend.bind(this);
    this.init();
  }

  // 初始化
  init() {
    var self = this;
    // 鼠标按下
    eventUtil.addEvent({
      type: "mousedown",
      cb: function (event) {
        self.currentTagInfo["mouseDownTarget"] = event.target;
        self.currentTagInfo["mouseDownTime"] = +new Date();
      }
    })
    // 鼠标抬起
    eventUtil.addEvent({
      type: "mouseup",
      cb: function (event) {
        if (event.button === 2) {
          return;
        }
        try {
          self.currentTagInfo["mouseUptarget"] = event.target;
          self.currentTagInfo["mouseUpTime"] = +new Date();
          var sign = self.findNode(event.target, [], true),
            pos = event.pageX + "," + event.pageY;
          if (sign) {
            var tagName = event.target.tagName; // 目标元素标签
            self.postData = Object.assign({
              sign,
              pos,
              tagName
            }, {
              sendType: 0
            }, Browser.getBrowser(), {
              screen: self.screen,
              target: self.currentTagInfo
            });
            var deepData = self.deepCopy(self.postData);
            self.eventQueue('eventQueueData', deepData);
            self.lasOneClick();
          }
        } catch (err) {
          console.log(err)
        }
      }
    })
  }
  // 空函的函数，用于setTimout
  setTimeFun() {}

  // 判断哪次点击并传参数
  lastClickFun(which) {
    which = which === 0 ? 0 : 1;
    this.req(which);
  }

  //执行最后一次点击调用
  lasOneClick() {
    var self = this;
    // 如果点击了两次，并且两次是不同的元素 则发送第一次点击的元素
    if (this.eventQueueData.length == 2 && this.eventQueueData[0].target.mouseUptarget !== this.eventQueueData[1].target.mouseUptarget && this.eventQueueData[1].target.mouseUpTime - this.eventQueueData[0].target.mouseUpTime < 500) {
      this.lastClickFun(0);
    } else {
      clearTimeout(self.setTimeFun);
      this.setTimeFun = setTimeout(self.lastClickFun, 1000)
    }
  }

  // 队列检查
  eventQueue(wrapper, data) {
    if (this[wrapper].length == 0) {
      this[wrapper].push(data);
    } else if (this[wrapper].length == 1) {
      this[wrapper].push(data);
    } else {
      this[wrapper].shift();
      this[wrapper].push(data);
    }
  }

  /**
   * DOM遍历寻找标识
   *
   * @param {HTMLObjectElement} node
   * @param {String} ele
   */
  findNode(node, sign, handle) {
    var attr = node.getAttribute("ek-sign"),
      box = node.getAttribute("ek-box");
    attr = attr || box || "";
    if (node != document.body) {
      if ((sign.length === 0 && handle && box) || (sign.length === 0 && !attr)) {
        return null;
      }
      sign.push(attr);
      return this.findNode(node.parentNode, sign);
    } else {
      sign.push(attr);
    }
    return sign.filter((item) => {
      return item;
    }).reverse().join("-");
  }

  // 触发主动发送获取数据
  sendData({
    event = "",
    sign = "",
    data = {}
  } = {}) {
    const self = this;
    var pos = event ? event.pageX + "," + event.pageY : "";
    if (event) {
      sign = this.findNode(event.target, [sign], false);
    }
    this.postData = Object.assign(
      data, {
        sign: sign,
        sendType: 1,
        screen: self.screen,
        pos: pos
      }, Browser.getBrowser()
    );
    clearTimeout(self.setTimeFun);
    this.setTimeFun = setTimeout(self.activeSend, 300)
  }

  // 发送数据
  activeSend() {
    Report.postData(this.postData);
  }

  // 向后端发送请求
  req(which) {
    if (which == 0 || this.eventQueueData.length == 1) {
      Report.postData(this.eventQueueData[0]);
    } else {
      Report.postData(this.eventQueueData[1]);
    }
  }

  // 深拷贝
  deepCopy(data) {
    if (Object.prototype.toString.call(data) === "[object Array]") {
      return data.map(((item) => {
        if (Object.prototype.toString.call(item) === "[object Array]" || Object.prototype.toString.call(item) === "[object Object]") {
          return this.deepCopy(item);
        }
        return item;
      }));
    } else if (Object.prototype.toString.call(data) === "[object Object]") {
      let newData = {};
      for (let i in data) {
        if (Object.prototype.toString.call(data[i]) === "[object Array]" || Object.prototype.toString.call(data[i]) === "[object Object]") {
          newData[i] = this.deepCopy(data[i]);
        } else {
          newData[i] = data[i];
        }
      }
      return newData;
    }
  }
}

export default Stat;