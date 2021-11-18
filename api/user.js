// user.js
import requests from '../common/request.js' 

// 获取用户信息
export function getUserInfo() {
  return requests.get('/user/info');
}

// 编辑用户信息
export function EditUserInfo(params) {
  return requests.put('/user/info', params);
}

// 登录
export function login(params) {
  return requests.post('/user/login', params);
}

// 登出
export function logout() {
  return requests.post('/user/logout')
}

// 注册
export function register(params) {
  return requests.post('/user/register', params);
}

