<template>
    <!-- 红包轮播组件 -->
    <view class="hongbao-wrapper">
        <!-- 垂直滚动容器 -->
        <swiper class="hongbao-swiper" :vertical="true" :autoplay="autoplay" :interval="interval" :circular="circular"
            :disable-touch="disableTouch">
            <swiper-item v-for="(item, index) in hongbaoList" :key="index">
                <view class="hongbao-item">
                    <view class="hongbao">
                        <view class="hongbao-content">
                            <view class="flex-row">
                                <image :src="src" mode="aspectFit" class="hongbao-icon"></image>
                                <view class="hongbao-text">
                                    <text class="hongbao-amount">{{ item.amount }}元</text>
                                    <text class="hongbao-desc">红包待领取</text>
                                </view>
                                <text class="hongbao-expire" v-if="item.expireTimes">{{ formatTime(item.expireTime)
                                }}后失效</text>
                                <text class="hongbao-expire" v-else>{{ item.expireTime }}</text>
                            </view>

                            <view class="hongbao-action" @click="useCoupon(index)">
                                <text class="hongbao-btn">去领取</text>
                            </view>
                        </view>
                    </view>
                </view>
            </swiper-item>
        </swiper>
    </view>
</template>

<script>
export default {
    name: 'HongbaoCarousel',
    props: {
        hongbaoList: {
            type: Array,
            required: true,
            default: () => []
        },
        autoplay: {
            type: Boolean,
            default: true
        },
        interval: {
            type: Number,
            default: 3000
        },
        circular: {
            type: Boolean,
            default: true
        },
        disableTouch: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            now: Date.now(),
            timer: null,
            src: "https://north-ai-test-public1.oss-cn-beijing.aliyuncs.com/static/user/red-envelope.png",
        };
    },
    mounted() {
        this.timer = setInterval(() => {
            this.now = Date.now();
        }, 1000);
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
    methods: {
        useCoupon(index) {
            const removedItem = this.hongbaoList.splice(index, 1)[0];
            this.$emit('received', removedItem);
        },
        formatTime(endTime) {
            const diff = endTime - this.now;
            if (diff <= 0) return '已失效';

            const hours = Math.floor(diff / 3600000);
            const minutes = Math.floor((diff % 3600000) / 60000);
            const seconds = Math.floor((diff % 60000) / 1000);

            return `${hours.toString().padStart(2, '0')}:${minutes
                .toString()
                .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }
};
</script>

<style lang="scss" scoped>
.hongbao-wrapper {
    width: 100%;

    box-sizing: border-box;
}

.hongbao-swiper {
    width: 100%;
    height: 108rpx;
    overflow: hidden;
}

/* Web 平台隐藏滚动条 */
.hongbao-swiper::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
}

.hongbao-item {
    width: 100%;
    flex-shrink: 0;
}

.hongbao {
    border: 2rpx solid #fffbfb;
    border-radius: 16rpx;
    background: #fffbfb;
    position: relative;
    overflow: hidden;
    width: 93%;
    padding: 15rpx 20rpx;
    margin: auto;
}

.hongbao::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fffbfb;
    opacity: 0.1;
    z-index: 0;
}

.hongbao {
    border: 2rpx solid #ff1b00;
    border-radius: 16rpx;
    background: #fffbfb;
    position: relative;
    overflow: hidden;
    width: 87%;
    padding: 15rpx 20rpx;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        // background: linear-gradient(to bottom, #FF9100, #f6e5e3);

        opacity: 0.1;
        z-index: 0;
    }

    .hongbao-content {
        position: relative;
        z-index: 1;

        .flex-row {
            display: flex;
            align-items: center;
        }

        .hongbao-icon {
            width: 48rpx;
            height: 48rpx;
            margin-right: 10rpx;
        }

        .hongbao-text {
            display: flex;

            .hongbao-amount {
                font-size: 26rpx;
                font-weight: bold;
                color: #ff1b00;
            }

            .hongbao-desc {
                font-size: 26rpx;
                color: #030303;
                margin-left: 2rpx;
            }
        }

        .hongbao-expire {
            font-size: 20rpx;
            color: #ff1b00;
            // margin-top: 15rpx;
            letter-spacing: 2rpx;
            margin-left: 40rpx;
        }

        .hongbao-action {
            position: absolute;
            right: 0;
            transform: translateY(-110%);

            .hongbao-btn {
                background: linear-gradient(to bottom, #ff9100, #ff1b00);
                color: #fff;
                font-size: 20rpx;
                padding: 12rpx 30rpx;
                border-radius: 50rpx;
                box-shadow: 0 4rpx 10rpx rgba(255, 27, 0, 0.3);
            }
        }
    }
}
</style>