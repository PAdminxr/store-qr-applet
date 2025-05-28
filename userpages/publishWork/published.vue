<template>
    <view class="publish-work-container">
        <!-- 媒体预览区域 -->
        <view class="media-preview-area">
            <view v-for="(item, index) in mediaItems" :key="index">
                <EnhancedMediaItem :mediaSrc="item.src" :isVideo="item.isVideo" :index="index" :showDeleteButton="true"
                    :width="width" :height="height" @remove="handleRemove" :showStyle="true" :margin="margin" />
            </view>
            <!-- 当没有媒体项时显示的上传图标 -->
            <view v-if="mediaItems.length < maxMediaItems" class="add-media-btn" @click="chooseFile">
                <uni-icons type="plus" size="80rpx" color="#ADADAD" />

            </view>
            <text class="upload-subtip">（建议比例1:1 , 大小不超过10M，最多选择{{ maxMediaItems }}条数据）</text>
        </view>

        <!-- 标题输入区域 -->
        <view class="title-input-area">
            <input type="text" placeholder="填写标题会被更多人看到(20字以内)" v-model="title" maxlength="20" class="title-input" />
        </view>


        <!-- 发布按钮 -->
        <view class="submit-bar">
            <view class="submit-btn" v-if="!isSubmitEnabled">发布</view>
            <view class="submit-btn btn-enabled" @click="publish" v-else>发布</view>
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
            isSubmitting: false,
            title: '',// 标题
            margin: '12rpx',
            width: '200rpx', // 宽度
            height: '200rpx', // 高度
            mediaItems: [], // 媒体项列表
            maxMediaItems: 9, // 最大媒体项数量


        };
    },
    computed: {
        isSubmitEnabled() {
            return this.mediaItems.length > 0;
        },
    },
    methods: {
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

        publish() {
            if (this.isSubmitting) return; // 锁住重复提交
            this.isSubmitting = true;
            uni.showLoading({
                title: '发布中...',
                mask: true
            });

            const workData = {
                workId: Math.floor(Math.random() * 999) + 1,
                title: this.title.trim(),
                authorid: this.$store.state.userLoginInfo?.userId || '123',
                author: `${this.$store.state.userLoginInfo?.nickName || '测试作者'}`,
                avatar: this.$store.state.userLoginInfo?.avatarSrc || 'https://north-ai-test-public1.oss-cn-beijing.aliyuncs.com/static/images/avatar.png',
                timestamp: this.$utils.formatTime(new Date()),

                // 每个媒体项独立记录点赞状态和数量
                mediaList: this.mediaItems.map(item => ({
                    mediaId: Math.floor(Math.random() * 9999) + 1,
                    type: item.isVideo ? 'video' : 'image',
                    url: item.src,
                    isLiked: false,
                    likes: 0,
                    views: 0,
                }))
            };
            this.$store.dispatch("saveWorksToCache", workData);
            setTimeout(() => {
                uni.hideLoading();
                //提示发布成功
                uni.showToast({
                    title: '发布成功',
                    icon: 'success',
                    duration: 2000,
                    success: () => {
                        uni.navigateBack();
                    }
                })

                this.isSubmitting = false;
            }, 1000);
        },
        handleRemove(index) {
            // 删除操作
            this.mediaItems.splice(index, 1);
        }
    }
}
</script>

<style scoped>
.publish-work-container {

    background: white;
    height: calc(100vh - 40rpx);
}

.media-preview-area {
    margin-bottom: 20rpx;
    display: flex;
    flex-wrap: wrap;
    padding: 40rpx;
    align-items: center;
}

.add-media-btn {
    width: 200rpx;
    height: 200rpx;
    background-color: #f6f6f6;
    border-radius: 16rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 10rpx;
}

.upload-subtip {
    font-size: 23rpx;
    color: #bfbfbf;
    display: flex;
    align-items: center;
    margin-top: 10rpx;
}

.title-input-area {
    margin-bottom: 20rpx;
}


.publish-button {
    width: 100%;
    padding: 20rpx;
    background-color: #4cd964;
    color: white;
    border-radius: 10rpx;
    text-align: center;
}

.submit-bar {

    position: fixed;
    bottom: 40rpx;
    left: 0;
    right: 0;
    z-index: 100;
    padding: 0 40rpx;
    display: flex;
    flex-direction: column;
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

::v-deep .title-input {
    width: 85%;
    padding: 20rpx;
    margin: 0 auto;
    border-radius: 0 !important;
    border: none !important;
    border-bottom: 2rpx solid #ccc !important;
    font-size: 32rpx !important;
}
</style>