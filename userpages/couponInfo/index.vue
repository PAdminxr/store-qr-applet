<template>
    <view class="coupons-container">
        <!-- Tab栏 -->
        <view class="tab-bar">
            <view v-for="(tab, index) in tabs" :key="index" :class="['tab-item', { active: currentTab === index }]"
                @click="switchTab(index)">
                {{ tab }}
            </view>
        </view>

        <!-- 未使用优惠券 -->
        <view class="tab-content" v-if="currentTab === 0">
            <view v-if="unusedCoupons.length === 0">
                <text class="empty-data">暂无数据</text>
            </view>
            <view v-else class="coupon-card" v-for="(coupon, index) in unusedCoupons" :key="index">
                <view class="coupon-top">
                    <view class="coupon-info">
                        <view class="coupon-title">{{ coupon.title }}</view>
                        <view class="coupon-expire">
                            <text :style="{ color: coupon.isTodayExpired ? '#FF1B00' : '#767676' }">
                                {{ coupon.isTodayExpired ? '今日' + coupon.expire + '到期' : '有效期至' + coupon.validDate
                                }}
                            </text>
                        </view>
                    </view>
                    <view class="coupon-value">
                        <text class="amount"><text>¥</text>{{ coupon.amount }}</text>
                        <text class="condition">满{{ coupon.minAmount }}可用</text>
                    </view>
                </view>
                <view class="dashed-line"></view>
                <view class="coupon-bottom">
                    <view class="coupon-rules" @click="toggleRule(coupon)">
                        <text>红包使用规则</text>
                        <uni-icons :type="coupon.showRule ? 'up' : 'down'" size="28rpx" color="#929292"></uni-icons>
                    </view>
                    <view class="coupon-use-btn">

                        <text @click="useCoupon(coupon)">去使用</text>
                    </view>
                </view>
                <!-- 展开的规则 -->
                <view class="coupon-rule-detail" v-if="coupon.showRule">
                    <view class="rule-content">{{ coupon.rule }}</view>
                </view>
            </view>
        </view>



        <!-- 已使用优惠券 -->

        <view class="tab-content" v-else-if="currentTab === 1">
            <view v-if="usedCoupons.length === 0">
                <text class="empty-data">暂无数据</text>
            </view>
            <view v-else class="coupon-card used" v-for="(coupon, index) in usedCoupons" :key="index">
                <view class="coupon-top">
                    <view class="coupon-info">
                        <view class="coupon-title">{{ coupon.title }}</view>
                        <view class="coupon-expire">
                            <text>有效期至{{ coupon.validDate }}</text>
                        </view>
                    </view>
                    <view class="coupon-value">
                        <text class="amount"><text>¥</text>{{ coupon.amount }}</text>
                        <text class="condition">满{{ coupon.minAmount }}可用</text>
                    </view>
                </view>
                <view class="dashed-line"></view>
                <view class="coupon-bottom">
                    <view class="coupon-rules" @click="toggleRule(coupon)">
                        <text>红包使用规则</text>
                        <uni-icons :type="coupon.showRule ? 'up' : 'down'" size="28rpx" color='#929292'></uni-icons>
                    </view>

                </view>
                <!-- 已使用图片 -->
                <view class="status-image">
                    <image
                        src="https://cdn.jsdelivr.net/gh/PAdminxr/store-qr-applet@main/static/user/img-yishiyong.png">
                    </image>
                </view>
                <!-- 展开的规则 -->
                <view class="coupon-rule-detail" v-if="coupon.showRule">
                    <view class="rule-content">{{ coupon.rule }}</view>
                </view>

            </view>
        </view>

        <!-- 已过期优惠券 -->
        <view class="tab-content" v-else-if="currentTab === 2">
            <view class="coupon-card expired" v-for="(coupon, index) in expiredCoupons" :key="index">
                <view class="coupon-top">
                    <view class="coupon-info">
                        <view class="coupon-title">{{ coupon.title }}</view>
                        <view class="coupon-expire">
                            <text>有效期至{{ coupon.validDate }}</text>
                        </view>
                    </view>
                    <view class="coupon-value">
                        <text class="amount"><text>¥</text>{{ coupon.amount }}</text>
                        <text class="condition">满{{ coupon.minAmount }}可用</text>
                    </view>
                </view>
                <view class="dashed-line"></view>
                <view class="coupon-bottom">
                    <view class="coupon-rules" @click="toggleRule(coupon)">
                        <text>红包使用规则</text>
                        <uni-icons :type="coupon.showRule ? 'up' : 'down'" size="28rpx" color='#929292'></uni-icons>
                    </view>

                </view>
                <!-- 已过期图片 -->
                <view class="status-image">
                    <image
                        src="https://cdn.jsdelivr.net/gh/PAdminxr/store-qr-applet@main/static/user/img-yiguoqi.png" />
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

            currentTab: 0,
            tabs: ['未使用', '已使用', '已过期'],


            expiredCoupons: [
                {
                    title: '节日优惠券',
                    amount: 50,
                    minAmount: 100,
                    validDate: '2025.04.30',
                    rule: '1. 本券已过期，无法使用；2. 订单金额需满足最低使用门槛。',
                    showRule: false
                },
                {
                    title: '会员专享券',
                    amount: 30,
                    minAmount: 80,
                    validDate: '2025.04.25',
                    rule: '1. 本券已过期，无法使用；2. 仅限会员使用。',
                    showRule: false
                }
            ],
            unusedCoupons: [

            ],
            usedCoupons: [

            ]
        };
    },

    mounted() {
        this.$store.dispatch("loadReceivedRedEnvelopesFromCache");
        this.filterUnreceivedCoupons();
    },
    methods: {
        filterUnreceivedCoupons() {

            this.unusedCoupons = this.$store.getters.getReceivedRedEnvelopes.filter((r) => !r.isReceived)
            this.usedCoupons = this.$store.getters.getReceivedRedEnvelopes.filter((r) => r.isReceived)



        },

        // 切换Tab
        switchTab(index) {
            this.currentTab = index;
            uni.pageScrollTo({
                scrollTop: 0, // 滚动到页面顶部
                duration: 300 // 过渡时间，单位为毫秒
            });

        },

        // 切换规则显示状态
        toggleRule(coupon) {
            coupon.showRule = !coupon.showRule;
        },

        // 使用优惠券
        useCoupon(coupon) {
            console.log(coupon);
            const that = this;
            //询问用户是否使用
            uni.showModal({
                title: '提示：未接入商家，模拟使用优惠卷后的红包列表效果',
                content: '确定使用该优惠券吗？',
                success: (res) => {
                    if (res.confirm) {
                        uni.showLoading({
                            title: '使用中...',
                            mask: true
                        })
                        // 模拟接口调用
                        setTimeout(() => {
                            uni.hideLoading();
                            uni.showToast({
                                title: '优惠券使用成功',
                                icon: 'success',
                                duration: 2000
                            });

                            // 模拟将优惠券移至已使用列表

                            that.$store.dispatch("updateReceivedRedEnvelopesStatus", {
                                id: coupon.id,
                                field: 'isReceived',
                                value: true
                            });
                            that.filterUnreceivedCoupons();
                        }, 1500);
                    }
                }
            })








        }
    }
};
</script>

<style scoped lang="scss">
/* 全局样式 */
.coupons-container {
    padding-bottom: 100rpx;
    background-color: #f5f5f5;

}



/* Tab栏样式 */

.tab-bar {
    display: flex;
    background-color: white;
    border-bottom: 2rpx solid #e5e5e5;
    gap: 40rpx;
    padding: 40rpx 40rpx 20rpx 40rpx;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 20;
}

.tab-item {
    position: relative;
    padding: 10rpx 20rpx;
    font-size: 32rpx;
    color: #929292;
    transition: all 0.3s ease;
}

.tab-item.active {
    color: #000000;
    font-weight: bold;
}

.tab-item.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
    height: 8rpx;
    background-color: #020202;
    border-radius: 20rpx;
}

.tab-content {
    margin-top: 150rpx;
}

.empty-data {
    text-align: center;
    margin: 50rpx 0;
    color: #999;
    display: inline-block;
    width: 100%;
    font-size: 32rpx;
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

.no-coupons {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 200rpx;
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
    color: #FF1B00;
    display: block;
    letter-spacing: 2rpx;
    text-align: left;
}

.coupon-value .amount text {
    font-size: 30rpx;
}

.coupon-value .condition {
    font-size: 24rpx;
    color: #FF1B00;
}

.dashed-line {
    height: 2rpx;
    background-image: repeating-linear-gradient(90deg, #e5e5e5, #e5e5e5 4px, transparent 4px, transparent 8px);
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
    background-color: #FF1B00;
    border-radius: 10rpx;
    color: white;
    border: none;
    border-radius: 20rpx;
    padding: 12rpx 30rpx;
    font-size: 24rpx;
    display: inline-block;
}

/* 已使用/已过期状态样式 */
.coupon-card.used,
.coupon-card.expired {
    opacity: 0.7;
}

.coupon-card.used .coupon-title,
.coupon-card.expired .coupon-title,
.coupon-card.used .coupon-value .amount,
.coupon-card.expired .coupon-value .amount,
.coupon-card.used .coupon-value .condition,
.coupon-card.expired .coupon-value .condition,
.coupon-card.used .coupon-expire text,
.coupon-card.expired .coupon-expire text {
    color: #929292;
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
</style>