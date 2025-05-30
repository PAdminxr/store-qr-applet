<template>
    <view class="coupons-container">
        <!-- Tab栏 -->
        <view class="tab-bar">
            <view v-for="(tab, index) in tabs" :key="index" :class="['tab-item', { active: currentTab === index }]"
                @click="switchTab(index)">
                {{ tab }}
            </view>
        </view>

        <!-- 动态内容 -->
        <view class="tab-content">
            <view v-if="currentFeedbacks.length === 0">
                <text class="empty-data">暂无数据</text>
            </view>
            <view v-else class="coupon-card" v-for="(item, index) in currentFeedbacks" :key="index"
                @click="goToDetail(item)">
                <view class="coupon-top">
                    <!-- 描述 -->
                    <text class="description">{{ item.description }}</text>

                    <!-- 图片或视频 -->
                    <view class="images-wrapper" v-if="item.media && item.media.length > 0">
                        <view v-for="(img, imgIndex) in item.media" :key="imgIndex" style="position: relative;">
                            <image class="review-img" :src="img.isVideo ? img.videoPath : img.src" mode="aspectFill" />

                            <image v-if="img.isVideo"
                                src="https://north-ai-test-public1.oss-cn-beijing.aliyuncs.com/static/izaozixun/icon-bofang.png"
                                class="play"></image>

                        </view>
                    </view>

                    <!-- 时间和状态 -->
                    <view class="time-status">
                        <text class="submit-time">{{ item.submitTime }}</text>
                        <text :class="['status', getStatusClass(item.status)]">
                            {{ getStatusText(item.status) }}
                        </text>
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
            currentTab: 0,
            tabs: ['全部', '待处理', '已处理'],
            feedbacks: [], // 所有反馈数据
        };
    },

    computed: {
        currentFeedbacks() {
            switch (this.currentTab) {
                case 1:
                    return this.feedbacks.filter(r => r.status === 'pending');
                case 2:
                    return this.feedbacks.filter(r => r.status === 'resolved');
                default:
                    return this.feedbacks;
            }
        }
    },

    mounted() {
        this.loadFeedbacks();
    },

    methods: {
        loadFeedbacks() {
            this.$store.dispatch("loadFeedbacksFromCache");
            this.feedbacks = this.$store.getters.getFeedbacks;
        },

        switchTab(index) {
            this.currentTab = index;
            uni.pageScrollTo({
                scrollTop: 0, // 滚动到页面顶部
                duration: 300 // 过渡时间，单位为毫秒
            });
        },

        getStatusClass(status) {
            switch (status) {
                case 'pending':
                    return 'status-pending';
                case 'resolved':
                    return 'status-resolved';
                default:
                    return '';
            }
        },

        getStatusText(status) {
            const statusMap = {
                pending: '待处理',
                resolved: '已处理',
            };
            return statusMap[status] || '未知状态';
        },





        goToDetail(item) {
            console.log(item);
            uni.navigateTo({
                url: `/userpages/submitFeedback/detail?id=${item.id}`
            });
        },
    },
};
</script>


<style scoped lang="scss">
/* 全局样式 */
.coupons-container {
    padding: 0;
    background-color: #f5f5f5;
    padding-bottom: 100rpx;
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

.tab-content {

    margin-top: 150rpx;
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

.empty-data {
    text-align: center;
    margin: 50rpx 0;
    color: #999;
    display: inline-block;
    width: 100%;
    font-size: 32rpx;
}

/* 优惠券卡片样式 */
.coupon-card {
    margin: 30rpx;
    border-radius: 20rpx;
    background-color: white;
    overflow: hidden;
    position: relative;
    box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.1);
}

.coupon-card {
    margin: 20rpx;
    background-color: #ffffff;
    border-radius: 16rpx;
    padding: 24rpx;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.description {
    font-size: 28rpx;
    color: #000000;
    font-weight: bold;
    line-height: 40rpx;
    display: block;
    /* 支持换行 */
    word-break: break-all;
    /* 自动换行 */
    margin-bottom: 20rpx;
}

.images-wrapper {
    padding: 10rpx 20rpx;
    display: flex;
    justify-content: flex-start;
    gap: 20rpx;
    align-items: center;
    flex-wrap: wrap;
}

.review-img {
    width: 170rpx;
    height: 170rpx;
    margin-right: 10rpx;
    border-radius: 10rpx;
}

.play {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40rpx;
    height: 40rpx;
}

.video-cover {
    width: 170rpx;
    height: 170rpx;
    position: relative;
    border-radius: 16rpx;
    overflow: hidden;
    background-color: #c1bfbf;
    display: flex;
    align-items: center;
    justify-content: center;
}

.cover-image {
    width: 100rpx !important;
    height: 100rpx !important;
}

.time-status {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 24rpx;
}

.submit-time {
    color: #adadad;
}

.status {
    font-weight: normal;
}

/* 动态状态样式 */
.status-processing {
    color: #f90;
    /* 处理中的颜色 */
}

.status-resolved {
    color: #ADADAD;
    /* 已解决的颜色 */
}

.status-pending {
    color: #fe7b18;
    /* 待处理的颜色 */
}
</style>