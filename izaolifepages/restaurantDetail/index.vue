<template>
    <view class="page-container">
        <!-- 顶部导航图标 -->
        <view class="top-nav-icons" ref="topNavIcons"
            :style="{ top: safeAreaTop + 'px', right: capsuleRight + 'px', width: navWidth + 'px' }">
            <view class="nav-left" @click="goBack">
                <uni-icons type="left" size="24" color="#FFFFFF"></uni-icons>
            </view>
            <view class="nav-right">
                <view class="nav-icon" @click="toggleFavorite">
                    <uni-icons :type="restaurantInfo.isFavorite ? 'star-filled' : 'star'" size="48rpx"
                        :color="restaurantInfo.isFavorite ? '#f1c40f' : '#FFFFFF'"></uni-icons>
                </view>
            </view>
        </view>

        <!-- 轮播图 -->
        <view class="banner-container">
            <swiper class="banner-swiper" :indicator-dots="false" :autoplay="false" :interval="5000" :duration="500"
                @change="handleSwiperChange">
                <swiper-item v-for="(img, index) in bannerImgs" :key="index">
                    <image class="banner-image" :src="img"></image>
                </swiper-item>
            </swiper>
            <view class="banner-index">
                <image src="https://north-ai-test-public1.oss-cn-beijing.aliyuncs.com/static/izaolife/image.png"
                    class="banner-index-image">
                </image>
                {{ currentIndex + 1 }}/{{ bannerImgs.length }}
            </view>
        </view>

        <!-- 餐厅信息卡片 -->
        <view class="restaurant-card">
            <view class="card-header">
                <view class="restaurant-name">{{ restaurantInfo.name }}</view>
                <view class="restaurant-tags">
                    <img src="https://north-ai-test-public1.oss-cn-beijing.aliyuncs.com/static/izaolife/tuijian.png"
                        class="recommend-icon" />
                </view>
            </view>

            <view class="card-info">
                <view class="info-row">
                    <view class="info-item">
                        <view class="info-text">
                            <text v-if="restaurantInfo.isOpen" class="status">营业中</text>
                            <text v-else class="status" style="color: #adadad">休息中</text>
                            <text class="hours">{{ restaurantInfo.businessHours }}</text>
                        </view>
                    </view>
                </view>

                <view class="info-row flex-between location-row">
                    <view class="location-info">
                        <view class="address-text">{{ restaurantInfo.addressOwner }}</view>
                        <view class="distance-text">{{
                            restaurantInfo.distanceOwner
                            }}</view>
                    </view>
                    <view class="actions-group">
                        <view class="action-item" @click="navigate">
                            <img src="https://north-ai-test-public1.oss-cn-beijing.aliyuncs.com/static/izaolife/map.png"
                                class="navigate-icon" />
                            <text class="text"> 导航</text>
                        </view>
                        <view class="action-item" @click="call">
                            <img src="https://north-ai-test-public1.oss-cn-beijing.aliyuncs.com/static/izaolife/phone.png"
                                class="navigate-icon" />
                            <text class="text"> 电话</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 服务设施 -->
        <view class="tabs-content-container" v-if="type !== '1'">
            <text class="tabs-title">服务设施</text>
            <view class="content-inner">
                <view class="merchant-grid">
                    <view class="merchant-item" v-for="info in fwInfos" :key="info.name">
                        <view class="fw-icon">
                            <image :src="info.icon"></image>
                        </view>
                        <view class="item-name">{{ info.name }}</view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 标签页与内容区域 -->
        <view class="tabs-content-container">
            <!-- 标签页切换 -->

            <view class="tab-bar">
                <view v-for="(tab, index) in tabs" :key="index" :class="['tab-item', { active: activeTab === index }]"
                    @click="switchTab(index)">
                    {{ tab }}
                </view>
            </view>
            <!-- 内容区域 -->
            <view class="content-section">
                <!-- 推荐语 -->
                <view v-if="activeTab === 0" class="content-inner intro-content" style="flex-grow: 1"
                    :style="{ minHeight: contentMinHeight + 'px' }">
                    <rich-text :nodes="restaurantInfo.recommendation" class="recommendation"></rich-text>
                </view>

                <!-- 评价 -->
                <view v-if="activeTab === 1" class="content-inner" :style="{ minHeight: contentMinHeight + 'px' }">
                    <view class="reviews-list">
                        <view class="review-item" v-for="review in reviews" :key="review.userName">
                            <view class="review-header">
                                <image class="user-avatar" :src="review.avatar" v-if="review.ishow"></image>

                                <image
                                    src="https://north-ai-test-public1.oss-cn-beijing.aliyuncs.com/static/izaolife/默认头像.png"
                                    class="user-avatar" v-else />
                                <view class="user-info">
                                    <view class="user-name">{{ review.userName }}</view>
                                    <uni-rate :value="review.rating" :readonly="true" size="36rpx"
                                        active-color="#FE7B18" />
                                </view>
                                <view class="review-rating">
                                    <view class="review-date">{{ review.date }}</view>
                                </view>
                            </view>

                            <view class="review-content">
                                <text class="review-text" :class="{ 'line-clamp-2': !review.isExpanded }">{{
                                    review.content }}</text>
                                <view class="full-text-btn" v-if="review.showFullContent" @click="toggleExpand(review)">
                                    <!-- <text>全文</text> -->
                                    <uni-icons type="down" size="36rpx" color="#2D4EAF"></uni-icons>
                                </view>
                            </view>

                            <view class="review-images" v-if="review.pics && review.pics.length > 0">
                                <view class="image-grid">
                                    <image class="review-image" :src="pic" v-for="pic in review.pics" :key="pic">
                                    </image>
                                </view>
                            </view>
                        </view>
                        <view class="reviews-header" v-if="type !== '2'">
                            <view class="header-action" @click="viewAllReviews">
                                <text>查看全部 {{ totalReviews }} 条评价</text>
                                <uni-icons type="right" size="36rpx" color="#000000"></uni-icons>
                            </view>
                        </view>
                    </view>
                </view>

                <!-- 商家信息 -->
                <view v-if="activeTab === 2" class="content-inner" :style="{ minHeight: contentMinHeight + 'px' }">
                    <view class="merchant-grid">
                        <view class="merchant-item" v-for="info in merchantInfos" :key="info.name"
                            @click="navigateToMerchantInfo(info.path, restaurantInfo)">
                            <view class="item-icon">
                                <image :src="info.icon"></image>
                            </view>
                            <view class="item-name">{{ info.name }}</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import mockDATA from "@/utils/mock.js";
export default {
    name: "restaurantDetail",
    data() {
        return {
            tabs: ["推荐语", "评价", "商家"],
            restaurantId: 0,
            statusBarHeight: 0,
            navWidth: 0,
            capsuleRight: 0,
            isFavorited: false,
            bannerImgs: mockDATA.ctBannerImgs,
            tags: ["平台推荐", "放心商家"],
            restaurantInfo: {},
            reviews: mockDATA.reviews,
            totalReviews: 160,
            merchantInfos: mockDATA.merchantInfos,
            fwInfos: mockDATA.fwInfos,
            activeTab: 0,
            currentIndex: 0,
            statusBarHeight: 0,
            safeAreaTop: 0,
            contentMinHeight: 0,
            type: 0,
        };
    },
    onLoad(options) {
        // this.restaurantName = options.name;id

        this.getSystemInfo();
        this.calculateContentHeight();
        if (options) {
            console.log(options);
            this.type = options.type;
            this.restaurantId = parseInt(options.id);
            console.log(this.restaurantId);
            this.getData();
        }
    },
    onResize() {
        this.calculateContentHeight();
    },
    methods: {
        getData() {
            //根据id获取名称
            this.restaurantInfo = mockDATA.restaurants.find(
                (item) => item.id === this.restaurantId
            );
            console.log(this.type);
            if (this.type == "2") {
                this.fwInfos = mockDATA.jqFwInfos;
                this.bannerImgs = mockDATA.jqBannerImgs;
                this.restaurantInfo = mockDATA.travelInfo.find(
                    (item) => item.id === this.restaurantId
                );
                this.reviews = mockDATA.jqreviews;
            }
            if (this.type == "3") {
                this.restaurantInfo = mockDATA.hotelInfo.find(
                    (item) => item.id === this.restaurantId
                );
                this.bannerImgs = mockDATA.jdBannerImgs;
            }
        },
        getSystemInfo() {
            // 获取系统信息和胶囊按钮位置
            uni.getSystemInfo({
                success: (res) => {
                    this.statusBarHeight = res.statusBarHeight;
                    if (res.safeArea) {
                        this.safeAreaTop = res.safeArea.top;
                    } else {
                        this.safeAreaTop = this.statusBarHeight;
                    }
                    this.safeAreaTop += 8;

                    // 获取胶囊按钮位置信息
                    const capsuleInfo = uni.getMenuButtonBoundingClientRect();
                    this.capsuleRight = res.windowWidth - capsuleInfo.right;
                    // 计算导航栏宽度（距离胶囊按钮10pt）
                    this.navWidth = capsuleInfo.left - 20;
                    this.setTopNavPosition();
                },
            });
        },
        setTopNavPosition() {
            const topNavIcons = this.$refs.topNavIcons;
            if (topNavIcons) {
                topNavIcons.style.top = `${this.safeAreaTop}px`;
            }
        },
        calculateContentHeight() {
            uni.getSystemInfo({
                success: (res) => {
                    const windowHeight = res.windowHeight;
                    const bannerHeight = 230;
                    const tabsHeight = 88;
                    this.contentMinHeight = windowHeight - bannerHeight - tabsHeight;
                },
            });
        },
        toggleExpand(review) {
            review.isExpanded = !review.isExpanded;
            review.showFullContent = false;
        },
        shouldShowFullTextBtn(review) {
            if (review.content.length < 80) return false;
            if (review.isExpanded) return true;
            return true;
        },
        viewAllReviews() {
            // console.log('查看全部评价');
            // uni.navigateTo({
            //     url: '/pages/reviews/reviews'
            // });
            uni.showToast({
                title: "快马加鞭开发中...",
                icon: "none",
            });
        },
        goBack() {
            uni.navigateBack();
        },

        handleSwiperChange(e) {
            this.currentIndex = e.detail.current;
        },

        switchTab(tab) {
            this.activeTab = tab;
        },
        navigate() {
            uni.showModal({
                title: "导航",
                content: "即将调用地图应用导航至运河鱼馆(古城店)",
                success: function (res) {
                    if (res.confirm) {
                        console.log("用户点击确定");
                        uni.openLocation({
                            latitude: 34.562528,
                            longitude: 117.733832,
                            name: "运河鱼馆(古城店)",
                            address: "运河鱼馆(古城店)地址",
                            scale: 18,
                        });

                    } else if (res.cancel) {
                        console.log("用户点击取消");
                    }
                },
            });
        },
        call() {
            uni.showModal({
                title: "拨打电话",
                content: "即将拨打运河鱼馆(古城店)电话",
                success: function (res) {
                    if (res.confirm) {
                        console.log("用户点击确定");
                        uni.makePhoneCall({
                            phoneNumber: "1234567890",
                        });
                    } else if (res.cancel) {
                        console.log("用户点击取消");
                    }
                },
            });
        },
        JumpLogin() {
            uni.navigateTo({
                url: "/userpages/login/login"
            });
        },
        toggleFavorite() {
            const isLogin = uni.getStorageSync('isLogin');
            if (!isLogin) {
                this.JumpLogin();
                return;
            }
            this.isFavorited = !this.isFavorited;
            const id = this.restaurantId;
            const types = {
                2: mockDATA.travelInfo,
                3: mockDATA.hotelInfo,
            };
            // 默认使用 restaurants 类型
            let dataList = mockDATA.restaurants;

            if (this.type in types) {
                dataList = types[this.type];
            }

            // 查找对应id的项
            const articleUpdate = dataList.find((item) => item.id === id);

            if (!articleUpdate) {
                console.error(`找不到ID为${id}的数据项`);
                return;
            }
            console.log(articleUpdate);

            if (articleUpdate.isFavorite) {
                articleUpdate.isFavorite = false;
                this.$store.dispatch("deleteMerchants", id);
            } else {
                articleUpdate.isFavorite = true;
                const favorite = {
                    id: Math.floor(Math.random() * 999) + 1,
                    articleId: id,
                    image: this.restaurantInfo.image,
                    name: this.restaurantInfo.name,
                    score: this.restaurantInfo.score,
                    isOpen: this.restaurantInfo.isOpen,
                    businessHours: this.restaurantInfo.businessHours,
                    distance: this.restaurantInfo.distance,
                    address: this.restaurantInfo.address,
                    time: this.$utils.formatTime(new Date()),
                    type: this.type,
                };
                this.$store.dispatch("saveMerchantsToCache", favorite);
            }
        },
        navigateToMerchantInfo(url, restaurantInfo) {
            uni.navigateTo({
                url: `${url}?id=${restaurantInfo.id}&score=${restaurantInfo.score}`,
            });
        },
    },
};
</script>

<style scoped lang="scss">
.page-container {
    background-color: #f8f8f8;
    // font-family: 'PingFang SC', 'Helvetica Neue', 'Arial', sans-serif;
}

/* 顶部导航图标 */
/* 顶部导航图标 */
.top-nav-icons {
    position: absolute;
    left: 0;
    display: flex;
    justify-content: space-between;
    padding: 0 20rpx;
    z-index: 20;
    align-items: center;
}

.top-nav-icons .nav-left {
    display: flex;
    align-items: center;
}

.top-nav-icons .nav-right {
    display: flex;
    align-items: center;
}

.top-nav-icons .nav-icon {
    background: rgb(0 0 0 / 52%);
    border-radius: 100rpx;
    width: 55rpx;
    height: 55rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 轮播图 */
.banner-container {
    height: 400rpx;
    position: relative;
}

.banner-swiper {
    width: 100%;
    height: 100%;
}

.banner-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.banner-index {
    position: absolute;
    bottom: 80rpx;
    /* 向上调整位置 */
    right: 20rpx;
    background-color: rgba(0, 0, 0, 0.5);
    color: #ffffff;
    font-size: 24rpx;
    padding: 6rpx 16rpx;
    border-radius: 20rpx;
    z-index: 10;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    gap: 10rpx;
}

.banner-index-image {
    width: 12pt;
    height: 12pt;
}

/* 餐厅信息卡片 */
.restaurant-card {
    margin: -40rpx 30rpx 0;
    background-color: #ffffff;
    border-radius: 20rpx;

    padding: 30rpx 30rpx 2rpx 30rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
    position: relative;
    z-index: 10;
}

.card-header {
    margin-bottom: 20rpx;
}

.restaurant-name {
    font-size: 36rpx;
    font-weight: bold;
    color: #333333;
    margin-bottom: 16rpx;
}

.restaurant-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10rpx;
}

.recommend-icon {
    width: 200rpx;
    height: 36rpx;
}

.tag-item {
    background-color: #fff7e6;
    color: #ff6600;
    font-size: 24rpx;
    padding: 6rpx 12rpx;
    border-radius: 12rpx;
}

.card-info {
    margin-bottom: 0;
}

.info-row {
    display: flex;
    margin-bottom: 20rpx;

    gap: 60rpx;
}

.info-item {
    padding: 20rpx 0rpx;
    border-top: 1rpx solid #ebebeba6;
    border-bottom: 1rpx solid #ebebeba6;
    display: flex;
    width: 100%;
}

.info-text {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20rpx;
}

.status {
    font-weight: 500;
}

.hours {
    font-size: 24rpx;
}

.flex-between {
    justify-content: space-between;
    align-items: center;
}

.location-row {
    padding-top: 10rpx;
}

.location-info {
    flex: 1;
}

.address-text {
    font-size: 24rpx;
    font-weight: bold;
    color: #333333;
    margin-bottom: 10rpx;
}

.distance-text {
    font-size: 22rpx;
    color: #767676;
}

.actions-group {
    display: flex;
    gap: 30rpx;
    align-items: center;
}

.actions-group image {
    width: 36rpx;
    height: 36rpx;
}

.action-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.action-text {
    font-size: 24rpx;
    color: #666666;
    margin-top: 10rpx;
}

.actions-group .text {
    color: #767676;
    font-size: 20rpx;
}

/* 标签页与内容区域 */
.tabs-content-container {
    margin: 20rpx 30rpx 40rpx;
    background-color: #ffffff;
    border-radius: 20rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

/* Tab栏样式 */
.tab-bar {
    display: flex;
    border-top: 2rpx solid #e5e5e5;
}

.tab-item {
    position: relative;
    padding: 10rpx 20rpx;
    font-size: 32rpx;
    color: #929292;
    transition: all 0.3s ease;
    margin-top: 30rpx;
}

.tab-item.active {
    color: #000000;
    font-weight: bold;
}

.tab-item.active::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
    height: 8rpx;
    background-color: #fe7b18;
    border-radius: 20rpx;
}

/* 内容区域 */
.content-section {
    padding: 30rpx;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    // margin-top: 30rpx;
}

.tabs-title {
    font-weight: 500;
    margin: 11px 17px 22px;
    font-size: 32rpx;
    color: #333333;
}

.content-inner {
    background-color: #ffffff;
}

.intro-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-grow: 1;
}

.recommendation {
    font-size: 26rpx;
    color: #333333;
    line-height: 2.2;
    flex-grow: 1;
}

.recommendation p {
    margin-bottom: 20rpx;
}

/* 评价部分 */
.reviews-header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30rpx;
}

.header-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333333;
}

.header-action {
    display: flex;
    align-items: center;
    color: #000000;
    font-size: 24rpx;
}

.reviews-list {
    display: flex;
    flex-direction: column;
    gap: 30rpx;
}

.review-item {
    padding: 10rpx;
    // background-color: #F8F8F8;
    border-radius: 20rpx;
}

.review-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20rpx;
}

.user-avatar {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    object-fit: cover;
}

.user-info {
    margin-left: 20rpx;
    flex: 1;
}

.user-name {
    font-size: 28rpx;
    color: #333333;
    font-weight: 500;
}

.review-date {
    font-size: 24rpx;
    color: #999999;
    margin-top: 6rpx;
}

.review-rating {
    display: flex;
}

.review-content {
    font-size: 28rpx;
    color: #333333;
    line-height: 1.5;
    margin-bottom: 20rpx;
    position: relative;
}

.review-text {
    display: block;
}

.line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    width: 95%;
}

.full-text-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #0c0c0c;
    font-size: 25rpx;
    position: absolute;
    right: 8rpx;
    bottom: -12rpx;
    z-index: 5;
    border-radius: 10rpx;
}

.review-images {
    margin-top: 20rpx;
}

.image-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10rpx;
}

.review-image {
    width: 180rpx;
    height: 180rpx;
    border-radius: 12rpx;
    object-fit: cover;
}

/* 商家信息 */
.merchant-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333333;
    margin-bottom: 30rpx;
}

.merchant-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20rpx;
}

.merchant-item {
    padding: 0 0 20rpx 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.item-icon {
    width: 80rpx;
    height: 80rpx;
    // border: 1px dashed rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20rpx;
}

.fw-icon {
    width: 40rpx;
    height: 40rpx;

    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20rpx;
}

.fw-icon image {
    width: 40rpx;
    height: 40rpx;
}

.item-icon image {
    width: 80rpx;
    height: 80rpx;
}

.item-name {
    font-size: 24rpx;
    color: #333333;
}
</style>