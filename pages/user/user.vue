<template>
	<div class="user-box">
		<s-header :name="'我的'"></s-header>
		<template v-if="!loginStatus">
			<view class="login">
				<image class="img-login" src="../../static/user/personal_center_04.png" @click="gotoLogin"></image>
				<view>请点击登录</view>
			</view>
		</template>
		<template v-else>
			<div class="user-info">
				<div class="info">
					<image class="img-login" src="../../static/categories/zzy.jpg"/>
					<div class="user-desc">
						<span>昵称：{{ user.nickName }}</span>
						<span class="id">id：{{ user.loginName }}</span>
						<span class="name">个性签名：{{ user.introduceSign }}</span>
					</div>
				</div>
			</div>
			<view>
				<uni-grid :column="2" :square="false">
					<uni-grid-item>
						<navigator align="center" style="margin-top: 10%;margin-bottom: 10%;" url="../cart/order/order">
							<image src="../../static/user/my-list.png" class="list-img"></image>
							<view>我的订单</view>	
						</navigator>
					</uni-grid-item>
					<uni-grid-item>
						<navigator align="center" style="margin-top: 10%;margin-bottom: 10%;" url="./setting">
							<image src="../../static/user/account-manage.png" class="list-img"></image>
							<view>账号管理</view>	
						</navigator>
					</uni-grid-item>
					<uni-grid-item>
						<navigator align="center" style="margin-top: 10%;margin-bottom: 10%;" url="address/address">
							<image src="../../static/user/address-manage.png" class="list-img"></image>
							<view>地址管理</view>	
						</navigator>
					</uni-grid-item>
					<uni-grid-item>
						<navigator align="center" style="margin-top: 10%;margin-bottom: 10%;" url="./about">
							<image src="../../static/user/about-us.png" class="list-img"></image>
							<view>关于我们</view>	
						</navigator>
					</uni-grid-item>
				</uni-grid>
			</view>
		</template>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import sHeader from '@/components/SimpleHeader'
import { getUserInfo } from '../../api/user.js'
export default {
	components: {
		sHeader
	},
	data() {
		return {
			user: {},
			nickname: '',
			url: []
		}
	},
	computed:{
		...mapState({
			loginStatus: state => state.loginStatus,
			// user: state => state.user
			token: state => state.a
		}),
		//用户头像
		// avatar() {
		// 	console.log(this.user.avatar)
		// 	return this.user.avatar ? this.user.avatar : '/static/default.jpg';
		// }
	},
	onShow() {
		console.log(this.loginStatus)
		this.getUserData()
	},
	methods: {
		goBack() {
			// this.$router.go(-1)
		},
		gotoLogin() {
			uni.navigateTo({
				url:"./login"
			})
		},
		getUserData() {
			getUserInfo().then(res => {
				this.user = res.data
			})
		},
		onPreviewImage(event) {
		    console.log(event)
			// this.url = this.user.avatar
			let imgArr = []
			imgArr.push(event);
				 uni.previewImage({
					  urls: imgArr,
				})
		},
		
	  }
	}
</script>

<style lang="less" scoped>
  @import '../../common/style/mixin';
  .login {
  	width: 100%;
  	height: 380rpx;
  	text-align: center;
  }
  .img-login {
  	margin-top: 80rpx;
  	width: 150rpx;
  	height: 150rpx;
  	border-radius: 75rpx;
  }
  .user-box {
    .user-header {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10000;
      .fj();
      .wh(100%, 44px);
      line-height: 44px;
      padding: 0 10px;
      .boxSizing();
      color: #252525;
      background: #fff;
      border-bottom: 1px solid #dcdcdc;
      .user-name {
        font-size: 14px;
      }
    }
    .user-info {
      border-radius: 6px;
      // margin-top: 68px;
      .info {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        padding: 20px 20px;
        align-items: center;
        justify-content: center;
        background-color: #C40000;
        .boxSizing();
        img {
          .wh(60px, 60px);
          border-radius: 50%;
          border: 1px solid #e9e9e9;
          margin-bottom: 12px;
        }
        .user-desc {
          display: flex;
          flex-direction: column;
          margin-left: 10px;
          line-height: 20px;
          font-size: 14px;
          align-items: center;
          span {
            font-size: 14px;
            margin: 2px 0;
            color: #fff;
            font-weight: 500;
          }
          .id {
            border-radius: 20px;
            padding: 2px 5px;
          }
        }
        .account-setting {
          position: absolute;
          top: 10px;
          right: 20px;
          font-size: 13px;
          color: #fff;
        }
      }
    }
  }
  .profile-photo {
  	width: 80px;
  	height: 80px;
  	border: 2px solid #ffffff;
  	border-radius: 50%;
  	margin-top: 8%;
  }
  .list-img {
  	width: 40px;
  	height: 40px;
  }
</style>
