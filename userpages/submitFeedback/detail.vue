<template>
    <view class="container">
        <!-- 反馈信息 -->
        <view class="feedback-info">
            <view class="item">
                <text class="label">提交时间:</text>
                <text class="content">{{ feedback.submitTime }}</text>
            </view>
            <view class="item">
                <text class="label">问题类型:</text>
                <text class="content">{{ feedback.problemType }}</text>
            </view>
            <view class="item description-item">
                <text class="label">问题说明:</text>
                <text class="content">{{ feedback.description }}</text>
            </view>
            <view class="item image-section">
                <text class="label">问题图片:</text>
                <view class="image-container">
                    <view v-for="(img, imgIndex) in feedback.media" :key="imgIndex">
                        <EnhancedMediaItem :mediaSrc="img.src" :isVideo="img.isVideo" :index="imgIndex" :width="width"
                            :height="height" :margin="margin" :showStyle='true' />
                    </view>
                </view>
            </view>
        </view>
        <view class="empty-section">

        </view>
        <!-- 处理进度 -->
        <view class="progress-section">
            <!-- <uni-steps :options="steps" direction="column" active-color="#FE7B18" :active="active"
                custom-class="custom-steps"></uni-steps> -->
            <uni-steps :options="steps" direction="column" active-color="#FE7B18" :active="active"
                custom-class="custom-steps"></uni-steps>
        </view>
    </view>
</template>
<script>
import EnhancedMediaItem from '@/components/EnhancedMediaItem.vue';

export default {
    components: {
        EnhancedMediaItem,
    },
    data() {
        return {
            width: ' 200rpx',
            height: ' 200rpx',
            margin: '10rpx',
            feedback: {

            },
            active: 2,
            steps: [
                {
                    title: '您发起投诉反馈',
                    desc: '2025-04-10 14:27',
                    status: 'wait'
                },
                {
                    title: '平台核实处理中',
                    desc: '2025-04-10 14:50',
                    status: 'process'
                },
                {
                    title: '您的投诉反馈处理结果',
                    desc: '',
                    status: ''
                },

            ]
        };
    },
    computed: {
        // reversedSteps() {
        //     return [...this.steps].reverse();
        // }
    },
    onLoad(options) {
        if (options.id) {
            this.loadFeedbacks(options.id);
        }
    },

    methods: {
        loadFeedbacks(id = 4) {
            this.$store.dispatch("loadFeedbacksFromCache");
            this.feedback = this.$store.getters.getFeedbacks.find(feedback => feedback.id === parseInt(id));
            console.log(this.feedback);
            if (this.feedback.status === 'pending') {
                this.active = 1
            }

        },
        isImage(url) {
            return /\.(jpg|jpeg|png|gif)$/i.test(url);
        },
        previewMedia(index) {
            const urls = this.feedback.media.filter((item) => this.isImage(item.path)).map(item => item.path);
            uni.previewImage({
                current: urls[index],
                urls: urls,
            });
        },
        playVideo(src) {
            console.log("播放视频：", src);
            uni.navigateTo({
                url: `/userpages/videoPlayer/videoPlayer?src=${encodeURIComponent(src)}`,
            });
        },
    }
};
</script>

<style scoped lang="scss">
.container {
    background-color: #fff;
    height: 100vh;



}

.feedback-info {
    border-radius: 20rpx;
    padding: 20rpx 60rpx 60rpx 20rpx;
    margin-bottom: 20rpx;
}

.item {
    display: flex;
    align-items: flex-start;
    /* 垂直方向顶部对齐 */
    margin-bottom: 20rpx;
}

.label {
    width: 150rpx;
    /* 固定宽度以确保所有标签对齐 */
    flex-shrink: 0;
    /* 防止标签收缩 */
    font-size: 32rpx;
}

.content {
    flex-grow: 1;
    /* 占据剩余空间 */
    font-size: 32rpx;
    word-break: break-all;
    /* 内容过长时强制换行 */
}

/* 特别处理问题说明，使其自动换行 */
.description-item .content {
    white-space: pre-wrap;
    /* 支持空白符和自动换行 */
    word-break: break-word;
    /* 强制单词断开以适应容器 */
}

.image-section {
    display: flex;
    align-items: flex-start;
}

.image-container {
    display: flex;
    flex-wrap: wrap;
    /* 允许子元素换行 */
    gap: 10rpx;
    /* 图片之间的间距 */
    flex-grow: 1;
}

.feedback-image {
    width: 200rpx;
    height: 200rpx;
    margin-bottom: 10rpx;
    /* 图片之间的垂直间距 */
    border-radius: 10rpx;
}

.empty-section {
    background-color: #eeeeee;
    height: 40rpx;
    display: flex;
    width: 100%;
}

.progress-section {
    background-color: #fff;
    border-radius: 20rpx;
    padding: 0 60rpx;
    margin-top: 20rpx;
}

.image-container {
    display: flex;
    flex-wrap: wrap;
    /* 允许子元素换行 */
    width: calc(100% - 150rpx);
    /* 减去标签的宽度 */
}

.review-img {
    width: 170rpx;
    height: 170rpx;
    margin-right: 10rpx;
    border-radius: 10rpx;
}

.video-cover {
    width: 170rpx;
    height: 170rpx;
    position: relative;
    border-radius: 16rpx;
    overflow: hidden;
    background-color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
}

.cover-image {
    width: 100rpx !important;
    height: 100rpx !important;
}

::v-deep .uni-steps__column-text {
    padding: 12rpx 0;
    border: none !important;
    display: flex;
    flex-direction: column;
    min-height: 250rpx;
    gap: 20rpx;
}
</style>