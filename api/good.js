import requests from '../common/request.js'

export function getCategory() {
  return requests.get('/categories');
}

export function search(params) {
  return requests.get('/search', { params });
}

export function getDetail(params) {
	// alert(JSON.stringify(params))
  return requests.get(`/goods/detail/`+params);
}