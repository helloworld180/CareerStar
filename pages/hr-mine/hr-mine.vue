<template>
  <view class="hr-mine">
    <!-- 顶部操作栏 -->
    <view class="top-bar">
		<view class="icon-wrapper">
			<image src="/static/hr-mine/hr-mine/setting.png" mode="aspectFit" @click="openSettings"></image>
		</view>
		<view class="icon-wrapper">
			<image src="/static/hr-mine/hr-mine/mail.png" mode="aspectFit" @click="openMessages"></image>
		</view>
    </view>
    
    <!-- 用户信息卡片 -->
    <view class="user-card">
		<view class="user-info">
				<image :src="userInfo.avatar" mode="aspectFill" class="avatar"></image>
			<view class="user-details">
				<view>
					<text class="username">{{ userInfo.username }}</text>
					<image @click="editProfile" src="../../static/applicant-mine/applicant-mine/fix.png" style="width: 24rpx; height: 24rpx;"></image>
				</view>
				<text class="user-id">ID: {{ userInfo.id }}</text>
			</view>
		</view>
      
		<!-- 用户统计 -->
		<view class="user-stats">
			<view class="stat-item" v-for="(stat, index) in userStats" :key="index" @click="navigateToStats(stat.route)">
				<view class="stat-value">{{ stat.value }}</view>
				<view class="stat-label">{{ stat.label }}</view>
			</view>
		</view>
	</view>
    
    <!-- 功能按钮 -->
    <view class="function-buttons">
		<view class="function-item" v-for="(func, index) in functions" :key="index" @click="navigateToFunction(func.route)">
			<image :src="func.icon" mode="aspectFit" class="function-icon"></image>
			<view class="function-label">{{ func.label }}</view>
		</view>
    </view>
    
    <!-- 求职服务 -->
    <view class="service-section">
		<view class="section-first">
			<image src="../../static/applicant-mine/applicant-mine/service.png"></image>
			<text>招人服务</text>
		</view>
		<view class="section-second">
			<view class="view-more" @click="viewMoreServices">查看更多</view>
			<image src="../../static/applicant-mine/applicant-mine/nextPage.png"></image>
		</view>
    </view>
    
    <!-- 我要招人 -->
    <view class="recruit-section">
		<view class="section-first">
			<image src="../../static/applicant-mine/applicant-mine/Users.png"></image>
			<text>我要求职</text>
		</view>
		<view class="section-second">
			<view class="view-more" @click="switchToRecruiter">切换身份</view>
			<image src="../../static/applicant-mine/applicant-mine/nextPage.png"></image>
		</view>
    </view>
    
    
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        avatar: '/static/offer.png',
        username: '知猩猩',
        id: '123456'
      },
      userStats: [
        { value: 0, label: '接收', route:'receive' },
        { value: 0, label: '收藏', route:'collect' },
        { value: 0, label: '关注', route:'attention' },
        { value: 0, label: '浏览', route:'view' }
      ],
      functions: [
        { icon: '/static/applicant-mine/applicant-mine/ressume.png', label: '我的信息', route: 'resume' },
        { icon: '/static/applicant-mine/applicant-mine/expect.png', label: '招聘信息', route: 'jobExpectation' },
        { icon: '/static/applicant-mine/applicant-mine/must.png', label: '招人必备', route: 'jobPreparation' }
      ],
      currentTab: 'profile'
    }
  },
  onLoad() {
    this.fetchUserInfo()
    this.fetchUserStats()
  },
  methods: {
    fetchUserInfo() {
      // TODO: 从后端获取用户信息
      // 示例代码:
      // uni.request({
      //   url: 'your_api_url/user_info',
      //   method: 'GET',
      //   success: (res) => {
      //     this.userInfo = res.data
      //   }
      // })
    },
    fetchUserStats() {
      // TODO: 从后端获取用户统计数据
      // 示例代码:
      // uni.request({
      //   url: 'your_api_url/user_stats',
      //   method: 'GET',
      //   success: (res) => {
      //     this.userStats = res.data
      //   }
      // })
    },
    openSettings() {
      // 打开设置页面
    },
    openMessages() {
      // 打开消息页面
    },
    editProfile() {
      // 编辑个人资料
    },
	navigateToStats(route) {
		uni.navigateTo({
			url: `/pages/hr-mine-${route}/hr-mine-${route}`
		})
	},
    navigateToFunction(route) {
		// 导航到相应功能页面
		uni.navigateTo({
			url: `/pages/${route}/${route}`
		})
    },
    viewMoreServices() {
      // 查看更多求职服务
    },
    switchToRecruiter() {
      // 切换到招聘者身份
    },
    switchTab(route) {
      this.currentTab = route
      uni.switchTab({
        url: `/pages/${route}/${route}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.hr-mine {
  // background-color: #69B29D;
  min-height: 100vh;
  padding: 0 20rpx 40rpx 20rpx;
  background-color: #6998B2;
  background-image: url('/static/hr-mine/hr-mine/bgc-mine.png'); /* 设置背景图像 */
  background-size: cover; /* 使背景图像覆盖整个元素 */
  background-repeat: no-repeat; /* 禁止背景图像重复 */
  background-position: center; /* 将背景图像居中 */
}

.top-bar {
  display: flex;
  justify-content: space-between;
  margin-top: 50rpx;
  
  .icon-wrapper {
	width: 66rpx;
	height: 66rpx;
	margin-left: 20rpx;
	display: flex; align-items: center; justify-content: center;
	background-color: #FFFFFF;
	border-radius: 50%;
	
    image {
      width: 48rpx;
      height: 48rpx;
    }
  }
}

.user-card {
  background-color: #FFFFFF;
  border-radius: 40rpx;
  padding: 30rpx 50rpx;
  margin: 20rpx 20rpx;
  
  .user-info {
    display: flex;
    align-items: center;
    
    .avatar {
      width: 140rpx;
      height: 140rpx;
      border-radius: 50%;
      margin-right: 30rpx;
	  border: 5rpx solid #FFFFFF;
	  box-shadow: 0rpx 5rpx 10rpx 0rpx rgba(0, 0, 0, 0.3);
    }
    
    .user-details {
      flex: 1;
      
      .username {
        font-size: 30rpx;
        font-weight: bold;
		margin-right: 15rpx;
      }
      
      .user-id {
        font-size: 24rpx;
        color: #B3B3B3;
      }
    }
    
  }
  
  .user-stats {
    display: flex;
    justify-content: space-between;
    margin-top: 30rpx;
    
    .stat-item {
      text-align: center;
      
      .stat-value {
        font-size: 48rpx;
        font-weight: bold;
      }
      
      .stat-label {
		margin-top: 10rpx;
		font-size: 28rpx;
		font-weight: bold;
		color: #707070;
      }
    }
  }
}

.function-buttons {
  display: flex;
  justify-content: space-between;
  border-radius: 20rpx;
  padding: 20rpx 0;
  margin: 30rpx 20rpx;
  
  .function-item {
    text-align: center;
	background-color: #FFFFFF;
	width: 28%;
	padding: 20rpx;
	border-radius: 30rpx;
    
    .function-icon {
      width: 80rpx;
      height: 80rpx;
    }
    
    .function-label {
      font-size: 28rpx;
      font-weight: bold;
    }
  }
}

.service-section, .recruit-section {
  background-color: #FFFFFF;
  border-radius: 30rpx;
  padding: 20rpx;
  margin: 30rpx 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-first, .section-second {
  display: flex;
  align-items: center;
  text {
	  font-size: 26rpx;
	  margin-left: 15rpx;
  }
  image {
	  width: 48rpx;
	  height: 48rpx;
  }
}
.view-more {
	font-size: 22rpx;
	color: #707070;
}


.recruit-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .recruit-content {
    display: flex;
    align-items: center;
    
    .recruit-icon {
      width: 40rpx;
      height: 40rpx;
      margin-right: 10rpx;
    }
  }
  
  .switch-text {
    color: #999;
    font-size: 24rpx;
  }
}

</style>