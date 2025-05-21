<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	onLaunch() {
		console.log('App Launch');
	},
	onShow() {
		console.log('App Show');
	},
	onHide() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
/* 公共样式 */
@import '@/uni_modules/uni-scss/index.scss';
/* #ifndef APP-NVUE */
@import '@/static/customicons.css';
/* #endif */

page {
	background-color: #f5f5f5;
}

.example-info {
	font-size: 14px;
	color: #333;
	padding: 10px;
}
</style>