<template>
	<view>
		<view class="home-header wrap" :class="{ active: headerScroll }">
			<!-- 点击搜索框跳转到分类页 -->
			<image @click="gotoCategory" src="../../static/index/more-line.png" style="width: 50rpx; height: 50rpx; margin-top: 20rpx;"></image>
				
			<!-- 搜索框 -->
			<view class="header-search" style="margin-top: -95rpx; margin-left: 70rpx;">
				<text class="app-name">楼楼商城</text>
				<image src="../../static/index/search.png" style="width: 55rpx; height: 55rpx;"></image>
				<text class="search-title" @click="gotoList">山河无恙，人间皆安</text>
			</view>
			<view style="margin-top: -88rpx;">
				<navigator class="login" target="text" url="../cart/cart" v-if="!isLogin">
					登录
				</navigator>
				<navigator class="login" tagget="text" url="../user/user" v-else>
					<!-- <icon name="manager-o" /> -->
				</navigator>
			</view>
		</view> 
		<!-- 轮播图 -->
		<swiper class="swiper" :autoplay="true" :interval="2000" :duration="500" :circular="true"
			indicator-dots="true" indicator-active-color="red" indicator-color="white">
			<swiper-item>
				<image class="img-swiper" src="../../static/index/01.jpg"></image>
			</swiper-item>
			<swiper-item>
				<image class="img-swiper" src="../../static/index/02.jpg"></image>
			</swiper-item>
			<swiper-item>
				<image class="img-swiper" src="../../static/index/03.jpg"></image>
			</swiper-item>
			<swiper-item>
				<image class="img-swiper" src="../../static/index/04.jpg"></image>
			</swiper-item>
		</swiper>
		<!-- 展示图片 -->
		<view class="image-view1">
			<view>
				<image class="img-small" src="../../static/index/jiaoyou.png">
					<h2 class="reduce">楼楼交友</h2>
				</image>
			</view>
			<view>
				<image class="img-small" src="../../static/index/jiazheng.png">
					<h2 class="reduce">楼楼家政</h2>
				</image>
			</view>
			<view>
				<image class="img-small" src="../../static/index/shuichan1.png">
					<h2 class="reduce">楼楼水产</h2>
				</image>
			</view>
			<view>
				<image class="img-small" src="../../static/index/zuche.png">
					<h2 class="reduce">楼楼租车</h2>
				</image>
			</view>
			<view>
				<image class="img-small" src="../../static/index/pin.png">
					<h2 class="reduce">楼楼招聘</h2>
				</image>
			</view>
		</view>
		<view class="image-view2">
			<view>
				<image class="img-small" src="../../static/index/ershou.png">
					<h2 class="reduce">楼楼二手</h2>
				</image>
			</view>
			<view>
				<image class="img-small" src="../../static/index/chongwu.png">
					<h2 class="reduce">楼楼宠物</h2>
				</image>
			</view>
			<view>
				<image class="img-small" src="../../static/index/wm.png">
					<h2 class="reduce">楼楼外卖</h2>
				</image>
			</view>
			<view>
				<image class="img-small" src="../../static/index/dianqi.png">
					<h2 class="reduce">楼楼电器</h2>
				</image>
			</view>
			<view>
				<image class="img-small" src="../../static/index/czcz.png">
					<h2 class="reduce">楼楼充值</h2>
				</image>
			</view>
		</view>
		<view class="good">
		    <header class="good-header">新品上线</header>
		    <view class="good-box">
		        <view class="good-item" v-for="item in newGoodses" :key="item.goodsId" @click="goToDetail(item)">
		            <img :src="`//lmall.xinfeng.site${item.goodsCoverImg}`" />
		            <view class="good-info">
		                <p class="name">{{item.goodsName}}</p>
		                <p class="subtitle">{{item.goodsIntro}}</p>
		                <span class="price">￥ {{item.sellingPrice}}</span>
		            </view>
		        </view>
		    </view>
		</view>
		<view class="good">
		    <header class="good-header">热门商品</header>
		    <view class="good-box">
		      <view class="good-item" v-for="item in hots" :key="item.goodsId" @click="goToDetail(item)">
		        <img :src="`//lmall.xinfeng.site${item.goodsCoverImg}`" />
		        <view class="good-info">
		          <p class="name">{{item.goodsName}}</p>
		          <p class="subtitle">{{item.goodsIntro}}</p>
		          <span class="price">￥ {{item.sellingPrice}}</span>
		        </view>
		      </view>
		    </view>
		</view>
		<view class="good" :style="{ paddingBottom: '100px'}">
		    <header class="good-header">最新推荐</header>
		    <view class="good-box">
		      <view class="good-item" v-for="item in recommends" :key="item.goodsId" @click="goToDetail(item)">
		        <img :src="`//lmall.xinfeng.site${item.goodsCoverImg}`" />
		        <view class="good-info">
		          <p class="name">{{item.goodsName}}</p>
		          <p class="subtitle">{{item.goodsIntro}}</p>
		          <span class="price">￥ {{item.sellingPrice}}</span>
		        </view>
		      </view>
		      <div class="good-item" v-for="item in recommends" :key="item.goodsId" @click="goToDetail(item)">
		        <img :src="`//lmall.xinfeng.site${item.goodsCoverImg}`" alt="">
		        <div class="good-desc">
		          <div class="title">{{ item.goodsName }}</div>
		          <div class="price">¥ {{ item.sellingPrice }}</div>
		        </div>
		      </div>
		    </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLogin: false,
				headerScroll: false,
				hots: [],
				newGoodses: [],
				recommends: [],
			}
		},
		onLoad() {

		},
		methods: {
			gotoCategory() {
				uni.switchTab({
					url:"../category/category"
				})
			},
			gotoList() {
				uni.navigateTo({
					url:"./product-list"
				})
			}
		}
	}
</script>

<style lang="less" scoped>
@import '../../common/style/mixin';
.home-header {
    position: fixed;
    left: 0;
    top: 0;
    line-height: 50px;
    padding: 0 15px;
    font-size: 15px;
    color: #fff;
    z-index: 10000;
	margin-top: 60rpx;
}
.header-search {
    display: flex;
    line-height: 20px;
    padding: 3px 0;
    color: #232326;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 20px;
}
.app-name {
    padding: 2px 15px;
    color:  #c40000;
    font-size: 20px;
    font-weight: bold;
    border-right: 1px solid #666;
}
.search-title {
    font-size: 12px;
    color: #666;
    line-height: 29px;
}
.login {
    color:  #c40000;
	margin-left: 620rpx;
}
.van-icon-manager-o {
    font-size: 20px;
    vertical-align: -3px;
}
.img {
	height: 90rpx;
	width:90rpx;
	margin: 47rpx;
}
.text {
	margin-left: -120rpx;
}
.swiper {
	margin-left: 15rpx;
	border-radius: 10rpx;
	margin-top: 160rpx;
	height: 300rpx;
	width: 95%;
}
.img-swiper {
	width: 100%;
	height: 300rpx;
	align-items: center;
	border-radius: 10rpx
}
.image-view1 {
	margin-top: 20rpx;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-around;
	align-items: flex-start;
}
.image-view2 {
	margin-top: 30rpx;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-around;
	align-items: flex-start;
}
.img-small {
	height: 100rpx;
	width: 100rpx;
}
.reduce {
	font-size: 24rpx;
	align-items: center;
	display: flex;
	flex-direction: column;
	margin-bottom: 20rpx;
}
.good {
    .good-header {
      background: #f9f9f9;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: @primary;
      font-size: 16px;
      font-weight: 500;
    }
    .good-box {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .good-item {
          .fj();
          width: 100%;
          height: 120px;
          padding: 10px 0;
          border-bottom: 1px solid #dcdcdc;
          img {
            width: 140px;
            height: 120px;
            padding: 0 10px;
            .boxSizing();
          }
        .good-info {
            width: 56%;
            height: 120px;
            padding: 5px;
            text-align: left;
            .boxSizing();
            p {
              margin: 0
            }
            .name {
              width: 100%;
              max-height: 40px;
              line-height: 20px;
              font-size: 15px;
              color: #333;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
            .subtitle {
              width: 100%;
              max-height: 20px;
              padding: 10px 0;
              line-height: 25px;
              font-size: 13px;
              color: #999;
              overflow: hidden;
            }
            .price {
              color: @primary;
              font-size: 16px;
            }
        }
      }
    }
  }
  .floor-list {
      width: 100%;
      padding-bottom: 50px;
      .floor-head {
        width: 100%;
        height: 40px;
        background: #F6F6F6;
      }
      .floor-content {
        display: flex;
        flex-shrink: 0;
        flex-wrap: wrap;
        width: 100%;
        .boxSizing();
        .floor-category {
          width: 50%;
          padding: 10px;
          border-right: 1px solid #dcdcdc;
          border-bottom: 1px solid #dcdcdc;
          .boxSizing();
          &:nth-child(2n) {
            border-right: none;
          }
          p {
            font-size: 17px;
            color: #333;
            &:nth-child(2) {
              padding: 5px 0;
              font-size: 13px;
              color: @primary;
            }
          }
          .floor-products {
            .fj();
            width: 100%;
            img {
              .wh(65px, 65px);
            }
          }
      }
    }
  }
</style>
