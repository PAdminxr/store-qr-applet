<template>
	<view class="container">
		<view class="header" :style="{ paddingTop: statusBarHeight + 'rpx' }">
			<!-- 顶部导航栏 -->
			<view class="bar-container">
				<view class="search-bar-container">
					<uni-icons type="location-filled" size="40rpx"></uni-icons>

					<picker @change="bindPickerChange" :value="index" :range="array">
						<view class="uni-input">{{ array[index] }}</view>
					</picker>
					<uni-icons type="down" size="36rpx"></uni-icons>
				</view>
				<view class="search-bar" @click="onSearchConfirm">
					<uni-search-bar placeholder="枣庄辣子鸡" clearButton="none" cancelButton="none"
						:readonly="true"></uni-search-bar>
				</view>
			</view>

			<!-- 功能图标区 -->
			<view class="function">
				<view class="function-icons" v-if="pages.length > 1">
					<uni-swiper-dot class="photo-swiper" :info="pages" @clickItem="clickItem" :dots-styles="dotsStyles"
						:mode="'round'" :current="swiperDotIndex">
						<swiper :current="swiperDotIndex" @change="changeSwiper" :circular="true" class="swiper-box">
							<swiper-item v-for="(page, pageIndex) in pages" :key="pageIndex">
								<uni-grid :column="4" :highlight="true" :showBorder="false">
									<uni-grid-item v-for="(item, index) in page" :key="index" :index="index">
										<view class="grid-item-box" @click="goToDetail(item)">
											<image :src="item.icon" class="image" mode="aspectFill" />
											<text class="text">{{ item.name }}</text>
										</view>
									</uni-grid-item>
								</uni-grid>
							</swiper-item>
						</swiper>
					</uni-swiper-dot>
				</view>
				<view class="function-icons" v-else>
					<uni-grid :column="4" :highlight="true" :showBorder="false">
						<uni-grid-item v-for="(item, index) in functionList" :key="index" :index="index">
							<view class="grid-item-box" @click="goToDetail(item)">
								<image :src="item.icon" class="image" mode="aspectFill" />
								<text class="text">{{ item.name }}</text>
							</view>
						</uni-grid-item>
					</uni-grid>
				</view>
			</view>
		</view>
		<!-- i必吃榜 -->
		<view class="must-eat">
			<view class="title">
				<text class="titletext">i必吃榜</text>
				<view class="more" @click="goToMore('/izaolifepages/foodGuide/index')">更多
					<uni-icons type="right" size="30rpx"></uni-icons>
				</view>
			</view>
			<view class="list">
				<view class="item" v-for="(food, index) in mustEatList" :key="index" @click="navigateTo()">
					<view class="img-container" @click="navigateTofood(food)">
						<image :src="food.image" class="food-image"></image>
						<image :src="getTopImage(food.top)" mode="aspectFit" class="top-tagimage"></image>
						<view class="overlay-text">
							<text class="food-name">{{ food.name }}</text>
							<text class="food-desc">{{ food.desc }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 酒店民宿 -->
		<view class="hotel">
			<view class="title">
				<text class="titletext">酒店民宿</text>
				<view class="more" @click="goToMore('/izaolifepages/hotelAndHome/index')">更多
					<uni-icons type="right" size="30rpx"></uni-icons>
				</view>
			</view>
			<view class="list">

				<view class="item" v-for="(hotel, index) in hotelList" :key="index">
					<view class="img-container" @click="navigateTohotel(hotel)">
						<image :src="hotel.image" class="hotel-image"></image>

						<view class="overlay-text">
							<view class=" hotel-address">
								<uni-icons type="location" size="10" color="white"></uni-icons>
								<text> {{
									hotel.location }}</text>
							</view>

						</view>
					</view>
					<text class="hotel-name">{{ hotel.name }}</text>
				</view>
			</view>
		</view>

		<!-- 景区出行 -->
		<view class="scenic">
			<view class="title">
				<text class="titletext">景区出行</text>

				<view class="more" @click="goToMore('/izaolifepages/scenicTravel/index')">更多
					<uni-icons type="right" size="30rpx"></uni-icons>
				</view>
			</view>
			<view class="list">
				<!-- 左侧大图 -->
				<view class="big-item" v-for="(item, index2) in scenicBigList" :key="index2">
					<div class="overlay-text">{{ item.name }}</div>
					<image class="big-image" :src="item.image"></image>
					<div class="desc">{{ item.desc }}</div>
				</view>

				<!-- 右侧布局 -->
				<view class="right-side">
					<!-- 第一行：一个大图 -->
					<view class="small-item first-small" v-for="(item, index3) in scenicSmallList.slice(0, 1)"
						:key="index3">
						<div class="overlay-text" style="font-size: 40rpx;">{{ item.name }}</div>
						<image class="first-image" :src="item.image"></image>
					</view>

					<!-- 第二行：两个小图 -->
					<view class="second-row">
						<view class="small-item" v-for="(item, index4) in scenicSmallList.slice(1, 3)" :key="index4">
							<div class="overlay-text">{{ item.name }}</div>
							<image class="second-image" :src="item.image"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="center" :animation="true" @touchstart="closePopup">
			<img src="https://cdn.jsdelivr.net/gh/PAdminxr/store-qr-applet@main/static/izaolife/红包弹窗.png"
				class="hongbao" />
		</uni-popup>
	</view>

</template>

<script>
import mockDATA from "@/utils/mock.js";
export default {
	data() {
		return {
			dotsStyles: {
				backgroundColor: '#E5E5E5',
				border: '#E5E5E5',
				color: '#000000',
				selectedBackgroundColor: '#FEA518',
				selectedBorder: '#FEA518'
			},
			array: mockDATA.zixunArray,
			index: 0,
			statusBarHeight: 0,
			time: "9:41",
			functionList: mockDATA.functionList,
			mustEatList: mockDATA.mustEatList,
			hotelList: mockDATA.hotelList,
			scenicBigList: mockDATA.scenicBigList,
			scenicSmallList: mockDATA.scenicSmallList,
			swiperDotIndex: 0
		};
	},
	computed: {
		// 将 functionList 分成每页 8 项
		pages() {
			const pageSize = 8;
			const result = [];
			for (let i = 0; i < this.functionList.length; i += pageSize) {
				result.push(this.functionList.slice(i, i + pageSize));
			}
			return result;
		},
		// 判断是否需要显示轮播图（即是否有超过一页的内容）
		shouldShowCarousel() {
			return this.pages.length > 1;
		},
		// 判断是否需要显示指示点
		showDots() {
			return this.functionList.length > 8;
		}
	},
	onLoad() {
		uni.getSystemInfo({
			success: (res) => {
				this.statusBarHeight = res.statusBarHeight - 8;
			},
		});

	},
	mounted() {
		//过五秒
		setTimeout(() => {
			// this.$refs.popup.open();
		}, 1000)
	},
	methods: {
		navigateTohotel(item) {
			uni.navigateTo({
				url: `/izaolifepages/restaurantDetail/index?id=${item.id}&type=${3}`,
			});
		},
		navigateTofood(food) {
			uni.navigateTo({
				url: `/izaolifepages/foodGuide/detail?id=${food.id}`,
			});

		},
		navigateTo() {
			// uni.navigateTo({
			// 	url: "/izaolifepages/restaurantDetail/index",
			// });
		},
		closePopup() {
			this.$refs.popup.close();
		},
		getTopImage(top) {
			switch (top) {
				case 1:
					return '/static/images/ftop1.png';
				case 2:
					return '/static/images/ftop2.png';
				default:
					return '/static/images/ftop3.png';
			}
		},

		clickItem(index) {
			this.swiperDotIndex = index;
		},
		changeSwiper(e) {
			this.swiperDotIndex = e.detail.current; // 更新当前索引
		},
		goToDetail(item) {

			uni.navigateTo({
				url: item.path
			});

		},
		change(e) {
			console.log('当前选中:', e.detail);
		},
		onSearchConfirm() {
			console.log("搜索确认");
			uni.navigateTo({
				url: "/izaolifepages/searchPage/index",
			});
		},
		goToMore(url) {
			uni.navigateTo({
				url: url
			})
		},
		goToPage(page) {
			// 这里可以实现跳转到对应页面的逻辑，比如使用uni.navigateTo等
			console.log(`前往${page}页面`);
		},
	},
};
</script>

<style lang="scss" scoped>
.container {
	background-color: #f5f5f5;
}

.header {
	width: 100%;
	height: 520rpx;
	background: linear-gradient(to bottom,
			#fe9318,
			#ffd298 50%,
			rgba(254, 147, 24, 0) 100%);

	.zixun {
		font-size: 48rpx;
		color: #000000;
		font-weight: 600;
	}

	.bar-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		padding-top: 40rpx;
		// gap: 20rpx;
		margin: 0rpx 30rpx;
	}

	.search-bar-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		gap: 0rpx;
		padding-top: 10rpx;
	}

	@media (max-width: 350px) {
		.search-bar {
			width: 43%;
		}

		::v-deep .uni-searchbar__text-placeholder {
			font-size: 22rpx;

		}
	}

	@media (min-width: 350px) and(max-width: 380px) {
		.search-bar {
			width: 46%;
		}


	}

	@media (min-width: 380px) and(max-width: 450px) {
		.search-bar {
			width: 51%;
		}


	}

	@media (min-width: 600px) and (max-width: 1024px) {
		.search-bar {
			width: 57%;
		}
	}

	@media (min-width: 1024px) {
		.search-bar {
			width: 60%;
		}

	}
}



.function {
	width: 100%;
	position: relative;
	top: 20rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.function-icons {
	width: 92%;
	border-radius: 20rpx;
	background-color: white;
}

.photo-swiper {
	height: auto;
	min-height: 320rpx;
}

.swiper-box {
	height: 100%;
}

.grid-item-box {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 20rpx 0;
}

.image {
	width: 80rpx;
	height: 80rpx;
	border-radius: 16rpx;
	margin-bottom: 10rpx;
}

.text {
	font-size: 24rpx;
	color: #333;
	text-align: center;
	line-height: 1.5;
}

.icon-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 20%;
	margin-bottom: 30rpx;
}

.icon-item image {
	width: 100rpx;
	height: 100rpx;
}

.must-eat,
.hotel {
	padding: 34rpx 16rpx 0rpx 16rpx;
}

.title {
	display: flex;
	justify-content: space-between;
	align-items: center;

	margin: 0rpx 30rpx 30rpx 30rpx;
}

.titletext {
	font-size: 36rpx;
	font-weight: bold;
}

.more {
	color: #333333;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	font-size: 26rpx;
}

.list {
	display: flex;
	flex-wrap: wrap;
	gap: 30rpx;
	padding: 0 20rpx;
}

.item {
	width: calc(33.3% - 26rpx);
	position: relative;
}

.img-container {
	position: relative;
	width: 100%;
	padding-top: 100%;


}

.hongbao {
	width: 700rpx;
	height: 840rpx;
}

.food-image,
.hotel-image {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
	border-radius: 20rpx;

}

.hotel-image {
	border-bottom-left-radius: 0px !important;
	border-bottom-right-radius: 0px !important;
}

.top-tagimage {
	position: absolute;
	top: -12rpx;

	right: 0rpx;
	width: 56rpx;
	height: 67rpx;
	z-index: 10;
	/* 确保层级最高 */
}

.overlay-text {
	position: absolute;
	bottom: 20rpx;
	left: 0;
	right: 0;
	text-align: center;
	color: #FFFFFF;
	z-index: 9;

}

.hotel .overlay-text {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.hotel-address {
	font-size: 20rpx;
	background-color: rgba(70, 69, 69, 0.7);
	border-radius: 20rpx;
	display: flex;
	width: 85%;
	padding: 5rpx 0rpx 5rpx 20rpx;
	gap: 10rpx;
	align-items: center;
	justify-content: flex-start;
}

.hotel-address text {
	font-size: 16rpx;
}

.hotel-name {
	font-size: 26rpx;
	font-weight: 500;
	padding: 10rpx 0px 20rpx 32rpx;

	display: block;
}

.food-name {
	font-weight: 400;
	display: block;
	margin-bottom: 8rpx;
	font-size: 24rpx;
	font-weight: 600;
}

.food-desc {
	font-weight: normal;
	display: block;
	line-height: 1.2;
	font-size: 16rpx;
}



.hotel .list {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
}

.hotel .item {
	width: 30%;
	margin-bottom: 15px;
	background-color: white;
	overflow: hidden;
}

.hotel .item image {
	width: 100%;
}

.hotel .info {
	padding: 10px;
}

.location-tag {
	display: flex;
	align-items: center;
	margin-bottom: 10rpx;
}

.location-tag image {
	width: 30rpx;
	height: 30rpx;
	margin-right: 10rpx;
}

.scenic {

	padding: 0rpx 16rpx 16rpx 16rpx;
}

.scenic .list {
	display: flex;
	justify-content: space-between;
	gap: 0rpx !important;
	padding: 0 20rpx;
}

/* 左侧大图 */
.big-item {
	width: 48%;
	position: relative;
}

.big-item .big-image {
	width: 100%;
	height: 320rpx;
	object-fit: cover;

}

.big-item .overlay-text,
.big-item .desc {
	position: absolute;
	left: 0;
	right: 0;
	color: #FFFFFF;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
}

.big-item .overlay-text {
	top: 30rpx;
	font-size: 42rpx;
	font-weight: 600;
	display: block;
}

.big-item .desc {
	bottom: 20rpx;
	font-weight: normal;
	display: block;
	top: 82rpx;
	text-align: left;
	font-size: 22rpx;
	padding: 20rpx;
}

/* 右侧布局 */
.right-side {
	width: 48%;

	display: flex;
	flex-direction: column;
}

.first-small {
	width: 100%;
	margin-bottom: 10px;

	position: relative;
}

.first-small .first-image {
	width: 100%;
	height: 148rpx;

	object-fit: cover;
}

.first-small .overlay-text {
	position: absolute;
	top: 10px;
	left: 0;
	right: 0;
	color: #FFFFFF;
	font-weight: 300;
	display: flex;
	align-items: center;
	justify-content: center;
}

.second-row {
	display: flex;
	justify-content: space-between;
	gap: 20rpx;
}

.small-item {
	width: 100%;
	position: relative;
}

.small-item .second-image {
	width: 100%;
	height: 134rpx;
	object-fit: cover;

}

.small-item .overlay-text {
	position: absolute;
	top: 10px;
	left: 0;
	right: 0;
	color: #FFFFFF;
	font-weight: bold;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 32rpx;
}

::v-deep .uni-searchbar {
	padding: 10px 0px 10px 10px !important;
}

::v-deep .uni-input {
	font-size: 28rpx !important;
}

::v-deep .uni-stat__actived {
	padding-left: 6rpx;
}

::v-deep .uni-searchbar__box {
	border-radius: 40rpx !important;
	background-color: #ffffff !important;
	border: none !important;
	font-size: 22rpx;
	height: 60rpx;
}

::v-deep .uni-swiper__warp {
	height: 370rpx !important;
}

::v-deep .uni-searchbar__text-placeholder {
	font-size: 28rpx !important;
}
</style>