<template>
	<view>
		<view class="bg" align="center">
			<image class="profile-photo" src="../../static/user/photo-null.png" @click=""></image>

			<view style="margin: 10px;color: #FFFFFF;">id:</view>
			<view style="color: #FFFFFF;">个性签名:</view>
		</view>
		<view>
			<uni-grid :column="2" :square="false">
				<uni-grid-item @change="goTo('order')">
					<view align="center" style="margin-top: 10%;margin-bottom: 10%;">
					<image src="../../static/user/my-list.png" class="list-img"></image>
					<view>我的订单</view>	
					</view>
				</uni-grid-item>
				<uni-grid-item @change="goTo('order')">
					<view align="center" style="margin-top: 10%;margin-bottom: 10%;">
					<image src="../../static/user/account-manage.png" class="list-img"></image>
					<view>账号管理</view>	
					</view>
				</uni-grid-item>
				<uni-grid-item @change="goTo('order')">
					<view align="center" style="margin-top: 10%;margin-bottom: 10%;">
					<image src="../../static/user/address-manage.png" class="list-img"></image>
					<view>地址管理</view>	
					</view>
				</uni-grid-item>
				<uni-grid-item @change="goTo('order')">
					<view align="center" style="margin-top: 10%;margin-bottom: 10%;">
					<image src="../../static/user/about-us.png" class="list-img"></image>
					<view>关于我们</view>	
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},

	methods: {
		
	}
};
</script>

<style>
.bg {
	width: 100%;
	height: 220px;
	background-color: #c40000;
	position: relative;
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
