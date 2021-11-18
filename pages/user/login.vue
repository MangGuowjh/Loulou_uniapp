<template>
	<div class="login">
		<s-header :name="type == 'login' ? '登录' : '注册'" :back="'pages/index/index'"></s-header>
		<img class="logo" src="//s.weituibao.com/1591183219275/200181591183191_.pic.jpg" alt="" />
		<div v-if="type == 'login'" class="login-body login">
			<form @submit="onSubmit">
				<input type="text" v-model="username" placeholder="请输入用户名" placeholder-style="font-size:35rpx;color:#d1d1d1;" style="height: 85rpx;" />
				<input type="password" v-model="password" placeholder="请输入密码" placeholder-style="font-size:35rpx;color:#d1d1d1;" style="height: 85rpx;" />
				<div class="verify">
					<Verify ref="loginVerifyRef" @error="error" :showButton="false" @success="success" :width="'30%'" :height="'40px'" :fontSize="'16px'" :type="2"></Verify>
				</div>
				<div style="margin: 16px;">
					<div class="link-register" @click="toggle('register')">立即注册</div>
					<button type="warn" form-type="submit">登录</button>
				</div>
			</form>
		</div>
		<div v-else class="login-body register">
			<form @submit="onSubmit">
				<input type="text" v-model="username1" placeholder="请输入用户名" placeholder-style="font-size:35rpx;color:#d1d1d1;" style="height: 85rpx;" />
				<input type="password" v-model="password1" placeholder="请输入密码" placeholder-style="font-size:35rpx;color:#d1d1d1;" style="height: 85rpx;" />
				<div class="verify">
					<Verify ref="loginVerifyRef" @error="error" :showButton="false" @success="success" :width="'100%'" :height="'40px'" :fontSize="'16px'" :type="2"></Verify>
				</div>
				<div style="margin: 16px;">
					<div class="link-login" @click="toggle('login')">已有登录账号</div>
					<button type="warn" form-type="submit">注册</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import sHeader from '@/components/SimpleHeader';
import { login, register, getUserInfo } from '../../api/user.js';
import Verify from 'vue2-verify';
import md5 from 'js-md5';
export default {
	data() {
		return {
			username: '17774319884',
			password: '111111',
			username1: '',
			password1: '',
			type: 'login',
			verify: false
		};
	},
	components: {
		sHeader,
		Verify
	},
	methods: {
		dealTriVer() {
			this.$refs.loginVerifyRef.$refs.instance.checkCode();
		},
		toggle(v) {
			this.verify = false;
			this.type = v;
		},
		onSubmit(values) {
			this.dealTriVer();
			if (!this.verify) {
				uni.showToast({
					title: '验证码未填或填写错误!',
					icon: 'none'
				});
				return;
			}
			if (this.type == 'login') {
				let data ={
					loginName:this.username,
					passwordMd5:md5(this.password)
				}
				console.log("jkahckhackj"+JSON.stringify(data))
				login(data).then(res => {
					console.log(res.data);
					if (res.resultCode == 200) {
						let token = res.data;
						let loginStatus = true
						uni.showModal({
							title: '登录成功',
							content: '去看看',
					
							success: res => {
								if (res.confirm) {
									// this.$store.commit('login', userInfo);
									this.$store.commit('token', token);
									this.$store.commit('loginStatus', loginStatus);
									// this.$store.commit('userId', userId);
									console.log('------' + this.$store.state.token);
									uni.switchTab({
										url: '../index/index'
									});
								}
							}
						});
					}
				});
			} else {
				let data ={
					loginName:this.username1,
					password:this.password1
				}
				register(data).then(res => {
					if (res.resultCode == 200) {
						let token = res.data;
						
						uni.showModal({
							title: '注册成功',
							content: '去登录',
					
							success: res => {
								if (res.confirm) {
									// this.$store.commit('login', userInfo);
									this.$store.commit('token', token);
									
									// this.$store.commit('userId', userId);
									console.log('------' + this.$store.state.token);
								}
							}
						});
					}
				});
				uni.showToast({
					title: '注册成功!',
					icon: 'none'
				});
				this.type = 'login';
			}
		},
		success(obj) {
			this.verify = true;

			// 回调之后，刷新验证码
			obj.refresh();
		},
		error(obj) {
			this.verify = false;
			// 回调之后，刷新验证码
			obj.refresh();
		}
	}
};
</script>

<style lang="less" scoped>
@import '../../common/style/mixin.less';
.login {
	.logo {
		width: 160px;
		// height: 120px;
		display: block;
		margin: 80px auto 0px;
	}
	.login-body {
		padding: 0 20px;
		margin-top: 20px;
	}
	.login {
		.link-register {
			font-size: 14px;
			margin-bottom: 20px;
			color: #1989fa;
			display: inline-block;
		}
	}
	.register {
		.link-login {
			font-size: 14px;
			margin-bottom: 20px;
			color: #1989fa;
			display: inline-block;
		}
	}
	.verify-bar-area {
		margin-top: 24px;
		.verify-left-bar {
			border-color: #c40000;
		}
		.verify-move-block {
			background-color: #c40000;
			color: #fff;
		}
	}
	.verify {
		> div {
			width: 100%;
		}
		display: flex;
		justify-content: center;
		.cerify-code-panel {
			margin-top: 16px;
		}
		.verify-code {
			width: 40% !important;
			float: left !important;
		}
		.verify-code-area {
			float: left !important;
			width: 54% !important;
			margin-left: 14px !important;
			.varify-input-code {
				width: 90px;
				height: 38px !important;
				border: 1px solid #e9e9e9;
				padding-left: 10px;
				font-size: 16px;
			}
			.verify-change-area {
				line-height: 44px;
			}
		}
	}
}
</style>
