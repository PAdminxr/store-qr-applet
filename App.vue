<script>
export default {
	onLaunch() {
		const userInfo = uni.getStorageSync('userLoginInfo') || null;
		const isLogin = uni.getStorageSync('isLogin') || false;

		if (userInfo && isLogin) {
			this.$store.dispatch('setUserInfo', userInfo);
			this.$store.dispatch('setIsLogin', true);
		}
	},
	mounted() {
		// 加载用户登录信息和状态
		this.$store.dispatch('loadUserInfoFromCache');
		// 加载评论数据
		this.$store.dispatch('loadCommentsFromCache');
		// 加载领取的红包列表
		this.$store.dispatch('loadReceivedRedEnvelopesFromCache');
		// 加载我的收藏
		this.$store.dispatch('loadFavoritesFromCache');
		this.$store.dispatch("loadMerchantsFromCache");
		// 加载投诉反馈
		this.$store.dispatch('loadFeedbacksFromCache');
	}
};
</script>

<style lang="scss">
/*每个页面公共css */
@import '@/uni_modules/uni-scss/index.scss';
/* #ifndef APP-NVUE */
@import '@/static/customicons.css';

// 设置整个项目的背景色
page {
	background-color: #f5f5f5;
}

/* #endif */
.example-info {
	font-size: 14px;
	color: #333;
	padding: 10px;
}
</style>
