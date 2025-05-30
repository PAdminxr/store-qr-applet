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
                        <uni-icons :type="coupon.showRule ? 'up' : 'down'" size="14" color="#929292"></uni-icons>
                    </view>
                    <view class="coupon-use-btn" v-if="!coupon.isReceived">
                        <text @click="useCoupon(coupon)">领取</text>
                    </view>
                </view>
                <view class="status-image" v-if="coupon.isReceived">

                    <!-- #ifdef MP -->
                    <image src="https://north-ai-test-public1.oss-cn-beijing.aliyuncs.com/static/user/ylq.png">
                    </image>
                    <!-- #endif -->
                    <!-- #ifdef H5 -->
                    <img src="https://north-ai-test-public1.oss-cn-beijing.aliyuncs.com/static/user/ylq.png"
                        class="product-image-h5">
                    <!-- #endif -->
                </view>
                <!-- 展开的规则 -->
                <view class="coupon-rule-detail" v-if="coupon.showRule">
                    <view class="rule-content">{{ coupon.rule }}</view>
                </view>

            </view>
        </view>
        <!-- 领取成功弹框 -->
        <uni-popup ref="popup" type="center">
            <view class="popup-content">
                <text class="title">领取成功</text>
                <view>
                    <image src="https://north-ai-test-public1.oss-cn-beijing.aliyuncs.com/static/user/red-envelope.svg"
                        class="red-envelope"></image>
                </view>
                <view class="description">
                    优惠券已发放至您的账户<br />
                    可在“我的-我的优惠券”中查看
                </view>
                <view class="buttons">
                    <button class="btn-know" @click="closePopup">知道了</button>
                    <button class="btn-check" @click="goToCoupons">去查看</button>
                </view>
            </view>
            <view class="close-btn-modal" @click="closePopup">
                <uni-icons type="close" size="34" color="#fff" />
            </view>
        </uni-popup>
    </view>
</template>

<script>
import mockDATA from "@/utils/mock.js";
export default {
    data() {
        return {
            activeTab: "unused",
            // 模拟数据
            allCoupons: mockDATA.allCoupons,
            unusedCoupons: [], // 显示用的未领取的优惠券列表
            show: 0,
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
        // 弹窗操作
        openPopup() {
            this.$refs.popup.open();
        },
        closePopup() {
            uni.setStorageSync("newReceivedCoupon", false);
            this.$refs.popup.close();
        },
        goToCoupons() {
            this.closePopup();
            uni.navigateTo({
                url: "/userpages/couponInfo/index",
            });
        },
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

            this.show++;
            this.$store.dispatch("saveEnvelopeToCache", coupon);
            // uni.setStorageSync('newReceivedCoupon', true);// 标记新领取了优惠券
            //改变当前领取状态isReceived为true
            coupon.isReceived = true;
            if (this.show == 1) {
                this.openPopup();
            } else {
                uni.showToast({
                    title: '领取成功',
                    icon: 'none'
                });
            }


            // #ifdef MP
            // 小程序环境下使用 uni.navigateTo 进行页面跳转
            // uni.navigateBack();
            // #endif

            // #ifdef H5
            // H5 环境下使用 Vue Router 的 this.$router.push 方法进行页面跳转
            // this.$router.push({ path: `/qrcodePage` });
            // #endif
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

.status-image image,
.product-image-h5 {
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

.popup-content {
    background-color: white;
    padding: 50rpx;
    border-radius: 30rpx;
    text-align: center;

    .title {
        font-size: 40rpx;
        color: red;
        margin-bottom: 20rpx;
        font-weight: bold;
        display: inline-block;
    }

    .red-envelope {
        width: 200rpx;
        height: 200rpx;
        margin-bottom: 20rpx;
    }

    .description {
        font-size: 28rpx;
        color: #666;
        margin-bottom: 30rpx;
    }

    .buttons {
        display: flex;
        justify-content: space-around;
        gap: 20rpx;
    }

    .btn-know,
    .btn-check {
        width: 200rpx;
        height: 80rpx;
        line-height: 80rpx;
        border-radius: 40rpx;
        font-size: 32rpx;
    }

    .btn-know {
        border: 2rpx solid red;
        color: red;
        background-color: white;
    }

    .btn-check {
        background: linear-gradient(to bottom, #ff9100, #ff1b00);
        color: white;
    }
}

.close-btn-modal {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    width: 100%;
    padding-top: 20rpx;
}
</style>