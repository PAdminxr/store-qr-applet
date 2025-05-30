<template>
    <view class="post-detail">
        <!-- 轮播图区域 -->
        <view class="media-container">
            <swiper class="media-swiper" :indicator-dots="false" :autoplay="false" circular
                @change="handleSwiperChange">
                <block v-for="(media, index) in mediaList" :key="index">
                    <swiper-item>
                        <!-- 图片 -->
                        <image v-if="media.type === 'image'" class="media-image" :src="media.url" mode="aspectFill"
                            @tap="previewImage(index)" />
                        <!-- 视频 -->
                        <video v-if="media.type === 'video'" class="media-video" :src="media.url" :show-play-btn="true"
                            :enable-progress-gesture="true" :show-fullscreen-btn="true" :show-loading="true"
                            object-fit="cover" @error="handleVideoError"></video>
                    </swiper-item>
                </block>
            </swiper>

            <!-- 自定义轮播点 -->
            <view v-if="showIndicatorDots" class="custom-indicator">
                <block v-for="(dot, idx) in mediaList" :key="idx">
                    <view :class="['dot', { active: currentSwiperIndex === idx }]"></view>
                </block>
            </view>
        </view>

        <!-- 标题 + 作者 + 时间 + 点赞 -->
        <view class="info-bar">
            <view class="info-left">
                <view class="post-title">{{ title }}</view>
                <view class="author-time">
                    <!-- <text class="author">{{ author }}</text>
                    <image :src="avatar" class="avatar"></image> -->
                    <text class="time">发布于 {{ timestamp }}</text>
                    <!-- 点赞图标 -->
                    <view class="like-wrapper" @click.stop="toggleLike">
                        <view :animation="likeAnimationData">
                            <uni-icons :type="isLiked ? 'heart-filled' : 'heart'" size="28rpx"
                                :color="isLiked ? '#e74c3c' : '#818181'"></uni-icons>
                        </view>
                        <text class="like-count-text">{{ likes }}</text>
                    </view>
                </view>
            </view>


        </view>

        <!-- 分割线 -->
        <!-- <view class="divider"></view> -->
    </view>
</template>

<script>
export default {
    data() {
        return {
            workId: null,
            title: '',
            author: '',
            avatar: '',
            timestamp: '',
            mediaList: [],
            isLiked: false,
            likes: 0,
            currentSwiperIndex: 0,

            // 动画数据
            likeAnimation: null,
            likeAnimationData: {}
        };
    },
    computed: {
        showIndicatorDots() {
            return this.mediaList.length > 1;
        }
    },
    onLoad(options) {
        if (options.workId) {
            this.workId = parseInt(options.workId);
            this.$store.dispatch("loadWorksFromCache").then(() => {
                this.loadSpotData();
            });
        } else {
            uni.showToast({ title: '参数错误', icon: 'none' });
        }

        // 初始化点赞动画
        this.likeAnimation = uni.createAnimation({
            duration: 300,
            timingFunction: 'ease',
        });
    },
    methods: {
        // 加载当前作品数据
        loadSpotData() {
            const allWorks = this.$store.getters.getWorks || [];
            const currentWork = allWorks.find(work => work.workId === this.workId);
            if (currentWork) {

                this.title = currentWork.title;
                this.author = currentWork.author;
                this.avatar = currentWork.avatar;
                this.timestamp = currentWork.timestamp;
                this.mediaList = [...currentWork.mediaList];
                this.isLiked = currentWork.isLiked;
                this.likes = currentWork.likes;
            } else {
                uni.showToast({ title: '未找到该内容', icon: 'none' });
            }
        },

        // 切换轮播索引
        handleSwiperChange(e) {
            this.currentSwiperIndex = e.detail.current;
        },

        // 预览图片
        previewImage(index) {
            const imageUrls = this.mediaList
                .filter(media => media.type === 'image')
                .map(media => media.url);

            uni.previewImage({
                current: imageUrls[index],
                urls: imageUrls
            });
        },

        // 执行点赞动画
        playLikeAnimation() {
            this.likeAnimation.scale(1.5).step();
            this.likeAnimation.scale(1).step();
            this.likeAnimationData = this.likeAnimation.export();
        },

        // 切换点赞状态
        toggleLike() {
            this.isLiked = !this.isLiked;

            if (this.isLiked) {
                this.likes += 1;
            } else {
                this.likes -= 1;
            }

            // uni.showToast({
            //     title: this.isLiked ? '点赞成功' : '取消点赞',
            //     icon: 'none'
            // });

            // this.playLikeAnimation(); // 播放动画

            // 更新 Vuex 中的数据
            this.updateStoreWorkData();
        },

        // 更新 store 中的作品数据
        updateStoreWorkData() {
            const works = [...this.$store.getters.getWorks];
            const idx = works.findIndex(w => w.workId === this.workId);

            if (idx > -1) {
                works[idx] = {
                    ...works[idx],
                    isLiked: this.isLiked,
                    likes: this.likes
                };
                this.$store.commit('SAVE_WORKS', works);
            }
        },

        // 视频播放错误处理
        handleVideoError(e) {
            console.error('视频播放出错:', e.detail.errMsg);
            uni.showToast({ title: '视频加载失败', icon: 'none' });
        }
    }
};
</script>

<style scoped>
.post-detail {
    padding: 20rpx;
    background-color: #ffffff;
}

/* 媒体容器 */
.media-container {
    position: relative;
    width: 100%;
}

/* 轮播图 */
.media-swiper {
    width: 100%;
    height: 600rpx;
    border-radius: 16rpx;
    overflow: hidden;
}

.media-image,
.media-video {
    width: 100%;
    height: 100%;
}

/* 自定义轮播点 */
.custom-indicator {
    position: absolute;
    bottom: -30rpx;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
}

.dot {
    width: 12rpx;
    height: 12rpx;
    margin: 0 8rpx;
    background-color: #ccc;
    border-radius: 50%;
    transition: background-color 0.3s ease;
}

.dot.active {
    background-color: #FE7B18;
}

/* 信息栏整体布局 */
.info-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 40rpx;
}

/* 左侧信息（标题+作者+时间） */
.info-left {
    flex: 1;
}

/* 标题 */
.post-title {
    font-size: 36rpx;
    font-weight: bold;
    color: #333;
}

/* 作者与时间 */
.author-time {
    margin-top: 10rpx;
    font-size: 26rpx;
    color: #999;
    display: flex;
    justify-content: space-between;
    align-items: center;

}

.author {
    font-weight: bold;
    color: #333;
    margin-right: 20rpx;
}

.avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
}

.time {
    font-size: 20rpx;
    color: #aaa;
}

/* 点赞图标区域 */
.like-wrapper {
    display: flex;
    align-items: center;
    padding-left: 20rpx;
}

.like-count-text {
    margin-left: 10rpx;
    font-size: 26rpx;
    color: #818181;
}

/* 分割线 */
.divider {
    margin: 30rpx 0;
    height: 1rpx;
    background-color: #eee;
}
</style>