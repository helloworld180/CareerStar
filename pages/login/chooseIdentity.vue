<template>
	<view class="chooseIdentify">
		<image src="../../static/bacePage.png" class="back-icon" @click="backPage"></image>
		<view class="title">Hi, 欢迎加入 CareerStar</view>
		<view class="subtitle">请选择你的身份 :</view>
		
		<view class="choose1" @click="choose1">
			<image src="../../static/login/star.png" style="width: 108rpx; height: 108rpx; margin-left: 30rpx;"></image>
			<view style="font-size: 45rpx; margin-left: 30rpx; color: #004934;">我是 HR</view>
			<image src="../../static/nextPage.png" style="width: 48rpx; height: 48rpx; margin-left: 250rpx;"></image>
		</view>
		
		<view class="choose2" @click="choose2">
			<image src="../../static/login/star.png" style="width: 108rpx; height: 108rpx; margin-left: 30rpx;"></image>
			<view style="font-size: 45rpx; margin-left: 30rpx; color: #004934;">我是 求职者</view>
			<image src="../../static/nextPage.png" style="width: 48rpx; height: 48rpx; margin-left: 180rpx;"></image>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			backPage() {
				uni.navigateBack({
					delta: 1	// 返回的页面数
				})
			},
			choose1() {
				uni.request({
					url:'',
						method:'POST',
						data: {
							
						},
						success: (res) => {
							console.log('注册成功')
								uni.navigateTo({
									url:"/pages/personalMessage/HR"
								})
						}
				})
			},
			choose2() {
				uni.request({
					url:'',
						method:'POST',
						data: {
							
						},
						success: (res) => {
							console.log('注册成功')
								uni.navigateTo({
									url:"/pages/personalMessage/jobApplicant"
								})
						}
				})
			}
		}
	}
</script>

<style scoped>
.chooseIdentify {
  padding: 60rpx 30rpx 0 30rpx;
}
.back-icon {
  width: 48rpx;
  height: 48rpx;
}
.title {
  font-size: 46rpx;
  color: #FFFFFF;
  margin: 70rpx 0 0 10rpx;
  font-weight: bold;
}

.subtitle {
  font-size: 38rpx;
  color: #FFFFFF;
  margin: 30rpx 0 0 10rpx;
}

.choose1 {
	display: flex;
	width: 100%;
	height: 182rpx;
	margin-top: 50rpx;
	align-items: center;
	border-radius: 120rpx;
	background-color: #BDECDE;
	box-shadow: 0rpx 5rpx 15rpx 0rpx gray;
}
.choose2 {
	display: flex;
	width: 100%;
	height: 182rpx;
	margin-top: 50rpx;
	align-items: center;
	border-radius: 120rpx;
	background-color: #8ED7C1;
	box-shadow: 0rpx 5rpx 15rpx 0rpx gray;
}
</style>
