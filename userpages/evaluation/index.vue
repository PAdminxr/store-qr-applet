<template>
    <view class="evaluation-container">
        <!-- Tab栏 -->
        <!-- <view class="tab-bar">
            <view class="tab-item" :class="{ active: activeTab === 'pending' }" @click="switchTab('pending')">
                <text>待评价</text>
            </view>
            <view class="tab-item" :class="{ active: activeTab === 'completed' }" @click="switchTab('completed')">
                <text>已评价</text>
            </view>
        </view> -->
        <view class="tab-bar">
            <view v-for="(tab, index) in tabs" :key="index" :class="['tab-item', { active: currentTab === index }]"
                @click="switchTab(index)">
                {{ tab }}
            </view>
        </view>

        <!-- 待评价内容 -->
        <view class="tab-content" v-if="currentTab === 0">
            <view v-if="pendingEvaluations.length === 0">
                <text class="empty-data">暂无数据</text>
            </view>


            <view v-else class="evaluation-item" v-for="(item, index) in pendingEvaluations" :key="index">
                <view class="evaluation-left">
                    <image :src="item.shopImage" mode="aspectFill" class="evaluation-img"></image>
                    <view class="evaluation-text">
                        <view class="evaluation-title">{{
                            displayedRemarkText(item.shopName)
                        }}</view>
                        <view class="evaluation-time">{{ item.tradeTime }} 下单</view>
                    </view>
                </view>
                <view class="evaluation-right">
                    <view @click="goEvaluate(item)">去评价</view>
                </view>
            </view>


        </view>
        <!-- 已评价内容 -->
        <view class="tab-content" v-if="currentTab === 1">
            <view v-if="listData.length === 0">
                <text class="empty-data">暂无数据</text>
            </view>
            <view v-for="(item, index) in listData" :key="index" class="evaluation-item">
                <view class="list-item">
                    <!-- 第一行 -->
                    <view class="header">
                        <label @click="jumpToShore(item)">
                            <image class="shop-icon" :src="item.image"></image>
                            <text class="shop-name">{{
                                displayedRemarkText(item.title)
                            }}</text>
                            <uni-icons type="right" size="16" color="#333"></uni-icons>
                        </label>

                        <text class="date">{{ item.commentdate }}</text>
                    </view>
                    <view class="list-content">
                        <!-- 第二行 -->
                        <view class="rating">
                            <uni-rate :readonly="true" :value="item.rating" active-color="#FE7B18" size="12"></uni-rate>
                            <text class="rating-description">{{
                                ratingDescription(item.rating)
                            }}</text>
                        </view>

                        <!-- 第三行 -->
                        <view class="review-text-wrapper">
                            <text class="review-text">{{ item.comment }}</text>
                        </view>

                        <!-- 第四行 -->
                        <view class="images-wrapper" v-if="item.media && item.media.length > 0">
                            <!-- <view v-for="(img, imgIndex) in item.media" :key="imgIndex">
                                <image class="review-img" :src="img.path" mode="aspectFill" v-if="img.type === 'image'"
                                    @click.stop="previewMedia(item.media, imgIndex)" />

                                <view v-else class="video-cover" @click="playVideo(img.path)">
                                    <image class="cover-image" src="https://cdn.jsdelivr.net/gh/PAdminxr/store-qr-applet@main/static/images/video_cover.png" mode="aspectFill" />
                                </view>
                            </view> -->
                            <view v-for="(img, imgIndex) in item.media" :key="imgIndex">
                                <EnhancedMediaItem :mediaSrc="img.src" :isVideo="img.isVideo" :index="imgIndex"
                                    :width="width" :height="height" :margin="margin" :showStyle='true' />
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import EnhancedMediaItem from '@/components/EnhancedMediaItem.vue';

export default {
    components: {
        EnhancedMediaItem,
    },
    data() {
        return {
            tabs: ['待评价', '已评价'],
            width: ' 170rpx',
            height: ' 170rpx',
            margin: '10rpx',
            isLogin: this.$store.getters.getIsLogin,
            currentTab: 0,

            // unusedCoupons: this.$store.state.receivedRedEnvelopes,

            ratingDescriptions: ["非常不满意", "不满意", "一般", "满意", "非常满意"],
        };
    },
    computed: {
        // listData() {
        //     return this.isLogin
        //         ? this.$store.getters.getComments
        //         : [];
        // }
        pendingEvaluations() {
            console.log(this.$store.getters.getOrders);

            return this.$store.getters.getOrders.filter((item) => {
                return item.evaluation === false;
            });
        },

        listData() {
            console.log(this.$store.getters.getComments);
            return this.$store.getters.getComments;
        },
    },
    onLoad(options) {
        if (options.tab) {
            this.currentTab = parseInt(options.tab);
        }
    },

    mounted() {
        this.$store.dispatch("loadCommentsFromCache");
        this.$store.dispatch("loadOrdersFromCache");
    },
    methods: {
        isImage(url) {
            return /\.(jpg|jpeg|png|gif)$/i.test(url);
        },
        previewMedia(data, index) {
            const urls = data.filter((item) => this.isImage(item.path)).map(item => item.path);
            uni.previewImage({
                current: urls[index],
                urls: urls,
            });
        },
        playVideo(src) {
            console.log("播放视频：", src);
            uni.navigateTo({
                url: `/pages/videoPlayer/videoPlayer?src=${encodeURIComponent(src)}`,
            });
        },
        goEvaluate(item) {
            uni.navigateTo({
                url: `/userpages/evaluation/create?orderId=${item.orderId}`,
            });
        },
        jumpToShore(item) {
            uni.navigateTo({
                url: `/izaolifepages/restaurantDetail/index?id=${item.shopId}&type=${1}`,
            });
        },
        ratingDescription(rating) {
            if (rating === 0) return "";
            const index = Math.min(rating - 1, this.ratingDescriptions.length - 1);
            return this.ratingDescriptions[index];
        },
        displayedRemarkText(title) {
            return this.$utils.truncate(title, 13);
        },
        // 切换Tab
        switchTab(tab) {
            this.currentTab = tab;
            uni.pageScrollTo({
                scrollTop: 0, // 滚动到页面顶部
                duration: 300 // 过渡时间，单位为毫秒
            });
        },

        // 切换规则显示状态
        toggleRule(coupon) {
            coupon.showRule = !coupon.showRule;
        },


    },
};
</script>

<style scoped lang="scss">
/* 全局样式 */
.evaluation-container {
    padding-bottom: 100rpx;
    padding: 0;
    background-color: #f5f5f5;
}

/* Tab栏样式 */
.tab-bar {
    display: flex;
    background-color: white;
    border-bottom: 2rpx solid #e5e5e5;
    gap: 40rpx;
    padding: 40rpx 40rpx 20rpx 40rpx;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 20;
}



.tab-item {
    position: relative;
    padding: 10rpx 20rpx;
    font-size: 32rpx;
    color: #929292;
    transition: all 0.3s ease;
}

.tab-item.active {
    color: #000000;
    font-weight: bold;
}

.tab-item.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
    height: 8rpx;
    background-color: #020202;
    border-radius: 20rpx;
}

.tab-content {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20rpx;
    flex-direction: column;
    margin-top: 130rpx;
}

.empty-data {
    text-align: center;
    margin: 50rpx 0;
    color: #999;
    display: inline-block;
    width: 100%;
    font-size: 32rpx;
}

.evaluation-item {
    background-color: white;
    border-radius: 20rpx;
    padding: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    margin-bottom: 30rpx;
}

.evaluation-left {
    display: flex;
    align-items: center;
}

.evaluation-img {
    width: 80rpx;
    height: 80rpx;
    border-radius: 10rpx;
    margin-right: 20rpx;
}

.evaluation-text {
    max-width: 80%;
}

.evaluation-title {
    font-size: 30rpx;
    font-weight: bold;
    margin-bottom: 10rpx;
}

.evaluation-time {
    font-size: 24rpx;
    color: #929292;
}

.evaluation-right {
    // background-color: #FF8C00;
    color: #ff8c00;
    border: 3rpx solid #ff8c00;
    border-radius: 20rpx;
    padding: 10rpx 20rpx;
    font-size: 24rpx;
}

.evaluation-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10rpx;
}

.evaluation-rating {
    display: flex;
    align-items: center;
    margin-bottom: 10rpx;
}

.evaluation-content {
    font-size: 26rpx;
    line-height: 1.5;
    color: #333;
}

.evaluation-images {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10rpx;
}

.evaluation-images image {
    width: 120rpx;
    height: 120rpx;
    border-radius: 10rpx;
    margin-right: 10rpx;
    margin-bottom: 10rpx;
}

.list-item {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.list-content {
    padding-left: 60rpx;
    margin-top: -26rpx;
}

.header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
}

.rating,
.review-text-wrapper,
.images-wrapper {
    padding: 25rpx 20rpx 0 10rpx;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
}

.rating-description {
    font-size: 20rpx;
    line-height: 40rpx;
    color: #767676;
    // margin-top: 20rpx;
}

.header label {
    display: flex;
    align-items: center;
}

.shop-icon {
    width: 60rpx;
    height: 60rpx;
    border-radius: 10rpx;
}

.shop-name {
    font-size: 32rpx;
    margin-left: 15rpx;
    flex-grow: 1;
    font-weight: 600;
}

.icon-type {
    font-size: 28rpx;
}

.date {
    font-size: 20rpx;
    color: #999;
}

.rating {
    justify-content: flex-start;
    align-items: center;
    gap: 10rpx;
}

.review-text {
    font-size: 24rpx;
    color: #333;
}

.images-wrapper {
    display: flex;
}

.review-img {
    width: 170rpx;
    height: 170rpx;
    margin-right: 10rpx;
    border-radius: 10rpx;
}

.video-cover {
    width: 170rpx;
    height: 170rpx;
    position: relative;
    border-radius: 16rpx;
    overflow: hidden;
    background-color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
}

.cover-image {
    width: 100rpx !important;
    height: 100rpx !important;
}
</style>