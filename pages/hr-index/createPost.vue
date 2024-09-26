<template>
  <view class="page">
    <view class="header">
    	<image src="../../static/bacePage.png" style="width: 48rpx; height: 48rpx;" @click="goBack"></image>
    	<text>招聘</text>
    </view>
    
    <view class="content">
		<view class="company-info">
			<view class="form-item">
				<text>公司名称：</text>
				<input v-model="formData.companyName" placeholder="请输入公司名称" />
			</view>
			<view class="form-item">
				<text>公司联系方式：</text>
				<input v-model="formData.companyContact" placeholder="请输入公司联系方式" />
			</view>
			<view class="form-item">
				<text>公司地址：</text>
				<input v-model="formData.companyAddress" placeholder="请输入公司地址" />
			</view>
			<view class="form-item-icon">
				<text>公司图标：</text>
				<view class="resume-photo" @tap="chooseCompanyIcon">
					<image v-if="formData.companyIcon" :src="formData.companyIcon"></image>
					<view v-else class="placeholder">
						<view style="display: flex; justify-content: center; margin-bottom: 5rpx;">
							<image src="../../static/applicants-index/index/photo.png"></image>
						</view>
						<view>从相册中挑选照片</view>
					</view>
				</view>
			</view>
		</view>
      
		<view class="job-info">
			<view class="form-item" style="font-weight: bold;">职位详细</view>
			<view class="form-item">
				<text>招募职位：</text>
				<input v-model="formData.jobTitle" placeholder="请输入招募的职位" />
			</view>
			<view class="form-item">
				<text>轮次：</text>
				<input v-model="formData.lunci" placeholder="请输入轮次" />
			</view>
			<view class="form-item">
				<text>招聘人数：</text>
				<input v-model="formData.headcount" placeholder="请输入招聘人数" />
			</view>
			<view class="form-item">
				<text>学历层次：</text>
				<input v-model="formData.education" placeholder="请输入学历要求" />
			</view>
			<view class="form-item">
				<text>职业薪资：</text>
				<input v-model="formData.salary" placeholder="请输入薪资" />
			</view>
		</view>
		  
		<view class="job-description">
			<text style="color: #666666; font-weight: bold;">工作描述详情</text>
			<textarea v-model="formData.jobDescription" placeholder="请输入工作描述详情" />
		</view>
	</view>
    
    <view class="footer">
      <button @tap="saveDraft" class="btn-draft">存草稿</button>
      <button @tap="publish" class="btn-publish">发布</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        companyName: '',
        companyContact: '',
        companyAddress: '',
        companyIcon: '',
        jobTitle: '',
        salary: '',
		lunci:'',
        headcount: '',
        education: '',
        jobDescription: ''
      },
	  token:'',
    }
  },
  onLoad() {
    // this.loadDraftData()
  },
  methods: {
    goBack() {
		uni.navigateBack({
			delta:1
		})
    },
    // 加载草稿
	async loadDraftData() {
      try {
        const res = await uni.request({
          url: 'your_api_url/getDraft',
          method: 'GET',
		  header: {
		  	'Authorization': `Bearer ${this.token}`,
		  },
        })
        if (res.data) {
          this.formData = res.data
        }
      } catch (error) {
        console.error('加载草稿失败', error)
      }
    },
	// 保存草稿
    async saveDraft() {
      try {
        await uni.request({
          url: 'your_api_url/saveDraft',
          method: 'POST',
		  header: {
		  	'Authorization': `Bearer ${this.token}`,
		  },
          data: this.formData
        })
        uni.showToast({
          title: '草稿保存成功',
          icon: 'success'
        })
		uni.navigateTo({
		    url: '/pages/hr-index/index',
		});
      } catch (error) {
        uni.showToast({
          title: '保存失败，请重试',
          icon: 'none'
        })
      }
    },
   // 发布
	async publish() {
      try {
        await uni.request({
          url: 'your_api_url/publish',
          method: 'POST',
		  header: {
		  	'Authorization': `Bearer ${this.token}`,
		  },
          data: this.formData
        })
        uni.showToast({
          title: '发布成功',
          icon: 'success'
        })
		uni.navigateTo({
		    url: '/pages/hr-index/index',
		});
      } catch (error) {
        uni.showToast({
          title: '发布失败，请重试',
          icon: 'none'
        })
      }
    },
    chooseCompanyIcon() {
	  uni.chooseImage({
	    count: 1,
	    sizeType: ['compressed'],
	    sourceType: ['album', 'camera'],
	    success: (res) => {
	      this.formData.companyIcon = res.tempFilePaths[0]
	    }
	  })
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  /* 将页面主体内容设置为 flex 布局，并使用 flex: 1 使其占据除 tabBar 之外的所有可用空间。 */
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  background-color: #6998B2;
  /* min-height: 100vh; */
  height: 100vh;
  padding: 40rpx 20rpx 50rpx 20rpx;
}

.header {
  // padding: 20rpx;
  display: flex;
  align-items: center;
  color: #FFFFFF;
  margin-bottom: 20rpx;
  text {
	  margin-left: 38%;
	  font-size: 32rpx;
	  font-weight: bold;
  }
}

.content {
	flex: 1;
	border-radius: 16rpx;
	background-color: #FFFFFF;
}

.company-info {
  box-shadow: 0rpx 8rpx 10rpx 1rpx rgba(0, 0, 0, 0.3);
  border-bottom-left-radius: 20rpx;
  border-bottom-right-radius: 20rpx;
  padding: 40rpx 30rpx 20rpx 30rpx;
  margin-bottom: 5rpx;
}
.job-info,.job-description {
	box-shadow: 0rpx 8rpx 10rpx 1rpx rgba(0, 0, 0, 0.3);
	border-bottom-left-radius: 20rpx;
	border-bottom-right-radius: 20rpx;
	padding: 20rpx 30rpx 20rpx 30rpx;
	margin-bottom: 5rpx;
	font-size: 28rpx;
	textarea {
	  width: 100%;
	  height: 300rpx;
	  padding: 10rpx;
	  margin-top: 5rpx;
	  font-size: 28rpx;
	  color: #666666;
	}
}
.resume-photo {
  width: 200rpx;
  height: 200rpx;
  border-radius: 20rpx;
  background-color: #D9D9D9;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20rpx;
  image {
    width: 100%;
    height: 100%;
  }
  .placeholder {
    color: #666666;
	font-size: 16rpx;
	image {
		width: 36rpx;
		height: 36rpx;
	}
  }
}
.form-item {
  padding: 8rpx 10rpx;
  color: #666666;
  display: flex;
  align-items: center;
  font-size: 25rpx;
  text {
  	margin-right: 10rpx;
  }
  input, .picker {
    flex: 1;
  	font-size: 25rpx;
  }
}
.form-item-icon {
	padding: 8rpx 10rpx;
	color: #666666;
	display: flex;
	justify-content: space-between;
	font-size: 25rpx;
	text {
		margin-right: 10rpx;
	}
}
.upload-icon {
  width: 120rpx;
  height: 120rpx;
  border: 1rpx dashed #999999;
  display: flex;
  justify-content: center;
  align-items: center;
  
  image {
    width: 100%;
    height: 100%;
  }
}

.footer {
  display: flex;
  margin-top: 30rpx;
  
  button {
    margin: 0 15rpx;
	background-color: #FFFFFF;
    color: #4D6A96;
	font-weight: bold;
	font-size: 32rpx;
    &.btn-draft {
		width: 23%;
    }
    
    &.btn-publish {
		width: 77%;
    }
  }
}
</style>