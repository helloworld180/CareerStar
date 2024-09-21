<template>
	<view class="appliDetails">
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
			<!-- 简历图片 -->
			<image :src="resumeImg" style="width: 100%; height: 60%;" mode="aspectFill"></image>
			
			<!-- 求职意向 -->
			<view class="want-info">
				<view class="section-header">
					<view style="font-size: 30rpx; color: #001549; font-weight: bold;">求职意向</view>
					<view class="view-all" @click="showPopup">查看全部</view>
				</view>
				<view style="display: flex;">
					<view class="want-name">意向职位：{{wantInfo.name}}</view>
					<view class="want-salary">意向薪资：{{wantInfo.salary}}</view>
				</view>
				<view class="want-city">意向城市：{{wantInfo.city}}</view>
			</view>
			
			<!-- HR联系人 -->
			<view class="hr-contact">
				<image :src="hrInfo.avatar" mode="aspectFill" class="hrImg"></image>
				<view class="hr-info">
					<text>{{hrInfo.name}}</text>
					<text>{{hrInfo.title}}</text>
				</view>
				<button class="contact-btn" @click="contactHR">聊一聊</button>
			</view>
			
			<!-- 底部按钮 -->
			<view class="bottom-buttons">
			  <button class="job-list-btn" @click="viewJobList">发送邀请</button>
			  <button class="apply-btn" @click="applyJob">Next</button>
			</view>
			
		</view>
		
		
		<!-- 弹出层 -->
		<uni-popup ref="wantInfoPopup" type="bottom">
			<view class="popup-content">
				<view class="popup-header">
					<view>求职意向详情</view>
					<image src="../../static/applicants-index/jobDetails/close.png" style="width: 48rpx; height: 48rpx;" @click="closeCompanyInfo"></image>
				</view>
				
				<view class="popup-body">
					<view v-for="(detail,index) in wantDetails" :key="index">
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
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				iflike: true,
				resumeImg:'/static/background.png',
				wantInfo: {
					name:'行政专员',
					salary:'7k/月',
					city:'上海',
				},
				wantDetails: [
					'意向职位：行政专员',
					'意向薪资：7k/月',
					'意向城市：上海',
					'其他：盎司八百但不代表八年四季度好好抱抱你你'
				],
				hrInfo: {
					avatar:'/static/offer.png',
					name:'徐女士',
					title:' · HR'
				},
				token:'',
			}
		},
		methods: {
			toggleLike(iflike) {
				this.iflike = ! iflike;
			},
			goBack() {
				uni.navigateBack({
				  delta: 1
				});
			},
			showPopup() {
				   this.$refs.wantInfoPopup.open()
			},
			 closeCompanyInfo() {
			   this.$refs.wantInfoPopup.close()
			 },
			 getAppliDetails() {
				 uni.request({
				         url: '你的API地址',
				         method: 'GET', // 或 'POST'，根据后端要求
				         header: {
				             'Authorization': `Bearer ${this.token}`,
				         },
				         success: (response) => {
				             // 假设后端返回的数据格式正确
				             const data = response.data;
				             this.resumeImg = data.resumeImg;
				             this.wantInfo = data.wantInfo;
				             this.wantDetails = data.wantDetails;
				             this.hrInfo = data.hrInfo;
				         },
				         fail: (error) => {
				             console.error('请求失败:', error);
				         }
				     });
			 }
		},
		onLoad() {
			// this.getAppliDetails()
		}
	}
</script>

<style scoped>
.appliDetails {
	/* 将页面主体内容设置为 flex 布局，并使用 flex: 1 使其占据除 tabBar 之外的所有可用空间。 */
	display: flex;
	flex-direction: column;
	flex: 1;
	overflow-y: auto;
	
	background-color: #6998B2;
	/* min-height: 100vh; */
	height: 100vh;
	padding: 50rpx 20rpx 30rpx 20rpx;
	
	
}
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10rpx;
  color: #FFFFFF;
  flex-shrink: 0; /*确保其他元素（如nav-bar）不会伸缩：*/
}
.title {
	font-size: 32rpx;
	font-weight: bold;
	margin-left: 20rpx;
}

.content {
	height: 100vh;
	flex: 1;
    display: flex;
	flex-direction: column;
	background-color: #FFFFFF;
	border-radius: 16rpx;
	padding: 30rpx 20rpx 60rpx 20rpx;
	margin-top: 10rpx;
	overflow: visible;

}

.want-info {
	margin-top: 30rpx;
	width: 100%;
	height: auto;
	border-radius: 40rpx;
	padding: 20rpx 40rpx;
	box-shadow: 0rpx 8rpx 10rpx 1rpx rgba(0, 0, 0, 0.3);
	background-image: linear-gradient( 155deg , #B9CAE3, #FFFFFF 40%);
}
.section-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 15rpx;
}
.view-all {
	color: #4D6A96;
	font-size: 24rpx;
}
.want-name, .want-city {
	font-size: 24rpx;
	color: #001549;
	margin-bottom: 15rpx;
}
.want-salary {
	font-size: 24rpx;
	color: #001549;
	margin-left: 15%;
	margin-bottom: 20rpx;
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
}  
  .hrImg {
    width: 64rpx;
    height: 64rpx;
    border-radius: 50%;
    margin-right: 20rpx;
  }
  
.hr-info {
  display: flex;
  flex: 1;
}

.hr-info text {
  display: block;
  font-size: 24rpx;
}

.hr-info text:last-child {
  font-weight: bold;
}

  .contact-btn {
    background-color: #6998B2;
    color: #FFFFFF;
	width: 160rpx;
	height: 48rpx;
    font-size: 24rpx;
	display: flex;
	align-items: center;
	justify-content: center;
    border-radius: 10rpx;
  }


.bottom-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 30rpx;
}
.bottom-buttons button {
    width: 45%;
    font-size: 32rpx;
    border-radius: 10rpx;
	background-color: #6998B2;
    color: #FFFFFF;
	font-weight: bold;
  }


.popup-content {
  background-color: #FFFFFF;
  border-top-left-radius: 40rpx;
  border-top-right-radius: 40rpx;
  padding: 30rpx 40rpx;
}
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

</style>
