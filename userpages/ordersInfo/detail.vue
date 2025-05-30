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
                    <view class="info-item" v-for="(value, key) in orderDetails" :key="key">
                        <text class="label">{{ key }}</text>
                        <text class="content">{{ value }}</text>
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
            orderInfo: {}
        };
    },
    computed: {
        orderDetails() {
            return {
                '当前状态': this.orderInfo.status || '',
                '收款方备注': this.orderInfo.remark || '',
                '支付方式': this.orderInfo.paymentMethod || '',
                '交易时间': this.orderInfo.tradeTime || '',
                '交易单号': this.orderInfo.tradeNo || ''
            };
        }
    },
    onLoad(options) {
        if (options.orderId) {
            this.orderId = parseInt(options.orderId);
        }
        this.getOrderInfo();
    },
    methods: {
        getOrderInfo() {
            this.orderInfo = this.$store.getters.getOrders.find(item => item.orderId === this.orderId);
        },
        gosubmitFeedback() {
            uni.navigateTo({
                url: `/userpages/submitFeedback/index?orderId=${this.orderId}`
            });
        },
        goEvaluate() {
            if (this.orderInfo.evaluation) {
                uni.navigateTo({
                    url: `/userpages/evaluation/index?tab=1`
                });
            } else {
                uni.navigateTo({
                    url: `/userpages/evaluation/create?orderId=${this.orderId}`
                });
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
    align-items: stretch;
    gap: 10rpx;
    width: 80%;
    padding-left: 100rpx;
}

.info-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 20rpx;
    font-size: 24rpx;
    color: #666;
}

.label {
    min-width: 140rpx;
    color: #666;
    font-weight: 400;
    flex-shrink: 0;
    display: flex;
    justify-content: flex-end;
}

.content {
    color: #000;
    font-weight: 500;
    word-break: break-all;
    white-space: normal;
    padding-left: 60rpx;
    text-align: left;
}

.result-info {
    padding-top: 100rpx;
    width: 80%;
    margin: 0 auto;
}

.result-buttons {
    display: flex;
    justify-content: space-between;
}

.result-buttons button {
    padding: 0 60rpx;
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