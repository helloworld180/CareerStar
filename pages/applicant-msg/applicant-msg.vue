<!-- pages/message/message.vue -->
<template>
  <view class="message-page">
    <!-- 顶部搜索栏 -->
    <view class="search-bar">
      <input type="text" placeholder="搜索联系人、公司、聊天记录" />
    </view>
    
    <!-- 选择器 -->
    <view class="selector">
      <view :class="['selector-item', { active: currentTab === 'all' }]" @click="switchTab('all')">全部</view>
      <view :class="['selector-item', { active: currentTab === 'mine' }]" @click="switchTab('mine')">我发起</view>
    </view>
    
    <!-- 消息列表 -->
    <scroll-view scroll-y class="message-list">
      <view v-for="(item, index) in messageList" :key="index" class="message-item" @click="goToChat(item)">
        <image :src="item.avatar" class="avatar"></image>
        <view class="message-content">
          <view class="message-header">
            <text class="name">{{ item.name }}</text>
            <text class="time">{{ item.time }}</text>
          </view>
          <view class="message-body">
            <text class="company">{{ item.company }}</text>
            <text class="last-message">{{ item.lastMessage }}</text>
          </view>
        </view>
      </view>
    </scroll-view>
    
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentTab: 'all',
      messageList: [],
      currentNav: 'message',
      navItems: [
        { icon: '/static/icons/offer.png', label: 'offer', route: 'offer' },
        { icon: '/static/icons/discover.png', label: '发现', route: 'discover' },
        { icon: '/static/icons/message-active.png', label: '消息', route: 'message' },
        { icon: '/static/icons/profile.png', label: '我的', route: 'profile' }
      ]
    }
  },
  onLoad() {
    this.fetchMessageList()
  },
  methods: {
    switchTab(tab) {
      this.currentTab = tab
      this.fetchMessageList()
    },
    fetchMessageList() {
      // 这里应该根据 currentTab 的值来获取不同的消息列表
      // 示例代码:
      uni.request({
        url: 'your_api_url/message_list',
        method: 'GET',
        data: { type: this.currentTab },
        success: (res) => {
          this.messageList = res.data
        }
      })
    },
    goToChat(item) {
      uni.navigateTo({
        url: `/pages/chat/chat?id=${item.id}`
      })
    },
    switchNav(route) {
      this.currentNav = route
      uni.switchTab({
        url: `/pages/${route}/${route}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.message-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f0f2f5;
}

.search-bar {
  padding: 20rpx;
  background-color: #6998B2;
  
  input {
    background-color: #fff;
    border-radius: 30rpx;
    padding: 10rpx 20rpx;
    font-size: 28rpx;
  }
}

.selector {
  display: flex;
  background-color: #fff;
  padding: 20rpx 0;
  
  .selector-item {
    flex: 1;
    text-align: center;
    font-size: 28rpx;
    color: #333;
    
    &.active {
      color: #6998B2;
      font-weight: bold;
    }
  }
}

.message-list {
  flex: 1;
  overflow-y: auto;
}

.message-item {
  display: flex;
  padding: 20rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #e0e0e0;
  
  .avatar {
    width: 80rpx;
    height: 80rpx;
    border-radius: 40rpx;
    margin-right: 20rpx;
  }
  
  .message-content {
    flex: 1;
    
    .message-header {
      display: flex;
      justify-content: space-between;
      
      .name {
        font-size: 28rpx;
        font-weight: bold;
      }
      
      .time {
        font-size: 24rpx;
        color: #999;
      }
    }
    
    .message-body {
      display: flex;
      justify-content: space-between;
      margin-top: 10rpx;
      
      .company {
        font-size: 24rpx;
        color: #666;
      }
      
      .last-message {
        font-size: 24rpx;
        color: #999;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 70%;
      }
    }
  }
}

.bottom-nav {
  display: flex;
  justify-content: space-around;
  padding: 10rpx 0;
  background-color: #fff;
  border-top: 1rpx solid #e0e0e0;
  
  .nav-item {
    text-align: center;
    
    .nav-icon {
      width: 50rpx;
      height: 50rpx;
    }
    
    .nav-text {
      font-size: 24rpx;
      color: #999;
      
      &.active {
        color: #6998B2;
      }
    }
  }
}
</style>