<template>
    <view class="index-container" @touchend="handleTouchEnd">
        <!-- 瀑布流组件 -->
        <WaterfallFlow :spots="spots" :showDeleteButton="false" @tz="handleClick" />

        <!-- 悬浮按钮 -->
        <uni-fab :pattern="pattern" horizontal="right" vertical="bottom" direction="vertical"
            @fabClick="handleFabClick" />

        <!-- 加载提示 -->
        <view v-if="loading" class="loading-text">加载中...</view>
        <view v-else-if="noMoreData && spots.length > 0" class="loading-text">没有更多内容了</view>
    </view>
</template>

<script>
// import WaterfallFlow from "@/components/WaterfallFlowwork.vue";
import WaterfallFlow from "@/components/WaterfallFlowwork.vue";

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
            works: {}

        };
    },
    onShow() {
        if (this.currentPage === 1 || this.loading) {
            this.loadWorks();
        }
    },
    methods: {
        /**
         * 处理点击事件
         */
        handleClick(item) {
            uni.navigateTo({
                url: `/userpages/publishWork/detail?workId=${item.workId}`,
            });
        },

        /**
         * 加载数据的方法
         */
        loadWorks() {
            this.loading = true;
            this.$store.dispatch("loadWorksFromCache")
            this.works = this.$store.state.works;
            const processedWorks = this.works.map(work => {
                // let totalViews = 0;
                // let totalLikes = 0;
                let firstMediaId = null;
                let firstUrl = null;
                let firstType = null;
                let imageUrl = '';
                let videoUrl = '';
                let videoPath = '';

                if (work.mediaList && Array.isArray(work.mediaList) && work.mediaList.length > 0) {
                    // totalViews = work.mediaList.reduce((sum, media) => sum + (media.views || 0), 0);
                    // totalLikes = work.mediaList.reduce((sum, media) => sum + (media.likes || 0), 0);
                    const firstMedia = work.mediaList[0];
                    firstMediaId = firstMedia.mediaId;
                    firstUrl = firstMedia.url;
                    firstType = firstMedia.type;
                    videoPath = firstMedia.videoPath;

                    // 根据类型设置 imageUrl 或 videoUrl
                    if (firstType === 'image') {
                        imageUrl = firstUrl;
                    } else if (firstType === 'video') {
                        videoUrl = firstUrl;
                        videoPath = videoPath;

                    }
                }

                // return {
                //     ...work,
                //     views: totalViews,
                //     likes: totalLikes,
                //     mediaId: firstMediaId,
                //     url: firstUrl,
                //     type: firstType,
                //     imageUrl,
                //     videoUrl
                // };
                return {
                    ...work,
                    mediaId: firstMediaId,
                    url: firstUrl,
                    type: firstType,
                    imageUrl,
                    videoUrl,
                    videoPath
                }
            });

            // 分页加载到瀑布流
            this.totalWorks = processedWorks.length;

            // 如果是第一页，清空瀑布流内容
            if (this.currentPage === 1) {
                this.spots = [];
            }

            // 当前页起始索引
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;

            // 取出当前页的数据
            const newSpots = processedWorks.slice(start, end);

            // 添加到瀑布流数组
            this.spots.push(...newSpots);
            console.log(this.spots, '11111');
            // 判断是否还有更多数据
            if (end >= this.totalWorks) {
                this.noMoreData = true;
            } else {
                this.noMoreData = false;
            }

            // 加载完成
            this.loading = false;
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
                url: "/userpages/publishWork/published",
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