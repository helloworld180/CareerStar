<template>
	<view class="content" @click="nextPage">
		<!-- <view class="background-layer"></view> -->
		<image src="../../static/offer.png" style="width: 220rpx; height: 220rpx; border-radius: 50%; margin-top: 0;"></image>
		<view style="margin-top: 120rpx; font-size: 64rpx;color: white; font-weight: bold;">CareerStar</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				time: 2,
			}
		},
		onLoad() {
			var _this = this
						setInterval(function(){
							_this.time--
							if(_this.time==0){
								uni.navigateTo({
									url:'/pages/login/login2'
								})
							}
						},1000)
		},
		methods: {
			nextPage() {
				uni.navigateTo({
					url:'/pages/login/login2'
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		        background-color: #69B29D; /* 主背景色 */
		        position: relative;
		        overflow: hidden;
	}
	/* 背景层样式 */
	/* .background-layer {
	   position: absolute;
	    top: 0;
	    left: 0;
	    width: 100%;
	    height: 100%;
	    background-color: #5fcfb6; 
	    transform: skew(-10deg);
	    z-index: 0;
	} */
	/* 调整其他元素样式以确保它们显示在背景层之上 */
	    /* .content > view {
	        position: relative;
	        z-index: 1;
	    } */
</style>
