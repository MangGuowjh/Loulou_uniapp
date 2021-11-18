import requests from '../common/request.js'

export function addAddress(params) {
  return requests.post('/address', params);
}

export function EditAddress(params) {
  return requests.put('/address', params);
}

export function DeleteAddress(id) {
  return requests.delete(`/address/{addressId}`);
}

export function getDefaultAddress() {
  return requests.get('/address/default');
}

export function getAddressList() {
  return requests.get('/address', { pageNumber: 1, pageSize: 1000 })
}

export function getAddressDetail(id) {
  return requests.get(`/address/{addressId}`)
}


