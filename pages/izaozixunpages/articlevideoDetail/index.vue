<template>
    <view class="article-detail">
        <!-- 标题和副标题 -->
        <view class="article-header">
            <text class="title">{{ article.title }}</text>
            <view class="meta">
                <text>{{ article.date }}</text>
                <text>浏览量{{ article.views }}</text>
            </view>
        </view>

        <!-- 文章图片 -->
        <video :src="article.videoSrc" controls class="video-player"></video>
        <!-- 文章内容 -->
        <view class="article-content">
            <rich-text :nodes="article.content" class="rich-text"></rich-text>

            <view class="author">
                <text>编辑：温腾</text>
                <text>初审/终审：陆毅</text>
            </view>
        </view>
        <view class="gary"></view>
        <!-- 评论区 -->
        <view class="comments-section">
            <text class="comments-title">评论 {{ article.comments }}</text>
            <view class="comment">
                <view v-for="(comment, index) in comments" :key="index">
                    <view class="comment-item">
                        <image :src="comment.avatar" class="avatar"></image>
                        <view class="comment-info">
                            <label class="comment-author">{{ comment.author }}</label>
                            <text class="comment-text">{{ comment.text }}</text>
                            <text class="comment-time">{{ formattedTime(comment.time) }}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <!-- 底部互动区 -->
        <view class="footer">
            <view class="comment-input-container">
                <!-- 输入框 -->
                <input class="comment-input" placeholder="我来说两句..." v-model="commentText" @confirm="submitComment" />

                <!-- 互动图标 -->
                <view class="interaction">
                    <view class="interaction-item">
                        <uni-icons type="chat" size="44rpx"></uni-icons>
                        <text>{{ article.comments }}</text>
                    </view>
                    <view class="interaction-item" @click="toggleLike">
                        <uni-icons :type="article.isLiked ? 'heart-filled' : 'heart'" size="42rpx"
                            :color="article.isLiked ? '#e74c3c' : ''"></uni-icons>
                        <text>{{ article.likes }}</text>
                    </view>

                    <view class="interaction-item" @click="toggleFavorite">
                        <uni-icons :type="article.isFavorite ? 'star-filled' : 'star'" size="44rpx"
                            :color="article.isFavorite ? '#f1c40f' : ''"></uni-icons>
                        <text>{{ article.favorites }}</text>
                    </view>

                    <view class="interaction-item" @click="shareArticle">
                        <uni-icons type="redo" size="44rpx"></uni-icons>
                        <text>分享</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
import mockDATA from "@/utils/mock.js";
export default {
    data() {
        return {
            articleId: null,
            commentText: "",
            article: {},
            comments: [],
            isLogin: false,
        };
    },
    onLoad(options) {
        if (options.id) {
            this.articleId = parseInt(options.id);
            this.getData();
        }
    },
    mounted() {
        uni.showShareMenu({
            withSubtree: true,
            menus: ["shareAppMessage", "shareTimeline"],
        });
        //判断当前的收藏是否在缓存里
        this.$store.dispatch("loadFavoritesFromCache");
        this.isFavoriteInCache(this.articleId);
        const isLogin = this.$store.getters.getIsLogin || false;
        this.isLogin = isLogin;
    },

    methods: {
        isFavoriteInCache() {
            let favoriteList = this.$store.getters.getFavorites
            console.log(favoriteList);
            const isFavorite = favoriteList.find(item => {
                return item.articleId === this.articleId;
            });
            if (isFavorite) {
                this.article.isFavorite = true;
            }

        },
        getData() {
            let id = this.articleId;
            if (id) {
                // 模拟获取文章详情和评论数据--视频
                this.article =
                    mockDATA.videoNews.find((item) => item.id === id).article || {};
                this.comments =
                    mockDATA.videoNews.find((item) => item.id === id).comments || [];
                this.updateViews(id);
            }
        },
        updateViews(id) {
            mockDATA.videoNews.forEach((item) => {
                if (item.id === id) {
                    item.views += 1;
                    item.article.views += 1;
                }
            });
        },
        formattedTime(time) {
            return this.$utils.formatTimeAgo(time);
        },
        toggleComments() {
            // uni.showToast({
            //     title: '查看评论功能暂未开放',
            //     icon: 'none',
            //     duration: 1500
            // });
        },
        JumpLogin() {
            uni.navigateTo({
                url: "/pages/login/login"
            });
        },


        submitComment() {
            if (!this.isLogin) {
                this.JumpLogin();
                return;
            }
            if (this.commentText.trim()) {
                //追加进mockDATA中
                let id = this.articleId;
                let articleUpdate = mockDATA.videoNews.find((item) => item.id === id);
                if (articleUpdate) {
                    articleUpdate.comments.unshift({
                        id: Math.floor(Math.random() * 999) + 1,
                        author: "用户" + Math.floor(Math.random() * 999) + 1,
                        text: this.commentText,
                        time: new Date().toISOString(),
                        avatar: "/static/images/avatar.png",
                    })
                }
                this.commentText = "";
                this.article.comments++;
            }
        },
        toggleLike() {
            if (!this.isLogin) {
                this.JumpLogin();
                return;
            }
            let id = this.articleId;
            let articleUpdate = mockDATA.videoNews.find((item) => item.id === id);
            if (articleUpdate) {
                if (articleUpdate.article.isLiked) {
                    articleUpdate.article.likes -= 1;
                    articleUpdate.article.isLiked = false;
                } else {
                    articleUpdate.article.likes += 1;
                    articleUpdate.article.isLiked = true;
                }
            }
        },
        toggleFavorite() {
            if (!this.isLogin) {
                this.JumpLogin();
                return;
            }
            //修改收藏数量
            let id = this.articleId;
            let articleUpdate = mockDATA.videoNews.find((item) => item.id === id);
            if (articleUpdate) {
                if (articleUpdate.article.isFavorite) {
                    articleUpdate.article.favorites -= 1;
                    articleUpdate.article.isFavorite = false;
                    this.$store.dispatch("deleteFavorite", id);
                } else {
                    articleUpdate.article.favorites += 1;
                    articleUpdate.article.isFavorite = true;
                    const favorite = {
                        id: Math.floor(Math.random() * 999) + 1,
                        articleId: id,
                        title: this.article.title,
                        time: this.$utils.formatTime(new Date()),
                        image: this.article.imageUrl,
                        views: this.article.views,
                        timeAgo: this.article.date,
                        type: "video",
                        duration: this.article.duration,
                    };
                    this.$store.dispatch("saveFavoritesToCache", favorite);
                }
            }
        },
        shareArticle() {
            if (!this.isLogin) {
                this.JumpLogin();
                return;
            }
            uni.showToast({
                title: "请点击右上角“...”按钮进行分享",
                icon: "none",
                duration: 2000,
            });
        },
    },
    onShareAppMessage() {
        return {
            title: this.article.title,
            path: "/pages/article-detail/article-detail?id=123",
            imageUrl: this.article.imageUrl,
            success: () => {
                uni.showToast({ title: "分享成功" });
            },
            fail: () => {
                uni.showToast({ title: "分享失败", icon: "none" });
            },
        };
    },
};
</script>
<style scoped lang="scss">
.article-detail {
    padding: 40rpx;
    background-color: #fff;

    .article-header .title {
        font-size: 40rpx;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .article-image {
        width: 100%;
        // margin-bottom: 20px;
    }

    .article-header .meta {
        font-size: 28rpx;
        color: #888;
        margin: 28rpx 0rpx;
        display: flex;
        justify-content: flex-start;
        gap: 40rpx;
    }

    .video-player {
        width: 100%;
        height: 300rpx;
        margin-bottom: 20px;
    }

    .article-content {
        padding-bottom: 20rpx;
    }

    .author {
        padding-top: 20rpx;
        color: #adadad;
        font-size: 28rpx;
        display: flex;
        flex-direction: column;
        gap: 20rpx;
    }

    .rich-text {
        line-height: 70rpx;
    }

    .gary {
        width: 1904px !important;
        height: 10rpx;
        background-color: #eeeeee;
        margin-left: -500px;
    }

    .comments-section {
        border-top: 1px solid #eee;
        padding: 20rpx 0;

        .comment {
            padding-bottom: 50rpx;
        }

        .comments-title {
            font-size: 32rpx;
            font-weight: bold;
            margin-bottom: 20rpx;
            display: block;
        }

        .comment-item {
            display: flex;
            margin-bottom: 20rpx;

            .avatar {
                width: 60rpx;
                height: 60rpx;
                border-radius: 50%;
                margin-right: 20rpx;
            }

            .comment-info {
                flex: 1;
                flex: 1;
                display: flex;
                flex-direction: column;

                .comment-author {
                    font-size: 28rpx;
                    color: #adadad;
                    margin-bottom: 10rpx;
                }

                .comment-text {
                    font-size: 28rpx;
                    margin-bottom: 10rpx;
                }

                .comment-time {
                    font-size: 24rpx;
                    color: #adadad;
                }
            }
        }
    }

    .footer {
        border-top: 1px solid #eee;
        padding: 20rpx;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #fff;
        z-index: 999;
    }

    .comment-input-container {
        height: 50rpx;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 26rpx;
    }

    .comment-input {
        width: 30%;
        height: 60rpx;
        font-size: 22rpx;
        border-radius: 15px;
        padding: 0 20rpx;
        border: 2rpx solid #ddd;
    }

    .interaction {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 14rpx;
        width: 60%;
        padding: 0 20rpx;

        .interaction-item {
            display: flex;
            align-items: center;
            justify-content: flex-start;

            text {
                margin-left: 5px;
                font-size: 32rpx;
            }
        }
    }
}
</style>