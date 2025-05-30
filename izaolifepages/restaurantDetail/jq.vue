<template>
    <view class="page-container">
        <!-- 顶部导航图标 -->
        <view class="top-nav-icons" ref="topNavIcons"
            :style="{ top: safeAreaTop + 'px', right: capsuleRight + 'px', width: navWidth + 'px' }">
            <view class="nav-left" @click="goBack">
                <uni-icons type="left" size="24" color="#FFFFFF"></uni-icons>
            </view>
            <view class="nav-right">
                <view class="nav-icon" @click="toggleFavorite">

                    <uni-icons :type="isLiked ? 'heart-filled' : 'heart'" size="38rpx"
                        :color="isLiked ? '#e74c3c' : '#FFFFFF'"></uni-icons>
                </view>
            </view>
        </view>

        <!-- 轮播图 -->
        <view class="banner-container">
            <swiper class="banner-swiper" :indicator-dots="false" :autoplay="false" :interval="5000" :duration="500"
                @change="handleSwiperChange">
                <swiper-item v-for="(img, index) in bannerImgs" :key="index">
                    <image class="banner-image" :src="img"></image>
                </swiper-item>
            </swiper>
            <view class="banner-index" v-if="false">
                <image src="https://north-ai-test-public1.oss-cn-beijing.aliyuncs.com/static/izaolife/image.png"
                    class="banner-index-image">
                </image>
                {{ currentIndex + 1 }}/{{ bannerImgs.length }}
            </view>
        </view>

        <!-- 餐厅信息卡片 -->
        <view class="restaurant-card">
            <view class="card-header">
                <view class="restaurant-name">{{ title }}</view>
                <view class="restaurant-tags">
                    <img src="https://north-ai-test-public1.oss-cn-beijing.aliyuncs.com/static/izaolife/tuijian.png"
                        class="recommend-icon" />
                    <view class="actions-group">
                        <view class="action-item" @click="navigate">
                            <img src="https://north-ai-test-public1.oss-cn-beijing.aliyuncs.com/static/izaolife/map.png"
                                class="navigate-icon" />
                            <text class="text"> 导航</text>
                        </view>
                        <view class="action-item" @click="call">
                            <img src="https://north-ai-test-public1.oss-cn-beijing.aliyuncs.com/static/izaolife/phone.png"
                                class="navigate-icon" />
                            <text class="text"> 电话</text>
                        </view>
                    </view>
                </view>

            </view>

            <view class="card-info">
                <main class="content" v-if="restaurantId == 0">
                    <section class="section">
                        <h2>📅 行程概览</h2>
                        <!-- <ul>
                                        <li><strong>最佳旅行时间：</strong>春秋季（3月-5月、9月-11月）</li>
                                        <li><strong>推荐天数：</strong>2-3天</li>
                                        <li><strong>交通方式：</strong>高铁、自驾或飞机转大巴</li>
                                    </ul> -->
                        <p class="info-item">
                            <text class="label">最佳旅行时间</text>
                            <text class="colon">：</text>
                            <text class="value">春秋季（3月-5月、9月-11月）</text>
                        </p>
                        <p class="info-item">
                            <text class="label">推荐天数</text>
                            <text class="colon">：</text>
                            <text class="value">2-3天</text>
                        </p>
                        <p class="info-item">
                            <text class="label">交通方式</text>
                            <text class="colon">：</text>
                            <text class="value">高铁、自驾或飞机转大巴</text>
                        </p>
                    </section>

                    <section class="section">
                        <h2>⛰️ 景点推荐</h2>
                        <div class="card2" v-for="(spot, index) in spots" :key="index">
                            <h3>📍{{ spot.name }}</h3>
                            <!-- <p><strong>特色：</strong>{{ spot.feature }}</p>
                                        <p><strong>必体验：</strong>{{ spot.experience }}</p>
                                        <p><strong>门票：</strong>{{ spot.ticket }}</p> -->

                            <div class="item">
                                <strong class="label">特色：</strong>
                                <span class="content">{{ spot.feature }}</span>
                            </div>
                            <div class="item">
                                <strong class="label">必体验：</strong>
                                <span class="content">{{ spot.experience }}</span>
                            </div>
                            <div class="item">
                                <strong class="label">门票：</strong>
                                <span class="content">{{ spot.ticket }}</span>
                            </div>

                        </div>
                    </section>
                    <!-- <section class="section">
                                    <h2>🛍️ 购物推荐</h2>
                                    <ul>
                                        <li>石榴酒、石榴茶等特产</li>
                                        <li>峄城鲁笔</li>
                                    </ul>
                                </section> -->

                    <section class="section">
                        <h2>⚠️ 注意事项</h2>
                        <ul>
                            <li>注意天气变化，备好衣物和防晒用品</li>
                            <li>节假日景区人流较大，建议错峰出行</li>
                            <li>保管好个人财物，特别是在人多区域</li>
                        </ul>
                    </section>
                </main>
                <main class="content" v-if="restaurantId == 1">
                    <section class="section">
                        <h2>📅 开放时间</h2>
                        <!-- <ul>
                                        <li><strong>周一至周日：</strong>9:00 - 17:00</li>
                                        <li><strong>闭馆日：</strong>每年除夕及特定维护日</li>
                                    </ul> -->
                        <p class="info-item">
                            <text class="label">周一至周日</text>
                            <text class="colon">：</text>
                            <text class="value">9:00 - 17:00</text>
                        </p>
                        <p class="info-item">
                            <text class="label">闭馆日</text>
                            <text class="colon">：</text>
                            <text class="value">每年除夕及特定维护日</text>
                        </p>
                    </section>

                    <section class="section">
                        <h2>⛰️ 景点推荐</h2>
                        <div class="card2" v-for="(spot, index) in spots2" :key="index">
                            <h3>📍{{ spot.name }}</h3>
                            <!-- <p><strong>特色：</strong>{{ spot.feature }}</p>
                                        <p><strong>必体验：</strong>{{ spot.experience }}</p>
                                        <p><strong>门票：</strong>{{ spot.ticket }}</p> -->


                            <div class="item">
                                <strong class="label3">简介：</strong>
                                <span class="content">{{ spot.intro }}</span>
                            </div>
                            <div class="item">
                                <strong class="label3">特别活动：</strong>
                                <span class="content">{{ spot.specialActivity }}</span>
                            </div>

                        </div>
                    </section>

                    <section class="section">
                        <h2>⚠️ 注意事项</h2>
                        <ul>
                            <li>保持安静，尊重场地氛围</li>
                            <li>请勿触摸展品</li>
                            <li>穿着得体，避免穿拖鞋进入</li>
                        </ul>
                    </section>
                </main>
                <main class="content" v-if="restaurantId == 2">
                    <article class="article">
                        <h2>漫步古城</h2>
                        <article class="article">
                            <p>清晨的阳光洒在青石板路上，我踏入了这座沉静而古老的小镇——台儿庄古城。空气中弥漫着淡淡的水汽和茶香，仿佛时间在这里慢了下来。
                            </p>

                            <p>小桥流水人家，每一扇木门后都藏着一段故事，每一块砖瓦都在低声诉说着历史。沿着蜿蜒的小巷前行，耳边传来远处艺人弹奏的古琴声，悠扬而深远。</p>

                            <p>我走进一家临河的老茶馆，点了一壶当地特色的“石榴花茶”，坐在窗边看着乌篷船缓缓划过水面，波光粼粼，仿佛穿越回了几百年前的江南水乡。</p>

                            <p>午后，我参观了大战遗址公园，那些残存的墙垣和陈列的旧物让人瞬间回到了那个战火纷飞的年代……</p>
                        </article>
                        <!-- 可以添加更多关于旅行体验的文字描述 -->
                    </article>


                </main>
                <main class="content" v-if="restaurantId == 3">
                    <view style="margin-bottom: 20px;">身临其境，探索每一个角落</view>
                    <!-- 模拟数据列表 -->
                    <section v-for="(scene, index) in scenes" :key="index" class="scene-card">
                        <h2>{{ scene.title }}</h2>
                        <p>{{ scene.description }}</p>

                        <!-- 展示图片或嵌入视频/全景图 -->
                        <div v-if="scene.type === 'image'" class="media-container">
                            <img :src="scene.mediaSrc" alt="Scene Image" @click="showFullScreen(scene.mediaSrc)">
                        </div>
                        <div v-else-if="scene.type === 'video'" class="media-container">
                            <video controls :src="scene.mediaSrc"></video>
                        </div>

                        <!-- 其他信息 -->
                        <p>地点：{{ scene.location }}</p>
                        <button @click="viewScene(scene)">进入参观</button>
                    </section>
                </main>

            </view>
        </view>

    </view>
</template>

<script>
import mockDATA from "@/utils/mock.js";
export default {
    name: "restaurantDetail",
    data() {
        return {
            isFullScreen: false,
            fullScreenImage: '',
            scenes: [
                {
                    title: '古城风光',
                    description: '体验古老的建筑与现代生活的交融。',
                    mediaSrc: 'https://north-ai-test-public1.oss-cn-beijing.aliyuncs.com/static/izaolife/jqimg.png',
                    type: 'image', // 可以是'image'或'video'
                    location: '台儿庄古城'
                },
                {
                    title: '自然景观',
                    description: '沉浸于大自然的怀抱中，感受宁静与美丽。',
                    mediaSrc: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    type: 'video',
                    location: '抱犊崮国家森林公园'
                }
            ],
            isLiked: false,
            spots: [
                {
                    name: '台儿庄古城',
                    feature: '京杭大运河畔保存最完整的古城之一，融合南北建筑风格，夜景迷人',
                    experience: '漫步青石板路、参观大战遗址公园、夜游灯光秀',
                    ticket: '160元/人（含部分展馆）'
                },
                {
                    name: '微山湖湿地公园',
                    feature: '中国北方最大的淡水湖泊之一，夏季荷花盛开，景色如画',
                    experience: '乘船游览湖区、观鸟摄影',
                    ticket: '根据项目收费'
                },
                {
                    name: '抱犊崮国家森林公园',
                    feature: '鲁南著名旅游胜地，山峦起伏，空气清新',
                    experience: '徒步登山、体验户外运动',
                    ticket: '根据季节和活动不同有所变化'
                },
                {
                    name: '铁道游击队纪念馆',
                    feature: '纪念抗日战争时期的铁道游击队，馆内陈列大量珍贵资料',
                    experience: '重温革命岁月，观看情景剧《沙沟受降》等',
                    ticket: '免费'
                },
                {
                    name: '冠世榴园',
                    feature: '全球首家集石榴种质资源保护、文化展示于一体的主题公园',
                    experience: '了解石榴文化，品尝石榴制品',
                    ticket: '根据活动收费'
                }
            ],
            spots2: [
                {
                    name: '烈士纪念碑',
                    intro: '纪念为国家献出生命的英雄们',
                    specialActivity: '清明节期间举行纪念仪式'
                },
                {
                    name: '历史陈列馆',
                    intro: '展示重大历史事件及相关文物',
                    specialActivity: '不定期举办专题展览'
                }
            ],
            tabs: ["推荐语", "评价", "商家"],
            restaurantId: 0,
            statusBarHeight: 0,
            navWidth: 0,
            capsuleRight: 0,
            isFavorited: false,
            bannerImgs: [],
            tags: ["平台推荐", "放心商家"],
            restaurantInfo: {},
            reviews: mockDATA.reviews,
            totalReviews: 160,
            merchantInfos: mockDATA.merchantInfos,
            fwInfos: mockDATA.fwInfos,
            activeTab: 0,
            currentIndex: 0,
            statusBarHeight: 0,
            safeAreaTop: 0,
            contentMinHeight: 0,
            type: 0,
            title: '',
        };
    },
    onLoad(options) {
        // this.restaurantName = options.name;id

        this.getSystemInfo();
        this.calculateContentHeight();
        if (options) {

            this.type = options.type;
            this.restaurantId = parseInt(options.id);

            this.getData();
        }
    },
    onResize() {
        this.calculateContentHeight();
    },
    methods: {
        showFullScreen(src) {

        },
        closeFullScreen() {
            this.isFullScreen = false;
        },
        viewScene(scene) {

            uni.showToast({
                title: `您选择了参观: ${scene.title}`,
                icon: "none",
            });
        },
        getData() {
            //根据id获取名称
            this.bannerImgs = mockDATA.jqbanners[this.restaurantId];
            this.title = mockDATA.jqbanners[this.restaurantId].text;
            this.isLiked = mockDATA.jqbanners[this.restaurantId].isLiked;


        },
        getSystemInfo() {
            // 获取系统信息和胶囊按钮位置
            uni.getSystemInfo({
                success: (res) => {
                    this.statusBarHeight = res.statusBarHeight;
                    if (res.safeArea) {
                        this.safeAreaTop = res.safeArea.top;
                    } else {
                        this.safeAreaTop = this.statusBarHeight;
                    }
                    this.safeAreaTop += 8;

                    // 获取胶囊按钮位置信息
                    const capsuleInfo = uni.getMenuButtonBoundingClientRect();
                    this.capsuleRight = res.windowWidth - capsuleInfo.right;
                    // 计算导航栏宽度（距离胶囊按钮10pt）
                    this.navWidth = capsuleInfo.left - 20;
                    this.setTopNavPosition();
                },
            });
        },
        setTopNavPosition() {
            const topNavIcons = this.$refs.topNavIcons;
            if (topNavIcons) {
                topNavIcons.style.top = `${this.safeAreaTop}px`;
            }
        },
        calculateContentHeight() {
            uni.getSystemInfo({
                success: (res) => {
                    const windowHeight = res.windowHeight;
                    const bannerHeight = 230;
                    const tabsHeight = 88;
                    this.contentMinHeight = windowHeight - bannerHeight - tabsHeight;
                },
            });
        },
        toggleExpand(review) {
            review.isExpanded = !review.isExpanded;
            review.showFullContent = false;
        },
        shouldShowFullTextBtn(review) {
            if (review.content.length < 80) return false;
            if (review.isExpanded) return true;
            return true;
        },
        viewAllReviews() {
            // console.log('查看全部评价');
            // uni.navigateTo({
            //     url: '/pages/reviews/reviews'
            // });
            uni.showToast({
                title: "快马加鞭开发中...",
                icon: "none",
            });
        },
        goBack() {
            uni.navigateBack();
        },

        handleSwiperChange(e) {
            this.currentIndex = e.detail.current;
        },

        switchTab(tab) {
            this.activeTab = tab;
        },
        navigate() {
            uni.showModal({
                title: "导航",
                content: "即将调用地图应用导航",
                success: function (res) {
                    if (res.confirm) {
                        console.log("用户点击确定");
                        uni.openLocation({
                            latitude: 34.562528,
                            longitude: 117.733832,
                            name: "运河鱼馆(古城店)",
                            address: "运河鱼馆(古城店)地址",
                            scale: 18,
                        });

                    } else if (res.cancel) {
                        console.log("用户点击取消");
                    }
                },
            });
        },
        call() {
            uni.showModal({
                title: "拨打电话",
                content: "即将拨打电话",
                success: function (res) {
                    if (res.confirm) {
                        console.log("用户点击确定");
                        uni.makePhoneCall({
                            phoneNumber: "1234567890",
                        });
                    } else if (res.cancel) {
                        console.log("用户点击取消");
                    }
                },
            });
        },
        JumpLogin() {
            uni.navigateTo({
                url: "/userpages/login/login"
            });
        },
        toggleFavorite() {
            const isLogin = uni.getStorageSync('isLogin');
            if (!isLogin) {
                this.JumpLogin();
                return;
            }
            this.isLiked = !this.isLiked;
            //修改原始数据的点赞状态
            mockDATA.jqbanners[this.restaurantId].isLiked = this.isLiked;

        },
        navigateToMerchantInfo(url, restaurantInfo) {
            uni.navigateTo({
                url: `${url}?id=${restaurantInfo.id}&score=${restaurantInfo.score}`,
            });
        },
    },
};
</script>

<style scoped lang="scss">
.page-container {
    background-color: #f8f8f8;
    // font-family: 'PingFang SC', 'Helvetica Neue', 'Arial', sans-serif;
}

.vr-tour {
    font-family: Arial, sans-serif;
    padding: 20px;
}

.page-header {
    text-align: center;
    margin-bottom: 20px;
}

.scene-card {
    background-color: #fff;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 15px;
}

.media-container img,
.media-container video {
    width: 100%;
    min-height: 100px;
    cursor: pointer;
    border-radius: 4px;
    margin: 10px 0;
}

button {
    display: block;
    margin-top: 10px;
    padding: 0 16px;
    background-color: #007AFF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.fullscreen-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
}

.fullscreen-image {
    max-width: 90%;
    max-height: 90%;
}

/* 顶部导航图标 */
/* 顶部导航图标 */
.top-nav-icons {
    position: absolute;
    left: 0;
    display: flex;
    justify-content: space-between;
    padding: 0 20rpx;
    z-index: 20;
    align-items: center;
}

.top-nav-icons .nav-left {
    display: flex;
    align-items: center;
}

.top-nav-icons .nav-right {
    display: flex;
    align-items: center;
}

.top-nav-icons .nav-icon {
    background: rgb(0 0 0 / 14%);
    border-radius: 100rpx;
    width: 55rpx;
    height: 55rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}



.travel-page {
    font-family: Arial, sans-serif;
    padding: 20px;
    background-color: #f8f8f8;
}

.page-header {
    text-align: center;
    margin-bottom: 20px;
}

.page-header h1 {
    font-size: 24px;
    color: #333;
}

.page-header p {
    font-size: 16px;
    color: #666;
}

.card2 {
    background: #fff;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 15px;
}

.card2 .item {
    display: flex;
    align-items: center;
    font-size: 24rpx;
    line-height: 1.5;
    margin-bottom: 10px;
}

.card2 .label {
    min-width: 55px;
    /* 固定标签宽度 */
    text-align: right;
    font-weight: bold;
    color: #333;
    margin-right: 10px;
    /* 标签与内容之间的间距 */
}

.label2 {
    min-width: 60px;
    /* 固定标签宽度 */
    text-align: right;
    font-weight: bold;
    color: #333;
    margin-right: 10px;
}

.label3 {
    min-width: 70px;
    /* 固定标签宽度 */
    text-align: right;
    font-weight: bold;
    color: #333;
    margin-right: 10px;
}

.card2 .content {
    flex-grow: 1;
    /* 内容区域占据剩余空间 */
    word-break: break-all;
    /* 允许长单词或 URL 地址换行 */
    white-space: normal;
    /* 允许换行 */
    color: #555;
}

//
.section {
    margin-bottom: 20px;
}

.section ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.section li {
    display: flex;
    align-items: center;
    /* 垂直居中 */
    margin-bottom: 10px;
    flex-wrap: wrap;
    /* 允许换行 */
}

.label {
    min-width: 100px;
    /* 固定宽度，可根据需要调整 */
    font-weight: 400;
    color: #333;
}

.article p {
    font-size: 28rpx;
    line-height: 2.2;
    margin-bottom: 9px;
}

.section h2 {
    font-size: 20px;
    color: #333;
    margin-bottom: 10px;
}

.card {
    background: #fff;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 15px;
}

.card h3,
.card2 h3 {
    font-size: 18px;
    color: #222;
    display: block;
    margin-bottom: 10px;
}

.card p {
    margin: 5px 0;
    color: #555;
    display: flex;

    font-size: 24rpx;
}

ul {
    list-style-type: disc;

    color: #555;
}

li {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 5px;
    flex-wrap: wrap;
    line-height: 2.1;
    font-size: 24rpx;

}

// strong {
//     color: #333;
//     font-size: 26rpx;
//     width: 130rpx;

//     /* 固定标签容器宽度 */
//     text-align: justify;
//     /* 文本两端对齐 */
//     text-align-last: justify;
//     /* 最后一行也两端对齐 */
//     overflow: hidden;
//     /* 防止文本溢出 */
//     text-overflow: clip;
//     /* 文本溢出时裁剪 */
//     box-sizing: border-box;
// }

.page-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 10px;
    background-color: #007AFF;
    text-align: center;
}

.page-footer button {
    background-color: #fff;
    color: #007AFF;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 4px;
}

/* 轮播图 */
.banner-container {
    height: 400rpx;
    position: relative;
}

.banner-swiper {
    width: 100%;
    height: 100%;
}

.banner-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.banner-index {
    position: absolute;
    bottom: 80rpx;
    /* 向上调整位置 */
    right: 20rpx;
    background-color: rgba(0, 0, 0, 0.5);
    color: #ffffff;
    font-size: 24rpx;
    padding: 6rpx 16rpx;
    border-radius: 20rpx;
    z-index: 10;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    gap: 10rpx;
}

.banner-index-image {
    width: 12pt;
    height: 12pt;
}

/* 餐厅信息卡片 */
.restaurant-card {
    margin: -40rpx 30rpx 0;
    background-color: #ffffff;
    border-radius: 20rpx;

    padding: 30rpx 30rpx 2rpx 30rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
    position: relative;
    z-index: 10;
}

.card-header {
    margin-bottom: 20rpx;
}

.restaurant-name {
    font-size: 36rpx;
    font-weight: bold;
    color: #333333;
    margin-bottom: 16rpx;
}

.restaurant-tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
}

.recommend-icon {
    width: 200rpx;
    height: 36rpx;
}

.tag-item {
    background-color: #fff7e6;
    color: #ff6600;
    font-size: 24rpx;
    padding: 6rpx 12rpx;
    border-radius: 12rpx;
}

.card-info {
    margin-bottom: 0;
}

.info-row {
    display: flex;
    margin-bottom: 20rpx;

    gap: 60rpx;
}

// .info-item {
//     padding: 20rpx 0rpx;
//     border-top: 1rpx solid #ebebeba6;
//     border-bottom: 1rpx solid #ebebeba6;
//     display: flex;
//     width: 100%;
// }
.info-item {
    display: flex;
    align-items: center;
    font-size: 24rpx;
    color: #333;
    margin-bottom: 20rpx;
}

.info-item .label {
    width: 130rpx;
    /* 固定标签容器宽度 */
    text-align: justify;
    /* 文本两端对齐 */
    text-align-last: justify;
    /* 最后一行也两端对齐 */
    overflow: hidden;
    /* 防止文本溢出 */
    text-overflow: clip;
    /* 文本溢出时裁剪 */
    box-sizing: border-box;
}

.info-item .colon {
    width: 30rpx;
    /* 固定冒号宽度 */
    text-align: center;
    font-weight: bold;
}

.info-item .value {
    flex: 1;
    /* 值占据剩余空间 */
    padding-left: 10rpx;
}

.info-text {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20rpx;
}

.status {
    font-weight: 500;
}

.hours {
    font-size: 24rpx;
}

.flex-between {
    justify-content: space-between;
    align-items: center;
}

.location-row {
    padding-top: 10rpx;
}

.location-info {
    flex: 1;
}

.address-text {
    font-size: 24rpx;
    font-weight: bold;
    color: #333333;
    margin-bottom: 10rpx;
}

.distance-text {
    font-size: 22rpx;
    color: #767676;
}

.actions-group {
    display: flex;
    gap: 30rpx;
    align-items: center;
}

.actions-group image {
    width: 36rpx;
    height: 36rpx;
}

.action-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.action-text {
    font-size: 24rpx;
    color: #666666;
    margin-top: 10rpx;
}

.actions-group .text {
    color: #767676;
    font-size: 20rpx;
}

/* 标签页与内容区域 */
.tabs-content-container {
    margin: 20rpx 30rpx 40rpx;
    background-color: #ffffff;
    border-radius: 20rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
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

/* 内容区域 */
.content-section {
    padding: 30rpx;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    // margin-top: 30rpx;
}

.tabs-title {
    font-weight: 500;
    margin: 11px 17px 22px;
    font-size: 32rpx;
    color: #333333;
}

.content-inner {
    background-color: #ffffff;
}

.intro-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-grow: 1;
}

.recommendation {
    font-size: 26rpx;
    color: #333333;
    line-height: 2.2;
    flex-grow: 1;
}

.recommendation p {
    margin-bottom: 20rpx;
}

/* 评价部分 */
.reviews-header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30rpx;
}

.header-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333333;
}

.header-action {
    display: flex;
    align-items: center;
    color: #000000;
    font-size: 24rpx;
}

.reviews-list {
    display: flex;
    flex-direction: column;
    gap: 30rpx;
}

.review-item {
    padding: 10rpx;
    // background-color: #F8F8F8;
    border-radius: 20rpx;
}

.review-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20rpx;
}

.user-avatar {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    object-fit: cover;
}

.user-info {
    margin-left: 20rpx;
    flex: 1;
}

.user-name {
    font-size: 28rpx;
    color: #333333;
    font-weight: 500;
}

.review-date {
    font-size: 24rpx;
    color: #999999;
    margin-top: 6rpx;
}

.review-rating {
    display: flex;
}

.review-content {
    font-size: 28rpx;
    color: #333333;
    line-height: 1.5;
    margin-bottom: 20rpx;
    position: relative;
}

.review-text {
    display: block;
}

.line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    width: 95%;
}

.full-text-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #0c0c0c;
    font-size: 25rpx;
    position: absolute;
    right: 8rpx;
    bottom: -12rpx;
    z-index: 5;
    border-radius: 10rpx;
}

.review-images {
    margin-top: 20rpx;
}

.image-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10rpx;
}

.review-image {
    width: 180rpx;
    height: 180rpx;
    border-radius: 12rpx;
    object-fit: cover;
}

/* 商家信息 */
.merchant-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333333;
    margin-bottom: 30rpx;
}

.merchant-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20rpx;
}

.merchant-item {
    padding: 0 0 20rpx 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.item-icon {
    width: 80rpx;
    height: 80rpx;
    // border: 1px dashed rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20rpx;
}

.fw-icon {
    width: 32rpx;
    height: 32rpx;

    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20rpx;
}

.fw-icon image {
    width: 32rpx;
    height: 32rpx;
}

.item-icon image {
    width: 80rpx;
    height: 80rpx;
}

.item-name {
    font-size: 24rpx;
    color: #333333;
}

::v-deep .uni-icons {
    display: block;
}
</style>