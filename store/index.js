import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// import $C from '@/common/config.js';
import $http from '@/common/request.js';
import $U from '@/common/util.js';
import { getCart } from '../api/cart.js'

export default new Vuex.Store({
	state: {
		//登录状态判断
		loginStatus: false,
		token: false,
		user: {},
		a:'',
		userId:'',
		cartCount: 0
	},
	getters: {},
	mutations: {
		//登陆成功后，用户数据存入本地存储
		login(state,user) {
			state.loginStatus = true
			state.user = user
			uni.setStorageSync('user',JSON.stringify(user));
		},
		loginStatus(state,loginStatus) {
					state.loginStatus = loginStatus
				},
		//存储token
		token(state,token) {
			state.a = token
		},
		// 存储
		userId(state,userId) {
			// alert(userId)
			state.userId = userId
			// alert(state.userId)
		},
		//退出登录
		logout(state){
			state.loginStatus = false
			state.user ={}
			uni.removeStorageSync('user');
		},
		//修改资料
		editUserInfo(state,obj) {
			if(state.user){
				state.user.nickname = obj.nickname
				state.user.avatar = obj.avatar
				state.user.gender = obj.gender
				state.user.area = obj.area
				uni.setStorageSync('user',JSON.stringify(state.user));
			}
		},
		addCart(state, payload) {
		    state.cartCount = payload.count
		}
	},
	actions: {
		// async updateCart(ctx) {
		//     const { data } = await getCart()
		//     ctx.commit('addCart', {
		// 		count: data.length || 0
		//     })
		// }
		updateCart(ctx) {
			getCart().then(res => {
				ctx.commit('addCart', {
					count: data.length || 0
				})
			})
		}
	}
})