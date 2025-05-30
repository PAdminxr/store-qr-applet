<template>
    <view class="media-item" :style="{ width: itemWidth, height: itemHeight, margin: margin }">
        <!-- 媒体内容 -->
        <view class="media-wrapper" @click.stop="handleClick(mediaSrc, videoPath, isVideo)">
            <!-- <video v-if="isVideo" :src="mediaSrc" class="media-content" controls="false" disable-playback="true"
                style="pointer-events: none;"></video> -->
            <!-- <view v-if="isVideo" :class="!showStyle ? 'video-cover' : 'video-cover radius'">
                <image class="cover-image" :src="mediaSrc" mode="aspectFill" />
            </view> -->

            <!-- 单一的媒体内容展示区域 -->
            <view class="media-content">
                <image :src="isVideo ? videoPath : mediaSrc" mode="aspectFill"
                    :class="!showStyle ? 'media-content' : 'media-content radius'"></image>

                <!-- 如果是视频并且需要显示删除按钮，则添加播放图标 -->
                <view v-if="isVideo && showDeleteButton" class="play-icon-container">
                    <image
                        src="https://north-ai-test-public1.oss-cn-beijing.aliyuncs.com/static/izaozixun/icon-bofang.png"
                        class="play"></image>
                </view>

                <image v-if="play"
                    src="https://north-ai-test-public1.oss-cn-beijing.aliyuncs.com/static/izaozixun/icon-bofang.png"
                    class="play"></image>
            </view>

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
        tz: {
            type: Boolean,
            default: false
        },
        workId: {
            type: String,
            required: false
        },
        play: {
            type: Boolean,
            default: false
        },
        margin: {
            type: String,
            default: '0rpx'
        },
        mediaSrc: {
            type: String,
            required: true
        },
        videoPath: {
            type: String,
            required: false
        },
        videoSrc: {
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
        handleClick(src, videoSrc, isVideo) {
            if (this.tz) {

                this.$emit('tz');
                return;
            }
            this.$emit('setViews');

            if (isVideo == null) {
                isVideo = !this.isImage(src);
            }
            if (isVideo) {
                this.playVideo(videoSrc);
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
                url: `/userpages/videoPlayer/videoPlayer?src=${encodeURIComponent(src)}`
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
    position: relative;

}

.play {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40rpx;
    height: 40rpx;
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