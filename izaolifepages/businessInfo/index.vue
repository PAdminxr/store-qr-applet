<template>
    <view class="business-info-page">

        <!-- 商户信息区域 -->
        <view class="info-section">
            <p class="info-item">
                <text class="label">商户名称</text>
                <text class="colon">：</text>
                <text class="value">{{ businessName }}</text>
            </p>
            <p class="info-item">
                <text class="label">地址</text>
                <text class="colon">：</text>
                <text class="value">{{ address }}</text>
            </p>
            <p class="info-item">
                <text class="label">营业时间</text>
                <text class="colon">：</text>
                <text class="value">{{ operatingHours }}</text>
            </p>
            <p class="info-item">
                <text class="label">联系人</text>
                <text class="colon">：</text>
                <text class="value">{{ contactPerson }}</text>
            </p>
            <p class="info-item">
                <text class="label">联系电话</text>
                <text class="colon">：</text>
                <text class="value">{{ phoneNumber }}</text>
            </p>
            <p class="info-item">
                <text class="label">营业执照</text>
                <text class="colon">：</text>
                <text class="value">{{ businessLicense }}</text>
            </p>
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
            licenseImage: 'https://north-ai-test-public1.oss-cn-beijing.aliyuncs.com/static/izaolife/license.png' // 替换为实际的营业执照图片路径
        };
    },
    methods: {
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
    display: flex;
    align-items: center;
    font-size: 28rpx;
    color: #333;
    margin-bottom: 20rpx;
}

.info-item .label {
    width: 130rpx;
    /* 固定标签容器宽度 */
    text-align: justify;
    /* 文本两端对齐 */
    text-align-last: justify;
    /* 最后一行也两端对齐 */
    overflow: hidden;
    /* 防止文本溢出 */
    text-overflow: clip;
    /* 文本溢出时裁剪 */
    box-sizing: border-box;
}

.info-item .colon {
    width: 30rpx;
    /* 固定冒号宽度 */
    text-align: center;
    font-weight: bold;
}

.info-item .value {
    flex: 1;
    /* 值占据剩余空间 */
    padding-left: 10rpx;
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