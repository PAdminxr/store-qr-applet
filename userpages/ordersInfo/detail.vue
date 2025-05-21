<template>
    <view class="payment-result-container">
        <view class="result-box">
            <view class="result-icon">
                <image class="shop-icon" :src="orderInfo.shopImage"></image>
            </view>
            <view class="result-title">
                <text>{{ orderInfo.shopName }}</text>
            </view>
            <view class="result-desc">
                <text>-{{ orderInfo.amount }}</text>
            </view>
            <view class="order-info">
                <view class="order-info-item">
                    <view class="info-item">
                        <text>当前状态</text>
                        <text>{{ orderInfo.status }}</text>
                    </view>
                    <view class="info-item">
                        <text>收款方备注</text>
                        <text>{{ orderInfo.remark }}</text>
                    </view>
                    <view class="info-item">
                        <text>支付方式</text>
                        <text>{{ orderInfo.paymentMethod }}</text>
                    </view>
                    <view class="info-item">
                        <text>交易时间</text>
                        <text>{{ orderInfo.tradeTime }}</text>
                    </view>
                    <view class="info-item">
                        <text>交易单号</text>
                        <text>{{ orderInfo.tradeNo }}</text>
                    </view>
                </view>

            </view>
            <view class="result-info">
                <view class="result-buttons">
                    <button type="default" @click="gosubmitFeedback">投诉反馈</button>
                    <button type="primary" @click="goEvaluate">订单评价</button>
                </view>


            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            orderId: '',
            orderInfo: {

            }
        };
    },
    onLoad(options) {
        if (options.orderId) {
            this.orderId = parseInt(options.orderId);
        }
        this.getOrderInfo();
    },
    mounted() {
        // 随机设置支付结果
        // this.result = Math.random() < 0.5 ? 'success' : 'failure';
    },
    methods: {
        getOrderInfo() {
            this.orderInfo = this.$store.getters.getOrders.find(item => item.orderId === this.orderId);

        },
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
        gosubmitFeedback() {
            if (this.orderInfo.feedbacks) {
                uni.navigateTo({
                    url: `/userpages/submitFeedback/detail?orderId=${this.orderId}`
                });
            } else {
                uni.navigateTo({
                    url: `/userpages/submitFeedback/index?orderId=${this.orderId}`
                });
            }

        },
        goEvaluate() {
            //判断订单状态是否已经进行评价
            if (this.orderInfo.evaluation) {
                uni.navigateTo({
                    url: `/userpages/evaluation/index?tab=1`
                })
            } else {
                uni.navigateTo({
                    url: `/userpages/evaluation/create?orderId=${this.orderId}`
                })
            }


        }
    }
};
</script>

<style scoped lang="scss">
.payment-result-container {

    height: 100vh;
    background-color: #ffffff;
    overflow: hidden;
    width: 100%;
}

.result-box {

    padding: 100rpx 20rpx 20rpx 20rpx;
    border-radius: 20rpx;

    text-align: center;



}

.result-icon {
    margin-bottom: 40rpx;
}

.shop-icon {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50rpx;
}

.result-title {
    font-size: 30rpx;
    font-weight: bold;
    margin-bottom: 20rpx;
}

.result-desc {
    font-size: 60rpx;
    font-weight: 400;
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
    padding-left: 100rpx;

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
    color: #000;
    font-weight: 500;
    padding-left: 60rpx;
    text-align: left;
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