import Vue from 'vue';
import { Toast, Dialog } from 'cube-ui'

Vue.use(Toast);
Vue.use(Dialog);


export default {
  loading: null,
  log: (...obj) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(...obj);
    }
  },
  // 显示toast
  showToast(msg) {
    const toast = Toast.$create({
      txt: msg || '提示',
      type: 'txt'
    })
    toast.show();
  },
  // 显示loading
  showLoading(msg) {
    this.loading = Toast.$create({
      txt: msg || '加载中...',
      mask: true,
      time: 0,
    })
    this.loading.show();
  },
  // 隐藏loading
  hideLoading() {
    if (!this.loading) return;
    this.loading.hide();
  },
  /**
   * 显示提示窗, 就一个按钮
   * @param {*} title 标题
   * @param {*} content 内容
   * @param {*} icon 图标
   * @param {*} maskClosable 点击蒙版是否可以关闭
   */
  showAlert({ title, content, icon, maskClosable }) {
    Dialog.$create({
      type: 'alert',
      title,
      content,
      icon,
      maskClosable: maskClosable || false,
    }).show();
  },
  /**
   * 显示弹窗, 两个按钮
   * @param {*} title 标题
   * @param {*} content 内容
   * @param {*} icon 图标
   * @param {*} confirmBtn 确认按钮
   * @param {*} cancelBtn 取消按钮
   * @param {*} onConfirm 点击确认回调
   * @param {*} onCancel 点击取消回调
   * @param {*} maskClosable 点击蒙版是否可以关闭
   */
  showConfirm({ title, content, icon, maskClosable, confirmBtn, cancelBtn, onConfirm, onCancel, showClose, onClose }) {
    Dialog.$create({
      type: 'confirm',
      title, content, icon,
      confirmBtn: confirmBtn || '确定',
      cancelBtn: cancelBtn || '取消',
      onConfirm,
      onCancel,
      onClose,
      showClose: showClose || false,
      maskClosable: maskClosable || false,
    }).show();
  },
  /**
   * 获取用户id
   */
  getUserId(_this) {
    if (!_this.$store.getters['user/userId']) {
      // userid 为空, 需要重新登录
      _this.$router.push('/login');
      setTimeout(() => {
        this.showToast('登录失效, 请重新登录');
      }, 300);
      return;
    }
    return _this.$store.getters['user/userId'];
  },
  /**
   * 获取存储在本地的数据
   * @param key key值
   */
  getLocalStorageItem(key) {
    if (!localStorage) {
      return '';
    }

    if (key === 'userId') {
      return localStorage.getItem(key);
    }

    // 获取用户的其他数据
    const userId = localStorage.getItem('userId');
    let userData = localStorage.getItem(userId) || '{}';
    userData = JSON.parse(userData);
    return key === userId ? userData : userData[key];
  },
  /**
   * 存储数据到本地
   * @param key
   * @param value
   */
  saveLocalStorageItem(key, value) {
    if (!localStorage) {
      return;
    }
    try {
      if (key === 'userId') {
        localStorage.setItem(key, value);
      } else {
        // 存储用户的其他数据
        const userId = localStorage.getItem('userId');
        let userData = this.getLocalStorageItem(userId) || {};
        userData[key] = value;
        localStorage.setItem(userId, JSON.stringify(userData));
      }
    } catch (error) {
      // 报错啦, 比如: 超出了大小限制
      console.log(error);
      // Toast('本地存储空间已满, 无法存储相关信息');
      // MessageBox.confirm('本地存储空间已满，无法存储信息，是否清空所有的数据？').then((action) => {
      //   console.log(action);
      //   if (action === 'confirm') {
      //     const userId = this.getUserId();
      //     this.clearLocalStorage();
      //     this.saveLocalStorageItem('userId', userId);
      //   }
      // });
    }
  },
  /**
   * 删除某个本地存储的数据
   * @param {String}} key 
   */
  removeLocalStorageItem(key) {
    if (key !== 'userId') {
      const userId = localStorage.getItem('userId');
      let userData = this.getLocalStorageItem(userId) || {};
      // userData[key] = value;
      delete userData[key];
      localStorage.setItem(userId, JSON.stringify(userData));
      return;
    }
    // 删除用户下数据
    localStorage && localStorage.removeItem(key);
  },
  /**
   * 清空数据
   * @param {String}} key 
   */
  clearLocalStorage() {
    localStorage && localStorage.clear();
  },
  /**
   * 获取历史记录
   * @param {String} key 
   */
  getHistoryList(key) {
    let list = this.getLocalStorageItem(key) || [];
    // list = list && list.length ? JSON.parse(list) : [];
    return list;
  },
  /**
   * 更新历史记录
   * @param {String} key localstorage key
   * @param {String} value 存储的值
   */
  updateHistoryList(key, value) {
    let list = this.getLocalStorageItem(key) || [];
    // 判断是否已经存在
    if (list.filter(item => item === value).length === 0 && value) {
      // 不存在, 保存到列表中
      if (list.length >= 10) {
        list.splice(0, 1);
      }
      // 最多保存10个, 超出将移除最开始一个
      list.push(value);
      this.saveLocalStorageItem(key, list);
    }
  },
  /**
   * 检查手机号码是否符合要求
   * @param  {[type]} phone [需要检查的手机号码]
   * @return {[type]}       [true： 格式正确  false：格式错误]
   */
  checkPhoneNum: (phone) => {
    return (/^((\+\d{2})|\(\d{2}\))?1\d{10}$/.test(phone));
  },
  /**
   * 检查是否是正整数
   * @param  {[type]} str [需要检查的内容]
   * @return {[type]}       [true： 格式正确  false：格式错误]
   */
  checkNum: (str) => {
    return (/^[1-9]\d*$/.test(str));
  },
  /**
   * [对Date的扩展，将 Date 转化为指定格式的String]
   * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
   * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
   * 例子：
   * (new Date()).Format('yyyy-MM-dd HH:mm:ss.S') ==> 2006-07-02 08:09:04.423
   * (new Date()).Format('yyyy-M-d h:m:s.S')      ==> 2006-7-2 8:9:4.18
   * @param {[type]} fmt [格式]
   */
  dateFormat: (dateStr, fmt) => { // author: meizz
    if (!dateStr) return '';
    fmt = fmt || 'yyyy-MM-dd HH:mm:ss';
    // ios 兼容写法
    var date;
    if (dateStr instanceof Date) {
      date = dateStr;
    } else {
      // 字符串类型
      dateStr = dateStr.replace(/\-/g, "/");
      date = new Date(dateStr);
    }

    var o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'H+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds(), // 毫秒
    };

    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
    }
    return fmt;
  },
  /**
   * 滚动到顶部
   * @param className  滚动到改className的顶部, 优先级高
   * @param idName 滚动到该id的顶部
   */
  scrollToTop({ className, idName }) {
    //设置定时器
    const timer = setInterval(function(){
      //获取滚动条距离顶部高度
      let osTop = 0;
      let scrollContainer;
      if (!className && !idName) {
        const container = document.getElementsByClassName('w-content');
        osTop = container && container.length ? container[container.length - 1].scrollTop : 0;
        scrollContainer = osTop ? container[container.length - 1] : scrollContainer;
      } else if (className) {
        const container = document.getElementsByClassName(className);
        osTop = container && container.length ? container[container.length - 1].scrollTop : 0;
        scrollContainer = osTop ? container[container.length - 1] : scrollContainer;
      } else if (idName) {
        const container = document.getElementById(idName);
        osTop = container ? container.scrollTop : 0;
        scrollContainer = osTop ? container : scrollContainer;
      }
      const ispeed = Math.floor(-osTop / 5);
      
      if (scrollContainer) {
        scrollContainer.scrollTop = osTop + ispeed;
      } else {
        document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
      }
      //到达顶部，清除定时器
      if (osTop == 0) {
        clearInterval(timer);
      }
    }, 10);
  },
  /**
   * 防抖
   * @param func 需要防抖的方法
   * @param limit 限制时间, 多少时间内只能执行一次
   */
  throttle2(func, limit) {
    let lastFunc
    let lastRan
    return function() {
      const context = this
      const args = arguments
      if (!lastRan) {
        func.apply(context, args)
        lastRan = Date.now()
      } else {
        clearTimeout(lastFunc)
        lastFunc = setTimeout(function() {
          if ((Date.now() - lastRan) >= limit) {
            func.apply(context, args)
            lastRan = Date.now()
          }
        }, limit - (Date.now() - lastRan))
      }
    }
  },
  /**
   * 频率控制 返回函数连续调用时，func 执行频率限定为 次 / wait
   * 
   * @param  {function}   func      传入函数
   * @param  {number}     wait      表示时间窗口的间隔
   * @param  {object}     options   如果想忽略开始边界上的调用，传入{leading: false}。
   *                                如果想忽略结尾边界上的调用，传入{trailing: false}
   * @return {function}             返回客户调用函数   
   */
  throttle(func, wait, options) {
    var context, args, result;
    var timeout = null;
    // 上次执行时间点
    var previous = 0;
    if (!options) options = {};
    // 延迟执行函数
    var later = function () {
      // 若设定了开始边界不执行选项，上次执行时间始终为0
      previous = options.leading === false ? 0 : Date.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function () {
      var now = Date.now();
      // 首次执行时，如果设定了开始边界不执行选项，将上次执行时间设定为当前时间。
      if (!previous && options.leading === false) previous = now;
      // 延迟执行时间间隔
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      // 延迟时间间隔remaining小于等于0，表示上次执行至此所间隔时间已经超过一个时间窗口
      // remaining大于时间窗口wait，表示客户端系统时间被调整过
      if (remaining <= 0 || remaining > wait) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
        //如果延迟执行不存在，且没有设定结尾边界不执行选项
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  },
  /**
   * 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
   *
   * @param  {function} func        传入函数
   * @param  {number}   wait        表示时间窗口的间隔
   * @param  {boolean}  immediate   设置为ture时，调用触发于开始边界而不是结束边界
   * @return {function}             返回客户调用函数
   */
  debounce(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function () {
      // 据上一次触发时间间隔
      var last = Date.now() - timestamp;

      // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function () {
      context = this;
      args = arguments;
      timestamp = Date.now();
      var callNow = immediate && !timeout;
      // 如果延时不存在，重新设定延时
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  },
  /**
   * 显示loading
   * @return {[type]} [description]
   */
  showLoadingLock() {
    let div = document.createElement("div");
    div.classList = ['w-loading', 'w-loading-bg'];
    let img = document.createElement('img');
    img.src = '~@/assets/loading.gif';
    img.className = 'loading-img';
    div.appendChild(img);
    document.body.appendChild('div');
  },
  /**
   * 关闭loading
   * @return {[type]} [description]
   */
  hideLoadingLock() {
    // layer.closeAll();
    // $(".w-loading").remove();
    const loadings = document.getElementsByClassName('w-loading');
    while(loadings.length) {
      document.body.removeChild(loadings[loadings.length - 1]);
    }
  },
  /**
   * 获取当前的路由
   * @param {*} fullPath  完整的路由
   * @param {*} currentPath 当前的路由
   */
  getCurrentPath({ fullPath, currentPath}) {
    const reg = new RegExp(`([\\w\\W]*/${currentPath})[\\w\\W]*`);
    // 先判断是否有这个路由
    return fullPath.match(reg) ? fullPath.replace(reg, '$1') : '';
  },
  /**
   * 获取全路径, http开头
   */
  getOrignPath({ fullPath, currentPath}) {
    const orign = window.location.origin;
    const pathName = window.location.pathname;
    const path = this.getCurrentPath({ fullPath, currentPath});
    return `${orign}${pathName}#${path}`;
  },
  /**
   * 获取最后一位元素
   * @param {*} name className
   */
  getLastElementByClassName(name) {
    const els = document.getElementsByClassName(name);
    if (!els.length) {
      return null;
    }
    return els[els.length - 1];
  },
  trim(str) {
    if (!str) return '';
    return str.replace(/^\s+|\s+$/gm, '');
  },
  /**
   * 获取屏幕宽度缩放比 (对比尺寸 iphone5 320)
   */
  getScale() {
    return document.body.clientWidth / 320;
  },
  //重新绘制图片
  /**
   * 压缩图片, 重新绘制图片
   * @param {*} path 图片地址
   * @param {*} obj 文件压缩的后宽度，宽度越小，字节越小 { width, height, quality }
   * @param {*} callback 成功回调
   */
  canvasDataURL({ path, obj, callback }){
    obj = obj || {};
    let img = new Image();
    img.src = path;
    img.onload = function() {
      let that = this;
      // 默认按比例压缩
      let w = that.width,
        h = that.height,
        scale = w / h;
      w = obj.width || w;
      h = obj.height || (w / scale);
      let quality = 0.7;  // 默认图片质量为0.7
      //生成canvas
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      // 创建属性节点
      let anw = document.createAttribute("width");
      anw.nodeValue = w;
      let anh = document.createAttribute("height");
      anh.nodeValue = h;
      canvas.setAttributeNode(anw);
      canvas.setAttributeNode(anh);
      ctx.drawImage(that, 0, 0, w, h);
      // 图像质量
      if(obj.quality && obj.quality <= 1 && obj.quality > 0){
        quality = obj.quality;
      }
      // quality值越小，所绘制出的图像越模糊
      let base64 = canvas.toDataURL('image/jpeg', quality);
      // 回调函数返回base64的值
      callback(base64);
    }
  },
  nativeCloseKeyboard() {
    try {
      // eslint-disable-next-line
      native_listen('closeKeyBoard');
    } catch (error) {
      // console.log('error: ', error);
    }
  },
}