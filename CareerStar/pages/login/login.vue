<template>
	<view class="login">
		<image src="../../static/bacePage.png" style="width: 48rpx; height: 48rpx; "></image>
		<view style="font-size: 80rpx; color: #FFFFFF; margin: 70rpx 0 0 10rpx; font-weight: bold;">HELLO!</view>
		<view style="font-size: 48rpx; color: #FFFFFF; margin: 15rpx 0 0 10rpx; font-weight: bold;">欢迎来到CareerStar</view>
		<view class="choose" style="display: flex; font-size: 30rpx; color: #FFFFFF; margin-top: 50rpx;">
			<view>验证码登录</view>
			<view style="margin-left: 50rpx;">密码登录</view>
		</view>
		<!-- 切换框 -->
		<view v-show="ifShow" style="padding: 40rpx 0;">
			<input placeholder="请输入你的账号" placeholder-class="backPage" class="inputAct"/>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ifShow:'true'
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.login {
		padding: 60rpx 30rpx 0 30rpx;
		height: 100%;
		background-color: #69B29D;
	}
	.inputAct {
		width: 98%;
		height: 90rpx;
		border-radius: 30rpx;
		box-shadow: 0rpx 0rpx 20rpx 0rpx #D5E8FF;
		background-color: rgba(243, 243, 243, 0.5);
		border: 3rpx solid #FFFFFF;
	}
</style>
