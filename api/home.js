import requests from '../common/request.js'

export function getHome(params) {
  return requests.get('/index-infos');
}
