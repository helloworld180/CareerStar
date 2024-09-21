<template>
	<view class="tab-bar">
		<view v-for="(item, index) in list" :key="index" class="tab-bar-item" @click="switchTab(item, index)">
			<image class="tab_img" :src="currentIndex == index ? item.selectedIconPath : item.iconPath"></image>
			<view class="tab_text" :style="{ color: currentIndex == index ? selectedColor : color }">{{ item.text }}</view>
		</view>
	</view>
</template>
 
<script>
	export default {
		props: {
			selectedIndex: {
				// 当前选中的tab index
				default: 0,
			},
		},
		data() {
			return {
				color: '#666666',
				selectedColor: '#00BAB2',
				list: [],
				currentIndex: 0,
			};
		},
		created() {
			this.currentIndex = this.selectedIndex;
 
			var _this = this;
 
			if (uni.getStorageSync('system') == 'diagnosis') {
				//故障诊断系统
				_this.list = [
					{
						pagePath: "pages/applicants-index/index",
						iconPath: '/static/tabbar/offer-gray.png',
						selectedIconPath: '/static/tabbar/offer-gray.png',
						text: "offer"
					},
					{
						iconPath: "static/tabbar/find-gray.png",
						selectedIconPath: "static/tabbar/find-green.png",
						text: "发现"
					},
					{
						pagePath: "pages/applicant-msg/applicant-msg",
						iconPath: "static/tabbar/message-gray.png",
						selectedIconPath: "static/tabbar/message-green.png",
						text: "消息"
					},
					{
					  pagePath: "pages/applicant-mine/applicant-mine",
					  iconPath: "static/tabbar/my-gray.png",
					  selectedIconPath: "static/tabbar/my-green.png",
					  text: "我的"
					}
				];
			} else {
				//能源利用与分布系统
				_this.list = [
					{},
					{},
					{},
					{
						pagePath: '/pages/mine/index',
						iconPath: '/static/images/tabbar/mine.png',
						selectedIconPath: '/static/images/tabbar/mine_select.png',
						// "text": "我的"
					},
				];
			}
		},
		methods: {
			switchTab(item, index) {
				this.currentIndex = index;
				let url = item.pagePath;
				uni.redirectTo({ url: url });
			},
		},
	};
</script>
 
<style lang="scss">
	.tab-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100rpx;
		background: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-bottom: env(safe-area-inset-bottom); // 适配iphoneX的底部
 
		.tab-bar-item {
			flex: 1;
			text-align: center;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			.tab_img {
				width: 37rpx;
				height: 41rpx;
			}
			.tab_text {
				font-size: 20rpx;
				margin-top: 9rpx;
			}
		}
	}
</style>
