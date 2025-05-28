<template>
    <view class="nav-bar" :style="{
        height: customBarHeight + 'px',
        paddingTop: statusBarHeight + 'px',
        backgroundColor: background,
        color: color
    }">
        <!-- 左侧区域 -->
        <view class="left" @click="handleLeft">
            <my-icon v-if="leftIcon" :type="leftIcon" size="32rpx" color="#333333" />
            <text v-if="leftText">{{ leftText }}</text>
        </view>

        <!-- 中间标题 -->
        <view class="title">
            {{ title }}
        </view>

        <!-- 右侧区域 -->
        <view class="right" @click="handleRight" v-if="$slots.default || rightText || rightIcon">
            <slot>
                <text v-if="rightText">{{ rightText }}</text>
                <my-icon v-if="rightIcon" :type="rightIcon" size="32rpx" :color="color" />
            </slot>
        </view>
    </view>
</template>

<script>
export default {
    name: 'CustomNavBar',
    props: {
        // 标题
        title: {
            type: String,
            default: ''
        },
        // 背景颜色
        background: {
            type: String,
            default: '#ffffff'
        },
        // 字体颜色
        color: {
            type: String,
            default: '#333333'
        },
        // 左侧图标
        leftIcon: {
            type: String,
            default: '' // 如 "icon-back"
        },
        // 左侧文字
        leftText: {
            type: String,
            default: ''
        },
        // 右侧图标
        rightIcon: {
            type: String,
            default: ''
        },
        // 右侧文字
        rightText: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            statusBarHeight: 0,
            customBarHeight: 0
        };
    },
    mounted() {
        uni.getSystemInfo({
            success: (res) => {
                this.statusBarHeight = res.statusBarHeight;

                if (res.customBarHeight) {
                    // 微信小程序等支持 customBarHeight 的平台
                    this.customBarHeight = res.customBarHeight;
                } else {
                    // H5 或其他平台模拟计算
                    this.customBarHeight = res.statusBarHeight + 44;
                }
            }
        });
    },
    methods: {
        handleLeft() {
            this.$emit('left-click');
        },
        handleRight() {
            this.$emit('right-click');
        }
    }
};
</script>

<style scoped>
.nav-bar {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32rpx;
    box-sizing: border-box;
    font-size: 32rpx;
    font-weight: bold;
}

.left,
.right {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60rpx;
    height: 60rpx;
}

.title {
    flex: 1;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>