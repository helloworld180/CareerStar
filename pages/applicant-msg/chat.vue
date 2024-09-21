<!-- pages/chat/chat.vue -->
<template>
  <view class="chat-page">
    <!-- 顶部栏 -->
	<view class="top-bar">
		<view style="display: flex; align-items: center;">
			<image src="../../static/bacePage.png" @click="goBack"></image>
			<view class="chat-title">{{ chatInfo.name }} · HR</view>
		</view>
		<view style="display: flex; align-items: center;">
			<image src="../../static/applicant-msg/Phone.png"></image>
			<image src="../../static/applicant-msg/more.png"></image>
		</view>
	</view>
    
    <!-- 聊天内容 -->
    <scroll-view scroll-y class="chat-content" :scroll-top="scrollTop" @scrolltoupper="loadMoreMessages">
		<view v-for="(message, index) in messages" :key="index" :class="['message-item', { 'self': message.isSelf }]">
			<image :src="message.avatar" class="avatar"></image>
			<view class="message-bubble">
			  <text v-if="message.type === 'text'">{{ message.content }}</text>
			  <image v-else-if="message.type === 'image'" :src="message.content" mode="widthFix" @tap="previewImage(message.content)"></image>
			  <view v-else-if="message.type === 'audio'" class="audio-message" @tap="playAudio(message.content)">
				<text class="iconfont icon-audio"></text>
				<text>{{ message.duration }}''</text>
			  </view>
			</view>
		</view>
    </scroll-view>
    
    <!-- 输入区域 -->
    <view class="input-area">
      <view class="voice-btn" @tap="toggleVoiceInput">
        <text class="iconfont" :class="isVoiceInput ? 'icon-keyboard' : 'icon-voice'"></text>
      </view>
      <input v-if="!isVoiceInput" type="text" v-model="inputMessage" placeholder="输入消息..." @confirm="sendTextMessage" />
      <view v-else class="voice-input" @touchstart="startRecording" @touchend="stopRecording">按住说话</view>
      <view class="more-btn" @tap="showMoreOptions">
        <text class="iconfont icon-plus"></text>
      </view>
      <button v-if="inputMessage" class="send-btn" @tap="sendTextMessage">发送</button>
    </view>
    
    <!-- 更多选项 -->
    <view v-if="showOptions" class="more-options">
      <view class="option-item" @tap="chooseImage('album')">
        <text class="iconfont icon-image"></text>
        <text>相册</text>
      </view>
      <view class="option-item" @tap="chooseImage('camera')">
        <text class="iconfont icon-camera"></text>
        <text>拍照</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      chatInfo: {},
      messages: [
		  {
			  // avatar:'/static/offer.png'
		  }
	  ],
      inputMessage: '',
      isVoiceInput: false,
      showOptions: false,
      scrollTop: 0,
      websocket: null
    }
  },
  onLoad(options) {
    this.chatInfo = { id: options.id, name: '徐女士' } // 这里应该根据id获取聊天对象信息
    // this.initWebSocket()
    // this.loadMessages()
  },
  onUnload() {
    this.closeWebSocket()
  },
  methods: {
	goBack() {
		uni.navigateBack({
			delta: 1
		});
	},
    initWebSocket() {
      this.websocket = uni.connectSocket({
        url: 'your_websocket_url',
        success: () => {
          console.log('WebSocket连接成功')
        }
      })
      
      this.websocket.onOpen(() => {
        console.log('WebSocket连接已打开')
      })
      
      this.websocket.onMessage((res) => {
        const message = JSON.parse(res.data)
        this.messages.push(message)
        this.scrollToBottom()
      })
      
      this.websocket.onClose(() => {
        console.log('WebSocket连接已关闭')
      })
    },
    closeWebSocket() {
      if (this.websocket) {
        this.websocket.close()
      }
    },
    loadMessages() {
      // 从后端加载历史消息
      // 示例代码:
      uni.request({
        url: 'your_api_url/chat_history',
        method: 'GET',
        data: { chatId: this.chatInfo.id },
        success: (res) => {
          this.messages = res.data
          this.scrollToBottom()
        }
      })
    },
    sendTextMessage() {
      if (!this.inputMessage.trim()) return
      const message = {
        type: 'text',
        content: this.inputMessage,
        isSelf: true,
        avatar: 'path_to_self_avatar'
      }
      this.sendMessage(message)
      this.inputMessage = ''
    },
    sendMessage(message) {
      this.messages.push(message)
      this.scrollToBottom()
      this.websocket.send({
        data: JSON.stringify(message),
        success: () => {
          console.log('消息发送成功')
        }
      })
    },
    toggleVoiceInput() {
      this.isVoiceInput = !this.isVoiceInput
    },
    startRecording() {
      // 开始录音
      uni.startRecord({
        success: (res) => {
          console.log('开始录音')
        }
      })
    },
    stopRecording() {
      // 停止录音并发送
      uni.stopRecord({
        success: (res) => {
          const message = {
            type: 'audio',
            content: res.tempFilePath,
            duration: res.duration,
            isSelf: true,
            avatar: 'path_to_self_avatar'
          }
          this.sendMessage(message)
        }
      })
    },
    showMoreOptions() {
      this.showOptions = !this.showOptions
    },
    chooseImage(sourceType) {
      uni.chooseImage({
        count: 1,
        sourceType: [sourceType],
        success: (res) => {
          const message = {
            type: 'image',
            content: res.tempFilePaths[0],
            isSelf: true,
            avatar: 'path_to_self_avatar'
          }
          this.sendMessage(message)
        }
      })
    },
    previewImage(url) {
      uni.previewImage({
        urls: [url]
      })
    },
    playAudio(url) {
      const innerAudioContext = uni.createInnerAudioContext()
      innerAudioContext.src = url
      innerAudioContext.play()
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const query = uni.createSelectorQuery().in(this)
        query.select('.chat-content').boundingClientRect()
        query.exec((res) => {
          this.scrollTop = res[0].height
        })
      })
    },
    loadMoreMessages() {
      // 加载更多历史消息
      console.log('加载更多消息')
    },
    goBack() {
      uni.navigateBack()
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 30rpx 20rpx 40rpx 20rpx;
  background-color: #69B29D;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx;
  color: #fff;
  
  image {
	  width: 48rpx; height: 48rpx;
	  &:last-child {
		  margin-left: 25rpx;
	  }
  }
  .chat-title {
    font-size: 32rpx;
    font-weight: bold;
	margin-left: 20rpx;
  }
}

.chat-content {
	background-color: #F6FFF8;
  flex: 1;
  // padding: 20rpx;
  overflow-y: auto;
}

.message-item {
  display: flex;
  margin-bottom: 20rpx;
  
  &.self {
    flex-direction: row-reverse;
    
    .message-bubble {
      background-color: #CCEAE1;
	  border-radius: 20rpx;
    }
  }
  
  .avatar {
    width: 80rpx;
    height: 80rpx;
    border-radius: 40rpx;
  }
  
  .message-bubble {
    max-width: 70%;
    padding: 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
    margin: 0 20rpx;
    
    image {
      max-width: 100%;
    }
    
    .audio-message {
      display: flex;
      align-items: center;
      
      .icon-audio {
        margin-right: 10rpx;
      }
    }
  }
}

.input-area {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background-color: #fff;
  
  input, .voice-input {
    flex: 1;
    height: 70rpx;
    background-color: #f0f2f5;
    border-radius: 35rpx;
    padding: 0 20rpx;
    margin: 0 20rpx;
  }
  
  .voice-input {
    line-height: 70rpx;
    text-align: center;
    color: #999;
  }
  
  .voice-btn, .more-btn {
    font-size: 50rpx;
    color: #999;
  }
  
  .send-btn {
    background-color: #6998B2;
    color: #fff;
    padding: 10rpx 20rpx;
    border-radius: 10rpx;
    font-size: 28rpx;
  }
}

.more-options {
  display: flex;
  justify-content: space-around;
  padding: 20rpx;
  background-color: #fff;
  
  .option-item {
    text-align: center;
    
    .iconfont {
      font-size: 60rpx;
      color: #999;
    }
    
    text {
      display: block;
      font-size: 24rpx;
      color: #666;
    }
  }
}
</style>