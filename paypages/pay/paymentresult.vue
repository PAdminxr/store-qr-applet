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
                <text>{{ result === 'success' ? '支付成功' : '支付失败' }}</text>
            </view>
            <view class="result-desc">
                <text v-if="result === 'success'">感谢您的购买，欢迎下次光临~</text>
                <text v-else>好像遇到了问题</text>
            </view>
            <view v-if="result === 'failure'" class="order-info">
                <view class="order-info-item">
                    <view class="info-item">
                        <text>商户名称</text>
                        <text>{{ orderInfo.merchantName }}</text>
                    </view>
                    <view class="info-item">
                        <text>订单金额</text>
                        <text>{{ orderInfo.amount }}</text>
                    </view>
                    <view class="info-item">
                        <text>订单编号</text>
                        <text>{{ orderInfo.orderNo }}</text>
                    </view>
                    <view class="info-item">
                        <text>交易单号</text>
                        <text>{{ orderInfo.tradeNo }}</text>
                    </view>
                    <view class="info-item">
                        <text>订单信息</text>
                        <text>{{ orderInfo.info }}</text>
                    </view>
                </view>

            </view>
            <view class="result-info">
                <view v-if="result === 'success'" class="result-buttons">
                    <button type="default" @click="goHome">返回首页</button>
                    <button type="primary" @click="goEvaluate">去评价</button>
                </view>
                <view v-else class="result-buttons">

                    <button type="default" @click="cancelOrder">取消订单</button>
                    <button type="primary" @click="retryPayment">继续支付</button>
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
            orderInfo: {
                merchantName: '江北渔家（古城店）',
                amount: '759元',
                orderNo: '123456789',
                tradeNo: '123456789',
                info: '',
            }
        };
    },
    onLoad(options) {
        if (options.orderId) {
            this.orderId = parseInt(options.orderId);
        }
    },
    mounted() {
        // 随机设置支付结果
        // this.result = Math.random() < 0.5 ? 'success' : 'failure';
    },
    methods: {
        goHome() {
            console.log('返回首页');
            uni.switchTab({
                url: '/pages/izaolife/index'
            });
        },
        cancelOrder() {
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

            console.log('继续支付');

            uni.navigateBack({
                delta: 1
            });
        },
        goEvaluate() {
            //增加订单id
            uni.navigateTo({
                url: `/userpages/evaluation/create?orderId=${this.orderId}`
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

.order-info {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10rpx;
}

.order-info-item {
    padding: 30rpx;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10rpx;
    width: 80%;

}

.info-item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 20rpx;
    font-size: 24rpx;
    color: #666;
}

.info-item text {
    display: inline-block;
}

.info-item text:last-child {
    color: #333;
    font-weight: bold;
    padding-left: 30rpx;
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