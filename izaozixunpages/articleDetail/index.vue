<template>
    <view class="article-container" id="container">
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
            <image src="https://north-ai-test-public1.oss-cn-beijing.aliyuncs.com/static/izaozixun/nhotdetial1.png"
                mode="widthFix" class="article-image"></image>

            <!-- 文章内容 -->
            <view class="article-content">
                <rich-text :nodes="article.content" class="rich-text"></rich-text>
                <image src="https://north-ai-test-public1.oss-cn-beijing.aliyuncs.com/static/izaozixun/nhotdetial2.png"
                    mode="widthFix" class="article-image"></image>
                <p style="line-height: 70rpx;">
                    据不完全统计，从4月7日盘后截至8日9点30，已有75家公司发布了回购公告，20家公司发布了增持公告。初步统计投入资金总额超百亿元。根据专家统计，本轮有一半以上的上市公司回购增持行动使用了央行结构性货币政策工具，充分发挥了专项政策工具精准滴灌、高效实施的作用。
                </p>
                <view class="author">
                    <text>编辑：温腾</text>
                    <text>初审/终审：陆毅</text>
                </view>
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
                            <label class="comment-author">{{ fielname(comment.author) }}</label>
                            <text class="comment-text">{{ comment.text }}</text>
                            <text class="comment-time">{{ formattedTime(comment.time) }}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <!-- 底部互动区 -->
        <view class="footer">
            <view class="comment-input-container" id="bottom">
                <!-- 输入框 -->
                <input class="comment-input" placeholder="我来说两句..." v-model="commentText" @confirm="submitComment"
                    @blur="onblur" id="commentInput" :auto-focus="isInputFocused" @focus="onInputFocus" />

                <!-- 互动图标 -->
                <view class="interaction">
                    <view class="interaction-item">
                        <!-- <uni-icons type="chat" size="44rpx"></uni-icons> -->
                        <my-icon type="common" color="black" size="40rpx"></my-icon>
                        <text>{{ article.comments }}</text>
                    </view>
                    <view class="interaction-item" @click="toggleLike">
                        <uni-icons :type="article.isLiked ? 'heart-filled' : 'heart'" size="42rpx"
                            :color="article.isLiked ? '#e74c3c' : '#000000ad'"></uni-icons>
                        <text>{{ article.likes }}</text>
                    </view>

                    <view class="interaction-item" @click="toggleFavorite">
                        <uni-icons :type="article.isFavorite ? 'star-filled' : 'star'" size="44rpx"
                            :color="article.isFavorite ? '#f1c40f' : '#000000ad'"></uni-icons>
                        <text>{{ article.favorites }}</text>
                    </view>

                    <view class="interaction-item" @click="shareArticle">
                        <uni-icons type="redo" size="44rpx" color="#000000ad"></uni-icons>
                        <text>分享</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
import mockDATA from "@/utils/mock.js";
import myIcon from "@/components/myIcon.vue";
export default {
    components: {
        myIcon
    },
    data() {
        return {
            articleId: null,
            commentText: "",
            article: {},
            comments: [],
            isLogin: false,
            isInputFocused: false,
        };
    },
    onLoad(options) {
        if (options.id) {
            this.articleId = parseInt(options.id);
            this.getData();
        }
    },
    mounted() {
        this.isLogin = uni.getStorageSync('isLogin');

        uni.showShareMenu({
            withSubtree: true,
            menus: ["shareAppMessage", "shareTimeline"],
        });
        //判断当前的收藏是否在缓存里
        this.$store.dispatch("loadFavoritesFromCache");
        this.isFavoriteInCache(this.articleId);

    },

    methods: {
        fielname(text) {
            const intro = text || '';
            if (text.length > 8) {
                return intro.slice(0, 5) + '...';
            }
            return intro;
        },
        onInputFocus() {
            setTimeout(() => {
                this.scrollToBottom();
            }, 300); // 等待键盘弹出后再滚动
        },
        onblur() {
            this.isInputFocused = false;
        },
        scrollToBottom() {
            uni.createSelectorQuery()
                .select('#container')
                .boundingClientRect(res => {
                    if (res) {
                        uni.pageScrollTo({
                            scrollTop: res.height,
                            duration: 300
                        });

                        setTimeout(() => {
                            this.isInputFocused = true; // Vue响应式驱动自动聚焦
                        }, 350);
                    }
                }).exec();

        },
        isFavoriteInCache() {
            let id = this.articleId;
            let favoriteList = this.$store.getters.getFavorites
            const isFavorite = favoriteList.find(item => {
                return item.articleId === this.articleId;
            });
            if (isFavorite) {
                this.article.isFavorite = true;
                this.updateViews(id);
            }

        },
        getData() {
            let id = this.articleId;
            if (id) {
                // 模拟获取文章详情和评论数据--资讯
                this.article =
                    mockDATA.hotNews.find((item) => item.id === id).article || {};
                this.comments =
                    mockDATA.hotNews.find((item) => item.id === id).comments || [];

            }
        },
        updateViews(id) {
            mockDATA.hotNews.forEach((item) => {
                if (item.id === id) {
                    item.views++;
                    item.article.views++;
                    this.$store.dispatch("updateFavoriteView", {
                        id: id,
                        views: item.views
                    });
                    return;
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
                url: "/userpages/login/login"
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
                let articleUpdate = mockDATA.hotNews.find((item) => item.id === id);
                if (articleUpdate) {
                    articleUpdate.comments.unshift({
                        id: Math.floor(Math.random() * 999) + 1,
                        author: this.$store.state.userLoginInfo?.nickName || "用户" + Math.floor(Math.random() * 999) + 1,
                        text: this.commentText,
                        time: new Date().toISOString(),
                        avatar: this.$store.state.userLoginInfo?.avatarSrc || 'https://north-ai-test-public1.oss-cn-beijing.aliyuncs.com/static/images/avatar.png',

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
            let articleUpdate = mockDATA.hotNews.find((item) => item.id === id);
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
            let articleUpdate = mockDATA.hotNews.find((item) => item.id === id);
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
                        type: "image"
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
.article-container {
    background-color: #fff;
}

.article-detail {
    padding: 0 40rpx;



}

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
    width: 100%;
    height: 10rpx; // 小程序推荐使用 rpx
    background-color: #eeeeee;
    margin: 30rpx 0;
}

.comments-section {
    // border-top: 1px solid #eee;

    padding: 0rpx 40rpx 60rpx 40rpx;

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
    padding: 20rpx 20rpx;
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
    background: #F6F6F6;
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
            font-size: 28rpx;
        }
    }
}
</style>