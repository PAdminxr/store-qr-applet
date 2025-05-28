<template>
    <view class="container">
        <!-- 搜索栏和分类区域容器 -->
        <view class="header-container" :class="{ expanded: isCategoriesExpanded }">
            <!-- 搜索栏 -->

            <view class="search-container" @click="onSearch()">
                <view class="search-box">
                    <uni-search-bar placeholder="辣子鸡" clearButton="none" cancelButton="none" :radius="100"
                        v-model="searchKeyword" class="search-input" :readonly="true">
                    </uni-search-bar>
                    <button class="search-button">搜索</button>
                </view>
            </view>

            <view class="category-tabs-container">
                <!-- 横向滚动容器 -->
                <scroll-view scroll-x class="category-tabs-scroll" :scroll-left="scrollLeft" ref="scrollView">
                    <view v-for="(tab, index) in tags" :key="index" :id="'tabItem' + index" class="tab-item"
                        :class="{ active: currentTab === tab }" @click="selectCategory(tab, index)">
                        {{ tab }}
                        <view class="slider" v-if="currentTab === tab"></view>
                    </view>
                </scroll-view>

                <!-- 展开/收起按钮（固定在右侧） -->
                <view class="expand-btn" @click="toggleCategories">
                    <uni-icons :type="isCategoriesExpanded ? 'up' : 'down'" size="36rpx"></uni-icons>
                </view>
            </view>

            <!-- 展开后的分类面板（脱离文档流） -->
            <view class="category-popup" v-if="isCategoriesExpanded">
                <!-- 半透明蒙版（只遮盖下方内容） -->
                <view class="mask" @click="toggleCategories"></view>

                <!-- 分类内容容器 -->
                <view class="categories-container">
                    <view class="expanded-tab-item" :class="{ active: currentTab === tag }" v-for="(tag, index) in tags"
                        :key="index" @click="selectCategory(tag, index)">
                        {{ tag }}
                    </view>
                </view>
            </view>
        </view>



        <!-- 餐厅列表 -->
        <view class="restaurant-list">
            <view class="restaurant-item" v-for="(restaurant, index) in restaurants" :key="index"
                @click="navigateTo(restaurant)">
                <image :src="restaurant.image" mode="aspectFill" class="restaurant-image"></image>
                <view class="restaurant-info">
                    <view class="restaurant-name"> {{ truncate(restaurant.name) }}</view>
                    <view class="restaurant-score">
                        <image
                            src="https://north-ai-test-public1.oss-cn-beijing.aliyuncs.com/static/izaolife/icon-lh.svg"
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
            searchKeyword: "",
            currentTab: "推荐",
            isCategoriesExpanded: false,
            tags: mockDATA.tags,
            restaurants: mockDATA.restaurants,
            scrollLeft: 0, // 控制 scroll-view 的滚动位置
            expandBtnWidth: 60 // 展开按钮所占宽度
        };
    },
    mounted() {
        this.getTabWidth();
    },
    methods: {
        getTabWidth() {
            const query = uni.createSelectorQuery().in(this);
            query.select('#tabItem0').boundingClientRect(res => {
                if (res) {
                    this.tabWidth = res.width;
                }
            }).exec();
        },
        selectCategory(tab, index) {
            if (!this.tabWidth) {
                console.warn('tabWidth 尚未获取完成');
                return;
            }
            const targetScrollLeft = index * this.tabWidth;
            this.scrollLeft = targetScrollLeft;
            this.currentTab = tab;
            if (tab === "推荐") {
                this.restaurants = mockDATA.restaurants;
                this.isCategoriesExpanded = false;
                return;
            }
            this.restaurants = mockDATA.restaurants.filter(
                (restaurant) => restaurant.tags.includes(tab)
            );
            this.isCategoriesExpanded = false;
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

.category-tabs-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 60rpx;

}

.category-tabs-scroll {
    white-space: nowrap;
    overflow-x: auto;
    display: flex;
    padding-right: 60rpx;
    /* 预留右侧 expand-btn 的空间 */
}

.tab-item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 20%;
    /* 确保一行显示5个标签 */
    box-sizing: border-box;
    font-size: 26rpx;
    color: #929292;
    position: relative;
    height: 80rpx;
    /* 固定高度有助于定位 */

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
    position: relative;
    top: 100px;
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
    margin-top: 100px;
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