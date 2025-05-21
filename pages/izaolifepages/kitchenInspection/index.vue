<template>
    <view class="kitchen-inspection-page">
        <!-- 商户信息区域 -->

        <view class="merchant-info-section">
            <text class="section-title">商户信息</text>
            <p class="info-item2"><text>名&nbsp;称：</text>{{ businessName }}</p>
            <p class="info-item2"><text>地&nbsp;址：</text>{{ address }}</p>
            <p class="info-item2"><text>负责人：</text>{{ contactPerson }}</p>

        </view>

        <!-- 检查信息区域 -->
        <view class="inspection-info-section padding-section">
            <text class="section-title">检查信息</text>
            <p class="info-item"><text>检查日期：</text>{{ inspectionDate }}</p>
            <p class="info-item"><text>检查人员：</text>{{ inspector }}</p>
            <p class="info-item"><text>卫生等级：</text>{{ healthRating }}</p>

        </view>

        <!-- 厨房图片区域 -->
        <view class="kitchen-images-section">

            <view v-for="(image, index) in kitchenImages" :key="index" @click="previewImage(index)">
                <image :src="image" mode="aspectFill" class="kitchen-image"></image>
            </view>

        </view>

        <!-- 厨房视频区域 -->
        <view class="kitchen-video-section">
            <video :src="kitchenVideo" controls class="kitchen-video"></video>
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
                '/static/izaolife/kitchen1.png', // 替换为实际的厨房图片路径
                '/static/izaolife/kitchen2.png',
                '/static/izaolife/kitchen3.png'
            ],
            kitchenVideo: '/static/izaozixun/1.mp4' // 替换为实际的厨房视频路径
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

.info-item2 {
    display: grid;
    grid-template-columns: 120rpx 1fr;
    font-size: 28rpx;
    color: #333;
    margin-bottom: 10rpx;
}

.info-item {
    display: grid;
    grid-template-columns: 150rpx 1fr;
    font-size: 28rpx;
    color: #333;
    margin-bottom: 10rpx;

}

.info-item text,
.info-item2 text {
    text-align: right;
    letter-spacing: 3rpx;
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
    /* border: 1px dashed #ccc; */
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
    /* border: 1px dashed #ccc; */
}
</style>