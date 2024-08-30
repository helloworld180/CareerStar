<template>
  <view class="HR">
    <view class="header">
      <image src="../../static/bacePage.png" style="width: 48rpx; height: 48rpx;" @click="backPage"></image>
      <text style="margin-left: 33%;">个人信息</text>
    </view>
    
    <view class="avatar-container">
      <image class="avatar" :src="avatarUrl" mode="aspectFill"></image>
      <view class="camera-icon" @tap="chooseAvatar">
		<image src="../../static/personalMessage/photo.png" style="width: 22rpx; height: 22rpx;"></image>
	  </view>
    </view>
	<view style="font-size: 16rpx; color: #FFFFFF; display: flex; justify-content: center; margin-bottom: 30rpx;">点击设置头像</view>

<!-- <view class="info-card-mul" style="background-color: #F3F3F3; border-radius: 40rpx;"> -->
	<image src="../../static/personalMessage/calendar4.png" style="height: 150rpx; width: 100%; bottom: 0%;"></image>
    <view class="info-card">
      <view class="card-header">个人信息</view>
      
      <view class="form-item">
		  <text style="color: #A00000;">*</text>
        <text class="label">姓名</text>
        <input type="text" v-model="personalInfo.name" placeholder="请输入真实姓名" placeholder-class="placeholder"/>
      </view>
	  
      <view class="line"></view>
	  
      <view class="form-item">
		  <text style="color: #A00000;">*</text>
        <text class="label">联系电话</text>
        <input type="number" v-model="personalInfo.phone" placeholder="请输入联系电话" placeholder-class="placeholder"/>
      </view>
      
	  <view class="line"></view>
	  
      <view class="form-item">
		  <text style="color: #A00000;">*</text>
        <text class="label">邮箱</text>
        <input type="email" v-model="personalInfo.email" placeholder="请输入邮箱" placeholder-class="placeholder"/>
      </view>
    </view>
    
	<!-- 公司信息 -->
    <view class="info-card">
      <view class="card-header">
        <text>公司信息</text>
      </view>
      
      <view class="form-item">
		  <text style="color: #A00000;">*</text>
        <text class="label">公司名称</text>
        <input type="text" v-model="companyInfo.name" placeholder="请输入公司名称" placeholder-class="placeholder"/>
      </view>
      
	  <view class="line"></view>
	  
      <view class="form-item">
		  <text style="color: #A00000;">*</text>
        <text class="label">公司联系方式</text>
        <input type="text" v-model="companyInfo.contact" placeholder="请输入公司联系方式" placeholder-class="placeholder"/>
      </view>
	  
	  <view class="line"></view>
      
      <view class="form-item">
		  <text style="color: #A00000;">*</text>
        <text class="label">公司地址</text>
        <input type="text" v-model="companyInfo.address" placeholder="请输入公司地址" placeholder-class="placeholder"/>
      </view>
      
	  <view class="line"></view>
	  
      <view class="form-item">
		  <text style="color: #A00000;">*</text>
        <text class="label">公司图标</text>
        <view class="upload-box" @tap="chooseCompanyLogo">
          <image v-if="companyInfo.logo" :src="companyInfo.logo" mode="aspectFit" class="company-logo"></image>
          <text v-else>+</text>
        </view>
      </view>
    </view>
<!-- </view> -->

    <button class="submit-btn" @tap="submitInfo" :disabled="!isFormValid">确认提交</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      avatarUrl: '/static/default-avatar.png',
      personalInfo: {
        name: '',
        phone: '',
        email: ''
      },
      companyInfo: {
        name: '',
        contact: '',
        address: '',
        logo: ''
      }
    }
  },
  computed: {
    isFormValid() {
      return this.personalInfo.name && this.personalInfo.phone && this.personalInfo.email &&
             this.companyInfo.name && this.companyInfo.contact && this.companyInfo.address;
    }
  },
  methods: {
	backPage() {
	  	uni.navigateBack({
	  		delta: 1	// 返回的页面数
	  	})
	},
    chooseAvatar() {
      // 实现选择头像的逻辑
      uni.chooseImage({
        count: 1,
        success: (res) => {
          this.avatarUrl = res.tempFilePaths[0];
        }
      });
    },
    chooseCompanyLogo() {
      // 实现选择公司logo的逻辑
      uni.chooseImage({
        count: 1,
        success: (res) => {
          this.companyInfo.logo = res.tempFilePaths[0];
        }
      });
    },
    submitInfo() {
      if (this.isFormValid) {
        // 实现提交信息的逻辑
        console.log('提交信息', this.personalInfo, this.companyInfo);
        uni.showToast({
          title: '提交成功',
          icon: 'success'
        });
      }
    }
  }
}
</script>

<style scoped>
.HR {
  padding: 60rpx 30rpx 0 30rpx;
  background-color: #69B29D;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
}

.header text {
  color: #fff;
  font-size: 36rpx;
  font-weight: bold;
}

.avatar-container {
  position: relative;
  width: 150rpx;
  height: 150rpx;
  margin: 0 auto 15rpx;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 4rpx solid #fff;
  box-shadow: 0rpx 5rpx 15rpx 0rpx gray;
}

.camera-icon {
  position: absolute;
  width: 48rpx;
  height: 48rpx;
  right: 0;
  bottom: 0;
  background-color: #fff;
  border-radius: 50%;
  /* padding: 30rpx; */
  /* font-size: 24rpx; */
  box-shadow: 0 2rpx 5rpx rgba(0,0,0,0.2);
  display: flex;
	justify-content: center;
	align-items: center;
}

.info-card {
  background-color: #F3F3F3;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);
}

.card-header {
	display: flex;
  justify-content: center;
  align-items: center;
  height: 60rpx;
  border-radius: 40rpx;
  margin-bottom: 30rpx;
  font-size: 26rpx;
  color: #004934;
  background-color: #FFFFFF;
  box-shadow: 0rpx 5rpx 15rpx 0rpx gray;
}

.form-item {
  display: flex;
  align-items: center;
  margin: 20rpx 20rpx;
}

.label {
  width: 200rpx;
  color: #004934;
  font-size: 28rpx;
  margin-left: 5rpx;
}

input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 28rpx;
  color: rgba(0, 73, 52, 0.73);
}

.placeholder {
	font-size: 22rpx;
  color: rgba(0, 73, 52, 0.73);
}

.upload-box {
  width: 100rpx;
  height: 100rpx;
  border: 1rpx dashed #999;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40rpx;
  color: #999;
  cursor: pointer;
}

.company-logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.submit-btn {
  background-color: #8cc7b5;
  color: #fff;
  border: none;
  border-radius: 20rpx;
  /* padding: 10rpx 0; */
  width: 100%;
  /* text-align: center; */
  font-size: 32rpx;
  margin: 40rpx 0;
}

.submit-btn[disabled] {
  background-color: #ccc;
  opacity: 0.6;
}

.line {
	width: 100%;
	height: 2rpx;
	background-color: rgba(0, 73, 52, 0.27);
}
</style>