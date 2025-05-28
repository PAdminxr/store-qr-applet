<template>
    <view class="kitchen-inspection-page">
        <!-- 商户信息区域 -->
        <view class="merchant-info-section">
            <text class="section-title">商户信息</text>
            <p class="info-item">
                <text class="label">名　　称</text>
                <text class="colon">：</text>
                <text class="value">{{ businessName }}</text>
            </p>
            <p class="info-item">
                <text class="label">地　　址</text>
                <text class="colon">：</text>
                <text class="value">{{ address }}</text>
            </p>
            <p class="info-item">
                <text class="label">负责人</text>
                <text class="colon">：</text>
                <text class="value">{{ contactPerson }}</text>
            </p>
        </view>

        <!-- 检查信息区域 -->
        <view class="inspection-info-section padding-section">
            <text class="section-title">检查信息</text>
            <p class="info-item">
                <text class="label">检查日期</text>
                <text class="colon">：</text>
                <text class="value">{{ inspectionDate }}</text>
            </p>
            <p class="info-item">
                <text class="label">检查人员</text>
                <text class="colon">：</text>
                <text class="value">{{ inspector }}</text>
            </p>
            <p class="info-item">
                <text class="label">卫生等级</text>
                <text class="colon">：</text>
                <text class="value">{{ healthRating }}</text>
            </p>
        </view>

        <!-- 厨房图片区域 -->
        <view class="kitchen-images-section">
            <view v-for="(image, index) in kitchenImages" :key="index" @click="previewImage(index)">
                <image :src="image" mode="aspectFill" class="kitchen-image"></image>
            </view>
        </view>

        <!-- 厨房视频区域 -->
        <view class="kitchen-video-section">
            <video src="https://north-ai-test-public1.oss-cn-beijing.aliyuncs.com/static/izaolife/4.mp4" controls
                class="kitchen-video"></video>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            businessName: '江北渔家',
            address: '枣庄市台儿庄区运河街道',
            contactPerson: '张经理',
            inspectionDate: '2025年3月10日',
            inspector: '李斯',
            healthRating: 'A级',
            kitchenImages: [
                'https://north-ai-test-public1.oss-cn-beijing.aliyuncs.com/static/izaolife/kitchen1.png',
                'https://north-ai-test-public1.oss-cn-beijing.aliyuncs.com/static/izaolife/kitchen2.png',
                'https://north-ai-test-public1.oss-cn-beijing.aliyuncs.com/static/izaolife/kitchen3.png'
            ],
            kitchenVideo: 'https://north-ai-test-public1.oss-cn-beijing.aliyuncs.com/static/izaozixun/1.mp4'
        };
    },
    methods: {
        goBack() {
            uni.navigateBack();
        },
        previewImage(index) {
            uni.previewImage({
                urls: this.kitchenImages,
                current: index
            })
        }
    }
};
</script>

<style scoped>
.kitchen-inspection-page {
    background-color: #ffffff;
    height: 100vh;
}

.merchant-info-section,
.inspection-info-section {
    padding: 40rpx 30rpx 30rpx 30rpx;
}

.section-title {
    font-size: 36rpx;
    font-weight: 400;
    margin-bottom: 20rpx;
    display: inline-block;
}

.padding-section {
    padding-top: 0rpx;
}

.info-item {
    display: flex;
    align-items: center;
    /* 垂直居中对齐 */
    font-size: 28rpx;
    color: #333;
    margin-bottom: 20rpx;
    /* 增加行间距 */
    line-height: 1.5;
    /* 设置行高，确保垂直居中 */
}

.info-item .label {
    width: 130rpx;
    /* 固定标签容器宽度 */
    text-align: justify;
    /* 文本两端对齐 */
    text-align-last: justify;
    /* 最后一行两端对齐 */
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

/* 修复部分浏览器对text-align-last的兼容性 */
.info-item .label:after {
    content: "";
    display: inline-block;
    width: 100%;
}

.info-item .colon {
    width: 30rpx;
    /* 固定冒号宽度 */
    text-align: center;
    font-weight: bold;
    vertical-align: middle;
    /* 垂直居中 */
}

.info-item .value {
    flex: 1;
    /* 值占据剩余空间 */
    vertical-align: middle;
    /* 垂直居中 */
}

.kitchen-images-section {
    padding: 20rpx 20rpx 0rpx 20rpx;
    background-color: white;
    margin-top: 20rpx;
    border-radius: 10rpx;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20rpx;
}

.kitchen-image {
    width: 100%;
    height: 200rpx;
    margin-bottom: 20rpx;
    border-radius: 10rpx;
}

.kitchen-video-section {
    padding: 0rpx 20rpx 20rpx 20rpx;
    background-color: white;
    border-radius: 10rpx;
}

.kitchen-video {
    width: 100%;
    height: 400rpx;
    border-radius: 10rpx;
}
</style>