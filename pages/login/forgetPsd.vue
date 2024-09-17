<template>
  <view class="forgetPsd">
    <image src="../../static/bacePage.png" class="back-icon" @click="backPage"></image>
    <view class="title">忘记密码</view>
    
    
    <view class="login-form">
      <view class="input-container">
        <image src="../../static/login/iPhone.png" class="input-icon"></image>
        <input type="number" placeholder="请输入你的电话号码" placeholder-class="placeholder" class="input-field" v-model="phone"/>
      </view>
      <view style="margin: 60rpx 0 60rpx 0;">
        <view class="input-container">
          <image src="../../static/login/safe.png" class="input-icon"></image>
          <input type="number" placeholder="请输入验证码" placeholder-class="placeholder" class="input-field" v-model="code" :disabled="!canWrite"/>
          <button @click="sendCode" :disabled="cooldown > 0" class="code-btn">
            {{ cooldown > 0 ? `${cooldown}s后重新发送` : '获取验证码' }}
          </button>
        </view>
      </view>
      <view style="margin-bottom: 60rpx;">
        <view class="input-container">
          <image src="../../static/login/password.png" class="input-icon"></image>
          <!-- 密码输入框 -->
          <input :type="passwordVisible ? 'password' : 'text'" placeholder="请输入你的密码" placeholder-class="placeholder" class="input-field" v-model="password"/>
          <image 
          :src="passwordVisible ? '../../static/login/eyeOff.png' : '../../static/login/eyeOn.png'" 
          class="input-icon-eye" 
          @click="togglePasswordVisibility"
          ></image>
        </view>
      </view>
      <view style="margin-bottom: 120rpx;">
        <!-- 再次输入密码的输入框 -->
        <view class="input-container">
          <image src="../../static/login/password.png" class="input-icon"></image>
          <input :type="passwordVisible ? 'password' : 'text'" placeholder="请再次输入你的密码" placeholder-class="placeholder" class="input-field" v-model="confirmPassword"/>
          <image 
          :src="passwordVisible ? '../../static/login/eyeOff.png' : '../../static/login/eyeOn.png'" 
          class="input-icon-eye" 
          @click="togglePasswordVisibility"
          ></image>
        </view>
		
      </view>
      <!-- 注册按钮 -->
      <button @click="forgetPsd" class="login-btn">确认修改</button>
    </view>
	

    <!-- 自定义Modal组件 -->
    <Modal v-if="showModal" :message="modalMessage" @close="showModal = false">
      <template v-slot:default>
        {{ modalMessage }}
      </template>
    </Modal>
	
	
	
  </view>
</template>

<script>
	import Modal from '../../compoments/Modal.vue';

export default {
  components: { Modal },
  data() {
    return {
      passwordVisible: false,
      phone: '',
      code: '',
      password: '',
      confirmPassword: '',
      cooldown: 0,
      showModal: false, // 控制弹窗显示
      modalMessage: '' ,// 弹窗的消息内容
	  canWrite:false
	
    };
  },
  methods: {
	
    backPage() {
      uni.navigateBack({
        delta: 1
      });
    },
    // 显示或隐藏密码
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    // 验证手机号格式
    validatePhone() {
      const phoneRegex = /^1[3-9]\d{9}$/; // 简单的中国手机号格式验证
      if (!phoneRegex.test(this.phone)) {
        this.modalMessage = '请输入有效的手机号';
        this.showModal = true;
        return false;
      }
      return true;
    },
    // 验证两次输入的密码是否一致
    validatePasswords() {
      const passwordRegex = /^\d+$/; // 仅允许数字

      if (this.password !== this.confirmPassword) {
        this.modalMessage = '两次输入的密码不一致';
        this.showModal = true;
        return false;
      }

      if (!passwordRegex.test(this.password)) {
        this.modalMessage = '密码只能包含数字';
        this.showModal = true;
        return false;
      }

      return true;
    },
    sendCode() {
		this.canWrite=true;
      if (this.cooldown > 0) return;
      if (!this.validatePhone()) return;

      // 检查手机号是否已注册
      uni.request({
        url: 'YOUR_API_ENDPOINT/checkPhone', // 替换为实际API端点
        method: 'POST',
        data: {
          phone: this.phone
        },
        success: (res) => {
          if (res.data.exists) {
            this.modalMessage = '该手机号已注册';
            this.showModal = true;
          } else {
            // 发送验证码的逻辑
            console.log('发送验证码到', this.phone);
            this.cooldown = 60;
            this.startCooldown();
          }
        }
      });
    },
    startCooldown() {
      if (this.cooldown > 0) {
        setTimeout(() => {
          this.cooldown--;
          this.startCooldown();
        }, 1000);
      }
	  this.canWrite=false;
    },
    // 修改密码方法
    forgetPsd() {
      if (!this.validatePhone() || !this.validatePasswords()) return;

      console.log('修改密码', this.phone, this.code, this.password);
      // 这里添加修改密码逻辑
      uni.request({
        url: 'YOUR_API_ENDPOINT/forgetPsd', // 替换为实际API端点
        method: 'POST',
        data: {
          phone: this.phone,
          code: this.code,
          password: this.password
        },
        success: (res) => {
          console.log('修改密码成功');
		  this.modalMessage = '修改密码成功！';
		  
		  this.showModal = true;
          uni.navigateTo({
            url: "/pages/login/login2"
          });
        }
      });
    }
  }
};
</script>


<style>
	
.forgetPsd {
  padding: 60rpx 30rpx 0 30rpx;
  background-image: url('/static/background.png'); /* 设置背景图像 */
    background-size: cover; /* 使背景图像覆盖整个元素 */
    background-repeat: no-repeat; /* 禁止背景图像重复 */
    background-position: center; /* 将背景图像居中 */
  
    height: 100vh; /* 设置高度 */
  
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

.login-form {
  margin-top: 100rpx;
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
.login-login {
  color: #FFFFFF; /* 设置文字颜色 */
  font-size: 16px; /* 设置文字大小 */
  font-weight: bold; /* 设置字体加粗 */
  cursor: pointer; /* 设置鼠标悬停时的光标样式 */
  display: block; /* 确保元素占据一整行 */
  text-align: center; /* 文本居中对齐 */
  margin-top: 80rpx; /* 设置顶部外边距，确保在按钮下方 */
  height: auto; /* 根据内容调整高度 */
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

