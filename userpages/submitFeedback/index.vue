<template>
    <view class="container">
        <view class="feedback-container">
            <!-- 记录文字 -->
            <view class="record-section" @click="jumpto">

                <my-icon type="log" color="#333333" size="24rpx" line-height="1"></my-icon>
                <text class="record-text">记录</text>
            </view>

            <!-- 问题类型 -->
            <view class="problem-type-section">
                <text class="problem-type-title">问题类型</text>
                <view class="problem-type-buttons">
                    <view v-for="(item, index) in problemTypes" :key="index"
                        :class="['problem-type-button', item.selected ? 'selected' : '']"
                        @click="selectProblemType(item)">
                        {{ item.name }}
                    </view>
                </view>
            </view>

            <!-- 订单信息 -->
            <view class="order-info-section" v-if="ordershow">
                <view class="orderquestion">
                    <text class="order-question">对此订单有疑惑？</text>

                    <view class="record-section" @click="showPopup">


                        <my-icon type="refresh" size="24rpx" color="#333"></my-icon>
                        <text class="record-text">换个订单</text>
                    </view>
                </view>
                <uni-popup ref="popup" type="bottom">
                    <view class="popup-content">
                        <view class="popup-header">
                            <view class="title-container">
                                <text class="popup-title">选择订单</text>
                            </view>
                            <uni-icons type="closeempty" size="56rpx" @click="closePopup"></uni-icons>
                        </view>

                        <!-- 订单选项 -->
                        <view class="order-list-container">
                            <view class="order-list" v-for="(orderInfo, index) in allorderInfo" :key="index"
                                @click="selectOrder(orderInfo.orderId)">
                                <view class="order-container">
                                    <view class="order-item">
                                        <view class="order-info">
                                            <label>
                                                <image class="shop-icon " :src="orderInfo.shopImage"></image>
                                                <text class="shop-name shop-name2">{{
                                                    displayedRemarkText(orderInfo.shopName)
                                                    }}</text>
                                                <!-- <uni-icons type="right" size="16" color="#333"></uni-icons> -->
                                            </label>
                                            <view class="order-status order-status2">{{ orderInfo.status }}</view>
                                        </view>
                                        <view class="order-content">
                                            <image :src="orderInfo.orderimg" class="order-image order-image2"></image>
                                            <view class="order-data">
                                                <view class="order-title order-title2">{{
                                                    displayedRemarkText(orderInfo.orderContent)
                                                    }}</view>
                                                <view class="order-time order-time2">下单时间：{{ orderInfo.orderTime }}
                                                </view>
                                            </view>
                                        </view>
                                        <view class="order-price order-price2">共{{ orderInfo.itemCount }}件
                                            <span>¥</span><text>{{
                                                orderInfo.amount
                                                }}</text>
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </uni-popup>
                <!-- 订单列表 -->
                <view class="order-list order-listshadow">
                    <view class="order-container">
                        <view class="order-item">
                            <view class="order-info">
                                <label>
                                    <image class="shop-icon" :src="orderInfo.shopImage"></image>
                                    <text class="shop-name">{{
                                        displayedRemarkText(orderInfo.shopName)
                                        }}</text>
                                    <uni-icons type="right" size="32rpx" color="#333"></uni-icons>
                                </label>
                                <view class="order-status">{{ orderInfo.status }}</view>
                            </view>
                            <view class="order-content">
                                <image :src="orderInfo.orderimg" class="order-image"></image>
                                <view class="order-data">
                                    <view class="order-title">{{
                                        displayedRemarkText(orderInfo.orderContent)
                                        }}</view>
                                    <view class="order-time">下单时间：{{ orderInfo.orderTime }}</view>
                                </view>
                            </view>
                            <view class="order-price">共{{ orderInfo.itemCount }}件 <span>¥</span><text>{{
                                orderInfo.amount
                                    }}</text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <!-- 问题说明 -->
            <text class="problem-type-title problem-type-section ">问题说明</text>

            <view class="comment-container">
                <!-- 输入前显示的提示头 -->
                <view v-if="feedbackSubmission.description === ''" class="comment-header" @click="toggleTextarea">
                    <uni-icons type="compose" size="16" color="#ADADAD"></uni-icons>
                    <text class="comment-label">请简单描述您的问题，我们将尽快解决？</text>
                </view>

                <!-- 实际输入框 -->
                <textarea ref="textarea" v-model="feedbackSubmission.description" class="comment-input" placeholder=" "
                    maxlength="200" auto-height @input="onCommentInput" @focus="onFocus" />

                <!-- 字数统计 -->
                <text class="word-count">{{ feedbackLength }}/200</text>
            </view>

            <!-- 上传图片 -->

            <view class="upload-container">
                <view v-for="(item, index) in mediaItems" :key="index">
                    <EnhancedMediaItem :mediaSrc="item.src" :isVideo="item.isVideo" :index="index"
                        :showDeleteButton="true" :width="width" :height="height" @remove="handleRemove"
                        :showStyle="true" :margin="margin" :videoPath="item.videoPath" />
                </view>
                <!-- 当没有媒体项时显示的上传图标 -->
                <view v-if="mediaItems.length < maxMediaItems" class="add-media-btn" @click="chooseFile">
                    <uni-icons type="plus" size="80rpx" color="#ADADAD" />

                </view>
                <text class="upload-subtip">（建议比例1:1 , 大小不超过10M，最多选择{{ maxMediaItems }}条数据）</text>
            </view>
        </view>

        <!-- 提交按钮 -->
        <view class="bottom-bar">
            <view class="problem-robot">

                <movable-area>
                    <movable-view :x="x" :y="y" direction="all" @change="onChange" animation="true">
                        <image src="https://north-ai-test-public1.oss-cn-beijing.aliyuncs.com/static/images/robot.png"
                            class="robot-icon" @click="jumpToRobot"></image>
                    </movable-view>
                </movable-area>
            </view>
            <view class="submit-bar">
                <view class="submit-btn" v-if="!isSubmitEnabled">提交</view>
                <view class="submit-btn btn-enabled" @click="submitFeedback" v-else>提交</view>
            </view>
        </view>
    </view>
</template>

<script>
import EnhancedMediaItem from '@/components/EnhancedMediaItem.vue';
import MyIcon from '@/components/myIcon.vue';


export default {
    components: {
        EnhancedMediaItem,
        MyIcon
    },
    data() {
        return {
            margin: '10rpx',
            width: '160rpx', // 宽度
            height: '160rpx', // 高度
            isSubmitting: false, // 新增一个提交锁
            showTextarea: false,
            problemTypes: [
                { name: "交易投诉", selected: true },
                { name: "功能异常", selected: false },
                { name: "产品建议", selected: false },
                { name: "违规举报", selected: false },
                { name: "优化建议", selected: false },
                { name: "其他反馈", selected: false },
            ],
            x: 0,
            y: 0,
            old: {
                x: 0,
                y: 0
            },
            showorder: false,
            ordershow: true,
            orderInfo: {},
            allorderInfo: [

            ],
            mediaItems: [], // 媒体项列表
            maxMediaItems: 4, // 最大媒体项数量
            orderId: null,
            feedbackSubmission: {
                orderId: "", // 订单ID
                id: "", // 投诉反馈ID，可以是系统自动生成的唯一标识符
                complaintFeedbackId: "", // 如果有独立的投诉反馈ID，则添加此项
                complaintType: "", // 投诉类型，例如：交易问题、功能异常等
                problemType: "", // 问题类型，更具体的分类，如支付失败、配送延迟等
                description: "", // 问题说明
                media: [], // 问题图片，多张图片的URL数组
                submitTime: "", // 提交时间，格式化日期字符串，例如："2025-04-10 14:27"
                submitter: {
                    // 提交人信息
                    userId: "", // 用户ID或匿名用户标识
                    name: "", // 提交人的姓名或昵称
                    contactInfo: "", // 联系方式，如电子邮件或电话号码（可选）
                },
                status: "pending", // 反馈状态，例如：'pending'(待处理), 'processing'(处理中), 'resolved'(已解决)
                additionalInfo: {
                    // 需要的补充信息
                    orderDetails: {
                        // 关联订单详情（如果适用）
                        restaurantName: "", // 餐厅名称
                        items: [], // 订单中的商品列表
                        totalPrice: 0, // 总价
                        transactionStatus: "", // 交易状态，例如：成功、失败
                    },
                    followUpActions: [], // 后续操作步骤或备注
                    resolutionSummary: "", // 解决方案摘要（在问题解决后填写）
                },
            },
        };
    },
    computed: {
        ordersinfo() {
            return this.$store.getters.getOrders;
        },
        feedbackLength() {
            return this.feedbackSubmission.description.length;
        },
        isSubmitEnabled() {
            return (
                this.feedbackSubmission.problemType != "" &&
                this.feedbackSubmission.description.trim().length > 0
            );
        },
    },
    mounted() {

    },
    onReady() {
        const systemInfo = uni.getSystemInfoSync();
        const windowWidth = systemInfo.windowWidth;
        const windowHeight = systemInfo.windowHeight;
        const iconSizePx = uni.upx2px(150);
        this.x = windowWidth - iconSizePx;
        this.y = windowHeight - iconSizePx - 100;
    },
    onLoad(options) {
        if (options.orderId) {
            this.orderId = parseInt(options.orderId);
            this.getOrderInfo();
        }


    },
    methods: {
        tap(e) {
            this.x = this.old.x
            this.y = this.old.y
            this.$nextTick(function () {
                this.x = 30
                this.y = 30
            })
        },
        onChange(e) {
            this.old.x = e.detail.x
            this.old.y = e.detail.y
        },
        getOrderInfo() {

            this.$store.dispatch("loadOrdersFromCache");
            this.orderInfo = this.$store.getters.getOrders.find(
                (order) => order.orderId === this.orderId
            )
            this.feedbackSubmission.orderId = this.orderId;
            this.feedbackSubmission.problemType = this.problemTypes[0].name;
            this.allorderInfo = this.$store.getters.getOrders;
            this.showorder = true;
        },
        jumpto() {
            uni.navigateTo({
                url: "/userpages/submitFeedback/info",
            });
        },
        selectOrder(orderId) {
            this.orderInfo = this.allorderInfo.find(
                (order) => order.orderId === orderId
            )
            this.closePopup();
        },

        displayedRemarkText(title) {

            return this.$utils.truncate(title, 13);
        },
        selectProblemType(item) {
            this.problemTypes.forEach((type) => {
                type.selected = type === item;
                this.feedbackSubmission.problemType = type.name;
            });
            if (item.name === "功能异常" || item.name === "其他反馈") {

                this.ordershow = false;
            }
            else {
                this.ordershow = true;
            }
        },
        showPopup() {
            this.$refs.popup.open();
        },
        closePopup() {
            this.$refs.popup.close();
        },


        onFocus() {
            const that = this;
            this.$nextTick(() => {
                setTimeout(() => {
                    if (that.$refs.textarea && that.$refs.textarea.$el) {
                        // 微信小程序兼容写法
                        const query = uni.createSelectorQuery().in(this);
                        query
                            .select(".comment-input")
                            .boundingClientRect((res) => {
                                if (res) {
                                    uni.focus({ selectorQuery: query });
                                }
                            })
                            .exec();
                    }
                }, 150);
            });
        },
        toggleTextarea() {
            this.showTextarea = true;
        },
        onCommentInput(e) {
            this.feedbackSubmission.description = e.detail.value;
        },
        handleRemove(index) {
            // 删除操作
            this.mediaItems.splice(index, 1);
        },
        chooseFile() {
            const that = this;

            uni.chooseMedia({
                count: that.maxMediaItems - that.mediaItems.length,
                mediaType: ['image', 'video'],
                sourceType: ['album', 'camera'],
                success(res) {
                    res.tempFiles.forEach(file => {
                        const isVideo = /\.(mp4|mov|avi|mkv)$/i.test(file.tempFilePath);

                        if (isVideo && that.mediaItems.length < that.maxMediaItems) {
                            // 如果是视频，先加载封面图
                            uni.getImageInfo({
                                src: file.thumbTempFilePath,
                                success(imageRes) {
                                    // 图片加载成功后才 push 到数组中
                                    that.mediaItems.push({
                                        id: Math.floor(Math.random() * 999) + 1,
                                        src: file.tempFilePath,
                                        videoPath: imageRes.path, // 使用加载完成的路径
                                        isVideo: true
                                    });
                                },
                                fail(err) {
                                    console.error('封面图加载失败:', err);
                                }
                            });

                        } else if (!isVideo && that.mediaItems.length < that.maxMediaItems) {
                            // 图片直接添加
                            that.mediaItems.push({
                                id: Math.floor(Math.random() * 999) + 1,
                                src: file.tempFilePath,
                                videoPath: '',
                                isVideo: false
                            });
                        }
                    });
                    //强制刷新
                    that.$nextTick(() => {
                        that.mediaItems = [...that.mediaItems];
                    })
                }
            });

            console.log(that.mediaItems); // 注意：这个 log 是同步的，可能在异步加载完成前就执行了
        },

        jumpToRobot() {
            uni.navigateTo({
                url: "/userpages/chatMate/index",
            });
        },
        submitFeedback() {
            if (this.isSubmitting) return; // 锁住重复提交
            this.isSubmitting = true;

            uni.showLoading({
                title: "提交中...",
                mask: true,
            });

            try {
                this.feedbackSubmission.media = this.mediaItems;
                const feedbacks = {
                    ...this.feedbackSubmission,
                    submitTime: this.$utils.formatTime(new Date()),
                    id: Math.floor(Math.random() * 10) + 2,
                    complaintFeedbackId: Math.floor(Math.random() * 11) + 1,
                    submitter: {
                        // userId: this.$store.getters.getUserInfo.userId || '',
                        userId: "1234567890",
                        name: "John Doe", // 示例姓名
                        contactInfo: "john@example.com", // 示例联系方式
                    },
                };
                this.$store.dispatch("saveFeedbacksToCache", feedbacks);
                this.$store.dispatch("updateOrderStatus", {
                    orderId: this.orderId,
                    field: "feedbacks",
                    value: true,
                });
                setTimeout(() => {
                    uni.hideLoading();

                    //给出友好提示，跳转到历史记录页面
                    uni.showToast({
                        title: "提交成功",
                        icon: "success",
                        duration: 2000,
                        success: () => {
                            setTimeout(() => {

                                uni.navigateTo({
                                    url: "/userpages/submitFeedback/info",
                                });
                            }, 1000);
                        },
                    });

                    // 重置提交状态，允许再次提交（可选）
                    this.isSubmitting = false;
                }, 500); // 给 loading 一点时间展示
            } catch (error) {
                console.error("提交失败:", error);
                uni.hideLoading();
                uni.showToast({ title: "提交失败", icon: "none" });
                this.isSubmitting = false;
            }
        },
    },

};
</script>

<style scoped>
.container {
    background-color: #fff;


}



.feedback-container {
    height: calc(100vh - 100rpx);
    overflow-y: scroll;
    padding: 30rpx;
}

.record-section {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 15rpx;
}

.record-text {
    font-size: 24rpx;
    color: #000000;
    margin-left: 10rpx;
}

.problem-type-section {
    margin-bottom: 20rpx;
}

.problem-robot {


    width: 100%;
}

movable-area {
    height: 90vh;
    width: 99%;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
}

movable-view {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 150rpx;
    width: 150rpx;
    position: relative;
    pointer-events: auto;

}


.robot-icon {
    width: 140rpx;
    height: 140rpx;
}

.problem-type-title {
    font-size: 30rpx;
    font-weight: bold;
    margin-bottom: 20rpx;
    display: inline-block;
}

.problem-type-buttons {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: start;
    /* gap: 20rpx; */
    margin-top: -10rpx;
}

.problem-type-button {
    margin: 20rpx 10rpx 10rpx 20rpx;

    border-radius: 20rpx;
    padding: 10rpx 20rpx;
    font-size: 24rpx;
    color: #767676;
    background-color: #f6f6f6;
}

.problem-type-button.selected {
    color: #fe7b18;
    background-color: #ffeddd;
}

.order-info-section {
    margin-bottom: 30rpx;
}

.orderquestion {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16rpx;
}

.order-question {
    font-size: 26rpx;
}

.change-order {
    font-size: 28rpx;
    color: #fe7b18;
    float: right;
}

.popup-content {
    padding: 20rpx;
    border-top-left-radius: 50rpx;
    border-top-right-radius: 50rpx;
    background: #EEEEEE;
    min-height: 980rpx;

}

.popup-header {
    margin-bottom: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.popup-header .title-container {
    flex: 1;
    display: flex;
    justify-content: center;
    margin-left: 60rpx;
}

.popup-title {
    font-size: 32rpx;
    text-align: center;
    margin-bottom: 20rpx;

    font-weight: 500;
}

.popup-close {
    position: absolute;
    top: 20rpx;
    right: 20rpx;
    font-size: 28rpx;
}

.order-list-container {
    height: 900rpx;
    overflow: scroll;
}

.order-list {
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: white;
    border-radius: 20rpx;
    padding: 20rpx 20rpx 0rpx 20rpx;
    margin-bottom: 30rpx;

}

.order-listshadow {
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
}

.order-container {


    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

}

.order-item {
    background-color: white;
    border-radius: 20rpx;
    /* padding: 20rpx; */

    width: 100%;
    margin-bottom: 30rpx;
}

.order-image {
    width: 100rpx;
    height: 100rpx;
    margin-right: 20rpx;
    border-radius: 10rpx;
}

.order-image2 {
    width: 120rpx;
    height: 120rpx;
}

.order-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20rpx;
}

.order-info label {
    display: flex;
    align-items: center;
}

.shop-icon {
    width: 50rpx;
    height: 50rpx;
    border-radius: 10rpx;
}

.shop-name {
    font-size: 26rpx;
    margin-left: 15rpx;
    flex-grow: 1;
    font-weight: 500;
}

.shop-name2 {
    font-size: 30rpx;
}

.order-title {
    font-size: 26rpx;
    font-weight: 500;
}

.order-title2 {
    font-size: 30rpx;
}

.order-content {
    display: flex;
    justify-content: flex-start;

    padding-left: 65rpx;
}

.order-data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 20rpx;
}

.order-time {
    font-size: 22rpx;
    color: #666;
    margin-bottom: 10rpx;
}

.order-time2 {
    font-size: 26rpx;
}

.order-price {
    font-size: 22rpx;
    color: #333;
    text-align: right;
}

.order-price span {
    color: #333;
    display: inline-block;
    padding-left: 10rpx;
    padding-right: 4rpx;
    font-weight: 500;
}

.order-price text {
    font-size: 38rpx;
    font-weight: 500;
    color: #333;
    letter-spacing: 2rpx;
}

.order-price2 text {
    font-size: 42rpx;
}

.order-status {
    font-size: 22rpx;
    color: red;
}

.order-status2 {
    font-size: 26rpx;
}

/* 图片/视频上传区域 */
.upload-container {
    margin: 40rpx 0 80rpx 0;
    border-radius: 10rpx;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    z-index: 1000;

}





.upload-subtip {
    font-size: 18rpx;
    color: #bfbfbf;
    margin-top: 10rpx;
}



.add-media-btn {
    width: 160rpx;
    height: 160rpx;
    background-color: #f6f6f6;
    border-radius: 16rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-left: 10rpx;
}

/* 评论输入区域 */
.comment-container {
    background-color: #f6f6f6;
    margin-bottom: 40rpx;
    position: relative;
    min-height: 260rpx;
    border-radius: 10rpx;
    padding-top: 40rpx;
}

.comment-header {
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;
    cursor: pointer;
    position: absolute;
    left: 20rpx;
}

.comment-label {
    font-size: 24rpx;
    color: #adadad;
    margin-left: 20rpx;
}

.comment-input {
    font-size: 28rpx;
    color: #333;
    min-height: 160rpx;
    padding: 20rpx;
    background-color: transparent;
    border: none;
    width: 86%;
    box-sizing: border-box;
    resize: none;
    position: absolute;
    top: 24rpx;
}

.word-count {
    font-size: 24rpx;
    color: #999;
    position: absolute;
    bottom: 10rpx;
    right: 20rpx;
}

/* 底部操作栏 */
.bottom-bar {
    position: fixed;
    bottom: 40rpx;
    left: 0;
    right: 0;
    z-index: 100;
    margin: 0 30rpx;
    display: flex;
    flex-direction: column;
}

.anonymous-section {
    margin-bottom: 20rpx;
}

.radio-label {
    display: flex;
    align-items: center;
    font-size: 24rpx;
    color: #adadad;
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

::v-deep .uni-popup {
    z-index: 110;
}

::v-deep .vue-ref {
    padding-bottom: 0 !important;
}
</style>