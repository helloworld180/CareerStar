<template>
  <view class="job-detail">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
		<view style="display: flex;">
			<image src="../../static/bacePage.png" style="width: 48rpx; height: 48rpx;" @click="goBack"></image>
			<text class="title">职位详情</text>
		</view>
		<view class="favorite-icon">
			<image :src=" iflike ? '../../static/applicants-index/jobDetails/star.png' : '../../static/applicants-index/jobDetails/star2.png'" alt="" style="width: 40rpx; height: 40rpx;" @click="toggleLike(iflike)" />
		</view>
    </view>
    
    <!-- 主要内容区 -->
    <view class="content">
		
		<!-- 职位信息卡片 -->
		<view class="job-card">
			<view class="job-title">
				<view style="width: 50rpx; height: 50rpx; border-radius: 50%; background-color: #E4F4F0; box-shadow: inset 0 3rpx 6rpx 1rpx rgba(0, 0, 0, 0.3);"></view>
				<view style="margin-left: 30rpx; font-size: 35rpx; color: #004934;">{{ jobInfo.title }}</view>
			</view>
			
			<view class="job-salary">
				<text>{{jobInfo.salary}}</text>
			</view>
			
			<view class="job-tags">
				<view class="tag" v-for="(tag, index) in jobInfo.tags" :key="index">
					<image :src="tag.tagImg" style="width: 30rpx; height: 26rpx;"></image>
					<text style="margin-left: 10rpx;">{{tag.text}}</text>
				</view>
			</view>
			
			<view class="job-requirements">
				<view class="requirement" v-for="(req, index) in jobInfo.requirements" :key="index">
					<text>{{req}}</text>
				</view>
			</view>
			
			<view class="line" style="background-color: #D9D9D9; height: 2rpx;"></view>
			
			<view class="job-location">
				<view style="display: flex; align-items: center;">
					<image src="../../static/applicants-index/jobDetails/location.png" style="width: 40rpx; height: 40rpx; margin-right: 15rpx;"></image>
					<text>{{jobInfo.location}}</text>
				</view>
				<image src="../../static/applicants-index/jobDetails/nextPage2.png" style="width: 48rpx; height: 48rpx;"></image>
			</view>
		</view>
      
		<!-- 公司信息 -->
		<view class="company-info">
			<view class="section-header">
				<view style="font-size: 30rpx; color: #004934; font-weight: bold;">公司信息</view>
				<view class="view-all" @click="showPopup">查看全部</view>
			</view>
			<view class="company-name">{{companyInfo.name}}</view>
			<view class="company-details">{{companyInfo.details}}</view>
			<view class="company-tags">
				<view class="company-tag" v-for="(tag, index) in companyInfo.tags" :key="index">
					<text>{{tag}}</text>
				</view>
			</view>
		</view>
      
		<!-- 工作描述 -->
		<view class="job-description">
			<view class="section-header">
				<view style="font-size: 30rpx; color: #004934; font-weight: bold;">工作描述</view>
				<view class="view-all" @click="showJobDescription">查看全部</view>
			</view>
			<view class="description-content" v-for="(description, index) in jobDescription" :key="index">
				<text>{{ description }}</text>
			</view>
		</view>
      
		<!-- HR联系人 -->
		<view class="hr-contact">
			<image :src="hrInfo.avatar" mode="aspectFill"></image>
			<view class="hr-info">
				<text>{{hrInfo.name}}</text>
				<text>{{hrInfo.title}}</text>
			</view>
			<button class="contact-btn" @click="contactHR">聊一聊</button>
		</view>
	</view>
    
    <!-- 底部按钮 -->
    <view class="bottom-buttons">
      <button class="job-list-btn" @click="viewJobList">职位列表</button>
      <button class="apply-btn" @click="applyJob">投递简历</button>
    </view>
    
    <!-- 弹出层 -->
	<uni-popup ref="companyInfoPopup" type="bottom">
		<view class="popup-content">
			<view class="popup-header">
				<view>公司信息详情</view>
				<image src="../../static/applicants-index/jobDetails/close.png" style="width: 48rpx; height: 48rpx;" @click="closeCompanyInfo"></image>
			</view>
			
			<view class="popup-body">
				<view v-for="(detail,index) in companyDetails" :key="index">
					{{detail}}
				</view>
				<!-- 这里放置完整的公司信息 -->
				<!-- <view>公司名称：北京抖音信息服务有限公司</view>
				<view>外文名：ByteDance</view>
				<view>所属行业：信息科技</view>
				<view>成立时间：2012年3月9日</view>
				<view>总部地点：北京市海淀区知春路甲48号2号楼10A室 </view>
				<view>经营范围：技术开发、技术推广、技术转让、技术咨询、技术服务等</view>
				<view>公司类型：有限责任公司</view>
				<view>年营业额：约 1400 亿元（2019年）</view>
				<view>创始人：张一鸣</view> -->
			</view>
		</view>
	</uni-popup>
	
	<uni-popup ref="jobDescriptionPopup" type="bottom">
		<view class="popup-content">
			<view class="popup-header">
				<view>工作描述详情</view>
				<image src="../../static/applicants-index/jobDetails/close.png" style="width: 48rpx; height: 48rpx;" @click="closeJobDescription"></image>
			</view>
			
			<view class="popup-body">
				<view v-for="(detail,index) in jobDetails" :key="index">
					{{detail}}
				</view>
				<!-- 这里放置完整的工作描述 -->
				<!-- 1、PC、APP端UI设计，包括产品风格设定及日常迭代工作；
				2、PC、APP端产品的交互及用户体验优化；
				3、啊八八八八来说就是搜索就九十度角；
				4、谁都不傻计算机视觉爱神的箭阿哈出节目中。 -->
			</view>
		</view>
	</uni-popup>
		

  </view>
</template>
<script>
export default {
  data() {
    return {
		jobInfo: {
			title:'UI设计师',
			salary:'6-8k/月',
			tags:[
				{ text:'招若干人', tagImg:'/static/applicants-index/jobDetails/person+.png' },
				{ text:'本科及以上', tagImg:'/static/applicants-index/jobDetails/xueli.png' },
				{ text:'经验不限', tagImg:'/static/applicants-index/jobDetails/experience.png' },
			],
			requirements:[ '经验1年以上', '本科以上' ],
			location:'福建 · 福州',
		},
		companyInfo: {
			name:'北京职星星股份有限公司',
			details:'民营企业 · 少于50人 · 软件开发',
			tags:[
				'做五休二', 
				'弹性工作',
				'五险',
			]
		},
		jobDescription: [
			'1、PC、APP端UI设计，包括产品风格设定及日常迭代工作',
			'2、PC、APP端产品的交互及用户体验优化...'
		],
		hrInfo: {
			avatar:'/static/offer.png',
			name:'徐女士',
			title:' · HR'
		},
		companyDetails: [
			'公司名称：北京抖音信息服务有限公司',
			'外文名：ByteDance',
			'所属行业：信息科技',
			'成立时间：2012年3月9日'
		],
		jobDetails: [
			'1、PC、APP端UI设计，包括产品风格设定及日常迭代工作；',
			'2、PC、APP端产品的交互及用户体验优化；',
			'3、啊八八八八来说就是搜索就九十度角；'
		],
		iflike: true,
		// isFavorite: false
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
		  data: {
			jobId: this.jobId // 假设jobId是通过路由参数传递的
		  },
		  success: (res) => {
			if (res.statusCode === 200) {
			  const data = res.data;
			  this.jobInfo = data.jobInfo;
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
	toggleLike(iflike) {
		this.iflike = ! iflike;
	},
    // async toggleLike(item) {
    //   try {
		  // item.liked = !item.liked;
    //     const token = uni.getStorageSync('userToken')
    //     const response = await uni.request({
    //       url: 'your_api_endpoint/toggle_favorite',
    //       method: 'POST',
    //       data: {
    //         jobId: this.jobId
    //       },
    //       header: {
    //         'Authorization': `Bearer ${token}`
    //       }
    //     })
    //     if (response.statusCode === 200) {
    //       this.isFavorite = !this.isFavorite
    //       uni.showToast({
    //         title: this.isFavorite ? '收藏成功' : '取消收藏',
    //         icon: 'success'
    //       })
    //     }
    //   } catch (error) {
    //     console.error('切换收藏状态失败:', error)
    //   }
    // },
   showPopup() {
	   this.$refs.companyInfoPopup.open()
   },
    closeCompanyInfo() {
      this.$refs.companyInfoPopup.close()
    },
    showJobDescription() {
      this.$refs.jobDescriptionPopup.open()
    },
    closeJobDescription() {
      this.$refs.jobDescriptionPopup.close()
    },
    contactHR() {
      // 实现联系HR的逻辑
    },
    viewJobList() {
      // 跳转到职位列表页面
	  uni.navigateTo({
	  	url:'/pages/applicants-index/offerList'
	  })
    },
    applyJob() {
      // 实现投递简历的逻辑
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


.content {
  background-color: #FFFFFF;
  border-radius: 16rpx;
  padding: 30rpx 20rpx 60rpx 20rpx;
  margin-top: 10rpx;
}

.job-card {
	width: 100%;
	height: auto;
	background-image: url('/static/applicants-index/index/backgroundImg.png');
	background-size: cover; /* 使背景图像覆盖整个元素 */
	background-repeat: no-repeat; /* 禁止背景图像重复 */
	background-position: center; /* 将背景图像居中 */
	border-radius: 40rpx;
	padding: 30rpx;
	box-shadow: 0rpx 8rpx 10rpx 1rpx rgba(0, 0, 0, 0.3);

	.job-title {
		display: flex;
		padding: 12rpx 0 12rpx 20rpx;
		width: 100%;
		height: 72rpx;
		border-radius: 50rpx;
		margin-bottom: 15rpx;
		background-image: linear-gradient( to right, #9CDAC8, #E8FFF8);
		font-size:40rpx;
		font-weight: bold;
		box-shadow: 0rpx 5rpx 10rpx 0rpx rgba(0, 0, 0, 0.3);
	}
	  
	.job-salary {
		font-size: 36rpx;
		font-weight: bold;
		color: #ff6b6b;
		margin-left: 20rpx;
		margin-bottom: 10rpx;
	}
	  
	.job-tags {
		display: flex;
		margin-bottom: 20rpx;
		margin-left: 20rpx;
	}
	.tag {
	  color: #004934;
	  margin-right: 40rpx;
	  font-size: 24rpx;
	  display: flex;
	  align-items: center;
	}
	.job-requirements {
		display: flex;
		margin-bottom: 20rpx;
		margin-left: 20rpx;
	}
	.requirement {
		color: #004934;
		background-color: #CCEAE1;
		width: auto;
		border-radius: 4rpx;
		margin-right: 20rpx;
		font-size: 14rpx;
		padding: 2rpx 15rpx;
		display: flex;
		align-items: center;
	}
	.job-location {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 15rpx;
		margin-left: 20rpx;
		color: #4fbfa5;
		font-size: 24rpx;
	}
	.uni-icons {
		margin-right: 10rpx;
	}
}

.company-info, .job-description {
  margin-top: 30rpx;
  width: 100%;
  height: auto;
  border-radius: 40rpx;
  padding: 20rpx 40rpx;
  box-shadow: 0rpx 8rpx 10rpx 1rpx rgba(0, 0, 0, 0.3);
  background-image: linear-gradient( 155deg , #B9E3D7, #FFFFFF 40%);
  
	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 15rpx;
	}
    .view-all {
		color: #5BA38E;
		font-size: 24rpx;
    }
	.company-name {
		font-size: 24rpx;
		color: #004934;
		margin-bottom: 15rpx;
	}
	.company-details {
		font-size: 20rpx;
		color: #69B29D;
		margin-bottom: 20rpx;
	}
	.company-tags {
		display: flex;
		margin-bottom: 20rpx;
		.company-tag {
			color: #004934;
			background-color: #CCEAE1;
			width: auto;
			border-radius: 4rpx;
			margin-right: 20rpx;
			font-size: 14rpx;
			padding: 2rpx 15rpx;
			display: flex;
			align-items: center;
		}
	}
  
  .description-content {
    font-size: 24rpx;
    color: #004934;
    line-height: 1.6;
  }
}

.hr-contact {
  display: flex;
  align-items: center;
  margin-top: 30rpx;
  width: 100%;
  height: auto;
  border-radius: 40rpx;
  padding: 20rpx 30rpx;
  box-shadow: 0rpx 8rpx 8rpx 1rpx rgba(0, 0, 0, 0.3);
  border: 1rpx solid #D9D9D9;
  
  image {
    width: 64rpx;
    height: 64rpx;
    border-radius: 50%;
    margin-right: 20rpx;
  }
  
  .hr-info {
	  display: flex;
    flex: 1;
    
    text {
      display: block;
      font-size: 24rpx;
      
      &:last-child {
		  font-weight: bold;
      }
    }
  }
  .contact-btn {
    background-color: #69B29D;
    color: #FFFFFF;
	width: 160rpx;
	height: 48rpx;
    font-size: 24rpx;
	display: flex;
	align-items: center;
	justify-content: center;
    border-radius: 10rpx;
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