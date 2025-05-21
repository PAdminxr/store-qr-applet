<template>
    <view class="page-container">
        <view class="image-container" @click="showBigImage">
            <image class="health-certificate" :src="imageSrc"></image>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            imageSrc: 'https://cdn.jsdelivr.net/gh/PAdminxr/store-qr-applet@main/static/izaolife/health.png'
        };
    },
    methods: {
        showBigImage() {

            uni.previewImage({
                urls: [this.imageSrc],
                success: () => {
                    console.log('预览成功');
                },
                fail: (err) => {
                    console.error('预览失败:', err);
                    uni.showToast({
                        title: '图片预览失败，请检查路径',
                        icon: 'none'
                    });
                }
            });
        }


    }
};
</script>

<style scoped lang="scss">
.page-container {
    padding: 20rpx;
    height: 100vh;
    background-color: #f4f4f4;
}

.image-container {
    width: 100%;
    height: 400rpx;
    max-width: 600px;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.health-certificate {
    width: 100%;
    height: 100%;
}
</style>