<!-- pages/message/message.vue -->
<template>
  <view class="message-page">
    <!-- 顶部搜索栏 -->
	<view class="header">消息</view>
    <view class="search-bar">
    	<view class="search-icon">
    		<image src="../../static/applicants-index/index/search.png" style="width: 48rpx; height: 48rpx;"></image>
    	</view>
		<view class="search-input">
			<input type="text" placeholder="搜索联系人、公司、聊天记录" placeholder-class="placeholder"/>
		</view>
    </view>
    
    <!-- 选择器 -->
    <view class="selector">
		<view :class="['selector-item', { active: currentTab === 'all' }]" @click="switchTab('all')">全部</view>
		<view :class="['selector-item', { active: currentTab === 'mine' }]" @click="switchTab('mine')">我发起</view>
		<view :class="['selector-item', { active: currentTab === 'good' }]" @click="switchTab('good')">获赞</view>
		<view :class="['selector-item', { active: currentTab === 'atten' }]" @click="switchTab('atten')">新增关注</view>
	</view>
    
    <!-- 全部 -->
    <scroll-view scroll-y class="message-list" v-if="currentTab === 'all'">
		<view v-for="(item, index) in messageList" :key="index" class="message-item" @click="goToChat(item)">
			<image :src="item.avatar" class="avatar"></image>
			<view class="message-content">
				<view class="message-header">
					<text class="name">{{ item.name }} · HR</text>
					<text class="company">{{ item.company }}</text>
					<text class="time">{{ item.time }}</text>
				</view>
				<view class="message-body">
					<text class="last-message">{{ item.lastMessage }}</text>
				</view>
			</view>
		</view>
    </scroll-view>
    
	<!-- 我发起 -->
	<scroll-view scroll-y class="message-list" v-if="currentTab === 'mine'">
		<view v-for="(item, index) in mysendList" :key="index" class="message-item" @click="goToChat(item)">
			<image :src="item.avatar" class="avatar"></image>
			<view class="message-content">
				<view class="message-header">
					<text class="name">{{ item.name }} · HR</text>
					<text class="company">{{ item.company }}</text>
					<text class="time">{{ item.time }}</text>
				</view>
				<view class="message-body">
					<text class="last-message">{{ item.lastMessage }}</text>
				</view>
			</view>
		</view>
	</scroll-view>
	
	<!-- 获赞 -->
	<scroll-view scroll-y class="message-list" v-if="currentTab === 'good'">
		<view v-for="(item, index) in goodList" :key="index" class="attention-item" @click="goToChat(item)">
			<image :src="item.avatar" class="avatar"></image>
			<view class="attention-content">
				<view class="attention-header">
					<text class="name">{{ item.name }}</text>
					<text class="attenText">点赞了你</text>
					<text class="company">{{ item.company }}</text>
					<text class="time">{{ item.time }}</text>
				</view>
			</view>
		</view>
	</scroll-view>
	
	<!-- 新增关注 -->
	<scroll-view scroll-y class="message-list" v-else-if="currentTab === 'atten'">
		<view v-for="(item, index) in attentionList" :key="index" class="attention-item" @click="goToChat(item)">
			<image :src="item.avatar" class="avatar"></image>
			<view class="attention-content">
				<view class="attention-header">
					<text class="name">{{ item.name }}</text>
					<text class="attenText">关注了你</text>
					<text class="company">{{ item.company }}</text>
					<text class="time">{{ item.time }}</text>
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
	  // 全部消息列表
      messageList: [
		  {
			  avatar:'/static/offer.png',
			  name:'徐女士',
			  time:'9:41',
			  company:'北京抖音信息服务有限公司',
			  lastMessage:'你好女士，恭喜你通过了我们的面试offer，请于...',
		  },
		  {
		  			  avatar:'/static/offer.png',
		  			  name:'徐女士',
		  			  time:'9:41',
		  			  company:'北京抖音信息服务有限公司',
		  			  lastMessage:'你好女士，恭喜你通过了我们的面试offer，请于...',
		  }
	  ],
	  // 我发起消息列表
	  mysendList: [
	  		  {
	  		  			  avatar:'/static/offer.png',
	  		  			  name:'徐女士',
	  		  			  time:'9:41',
	  		  			  company:'北京抖音信息服务有限公司',
	  		  			  lastMessage:'你好女士，恭喜你通过了我们的面试offer，请于...',
	  		  },
	  ],
	  // 获赞消息列表
	  goodList: [
			{
				avatar:'/static/offer.png',
				name:'徐女士',
				time:'9:41',
			},
	  ],
	  // 新增关注
	  attentionList: [
		  {
			avatar:'/static/offer.png',
			name:'徐女士',
			time:'9:41',
		  },
		  {
			avatar:'/static/offer.png',
			name:'小天才',
			time:'9:41',
		  }
	  ],
      currentNav: 'message',
	  token:'',
    }
  },
  onLoad() {
    // this.fetchMessageList()
  },
  methods: {
    switchTab(tab) {
      this.currentTab = tab
      // this.fetchMessageList()
    },
    fetchMessageList() {
      // 这里应该根据 currentTab 的值来获取不同的消息列表
      // 示例代码:
      uni.request({
        url: 'your_api_url/message_list',
        method: 'GET',
		header: {
		    'Authorization': `Bearer ${this.token}`,
		},
        data: { type: this.currentTab },
        success: (res) => {
          this.messageList = res.data
        }
      })
    },
    goToChat(item) {
      uni.navigateTo({
        url: `/pages/applicant-msg/chat?id=${item.id}`
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
  padding: 30rpx 20rpx 40rpx 20rpx;
  height: 100vh;
  background-color: #69B29D;
}
.header {
	font-size: 40rpx; font-weight: bold; color: #FFFFFF;
	margin-left: 30rpx;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: #fff;
  height: 66rpx;
  margin: 20rpx 0;
  border-radius: 40rpx;
  padding: 10rpx 20rpx;
  .placeholder {
  	color: #AEAEAE;
  }
  .search-input {
    flex: 1;
    margin: 0 20rpx;
  }
  .search-icon {
  	width: 48rpx;
  	height: 48rpx;
  }
  .search-input input {
    font-size: 28rpx;
  }
}

.selector {
  display: flex;
  
  .selector-item {
	display: flex;
	justify-content: center;
    flex: 1;
    text-align: center;
	align-items: center;
    font-size: 28rpx;
	height: 74rpx;
	border-top-left-radius: 20rpx;
	border-top-right-radius: 20rpx;
	background-color: #D9D9D9;
	box-shadow: 5rpx 0rpx 15rpx 0rpx rgba(0, 0, 0, 0.3);
    color: #AEAEAE;
    
    &.active {
		background-color: #B9E3D7;
		color: #004934;
    }
  }
}

.message-list {
  flex: 1;
  overflow-y: auto;
}
// 消息scss
.message-item {
  display: flex;
  padding: 20rpx;
  border-bottom: 2rpx solid #FFFFFF;
  &:nth-child(odd) {
      background-color: #CCEAE1; /* Light red for odd items */
    }
    
    &:nth-child(even) {
      background-color: #F1FFF4; /* Light green for even items */
    }
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
	  align-items: center;
      
      .name {
        font-size: 28rpx;
		color: #004934;
        font-weight: bold;
      }
      .company {
        font-size: 24rpx;
        color: #4D9681;
      }
      .time, {
        font-size: 22rpx;
        color: #5BA38E;
      }
    }
    
    .message-body {
      display: flex;
      justify-content: space-between;
      margin-top: 10rpx;
      
      .last-message {
        font-size: 24rpx;
        color: #69B29D;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 70%;
      }
    }
  }
}

// 关注scss
.attention-item {
  display: flex;
  align-items: center;
  padding: 20rpx;
  border-bottom: 2rpx solid #FFFFFF;
  &:nth-child(odd) {
      background-color: #CCEAE1; /* Light red for odd items */
    }
    
    &:nth-child(even) {
      background-color: #F1FFF4; /* Light green for even items */
    }
  .avatar {
    width: 80rpx;
    height: 80rpx;
    border-radius: 40rpx;
    margin-right: 20rpx;
  }
  .attenText {
	font-size: 22rpx;
	color: #69B29D;
  }
  .attention-content {
    flex: 1;
    
    .attention-header {
      display: flex;
      justify-content: space-between;
	  align-items: center;
      
      .name {
        font-size: 28rpx;
		color: #004934;
        font-weight: bold;
		margin-left: 20rpx;
      }
      .time, {
        font-size: 22rpx;
        color: #5BA38E;
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