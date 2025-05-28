<template>
    <view class="review-page">
        <!-- 导航栏 -->
        <uni-nav-bar title="评价" left-icon="back" @clickLeft="goBack"></uni-nav-bar>

        <!-- 评价内容区域 -->
        <view class="content">
            <view class="rating-section">
                <text class="rating-question">您对商家/菜品满意吗？</text>
                <uni-rate :value="rating" @change="onRatingChange"></uni-rate>
                <text class="rating-text">{{ ratingText }}</text>
            </view>

            <view class="upload-section">
                <view class="upload-box">
                    <image src="https://north-ai-test-public1.oss-cn-beijing.aliyuncs.com/static/camera.png"
                        mode="aspectFill" class="camera-icon"></image>
                    <text class="upload-text">添加视频/图片</text>
                    <text class="upload-note">(建议比例1:1，大小不超过10M)</text>
                </view>
            </view>

            <view class="comment-section">
                <uni-easyinput type="textarea" placeholder="口味如何，对服务等满意吗？" v-model="comment" maxlength="200"
                    @input="onCommentInput"></uni-easyinput>
                <text class="char-count">{{ comment.length }}/200</text>
            </view>

            <view class="anonymous-section">
                <uni-icons type="circle" size="20" color="#ccc" @click="toggleAnonymous"></uni-icons>
                <text class="anonymous-text">匿名评价</text>
            </view>

            <button class="submit-button" @click="submitReview">发布</button>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            rating: 4,
            comment: '',
            isAnonymous: false
        };
    },
    computed: {
        ratingText() {
            switch (this.rating) {
                case 1:
                    return '非常不满意';
                case 2:
                    return '不满意';
                case 3:
                    return '一般';
                case 4:
                    return '满意';
                case 5:
                    return '非常满意';
                default:
                    return '';
            }
        }
    },
    methods: {
        goBack() {
            uni.navigateBack();
        },
        onRatingChange(e) {
            this.rating = e.value;
        },
        onCommentInput(e) {
            this.comment = e.detail.value;
        },
        toggleAnonymous() {
            this.isAnonymous = !this.isAnonymous;
        },
        submitReview() {
            console.log('提交评价:', {
                rating: this.rating,
                comment: this.comment,
                isAnonymous: this.isAnonymous
            });
        }
    }
};
</script>

<style scoped>
.review-page {
    background-color: #f4f4f4;
}

.content {
    padding: 20rpx;
    background-color: white;
    border-radius: 10rpx;
    margin-top: 20rpx;
}

.rating-section {
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;
}

.rating-question {
    font-size: 32rpx;
    margin-right: 20rpx;
}

.rating-text {
    margin-left: 20rpx;
    font-size: 28rpx;
}

.upload-section {
    margin-bottom: 20rpx;
}

.upload-box {
    width: 100%;
    height: 200rpx;
    background-color: #eee;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10rpx;
}

.camera-icon {
    width: 60rpx;
    height: 60rpx;
    margin-bottom: 10rpx;
}

.upload-text {
    font-size: 28rpx;
}

.upload-note {
    font-size: 24rpx;
    color: #999;
}

.comment-section {
    position: relative;
    margin-bottom: 20rpx;
}

.char-count {
    position: absolute;
    bottom: 10rpx;
    right: 10rpx;
    font-size: 24rpx;
    color: #999;
}

.anonymous-section {
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;
}

.anonymous-text {
    margin-left: 10rpx;
    font-size: 28rpx;
    color: #666;
}

.submit-button {
    width: 100%;
    height: 80rpx;
    background-color: #ff976a;
    color: white;
    font-size: 32rpx;
    border-radius: 10rpx;
}
</style>