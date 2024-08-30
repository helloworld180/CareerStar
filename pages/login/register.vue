<template>
	<view class="register">
		<image src="../../static/bacePage.png" class="back-icon" @click="backPage"></image>
		<view class="title">Hi, 欢迎加入</view>
		<view class="subtitle">CareerStar</view>
		
		<view class="login-form">
			<view class="input-container">
				<image src="../../static/login/iPhone.png" class="input-icon"></image>
				<input placeholder="请输入你的电话号码" placeholder-class="placeholder" class="input-field" v-model="phone"/>
			</view>
			<view style="margin: 60rpx 0 60rpx 0;">
				<view class="input-container">
					<image src="../../static/login/safe.png" class="input-icon"></image>
					<input placeholder="请输入验证码" placeholder-class="placeholder" class="input-field" v-model="code"/>
					<button @click="sendCode" :disabled="cooldown > 0" class="code-btn">
					  {{ cooldown > 0 ? `${cooldown}s后重新发送` : '获取验证码' }}
					</button>
				</view>
			</view>
			<view style="margin-bottom: 120rpx;">
				<view class="input-container">
					<image src="../../static/login/password.png" class="input-icon"></image>
					<input :type="passwordVisible ? 'password' : 'text'" placeholder="请输入你的密码" placeholder-class="placeholder" class="input-field" v-model="password"/>
					<image 
					:src="passwordVisible ? '../../static/login/eyeOff.png' : '../../static/login/eyeOn.png'" 
					class="input-icon-eye" 
					@click="togglePasswordVisibility"
					></image>
				</view>
			</view>
			<!-- 登录按钮 -->
			<button @click="login" class="login-btn">注 册</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				passwordVisible:'false',
				phone: '',
				code: '',
				password: '',
				cooldown: 0
			}
		},
		methods: {
			backPage() {
				uni.navigateBack({
					delta: 1	// 返回的页面数
				})
			},
			// 是否显示密码
			togglePasswordVisibility() {
				this.passwordVisible = !this.passwordVisible;
			},
			sendCode() {
			  if (this.cooldown > 0) return;
			  // 这里添加发送验证码的逻辑
			  console.log('发送验证码到', this.phone);
			  this.cooldown = 60;
			  this.startCooldown();
			},
			startCooldown() {
			  if (this.cooldown > 0) {
			    setTimeout(() => {
			      this.cooldown--;
			      this.startCooldown();
			    }, 1000);
			  }
			},
			login() {
			    console.log('注册', this.phone, this.code, this.password);
			  // 这里添加注册逻辑
			  uni.request({
			  	url:'',
			  		method:'POST',
			  		data: {
			  			phone: this.phone,
			  			code: this.code,
						password: this.password
			  		},
			  		success: (res) => {
			  			console.log('注册成功')
			  			// 注册成功后存储用户信息或跳转页面
						uni.navigateTo({
							url:"/pages/login/chooseIdentity"
						})
			  		}
			  })
			},
		}
	}
</script>

<style>
.register {
  padding: 60rpx 30rpx 0 30rpx;
}
.back-icon {
  width: 48rpx;
  height: 48rpx;
}

.title {
  font-size: 48rpx;
  color: #FFFFFF;
  margin: 70rpx 0 0 10rpx;
  /* font-weight: bold; */
}

.subtitle {
  font-size: 64rpx;
  color: #FFFFFF;
  margin: 15rpx 0 0 10rpx;
  font-weight: bold;
}

.login-form {
  margin-top: 50rpx;
}
/* add */
.input-container {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 90rpx;
  border-radius: 40rpx;
  box-shadow: 0rpx 0rpx 20rpx 0rpx #D5E8FF;
  background-color: rgba(243, 243, 243, 0.5);
  border: 3rpx solid #FFFFFF;
  margin-top: 40rpx;
}

.input-icon {
  width: 40rpx;
  height: 40rpx;
  margin-left: 30rpx;
  margin-right: 10rpx;
}
.input-icon-eye {
	width: 40rpx;
	height: 40rpx;
	margin-right: 30rpx;
	cursor: pointer; /* 使鼠标悬停时显示为可点击状态 */
}
.input-field {
  flex: 1;
   height: 100%;
   border: none;
   background: transparent;
   padding: 0 20rpx;
   color: #004934;
}

.placeholder {
	font-size: 28rpx;
	color: #004934
}


.code-btn {
  width: 220rpx;
  height: 75%;
  background-color: #FFFFFF;
  color: #69B29D;
  border-radius: 40rpx;
  font-size: 24rpx;
  margin-right: 20rpx;
}

.login-btn {
  width: 100%;
  height: 90rpx;
  color: #FFFFFF;
  border-radius: 40rpx;
  font-size: 34rpx;
  text-align: center;
  margin-top: 40rpx;
  font-weight: bold;
  box-shadow: 0rpx 0rpx 20rpx 0rpx #D5E8FF;
  background-color: rgba(91, 163, 142, 0.5);
}
</style>
