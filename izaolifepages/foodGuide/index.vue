<template>
    <view class="food-guide-page">
        <!-- 搜索栏和分类区域容器 -->
        <view class="top-nav-icons" ref="topNavIcons" :style="{ top: safeAreaTop + 'px' }">
            <view class="nav-left" @click="goBack">
                <uni-icons type="left" size="24" color="#FFFFFF"></uni-icons>
            </view>

        </view>
        <!-- 头部区域 -->
        <view class="header">
            <image src="/static/images/header-bg.png" mode="aspectFill" class="header-image"></image>
            <!-- 搜索栏 -->


            <view class="search-container" @click="onSearch">
                <view class="search-box">
                    <uni-search-bar placeholder="辣子鸡" clearButton="none" cancelButton="none" :radius="100"
                        v-model="searchKeyword" class="search-input" :readonly="true">
                    </uni-search-bar>
                    <button class="search-button">搜索</button>
                </view>
            </view>
        </view>



        <!-- 食品推荐列表 -->
        <view class="food-list">
            <view v-for="(food, index) in foods" :key="index" class="food-item-container">
                <view class="food-item" @click="onFoodClick(food)">
                    <image :src="food.image[0]" mode="aspectFill" class="food-image"></image>

                    <view class="food-top-badge">
                        <image v-if="index < 3" :src="getTopImage(index + 1)" mode="aspectFit" class="top-tagimage">
                        </image>
                        <view v-else class="top-badge2">
                            <image src="/static/images/矩形.png" mode="aspectFit" class="top-tagimage">
                            </image>
                            <p class="top-tag">TOP <text>{{ food.top }}</text>
                            </p>
                        </view>

                    </view>
                    <text class="food-name">{{ food.name }}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import mockDATA from "@/utils/mock.js";
export default {
    data() {
        return {
            safeAreaTop: 0,
            foods: mockDATA.foods,
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

        onSearch() {
            uni.navigateTo({
                url: "/izaolifepages/searchPage/index",
            });
        },
        onFoodClick(item) {
            uni.navigateTo({
                url: `/izaolifepages/foodGuide/detail?id=${item.id}`,
            });
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
    }
};
</script>

<style scoped lang="scss">
.food-guide-page {
    background-color: #f4f4f4;

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

.header {
    position: relative;
    margin-bottom: 40rpx;
}

.header-image {
    width: 100%;
    height: 400rpx;
}


.header-title {
    font-size: 40rpx;
    font-weight: bold;
    text-align: center;
}

.header-subtitle {
    font-size: 26rpx;
    text-align: center;
    margin-top: 10rpx;
}



.search-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 40rpx;
    position: absolute;
    bottom: 0rpx;
    width: 100%;

}

.search-box {
    position: relative;
    width: 80%;

}


.search-input ::v-deep.uni-searchbar__box {
    padding-right: 160rpx;
    border-radius: 100rpx;
    box-sizing: border-box;
}

.search-button {
    position: absolute;
    right: 20rpx;
    top: 50%;
    transform: translateY(-50%);
    padding: 0 24rpx;
    font-size: 24rpx;
    color: white;
    background: linear-gradient(to right, #fea518, #fe7b18);
    border-radius: 40rpx;
    z-index: 200;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;

}

.food-list {
    display: flex;
    flex-wrap: wrap;
    gap: 30rpx;
    justify-content: center;
    align-content: center;
    padding-bottom: 100rpx;
}

.food-item-container {
    width: 45%;
    border-radius: 20rpx;
    box-sizing: border-box;
    background: white;
    /* padding: 10px; */

}



.food-item {
    position: relative;
    border-radius: 20rpx;

    width: 100%;

}

.food-image {
    width: 100%;
    height: 300rpx;
    /* border: 1px dashed #e1e1e1; */
}

.food-top-badge {
    position: absolute;
    top: -10rpx;
    right: 0rpx;

    color: white;
    padding: 5rpx 10rpx;
    font-size: 24rpx;
    border-radius: 5rpx;

}

.top-tagimage {
    width: 56rpx;
    height: 67rpx;
}

.top-badge {
    z-index: 10;
    position: absolute;

}

.badge2 {
    position: relative;

}

.top-tag {
    position: absolute;
    z-index: 20;
    top: 10rpx;

    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 76%;
}

.top-tag text {
    font-size: 26rpx;
    font-weight: 600;
}

.food-name {


    color: rgb(0, 0, 0);
    padding: 10rpx;
    font-size: 26rpx;
    text-align: center;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 30rpx;
    font-weight: 500;

}

::v-deep .uni-searchbar {
    padding: 0rpx !important;
}

::v-deep .uni-searchbar__text-placeholder {
    font-size: 28rpx !important;
}
</style>