import Vue from 'vue'
import App from './App'
import store from './store/index.js'

import util from './common/js/utils.js';

import md5 from 'js-md5';

//挂载vuex
Vue.prototype.$store = store

Vue.config.productionTip = false

// 挂载助手函数库
import $U from './common/js/utils.js';
Vue.prototype.$U = $U

// 引入请求库
import $H from './common/request.js';
Vue.prototype.$H = $H

//对util.js进行导入
Vue.prototype.$util = util;

Vue.prototype.$md5 = md5;

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
