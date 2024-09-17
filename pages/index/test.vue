<template>
	<view>
        <!-- 自定义顶部导航栏 用原生的话下面scroll-view应该可以不用减去导航栏的高度的-->
		<u-navbar :placeholder='true' :autoBack='true' leftIconSize='40rpx'>
			<view class="navbar-title" slot="center">{{navbarTitle}}</view>
		</u-navbar>
 
		<scroll-view 
            scroll-y="true" 
            class="content-box" id="chat"
			:style="{'height':system.windowHeight - totalHeight - sendHeight - keyboardHeight+'px' }"
			:scroll-into-view='scrollIntoView'>
			<lky-gap size='40' />
			<view id="msglistview"></view>
			<view id="last-msg-item" style="height: 1px;"></view>
		</scroll-view>
 
		<lky-send 
            @send="send" 
            :is-upload-file="false" 
            @imageSend="imageSend" 
            @fileSend="fileSend"
			:bottom-copy='keyboardHeight'></lky-send>
	</view>
</template>
 
<script>
 
	import {
		mapState
	} from 'vuex'
 
	import {
		socket
	} from "@/pages/index/test.js"
 
 
	// import LkySend from "../component/lky-p-send/lky-p-send.vue"
 
	export default {
		components: {
		},
		mixins: [socket],
		data() {
			return {
				src: '',
                
                // 聊天记录列表
				messageList: [],
 
                // socket链接，如果在socket.js中改了的话就不用写这个了
				surl: ``,
 
			};
		},
        
        //  我的高度存在vuex的
		computed: mapState([
			"totalHeight", "system", "sendHeight"
		]),
 
		onLoad(option) {
			// 获取聊天记录
			this.messageList = uni.getStorageSync(`messageList_${this.$store.state.userInfo.id}`) || []
			console.log("缓存中的聊天记录", this.messageList);
			this.scrollToBottom()
		},
 
		methods: {
 
			send(value) {
				let param = {
					"type": 1,
					"content": value,
				}
				let m = JSON.stringify(param)
				this.sendSocketMessage(m)
			},
 
 
            // 预览图片
			imageClick(url) {
				uni.previewImage({
					urls: [
						url
					]
				})
			},
 
            // 发送图片
			imageSend(url) {
				let param = {
					"type": 3,
					"text": "",
					"url": url,
					"userId": this.$store.state.userInfo.id
				}
				let m = JSON.stringify(param)
				this.sendSocketMessage(m)
			},
 
            // 发送文件
			fileSend(url, name) {
				let param = {
					"type": 4,
					"text": name,
					"url": url,
					"userId": this.$store.state.userInfo.id
				}
				let m = JSON.stringify(param)
				this.sendSocketMessage(m)
			},
            
            // 打开文件
			openFile(item) {
				uni.downloadFile({
					url: item.url,
					success: (res) => {
						var filePath = res.tempFilePath;
						uni.openDocument({
							filePath: filePath,
							showMenu: true,
							success: function(res) {}
						});
					}
				});
			},
 
			// 接收到事件后处理的方法（可自己重写）
			onMessageHandle(obj) {
                //根据业务逻辑重写
                // obj接收到的事件
 
			},
 
			// 发送消息后处理的方法（可自己重写）
			sendMessageHandle(msg) {
				 //根据业务逻辑重写
                // msg 发送的消息
			},
		}
	}
</script>
 
<style lang="scss">
	body {
		box-sizing: border-box;
		padding: 0 ;
		// background-color: $lky-hui-bg ;
	}
</style>
 
<style lang="scss" scoped>
 
	.content-box {
		padding: 0 28rpx;
		box-sizing: border-box;
		height: auto;
		z-index: -1;
		overflow: hidden;
	}
</style>