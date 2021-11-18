<template>
	<view>
		<s-header :name="'购物车'"></s-header>
		<view class="empty" v-if="!list.length">
			<image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F01%2F82%2F40%2F596fa6dc00bb4_610.jpg&refer=http%3A%2F%2Fpic.51yuansu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1633499781&t=d37222e32213957ddbdd01d62e071309" mode="widthFix" style="width: 400rpx;margin-top: 300rpx;margin-left: 180rpx;"></image>
			<view v-if="!loginStatus" class="empty-tips">
				空空如也
				<navigator class="navigator" url="../index/index" open-type="switchTab">随便逛逛></navigator>
			</view>
			<view v-else class="empty-tips">
				空空如也
				<view class="navigator" @click="navToLogin">去登陆></view>
			</view>
		</view>
		<view class="card-body">
			<checkbox-group @change="groupChange" v-model="result">
				<view class="swipe" v-for="(item, index) in list" :key="index">
					<view class="good-item">
						<checkbox :checked="checked" :value="item.cartItemId"></checkbox>
						<view class="good-img">
							<img :src="`//localhost:1314${item.goodsCoverImg}`" alt="">
						</view>
						<view class="good-desc">
							<view class="good-title">
								<text>{{ item.goodsName }}</text>
								<text>x{{ item.goodsCount }}</text>
							</view>
							<view class="good-btn">
								<view class="price">¥{{ item.sellingPrice }}</view>
								<view class="detail-right">
									<text class="subtract" @click="reduce(item)">-</text>
									<text class="num">{{ item.goodsCount }}</text>
									<text @click="add(item)" class="add">+</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</checkbox-group>
			<view class="end" v-if="list.length > 0">
				<view class="end-left">
					<checkbox-group @change="selectgoods">
						<label>
							<checkbox @click="allCheck" v-model="checkAll">全选</checkbox>
						</label>
					</checkbox-group>
					<view>
						总计：<text style="color: #f00;font-weight: bold;">￥ {{total}}</text>
					</view>
				</view>
				<view class="end-right" @click="onSumbit">
					结算
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import sHeader from '@/components/SimpleHeader'
import { getCart, getCartPage, deleteCartItem } from '../../api/cart.js'
export default {
	components: {
		sHeader
	},
	data() {
		return {
			show: true,
			// allchecked:true,
			checked:false,
			list: [],
			result: [],
			checkAll: true
		}
	},
	onShow() {
		this.getCartData()
		this.deleteGood()
		console.log(this.loginStatus)
	},
	methods: {
		deleteGood() {
			deleteCartItem().then(res => {
				this.$store.dispatch('updateCart')
				this.getCartData()
			})
		},
		getCartData() {
			getCartPage().then(res => {
				this.list = res.data.list
				console.log(res.data.list)
			})
		},
		onSumbit() {
			const params = JSON.stringify(this.result)
			uni.navigateTo({
				url: "./order/create_order?cartItemIds=${params}"
			})
		},
		navToLogin(){
			uni.navigateTo({
				url: '../user/login'
			})
		},
		groupChange(result) {
		    if (result.length == this.list.length) {
		        this.checkAll = true
		    } else {
		        this.checkAll = false
		    }
		    this.result = result
		},
		allCheck(value) {
		    console.log('this.checkAll', this.checkAll)
		    if (this.checkAll) {
		        this.result = this.list.map(item => item.cartItemId)
		    } else {
		        this.result = []
		    }
		}
	},
	computed: {
	    total: function() {
			let sum = 0
			let dlist = this.list.filter(item => this.result.includes(item.cartItemId))
			dlist.forEach(item => {
				sum += item.goodsCount * item.sellingPrice
			})
	      return sum
	    },
		...mapState({
			loginStatus: state => state.loginStatus,
			token: state => state.a
		})
	},
}
</script>

<style lang="less" scoped>
@import '../../common/style/mixin';
	.empty-tips{
		align-items: center;
		justify-content: center;
		display:flex;
		font-size: 32rpx;
		color: #C40000;
		.navigator{
			color: #007AFF;
			margin-left: 16upx;
		}
	}
	.detail-right{
	    text{
	        width: 50rpx;
	        line-height: 50rpx;
	        text-align: center;
	        display: inline-block;
	        background-color: #F7F7F7;
	        margin-right: 10rpx;
	    }
	    .add {
	        color: #FA4305;
	        border-radius: 10rpx 30rpx 30rpx 10rpx;
	        margin-right: 20rpx;
	    }
	    .subtract{
	        border-radius: 30rpx 10rpx 10rpx 30rpx;
	    }
	}
	.end{
	    width: 100%;
	    height: 90rpx;
	    background-color:#fff;
	    position: fixed;
	    bottom: 100rpx;
	    left: 0;
	    display: flex;
	    align-items: center;
	    &-left{
	        width: 70%;
	        display: flex;
	        justify-content: space-between;
	        padding: 0 30rpx;
	        .end-flex{
	            display: flex;
	            align-items: center;
	        }
	    }
	    &-right{
	        width: 30%;
	        line-height: 90rpx;
	        background-color: #F44545;
	        text-align: center;
	        color: #fff;
	    }
	}
	.card-body {
		display: flex;
		margin: 60px 0 100px 0;
		padding-left: 10px;
		// margin-top: 150rpx;
	}
	.swipe {
		display: flex;
		height: 240rpx;
	}
	.good-item {
		display: flex;
		justify-content: center;
		align-items: center;
		.good-img {
		    img {
		        .wh(100px, 100px)
		    }
		}
	}
	.good-desc {
	    display: flex;
	    flex-direction: column;
	    // justify-content: space-between;
	    flex: 1;
	    padding: 20px;
	    .good-title {
	        display: flex;
	        // justify-content: space-between;
	    }
	    .good-btn {
	        display: flex;
			// margin-left: 100rpx;
	        // justify-content: space-between;
			// align-items: right;
	        .price {
	            font-size: 16px;
	            color: red;
	            line-height: 28px;
				width: 50rpx;
	        }
			.detail-right {
				display: flex;
				// left: 1;
				margin-left: 160rpx;
			}
	    }
	}
</style>