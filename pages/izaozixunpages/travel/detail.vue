<template>
    <view class="content">
        <!-- 自定义导航栏 -->
        <view class="custom-nav" :style="{ paddingTop: statusBarHeight + 'px' }">
            <view class="nav-content">
                <view class="nav-left" @click="goBack">
                    <uni-icons type="back" size="24"></uni-icons>
                </view>
                <view class="nav-title">{{ title }}</view>
                <view> </view>
            </view>

            <view class="index-container" @touchend="handleTouchEnd">
                <!-- 瀑布流组件 -->
                <WaterfallFlow :spots="spots" @like="handleLike" :showDeleteButton="false" :showViews="true"
                    @views="handleSetViews" />

                <view v-if="loading" class="loading-text">加载中...</view>
                <view v-else-if="noMoreData && spots.length > 0" class="loading-text">没有更多内容了</view>
            </view>
        </view>
    </view>
</template>

<script>
import mockDATA from "@/utils/mock.js";
import WaterfallFlow from "@/components/WaterfallFlow.vue";
export default {
    components: {
        WaterfallFlow,
    },
    data() {
        return {
            loading: false, // 是否正在加载
            noMoreData: false, // 是否还有更多数据
            title: "",

            statusBarHeight: 0,

            spots: [],
            isLogin: false,
        };
    },

    onLoad(options) {
        uni.getSystemInfo({
            success: (res) => {
                this.statusBarHeight = res.statusBarHeight;
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
        JumpLogin() {
            uni.navigateTo({
                url: "/pages/login/login"
            });
        },
        handleTouchEnd() {
            if (this.loading || this.noMoreData) return;
            this.noMoreData = true;
        },

        getSpots(parentId) {
            this.loading = true;
            this.spots = mockDATA.travel.filter((item) => item.parentId === parentId);
            this.title = mockDATA.photo.find((item) => item.id === parentId).name;
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
    background-color: #ffffff;
    height: 100vh;
}

.custom-nav {
    width: 100%;
    height: 130rpx;
}

.nav-bg {
    width: 100%;
    height: 400rpx;
}

.nav-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10rpx;
    box-sizing: border-box;
}

.nav-left,
.nav-right {
    display: flex;
    align-items: center;
}

.nav-title {
    font-size: 36rpx;
    font-weight: bold;
    padding-right: 6%;
}

.loading-text {
    text-align: center;
    font-size: 24rpx;
    color: #888;
    margin: 20rpx 0;
}
</style>