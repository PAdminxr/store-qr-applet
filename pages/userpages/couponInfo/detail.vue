<template>
    <view class="coupons-container">
        <!-- 优惠券 -->
        <view class="tab-content">
            <view class="coupon-card" v-for="(coupon, index) in unusedCoupons" :key="index">
                <view class="coupon-top">
                    <view class="coupon-info">
                        <view :class="!coupon.isReceived ? 'coupon-title' : 'coupon-title ylq'">{{ coupon.title }}
                        </view>
                        <view class="coupon-expire">

                            <text v-if="!coupon.isReceived" :style="{
                                color: coupon.isTodayExpired ? '#FF1B00' : '#767676',
                            }">
                                {{
                                    coupon.isTodayExpired
                                        ? "今日" + coupon.expire + "到期"
                                        : "有效期至" + coupon.validDate
                                }}
                            </text>
                            <text v-else class="ylq">
                                {{
                                    coupon.isTodayExpired
                                        ? "今日" + coupon.expire + "到期"
                                        : "有效期至" + coupon.validDate
                                }}
                            </text>

                        </view>
                    </view>
                    <view class="coupon-value">
                        <text :class="!coupon.isReceived ? 'amount' : 'amount ylq'"><text>¥</text>{{
                            coupon.amount }}</text>
                        <text :class="!coupon.isReceived ? 'condition' : 'condition ylq'">满{{
                            coupon.minAmount }}可用</text>
                    </view>
                </view>
                <view class="dashed-line"></view>
                <view class="coupon-bottom">
                    <view class="coupon-rules" @click="toggleRule(coupon)">
                        <text>红包使用规则</text>
                        <uni-icons :type="coupon.showRule ? 'down' : 'up'" size="14" color="#929292"></uni-icons>
                    </view>
                    <view class="coupon-use-btn" v-if="!coupon.isReceived">
                        <text @click="useCoupon(coupon)">领取</text>
                    </view>
                </view>
                <view class="status-image" v-if="coupon.isReceived">
                    <image src="/static/user/ylq.png"></image>
                </view>
                <!-- 展开的规则 -->
                <view class="coupon-rule-detail" v-if="coupon.showRule">
                    <view class="rule-content">{{ coupon.rule }}</view>
                </view>

            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            activeTab: "unused",
            // 模拟数据
            allCoupons: [
                {
                    id: 1,
                    title: "注册有礼",
                    amount: 20,
                    minAmount: 30,
                    isTodayExpired: true,
                    expire: "23:59",
                    validDate: "2025.05.12",
                    rule: "1. 本券仅限新用户首次下单使用；2. 不可与其他优惠同时使用；3. 有效期内使用有效。",
                    showRule: false,
                    isReceived: false, // 是否使用
                    type: 1,
                },
                {
                    id: 5,
                    title: "首次支付送优惠",
                    amount: 20,
                    minAmount: 30,
                    isTodayExpired: false,
                    validDate: "2025.06.12",
                    rule: "1. 本券仅限新用户首次下单使用；2. 不可与其他优惠同时使用；3. 有效期内使用有效。",
                    showRule: false,
                    isReceived: false, // 是否使用
                    type: 1,
                },
                {
                    id: 2,
                    title: "店铺红包",
                    amount: 35,
                    minAmount: 50,
                    isTodayExpired: false,
                    validDate: "2025.05.18",
                    rule: "1. 本券仅限指定店铺使用；2. 订单金额需满足最低使用门槛；3. 有效期内使用有效。",
                    showRule: false,
                    isReceived: false,
                    type: 2,
                },
                {
                    id: 3,
                    title: "酒店红包",
                    amount: 68,
                    minAmount: 200,
                    isTodayExpired: false,
                    validDate: "2025.05.20",
                    rule: "1. 本券仅限预订酒店使用；2. 需提前24小时预订；3. 有效期内使用有效。",
                    showRule: false,
                    isReceived: false,
                    type: 3,
                },
            ],
            unusedCoupons: [], // 显示用的未领取的优惠券列表
        };
    },
    computed: {

        receivedRedEnvelopes() {
            return this.$store.getters.getReceivedRedEnvelopes || [];
        },
    },


    mounted() {

        this.$store.dispatch("loadReceivedRedEnvelopesFromCache");

        this.filterUnreceivedCoupons();
    },
    methods: {
        filterUnreceivedCoupons() {
            const receivedIds = this.receivedRedEnvelopes.map((r) => r.id);

            // 先标记 isReceived
            this.unusedCoupons = this.allCoupons
                .map((coupon) => {
                    coupon.isReceived = receivedIds.includes(coupon.id);
                    return coupon;
                })
                // 再排序：未领取的在前，已领取的在后
                .sort((a, b) => {
                    return (a.isReceived === b.isReceived) ? 0 : a.isReceived ? 1 : -1;
                });
        },

        // 切换规则显示状态
        toggleRule(coupon) {
            coupon.showRule = !coupon.showRule;
        },
        useCoupon(coupon) {
            this.$store.dispatch("saveEnvelopeToCache", coupon);
            uni.setStorageSync('newReceivedCoupon', true);// 标记新领取了优惠券
            uni.navigateBack();
        },
    },
};
</script>

<style scoped lang="scss">
/* 全局样式 */
.coupons-container {
    padding-bottom: 100rpx;
    background-color: #f5f5f5;

}


/* 优惠券卡片样式 */
.coupon-card {
    margin: 30rpx;
    border-radius: 20rpx;
    background-color: white;
    overflow: hidden;
    position: relative;
    box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.1);
}

.coupon-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 30rpx;
}

.coupon-info {
    max-width: 60%;
}

.coupon-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #000000;
    margin-bottom: 16rpx;
}

.coupon-expire {
    font-size: 24rpx;
}

.coupon-value {
    text-align: right;
}

.coupon-value .amount {
    font-size: 50rpx;
    font-weight: bold;
    color: #ff1b00;
    display: block;
    letter-spacing: 2rpx;
    text-align: left;
}

.coupon-value .amount text {
    font-size: 30rpx;
}

.coupon-value .condition {
    font-size: 24rpx;
    color: #ff1b00;
}

.dashed-line {
    height: 2rpx;
    background-image: repeating-linear-gradient(90deg,
            #e5e5e5,
            #e5e5e5 4px,
            transparent 4px,
            transparent 8px);
    width: 92%;
    margin: 0 auto;
}

.coupon-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx 30rpx;
}

.coupon-rules {
    display: flex;
    align-items: center;
    color: #929292;
    font-size: 24rpx;
}

.coupon-rules uni-icons {
    margin-left: 10rpx;
}

.coupon-use-btn text {
    background-color: #ff1b00;
    border-radius: 10rpx;
    color: white;
    border: none;
    border-radius: 20rpx;
    padding: 12rpx 30rpx;
    font-size: 24rpx;
    display: inline-block;
}

.status-image {
    position: absolute;
    right: 0;
    top: 120rpx;
    width: 120rpx;
    height: 120rpx;
}

.status-image image {
    width: 100%;
    height: 100%;
}

/* 展开的规则样式 */
.coupon-rule-detail {
    padding: 20rpx 30rpx;
    background-color: #f8f8f8;
    border-top: 2rpx solid #e5e5e5;
}

.rule-content {
    font-size: 24rpx;
    color: #666;
    line-height: 1.6;
}

.ylq {
    color: #929292 !important;
}
</style>