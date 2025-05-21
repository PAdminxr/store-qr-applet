<template>
  <view class="container">
    <!-- 搜索框 -->
    <view class="header" :style="{ paddingTop: statusBarHeight + 'rpx' }">
      <text class="zixun">资讯</text>
      <view class="bar-container">
        <view class="search-bar-container">
          <uni-icons type="location-filled" size="40rpx"></uni-icons>

          <picker @change="bindPickerChange" :value="index" :range="array">
            <view class="uni-input">{{ array[index] }}</view>
          </picker>
          <uni-icons type="down" size="40rpx"></uni-icons>
        </view>
        <view class="search-bar" @click="onSearchConfirm()">
          <uni-search-bar placeholder="对等关税" clearButton="none" cancelButton="none" :readonly="true"></uni-search-bar>
        </view>
      </view>
    </view>

    <!-- 轮播图 -->
    <view class="swiper-container">
      <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" indicator-color="#f3f3f3"
        indicator-active-color="white">
        <swiper-item v-for="(item, index) in banners" :key="index">
          <image :src="item.image" class="banner-image"></image>
          <text class="text">{{ item.text }}</text>
        </swiper-item>
      </swiper>
    </view>
    <uni-notice-bar show-icon show-close single scrollable text="活动通知:欢迎参与枣庄政府惠民活动政策" color="#A2623C"
      @click="navigateTomessage()" />
    <!-- 快捷入口 -->
    <view class="shortcut">
      <view class="shortcut-item" v-for="(item, index) in shortcutItems" :key="index" @click="navigateTo(item.url)">
        <img :src="item.icon" mode="aspectFit" class="shortcut-icon" />
        <text class="shortcut-text">{{ item.text }}</text>
      </view>
    </view>

    <!-- 热门精选 -->
    <view class="hot-news">
      <view class="hot-news-header">
        <text class="title">热门精选</text>
        <view class="refresh" @click="refreshHotNews()">
          <uni-icons type="refreshempty" size="40rpx" color="#ADADAD"></uni-icons>
          <text class="change"> 换一批</text>
        </view>
      </view>
      <view class="news-item" v-for="(item, index) in hotNews" :key="index"
        @click="onClickNoticeBar('images', item.id)">
        <view class="news-content">
          <text class="title">{{ item.title }}</text>
          <view class="liulan">
            <view class="icon">
              <uni-icons type="eye" size="36rpx" color="#ADADAD"></uni-icons>{{ item.views }}
            </view>
            <text class="time"> {{ formattedTime(item.timeAgo) }}</text>
          </view>
        </view>
        <view class="news-image-container">
          <image :src="item.image" mode="aspectFill" class="news-image"></image>
        </view>
      </view>
    </view>

    <!-- 文旅推荐宣传栏 -->
    <view class="travel-recommend">
      <view class="hot-news-header">
        <text class="title">文旅推荐宣传栏</text>
        <view class="refresh" @click="travelRefresh()">
          <text class="change">更多</text>
          <uni-icons type="forward" size="40rpx" color="#ADADAD"></uni-icons>
        </view>
      </view>

      <view class="wenlv-recommend">
        <image :src="thumbnails[imgindex].currentImage" class="background-image" mode="aspectFill"></image>

        <view class="description-container">
          <text class="description-text">{{
            thumbnails[imgindex].description
          }}</text>
          <view class="avatar-name-container">
            <image :src="thumbnails[imgindex].avatarSrc" class="avatar"></image>
            <text class="name-text">{{ thumbnails[imgindex].name }}</text>
          </view>
        </view>

        <!-- 右侧缩略图列表 -->
        <view class="thumbnails-container">
          <view v-for="(thumbnail, index) in thumbnails" :key="index" @click="changeImage(index)"
            class="thumbnail-item">
            <image :src="thumbnail.currentImage" class="thumbnail-image"></image>
          </view>
        </view>
      </view>
    </view>

    <!-- 播放多 Tab 标签页 -->
    <!-- <view class="tabs">
      <view class="tab-item" :class="{ active: currentTab === 'video' }" @click="switchTab('video')">播放多</view>
      <view class="tab-item" :class="{ active: currentTab === 'new' }" @click="switchTab('new')">新发布</view>
    </view> -->
    <view class="tab-bar">
      <view v-for="(tab, index) in tabs" :key="index" :class="['tab-item', { active: currentTab === index }]"
        @click="switchTab(index)">
        {{ tab }}
      </view>
    </view>
    <!-- 视频新闻或新发布的具体内容 -->
    <view v-if="currentTab === 0" class="video-news">
      <view class="news-item" v-for="(item, index) in videoNews" :key="index"
        @click="onClickNoticeBar('video', item.id)">
        <view class="news-content">
          <text class="title">{{ item.title }}</text>
          <view class="liulan">
            <view class="icon">
              <uni-icons type="eye" size="36rpx" color="#ADADAD"></uni-icons>{{ item.views }}
            </view>
            <text class="time"> {{ formattedTime(item.timeAgo) }}</text>
          </view>
        </view>
        <view class="news-image-container">
          <image :src="item.image" mode="aspectFill" class="news-image"></image>
          <!-- 视频时长显示 -->
          <text v-if="item.duration" class="duration">{{
            formatDuration(item.duration)
          }}</text>


        </view>
      </view>
    </view>
    <view v-else class="">
      <!-- 新发布的内容占位符 -->
      <text class="empty-data">暂无数据</text>
    </view>
  </view>
</template>

<script>
import mockDATA from "@/utils/mock.js";
export default {
  data() {
    return {
      tabs: ["播放多", "新发布"],
      array: mockDATA.zixunArray,
      index: 0,
      statusBarHeight: 0,
      imgindex: 0,
      thumbnails: mockDATA.thumbnails,
      currentTab: 0,
      banners: mockDATA.banners,
      shortcutItems: mockDATA.shortcutItems,
      hotNews: mockDATA.hotNews,
      videoNews: mockDATA.videoNews,
      value: 0,
      // range: [
      //   { value: 0, text: "台儿庄" },
      //   { value: 1, text: "山亭" },
      //   { value: 2, text: "峄城区" },
      // ],
    };
  },
  onLoad() {
    uni.getSystemInfo({
      success: (res) => {
        this.statusBarHeight = res.statusBarHeight;
      },
    });
  },
  methods: {
    formattedTime(time) {
      return this.$utils.formatTimeAgo(time);
    },
    bindPickerChange(e) {
      this.index = e.detail.value;
    },
    navigateTomessage() {
      uni.navigateTo({
        url: "/izaozixunpages/message/index",
      });
    },
    onClickNoticeBar(type, id) {
      let url = `/izaozixunpages/articleDetail/index?id=${id}`;

      if (type == "video") {
        url = `/izaozixunpages/articlevideoDetail/index?id=${id}`;
      }
      uni.navigateTo({
        url: url,
      });
    },

    playVideo() {
      const videoContext = uni.createVideoContext("myVideo");
      videoContext.play();
    },

    formatDuration(seconds) {
      const date = new Date(null);
      date.setSeconds(seconds);
      return date.toISOString().substr(11, 8); // 格式化为 hh:mm:ss
    },
    changeImage(index) {
      this.imgindex = index;
      this.currentImage = this.thumbnails[index].src;
    },
    travelRefresh() {
      uni.navigateTo({
        url: "/izaozixunpages/travel/index",
      });
    },
    refreshHotNews() {
      uni.showToast({
        title: "暂无更多数据",
        icon: "none",
        duration: 2000,
      });
    },
    change(e) {
      console.log("e:", e);
    },
    onSearchConfirm(e) {
      uni.navigateTo({
        url: "/izaolifepages/searchPage/index",
      });
    },
    navigateTo(url) {
      uni.navigateTo({ url });
    },
    switchTab(tab) {
      this.currentTab = tab;
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  padding: 40rpx 40rpx 0rpx 40rpx;
  background-color: #fff;
}

.empty-data {
  text-align: center;
  margin: 50rpx 0;
  color: #999;
  display: inline-block;
  width: 100%;
  font-size: 32rpx;
}

.header {
  margin-top: 20rpx;

  .zixun {
    font-size: 48rpx;
    color: #000000;
    font-weight: 600;
  }

  .bar-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .search-bar-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 6rpx;
  }

  .search-bar {
    width: 67%;
  }
}

.swiper-container {
  // margin: 0rpx 0rpx 20rpx 0rpx;
  position: relative;
  margin-bottom: 20rpx;

  .banner-image {
    width: 100%;
  }

  .text {
    position: absolute;
    display: inline-block;
    bottom: 30px;
    left: 10px;
    font-size: 30rpx;
    color: white;
  }
}

/* Tab栏样式 */
.tab-bar {
  display: flex;
  border-top: 2rpx solid #e5e5e5;
}

.tab-item {
  position: relative;
  padding: 10rpx 20rpx;
  font-size: 32rpx;
  color: #929292;
  transition: all 0.3s ease;
  margin-top: 30rpx;
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
  background-color: #fe7b18;
  border-radius: 20rpx;
}

.shortcut {
  display: flex;
  flex-wrap: wrap;
  gap: 30rpx;
  margin: 50rpx 0rpx 50rpx 0rpx;
  justify-content: flex-start;

  .shortcut-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 21%;
  }

  .shortcut-icon {
    width: 80rpx;
    height: 80rpx;
    margin-bottom: 20rpx;
  }

  .shortcut-text {
    font-size: 30rpx;
    color: #000000;
  }
}

.hot-news-header {
  display: flex;
  justify-content: space-between;
  align-content: center;
  margin-bottom: 40rpx;

  .change {
    color: #adadad;
    font-size: 32rpx;
  }
}

.video-news {
  display: inline-block;
  margin-bottom: 0 !important;

  .news-item:last-child {
    border-bottom: none;
  }
}

.video-news {
  .news-item {
    position: relative;

    .duration {
      position: absolute;
      color: white;
      right: 6rpx;
      bottom: 24rpx;
      font-size: 20rpx;
    }
  }
}

.hot-news,
.video-news,
.travel-recommend {
  margin: 40rpx 0rpx;

  .title {
    font-size: 34rpx;
    font-weight: 600;
    // margin-bottom: 20rpx;
    // min-height: 60rpx;
  }

  .liulan {
    display: flex;
    justify-content: flex-start;
    align-items: end;
    color: #adadad;
    font-size: 28rpx;
    gap: 30rpx;
    // margin-bottom: 20rpx;

    .icon {
      display: flex;
      justify-content: flex-start;
      align-items: end;
      gap: 4rpx;
    }
  }

  .refresh {
    display: flex;
    gap: 5rpx;
    align-items: center;
  }

  .news-item,
  .recommend-item {
    display: flex;
    gap: 20rpx;
    margin-bottom: 20rpx;
    border-bottom: 2rpx solid #ebebeb;
    padding-bottom: 10rpx;
  }

  .news-image {
    width: 100%;
    height: 100%;
    border-radius: 14rpx;
  }

  .news-image-container {
    width: 35%;
    height: 150rpx;
  }

  .news-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 83%;

    .title {
      font-weight: 600;
      font-size: 30rpx;
    }

    .time {
      color: #adadad;
      font-size: 28rpx;
    }
  }
}

.video-news,
.new-posts {

  .video-item,
  .new-post-item {
    display: flex;
    gap: 20rpx;
    margin-bottom: 20rpx;
  }

  .video-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}

.wenlv-recommend {
  position: relative;
  width: 100%;
  height: 370rpx;
  border-radius: 30rpx;
  overflow: hidden;
  background: antiquewhite;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.description-container {
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 20rpx;
  box-sizing: border-box;
}

.description-text {
  color: white;
  font-size: 28rpx;
  margin-bottom: 10rpx;
  font-weight: 600;
  display: inline-block;
}

.avatar-name-container {
  display: flex;
  align-items: center;
}

.avatar {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.name-text {
  color: white;
  font-size: 28rpx;
}

.thumbnails-container {
  position: absolute;
  right: 0rpx;
  top: 0rpx;
  background: linear-gradient(to bottom, #6d7e4d, #7e6e50);
  padding: 10rpx;
  box-sizing: border-box;
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.thumbnail-item {
  width: 80%;
  height: 24%;
}

.thumbnail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 2rpx solid #fff;
  border-radius: 20rpx;
}

uni-notice-bar {
  font-size: 28rpx;
}

::v-deep .uni-noticebar {
  border-radius: 20rpx;
}

::v-deep .uni-searchbar {
  padding: 10px 0px 10px 10px !important;
}



::v-deep .uni-stat__actived {
  padding-left: 6rpx;
}

::v-deep .uni-searchbar__box {
  border-radius: 40rpx !important;
  background-color: #ffffff !important;
  border: 2rpx solid;
  font-size: 22rpx;
  height: 60rpx;
}

::v-deep .uni-input {
  font-size: 28rpx !important;
}

::v-deep .uni-searchbar__text-placeholder {
  font-size: 28rpx !important;
}
</style>
