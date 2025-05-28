<template>
    <view class="container">
        <view class="user-info">
            <uni-list>
                <uni-list-item title="头像" link="navigateTo" :to="'/userpages/personalInfo/avatar'">
                    <template #footer>
                        <image class="avatar" :src="userInfo.avatarSrc" mode="aspectFill"></image>
                    </template>
                </uni-list-item>
                <uni-list-item title="昵称" :rightText="userInfo.nickName" link="navigateTo"
                    :to="'/userpages/personalInfo/editNickname'"></uni-list-item>
                <uni-list-item title="简介" :rightText="userInfo.introduction" link="navigateTo"
                    :to="'/userpages/personalInfo/editIntroduction'"></uni-list-item>
                <uni-list-item title="账号" :rightText="userInfo.phone">
                </uni-list-item>
            </uni-list>



            <view class="logout-btn" @click="showLogoutConfirm">
                <text class="logout-text">退出登录</text>
            </view>
            <view v-if="showConfirm" class="confirm-modal">
                <view class="modal-content">
                    <text class="modal-title">您确定要退出登录</text>
                    <view class="btn-container">
                        <view class="btn cancel-btn" @click="showConfirm = false">取消</view>
                        <view class="btn confirm-btn" @click="logout">确定</view>
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
            userInfo: {
                avatarSrc: "https://north-ai-test-public1.oss-cn-beijing.aliyuncs.com/static/images/avatar.png",
                nickName: "游客",
                introduction: "登录后查看个人介绍"
            },
            showConfirm: false,
            isLogin: false,
        };
    },
    onShow() {
        this.isLogin = uni.getStorageSync('isLogin');
        if (this.isLogin) {
            this.$store.dispatch("loadUserInfoFromCache");
            this.userInfo = this.getUserInfo();
        }
    },
    onLoad() {

        this.isLogin = uni.getStorageSync('isLogin');
        if (this.isLogin) {
            this.$store.dispatch("loadUserInfoFromCache");
            this.userInfo = this.getUserInfo()
        }
    },
    mounted() {
        // 判断用户是否登录
        const userInfo = uni.getStorageSync('userLoginInfo') || null;
        const isLogin = uni.getStorageSync('isLogin') || false;

        if (userInfo && isLogin) {
            this.$store.dispatch('setUserInfo', userInfo);
            this.$store.dispatch('setIsLogin', true);
        }
        this.isLogin = isLogin;

        if (this.isLogin) {
            // 获取用户信息
            this.userInfo = this.getUserInfo()
        }
        else {
            //回到我的页面
            uni.reLaunch({
                url: '/pages/user/index',
            })
        }
    },

    methods: {
        getUserInfo() {
            return this.$store.getters.getUserInfo || {};
        },

        showLogoutConfirm() {
            this.showConfirm = true;
        },
        logout() {

            this.showConfirm = false;
            this.$store.dispatch('clearUserInfo');
            this.$store.dispatch('setIsLogin', false);

            // 清除本地缓存
            uni.removeStorageSync('userLoginInfo');
            uni.removeStorageSync('isLogin');

            uni.showToast({ title: '已退出登录' });
            setTimeout(() => {
                uni.reLaunch({
                    url: '/pages/user/index',
                });
            }, 1000)
        },
    },
};
</script>

<style lang="scss" scoped>
.container {
    // padding: 20rpx;
    background-color: white;
    height: 100vh;
}

.user-info {
    padding: 20rpx;
}

.item {
    display: flex;
    align-items: center;
    padding: 15rpx 0;
    border-bottom: 1rpx solid #eee;
}

.label {
    width: 100rpx;
    color: #666;
}

.value {
    flex: 1;
    text-align: right;
    color: #333;
}

.chat-custom-right {
    flex: 1;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
}

.avatar {
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
    margin-left: auto;
}

.logout-btn {

    border: 2rpx solid #ff5722;
    border-radius: 10rpx;
    padding: 15rpx;
    position: absolute;
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 50px;
    margin: 0 40rpx;
}

.logout-text {

    color: #ff5722;
}

.confirm-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: white;
    border-radius: 20rpx;
    padding: 50rpx 100rpx;
    text-align: center;
}

.modal-title {
    font-size: 42rpx;
    margin-bottom: 40rpx;
    font-weight: 500;
    display: block;
}

.btn-container {
    display: flex;
    justify-content: space-around;
    margin-top: 20rpx;
    gap: 30rpx;
}

.btn {
    padding: 15rpx 80rpx;
    border-radius: 20rpx;
    font-size: 38rpx;
}

.cancel-btn {
    background-color: #FFF3EA;
    color: #FE7B18;
}

.confirm-btn {
    background-color: #ff5722;
    color: white;
}

::v-deep .uni-list-item__extra-text {
    color: #333;
    font-size: 28rpx;
}

::v-deep .uni-list-item__content-title {
    font-size: 24rpx;
    color: #999;
}
</style>