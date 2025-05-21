<template>
    <view class="container">
        <view class="textarea-container">
            <textarea type="text" v-model="introduction" placeholder="介绍一下自己吧~" maxlength="100" />
            <text class="count">{{ introduction.length }}/100</text>
        </view>
        <view class="save-btn" @click="saveintroduction">保存</view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            introduction: '',

            userInfo: {}
        };
    },
    onLoad() {
        this.$store.dispatch('loadUserInfoFromCache');
        this.userInfo = this.$store.getters.getUserInfo;
        this.introduction = this.userInfo.introduction || '';

    },
    methods: {
        saveintroduction() {

            this.$store.dispatch('setUserInfo', {
                ...this.userInfo,
                introduction: this.introduction
            });

            uni.showToast({
                title: '简介保存成功',
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

.textarea-container {
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

textarea {
    flex: 1;
    border: none;
    font-size: 30rpx;
}

.count {
    color: #999;
    font-size: 24rpx;
    align-self: flex-end;
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