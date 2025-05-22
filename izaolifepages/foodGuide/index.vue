<template>
    <view class="food-guide-page">
        <!-- 头部区域 -->
        <view class="header">
            <image src="https://cdn.jsdelivr.net/gh/PAdminxr/store-qr-applet@main/static/izaolife/header-bg.png"
                mode="aspectFill" class="header-image"></image>
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
                <view class="food-item" @click="onFoodClick">
                    <image :src="food.image" mode="aspectFill" class="food-image"></image>

                    <view class="food-top-badge">
                        <image v-if="index < 3" :src="getTopImage(index + 1)" mode="aspectFit" class="top-tagimage">
                        </image>
                        <view v-else class="top-badge2">
                            <image
                                src="https://cdn.jsdelivr.net/gh/PAdminxr/store-qr-applet@main/static/izaolife/矩形.png"
                                mode="aspectFit" class="top-tagimage">
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
export default {
    data() {
        return {
            foods: [
                { image: 'https://cdn.jsdelivr.net/gh/PAdminxr/store-qr-applet@main/static/izaolife/swfood1.png', name: '枣庄特色辣子鸡', top: '01' },
                { image: 'https://cdn.jsdelivr.net/gh/PAdminxr/store-qr-applet@main/static/izaolife/swfood2.png', name: '枣庄菜煎饼', top: '02' },
                { image: 'https://cdn.jsdelivr.net/gh/PAdminxr/store-qr-applet@main/static/izaolife/swfood3.png', name: '滕州卷饼', top: '03' },
                { image: 'https://cdn.jsdelivr.net/gh/PAdminxr/store-qr-applet@main/static/izaolife/swfood4.png', name: '枣庄糁汤', top: '04' },
                { image: 'https://cdn.jsdelivr.net/gh/PAdminxr/store-qr-applet@main/static/izaolife/swfood5.png', name: '水煎包', top: '05' },
                { image: 'https://cdn.jsdelivr.net/gh/PAdminxr/store-qr-applet@main/static/izaolife/swfood6.png', name: '羊肉汤', top: '06' }
            ]
        };
    },
    methods: {

        onSearch() {
            uni.navigateTo({
                url: "/izaolifepages/searchPage/index",
            });
        },
        onFoodClick() {
            uni.navigateTo({
                url: "/izaolifepages/foodGuide/detail",
            });
        },
        getTopImage(top) {
            switch (top) {
                case 1:
                    return 'https://cdn.jsdelivr.net/gh/PAdminxr/store-qr-applet@main/static/izaolife/top1.png';
                case 2:
                    return 'https://cdn.jsdelivr.net/gh/PAdminxr/store-qr-applet@main/static/izaolife/top2.png';
                default:
                    return 'https://cdn.jsdelivr.net/gh/PAdminxr/store-qr-applet@main/static/izaolife/top3.png';
            }
        },
    }
};
</script>

<style scoped>
.food-guide-page {
    background-color: #f4f4f4;

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
    right: 20rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 18rpx;
}

.top-tag text {
    font-size: 22rpx;
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