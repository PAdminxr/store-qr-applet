<template>
    <view class="index-container" @touchend="handleTouchEnd">
        <!-- 瀑布流组件 -->
        <WaterfallFlow :spots="spots" @like="handleLike" :showDeleteButton="false" />

        <!-- 悬浮按钮 -->
        <uni-fab :pattern="pattern" horizontal="right" vertical="bottom" direction="vertical"
            @fabClick="handleFabClick" />

        <!-- 加载提示 -->
        <view v-if="loading" class="loading-text">加载中...</view>
        <view v-else-if="noMoreData && spots.length > 0" class="loading-text">没有更多内容了</view>
    </view>
</template>

<script>
import WaterfallFlow from "@/components/WaterfallFlow.vue";

export default {
    name: "IndexPage",
    components: {
        WaterfallFlow,
    },
    data() {
        return {
            pattern: {
                buttonColor: "#fe9b19",
                iconColor: "#fff",
            },
            spots: [],
            loading: false, // 是否正在加载
            noMoreData: false, // 是否还有更多数据
            pageSize: 6, // 每次加载的数据条数
            currentPage: 1, // 当前页码
            totalWorks: 0, // 总数据量
        };
    },
    onShow() {
        this.loadWorks(); // 初始加载第一页数据
    },
    methods: {
        /**
         * 加载数据的方法
         */
        loadWorks() {
            this.loading = true;

            // 从 store 获取所有作品数据
            this.$store.dispatch("loadWorksFromCache").finally(() => {
                const allWorks = this.$store.getters.getWorkSpots;
                this.totalWorks = allWorks.length;

                // 分页取当前页的 6 条数据
                const start = (this.currentPage - 1) * this.pageSize;
                const end = start + this.pageSize;
                const newSpots = allWorks.slice(start, end);

                // 添加到瀑布流数组
                this.spots.push(...newSpots);

                // 判断是否加载完全部数据
                if (end >= this.totalWorks) {
                    this.noMoreData = true;
                }

                this.loading = false;
            });
        },

        /**
         * 下拉加载更多
         */
        handleTouchEnd() {
            if (this.loading || this.noMoreData) return;

            this.currentPage++;
            this.loadWorks();
        },

        /**
         * 处理点赞事件
         */
        handleLike(updated) {
            const idx = this.spots.findIndex((i) => i.id === updated.id);
            if (idx > -1) {
                this.spots.splice(idx, 1, updated);
            }
        },


        /**
         * 发布按钮点击跳转
         */
        handleFabClick() {
            uni.navigateTo({
                url: "/pages/userpages/publishWork/published",
            });
        },
    },
};
</script>

<style scoped>
.index-container {
    /* background-color: #eeeeee; */
    padding-bottom: 20rpx;
}

.loading-text {
    text-align: center;
    font-size: 24rpx;
    color: #888;
    margin: 20rpx 0;
}

::v-deep .uni-cursor-point .uni-icons {
    font-size: 64rpx !important;
}
</style>