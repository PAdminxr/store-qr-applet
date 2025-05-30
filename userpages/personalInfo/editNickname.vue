<template>
    <view class="container">
        <view class="input-container">
            <input type="text" placeholder="修改你的昵称吧~" maxlength="24" :value="nickname" @input="handleInput"
                @paste="handlePaste" @compositionstart="onCompositionStart" @compositionend="onCompositionEnd" />
            <text class="count">{{ nickname.length }}/24</text>
        </view>
        <view class="save-btn" @click="saveNickname">保存</view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            nickname: '',
            userInfo: {},
            maxLen: 24,
            isComposing: false, // 是否处于中文输入法状态
            isShowedToast: false // 是否已经提示过
        };
    },
    onLoad() {
        // 模拟从 store 获取用户信息
        this.$store.dispatch('loadUserInfoFromCache');
        this.userInfo = this.$store.getters.getUserInfo;
        this.nickname = this.userInfo.nickName || '';
    },
    methods: {
        saveNickname() {
            this.$store.dispatch('setUserInfo', {
                ...this.userInfo,
                nickName: this.nickname
            });

            uni.showToast({
                title: '昵称保存成功',
                icon: 'success',
                duration: 2000
            });

            setTimeout(() => {
                uni.navigateBack();
            }, 2000);
        },

        // 输入法开始
        onCompositionStart() {
            this.isComposing = true;
        },

        // 输入法结束
        onCompositionEnd(e) {
            this.isComposing = false;
            this.handleFinalInput(e.target.value);
        },

        // 普通输入事件
        handleInput(e) {
            if (this.isComposing) return; // 输入法中不处理
            this.handleFinalInput(e.target.value);
        },

        // 粘贴事件
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

            this.nickname = newValue;
        }
    }
};
</script>

<style lang="scss" scoped>
.container {
    padding: 30rpx;
}

.input-container {
    border: 1rpx solid #eee;
    border-radius: 15rpx;
    padding: 15rpx;
    margin-bottom: 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    min-height: 88rpx;
}

input {
    flex: 1;
    border: none;
    font-size: 30rpx;
}

.count {
    color: #999;
    font-size: 24rpx;
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