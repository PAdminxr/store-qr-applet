<template>
    <view class="card">
        <view class="media-container">

            <!-- <EnhancedMediaItem :mediaSrc="item.type === 'image' ? item.imageUrl : item.videoUrl"
                :videoSrc="item.videoUrl" :showDeleteButton="showDeleteButton" :width="width" :height="height"
                :isVideo="item.type === 'video'" @setViews="handleSetViews" />
            <view class="video-play" v-if="item.type === 'video'"> -->

            <EnhancedMediaItem :mediaSrc="item.imageUrl" :videoSrc="item.videoUrl" :showDeleteButton="showDeleteButton"
                :width="width" :height="height" :isVideo="item.type === 'video'" @setViews="handleSetViews" :tz="tz"
                :workId="item.workId" :videoPath="item.videoPath" @tz="handleTz" />
            <view class="video-play" v-if="item.type === 'video'">
                <image src="https://north-ai-test-public1.oss-cn-beijing.aliyuncs.com/static/izaozixun/icon-bofang.png"
                    mode="aspectFill" class="cover-image"></image>
            </view>
            <view class="view-count" v-if="showViews && item.views > 0">
                <uni-icons type="eye" size="24rpx" color="#fff"></uni-icons>
                <text class="view-text">{{ item.views }}</text>
            </view>
        </view>

        <view class="card-info" v-if="item.author">
            <text class="title">{{ item.title }}</text>

            <view class="author-row">
                <view class="author-info">
                    <image :src="item.avatar" class="avatar"></image>
                    <text class="author-name">{{ fielname(item.author) }}</text>
                </view>

                <view class="like-count" @click.stop="toggleLike">
                    <uni-icons :type="item.isLiked ? 'heart-filled' : 'heart'" size="28rpx"
                        :color="item.isLiked ? '#e74c3c' : '#818181'"></uni-icons>
                    <text>{{ item.likes }} </text>
                </view>
            </view>
        </view>

    </view>

</template>

<script>
import EnhancedMediaItem from './EnhancedMediaItem.vue';
export default {
    components: {
        EnhancedMediaItem,
    },
    props: {
        tz: {
            type: Boolean,
            default: false
        },
        item: {
            type: Object,
            required: true
        },
        showDeleteButton: {
            type: Boolean,
            default: false
        },
        showViews: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            width: '350rpx',
            height: '350rpx',
        };
    },

    methods: {
        fielname(text) {
            const intro = text || '';
            if (text.length > 8) {
                return intro.slice(0, 5) + '...';
            }
            return intro;
        },
        handleTz() {
            this.$emit('tz', this.item);
        },
        handleSetViews() {
            if (this.showViews) {
                this.$emit('views', this.item);
            }
            else {
                this.$store.commit('UPDATE_VIEWS', {
                    mediaId: this.item.mediaId,
                    workId: this.item.workId
                });

            }


        },
        toggleLike() {


            const newIsLiked = !this.item.isLiked;
            const newLikes = newIsLiked ? this.item.likes + 1 : Math.max(this.item.likes - 1, 0);

            const updated = {
                ...this.item,
                isLiked: newIsLiked,
                likes: newLikes
            };

            this.$emit('like', updated);
        }
    }
};
</script>

<style lang="scss" scoped>
.card {
    background-color: #fff;
    border-radius: 10rpx;
    overflow: hidden;
    box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.1);
    margin-bottom: 10rpx;
}

.media-container {
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

.video-play {
    position: absolute;
    top: 18rpx;
    right: 10rpx;

    color: #fff;
    font-size: 24rpx;
    padding: 4rpx 12rpx;
    background: rgb(74 72 72 / 37%);
    border-radius: 100rpx;
    width: 24rpx;
    height: 38rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}

.cover-image {
    width: 20rpx;
    height: 20rpx;

}

.view-count {
    position: absolute;
    bottom: 28rpx;
    left: 10rpx;
    background-color: rgb(0 0 0 / 41%);
    color: #fff;
    font-size: 22rpx;
    padding: 4rpx 12rpx;
    border-radius: 22rpx;
    display: flex;

    justify-content: center;
    gap: 4rpx;
}

.card-info {
    padding: 20rpx;
}

.title {
    font-weight: bold;
    font-size: 28rpx;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 12rpx;
}

.author-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20rpx;
}

.author-info {
    display: flex;
    align-items: center;
    gap: 10rpx;
}

.author-name {
    font-size: 22rpx;
    color: #818181;
}

.avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
}

.like-count {
    display: flex;
    align-items: baseline;
    color: #818181;
    gap: 4rpx;
}

.like-count text {
    font-size: 28rpx;
}
</style>