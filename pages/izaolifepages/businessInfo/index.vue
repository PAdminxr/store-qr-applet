<template>
    <view class="business-info-page">

        <!-- 商户信息区域 -->
        <view class="info-section">
            <p class="info-item"><text>商户名称：</text>{{ businessName }}</p>
            <p class="info-item "><text class="ltext2">地&nbsp;&nbsp;&nbsp;&nbsp;址&nbsp;&nbsp;：</text>{{ address }}</p>
            <p class="info-item"><text>营业时间：</text>{{ operatingHours }}</p>
            <p class="info-item"><text class="ltext">联&nbsp;系&nbsp;人&nbsp;：</text>{{ contactPerson }}</p>
            <p class="info-item"><text>联系电话：</text>{{ phoneNumber }}</p>
            <p class="info-item"><text>营业执照：</text>{{ businessLicense }}</p>

        </view>

        <!-- 营业执照图片区域 -->
        <view class="license-section" @click="previewImage">
            <view class="license-image">
                <image :src="licenseImage" class="image"></image>
            </view>
            <!-- 提示信息 -->
            <view class="note-section">
                <text class="note-text">本信息仅供参考，实际情况以商家现场为准</text>
            </view>
        </view>



    </view>
</template>

<script>
export default {
    data() {
        return {
            businessName: '江北渔家',
            address: '枣庄市台儿庄区运河街道',
            operatingHours: '09:00-23:00',
            contactPerson: '张经理',
            phoneNumber: '+86-21-12345678',
            businessLicense: '1234 5678 9101',
            licenseImage: '/static/izaolife/license.png' // 替换为实际的营业执照图片路径
        };
    },
    methods: {
        goBack() {
            uni.navigateBack();
        },
        previewImage() {
            uni.previewImage({
                urls: [this.licenseImage],
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
.business-info-page {
    background-color: white;
    height: 100vh;
}

.info-section {
    padding: 50rpx 30rpx 30rpx 30rpx;

}

.info-item {
    display: grid;
    grid-template-columns: 150rpx 1fr;
    font-size: 28rpx;
    color: #333;
    margin-bottom: 10rpx;

}

.info-item text {
    text-align: right;
    letter-spacing: 3rpx;
}

.license-section {
    padding: 20rpx;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background: white;
}

.license-image {
    width: 80%;
    height: 800rpx;

}

.license-image .image {
    width: 100%;
    height: 100%;
    border-radius: 10rpx;
    // border: 1px dashed #ccc;
}

.note-section {
    padding: 20rpx;
    margin-top: 20rpx;
    text-align: center;
}

.note-text {
    font-size: 28rpx;
    color: #ADADAD;
}
</style>