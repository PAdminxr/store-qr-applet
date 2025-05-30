<template>
    <view class="container">
        <view class="textarea-container">
            <textarea type="text" v-model="introduction" placeholder="介绍一下自己吧~" maxlength="100" @input="handleInput"
                @paste="handlePaste" @compositionstart="onCompositionStart" @compositionend="onCompositionEnd" />
            <text class="count">{{ introduction.length }}/100</text>
        </view>
        <view class="save-btn" @click="saveintroduction">保存</view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            introduction: '',
            userInfo: {},
            maxLen: 100,
            isComposing: false, // 是否处于中文输入法状态
            isShowedToast: false // 是否已经提示过
        };
    },
    onLoad() {
        this.$store.dispatch('loadUserInfoFromCache');
        this.userInfo = this.$store.getters.getUserInfo;
        this.introduction = this.userInfo.introduction || '';
    },
    methods: {
        saveintroduction() {
            this.$store.dispatch('setUserInfo', {
                ...this.userInfo,
                introduction: this.introduction
            });

            uni.showToast({
                title: '简介保存成功',
                icon: 'success',
                duration: 2000
            });

            setTimeout(() => {
                uni.navigateBack();
            }, 2000);
        },

        // 中文输入法开始输入
        onCompositionStart() {
            this.isComposing = true;
        },

        // 中文输入法结束输入
        onCompositionEnd(e) {
            this.isComposing = false;
            this.handleFinalInput(e.target.value);
        },

        // 处理普通输入
        handleInput(e) {
            if (this.isComposing) return; // 输入法中不处理
            this.handleFinalInput(e.target.value);
        },

        // 处理粘贴事件
        handlePaste(e) {
            const pasteText = (e.clipboardData || window.clipboardData).getData('text');
            this.handleFinalInput(pasteText);
            e.preventDefault();
        },

        // 统一处理最终输入逻辑
        handleFinalInput(inputValue) {
            const maxLength = this.maxLen;

            let newValue = inputValue;

            if (inputValue.length > maxLength) {
                newValue = inputValue.slice(0, maxLength);

                if (!this.isShowedToast) {
                    uni.showToast({
                        title: '已为您自动截取超出部分',
                        icon: 'none',
                        duration: 2000
                    });
                    this.isShowedToast = true;

                    setTimeout(() => {
                        this.isShowedToast = false;
                    }, 2000);
                }
            }

            this.introduction = newValue;
        }
    }
};
</script>

<style lang="scss" scoped>
.container {
    padding: 30rpx;
}

.textarea-container {
    border: 1rpx solid #eee;
    border-radius: 15rpx;
    padding: 15rpx;
    margin-bottom: 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    background: white;
    min-height: 160rpx;
}

textarea {
    flex: 1;
    border: none;
    font-size: 30rpx;
    height: 120rpx;
    line-height: 40rpx;
    padding-top: 10rpx;
}

.count {
    color: #999;
    font-size: 24rpx;
    align-self: flex-end;
}

.save-btn {
    background-color: #fe7b18;
    color: white;
    padding: 15rpx 30rpx;
    border-radius: 15rpx;
    font-size: 30rpx;
    min-height: 70rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>