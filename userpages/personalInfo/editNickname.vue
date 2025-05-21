<template>
    <view class="container">
        <view class="input-container">
            <input type="text" v-model="nickname" placeholder="修改你的昵称吧~" maxlength="24" />
            <text class="count">{{ nickname.length }}/24</text>
        </view>
        <view class="save-btn" @click="saveNickname">保存</view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            nickname: '',

            userInfo: {}
        };
    },
    onLoad() {
        // 获取用户昵称并设置到页面上
        this.$store.dispatch('loadUserInfoFromCache');
        this.userInfo = this.$store.getters.getUserInfo;
        this.nickname = this.userInfo.nickName || '';

    },
    methods: {
        saveNickname() {

            this.$store.dispatch('setUserInfo', {
                ...this.userInfo,
                nickName: this.nickname
            });

            uni.showToast({
                title: '昵称保存成功',
                icon: 'success',
                duration: 2000
            })
            setTimeout(() => {
                uni.navigateBack();
            }, 2000)

        }
    }
};
</script>

<style lang="scss" scoped>
.container {
    padding: 30rpx;

}

.input-container {
    border: 1rpx solid #eee;
    border-radius: 15rpx;
    padding: 15rpx;
    margin-bottom: 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    min-height: 88rpx;

}

input {
    flex: 1;
    border: none;
    font-size: 30rpx;
}

.count {
    color: #999;
    font-size: 24rpx;
}

.save-btn {
    background-color: #FE7B18;
    color: white;
    padding: 15rpx 30rpx;
    border-radius: 5rpx;
    font-size: 30rpx;
    border-radius: 15rpx;
    padding: 10rpx;
    min-height: 70rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>