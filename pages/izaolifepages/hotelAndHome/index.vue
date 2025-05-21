<template>
    <view class="container">
        <!-- 搜索栏和分类区域容器 -->
        <view class="header-container" :class="{ expanded: isCategoriesExpanded }">
            <!-- 搜索栏 -->

            <view class="search-container" @click="onSearch()">
                <view class="search-box">
                    <uni-search-bar placeholder="全季酒店" clearButton="none" cancelButton="none" :radius="100"
                        v-model="searchKeyword" class="search-input" :readonly="true">
                    </uni-search-bar>
                    <button class="search-button">搜索</button>
                </view>
            </view>
            <!-- 分类区域 -->
            <view class="category-section" :class="{ expanded: isCategoriesExpanded }">
                <!-- 默认显示的5个分类 + 展开按钮 -->

                <view class="category-tabs">
                    <view class="tab-item" :class="{ active: currentTab === tab }" v-for="(tab, index) in tags"
                        :key="index" @click="selectCategory(tab)">
                        <text>{{ tab }}</text>
                        <view class="slider" v-if="currentTab === tab"></view>
                    </view>
                    <view class="expand-btn" @click="toggleCategories">
                        <uni-icons :type="isCategoriesExpanded ? 'up' : 'down'" size="36rpx"></uni-icons>
                    </view>
                </view>
            </view>
        </view>

        <!-- 展开后的分类面板（脱离文档流） -->
        <view class="category-popup" v-if="isCategoriesExpanded">
            <!-- 半透明蒙版（只遮盖下方内容） -->
            <view class="mask" @click="toggleCategories"></view>

            <!-- 分类内容容器 -->
            <view class="categories-container">
                <view class="expanded-tab-item" :class="{ active: currentTab === tag }" v-for="(tag, index) in tags"
                    :key="index" @click="selectCategory(tag)">
                    {{ tag }}
                </view>
            </view>
        </view>

        <!-- 餐厅列表 -->
        <view class="restaurant-list">
            <view class="restaurant-item" v-for="(restaurant, index) in restaurants" :key="index"
                @click="navigateTo(restaurant)">
                <image :src="restaurant.image" mode="aspectFill" class="restaurant-image"></image>
                <view class="restaurant-info">
                    <view class="restaurant-name"> {{ restaurant.name }}</view>
                    <view class="restaurant-score">
                        <image src="/static/izaolife/icon-lh.png" class="score-icon"></image>
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
            searchKeyword: "",
            currentTab: "推荐",
            isCategoriesExpanded: false,
            tags: [
                "推荐",
                "位置距离",
                "榴花等级"
            ],
            restaurants: mockDATA.hotelInfo,
        };
    },
    methods: {
        navigateTo(item) {
            uni.navigateTo({
                url: `/pages/izaolifepages/restaurantDetail/index?id=${item.id}&type=${3}`,
            });
        },
        selectCategory(tab) {
            this.currentTab = tab;
            this.isCategoriesExpanded = false;
            if (tab === "推荐") {
                this.restaurants = mockDATA.hotelInfo;
                return;
            }
            this.restaurants = []
        },
        toggleCategories() {
            this.isCategoriesExpanded = !this.isCategoriesExpanded;
        },
        onSearch() {
            uni.navigateTo({
                url: "/pages/izaolifepages/searchPage/index",
            });
        },
    },
};
</script>

<style scoped lang="scss">
.container {
    background-color: #f5f5f5;
}

/* 搜索栏和分类区域容器 */
.header-container {
    transition: background-color 0.3s;
    background-color: #f5f5f5;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
}

.expanded {
    background-color: #ffffff;
    /* 当元素具有expanded类时，背景色变为白色 */
}

.search-container {
    display: flex;
    justify-content: center;
    width: 100%;
}

.search-box {
    position: relative;
    width: 100%;
}

.search-input ::v-deep.uni-searchbar__box {
    padding-right: 160rpx;
    border-radius: 100rpx;
    box-sizing: border-box;
}

.search-button {
    position: absolute;
    right: 40rpx;
    top: 50%;
    transform: translateY(-50%);
    padding: 0 24rpx;
    font-size: 24rpx;
    color: white;
    background: linear-gradient(to right, #fea518, #fe7b18);
    border-radius: 40rpx;
    z-index: 200;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.search-bar {}

.category-section {}

/* 默认显示的5个分类标签 */
.category-tabs {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;
}





.tab-item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 18%;
    box-sizing: border-box;
    font-size: 26rpx;
    color: #929292;
    position: relative;
    height: 80rpx;

}



.tab-item.active {
    font-size: 30rpx;
    color: #333;
    font-weight: bold;
}

.slider {
    position: absolute;

    bottom: 8rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 40rpx;
    height: 6rpx;
    border-radius: 2rpx;
    background-color: #fe7b18;
}

.expand-btn {
    position: absolute;
    right: 20rpx;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    padding: 10rpx;
}

/* 展开后的分类面板（脱离文档流） */
.category-popup {
    position: relative;
    top: -8rpx;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
}

.mask {
    position: fixed;
    top: 80;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
}

.categories-container {
    position: absolute;
    z-index: 100;
    background-color: white;
    border-radius: 0rpx 0rpx 24rpx 24rpx;
    padding: 30rpx 20rpx;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}

.expanded-tab-item {
    width: calc(25% - 30rpx);
    padding: 16rpx 0;
    text-align: center;
    font-size: 24rpx;
    margin: 10rpx;
    border-radius: 32rpx;
    background-color: #f0f0f0;
    color: #666;
}

.expanded-tab-item.active {
    background-color: #ffefe0;
    color: #fe7b18;
    font-weight: 500;
}

/* 餐厅列表样式 */
.restaurant-list {
    padding: 20rpx;
    margin-top: 220rpx;
}

.restaurant-item {
    display: flex;
    padding: 20rpx;
    margin-bottom: 20rpx;
    background-color: white;
    border-radius: 20rpx;
    box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.05);
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