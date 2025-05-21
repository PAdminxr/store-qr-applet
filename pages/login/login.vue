<template>
  <view class="login-page" :style="{ minHeight: pageHeight }">
    <!-- Logo 和 标题 -->
    <view class="logo-section">
      <image src="/static/logo.png" mode="aspectFit" class="logo"></image>
      <text class="app-name">i枣码智慧消费平台</text>
    </view>

    <!-- 登录按钮 -->
    <view class="buttons-section">
      <button v-if="!isAgree" class="primary-button" @click="showToast">
        手机号一键登录
      </button>
      <button v-else class="primary-button" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
        手机号一键登录
      </button>
      <button class="secondary-button" @click="otherLogin">
        其他手机号登录
      </button>
    </view>

    <!-- 协议同意 -->
    <view class="agreement-section">
      <checkbox-group @change="checkboxChange">
        <label class="checkbox-label">
          <checkbox value="agree" :checked="isAgree" color="#FF6347" style="transform: scale(0.7)"></checkbox>
          我已阅读并同意
        </label>
      </checkbox-group>

      <text class="agreement-link" @click="openPopup('service')">《i枣码平台服务协议》</text>
      <text class="agreement-link" @click="openPopup('privacy')">《隐私协议》</text>
    </view>

    <!-- uni-popup 弹出层 -->
    <uni-popup ref="popup" type="center" border-radius="10px 10px 0 0">
      <view class="popup-content">
        <text class="popup-title">{{ modalTitle }}</text>
        <scroll-view scroll-y class="popup-body">
          {{ modalContent }}
        </scroll-view>
        <button class="popup-close-btn" @click="closePopup">关闭</button>
      </view>
    </uni-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      pageHeight: "100vh",
      isAgree: false,
      modalTitle: "",
      modalContent: "这里是隐私协议或服务协议的详细内容，请认真阅读。",
    };
  },
  mounted() {
    this.setPageHeight();
  },
  methods: {
    setPageHeight() {
      const systemInfo = uni.getSystemInfoSync();
      const customBarHeight = systemInfo.statusBarHeight + 24; // 状态栏 + 导航栏高度（44px）
      const availableHeight = systemInfo.windowHeight; // 实际可用高度

      this.pageHeight = `${availableHeight - customBarHeight}px`; // 或者使用 rpx 转换
    },
    showToast() {
      uni.showToast({
        title: "请先同意隐私服务",
        icon: "none",
        duration: 2000,
      });
    },
    openPopup(type) {
      this.modalTitle = type === "service" ? "服务协议" : "隐私协议";
      // 模拟真实协议内容，你可以替换为真实文本或接口拉取
      this.modalContent =
        type === "service"
          ? "【服务协议】\n本平台致力于提供优质的消费服务……"
          : "【隐私协议】\n我们承诺保护您的个人信息安全……";
      this.$refs.popup.open();
    },
    closePopup() {
      this.$refs.popup.close();
    },
    saveUserInfo(userInfo) {
      this.$store.dispatch("saveUserInfoToCache", {
        userInfo,
        isLogin: true
      });
    },
    clearUserInfo() {
      this.$store.dispatch("clearUserInfo");
    },
    getUserInfo() {
      return this.$store.getters.getUserInfo;
    },

    async getPhoneNumber(e) {
      // 显示登录中提示
      uni.showLoading({
        title: "登录中...",
        mask: true,
      });

      if (e.detail.errMsg === "getPhoneNumber:ok") {
        const encryptedData = e.detail.encryptedData;
        const iv = e.detail.iv;

        // 模拟发送请求解密手机号
        setTimeout(() => {
          uni.hideLoading();

          // 假设解密成功，获取到手机号
          const fakePhoneNumber = "182****1234";

          // 存储用户登录信息
          const userInfo = {
            userId: Math.floor(Math.random() * 10) + 1,
            phone: fakePhoneNumber,
            nickName: "微信用户",
            loginType: "微信",
            loginMethod: "手机号",
            introduction: "这是一个示例简介",
            avatarSrc: "/static/logo.png",
            loginTime: new Date().toISOString(),
          };

          this.saveUserInfo(userInfo);

          uni.showToast({
            title: "登录成功",
            icon: "success",
            duration: 1500,
          });

          console.log("用户登录信息已保存：", userInfo);
          setTimeout(() => {
            uni.switchTab({
              url: "/pages/user/index",
            });
          }, 1000);
        }, 1500);
      } else {
        uni.hideLoading();
        uni.showToast({
          title: "未获取到手机号",
          icon: "none",
        });
        console.error("未能获取手机号");
      }
    },

    otherLogin() {
      uni.showToast({
        title: "功能为开放哦~",
        icon: "none",
      });
    },
    checkboxChange(e) {
      this.isAgree = e.detail.value.includes("agree");
    },
  },
};
</script>

<style scoped lang="scss">
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx;
  background-color: rgba(255, 255, 255, 1);
}

.logo-section {
  margin: 70rpx 0rpx;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

.logo {
  width: 160rpx;
  height: 160rpx;
  border-radius: 16rpx;
}

.app-name {
  padding-top: 39rpx;
  font-size: 33rpx;
  font-weight: 500;
  letter-spacing: 9rpx;
}

.buttons-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 100rpx 0rpx 40rpx 0rpx;
  gap: 30rpx;
}

.primary-button {
  background-color: rgba(254, 123, 24, 1);
  color: white;
  border-radius: 20rpx;
  width: 90%;
  font-size: 32rpx;
  padding: 5rpx 0rpx;
}

.secondary-button {
  background-color: white;
  color: #333;
  border: 1px solid rgba(173, 173, 173, 1);
  border-radius: 20rpx;
  width: 90%;
  font-size: 32rpx;
  margin-bottom: 30rpx;
}

.agreement-section {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  color: rgba(164, 164, 164, 1);
}

.checkbox-label {
  display: flex;
  align-items: center;
}

.agreement-link {
  color: rgba(254, 123, 24, 1);
}

/* uni-popup 样式 */
.popup-content {
  background-color: #fff;
  padding: 40rpx;
  box-sizing: border-box;
}

.popup-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
  display: block;
}

.popup-body {
  max-height: 600rpx;
  overflow-y: auto;
  font-size: 26rpx;
  line-height: 40rpx;
  color: #666;
}

.popup-close-btn {
  margin-top: 30rpx;
  background-color: rgba(254, 123, 24, 1);
  color: white;
  font-size: 28rpx;
  width: 100%;
  text-align: center;
  padding: 10rpx 0;
  border-radius: 10rpx;
}
</style>
