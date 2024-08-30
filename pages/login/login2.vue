<template>
  <view class="login">
	<!-- <image src="../../static/background.png" class="background-image"></image> -->
    <image src="../../static/bacePage.png" class="back-icon" @click="backPage"></image>
    <view class="title">HELLO!</view>
    <view class="subtitle">欢迎来到CareerStar</view>
    <view class="choose">
      <view :class="{'active': loginType === 'code'}" @click="switchLoginType('code')">验证码登录</view>
      <view :class="{'active': loginType === 'password'}" @click="switchLoginType('password')">密码登录</view>
    </view>
    <!-- 验证码登录 -->
    <view v-if="loginType === 'code'" class="login-form">
		<!-- add -->
		<view class="input-container">
			<image src="../../static/login/iPhone.png" class="input-icon"></image>
			<input placeholder="请输入手机号" placeholder-class="placeholder" class="input-field" v-model="phone"/>
		</view>
		
		
			<!-- add -->
		<view style="margin-bottom: 80rpx;">
			<view class="input-container">
				<image src="../../static/login/safe.png" class="input-icon"></image>
				<input placeholder="请输入验证码" placeholder-class="placeholder" class="input-field" v-model="code"/>
				<button @click="sendCode" :disabled="cooldown > 0" class="code-btn">
				  {{ cooldown > 0 ? `${cooldown}s后重新发送` : '获取验证码' }}
				</button>
			</view>
		</view>
      
      <button @click="login1" class="login-btn">登 录</button>
    </view>
    <!-- 密码登录 -->
    <view v-else class="login-form">
		<view class="input-container">
			<image src="../../static/login/yongHu.png" class="input-icon"></image>
			<input placeholder="请输入你的账号" placeholder-class="placeholder" class="input-field" v-model="phone"/>
		</view>
		<view class="input-container">
			<image src="../../static/login/password.png" class="input-icon"></image>
			<input :type="passwordVisible ? 'password' : 'text'" placeholder="请输入你的密码" placeholder-class="placeholder" class="input-field" v-model="password"/>
			<image 
			    :src="passwordVisible ? '../../static/login/eyeOff.png' : '../../static/login/eyeOn.png'" 
			    class="input-icon-eye" 
			    @click="togglePasswordVisibility"
			></image>
		</view>
		<view style="display: flex; justify-content: flex-end; font-size: 28rpx; color: #004934; margin-top: 20rpx;">忘记密码 ？</view>
	  <button @click="login2" class="login-btn">登 录</button>
    </view>
	
	<view style="display: flex; justify-content: center; margin-top: 100rpx; color: #FFFFFF;" @click="gotoRegister">
		<view>去注册</view>
		<image src="../../static/login/gotoRegister.png" style="width: 48rpx; height: 48rpx;"></image>
	</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
		passwordVisible:'false',
		loginType: 'code',
		phone: '',
		code: '',
		password: '',
		cooldown: 0
    }
  },
  methods: {
	// 返回上一页
	backPage() {
		uni.navigateBack({
			delta: 1	// 返回的页面数
		})
	},
	// 是否显示密码
	togglePasswordVisibility() {
		this.passwordVisible = !this.passwordVisible;
	},
    switchLoginType(type) {
      this.loginType = type;
    },
	// 发送验证码
    sendCode() {
      if (this.cooldown > 0) return;
      // 这里添加发送验证码的逻辑
	  uni.request({
	      url: 'https://你的后端域名/sendCode', // 后端接口地址
	      method: 'POST',
	      data: {
	        phone: this.phone // 手机号
	      },
	      success: (res) => {
	        console.log('验证码发送成功')
	        // 开启倒计时
			this.cooldown = 60;
	        this.startCooldown()
	      }
	    })
      console.log('发送验证码到', this.phone);
      // this.cooldown = 60;
      // this.startCooldown();
    },
    startCooldown() {
      if (this.cooldown > 0) {
        setTimeout(() => {
          this.cooldown--;
          this.startCooldown();
        }, 1000);
      }
    },
	
	// 验证码登录
    login1() {
      if (this.loginType === 'code') {
        console.log('验证码登录', this.phone, this.code);
      } else {
        console.log('密码登录', this.phone, this.password);
      }
      // 这里添加登录逻辑
	  uni.request({
	  	url:'',
		method:'POST',
		data: {
			phone: this.phone,
			code: this.code
		},
		success: (res) => {
			console.log('登录成功')
			// 登录成功后存储用户信息或跳转页面
		}
	  })
    },
	// 密码登录
	login2 (){
		uni.request({
			url:'',
			method:'POST',
			data: {
				phone: this.phone,
				password: this.password
			},
			success: (res) => {
				console.log('登录成功')
				// 登录成功后存储用户信息或跳转页面
			}
		})
	},
	
	// 去注册页
	gotoRegister() {
		uni.navigateTo({
			url:'/pages/login/register'
		})
	}
  }
}
</script>

<style scoped>
.login {
	position: relative;
  padding: 60rpx 30rpx 0 30rpx;

  overflow: hidden;
  background-color: #69B29D;
}
.background-image {
  width: 100%;
  height: 100vh; /* 或根据需要设置具体的高度 */
  background-image: url('/static/login/star.png'); /* 图片路径 */
  background-size: cover; /* 让图片覆盖整个背景 */
  background-position: center; /* 让图片居中 */
  background-repeat: no-repeat; /* 避免重复显示 */
}
/* .login::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('../../static/background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
} */

.back-icon {
  width: 48rpx;
  height: 48rpx;
}

.title {
  font-size: 80rpx;
  color: #FFFFFF;
  margin: 70rpx 0 0 10rpx;
  font-weight: bold;
}

.subtitle {
  font-size: 48rpx;
  color: #FFFFFF;
  margin: 15rpx 0 0 10rpx;
  font-weight: bold;
}

.choose {
  display: flex;
  font-size: 30rpx;
  color: #FFFFFF;
  margin-top: 60rpx;
}

.choose view {
  margin-right: 50rpx;
  padding-bottom: 10rpx;
  border-bottom: 4rpx solid transparent;
}

.choose .active {
  border-bottom-color: #FFFFFF;
}

.login-form {
  margin-top: 35rpx;
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