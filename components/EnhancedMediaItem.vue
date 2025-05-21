<template>
    <view class="media-item" :style="{ width: itemWidth, height: itemHeight, margin: margin }">
        <!-- 媒体内容 -->
        <view class="media-wrapper" @click="handleClick(mediaSrc, isVideo)">
            <!-- <video v-if="isVideo" :src="mediaSrc" class="media-content" controls="false" disable-playback="true"
                style="pointer-events: none;" // 禁止视频元素响应点击事件></video> -->
            <view v-if="isVideo" :class="!showStyle ? 'video-cover' : 'video-cover radius'">
                <image class="cover-image"
                    src="https://cdn.jsdelivr.net/gh/PAdminxr/store-qr-applet@main/static/images/video.png"
                    mode="aspectFill" />
            </view>
            <image v-else :src="mediaSrc" mode="aspectFill"
                :class="!showStyle ? 'media-content' : 'media-content radius'"></image>
        </view>

        <!-- 删除按钮 -->
        <view class="delete-btn" @click.stop="removeMedia(index)" v-if="showDeleteButton">
            <uni-icons type="closeempty" size="30rpx" color="#fff"></uni-icons>
        </view>
    </view>
</template>

<script>
export default {
    name: 'EnhancedMediaItem',
    props: {
        margin: {
            type: String,
            default: '0rpx'
        },
        mediaSrc: {
            type: String,
            required: true
        },
        isVideo: {
            type: Boolean,
            default: false
        },
        index: {
            type: Number,
            required: false
        },
        // 新增支持动态设置宽高
        width: {
            type: String,
            default: '160rpx'
        },
        height: {
            type: String,
            default: '160rpx'
        },
        showDeleteButton: {
            type: Boolean,
            default: false
        },
        showStyle: {
            type: Boolean,
            default: false

        }
    },
    computed: {
        itemWidth() {
            return typeof this.width === 'number' ? `${this.width}rpx` : this.width;
        },
        itemHeight() {
            return typeof this.height === 'number' ? `${this.height}rpx` : this.height;
        }
    },

    methods: {
        handleClick(src, isVideo) {
            this.$emit('setViews');

            if (isVideo == null) {
                isVideo = !this.isImage(src);
            }
            if (isVideo) {
                this.playVideo(src);
            } else {
                this.previewMedia(src);
            }
        },
        isImage(url) {
            return /\.(jpg|jpeg|png|gif)$/i.test(url);
        },
        previewMedia(src) {


            uni.previewImage({
                current: src,
                urls: [src]
            });
        },
        playVideo(src) {


            uni.navigateTo({
                url: `/pages/videoPlayer/videoPlayer?src=${encodeURIComponent(src)}`
            });
        },
        removeMedia(index) {
            this.$emit('remove', index);
        }
    }
};
</script>

<style scoped>
.media-item {
    position: relative;

}




.media-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

}

.radius {
    border-radius: 16rpx;
}

.video-cover {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background-color: rgba(147, 147, 147, 0.6);
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

.media-content {
    width: 100%;
    height: 100%;
    object-fit: cover;

}

.delete-btn {
    position: absolute;
    top: -15rpx;
    right: -15rpx;
    width: 32rpx;
    height: 32rpx;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
}
</style>