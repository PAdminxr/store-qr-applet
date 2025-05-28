<template>
    <view class="container">
        <view class="avatar-section">
            <image :src="avatarSrc || defaultAvatar" class="avatar" @click="chooseAvatar"></image>
            <text class="change-text" @click="chooseAvatar">点击更换头像</text>
        </view>


        <view class="tips">
            请从相册中选择或拍摄照片，更新您的头像。
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            defaultAvatar: 'https://north-ai-test-public1.oss-cn-beijing.aliyuncs.com/static/images/avatar.png',
            avatarSrc: '',

        };
    },
    onLoad() {
        this.$store.dispatch('loadUserInfoFromCache');
        const userInfo = this.$store.getters.getUserInfo;
        this.defaultAvatar = userInfo?.avatarSrc || '';
    },
    methods: {
        // 选择头像
        chooseAvatar() {
            uni.chooseImage({
                count: 1,
                sizeType: ['compressed'],
                sourceType: ['album', 'camera'],
                success: (res) => {
                    const tempFilePath = res.tempFilePaths[0];
                    const newAvatar = tempFilePath;
                    this.$store.dispatch('setUserInfo', {
                        ...this.$store.getters.getUserInfo,
                        avatarSrc: newAvatar
                    });

                    // 更新当前页面显示
                    this.avatarSrc = newAvatar;
                    setTimeout(() => {
                        uni.showToast({ title: '头像更新成功' });
                    }, 500)
                    setTimeout(() => {
                        uni.navigateBack();
                    }, 2000)

                },
                fail: (err) => {

                }
            });
        }
    }
};
</script>

<style scoped>
.container {
    padding: 40rpx;
}

.avatar-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 60rpx;
}

.avatar {
    width: 180rpx;
    height: 180rpx;
    border-radius: 90rpx;
    background-color: #eee;
}

.change-text {
    margin-top: 20rpx;
    color: #007AFF;
    font-size: 28rpx;
}

.tips {
    margin-top: 40rpx;
    text-align: center;
    color: #999;
    font-size: 26rpx;
}
</style>