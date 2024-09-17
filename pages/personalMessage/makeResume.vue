<template>
	<view class="makeResume">
		<view class="header">
		  <image src="../../static/bacePage.png" class="back-icon" @click="backPage"></image>
		  <text>生成简历</text>
		</view>
		
		<view class="content">
			<view class="line"></view>
			<view class="image-container">
				<image :src="resumeImg" class="resumeImg" :style="imageStyle" @load="onImageLoad"></image>
				<view class="save-hint" v-if="ifshow" @longpress="saveImage">长按图片保存</view>
			</view>
		</view>
		
		<view class="status-text">{{ statusText }}</view>
		<button class="submit-btn" @click="gotoIndex" v-if="ifshow">进入主页</button>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				resumeImg:'',  // 从后端获取
				imageStyle: {
					transform: 'translateY(-100%)',
					transition: 'transform 4s ease-out'
				},
				statusText: '生成中...',
				ifshow:false,
			}
		},
		methods: {
			backPage() {
			  uni.navigateBack({ delta: 1 })
			},
			async fetchResumeImage() {
				// 这里添加从后端获取图片URL的逻辑
				// this.resumeImg = await getResumeImageFromBackend();
				this.resumeImg = '/static/offer.png'; // 临时使用静态图片
			},
			onImageLoad() {
				setTimeout(() => {
					this.imageStyle.transform = 'translateY(0)';
				}, 100);
				setTimeout(() => {
					this.statusText = '生成完成';
					this.ifshow = true;
				}, 4000);
			},
			saveImage() {
				let that = this;
				uni.showModal({
					title:'提示',
					content:'确定要保存图片到本地相册吗？',
					success:function(res){
						if(res.confirm) {
							that.save()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			save() {
				uni.getImageInfo({
					src: this.resumeImg,
					success: (res) => {
						uni.saveImageToPhotosAlbum({
							filePath: res.path,
							success: function() {
								uni.showToast({ title: '保存成功', icon: 'success' });
							},
							fail: function() {
								uni.showToast({ title: '保存失败', icon: 'none' });
							}
						});
					}
				})
			},
			gotoIndex() {
				uni.switchTab({
					url:'/pages/applicants-index/index'
				})
			}
		},
		mounted() {
		    this.fetchResumeImage();
			this.onImageLoad()
		  }
	}
</script>

<style>
.makeResume {
  padding: 60rpx 30rpx 0 30rpx;
  background-color: #69B29D;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 40rpx;
}
.header text {
  color: #fff;
  font-size: 36rpx;
  font-weight: bold;
  margin-left: 33%;
}
.back-icon {
  width: 48rpx;
  height: 48rpx;
}
.line {
	width: 100%;
	height: 20rpx;
	border-radius: 100rpx;
	background-image: linear-gradient( to top, #4D9681, #93E3CC);
	box-shadow: 0rpx 8rpx 10rpx 1rpx rgba(0, 0, 0, 0.3);
}
.image-container {
	position: relative;
  height: 70vh;
  overflow: hidden;
  display: flex; justify-content: center;
}

/* @keyframes resumeImg{
    0%{opacity:0;transform:translateY(-100px);}
    100%{opacity:1;transform:translateY(0);}
} */
.resumeImg {
  /* width: 100%; */
  height: 100%;
}
.status-text {
  text-align: center;
  color: #FFFFFF;
  font-weight: bold;
  font-size: 36rpx;
  margin-top: 50rpx;
}
.save-hint {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #004934;
  font-weight: bold;
  font-size: 28rpx;
  z-index: 2;
}
.submit-btn {
  background-color: #5BA38E;
  color: #fff;
  border-radius: 40rpx;
  height: 80rpx;
  margin: 40rpx 0;
  font-size: 32rpx;
  box-shadow: 0rpx 0rpx 20rpx 0rpx #D5E8FF;
  width: 100%;
}
</style>
