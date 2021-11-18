<template>
  <div class="order-box">
    <s-header :title="'我的订单'" :back="'/user'"></s-header>
    <!-- <van-tabs @change="onChangeTab" :color="'#c40000'" :title-active-color="'#c40000'" class="order-tab" v-model="status">
      <van-tab title="全部" name=''></van-tab>
      <van-tab title="待付款" name="0"></van-tab>
      <van-tab title="待确认" name="1"></van-tab>
      <van-tab title="待发货" name="2"></van-tab>
      <van-tab title="已发货" name="3"></van-tab>
      <van-tab title="交易完成" name="4"></van-tab>
    </van-tabs> -->
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
			<view v-model="refreshing" @refresh="onRefresh" class="order-list-refresh">
			  <view
			    v-model="loading"
			    :finished="finished"
			    finished-text="没有更多了"
			    @load="onLoad"
			    @offset="300"
			  >
			    <div v-for="(item, index) in list" :key="index" class="order-item-box" @click="goTo(item.orderNo)">
			      <div class="order-item-header">
			        <span>订单时间：{{ item.createTime }}</span>
			        <span>{{ item.orderStatusString }}</span>
			      </div>
			      <card
			        v-for="one in item.louMallOrderItemVOS"
			        :key="one.orderId"
			        :num="one.goodsCount"
			        :price="one.sellingPrice"
			        desc="全场包邮"
			        :title="one.goodsName"
			        :thumb="`http://lmall.xinfeng.site${one.goodsCoverImg}`"
			      />
			    </div>
			  </view>
			</view>
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
		<view v-show="currentIndex === 4">
			<h2>追番</h2>
		</view>
		<view v-show="currentIndex === 5">
			<h2>追番</h2>
		</view>
	</view>
<!--    <view v-model="refreshing" @refresh="onRefresh" class="order-list-refresh">
      <view
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        @offset="300"
      >
        <div v-for="(item, index) in list" :key="index" class="order-item-box" @click="goTo(item.orderNo)">
          <div class="order-item-header">
            <span>订单时间：{{ item.createTime }}</span>
            <span>{{ item.orderStatusString }}</span>
          </div>
          <card
            v-for="one in item.louMallOrderItemVOS"
            :key="one.orderId"
            :num="one.goodsCount"
            :price="one.sellingPrice"
            desc="全场包邮"
            :title="one.goodsName"
            :thumb="`http://lmall.xinfeng.site${one.goodsCoverImg}`"
          />
        </div>
      </view>
    </view> -->
  </div>
</template>

<script>
import tabControl from '@/components/tabControl/tabControl.vue'
import sHeader from '@/components/SimpleHeader'
import { getOrderList } from '../../../api/order.js'

export default {
  data() {
    return {
		tabs: ['全部', '待付款', '待确认', '代发货', '已发货', '交易完成'],
		current: 0,
		currentIndex: 0,
		loading: false,
		finished: false,
		refreshing: false,
		list: [],
		page: 1
    }
  },
  components: {
    sHeader,
	tabControl
  },
  onShow() {
  	this.loadData()
  },
  methods: {
	  loadData() {
		  let data = {
			  data: list
		  }
		  getOrderList(data).then(res => {
			  this.pageNumber = this.page,
			  this.current = this.current
			   this.list = this.list.concat(list)
			   this.loading = false;
			   if (this.page >= data.totalPage) this.finished = true
		  })
	  },
    goTo(id) {
      // this.$router.push({ path: `order-detail?id=${id}` })
	  uni.navigateTo({
	  	url: "order-detail?id="+id
	  })
    },
    goBack() {
      // this.$router.go(-1)
	  uni.navigateTo({
	  	url:"../cart"
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
    onLoad() {
      // 加载更多
      if (!this.refreshing && this.page < this.totalPage) {
        this.page = this.page + 1
      }
      if (this.refreshing) {
        this.list = [];
        this.refreshing = false;
      }
      this.loadData()
    },
    onRefresh() {
      this.refreshing = true
      this.finished = false
      this.loading = true
      this.page = 1
      this.onLoad()
    },
  }
}
</script>

<style lang="less" scoped>
  @import '../../../common/style/mixin';
  .show {
  	margin-top: 0px;
  	}
  	.tab-container {
		width: 100%;
  		margin-top: 248rpx;
  		border-bottom: 1px solid #d1d1d1;
  	}
  .order-box {
    .order-header {
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
      .order-name {
        font-size: 14px;
      }
    }
    .order-tab {
      margin-top: 44px;
      position: fixed;
      left: 0;
      z-index: 1000;
      width: 100%;
    }
    .order-list-refresh {
      margin-top: 68px;
      .van-card__content {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .van-pull-refresh__head {
        background: #f9f9f9;
      }
      .van-list {
        min-height: calc(100vh - 88px);
        background: #f9f9f9;
        margin-top: 20px;
      }
      .order-item-box {
        margin: 20px 10px;
        background-color: #fff;
        .order-item-header {
          padding: 10px 20px 0 20px;
          display: flex;
          justify-content: space-between;
        }
        .van-card {
          background-color: #fff;
          margin-top: 0;
        }
      }
    }
  }
</style>