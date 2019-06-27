// 显示loading
function showLoading(id) {
  $("#" + id).append(
    '<div class="w-loading-mid">'+
    '  <img src="../assets/common/loading-blue.svg" class="loading-img">'+
    '</div>'
  );
}

// 隐藏loading
function hideLoading(id) {
  $("#" + id).find('.w-loading-mid').remove();
}
/**
 * [将 Date 转化为指定格式的String]
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * 例子：
 * (new Date()).Format('yyyy-MM-dd HH:mm:ss.S') ==> 2006-07-02 08:09:04.423
 * (new Date()).Format('yyyy-M-d h:m:s.S')      ==> 2006-7-2 8:9:4.18
 * @param {[type]} fmt [格式]
 */
function dataFormat(dateStr, fmt) {
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
}

// 显示登录
function showLoginModal() {
  var loginHtml = '' +
  '<div class="login-modal">'+
  '  <i class="iconfont icon-close" onclick="onCloseLogin()"></i>'+
  '  <img src="../assets/login/erweima-bg.png" class="change-icon" onclick="changeToScanLogin(this)"/>'+
  '  <div class="login-modal-title">'+
  '    <img src="../assets/common/chint-logo.png" class="title-icon"/>'+
  '    <p class="title">正泰统一登录门户</p>'+
  '  </div>'+
  '  <div class="login-modal-content" id="loginModalContent">'+
  '    <div class="input-item">'+
  '      <i class="iconfont icon-gerenguanli"></i>'+
  '      <input type="text" placeholder="域账号"/>'+
  '    </div>'+
  '    <div class="input-item">'+
  '      <i class="iconfont icon-mima"></i>'+
  '      <input type="text" placeholder="密码"/>'+
  '    </div>'+
  '    <div class="login-tip">'+
  '      <input type="checkbox"/> 七天内记住密码'+
  '    </div>'+
  '  </div>'+
  '  <button type="button" class="blue-btn" onclick="onLogin()">登录</button>'+
  '  <div class="login-bottom-line"></div>'+
  '</div>';

  layer.open({
    type: 1,
    title: false,
    closeBtn: 0,
    shadeClose: true,
    skin: 'login-modal',
    content: loginHtml
  });
}

// 点击登录
function onLogin() {
  var isChecked = $("#loginModalContent .login-tip input[type=checkbox]").prop('checked');
  if (isChecked) {
    // 勾选了7天记住密码
  }
  // 进行登录操作
}

// 关闭登录按钮
function onCloseLogin() {
  layer.closeAll();
}

// 更改为扫码登录
function changeToScanLogin(_this) {
  $(_this).attr('src', '../assets/login/login-icon.png').attr('onclick', 'changeToNormalLogin(this)');
  $("#loginModalContent").empty().append(
    '<img src="" class="login-modal-erweima"/>'+
    '<div class="login-erweima-tip">'+
    '  打开<span class="blue">公司内部网APP</span>扫码登录'+
    '</div>'
  );
}

// 更改为账号密码登录
function changeToNormalLogin(_this) {
  $(_this).attr('src', '../assets/login/erweima-bg.png').attr('onclick', 'changeToScanLogin(this)');;
  $("#loginModalContent").empty().append(
    '<div class="input-item">'+
    '  <i class="iconfont icon-gerenguanli"></i>'+
    '  <input type="text" placeholder="域账号"/>'+
    '</div>'+
    '<div class="input-item">'+
    '  <i class="iconfont icon-mima"></i>'+
    '  <input type="text" placeholder="密码"/>'+
    '</div>'+
    '<div class="login-tip">'+
    '  <input type="checkbox"/> 七天内记住密码'+
    '</div>'
  );
}