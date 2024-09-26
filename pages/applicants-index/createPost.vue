<template>
  <view class="page">
    <view class="header">
		<image src="../../static/bacePage.png" style="width: 48rpx; height: 48rpx;" @click="goBack"></image>
		<text>求职</text>
    </view>
    
    <view class="content">
		<!-- 第一个盒子 -->
		<view class="box1">
			<view class="resume-photo" @tap="choosePhoto">
				<image v-if="resumePhoto" :src="resumePhoto"></image>
				<view v-else class="placeholder">
					<view style="display: flex; justify-content: center; margin-bottom: 5rpx;">
						<image src="../../static/applicants-index/index/photo.png"></image>
					</view>
					<view>简历照片</view>
				</view>
			</view>

			<view class="form-item">
				<text>姓名：</text>
				<input v-model="formData.name" placeholder="请输入姓名" />
			</view>

			<view class="form-item">
				<text>性别：</text>
				<picker @change="bindPickerChange" :range="genderOptions">
					<view class="picker">
						{{formData.gender || '请选择性别'}}
					</view>
				</picker>
			</view>
			<view class="form-item">
				<text>学历：</text>
				<input v-model="formData.education" placeholder="请输入学历" />
			</view>
			<view class="form-item">
				<text>年龄：</text>
				<input v-model="formData.age" placeholder="请输入年龄" />
			</view>
			<view class="form-item">
				<text>毕业院校：</text>
				<input v-model="formData.university" placeholder="请输入毕业院校" />
			</view>
			<view class="form-item">
				<text>现居地址：</text>
				<input v-model="formData.address" placeholder="请输入现居地址" />
			</view>
			<view class="form-item">
				<text>联系电话：</text>
				<input v-model="formData.phone" placeholder="请输入联系电话" />
			</view>
			<view class="form-item">
				<text>邮箱：</text>
				<input v-model="formData.email" placeholder="请输入邮箱" />
			</view>
		</view>

		<view class="box2">
			<view class="form-item">
				<text>职位：</text>
				<input v-model="formData.position" placeholder="请输入职位" />
			</view>
			<view class="form-item">
				<text>城市：</text>
				<input v-model="formData.city" placeholder="请输入城市" />
			</view>
			<view class="form-item">
				<text>期望薪资：</text>
				<input v-model="formData.salary" placeholder="请输入期望薪资" />
			</view>
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
        name: '',
        gender: '',
        education: '',
        age: '',
        university: '',
        address: '',
        phone: '',
        email: '',
        position: '',
        city: '',
        salary: ''
      },
      resumePhoto: '',
      genderOptions: ['女', '男'],
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
	 // 加载草稿数据
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
          this.resumePhoto = res.data.resumePhoto
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
                data: {
                    ...this.formData,
                    resumePhoto: this.resumePhoto
                }
            });
            uni.showToast({
                title: '草稿保存成功',
                icon: 'success'
            });
            // 成功后再跳转页面
            uni.navigateTo({
                url: '/pages/applicants-index/index',
            });
        } catch (error) {
            uni.showToast({
                title: '保存失败，请重试',
                icon: 'none'
            });
        }
    },
	// 发布
    async publish() {
      try {
          const response = await uni.request({
            url: 'your_api_url/publish',
            method: 'POST',
			header: {
				'Authorization': `Bearer ${this.token}`,
			},
            data: {
              ...this.formData,
              resumePhoto: this.resumePhoto
            }
          });
      
          if (response[1].statusCode === 200) { // 检查响应状态
            uni.showToast({
              title: '发布成功',
              icon: 'success',
            });
            uni.navigateTo({
              url: '/pages/applicants-index/index',
            });
          } else {
            throw new Error('发布失败'); // 如果状态码不是200，抛出错误
          }
          
        } catch (error) {
          uni.showToast({
            title: '发布失败，请重试',
            icon: 'none'
          });
        }
    },
    choosePhoto() {
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          this.resumePhoto = res.tempFilePaths[0]
        }
      })
    },
    bindPickerChange(e) {
      this.formData.gender = this.genderOptions[e.detail.value]
	  console.log(this.genderOptions[e.detail.value])
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
	background-color: #69B29D;
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
.box1, .box2 {
	box-shadow: 0rpx 8rpx 10rpx 1rpx rgba(0, 0, 0, 0.3);
	border-bottom-left-radius: 20rpx;
	border-bottom-right-radius: 20rpx;
	padding: 30rpx;
	margin-bottom: 10rpx;
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
	font-size: 30rpx;
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

.footer {
  display: flex;
  margin-top: 30rpx;
  
  button {
    margin: 0 15rpx;
	background-color: #FFFFFF;
    color: #69B29D;
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
