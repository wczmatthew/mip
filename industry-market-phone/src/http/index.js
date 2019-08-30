/* eslint-disable */
import Vue from 'vue';
import axios from 'axios';
// 引入qs
import qs from 'qs';
import Utils from '@/common/Utils';

import {
  LOGINERR,
  LOGOUT,
  SUCCESS,
  MOCKHOST,
  EASEMOCKHOST,
} from './httpConst';
import router from '../router';

let httpHost = '';
if (process.env.NODE_ENV === 'production') {
  // 正式版本
  httpHost = getProjectName() || '';
} else if (process.env.NODE_ENV === 'test-dev' || process.env.NODE_ENV === 'development') {
  // httpHost = '/hw';
  // httpHost = '/local';
  httpHost = '/test';
}

// console.log('http env: ', process.env.NODE_ENV)

export { httpHost };

axios.defaults.baseURL = httpHost; // 默认的请求url

// 获取路径前缀 比如 http://www.aaa.com/abc/sdfong  => /abc
function getProjectName() {
  var strFullPath = window.document.location.href;
  var strPath = window.document.location.pathname;
  var pos = strFullPath.indexOf(strPath);
  // var prePath = strFullPath.substring(0, pos);
  var postPath = strPath.substring(0, strPath.substr(1).indexOf("/") + 1);
  return postPath === '/marketingmobile' ? "" : postPath;
} 



function handleRes(response, showErrToast) {
  if (parseInt(response.data.code, 10) === LOGOUT) {
    Utils.showToast('退出登录成功');
    router.push('/');
    return '';
  }

  if (parseInt(response.data.code, 10) === LOGINERR) {
    // localStorage.clear();
    // console.log('clear local');
    Utils.showToast(response.data.msg || '登录超时, 请重新登录');
    router.push('/');
    return '';
  }

  if (showErrToast && parseInt(response.data.code, 10) !== SUCCESS) {
    Utils.showToast(response.data.msg || '请求失败, 请重试');
    return '';
  }

  if (process.env.NODE_ENV !== 'production') {
    console.debug('response: ', response.data.data);
  }
  return response.data.data || ' ';
}

/**
 * 处理http前缀
 * @param {*} host 
 */
function handleHttpHost(host) {
  if (axios.defaults.baseURL === host) {
    return;
  }

  if (host === '/chint') {
    axios.defaults.baseURL = EASEMOCKHOST;
  } else if (host === '/mock') {
    axios.defaults.baseURL = MOCKHOST;
  } else {
    axios.defaults.baseURL = httpHost;
  }
}


/**
 * post http请求
 * @param  {String} url           [请求url]
 * @param  {Object} params        [请求参数]
 * @param  {[type]} showErrToast  [是否显示错误提示]
 * @return {[type]}               [description]
 */
export async function postHttp({
  url = '',
  params = {},
  config = {},
  showErrToast = true,
  host = '',
} = {
  url: '',
  params: {},
  config: {},
  showErrToast: true,
  host: '',
}) {
  handleHttpHost(host);
  try {
    const response = await axios.post(url, qs.stringify(params), {
      ...config,
      // headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      timeout: 30000,
    });

    return handleRes(response, showErrToast);
  } catch (e) {
    console.error('err: ', e);
    Utils.showToast('请求失败, 请重试');
    return '';
  }
}

/**
 * post http请求
 * @param  {String} url           [请求url]
 * @param  {Object} params        [请求参数]
 * @param  {[type]} showErrToast  [是否显示错误提示]
 * @return {[type]}               [description]
 */
export async function postHttpFormData({
  url = '',
  params = {},
  showErrToast = true,
  host = '',
} = {
  url: '',
  params: {},
  showErrToast: true,
  host: '',
}) {
  handleHttpHost(host);

  try {
    const response = await axios.post(url, params, {
      headers: {
        'Content-Type': 'multipart/form-data;charset=UTF-8',
      },
      timeout: 30000,
    });

    return handleRes(response, showErrToast);
  } catch (e) {
    console.error('err: ', e);
    Utils.showToast('请求失败, 请重试');
    return '';
  }
}

/**
 * post http请求
 * @param  {String} url           [请求url]
 * @param  {Object} params        [请求参数]
 * @param  {[type]} showErrToast  [是否显示错误提示]
 * @return {[type]}               [description]
 */
export async function postHttpNoQs({
  url = '',
  params = {},
  config = {},
  showErrToast = true,
  host = '',
} = {
  url: '',
  params: {},
  config: {},
  showErrToast: true,
  host: '',
}) {
  handleHttpHost(host);

  try {
    const response = await axios.post(url, params, {
      ...config,
      // headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      timeout: 30000,
    });

    return handleRes(response, showErrToast);
  } catch (e) {
    console.error('err: ', e);
    Utils.showToast('请求失败, 请重试');
    return '';
  }
}

/**
 * get http请求
 * @param  {String} url           [请求url]
 * @param  {Object} params        [请求参数]
 * @param  {[type]} showErrToast  [是否显示错误提示]
 * @return {[type]}               [description]
 */
export async function getHttp({
  url = '',
  params = {},
  showErrToast = true,
  host = '',
} = {
  url: '',
  params: {},
  showErrToast: true,
  host: '',
}) {
  handleHttpHost(host);

  try {
    const response = await axios.get(url, { params }, {
      // headers: {
      //   'Content-Type': 'application/json',
      //   USER_ID: localStorage.getItem('userId') || '',
      //   ACCESS_TOKEN: localStorage.getItem('accessToken') || ''
      // },
      // headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      timeout: 30000,
    });

    return handleRes(response, showErrToast);
  } catch (e) {
    console.error('err: ', e);
    Utils.showToast('请求失败, 请重试');
    return '';
  }
}