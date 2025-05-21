<template>
    <view class="special-food-page">
        <!-- 头部区域 -->
        <view class="header">
            <image src="https://cdn.jsdelivr.net/gh/PAdminxr/store-qr-applet@main/static/placeholder.jpg"
                mode="aspectFill" class="header-image"></image>
            <view class="header-overlay">
                <text class="header-title">枣庄特色辣子鸡</text>
                <text class="header-description">
                    吃枣庄辣子鸡，品尝特色美食\n
                    枣庄辣子鸡选用上等食材，鸡肉新鲜、辣椒香醇，每一口都能感受到食材的新鲜和美味。它的味道独特，麻辣适中，香气四溢，让人回味无穷！
                </text>
            </view>
        </view>

        <!-- 搜索栏 -->
        <view class="search-container">
            <uni-search-bar placeholder="搜索您喜欢的菜品或餐厅" clearButton="none" cancelButton="none" :radius="100"
                @input="onInput">
            </uni-search-bar>
            <button class="search-button" @click="onSearch">搜索</button>
        </view>

        <!-- 推荐门店 -->
        <view class="recommend-shops">
            <text class="recommend-title">推荐门店</text>
            <view class="shop-list">
                <view class="shop-item" v-for="(shop, index) in shops" :key="index">
                    <image :src="shop.image" mode="aspectFill" class="shop-image"></image>
                    <view class="shop-details">
                        <text class="shop-name">{{ shop.name }}</text>
                        <text class="shop-rating">⭐ {{ shop.rating }}分</text>
                        <text class="shop-status">{{ shop.status }}</text>
                        <text class="shop-address">{{ shop.address }}</text>
                        <text class="shop-distance">{{ shop.distance }}</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            shops: [
                { image: 'https://cdn.jsdelivr.net/gh/PAdminxr/store-qr-applet@main/static/placeholder.jpg', name: '小火柴大鱼头·铁锅炖·鲁菜...', rating: '98', status: '营业中 09:00-22:00', address: '台儿庄区东顺南路古城东门对面', distance: '320m' },
                { image: 'https://cdn.jsdelivr.net/gh/PAdminxr/store-qr-applet@main/static/placeholder.jpg', name: '台儿庄运河鱼馆枣庄辣子鸡', rating: '89', status: '营业中 09:00-22:00', address: '台儿庄区东顺南路古城东门对面', distance: '105m' },
                { image: 'https://cdn.jsdelivr.net/gh/PAdminxr/store-qr-applet@main/static/placeholder.jpg', name: '花家地艺术餐厅', rating: '80', status: '休息中 17:00-03:00', address: '台儿庄区东顺南路古城东门对面', distance: '66m' },
                { image: 'https://cdn.jsdelivr.net/gh/PAdminxr/store-qr-applet@main/static/placeholder.jpg', name: '运河鱼馆（古城店）', rating: '77', status: '营业中 09:00-22:00', address: '台儿庄区东顺南路古城东门对面', distance: '1.2km' }
            ]
        };
    },
    methods: {
        onInput(event) {
            console.log('输入的内容:', event.value);
        },
        onSearch() {
            console.log('执行搜索');
        }
    }
};
</script>

<style scoped>
.special-food-page {
    background-color: #f4f4f4;
    padding: 40rpx;
}

.header {
    position: relative;
    margin-bottom: 40rpx;
}

.header-image {
    width: 100%;
    height: 400rpx;
    border-radius: 20rpx;
}

.header-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 20rpx;
    border-bottom-left-radius: 20rpx;
    border-bottom-right-radius: 20rpx;
}

.header-title {
    font-size: 40rpx;
    font-weight: bold;
    margin-bottom: 20rpx;
}

.header-description {
    font-size: 26rpx;
    line-height: 40rpx;
}

.search-container {
    display: flex;
    align-items: center;
    position: relative;
    margin-bottom: 40rpx;
}

/* 确保 uni-search-bar 不占据整个宽度 */
uni-search-bar {
    flex-grow: 1;
}

.search-button {
    margin-left: -88rpx;
    padding: 0 30rpx;
    height: 72rpx;
    background-color: #ff5a5f;
    color: white;
    border: none;
    border-top-right-radius: 40rpx;
    border-bottom-right-radius: 40rpx;
    z-index: 1;
    font-size: 28rpx;
}

.recommend-title {
    font-size: 36rpx;
    font-weight: bold;
    margin-bottom: 20rpx;
}

.shop-list {
    display: flex;
    flex-direction: column;
    gap: 20rpx;
}

.shop-item {
    background-color: white;
    padding: 20rpx;
    border-radius: 20rpx;
    display: flex;
    align-items: center;
}

.shop-image {
    width: 160rpx;
    height: 160rpx;
    margin-right: 20rpx;
    border-radius: 10rpx;
}

.shop-details {
    flex-grow: 1;
}

.shop-name {
    font-size: 32rpx;
    font-weight: bold;
    margin-bottom: 10rpx;
    display: block;
}

.shop-rating {
    color: orange;
    margin-bottom: 10rpx;
    display: block;
}

.shop-status,
.shop-address,
.shop-distance {
    font-size: 24rpx;
    color: #666;
    display: block;
}
</style>