import requests from '../common/request.js'

// 创建订单
export function createOrder(params) {
  return requests.post('/saveOrder', params);
}

// 获取订单列表
export function getOrderList(params) {
  return requests.get('/order', { params });
}

// 根据 id 获取订单详情
export function getOrderDetail(id) {
  return requests.get(`/order/${id}`);
}

// 取消订单
export function cancelOrder(id) {
  return requests.put(`/order/${id}/cancel`);
}

// 确认订单
export function confirmOrder(id) {
  return requests.put(`/order/${id}/finish`)
}

// 支付接口
export function payOrder(params) {
  return requests.get('/paySuccess', { params })
}

