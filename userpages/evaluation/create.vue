<template>
    <view class="container">
        <!-- 评分和评论区域 -->
        <view class="content-wrapper">
            <!-- 评价评分区域 -->
            <view class="rating-box">
                <text class="rating-text">您对商家/菜品满意吗？</text>
                <view class="rating-container">
                    <uni-rate :value="newComment.rating" @change="onRatingChange" active-color="#FE7B18" size="24" />
                    <text class="rating-description">{{ ratingDescription }}</text>
                </view>

                <!-- 图片/视频上传区域 -->
                <view class="upload-container" v-if="mediaItems.length > 0">
                    <view v-for="(item, index) in mediaItems" :key="index">
                        <EnhancedMediaItem :mediaSrc="item.src" :isVideo="item.isVideo" :index="index"
                            :showDeleteButton="true" :width="width" :height="height" @remove="handleRemove"
                            :showStyle="true" :margin="margin" />
                    </view>
                    <!-- 当没有媒体项时显示的上传图标 -->
                    <view v-if="mediaItems.length < maxMediaItems" class="add-media-btn" @click="chooseFile">
                        <uni-icons type="plus" size="40" color="#ADADAD" />

                    </view>
                    <text class="upload-subtip">（建议比例1:1 , 大小不超过10M，最多选择{{ maxMediaItems }}条数据）</text>
                </view>
                <view v-else class="upload-wrapper" @click="chooseFile">
                    <uni-icons type="camera" size="40" color="#333"></uni-icons>
                    <text class="upload-tip">添加视频/图片</text>
                    <text class="upload-subtip">（建议比例1:1 , 大小不超过10M）</text>
                </view>


                <!-- 评论输入区域 -->
                <view class="comment-container">
                    <!-- 输入前显示的提示头 -->
                    <view v-if="newComment.comment === ''" class="comment-header" @click="toggleTextarea">
                        <uni-icons type="compose" size="16" color="#ADADAD"></uni-icons>
                        <text class="comment-label">口味如何，对服务等满意吗？</text>
                    </view>

                    <!-- 实际输入框 -->
                    <textarea ref="textarea" v-model="newComment.comment" class="comment-input" placeholder=" "
                        maxlength="200" auto-height @input="onCommentInput" @focus="onFocus" />

                    <!-- 字数统计 -->
                    <text class="word-count">{{ commentLength }}/200</text>
                </view>
            </view>
        </view>

        <!-- 底部操作栏：匿名评价 + 发布按钮 -->
        <view class="bottom-bar">
            <!-- 匿名评价 -->
            <view class="anonymous-section">
                <label class="radio-label">
                    <radio :checked="newComment.anonymous" @click="toggleAnonymous" style="transform: scale(0.7)"
                        color="#FE7B18" />匿名评价
                </label>
            </view>

            <!-- 发布按钮 -->
            <view class="submit-bar">
                <view class="submit-btn" v-if="!isSubmitEnabled">发布</view>
                <view class="submit-btn btn-enabled" @click="submitComment" v-else>发布</view>
            </view>
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
            margin: '10rpx',
            width: '180rpx', // 宽度
            height: '180rpx', // 高度
            mediaItems: [], // 媒体项列表
            maxMediaItems: 9, // 最大媒体项数量
            isSubmitting: false, // 新增一个提交锁
            showTextarea: false,
            newComment: {
                rating: 0,
                user_id: "",
                order_id: "",
                ratingdesc: "",
                comment: "",
                media: [],
                anonymous: false,
            },
            orderInfo: {},
            ratingDescriptions: ["非常不满意", "不满意", "一般", "满意", "非常满意"],
            orderId: 0,
        };
    },
    computed: {
        commentLength() {
            return this.newComment.comment.length;
        },
        isSubmitEnabled() {
            return (
                this.newComment.rating > 0 && this.newComment.comment.trim().length > 0
            );
        },
        ratingDescription() {
            if (this.newComment.rating === 0) return "";
            const index = Math.min(
                this.newComment.rating - 1,
                this.ratingDescriptions.length - 1
            );
            return this.ratingDescriptions[index];
        },
    },
    onLoad(options) {
        if (options.orderId) {
            this.orderId = parseInt(options.orderId);
            this.getOrderInfo();
        }

    },
    methods: {

        getOrderInfo() {
            this.orderInfo = this.$store.getters.getOrders.find(item => item.orderId === this.orderId);

        },

        toggleAnonymous() {
            this.newComment.anonymous = !this.newComment.anonymous;
        },
        onFocus() {
            const that = this;
            this.$nextTick(() => {
                setTimeout(() => {
                    if (that.$refs.textarea && that.$refs.textarea.$el) {
                        // 微信小程序兼容写法
                        const query = uni.createSelectorQuery().in(this);
                        query
                            .select(".comment-input")
                            .boundingClientRect((res) => {
                                if (res) {
                                    uni.focus({ selectorQuery: query });
                                }
                            })
                            .exec();
                    }
                }, 150);
            });
        },
        toggleTextarea() {
            this.showTextarea = true;
        },
        onCommentInput(e) {
            this.newComment.comment = e.detail.value;
        },
        onRatingChange(e) {
            this.newComment.rating = e.value;
        },

        chooseFile() {
            const that = this;
            uni.chooseMedia({
                count: that.maxMediaItems - that.mediaItems.length, // 动态计算本次可以选择的最大数量
                mediaType: ['image', 'video'],
                sourceType: ['album', 'camera'],
                success(res) {
                    res.tempFiles.forEach(file => {
                        // 使用文件路径判断是否为视频
                        const isVideo = /\.(mp4|mov|avi|mkv)$/i.test(file.tempFilePath);

                        // 如果添加此文件后总数不超过最大限制，则添加到列表中
                        if (that.mediaItems.length < that.maxMediaItems) {
                            that.mediaItems.push({
                                id: Math.floor(Math.random() * 999) + 1,
                                src: file.tempFilePath,
                                isVideo: isVideo
                            });
                        }
                    });
                }
            });
        },
        handleRemove(index) {
            // 删除操作
            this.mediaItems.splice(index, 1);
        },

        submitComment() {
            if (this.isSubmitting) return; // 锁住重复提交
            this.isSubmitting = true;

            uni.showLoading({
                title: '提交中...',
                mask: true
            });

            try {
                this.newComment.media = this.mediaItems;
                const comment = {
                    id: Math.floor(Math.random() * 999) + 1,
                    orderId: this.orderInfo.orderId,
                    shopId: this.orderInfo.shopId,
                    title: this.orderInfo.shopName,
                    image: this.orderInfo.shopImage,
                    rating: this.newComment.rating,
                    comment: this.newComment.comment,
                    media: [...this.newComment.media],
                    anonymous: this.newComment.anonymous,
                    timestamp: this.$utils.formatTime(new Date()),
                    commentdate: this.$utils.getYYYYMMDD(),
                };

                this.$store.dispatch("saveCommentToCacheAndStore", comment);
                this.$store.dispatch("updateOrderStatus", {
                    orderId: this.orderInfo.orderId,
                    field: 'evaluation',
                    value: true
                });
                setTimeout(() => {
                    uni.hideLoading();

                    uni.navigateTo({
                        url: `/userpages/evaluation/evaluationresult`,
                        fail: () => {
                            uni.showToast({ title: '页面跳转失败', icon: 'none' });
                        }
                    });
                    this.isSubmitting = false;
                }, 1000);

            } catch (error) {
                console.error("提交失败:", error);
                uni.hideLoading();
                uni.showToast({ title: "提交失败", icon: "none" });
                this.isSubmitting = false;
            }
        },
    },
};
</script>

<style scoped lang="scss">
.container {
    padding: 20rpx;
    display: flex;
    flex-direction: column;

}

.content-wrapper {
    flex: 1;
    overflow-y: scroll;
    height: calc(100vh - 80rpx);
}

/* 评分区域 */
.rating-box {
    background-color: #ffffff;
    border-radius: 20rpx;
    padding: 40rpx 40rpx 10rpx 40rpx;
    margin-bottom: 200rpx;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.rating-text {
    font-size: 26rpx;
    line-height: 40rpx;
    color: #333;
    display: block;
    margin-bottom: 30rpx;
    font-weight: 500;
}

.rating-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10rpx;
}

.rating-description {
    font-size: 25rpx;
    line-height: 40rpx;
    color: #535252;
}

/* 图片/视频上传区域 */
.upload-container {
    background-color: #f6f6f6;
    padding: 20rpx;
    margin: 40rpx 0;
    border-radius: 10rpx;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.upload-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40rpx 0;
    background-color: #f6f6f6;
    border-radius: 10rpx;
    margin: 40rpx 0;
}

.upload-tip {
    font-size: 24rpx;
    color: #333;
    margin-top: 20rpx;
}

.upload-subtip {
    font-size: 18rpx;
    color: #bfbfbf;
    margin-top: 10rpx;
}

.media-preview {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 20rpx;
}

.preview-item {
    width: 160rpx;
    height: 160rpx;
    position: relative;
    border-radius: 16rpx;
    overflow: hidden;
    background-color: #fff;
}

.preview-item image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.video-cover {
    width: 160rpx;
    height: 160rpx;
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

.play-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.delete-btn {
    position: absolute;
    top: 10rpx;
    right: 10rpx;
    width: 36rpx;
    height: 36rpx;
    line-height: 36rpx;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-size: 28rpx;
    border-radius: 50%;
    z-index: 2;
}

.add-media-btn {
    width: 180rpx;
    height: 180rpx;
    background-color: #e5e5e5;
    border-radius: 16rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10rpx;
}

/* 评论输入区域 */
.comment-container {
    background-color: #f6f6f6;
    margin-bottom: 40rpx;
    position: relative;
    min-height: 260rpx;
    border-radius: 20rpx;
    padding-top: 40rpx;
}

.comment-header {
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;
    cursor: pointer;
    position: absolute;
    left: 20rpx;
}

.comment-label {
    font-size: 24rpx;
    color: #adadad;
    // margin-left: 20rpx;
}

.comment-input {
    font-size: 28rpx;
    color: #333;
    min-height: 160rpx;
    padding: 20rpx;
    background-color: transparent;
    border: none;
    width: 86%;
    box-sizing: border-box;
    resize: none;
    position: absolute;
    top: 24rpx;
}

.word-count {
    font-size: 24rpx;
    color: #999;
    position: absolute;
    bottom: 10rpx;
    right: 20rpx;
}

/* 底部操作栏 */
.bottom-bar {
    position: fixed;
    bottom: 40rpx;
    left: 0;
    right: 0;
    z-index: 100;
    padding: 0 40rpx;
    display: flex;
    flex-direction: column;
}

.anonymous-section {
    margin-bottom: 20rpx;
}

.radio-label {
    display: flex;
    align-items: center;
    font-size: 24rpx;
    color: #adadad;
}

.submit-btn {
    background-color: #f5c099;
    color: white;
    font-size: 32rpx;
    height: 90rpx;
    line-height: 90rpx;
    border-radius: 5rpx;
    letter-spacing: 4rpx;
    text-align: center;
}

.btn-enabled {
    background-color: #fe7b18;
}
</style>