<template>
    <view class="payment-result-container">
        <view class="result-box">
            <view class="result-icon">
                <view v-if="result === 'success'">
                    <uni-icons type="checkbox-filled" size="58" color="#4CAF50"></uni-icons>
                </view>
                <view v-else>
                    <uni-icons type="clear" size="58" color="#F44336"></uni-icons>
                </view>
            </view>
            <view class="result-title">
                <text>{{ result === 'success' ? '发布成功' : '发布失败' }}</text>
            </view>
            <view class="result-desc">
                <text v-if="result === 'success'">您可以在“我的-我的评价”中查看评价信息~</text>
                <text v-else>发布过程中好像遇到了问题</text>
            </view>

            <view class="result-info">
                <view v-if="result === 'success'" class="result-buttons">
                    <button type="default" @click="goHome">返回首页</button>
                    <button type="primary" @click="goEvaluate">查看评价</button>
                </view>
                <view v-else class="result-buttons">

                    <button type="default" @click="cancelOrder">返回首页</button>
                    <button type="primary" @click="retryPayment">重试</button>
                </view>

            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            result: 'success',

        };
    },
    mounted() {
        // 随机设置支付结果
        // this.result = Math.random() < 0.5 ? 'success' : 'failure';

    },
    methods: {
        goHome() {
            // 这里可替换为实际返回首页的逻辑，如uni.switchTab等
            console.log('返回首页');
            uni.switchTab({
                url: '/pages/izaolife/index'
            });
        },
        cancelOrder() {
            // 这里可替换为实际取消订单的逻辑，如调用接口等
            console.log('取消订单');
            uni.showToast({
                title: '订单已取消',
                icon: 'none',
                duration: 2000,
            })
            //返回过2秒
            setTimeout(() => {
                uni.switchTab({
                    url: '/pages/izaolife/index'
                });
            }, 2000);


        },
        retryPayment() {
            // 这里可替换为实际继续支付的逻辑，如唤起支付界面等
            console.log('继续支付');
            //返回
            uni.navigateBack({
                delta: 1
            });
        },
        goEvaluate() {
            // 这里可替换为实际去评价的逻辑，如跳转到评价页面等
            console.log('去评价');
            uni.navigateTo({
                url: `/pages/userpages/evaluation/index?tab=1`
            })
        }
    }
};
</script>

<style scoped lang="scss">
.payment-result-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
    overflow: hidden;
    margin-top: 40rpx;
}

.result-box {
    background-color: white;
    padding: 100rpx 20rpx 20rpx 20rpx;
    border-radius: 20rpx;
    box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 90%;
    height: 100vh;

}

.result-icon {
    margin-bottom: 40rpx;
}

.result-title {
    font-size: 40rpx;
    font-weight: bold;
    margin-bottom: 20rpx;
}

.result-desc {
    font-size: 20rpx;
    color: #666;
    margin-bottom: 40rpx;
}


.result-info {
    margin-top: 100rpx;
}

.result-buttons {
    display: flex;
    justify-content: space-between;
}

.result-buttons button {
    padding: 10rpx 40rpx;
    border-radius: 10rpx;
    font-size: 30rpx;
    min-width: 200rpx;
}

.result-buttons button[type="default"] {
    background-color: #f5f5f5;
    color: #333;
    font-weight: 500;
    border: none;
}

.result-buttons button[type="primary"] {
    background-color: #FE7B18;
    color: white;
    border: none;
}

.result-buttons button[type="primary"]:after {
    border: none;
}

.result-buttons button[type="default"]:after {
    border: none;
}
</style>