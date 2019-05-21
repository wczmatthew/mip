/**********************************************************
 *
 * webview 和 native 交互接口
 *
 * @author tale
 *
 **********************************************************
 */
// 判断是否 ios
function is_ios() {
  var browserName = navigator.userAgent.toLowerCase();
  return /(iphone|ipod|ipad)/i.test(browserName);
}

// 判断是否 微信浏览器
function is_wechat() {
  var browserName = navigator.userAgent.toLowerCase();
  return /(MicroMessenger)/i.test(browserName);
}

// 判断是否 mobile
// function is_mobile() {
//   var browserName = navigator.userAgent.toLowerCase();
//   return /(blackberry|playbook|configuration\/cldc|hp |hp‐|htc |htc_|htc‐
//   |iemobile|kindle|midp|mmp|motorola|mobile|nokia|opera mini|opera |Googlebot‐Mobile|YahooSeeker\/M1A1‐R2D2|android|iphone|ipod|ipad|mobi|palm|palmos|pocket|portalmmm|ppc;|smartphone|sonyericsson|sqh|spv|symbian|treo|up.browser|up.link|vodafone|windows ce|xda
//   |xda_)/i.test(browserName);
// }

function is_mobile(ua) {
  if (!ua && typeof navigator != 'undefined') ua = navigator.userAgent;
  if (ua && ua.headers && typeof ua.headers['user-agent'] == 'string') {
    ua = ua.headers['user-agent'];
  }
  if (typeof ua != 'string') return false;

  return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(ua) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0,4));
}

// webview 统一触发 native 事件的入口（用于webview调用APP事件）
function native_listen(event, params) {
  // alert('native_listen,event:' + event);
  // alert('native_listen,params:' + params);
  if (typeof event != 'string' || !event.length) {
    throw new Error('native_listen');
  }
  try {
    if (is_wechat()) {
      // webview 中执行 wechat 事件（每个页面都要复写此方法）
      return excute_wechat(event, params);
    }
    var _json = JSON.stringify({
      event: event,
      params: params
    });
    console.log(_json);
    if (is_ios()) {
      return window.webkit.messageHandlers.webviewEvent.postMessage(_json);
    } else {
      return ResultAndroid.webviewEvent(_json);
    }
  } catch (_e) {
    alert(_e);
    return;
  }
}

// 页面跳转至另一个 webview 的简单事件封装
function native_jump(page, url) {
  return native_listen('jump', {
    page: page,
    url: url
  });
}

// 页面回退事件的封装
function native_back() {
  return native_listen('back');
}

// 弹出页面确认框事件的封装
function native_confirm(message, yes, no) {
  if (typeof yes == 'function') {
    add_native_callback('confirm_yes', yes);
  }
  if (typeof no == 'function') {
    add_native_callback('confirm_no', no);
  }
  return native_listen('confirm', {
    message: message
  });
}

// native 事件回调队列
var _native_callback_query;
// 避免重复引入文件导致队列被整体覆盖的问题
if (_native_callback_query == null) {
  _native_callback_query = [];
}


/**
 * 添加一个 native 事件回调
 * 注意：相同事件名的回调函数会被覆盖，除非业务逻辑需要覆盖，否则请避免重名！
 * @param {*} event 交互事件
 * @param {*} callback 回调
 */
function add_native_callback(event, callback) {
  if (typeof event == 'string' && event.length > 0 && typeof callback ==
  'function') {
    _native_callback_query[event] = callback;
  } else {
    throw new Error("add_native_callback");
  }
}

// native 统一触发 webview 事件的入口（用于APP调用webview事件）
function webview_listen(event, params) {
  // alert('webview_listen,event:' + event);
  // alert('webview_listen,params:' + params);
  try {
    var callback = _native_callback_query[event];
    if (typeof callback == 'function') {
      // 触发事件回调
      if (typeof params == 'string') {
        params = JSON.parse(params);
      }
      return callback(params);
    } else {
      throw new Error(
        'the callback function of "' + event  + '" event is not found!'
      );
    }
  } catch (_e) {
    alert(_e);
    return 'listen error!';
  }
}