<template>
    <view class="content">
        <!-- 自定义导航栏 -->
        <view class="custom-nav" :style="{ paddingTop: statusBarHeight + 'px' }">
            <view class="nav-content">
                <view class="nav-left" @click="goBack">
                    <uni-icons type="back" size="24"></uni-icons>
                </view>
                <view class="nav-title">{{ title }}</view>
                <view></view>
            </view>
        </view>

        <!-- 占位符（防止内容被导航栏遮挡） -->
        <view class="nav-placeholder" :style="{ height: placeholderHeight + 'px' }"></view>

        <!-- 页面内容容器 -->
        <view class="index-container" @touchend="handleTouchEnd">
            <!-- 瀑布流组件 -->
            <WaterfallFlow :spots="spots" :showDeleteButton="false" :showViews="true" @tz="handleTz" />

            <!-- 加载状态提示 -->
            <view v-if="loading" class="loading-text">加载中...</view>
            <view v-else-if="noMoreData && spots.length > 0" class="loading-text">没有更多内容了</view>
        </view>
    </view>
</template>

<script>
import mockDATA from "@/utils/mock.js";
import WaterfallFlow from "@/components/WaterfallFlowwork.vue"

export default {
    components: {
        WaterfallFlow,
    },
    data() {
        return {
            loading: false, // 是否正在加载
            noMoreData: false, // 是否还有更多数据
            title: "", // 页面标题
            statusBarHeight: 0, // 状态栏高度
            placeholderHeight: 0, // 占位符高度
            spots: [], // 展示的数据
            isLogin: false, // 是否登录
        };
    },
    onLoad(options) {
        uni.getSystemInfo({
            success: (res) => {
                this.statusBarHeight = res.statusBarHeight;
                // 计算占位符高度：statusBarHeight + nav-content 高度（假设为 100rpx）
                const navHeightInPx = 100 * res.windowWidth / 750; // 100rpx 转换为 px
                this.placeholderHeight = this.statusBarHeight + navHeightInPx;
            },
        });

        if (options.parentId) {
            this.getSpots(parseInt(options.parentId));
        }
    },
    mounted() {
        const isLogin = this.$store.getters.getIsLogin || false;
        this.isLogin = isLogin;
    },
    methods: {
        handleTz(item) {
            uni.navigateTo({
                url: `/izaozixunpages/travel/info?id=${item.mediaId}`,

            });
        },
        JumpLogin() {
            uni.navigateTo({
                url: "/userpages/login/login",
            });
        },
        handleTouchEnd() {
            if (this.loading || this.noMoreData) return;

            this.loading = true;
            setTimeout(() => {
                // 模拟加载更多数据
                this.noMoreData = true;
            }, 500);
        },
        getSpots(parentId) {
            this.loading = true;
            this.spots = mockDATA.travel.filter((item) => item.parentId === parentId);
            this.title = mockDATA.photo.find((item) => item.id === parentId)?.name || "景点详情";
            this.loading = false;
        },
        handleLike(updated) {
            if (!this.isLogin) {
                this.JumpLogin();
                return;
            }
            let spotToUpdate = mockDATA.travel.find(
                (spot) => spot.mediaId === updated.mediaId
            );
            if (spotToUpdate) {
                if (spotToUpdate.isLiked) {
                    spotToUpdate.likes -= 1;
                    spotToUpdate.isLiked = false;
                } else {
                    spotToUpdate.likes += 1;
                    spotToUpdate.isLiked = true;
                    spotToUpdate.views += 1;
                }
            }
        },
        handleSetViews(updated) {
            let spotToUpdate = mockDATA.travel.find(
                (spot) => spot.mediaId === updated.mediaId
            );
            if (spotToUpdate) {
                spotToUpdate.views += 1;
            }
        },
        goBack() {
            uni.navigateBack();
        },
    },
};
</script>

<style lang="scss" scoped>
.content {
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.custom-nav {
    width: 100%;
    background: white;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    // box-shadow: 0 2px 6rpx rgba(0, 0, 0, 0.1);
}

.nav-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10rpx 20rpx;
    box-sizing: border-box;
    width: 100%;
    // background: white;
    padding-bottom: 20rpx;
}

.nav-title {
    font-size: 36rpx;
    font-weight: bold;
    padding-right: 6%;
}

.index-container {
    // background: #eeeeee;
    flex: 1;
    overflow-y: scroll;
    padding-bottom: 80rpx;
    // margin-top: 0rpx;
}

.loading-text {
    text-align: center;
    font-size: 24rpx;
    color: #888;
    margin: 20rpx 0;
}
</style>