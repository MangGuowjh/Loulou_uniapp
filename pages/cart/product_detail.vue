<template>
	<div class="product-detail">
		<s-header :title="'商品详情'"></s-header>
		<div class="detail-content">
			<div class="detail-swipe-wrap">
				<swiper class="my-swipe" indicator-color="#c40000">
					<swiper-item v-for="(item, index) in detail.goodsCarouselList" :key="index">
						<img :src="`//localhost:1314${item}`" alt="" style="width: 30%; height: 70%; margin-top: 44rpx;margin-left: 35%;">
					</swiper-item>
				</swiper>
			</div>
			<div class="product-info">
				<div class="product-title">
					{{ detail.goodsName }}
				</div>
				<div class="product-desc">免邮费 顺丰快递</div>
				<div class="product-price">
					<span>¥{{ detail.sellingPrice }}</span>
					<!-- <span>库存203</span> -->
				</div>
			</div>
			<div class="product-intro">
				<ul>
					<li>概述</li>
					<li>参数</li>
					<li>安装服务</li>
					<li>常见问题</li>
				</ul>
				<div class="product-content" v-html="detail.goodsDetailContent"></div>
			</div>
		</div>
		<view class="footer">
			<view class="kefu">
				<image src="../../static/bar/ac-user.png" class="user"></image>
				<text class="fu">客服</text>
			</view>
			<view class="guowu">
				<image src="../../static/bar/ac-cart.png" class="user"
					:id="!count ? '' : count" @click="goTo()"></image>
				<view class="wu">购物车</view>
			</view>
			<!-- <icon icon="chat-o" text="客服" /> -->
			<!-- <icon icon="cart-o" :info="!count ? '' : count" @click="goTo()" text="购物车"/> -->
			<button class="warning" @click="addCart">加入购物车</button>
			<button class="danger" @click="goToCart">立即购买</button>
		</view>
  </div>
</template>

<script>
import { getDetail } from '../../api/good.js'
import { addCart } from '../../api/cart.js'
import sHeader from '@/components/SimpleHeader'
export default {
	data() {
		return {
			detail: {
				goodsCarouselList: []
			}
		}
	},
	components: {
		sHeader
	},
	// async mounted() {
	// 	const { id } = this.$route.params
	// 	const { data } = await getDetail(id)
	// 	this.detail = data
	// },
	onShow() {
		this.addCart()
		this.goToCart()
		this.getDetailData()
	},
	onLoad(option) {
		console.log("aksdjsaljdlahdkh",option.goodsId)
	},
	methods: {
		goBack() {
			uni.navigateTo({
				url: "../index/index"
			})
		},
		goTo() {
			uni.switchTab({
				url: "./cart"
			})
			// this.$router.push({ path: '/cart' })
		},
		
		addCart() {
			let data = {
				goodsCount: 1,
				goodsId: this.detail.goodsId
			}
			addCart(data).then(res => {
				if (res.resultCode == 200) {
					uni.showToast({
						title: "添加成功",
						icon: "none"
					})
				}
				this.$store.dispatch('updateCart')
			})
		},
		goToCart() {
			let data = {
				goodsCount: 1,
				goodsId: this.detail.goodsId
			}
			addCart(data).then(res => {
				// console.log(res.data);
				this.$store.dispatch('updateCart')
				// this.$router.push({ path: 'pages/cart/cart' })
				// uni.switchTab({
				// 	url: "./cart"
				// })
			})
		},
		getDetailData(res) {
			let 
				// id=10893
				id=this.options.goodsId
				console.log('sjkdaki',id)
			getDetail(id).then(res => {
				// this.id = this.$router.params
				this.detail = res.data
				// this.detail = res.data
				console.log(detail)
			})
		},
	},
	
	computed: {
		count () {
		  return this.$store.state.cartCount
		}
	}
}
</script>

<style lang="less">
  @import '../../common/style/mixin';
  .footer {
	  position: fixed;
	  bottom: 0;
	  display: flex;
	  width: 100%;
	  height: 120rpx;
	  background-color: #FFFFFF;
  }
  .kefu {
	  display: flex;
	  margin-left: 45rpx;
	  margin-top: 15rpx;
  }
  .fu {
	  margin-left: -48rpx;
	  margin-top: 40rpx;
  }
  .guowu {
	  display: flex;
	  margin-left: 35rpx;
	  margin-top: 15rpx;
  }
  .wu {
	  margin-left: -60rpx;
	  margin-top: 40rpx;
  }
  .user {
  	height: 40rpx;
  	width: 40rpx;
  }
  .product-detail {
    .detail-header {
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
      .product-name {
        font-size: 14px;
      }
    }
    .detail-content {
      margin-top: 50rpx;
      .product-info {
        padding: 0 5px;
        .product-title {
          font-size: 18px;
          text-align: left;
          color: #333;
        }
        .product-desc {
          font-size: 14px;
          text-align: left;
          color: #999;
          padding: 5px 0;
        }
        .product-price {
          .fj();
          span:nth-child(1) {
            color: #F63515;
            font-size: 22px;
          }
          span:nth-child(2) {
            color: #999;
            font-size: 16px;
          }
        }
      }
      .product-intro {
        width: 100%;
        ul {
          .fj();
          width: 100%;
          margin: 5px 0;
		  margin-left: -88rpx;
          li {
            flex: 1;
            padding: 5px 0;
            text-align: center;
            font-size: 15px;
            border-right: 1px solid #999;
            box-sizing: border-box;
            &:last-child {
              border-right: none;
            }
          }
        }
        .product-content {
          
        }
      }
    }
    .warning {
		width: 250rpx;
		height: 95rpx;
		margin-top: 15rpx;
		background: linear-gradient(to right,#6bd8d8, @primary)
    }
    .danger {
		width: 250rpx;
		height: 95rpx;
		margin-top: 15rpx;
		background: linear-gradient(to right, #0dc3c3, #098888)
    }
  }
</style>
