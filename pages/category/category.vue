<template>
	<view>
		<view class="buju">
			<image src="../../static/categories/backtop.png" class="back" @click="goBack"></image>
			<view class="input" @click="gotoSearch">
				<image src="../../static/index/search.png" style="width: 45rpx; height: 45rpx; margin-left: 10%; margin-top: 10rpx;"/>
				<view style="color: #d1d1d1; margin-left: 0%; margin-top:0rpx;">全场50元起步</view>
			</view>
			<image src="../../static/categories/more.png" class="more"></image>
		</view>

		<div class="search-wrap" ref="searchWrap">
		    <list-scroll :scroll-data="categoryData" class="nav-side-wrapper">
		        <ul class="nav-side">
					<li
						v-for="item in categoryData"
						:key="item.categoryId"
						v-text="item.categoryName"
						:class="{'active' : currentIndex == item.categoryId}"
						@click="selectMenu(item.categoryId)"
					></li>
		        </ul>
		    </list-scroll>
			<div class="search-content">
				<list-scroll :scroll-data="categoryData" >
					<div class="swiper-container">
						<div class="swiper-wrapper">
							<template v-for="(category, index) in categoryData">
								<div class="swiper-slide" v-if="currentIndex == category.categoryId" :key="index">
								<!-- <img class="category-main-img" :src="category.mainImgUrl" v-if="category.mainImgUrl"/> -->
									<div class="category-list" v-for="(products, index) in category.secondLevelCategoryVOS" :key="index">
										<p class="catogory-title">{{products.categoryName}}</p>
										<div class="product-item" v-for="(product, index) in products.thirdLevelCategoryVOS" :key="index" @click="selectProduct(product)">
											<img src="https://pic--go.oss-cn-hangzhou.aliyuncs.com/img/good.png" class="product-img"/>
											<p v-text="product.categoryName" class="product-title"></p>
										</div>
									</div>
								</div>
							</template>
						</div>
					</div>
				</list-scroll>
			</div>
		</div>
	</view>
</template>

<script>
import { getCategory } from "../../api/good.js"
export default {
	data() {
		return {
			categoryData: [],
			currentIndex: 15,
		};
	},
	onShow() {
		this.getCategoryData()
	},
	methods: {
		setWrapHeight() {
		    // 设置视口高度
		    let $screenHeight = document.documentElement.clientHeight
		    this.$refs.searchWrap.style.height = $screenHeight - 100 + 'px'
		},
		selectMenu(index) {
		    this.currentIndex = index
		},
		selectProduct(item){
		    this.$router.push({ path: `product-list?categoryId=${item.categoryId}` })
		},
		goBack() {
			uni.switchTab({
				url:"../index/index"
			})
		},
		gotoSearch() {
			console.log("进入搜索页面")
			uni.navigateTo({
				url: '../index/product-list',
				success() {
					console.log("#####################")
				},
				fail(err) {
					console.log(err)
					console.log("错误****************************")
				}
			});
		
		},
		getCategoryData() {
			getCategory().then(res => {
				this.categoryData = res.data;
			})
		},
	}
};
</script>

<style lang="less" scoped>
@import '../../common/style/mixin.less';
.page-body {
	background: #fff;
	overflow: hidden;
}
.buju {
	position: fixed;
	flex-direction: column;
	top: 0;
	color: #fff;
	margin-top: 3%;
}
.input {
	display: flex;
	height: 30px;
	margin-bottom: 10px;
	width: 170%;
	border-radius:30px;
	background-color: #f6f6f6;
	margin-left: 100rpx;
	margin-top: -60rpx;
}
.back {
	width: 40rpx;
	height: 40rpx;
	margin-left: 30rpx;
}
.more {
	display: flex;
	width: 40rpx;
	height: 40rpx;
	margin-left: 205%;
	margin-top: -20%;
}
.search-wrap {
    .fj();
    width: 100%;
    margin-top: 40px;
    background: #F8F8F8;
    border-top: 1px solid #999;
    .nav-side-wrapper {
		display: fixed;
		margin-left: -80rpx;
		width: 48%;
		height: 100%;
		overflow: hidden;
		.nav-side {
			width: 100%;
			.boxSizing();
			background: #F8F8F8;
			li {
				width: 100%;
				height: 56px;
				text-align: center;
				line-height: 56px;
				font-size: 14px;
          &.active {
            color: @primary;
            background: #fff;
          }
        }
      }
    }
    .search-content {
      width: 72%;
      height: 100%;
      padding: 0 10px;
      background: #fff;
      .boxSizing();
      .swiper-container {
        width: 100%;
        .swiper-slide {
          width: 100%;
          .category-main-img {
            width: 100%;
          }
          .category-list {
            display: flex;
            flex-wrap: wrap;
            flex-shrink: 0;
            width: 100%;
            .catogory-title {
              width: 100%;
              font-size: 17px;
              font-weight: 500;
              padding: 20px 0;
            }
            .product-item {
              width: 33.3333%;
              margin-bottom: 10px;
              text-align: center;
              font-size: 15px;
              .product-img {
                .wh(30px, 30px);
              }
            }
          }
        }
      }
    }
  }
</style>

