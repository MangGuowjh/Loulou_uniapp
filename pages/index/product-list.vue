<template>
	<view>
		<view class="buju">
			<image src="../../static/categories/backtop.png" class="back" @click="goBack"></image>
			<view class="input">
				<image src="../../static/index/search.png" style="width: 55rpx; height: 45rpx; margin-left: 10%; margin-top: 10rpx;"/>
				<input type="text" 
					v-model="search"  
					confirm-type="search" 
					@confirm="getSearch" 
					placeholder="全场50元起步" 
					placeholder-style="font-size:30rpx;color:#d1d1d1;margin-left:10rpx;margin-top:10rpx;"/>
			</view>
			<text class="search-title">搜索</text>
		</view>	
		<!-- 横向选项卡（水平滚动导航栏） -->
		<view class="tab-container">
			<tabControl :current="current" :values="tabs" bgc="#fff" :fixed="true" :scrollFlag="true" :isEqually="false"
				@clickItem="onClickItem"></tabControl>
			<swiper class="swiper" style="height: 100%;" @change="scollSwiper" :current="current">
				<swiper-item v-for="(item, index) in tabs" :key="index">
					<scroll-view scroll-y="true" style="height: 100%;">{{ item }}</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 内容区 -->
		<view class="show">
			<view v-show="currentIndex === 0">
				<h2>关注</h2>
			</view>
			<view v-show="currentIndex === 1">
				<h2>推荐</h2>
			</view>
			<view v-show="currentIndex === 2">
				<h2>新品</h2>
			</view>
			<view v-show="currentIndex === 3">
				<h2>追番</h2>
			</view>
		</view>
		
	</view>
</template>

<script>
	import tabControl from '@/components/tabControl/tabControl.vue';
	export default {
		data() {
			return {
				tabs: ['关注', '推荐', '新品', '价格'],
				current: 1,
				currentIndex: 1,
				search:""
			}
		},
		components: {
			tabControl
		},
		methods: {
			goBack() {
				uni.switchTab({
					url:"../index/index"
				})
			},
			onClickItem(val) {
				this.current = val.currentIndex;
			},
			scollSwiper(e) {
				this.current = e.target.current;
				console.log(this.current)
				this.currentIndex = e.target.current;
			},//@confirm监听软键盘回车事件
			getSearch(){
				console.log(this.search)
				uni.showToast({
					title:"搜索成功",
					duration:2000
					// icon:"none"
                
				})
			}
		
		}
	}
</script>

<style>
.buju {
	display: flex;
	margin-top: 10%;
}
.input {
	display: flex;
	height: 30px;
	margin-bottom: 10px;
	width: 70%;
	border-radius:30px;
	background-color: #f6f6f6;
	margin-left: 40rpx;
	margin-right: 40rpx;
}
.back {
	width: 40rpx;
	height: 40rpx;
	margin-top: 13rpx;
	margin-left: 30rpx;
}
.search-title {
	display: flex;
	margin-right: 30rpx;
	width: 70rpx;
	height: 60rpx;
	background-color: #C40000;
	font-size: 28rpx;
	color: #FFFFFF;
	border-radius:10rpx;
	align-items: center;
	justify-content: center;
}
.show {
	margin-top: 5px;
	}
	.tab-container {
		width: 100%;
		margin-top: 78rpx;
		border-bottom: 1px solid #d1d1d1;
	}
</style>
