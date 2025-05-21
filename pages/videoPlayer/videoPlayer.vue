<template>
    <view class="video-container">
        <!-- 返回按钮区域 -->
        <view class="top-nav-icons" :style="{ top: safeAreaTop + 'px' }">
            <view class="nav-left" @click="goBack">
                <uni-icons type="left" size="24" color="#FFFFFF"></uni-icons>
            </view>
        </view>

        <!-- 视频播放器 -->
        <video :src="videoUrl" :autoplay="true" style="width: 100%; height: 90vh;" controls
            :show-fullscreen-btn="false"></video>

    </view>
</template>

<script>
export default {
    data() {
        return {
            videoUrl: '',
            safeAreaTop: 0,
        };
    },
    onLoad(options) {
        if (options.src) {
            this.videoUrl = decodeURIComponent(options.src);
        }
        this.setTopNavPosition();
    },
    onResize() {
        this.setTopNavPosition();
    },
    methods: {
        goBack() {
            uni.navigateBack();
        },
        setTopNavPosition() {
            uni.getSystemInfo({
                success: (res) => {
                    this.safeAreaTop = res.statusBarHeight + 5;
                },
                fail: () => {
                    this.safeAreaTop = 0;
                }
            });
        }
    }
};
</script>

<style scoped lang="scss">
.video-container {
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: #000;
}

.top-nav-icons {
    position: fixed;
    left: 20rpx;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.4);
}

.nav-left {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>