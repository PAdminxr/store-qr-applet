<template>
    <view class="container">
        <!-- 导航栏 -->
        <view class="custom-nav" :style="{ paddingTop: statusBarHeight + 'px' }">
            <view class="nav-content">
                <view class="nav-left" @click="goBack">
                    <uni-icons type="back" size="48rpx"></uni-icons>
                </view>
                <view class="nav-title">AI助理</view>
                <view></view>
            </view>
        </view>

        <view class="content">
            <!-- 头部 -->
            <view class="header" :style="{ paddingTop: statusBarHeight + 'rpx' }">
                <image src="https://cdn.jsdelivr.net/gh/PAdminxr/store-qr-applet@main/static/images/robot.png"
                    class="robot-icon"></image>
                <view class="greeting">
                    <text class="title">Hi~ 我是小助理</text>
                    <text class="subtitle">很高兴为您提供服务！</text>
                </view>
            </view>

            <!-- 常见问题 -->
            <view class="faq-container">
                <view class="faq-header">
                    <view>
                        <uni-icons type="help-filled" size="48rpx" color="#203C7E"></uni-icons>
                        <text class="faq-title">常见问题</text>
                    </view>
                    <view @click="changeFAQ">
                        <uni-icons type="refreshempty" size="28rpx" color="#203C7E"></uni-icons>
                        <text class="faq-title faq-refreshempty">换一批</text>
                    </view>
                </view>
                <view class="faq-list">
                    <view v-for="(item, index) in faqList" :key="index" class="faq-item"
                        @click="navigateToDetail(item)">
                        {{ item.title }}
                        <uni-icons type="arrowright" size="32rpx" color="#333"></uni-icons>
                    </view>
                </view>
            </view>

            <!-- 聊天区域 -->
            <scroll-view class="scroll" scroll-y :upper-threshold="20" :scroll-top="scrollTop"
                :scroll-with-animation="scrollAnimation" @touchmove="show_from = false">

                <view id="chat-lists" v-for="(record, index) in chatRecords" :key="index"
                    :class="[record.type === 'user' ? 'user-message-item' : 'assistant-message-item']">
                    <view :class="[
                        'bubble',
                        record.type === 'user' ? 'user-bubble' : 'assistant-bubble'
                    ]">
                        {{ record.message }}
                    </view>
                </view>


            </scroll-view>


            <!-- 输入框和按钮 -->
            <view class="input-bar-container" :style="{ bottom: '40rpx' }">

                <view class="mic-section" @longtap="onLongTapVoiceBtn" @touchmove="onTouchMoveVoicBtn"
                    @touchend="onTouchEndVoiceBtn">
                    <uni-icons type="mic" size="56rpx" color="#333"></uni-icons>
                </view>
                <input v-model="inputMessage" @confirm="sendMessage" placeholder="有什么问题尽管问我" class="chat-input" />
                <view class="send-section" @click="addsendMessage">
                    <uni-icons type="plusempty" size="56rpx" color="#333"></uni-icons>
                </view>
            </view>
        </view>
        <view class="voiced" :class="{ show: show_voice }">
            <image class="voice_img" mode="widthFix"
                :src="(show_voice ? 'https://cdn.jsdelivr.net/gh/PAdminxr/store-qr-applet@main/static/images/recorde.gif' : 'https://cdn.jsdelivr.net/gh/PAdminxr/store-qr-applet@main/static/images/none.png')">
            </image>
            <view class="tip">手指上滑取消发送</view>
        </view>
        <view class="voiced" :class="{ show: show_cancel_voice }">
            <image class="voice_img" mode="widthFix"
                :src="'https://cdn.jsdelivr.net/gh/PAdminxr/store-qr-applet@main/static/images/quxiao.png'">
            </image>
            <view class="tip">松开手指取消发送</view>
        </view>
    </view>
</template>
<script>
const recorderManager = uni.getRecorderManager();
const innerAudioContext = uni.createInnerAudioContext();
export default {

    data() {
        return {
            voice_index: 0,
            show_voice: false,
            show_cancel_voice: false,
            faqList: [
                { title: '系统一直闪退' },
                { title: '发布作品显示异常' },
                { title: '平台商家线下恶意涨价' },
                { title: '订单商品存在质量问题如何退款？' }
            ],
            chatRecords: [
                { type: 'user', message: '你好' },
                { type: 'assistant', message: '您好！我是您的智能助手，有什么可以帮您？' }
            ],
            inputMessage: '',
            scrollTop: 0,
            statusBarHeight: 0,
            windowHeight: 0,
            scrollAnimation: false,
            index: 0,
            apply_time: '',
            ly_time: '',
        };
    },

    mounted() {
        uni.getSystemInfo({
            success: (res) => {
                this.statusBarHeight = res.statusBarHeight;

            }
        });


    },
    methods: {

        goBack() {
            uni.navigateBack();
        },
        changeFAQ() {
            console.log('更换常见问题');
            let now_time = Date.parse(new Date())
            if (this.apply_time && now_time - this.apply_time < 1000) {
                uni.showToast({
                    title: "您的操作过于频繁",
                    icon: 'none'
                })
                return
            }
            this.index++
            if (this.index % 2 == 0) {
                this.faqList = [
                    { title: '系统一直闪退' },
                    { title: '发布作品显示异常' },
                    { title: '平台商家线下恶意涨价' },
                    { title: '订单商品存在质量问题如何退款？' }
                ]
            }
            else {
                this.faqList = [
                    { title: '如何申请退款？' },
                    { title: '如何查看订单状态？' },
                    { title: '如何联系客服？' },
                    { title: '如何取消订单？' }
                ];
            }
            this.apply_time = now_time
        },
        navigateToDetail(item) {
            uni.showToast({
                title: "客官~ 该功能暂未开放哦~",
                icon: 'none'
            });
            console.log('跳转到详细页面:', item.title);
        },
        sendMessage() {
            const message = this.inputMessage.trim();
            if (!message) return;

            this.chatRecords.push({ type: 'user', message });
            this.inputMessage = '';



            setTimeout(() => {
                const reply = this.generateReply(message);
                this.chatRecords.push({ type: 'assistant', message: reply });
                this.$nextTick(() => {
                    this.setScrollTop(true)
                });
            }, 100);
        },
        addsendMessage() {
            uni.showToast({
                title: "客官~ 该功能暂未开放哦~",
                icon: 'none',
            });
        },
        generateReply(message) {
            if (message.includes('你好')) {
                return '您好~ 很高兴为您服务！';
            } else if (message.includes('帮助')) {
                return '您可以直接告诉我您需要什么帮助哦！';
            } else if (message.includes('订单')) {
                return '关于订单的问题，请提供订单号以便我为您查询。';
            } else if (message.includes('退款')) {
                return '请前往【我的订单】中申请退款，如有疑问可继续提问。';
            } else {
                return '抱歉，我不太明白您的意思，请尝试更清晰地描述您的问题。';
            }
        },

        toggleVoiceInput() {
            console.log("语音输入模式切换");
        },
        setScrollTop(scrollAnimation = true) {

            this.scrollAnimation = scrollAnimation


            let query = wx.createSelectorQuery()
            query.select('#chat-lists').boundingClientRect(rect => {
                const scrollHeight = rect.height;
                this.scrollTop += scrollHeight + 300
                console.log(this.scrollTop);
            }).exec();


        },

        onLongTapVoiceBtn(e) {
            this.show_voice = true
            this.show_cancel_voice = false
            this.voice_index++
        },


        onTouchMoveVoicBtn(e) {
            if (this.show_voice == false) return
            this.show_cancel_voice = true
            this.show_voice = false
        },
        onTouchEndVoiceBtn(e) {

            let now_time = Date.parse(new Date())

            if (this.ly_time && now_time - this.ly_time < 3000) {
                uni.showToast({
                    title: "您的操作过于频繁",
                    icon: 'none'
                })
                return
            }
            if (this.show_voice == false && this.show_cancel_voice == false && this.voice_index < 1) {
                uni.showToast({
                    title: '长按体验录音功能',
                    icon: 'none'
                })
                return
            }
            this.show_cancel_voice = false
            this.show_voice = false
            this.ly_time = now_time
        },

    }
};
</script>
<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    background: linear-gradient(135deg, #7FA0F4, #BDCDF6, #F0F2F8);

    height: 100vh;
    overflow: hidden;
}

.content {
    height: calc(100vh - 200rpx);
    padding: 20rpx;

}

.custom-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
}

.nav-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10rpx;
    box-sizing: border-box;
}

.nav-left,
.nav-right {
    display: flex;
    align-items: center;
}

.nav-title {
    font-size: 36rpx;
    font-weight: bold;
    padding-right: 6%;
}

.header {
    display: flex;
    align-items: center;
    margin-top: 150rpx;
    margin-bottom: 20rpx;
    justify-content: center;
}

.robot-icon {
    width: 140rpx;
    height: 140rpx;
    margin-right: 20rpx;
}

.greeting {
    display: flex;
    flex-direction: column;
    color: #203C7E;
    font-size: 36rpx;
    font-weight: bold;
    letter-spacing: 0.05em;
}

.faq-container {
    background-color: #DEEAFD;
    border-radius: 20rpx;
    padding: 20rpx;
    margin-bottom: 20rpx;
}

.faq-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20rpx;
}

.faq-header view {
    display: flex;
    align-items: center;
}

.faq-title {
    font-size: 32rpx;
    color: #203C7E;
    margin-left: 10rpx;
    font-weight: bold;
}

.faq-refreshempty {
    font-size: 26rpx;
    font-weight: normal;
}

.change-btn {
    font-size: 28rpx;
    color: #333;
    background-color: transparent;
    border: none;
}

.faq-list .faq-item {
    background-color: #F0F6FF;
    border-radius: 50rpx;
    padding: 20rpx;
    margin-bottom: 20rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 28rpx;
    color: #333;
}

// .chat-content {
//     flex: 1;
//     padding: 20rpx 0;
//     width: 100%;
//     max-height: 500rpx;
// }
.scroll {
    width: 100%;
    height: calc(100vh - 1030rpx);

    box-sizing: border-box;

}

.bubble {
    display: inline-block;
    padding: 20rpx;
    min-width: 10%;
    font-size: 28rpx;
    line-height: 1.4;
    word-break: break-all;
    max-width: 90%;
}

.user-bubble {
    background-color: #4a90e2;
    color: white;
    border-top-left-radius: 20rpx;
    border-bottom-right-radius: 40rpx;
    border-bottom-left-radius: 20rpx;
}

.assistant-bubble {
    background-color: #ffffffcc;
    color: #333;
    border-top-right-radius: 20rpx;
    border-bottom-right-radius: 20rpx;
    border-bottom-left-radius: 40rpx;
}

.user-message-item {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20rpx;
}

.assistant-message-item {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20rpx;
}

.input-bar-container {
    position: fixed;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    z-index: 99;
    padding: 10rpx;
    box-sizing: border-box;
}

.mic-section,
.chat-input,
.send-section {
    display: flex;
    align-items: center;
    height: 80rpx;
    /* 统一高度 */
    padding: 0 20rpx;
    background-color: #FFFFFF;
    /* 各自的背景色 */
    border-radius: 50rpx;
    margin-right: 10rpx;
    z-index: 100;
}

.mic-section,
.send-section {
    width: 80rpx;
    justify-content: center;
}

.chat-input {
    flex: 1;
    padding: 0 20rpx;
    font-size: 28rpx;
    background-color: #FFFFFF;
    /* 输入框背景色 */
    border-radius: 50rpx;
}

.voiced {
    width: 240rpx;
    padding: 24rpx;
    text-align: center;
    box-sizing: border-box;
    height: 240rpx;
    position: fixed;
    z-index: -1;
    left: 0;
    right: 0;
    bottom: 160rpx;
    margin: auto;
    border-radius: 20rpx;
    background-color: rgba($color: #000000, $alpha: 0.5);
    opacity: 0;
    transition: 0.26s;

    &.show {
        opacity: 1;
        z-index: 10;
    }

    .tip {
        margin-top: 20 rpx;
        height: 30rpx;
        line-height: 30rpx;
        text-align: center;
        font-size: 22rpx;
        color: #fff;
    }
}

.voice_img {
    width: 140rpx;
}
</style>