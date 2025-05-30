<template>
	<view class="container">
		<view class="header" style="padding-top: calc(var(--status-bar-height) + 44px)">
			<custom-nav-bar-with-search :index="index" @picker-change="handleChange" @search="onSearchConfirm" />
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
					<my-icon type="more" color="#333333" size="30rpx"></my-icon>
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
					<my-icon type="more" color="#333333" size="30rpx"></my-icon>
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
					<!-- <uni-icons type="right" size="30rpx"></uni-icons> -->
					<my-icon type="more" color="#333333" size="30rpx"></my-icon>
					<!-- <text style="font-family: 'iconfont';">&#xe613;</text> -->
				</view>
			</view>
			<view class="list">
				<!-- 左侧大图 -->
				<view class="big-item" v-for="(item, index2) in scenicBigList" :key="index2" @click="jt(0)">
					<div class="overlay-text">{{ item.name }}</div>
					<image class="big-image" :src="item.image"></image>
					<div class="desc">{{ item.desc }}</div>
				</view>

				<!-- 右侧布局 -->
				<view class="right-side">
					<!-- 第一行：一个大图 -->
					<view class="small-item first-small" v-for="(item, index3) in scenicSmallList.slice(0, 1)"
						:key="index3" @click="jt(1)">
						<div class="overlay-text" style="font-size: 38rpx;">{{ item.name }}</div>
						<image class="first-image" :src="item.image"></image>
					</view>

					<!-- 第二行：两个小图 -->
					<view class="second-row">
						<view class="small-item" v-for="(item, index4) in scenicSmallList.slice(1, 3)" :key="index4"
							@click="jt(index4 + 2)">
							<div class="overlay-text">{{ item.name }}</div>
							<image class="second-image" :src="item.image"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <uni-popup ref="popup" type="center" :animation="true" @touchstart="closePopup">
			<view>
				<img src="/static/images/红包弹窗.png" class="hongbao" />
			</view>
			<view class="close-btn-modal" @click="closePopup">
				<uni-icons type="close" size="34" color="#fff" />
			</view>
		</uni-popup> -->
		<uni-popup ref="popup" type="center" :mask-click="false" :animation="true">
			<view class="hongbao-popup">
				<view class="hongbao-wrapper">
					<image class="hongbao-bg"
						src="https://north-ai-test-public1.oss-cn-beijing.aliyuncs.com/static/images/红包弹窗.png"
						mode="aspectFit" />

					<view class="hongbao-info">
						<view class="info-row">
							<view class="left-content">
								<text class="amount"><text class="symbol">¥</text>30</text>
								<text class="condition">满100元可使用</text>
							</view>
							<view class="divider"></view>
							<view class="right-content">
								<text class="valid-title">优惠券有效期至</text>
								<text class="valid-date">2025-07-08 23:59</text>
							</view>
						</view>
						<view class="coupon-button" @click.stop="useCoupon">立即领取</view>
					</view>
				</view>

				<view class="close-btn-modal" @click="closePopup">
					<uni-icons type="close" size="34" color="#fff" />
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="redpopup" type="center">
			<view class="popup-content">
				<text class="title">领取成功</text>
				<view>
					<image src="https://north-ai-test-public1.oss-cn-beijing.aliyuncs.com/static/user/red-envelope.svg"
						class="red-envelope"></image>
				</view>
				<view class="description">
					优惠券已发放至您的账户<br />
					可在“我的-我的优惠券”中查看
				</view>
				<view class="buttons">
					<button class="btn-know" @click="closePopup2">知道了</button>
					<button class="btn-check" @click="goToCoupons">去查看</button>
				</view>
			</view>
			<view class="close-btn-modal" @click="closePopup2">
				<uni-icons type="close" size="34" color="#fff" />
			</view>
		</uni-popup>
	</view>

</template>

<script>
import mockDATA from "@/utils/mock.js";
import myIcon from "@/components/myIcon.vue";

import CustomNavBarWithSearch from '@/components/CustomNavContent.vue';
export default {
	components: { myIcon, CustomNavBarWithSearch },
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
			swiperDotIndex: 0,
		};
	},
	computed: {
		contentMarginTop() {
			return this.statusBarHeight + 40
		},
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

	mounted() {
		//过五秒

		this.filterUnreceivedCoupons();


	},
	methods: {
		filterUnreceivedCoupons() {

			uni.getSystemInfo({
				success: (res) => {
					this.statusBarHeight = res.statusBarHeight;

					if (res.customBarHeight) {
						this.customBarHeight = res.customBarHeight;
					} else {
						this.customBarHeight = res.statusBarHeight + 44; // 默认导航栏高度
					}
				}
			});
			//判断当前红包是否被领取id: 19,
			this.$store.dispatch("loadReceivedRedEnvelopesFromCache");
			console.log(this.$store.getters.getReceivedRedEnvelopes);
			if (this.$store.getters.getReceivedRedEnvelopes.length > 0) {
				const reddata = this.$store.state.receivedRedEnvelopes.find(item => item.id === 19);
				if (!reddata) {
					setTimeout(() => {
						this.$refs.popup.open();
					}, 1000)
				}
			} else {
				setTimeout(() => {
					this.$refs.popup.open();
				}, 1000)
			}

		},
		openPopup2() {
			this.$refs.redpopup.open();
		},
		closePopup2() {
			// 重置标志位
			uni.setStorageSync("newReceivedCoupon", false);
			this.$refs.redpopup.close();
		},
		goToCoupons() {
			// 关闭弹窗
			this.closePopup2();
			uni.setStorageSync("newReceivedCoupon", false);
			uni.navigateTo({
				url: "/userpages/couponInfo/index",
			});
		},
		useCoupon() {

			const coupon = {
				amount: 30,
				expireTime: new Date().getTime() + 24 * 60 * 60 * 1000,
				expireTimes: true,
				id: 19,
				title: "满减活动优惠卷",
				minAmount: 100,
				isTodayExpired: false,
				expire: "23:59",
				validDate: "2025.07.08",
				rule: "1. 向商家付款下单使用；2. 不可与其他优惠同时使用；3. 有效期内使用有效。",
				showRule: false,
				isReceived: false, // 是否使用
				type: 1,
			};
			console.log(coupon);
			this.$store.dispatch("saveEnvelopeToCache", coupon);
			uni.setStorageSync('newReceivedCoupon', true);// 标记新领取了优惠券
			// 关闭弹窗
			this.closePopup();
			this.openPopup2();


		},
		navigateTohotel(item) {
			uni.navigateTo({
				url: `/izaolifepages/restaurantDetail/index?id=${item.id}&type=${3}`,
			});
		},
		jt(index) {
			uni.navigateTo({
				url: `/izaolifepages/restaurantDetail/jq?id=${index}`,
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
					return 'https://north-ai-test-public1.oss-cn-beijing.aliyuncs.com/static/images/ftop1.png';
				case 2:
					return 'https://north-ai-test-public1.oss-cn-beijing.aliyuncs.com/static/images/ftop2.png';
				default:
					return 'https://north-ai-test-public1.oss-cn-beijing.aliyuncs.com/static/images/ftop3.png';
			}
		},

		clickItem(index) {
			this.swiperDotIndex = index;
		},
		handleChange(e) {
			this.index = e.detail.value;
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
.hongbao-popup {
	position: relative;
	width: 650rpx;
	background-color: transparent;
}

.hongbao-wrapper {
	position: relative;
	width: 650rpx;
	height: 850rpx;
	overflow: hidden;
	border-radius: 16rpx;
}

.hongbao-bg {
	width: 650rpx;
	height: 850rpx;
	display: block;
	border-radius: 16rpx;
}

.hongbao-info {
	position: absolute;
	top: 75%;
	left: 51%;
	transform: translate(-50%, -50%);
	width: 77%;
	padding: 40rpx 20rpx;
	box-sizing: border-box;
	z-index: 2;
	// pointer-events: none;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.info-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	// margin-bottom: 30rpx;
	pointer-events: auto;
	transform: translatey(-20%);
}

.left-content,
.right-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 45%;
	text-align: center;
	margin-left: 2%;
}

.left-content {
	margin-bottom: 5%;
}

.right-content {
	margin-right: 2%;
	margin-top: 3%;
}

.amount {
	color: #F6402B;
	font-size: 80rpx;
	font-weight: bold;
	display: flex;
	align-items: center;
}

.symbol {
	font-size: 40rpx;
	margin-right: 10rpx;
}

.condition {
	color: #F6402B;
	font-size: 22rpx;
	margin-top: -10rpx;
	text-align: center;
	width: 100%;
}

.divider {
	width: 2rpx;
	height: 86rpx;
	background-color: #F4AF6B;
	margin: 0 10rpx;
}

.valid-title {
	color: #866141;
	font-size: 26rpx;
}

.valid-date {
	color: #866141;
	font-size: 22rpx;
	margin-top: 4rpx;
}

.coupon-button {
	background-image: linear-gradient(to bottom, #FCEAC8, #F8CBA0);
	color: #866141;
	border-radius: 40rpx;
	width: 60%;
	padding: 10rpx 0;
	// margin-top: 30rpx;
	font-size: 28rpx;
	text-align: center;
	z-index: 999;
}

.close-btn-modal {
	position: absolute;
	bottom: -90rpx;
	left: 50%;
	transform: translateX(-50%);

	width: 60rpx;
	height: 60rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	z-index: 3;
}

.popup-content {
	background-color: white;
	padding: 50rpx;
	border-radius: 30rpx;
	text-align: center;

	.title {
		font-size: 40rpx;
		color: red;
		margin-bottom: 20rpx;
		font-weight: bold;
		display: inline-block;
	}

	.red-envelope {
		width: 200rpx;
		height: 200rpx;
		margin-bottom: 20rpx;
	}

	.description {
		font-size: 28rpx;
		color: #666;
		margin-bottom: 30rpx;
	}

	.buttons {
		display: flex;
		justify-content: space-around;
		gap: 20rpx;
	}

	.btn-know,
	.btn-check {
		width: 200rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 40rpx;
		font-size: 32rpx;
	}

	.btn-know {
		border: 2rpx solid red;
		color: red;
		background-color: white;
	}

	.btn-check {
		background: linear-gradient(to bottom, #ff9100, #ff1b00);
		color: white;
	}
}

.container {
	background-color: #f5f5f5;
}

.header {
	width: 100%;
	max-height: 570rpx;
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
	position: relative;
	top: 20rpx;

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

.small-item .second-image {
	width: 100%;
	height: 134rpx;
	object-fit: cover;

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
	position: relative;
	top: 20rpx;
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
	font-weight: 400;
	display: block;
	text-align: left;
	margin-left: 35rpx;
}

.big-item .desc {
	bottom: 20rpx;
	font-weight: normal;
	display: block;
	top: 82rpx;
	text-align: left;
	font-size: 22rpx;
	padding: 10rpx 35rpx;
	width: 68%;
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

//888888
.small-item .overlay-text {
	position: absolute;
	top: 10px;
	left: 0;
	right: 0;
	color: #FFFFFF;
	font-weight: 400;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 28rpx;
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
</style>