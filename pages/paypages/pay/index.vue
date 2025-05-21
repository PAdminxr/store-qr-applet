<template>
    <view class="container">
        <view class="store-info">
            <image :src="storeImgUrl" mode="aspectFill"></image>
            <view class="store-name">
                <text>付款给</text>
                <text class="store-fullname">江北渔家（古城店）</text>
            </view>
        </view>
        <view class="amount-input">
            <view class="amount-label">金额（元）</view>

            <view class="amount-input-box" @click="focusInput">
                <text class="currency-symbol">¥</text>
                <view class="amount-display">
                    {{ paymentAmount || "" }}
                    <span v-show="showCursor" class="cursor"></span>
                </view>
            </view>

            <view class="remark-container" @click="toggleRemark">
                <text class="remark-text">
                    {{ displayedRemarkText }}
                </text>
                <!-- <text class="remark-icon" v-if="hasRemark">
                    {{ showFullRemark.length > 10 ? "收起" : "展开" }}
                </text> -->
            </view>
        </view>
        <view v-if="redPacketList.length > 0">
            <view class="hongbao-container" v-for="(item, index) in redPacketList" :key="index">
                <view class="hongbao">
                    <view class="hongbao-content">
                        <view class="flex-row">
                            <image :src="src" mode="aspectFit" class="hongbao-icon"></image>
                            <view class="hongbao-text">
                                <text class="hongbao-amount">{{ item.amount }}</text>
                                <text class="hongbao-desc">红包待领取</text>
                            </view>
                            <text class="hongbao-expire" v-if="item.expireTimes">{{ formatTime(item.expireTime)
                                }}后失效</text>
                            <text class="hongbao-expire" v-else>{{ item.expireTime }}</text>
                        </view>

                        <view class="hongbao-action" @click="logout">
                            <text class="hongbao-btn">去领取</text>
                        </view>
                    </view>
                </view>
            </view>
            <view class="more-red-packet" @click="logout">更多红包 ></view>
        </view>

        <view class="function-icons">
            <text class="function-title">查看商户公示信息</text>
            <uni-swiper-dot class="photo-swiper" :info="pages" @clickItem="clickItem" :dots-styles="dotsStyles"
                :mode="'round'" :current="swiperDotIndex">
                <swiper :current="swiperDotIndex" @change="changeSwiper" :circular="true" class="swiper-box">
                    <swiper-item v-for="(page, pageIndex) in pages" :key="pageIndex">
                        <uni-grid :column="4" :highlight="true" :showBorder="false">
                            <uni-grid-item v-for="(item, index) in page" :key="index" :index="index">
                                <view class="grid-item-box" @click="goToDetail(item)">
                                    <image :src="item.icon" class="image" mode="aspectFill" />
                                    <text class="text">{{ item.name }}</text>
                                </view>
                            </uni-grid-item>
                        </uni-grid>
                    </swiper-item>
                </swiper>
            </uni-swiper-dot>
        </view>
        <view class="keyboard" v-if="showInput">
            <view class="keyboard-show" @click="closeshowIpnut">
                <uni-icons type="down" size="24" color="#000000" />
            </view>
            <view class="keyboard-container">
                <!-- 第一行 -->
                <view class="keyboard-row">
                    <view class="key" @click="inputNumber(1)">1</view>
                    <view class="key" @click="inputNumber(2)">2</view>
                    <view class="key" @click="inputNumber(3)">3</view>
                    <view class="key special" @click="clearInput">×</view>
                </view>

                <!-- 第二行 -->
                <view class="keyboard-row">
                    <view class="key" @click="inputNumber(4)">4</view>
                    <view class="key" @click="inputNumber(5)">5</view>
                    <view class="key" @click="inputNumber(6)">6</view>
                    <view class="key payment-button" @click="pay" :class="isPaymentAmountValid ? 'payment-active' : 'payment-disabled'
                        ">
                        付款
                    </view>
                </view>

                <!-- 第三行 -->
                <view class="keyboard-row">
                    <view class="key" @click="inputNumber(7)">7</view>
                    <view class="key" @click="inputNumber(8)">8</view>
                    <view class="key" @click="inputNumber(9)">9</view>
                </view>

                <!-- 第四行 -->
                <view class="keyboard-row">
                    <view class="key wide" @click="inputNumber(0)">0</view>
                    <view class="key" @click="inputDot">.</view>
                </view>
            </view>
        </view>
        <uni-popup ref="showRemarkModal" type="bottom">
            <view class="remark-modal">
                <view class="modal-header">
                    <text class="modal-title">添加备注</text>
                    <text class="close-btn" @click="closeRemarkModal">×</text>
                </view>
                <textarea v-model="tempRemarkText" placeholder="请输入备注" maxlength="100"
                    @input="handleRemarkInput"></textarea>
                <view class="char-count">{{ tempRemarkText.length }}/100</view>
                <button type="primary" @click="confirmRemark">确定</button>
            </view>
        </uni-popup>
        <!-- 领取成功弹框 -->
        <uni-popup ref="popup" type="center">
            <view class="popup-content">
                <text class="title">领取成功</text>
                <view>
                    <image src="/static/user/red-envelope.png" class="red-envelope"></image>
                </view>
                <view class="description">
                    优惠券已发放至您的账户<br />
                    可在“我的-我的优惠券”中查看
                </view>
                <view class="buttons">
                    <button class="btn-know" @click="closePopup">知道了</button>
                    <button class="btn-check" @click="goToCoupons">去查看</button>
                </view>
            </view>
            <view class="close-btn-modal" @click="closePopup">
                <uni-icons type="close" size="34" color="#fff" />
            </view>
        </uni-popup>
    </view>
</template>

<script>
export default {
    data() {
        return {
            shopId: "",
            dotsStyles: {
                backgroundColor: "#E5E5E5",
                border: "#E5E5E5",
                color: "#000000",
                selectedBackgroundColor: "#FEA518",
                selectedBorder: "#FEA518",
            },
            validTime: new Date().getTime() + 24 * 60 * 60 * 1000, // 默认24小时有效期
            timer: null,
            storeImgUrl: "https://picsum.photos/80/80",
            paymentAmount: "",

            remarkText: "",
            tempRemarkText: "",
            hasRemark: false,
            showFullRemark: false,
            redPacketList: [
                {
                    amount: 50,
                    expireTime: new Date().getTime() + 24 * 60 * 60 * 1000,
                    id: 1,
                    expireTimes: true,
                },
                {
                    amount: 20,
                    expireTime: "限时发放",
                    id: 2,
                    expireTimes: false,
                },
            ],
            moreRedPacketList: [
                // 更多红包数据
            ],
            showMoreRedPackets: false,
            merchantInfos: [
                {
                    icon: "/static/izaolife/punish-icon.png",
                    name: "处罚信息",
                    path: "/pages/izaolifepages/penaltyInfo/detail",
                },
                {
                    icon: "/static/izaolife/business-icon.png",
                    name: "经营信息",
                    path: "/pages/izaolifepages/businessInfo/index",
                },
                {
                    icon: "/static/izaolife/credit-icon.png",
                    name: "榴花信用",
                    path: "/pages/izaolifepages/penaltyInfo/index",
                },
                {
                    icon: "/static/izaolife/kitchen-icon.png",
                    name: "明厨亮灶",
                    path: "/pages/izaolifepages/kitchenInspection/index",
                },
                {
                    icon: "/static/izaolife/health-icon.png",
                    name: "健康证",
                    path: "/pages/izaolifepages/health/index",
                },
            ],
            src: "/static/user/red-envelope.png",
            swiperDotIndex: 0,
            isPayButtonDisabled: true,
            showCursor: true, // 控制光标显示
            cursorInterval: null, // 光标闪烁定时器
            showInput: true,
        };
    },
    computed: {
        displayedRemarkText() {
            if (!this.hasRemark) return "添加备注";
            if (this.showFullRemark) return this.remarkText;
            return this.$utils.truncate(this.remarkText, 10);
        },
        pages() {
            const pageSize = 4;
            const result = [];
            for (let i = 0; i < this.merchantInfos.length; i += pageSize) {
                result.push(this.merchantInfos.slice(i, i + pageSize));
            }
            return result;
        },
        isPaymentAmountValid() {
            // 尝试将 paymentAmount 转换为数字，并检查其是否大于 0
            const amount = parseFloat(this.paymentAmount);
            return !isNaN(amount) && amount > 0;
        },
    },
    watch: {
        paymentAmount(newVal) {
            this.isPayButtonDisabled = !(newVal && parseFloat(newVal) > 0);
        },
        remarkText(newVal) {
            this.hasRemark = !!newVal.trim();
        },
    },
    created() {
        this.startCursorBlink();
        this.timer = setInterval(() => {
            this.validTime -= 1000;
            if (this.validTime <= 0) {
                clearInterval(this.timer);
            }
        }, 1000);
    },
    onShow() {
        // 检查是否有一个新的红包被领取
        const newReceivedCoupon = uni.getStorageSync("newReceivedCoupon");
        if (newReceivedCoupon) {
            this.openPopup();

            // 重置标志位
            uni.setStorageSync("newReceivedCoupon", false);
        }
        //整数商品id随机生成数字1-12

        this.shopId = this.getRandomInt(1, 4);
    },
    methods: {
        getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        openPopup() {
            this.$refs.popup.open();
        },
        closePopup() {
            // 重置标志位
            uni.setStorageSync("newReceivedCoupon", false);
            this.$refs.popup.close();
        },
        logout() {
            uni.navigateTo({
                url: "/pages/userpages/couponInfo/detail",
            });
        },
        goToCoupons() {
            // 重置标志位
            uni.setStorageSync("newReceivedCoupon", false);
            uni.navigateTo({
                url: "/pages/userpages/couponInfo/index",
            });
        },
        openRemarkModal() {
            this.$refs.showRemarkModal.open(); // 打开弹窗
        },
        closeRemarkModal() {
            this.$refs.showRemarkModal.close(); // 关闭弹窗
        },
        closeshowIpnut() {
            this.showInput = !this.showInput;
            this.showCursor = false;
            this.clearExpireTimer();
        },
        clickItem(index) {
            this.swiperDotIndex = index;
        },
        changeSwiper(e) {
            this.swiperDotIndex = e.detail.current; // 更新当前索引
        },
        goToDetail(item) {
            uni.navigateTo({
                url: item.path,
            });
        },
        change(e) {
            console.log("当前选中:", e.detail);
        },
        inputNumber(num) {
            num = num.toString(); // 确保 num 是字符串

            // 限制最大长度为13
            if (this.paymentAmount.length >= 13) return;

            // 当前输入是数字
            if (/^[0-9]$/.test(num)) {
                if (num === "0") {
                    if (this.paymentAmount === "") {
                        this.paymentAmount = "0";
                    } else if (this.paymentAmount === "0") {
                        // 已经是 "0"，不重复加 0
                        return;
                    } else {
                        this.paymentAmount += num;
                    }
                } else {
                    this.paymentAmount += num;
                }
            }

            // 处理小数点的情况
            if (num === ".") {
                if (!this.paymentAmount.includes(".")) {
                    if (this.paymentAmount === "") {
                        this.paymentAmount = "0.";
                    } else {
                        this.paymentAmount += ".";
                    }
                }
            }

            // 保证小数点后最多两位
            if (this.paymentAmount.includes(".")) {
                const parts = this.paymentAmount.split(".");
                if (parts[1].length > 2) {
                    this.paymentAmount = parts[0] + "." + parts[1].slice(0, 2);
                }
            }
        },

        focusInput() {
            this.showCursor = true;
            this.showInput = true;
            this.startCursorBlink();
        },

        startCursorBlink() {
            if (this.cursorInterval) clearInterval(this.cursorInterval);
            this.cursorInterval = setInterval(() => {
                this.showCursor = !this.showCursor;
            }, 1000); // 每500ms切换一次
        },

        inputDot() {
            if (!this.paymentAmount.includes(".")) {
                this.paymentAmount += ".";
            }
        },
        clearInput() {
            this.paymentAmount = this.paymentAmount.slice(0, -1);
        },
        pay() {
            const amount = parseFloat(this.paymentAmount);
            if (!amount || amount <= 0) return;

            // 获取未使用的红包（type === 1 且 isReceived === false）
            const receivedRedEnvelopes =
                this.$store.getters.getReceivedRedEnvelopes || [];
            const unusedRedEnvelopes = receivedRedEnvelopes.filter(
                (r) => r.type === 1 && !r.isReceived
            );

            let usedRedEnvelopes = [];
            let remainingAmount = amount;
            let savingAmount = 0;

            // 按红包金额从小到大排序，尽量用小金额的先
            const sortedRedEnvelopes = [...unusedRedEnvelopes].sort(
                (a, b) => a.amount - b.amount
            );

            for (const redEnvelope of sortedRedEnvelopes) {
                if (remainingAmount > 0 && redEnvelope.amount <= remainingAmount) {
                    usedRedEnvelopes.push({ ...redEnvelope }); // 使用深拷贝避免影响原始数据
                    remainingAmount -= redEnvelope.amount;
                }
                if (remainingAmount === 0) break;
            }

            // 计算节省金额
            savingAmount = amount - remainingAmount;

            // 构建弹窗内容
            let modalTitle = "确认支付";
            let modalContent = "";

            if (usedRedEnvelopes.length > 0) {
                const usedDetails = usedRedEnvelopes
                    .map((r) => `- ${r.amount}元`)
                    .join("\n");
                modalContent = `您将使用以下红包:\n${usedDetails}\n总计节省: ${savingAmount}元\n实际支付: ${remainingAmount} 元`;
            } else {
                modalContent = `当前没有可用红包，需全额支付 ${amount} 元`;
            }

            uni.showModal({
                title: modalTitle,
                content: modalContent,
                showCancel: true,
                cancelText: "取消",
                confirmText: "确定支付",
                success: async (res) => {
                    if (res.confirm) {
                        const that = this;

                        // 更新红包状态
                        for (const coupon of usedRedEnvelopes) {
                            await that.$store.dispatch("updateReceivedRedEnvelopesStatus", {
                                id: coupon.id,
                                field: "isReceived",
                                value: true,
                            });
                        }

                        // 模拟生成订单数据
                        const newOrder = {
                            id: Math.floor(Math.random() * 999) + 1,
                            shopName: "小火柴大鱼头·铁锅炖·鲁菜",
                            orderTime: this.$utils.formatTime(new Date()),
                            itemCount: Math.floor(Math.random() * 5) + 1,
                            amount:
                                remainingAmount > 0 ? remainingAmount : amount - savingAmount,
                            shopId: this.shopId,
                            orderId: Math.floor(Math.random() * 10) + 1,
                            orderContent: "东北铁锅炖2-3人套餐",
                            status: "交易完成",
                            shopImage: "/static/izaolife/ct1.png",
                            remark: this.remarkText,
                            orderimg: "/static/izaolife/food1.png",
                            paymentMethod: "微信支付",
                            tradeNo: "123456789",
                            tradeTime: this.$utils.formatTime(new Date()),
                            evaluation: false,
                            feedbacks: false,
                        };

                        // 保存订单

                        this.$store.dispatch("saveOrdersToCache", newOrder);

                        // 跳转支付结果页
                        uni.navigateTo({
                            url: "/pages/paypages/pay/paymentresult",
                        });
                    } else {
                        // 用户取消支付，不做任何操作或提示用户已取消
                        console.log("用户取消了支付");
                    }
                },
            });
        },

        handleRemarkInput(e) {
            if (e.detail.value.length > 100) {
                this.tempRemarkText = e.detail.value.substring(0, 100);
            } else {
                this.tempRemarkText = e.detail.value;
            }
        },
        confirmRemark() {
            const remark = this.tempRemarkText.trim();
            if (remark) {
                this.remarkText = remark;
                this.hasRemark = true;
                this.showFullRemark = false;
            } else {
                this.remarkText = "";
                this.hasRemark = false;
                this.showFullRemark = false;
            }

            this.closeRemarkModal();
        },

        toggleRemark() {
            if (!this.hasRemark) {
                this.tempRemarkText = this.remarkText;
                this.openRemarkModal();
            } else {
                this.openRemarkModal();
            }
        },
        formatTime(endTime) {
            const now = new Date().getTime();
            const diff = endTime - now;

            if (diff <= 0) {
                return "已失效";
            }

            const hours = Math.floor(diff / (60 * 60 * 1000));
            const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
            const seconds = Math.floor((diff % (60 * 1000)) / 1000);

            return `${hours.toString().padStart(2, "0")}:${minutes
                .toString()
                .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        },
        startExpireTimer() {
            // 清除之前的计时器
            this.clearExpireTimer();

            // 每秒更新一次有效期显示
            this.timer = setInterval(() => {
                this.$forceUpdate();
            }, 1000);
        },
        clearExpireTimer() {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        },
    },
    onUnload() {
        // 页面卸载时清除计时器
        this.clearExpireTimer();
    },
};
</script>

<style lang="scss" scoped>
.container {
    padding: 20rpx;
    background-color: #eeeeee;
    height: 100vh;
}

.store-info {
    display: flex;
    align-items: center;
    // margin-bottom: 20rpx;
    padding: 20rpx;

    image {
        width: 100rpx;
        height: 100rpx;
        margin-right: 20rpx;
        border-radius: 10rpx;
    }

    .store-name {
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: center;
        gap: 10rpx;

        text {
            color: #333;
            font-size: 26rpx;

            &.store-fullname {
                font-size: 32rpx;
                font-weight: bold;
            }
        }
    }
}

.function-icons {
    width: 100%;
    border-radius: 20rpx;
    background-color: white;
    margin: 20rpx 0;

    .function-title {
        font-size: 28rpx;
        font-weight: 500;
        padding: 20rpx 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .photo-swiper {
        height: auto;
        // min-height: 320rpx;
    }

    .swiper-box {
        height: 100%;
        padding: 0 20rpx;
    }

    .grid-item-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20rpx 0;
    }

    .image {
        width: 80rpx;
        height: 80rpx;
        border-radius: 16rpx;
        margin-bottom: 10rpx;
    }

    .text {
        font-size: 24rpx;
        color: #333;
        text-align: center;
        line-height: 1.5;
    }

    .icon-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 20%;
        margin-bottom: 30rpx;
    }

    .icon-item image {
        width: 100rpx;
        height: 100rpx;
    }
}

.more-red-packet {
    color: #767676;
    font-size: 24rpx;
    letter-spacing: 2rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 10rpx;
}

.amount-input {
    background-color: #fff;
    padding: 20rpx 40rpx;
    border-radius: 30rpx;
    margin-bottom: 20rpx;
    border: 4rpx solid #fe7b18;

    .amount-label {
        font-size: 28rpx;
        margin-bottom: 10rpx;
        color: #333;
        font-weight: 500;
    }

    .amount-input-box {
        display: flex;
        align-items: center;
        border-bottom: 2rpx solid #eee;
        margin-bottom: 20rpx;
        padding-bottom: 10rpx;
        position: relative;
    }

    .currency-symbol {
        font-size: 40rpx;
        margin-right: 10rpx;
    }

    .amount-display {
        font-size: 42rpx;
        white-space: nowrap;
        overflow: hidden;
        display: flex;
        align-items: center;
    }

    .cursor {
        display: inline-block;
        width: 2rpx;
        height: 1.5em;
        background-color: black;
        animation: blink 1s step-end infinite;
    }

    @keyframes blink {

        0%,
        100% {
            opacity: 1;
        }

        50% {
            opacity: 0;
        }
    }
}

.remark-container {
    display: flex;
    align-items: center;
    font-size: 24rpx;
    color: #666;
    margin-top: 10rpx;

    .remark-text {
        flex: 1;
        color: #adadad;
    }

    .remark-icon {
        margin-left: 10rpx;
        color: #999;
        font-size: 22rpx;
    }
}

.merchant-info {
    background-color: #fff;
    padding: 20rpx;
    border-radius: 10rpx;
    margin-bottom: 20rpx;

    .info-title {
        font-size: 28rpx;
        text-align: center;
        margin-bottom: 20rpx;
        color: #666;
    }

    .info-icons {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;

        .icon-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 200rpx;
            margin-bottom: 20rpx;

            image {
                width: 80rpx;
                height: 80rpx;
                margin-bottom: 10rpx;
                border-radius: 50%;
            }

            text {
                font-size: 24rpx;
                color: #666;
            }
        }
    }
}

/* 红包区域样式 */
.hongbao-container {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20rpx;

    .hongbao {
        border: 2rpx solid #fffbfb;
        border-radius: 16rpx;
        background: #fffbfb;
        position: relative;
        overflow: hidden;
        width: 93%;
        padding: 15rpx 20rpx;

        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            // background: linear-gradient(to bottom, #FF9100, #f6e5e3);
            background: #fffbfb;
            opacity: 0.1;
            z-index: 0;
        }

        .hongbao-content {
            position: relative;
            z-index: 1;

            .flex-row {
                display: flex;
                align-items: center;
            }

            .hongbao-icon {
                width: 48rpx;
                height: 48rpx;
                margin-right: 10rpx;
            }

            .hongbao-text {
                display: flex;

                .hongbao-amount {
                    font-size: 26rpx;
                    font-weight: bold;
                    color: #ff1b00;
                }

                .hongbao-desc {
                    font-size: 26rpx;
                    color: #030303;
                    margin-left: 2rpx;
                }
            }

            .hongbao-expire {
                font-size: 20rpx;
                color: #ff1b00;
                // margin-top: 15rpx;
                letter-spacing: 2rpx;
                margin-left: 40rpx;
            }

            .hongbao-action {
                position: absolute;
                right: 0;
                transform: translateY(-110%);

                .hongbao-btn {
                    background: linear-gradient(to bottom, #ff9100, #ff1b00);
                    color: #fff;
                    font-size: 20rpx;
                    padding: 12rpx 30rpx;
                    border-radius: 50rpx;
                    box-shadow: 0 4rpx 10rpx rgba(255, 27, 0, 0.3);
                }
            }
        }
    }
}

.keyboard {
    position: fixed;
    bottom: 0;
    width: 96%;
    background-color: #eeeeee;
    padding: 10rpx;
    box-sizing: border-box;

    .keyboard-show {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        border-radius: 6px;
        z-index: 20;
    }

    .keyboard-container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10rpx;
        padding: 10rpx;
        margin-bottom: 20rpx;

        .keyboard-row {
            display: contents;
            /* 让内部元素直接参与外层grid布局 */
        }

        .key {
            padding: 30rpx;
            text-align: center;
            background-color: white;
            box-sizing: border-box;
            font-weight: bold;
            color: black;
            border-radius: 20rpx;
        }

        .special {
            background-color: white;
        }

        .payment-button {
            grid-row: span 3;
            grid-column: 4;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-size: 16px;
            border-radius: 10px;
        }

        /* 可用状态：橙色 */
        .payment-active {
            background-color: #ffa500;
            /* 橙色 */
        }

        /* 禁用状态：灰色 */
        .payment-disabled {
            background-color: #ccc;
            /* 灰色 */
        }

        .wide {
            grid-column: span 2;
            background-color: white;
            border-radius: 20rpx;
        }
    }
}

.remark-modal {
    padding: 20rpx;
    background: white;
    border-radius: 20rpx 20rpx 0 0;

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20rpx;

        .modal-title {
            font-size: 32rpx;
            font-weight: bold;
        }

        .close-btn {
            font-size: 36rpx;
            color: #999;
        }
    }

    textarea {
        width: 95%;
        height: 200rpx;
        border: 2rpx solid #eee;
        border-radius: 10rpx;
        padding: 15rpx;
        font-size: 28rpx;
        margin-bottom: 10rpx;
    }

    .char-count {
        text-align: right;
        font-size: 22rpx;
        color: #999;
        margin-bottom: 20rpx;
    }

    button {
        width: 100%;
        height: 80rpx;
        font-size: 32rpx;
    }
}

.more-red-packets-modal {
    padding: 20rpx;

    .more-packet-item {
        display: flex;
        align-items: center;
        margin-bottom: 10rpx;

        .packet-icon {
            width: 40rpx;
            height: 40rpx;
            background-color: #ff6600;
            border-radius: 50%;
            margin-right: 10rpx;
        }

        text {
            font-size: 28rpx;
        }
    }
}

.popup-content {
    background-color: white;
    padding: 50rpx;
    border-radius: 30rpx;
    text-align: center;

    .title {
        font-size: 40rpx;
        color: red;
        margin-bottom: 20rpx;
        font-weight: bold;
        display: inline-block;
    }

    .red-envelope {
        width: 200rpx;
        height: 200rpx;
        margin-bottom: 20rpx;
    }

    .description {
        font-size: 28rpx;
        color: #666;
        margin-bottom: 30rpx;
    }

    .buttons {
        display: flex;
        justify-content: space-around;
        gap: 20rpx;
    }

    .btn-know,
    .btn-check {
        width: 200rpx;
        height: 80rpx;
        line-height: 80rpx;
        border-radius: 40rpx;
        font-size: 32rpx;
    }

    .btn-know {
        border: 2rpx solid red;
        color: red;
        background-color: white;
    }

    .btn-check {
        background: linear-gradient(to bottom, #ff9100, #ff1b00);
        color: white;
    }
}

.close-btn-modal {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    width: 100%;
    padding-top: 20rpx;
}

::v-deep .uni-swiper__warp {
    height: 200rpx !important;
}
</style>