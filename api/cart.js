import requests from '../common/request.js'

export function addCart(params) {
  return requests.post('/shop-cart', params);
}

export function getCart(params) {
  return requests.get('/shop-cart', { params });
}

export function getCartPage(params) {
  return requests.get('/shop-cart/page', { params });
}

export function deleteCartItem(id) {
  return requests.delete(`/shop-cart/{shoppingCartItemId}`);
}

export function modifyCart(params) {
  return requests.put('/shop-cart', params);
}

export function getByCartItemIds(params) {
  return requests.get('/shop-cart/settle', { params });
}