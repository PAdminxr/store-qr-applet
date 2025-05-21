<template>
    <view class="evaluation-container">
        <!-- Tab栏 -->

        <view class="tab-bar">
            <view v-for="(tab, index) in tabs" :key="index" :class="['tab-item', { active: currentTab === index }]"
                @click="switchTab(index)">
                {{ tab }}
            </view>
        </view>

        <!-- 商户 -->
        <view class="tab-content" v-if="currentTab === 0">
            <view class="restaurant-list">
                <view v-if="hasNoData" class="empty-data">暂无数据</view>


                <view v-else>

                    <view v-for="(group, groupName) in groupedData" :key="groupName">
                        <!-- 无数据提示 -->

                        <text class="group-name" v-if="group.length > 0">
                            {{ groupName }}
                        </text>

                        <view class="restaurant-item" v-for="(restaurant, index) in group" :key="index"
                            @click="navigateTo(restaurant)">
                            <image :src="restaurant.image" mode="aspectFill" class="restaurant-image"></image>
                            <view class="restaurant-info">
                                <view class="restaurant-name">
                                    {{ truncate(restaurant.name) }}</view>
                                <view class="restaurant-score">
                                    <image src="/static/izaolife/icon-lh.png" class="score-icon"></image>
                                    {{ restaurant.score }}分
                                </view>
                                <view class="restaurant" :class="{ open: restaurant.isOpen }">
                                    <view class="restaurant-status">
                                        <text v-if="restaurant.isOpen">营业中</text>
                                        <text v-else style="color: #adadad">休息中</text>
                                        <span :style="{
                                            color: restaurant.isOpen ? '#333333' : '#adadad',
                                        }">{{ restaurant.businessHours }}</span>
                                    </view>
                                    <view class="restaurant-distance">{{
                                        restaurant.distance
                                        }}</view>
                                </view>
                                <view class="restaurant-address">{{ restaurant.address }}</view>
                            </view>
                        </view>

                    </view>


                </view>
            </view>
        </view>
        <view class="tab-content" v-if="currentTab === 1">
            <view class="restaurant-list">
                <view v-if="hasNoData" class="empty-data">暂无数据</view>
                <view v-else>
                    <view v-for="(group, groupName) in groupedData" :key="groupName">
                        <!-- 无数据提示 -->

                        <text class="group-name" v-if="group.length > 0">
                            {{ groupName }}
                        </text>
                        <view class="news-item" v-for="(item, index) in group" :key="index"
                            @click="onClickNoticeBar(item.type, item.articleId)">
                            <view class="news-content">
                                <text class="title">{{ item.title }}</text>
                                <view class="liulan">
                                    <view class="icon">
                                        <uni-icons type="eye" size="40rpx" color="#ADADAD"></uni-icons>{{ item.views }}
                                    </view>
                                    <text class="time"> {{ formattedTime(item.timeAgo) }}</text>
                                </view>
                            </view>
                            <view class="news-image-container" v-if="item.type === 'image'">
                                <image :src="item.image" mode="aspectFill" class="news-image"></image>
                            </view>
                            <view v-else class="news-image-container">
                                <image :src="item.image" mode="aspectFill" class="news-image"></image>
                                <!-- 视频时长显示 -->
                                <text v-if="item.duration" class="duration">{{
                                    formatDuration(item.duration)
                                    }}</text>

                                <!-- 隐藏的视频元素，用于获取视频信息 -->
                                <video id="myVideo" :src="item.videoSrc" @loadedmetadata="onLoadedMetadata"
                                    style="display: none"></video>
                            </view>
                        </view>
                    </view>

                </view>
            </view>
        </view>

    </view>
</template>

<script>
export default {
    data() {
        return {
            tabs: ["商户", "资讯"],
            currentTab: 0,
            data: [],
            groupedData: [],
        };
    },

    computed: {
        hasNoData() {
            const result = Object.values(this.groupedData).every(group => group.length === 0);
            return result;
        }
    },
    methods: {

        formatDuration(seconds) {
            const date = new Date(null);
            date.setSeconds(seconds);
            return date.toISOString().substr(11, 8); // 格式化为 hh:mm:ss
        },
        onLoadedMetadata(event) {
            const index = event.currentTarget.dataset.index;
            this.videoNews[index].duration = event.detail.duration; // 获取视频总时长
        },

        truncate(text) {
            return this.$utils.truncate(text, 10);
        },
        navigateTo(item) {
            uni.navigateTo({
                url: `/pages/izaolifepages/restaurantDetail/index?id=${item.articleId
                    }&type=${item.type}`,
            });
        },
        // 切换Tab
        switchTab(tab) {
            this.currentTab = tab;
            if (this.currentTab) {

                this.groupedData = this.$utils.groupAndSortData(
                    this.$store.getters.getFavorites
                );
                console.log(this.$store.getters.getFavorites);
                console.log(this.groupedData);
            } else {
                this.groupedData = this.$utils.groupAndSortData(
                    this.$store.getters.getMerchants
                );
            }
            uni.pageScrollTo({
                scrollTop: 0, // 滚动到页面顶部
                duration: 300 // 过渡时间，单位为毫秒
            });
        },
        formattedTime(time) {
            return this.$utils.formatTimeAgo(time);
        },
        onClickNoticeBar(type, id) {
            let url = `/pages/izaozixunpages/articleDetail/index?id=${id}`

            if (type == "video") {
                url = `/pages/izaozixunpages/articlevideoDetail/index?id=${id}`
            }
            uni.navigateTo({
                url: url
            })
        },
    },
    onShow() {
        if (this.currentTab) {
            this.groupedData = this.$utils.groupAndSortData(
                this.$store.getters.getFavorites
            );
        } else {
            this.groupedData = this.$utils.groupAndSortData(
                this.$store.getters.getMerchants
            );
        }
    },
    mounted() {
        this.$store.dispatch("loadMerchantsFromCache");
        this.$store.dispatch("loadFavoritesFromCache");
        this.groupedData = this.$utils.groupAndSortData(
            this.$store.getters.getMerchants
        );

    },
};
</script>

<style scoped lang="scss">
/* 全局样式 */
.evaluation-container {
    padding: 0;
    background-color: #f5f5f5;
    padding-bottom: 100rpx;
}

/* Tab栏样式 */
.tab-bar {
    display: flex;
    background-color: white;
    border-bottom: 2rpx solid #e5e5e5;
    gap: 40rpx;
    padding: 40rpx 40rpx 20rpx 40rpx;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 20;
}

.tab-item {
    position: relative;
    padding: 10rpx 20rpx;
    font-size: 32rpx;
    color: #929292;
    transition: all 0.3s ease;
}

.tab-item.active {
    color: #000000;
    font-weight: bold;
}

.tab-item.active::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
    height: 8rpx;
    background-color: #020202;
    border-radius: 20rpx;
}

.tab-content {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20rpx;
    flex-direction: column;
    margin-top: 110rpx;
}

/* 餐厅列表样式 */
.restaurant-list {
    width: 100%;
}

.group-name {
    color: #767676;
    display: block;
    padding: 20rpx;
    font-size: 32rpx;
}

.empty-data {
    text-align: center;
    margin: 50rpx 0;
    color: #999;
    display: inline-block;
    width: 100%;
    font-size: 32rpx;
}

.restaurant-item {
    display: flex;
    padding: 20rpx;
    margin-bottom: 20rpx;
    background-color: white;
    border-radius: 20rpx;
    box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.05);
}

.restaurant-image {
    width: 160rpx;
    height: 160rpx;
    border-radius: 12rpx;
    object-fit: cover;
}

.restaurant-info {
    flex: 1;
    margin-left: 20rpx;
    position: relative;
}


.restaurant-name {
    font-size: 32rpx;
    font-weight: 500;
    margin-bottom: 8rpx;
    color: #333;
}

.restaurant-score {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10rpx;
    font-size: 24rpx;
    color: #ff9500;
    margin-bottom: 8rpx;
}

.score-icon {
    width: 12pt;
    height: 12pt;
}

.restaurant {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.restaurant-status {
    font-size: 24rpx;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10rpx;
}

.open {
    /* color: #00b42a; */
}

.restaurant-address {
    font-size: 26rpx;
    display: block;
    padding: 10rpx 0;
}

.restaurant-distance {
    font-size: 26rpx;
}

//资讯样式
.video-news {}

.news-item {
    display: flex;
    padding: 20rpx;
    margin-bottom: 20rpx;
    background-color: white;
    border-radius: 20rpx;
    box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.05);


}



.video-news {
    margin: 40rpx 0rpx;


}

.title {
    font-size: 34rpx;
    font-weight: 600;
    margin-bottom: 20rpx;
    min-height: 60rpx;
}



.news-item {
    display: flex;
    gap: 20rpx;
    margin-bottom: 20rpx;
    border-bottom: 2rpx solid #ebebeb;
}

.news-image {
    width: 100%;
    height: 100%;
    border-radius: 14rpx;
}

.news-image-container {
    width: 35%;
    height: 150rpx;
    position: relative;

}

.duration {
    position: absolute;
    color: white;
    right: 15rpx;
    bottom: 15rpx;
    font-size: 20rpx;
}

.news-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 83%;

}

.liulan {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #adadad;
    font-size: 28rpx;
    gap: 30rpx;
    margin-bottom: 20rpx;

    .icon {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
}

.title {
    font-weight: 600;
    font-size: 30rpx;
}

.time {
    color: #adadad;
    font-size: 28rpx;
}
</style>