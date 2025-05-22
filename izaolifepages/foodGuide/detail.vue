<template>
    <view class="container">
        <!-- 搜索栏和分类区域容器 -->
        <view class="top-nav-icons" ref="topNavIcons" :style="{ top: safeAreaTop + 'px' }">
            <view class="nav-left" @click="goBack">
                <uni-icons type="left" size="24" color="#FFFFFF"></uni-icons>
            </view>

        </view>
        <!-- 轮播图 -->
        <view class="banner-container">
            <swiper class="banner-swiper" :indicator-dots="true" :autoplay="false" :interval="5000" :duration="500"
                indicator-active-color="white">
                <swiper-item v-for="(img, index) in bannerImgs" :key="index">
                    <image class="banner-image" :src="img"></image>
                </swiper-item>
            </swiper>
        </view>
        <view class="recommendation-container">
            <text class="recommendation">
                枣庄特色辣子鸡
            </text>
            <rich-text :nodes="recommendation" class="recommen"></rich-text>
            <text class="recommendation">
                推荐门店
            </text>


        </view>

        <!-- 餐厅列表 -->
        <view class="restaurant-list">
            <view class="restaurant-item" v-for="(restaurant, index) in restaurants" :key="index"
                @click="navigateTo(restaurant)">
                <image v-if="index < 3" src="/static/images/tabbar/top3.png" mode="aspectFit" class="top-tagimage" />
                <image v-else src="/static/images/tabbar/top4.png" mode="aspectFit" class="top-tagimage" />

                <image :src="restaurant.image" mode="aspectFill" class="restaurant-image"></image>
                <view class="restaurant-info">
                    <view class="restaurant-name"> {{ truncate(restaurant.name) }}</view>
                    <view class="restaurant-score">
                        <image
                            src="https://cdn.jsdelivr.net/gh/PAdminxr/store-qr-applet@main/static/izaolife/icon-lh.png"
                            class="score-icon"></image>
                        {{ restaurant.score }}分
                    </view>
                    <view class="restaurant" :class="{ open: restaurant.isOpen }">
                        <view class="restaurant-status">
                            <text v-if="restaurant.isOpen">营业中</text>
                            <text v-else style="color: #adadad">休息中</text>
                            <span :style="{ color: restaurant.isOpen ? '#333333' : '#adadad' }">{{
                                restaurant.businessHours
                                }}</span>
                        </view>
                        <view class="restaurant-distance">{{ restaurant.distance }}</view>
                    </view>
                    <view class="restaurant-address">{{ restaurant.address }}</view>

                </view>
            </view>
        </view>
        <view class="restaurant-info" v-if="restaurants.length === 0">
            <text class="empty-data">暂无数据</text>
        </view>
    </view>
</template>

<script>
import mockDATA from "@/utils/mock.js";
export default {
    data() {
        return {
            bannerImgs: mockDATA.ctBannerImgs,
            safeAreaTop: 0,
            restaurants: mockDATA.restaurants,
            recommendation: `
          <p>吃枣庄辣子鸡，品尝特色美食</p>
          <p>枣庄辣子鸡选用上等食材，鸡肉新鲜、辣椒香醇，每一口都能感受到食材的新鲜和美味。它的味道独特，麻辣适中，香气四溢，让人回味无穷!</p>
          `,

        };
    },
    mounted() {

        this.getSystemInfo();
    },
    methods: {
        getSystemInfo() {
            uni.getSystemInfo({
                success: (res) => {
                    this.statusBarHeight = res.statusBarHeight;
                    if (res.safeArea) {
                        this.safeAreaTop = res.safeArea.top;
                    } else {
                        this.safeAreaTop = this.statusBarHeight;
                    }
                    this.safeAreaTop += 8;
                },
            });
        },
        goBack() {
            uni.navigateBack();
        },


        toggleCategories() {
            this.isCategoriesExpanded = !this.isCategoriesExpanded;
        },
        truncate(text) {
            return this.$utils.truncate(text, 10);
        },
        navigateTo(item) {
            uni.navigateTo({
                url: `/izaolifepages/restaurantDetail/index?id=${item.id}&type=${1}`,
            });
        },
        toggleCategories() {
            this.isCategoriesExpanded = !this.isCategoriesExpanded;
        },
        onSearch() {
            uni.navigateTo({
                url: "/izaolifepages/searchPage/index",
            });
        },
    },
};
</script>

<style scoped lang="scss">
.container {
    background-color: #f5f5f5;
}

/* 顶部导航图标 */
.top-nav-icons {
    position: absolute;

    top: var(--status-bar-height);
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    padding: 0 20rpx;
    z-index: 20;
    align-items: center;
    width: 68%;

    @media (max-width: 350px) {
        width: 65%;
    }
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

.recommendation-container {
    padding: 40rpx 40rpx 20rpx 40rpx;
}

.recommen {
    font-size: 27rpx;
    color: #555454;
    line-height: 44rpx;
    display: inline-block;
    margin: 20rpx 0;
}

.recommendation {
    font-weight: 600;
    font-size: 38rpx;
}

/* 餐厅列表样式 */
.restaurant-list {
    padding: 20rpx 40rpx 40rpx 40rpx;

}

.restaurant-item {
    display: flex;
    padding: 20rpx;
    margin-bottom: 20rpx;
    background-color: white;
    border-radius: 20rpx;
    box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.05);
    position: relative;
}

.top-tagimage {
    position: absolute;
    top: -12rpx;
    left: 10rpx;
    width: 56rpx;
    height: 67rpx;
    z-index: 10;
    /* 确保层级最高 */
}

.restaurant-image {
    width: 160rpx;
    height: 160rpx;
    border-radius: 12rpx;
    object-fit: cover;
}

.restaurant-info {
    flex: 1;
    margin-left: 20rpx;
    position: relative;
}

.empty-data {
    text-align: center;
    margin: 50rpx 0;
    color: #999;
    display: inline-block;
    width: 100%;
    font-size: 32rpx;
}

.restaurant-name {
    font-size: 32rpx;
    font-weight: 500;
    margin-bottom: 8rpx;
    color: #333;
}

.restaurant-score {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10rpx;
    font-size: 24rpx;
    color: #ff9500;
    margin-bottom: 8rpx;
}

.score-icon {
    width: 12pt;
    height: 12pt;
}

.restaurant {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.restaurant-status {
    font-size: 24rpx;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10rpx;
}

.open {
    /* color: #00b42a; */
}

.restaurant-address {
    font-size: 26rpx;
    display: block;
    padding: 10rpx 0;
}

.restaurant-distance {
    font-size: 26rpx;
}

::v-deep .uni-searchbar__box {
    background: white !important;
}

::v-deep .expanded .uni-searchbar__box {
    border: 1px solid #fe7b18;
    /* 修改搜索框的边框为橙色 */
}

::v-deep .uni-searchbar__text-placeholder {
    font-size: 28rpx !important;
}
</style>