<template>
  <view class="job-detail">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
		<view style="display: flex;">
			<image src="../../static/bacePage.png" style="width: 48rpx; height: 48rpx;" @click="goBack"></image>
			<text class="title">我的简历</text>
		</view>
		<view class="fold-icon">
			<image src="../../static/applicant-mine/resume/Folder_Add.png" style="width: 40rpx; height: 40rpx;"></image>
		</view>
    </view>
    
    <!-- 主要内容区 -->
    <view class="content">
		
		<!-- 个人信息卡片 -->
		<view class="job-card">
			<!-- 一二行 -->
			<view class="infoTitle">
				<view>
					<view style="font-size: 32rpx; color: #004934; font-weight: bold;">基本信息</view>
					<view style="display: flex; margin-top: 20rpx;">
						<view class="jobcardText">{{ myInfo.name }}</view>
						<view class="jobcardText">{{ myInfo.sex }} · {{ myInfo.identity }} · {{ myInfo.age }}</view>
					</view>
				</view>
				<view>
					<image src="../../static/offer.png" class="titleAvatar"></image>
				</view>
			</view>
			<!-- remain -->
			<view class="infoTitle">
				<view>
					<view class="infoContent">
						<image src="../../static/applicant-mine/resume/location.png" class="job-card-icon"></image>
						<view class="jobcardText">{{ myInfo.location }}</view>
					</view>
					<view class="infoContent">
						<image src="../../static/applicant-mine/resume/Phone.png" class="job-card-icon"></image>
						<view class="jobcardText">{{ myInfo.tel }}</view>
					</view>
					<view class="infoContent">
						<image src="../../static/applicant-mine/resume/Mail_Open.png" class="job-card-icon"></image>
						<view class="jobcardText">{{ myInfo.email }}</view>
					</view>
				</view>
				<view>
					<image src="../../static/applicants-index/jobDetails/nextPage2.png" class="job-card-icon"></image>
				</view>
			</view>
		</view>
      
		<!-- 求职意向 -->
		<view class="want-Info">
			<view class="section-header">
				<view style="font-size: 32rpx; color: #004934; font-weight: bold; margin-bottom: 20rpx;">求职意向</view>
				<view style="display: flex;">
					<view class="wantText">{{myInfo.wantJob}}</view>
					<view class="wantText">{{myInfo.wantSalary}}</view>
				</view>
				<view class="wantText">意向城市 · {{myInfo.wantCity}}</view>
			</view>
			<view>
				<image src="../../static/applicants-index/jobDetails/nextPage2.png" style="width: 48rpx; height: 48rpx;"></image>
			</view>
			
		</view>
      
		<!-- 教育背景 -->
		<view class="eduBgc">
			<view>
				<view style="font-size: 32rpx; color: #004934; font-weight: bold;">教育背景</view>
				<!-- 显示已添加的教育背景 -->
				<view v-for="(edu, index) in educationList" :key="index" class="edu-item">
				    {{ edu }}
				</view>
			</view>
			<image src="../../static/applicant-mine/resume/add.png" style="width: 48rpx; height: 48rpx;"
			@click="showPopup()"></image>
		</view>
		<!-- 个人特长 -->
		<view class="advantage">
			<view>
				<view style="font-size: 32rpx; color: #004934; font-weight: bold;">个人特长</view>
				<!-- 显示已添加的个人特长 -->
				<view v-for="(adv, index) in advList" :key="index" class="edu-item">
				    {{ adv }}
				</view>
			</view>
			<image src="../../static/applicant-mine/resume/add.png" style="width: 48rpx; height: 48rpx;"
			@click="showAdvPopup()"></image>
		</view>
		<!-- 工作经历 -->
		<view class="experience">
			<view>
				<view style="font-size: 32rpx; color: #004934; font-weight: bold;">工作经历</view>
				<!-- 显示已添加的工作经历 -->
				<view v-for="(exp, index) in expList" :key="index" class="edu-item">
				    {{ exp }}
				</view>
			</view>
			<image src="../../static/applicant-mine/resume/add.png" style="width: 48rpx; height: 48rpx;"
			@click="showExpPopup()"></image>
		</view>
		
	</view>
    
    <!-- 底部按钮 -->
    <view class="bottom-buttons">
      <button class="job-list-btn" @click="viewJobList">预览简历</button>
      <button class="apply-btn" @click="applyJob">保存简历</button>
    </view>
    
    <!-- 弹出层 -->
	<uni-popup ref="eduPopup" type="bottom">
		<view class="popup-content">
			<view class="popup-header">
				<view>教育背景</view>
				<image src="../../static/applicants-index/jobDetails/close.png" style="width: 48rpx; height: 48rpx;" @click="closeInfo"></image>
			</view>
			<view class="popup-body">
				<textarea v-model="educationInput" placeholder="请输入您的教育背景" class="education-input" />
				<button @click="saveEduBackground">保存</button>
			</view>
			
		</view>
	</uni-popup>

	<uni-popup ref="advPopup" type="bottom">
		<view class="popup-content">
			<view class="popup-header">
				<view>个人特长</view>
				<image src="../../static/applicants-index/jobDetails/close.png" style="width: 48rpx; height: 48rpx;" @click="closeAdvInfo"></image>
			</view>
			<view class="popup-body">
				<textarea v-model="advInput" placeholder="请输入您的个人特长" class="education-input" />
				<button @click="saveAdv">保存</button>
			</view>
			
		</view>
	</uni-popup>
	
	<uni-popup ref="expPopup" type="bottom">
		<view class="popup-content">
			<view class="popup-header">
				<view>工作经历</view>
				<image src="../../static/applicants-index/jobDetails/close.png" style="width: 48rpx; height: 48rpx;" @click="closeExpInfo"></image>
			</view>
			<view class="popup-body">
				<textarea v-model="expInput" placeholder="请输入您的工作经历" class="education-input" />
				<button @click="saveExp">保存</button>
			</view>
			
		</view>
	</uni-popup>
	
  </view>
</template>
<script>
export default {
  data() {
    return {
		myInfo: {
			name:'职星星',
			sex: '女',
			avatar:'/static/offer.png',
			identity:'本科应届生',
			age:'24',
			location:'福建福州 · 马尾区',
			tel:'18008082222',
			email:'22905555@qq.com',
			wantJob:'行政专员',
			wantSalary:'7000元/月',
			wantCity:'上海',
		},
		educationInput: '',
		advInput:'',
		advList:[],
		educationList: [],
		expInput:'',
		expList:[],
		token:'',
    }
  },
  onLoad() {
    // this.fetchJobDetails()
    // this.checkFavoriteStatus()
  },
  methods: {
    fetchJobDetails() {
		uni.request({
		  url: 'your_api_endpoint/job_details',
		  method: 'GET',
		  header: {
		      'Authorization': `Bearer ${this.token}`,
		  },
		  data: {
			jobId: this.jobId // 假设jobId是通过路由参数传递的
		  },
		  success: (res) => {
			if (res.statusCode === 200) {
			  const data = res.data;
			  this.myInfo = data.jobInfo;
			  this.companyInfo = data.companyInfo;
			  this.jobDescription = data.jobDescription;
			  this.hrInfo = data.hrInfo;
			}
		  },
		  fail: (error) => {
			console.error('获取职位详情失败:', error);
		  }
		});
  },
    checkFavoriteStatus() {
        const token = uni.getStorageSync('userToken');
        uni.request({
          url: 'your_api_endpoint/check_favorite',
          method: 'GET',
		  header: {
		      'Authorization': `Bearer ${this.token}`,
		  },
          data: {
            jobId: this.jobId
          },
          header: {
            'Authorization': `Bearer ${token}`
          },
          success: (res) => {
            if (res.statusCode === 200) {
              this.isFavorite = res.data.isFavorite;
            }
          },
          fail: (error) => {
            console.error('检查收藏状态失败:', error);
          }
        });
    },
   showPopup() {
	   this.$refs.eduPopup.open()
   },
    closeInfo() {
      this.$refs.eduPopup.close()
    },
	showAdvPopup() {
		this.$refs.advPopup.open()
	},
	closeAdvInfo() {
		this.$refs.advPopup.close()
	},
	showExpPopup() {
		this.$refs.expPopup.open()
	},
	closeExpInfo() {
		this.$refs.expPopup.close()
	},
    showJobDescription() {
      this.$refs.jobDescriptionPopup.open()
    },
    closeJobDescription() {
      this.$refs.jobDescriptionPopup.close()
    },
    saveEduBackground() {
		if (this.educationInput.trim()) {
			this.educationList.push(this.educationInput.trim())
			this.educationInput = ''
			this.closeInfo()
			// 这里可以添加保存到后端的逻辑
		}
    },
	saveAdv() {
		if (this.advInput.trim()) {
			this.advList.push(this.advInput.trim())
			this.advInput = ''
			this.closeAdvInfo()
			// 这里可以添加保存到后端的逻辑
		}
	},
	saveExp() {
		if (this.expInput.trim()) {
			this.expList.push(this.expInput.trim())
			this.expInput = ''
			this.closeExpInfo()
			// 这里可以添加保存到后端的逻辑
		}
	},
    goBack() {
		uni.navigateBack({
		  delta: 1
		});
    }
  }
}
</script>

<style lang="scss" scoped>
.job-detail {
 /* 将页面主体内容设置为 flex 布局，并使用 flex: 1 使其占据除 tabBar 之外的所有可用空间。 */
 display: flex;
 flex-direction: column;
 flex: 1;
 overflow-y: auto;
 
 background-color: #69B29D;
 /* min-height: 100vh; */
 height: 100vh;
 padding: 50rpx 20rpx 50rpx 20rpx;
}

.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10rpx;
  color: #FFFFFF;
}
.title {
	font-size: 32rpx;
	font-weight: bold;
	margin-left: 20rpx;
}

.fold-icon {
	display: flex; align-items: center; justify-content: center;
	width: 66rpx;
	height: 66rpx;
	border-radius: 50%;
	background-color: #FFFFFF;
}

.content {
  background-color: #FFFFFF;
  border-radius: 16rpx;
  padding: 30rpx 20rpx 60rpx 20rpx;
  margin-top: 10rpx;
}

.job-card {
	width: 100%;
	height: auto;
	border-radius: 20rpx;
	padding: 30rpx 40rpx;
	box-shadow: 0rpx 8rpx 10rpx 1rpx rgba(0, 0, 0, 0.3);
	.infoTitle {
		display: flex;
		justify-content: space-between;
	}
	.jobcardText {
		font-size: 28rpx; color: #666666;
		&:last-child {
			margin-left: 20rpx;
		}
	}
	.titleAvatar {
		width: 106rpx;
		height: 106rpx;
		border-radius: 50rpx;
		border: 5rpx solid #FFFFFF;
		box-shadow: 0rpx 8rpx 10rpx 1rpx rgba(0, 0, 0, 0.3);
	}
	.job-card-icon {
		width: 48rpx;
		height: 48rpx;
		&:last-child {
			margin-top: 45rpx;
		}
	}
	.infoContent {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
	}
}

.want-Info, .eduBgc , .advantage, .experience{
	display: flex;
	align-items: center;
	justify-content: space-between;
  margin-top: 30rpx;
  width: 100%;
  height: auto;
  border-radius: 20rpx;
  padding: 20rpx 40rpx;
  box-shadow: 0rpx 8rpx 10rpx 1rpx rgba(0, 0, 0, 0.3);
	.wantText {
		font-size: 28rpx; color: #666666;
		margin-right: 30rpx;
		margin-bottom: 20rpx;
	}
	
	.edu-item {
		width: 100%;
		height: auto;
	}
}


.bottom-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 30rpx;
  
  button {
    width: 45%;
    font-size: 32rpx;
    border-radius: 10rpx;
    color: #69B29D;
	font-weight: bold;
  }
}

.popup-content {
  background-color: #FFFFFF;
  border-top-left-radius: 40rpx;
  border-top-right-radius: 40rpx;
  padding: 30rpx 40rpx;
  
  .popup-header {
		font-size: 26rpx;
		font-weight: bold;
		display: flex;
		justify-content: space-between;
		align-items: center;
  }
  .popup-body {
	margin-top: 10rpx;
	font-size: 22rpx;
	max-height: 60vh;
	line-height: 1.6;
	overflow-y: auto;
  }
}
</style>