<template>
	<view class="factory">
	
		<!-- header -->
		<view class="header">
			<view class="user-avatar">
				<image src="../../static/applicants-index/index/user.png" style="width: 48rpx; height: 48rpx;"></image>
			</view>
			<!-- 顶部搜索栏 -->
			<view class="search-bar">
				<view class="search-icon">
					<image src="../../static/applicants-index/index/search.png" style="width: 48rpx; height: 48rpx;"></image>
				</view>
			  <view class="search-input">
				<input type="text" placeholder="搜出你想要的好职位！" placeholder-class="placeholder"/>
			  </view>
			</view>
			 <view class="message-icon">
				 <image src="../../static/applicants-index/index/Mail.png" style="width: 48rpx; height: 48rpx;"></image>
			 </view>
		</view>
		
		<!-- remain -->
		<view class="remain">
			
			<!-- title -->
			<view class="title">
				<image src="/static/applicants-index/quickSelect/backPage.png" style="width: 48rpx; height: 48rpx;" @click="backPage"></image>
				<view style="margin-left: 10rpx;">名企大厂</view>
			</view>
			
			<!-- 职位列表选择器 -->
			<view class="job-list-selector">
			  <view class="selector-item" :class="{ active: currentSelector === 'recommend' }" @click="changeSelector('recommend')">推荐</view>
			  <view class="selector-item" :class="{ active: currentSelector === 'nearby' }" @click="changeSelector('nearby')">附近</view>
			  <view class="selector-item" :class="{ active: currentSelector === 'latest' }" @click="changeSelector('latest')">最新</view>
			  <view class="filter-options">
				<picker @change="onCityChange" :value="cityIndex" :range="cityList" class="pickerBox" :style="{backgroundColor: bgc1}">
				  <view class="picker" :style="{color:fontColor1}">{{ cityList[cityIndex] }}</view>
				</picker>
				<picker @change="onFilterChange" :value="filterIndex" :range="filterList" class="pickerBox" :style="{backgroundColor: bgc2}">
				  <view class="picker" :style="{color:fontColor2}">{{ filterList[filterIndex] }}</view>
				</picker>
			  </view>
			</view>

			<!-- 职位列表 -->
			<view class="job-list">
				<view class="job-item" v-for="(item, index) in recommendationList" :key="index">
					<view class="recommendation-item">
						<view class="line2"></view>
						<view class="job-title">
							<view style="display: flex; align-items: center;">
								<view style="width: 50rpx; height: 50rpx; border-radius: 50%; background-color: #E4F4F0; box-shadow: inset 0 3rpx 6rpx 1rpx rgba(0, 0, 0, 0.3);"></view>
								<view class="jobText">{{ item.title }}</view>
							</view>
							<view class="jobText">{{ item.salary }}</view>
						</view>
						<view class="job-details">
							<text>{{ item.location }} · {{ item.time }} · {{ item.begin }}</text>
						</view>
						
						<view class="company-request">
							<view v-for="(items, itemIndex) in item.requestList">
								<view class="companyRqt">{{ items.request }}</view>
							</view>
						</view>
						
						<view class="line" style="background-color: #D9D9D9; height: 2rpx;"></view>
						
						<view class="company-info">
							<image :src="item.companyLogo" mode="aspectFit" class="company-logo"></image>
							<text style="margin-left: 5%; font-size: 28rpx;">{{ item.companyName }}</text>
							<image src="../../static/applicants-index/index/star.png" style="width: 70rpx; height: 70rpx; margin-left: 50%;"></image>
						</view>
						
					</view>
					
					
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
export default {
  data() {
    return {
      recommendationList: [
		{ 
			title: 'UI设计', 
			salary: '7-10k',
			location:'上海',
			time:'上5休2', 
			begin:'7月入职', 
			requestList: [
				{ request: '经验1年以上'},
				{ request: '本科以上'}
			],
			companyLogo:'/static/offer.png', 
			companyName:'字节跳动' ,
		},
		{
			title: 'UI设计', 
			salary: '7-10k',
			location:'上海', 
			time:'上5休2', 
			begin:'7月入职', 
			requestList: [
				{ request: '经验1年以上'},
				{ request: '本科以上'}
			],
			companyLogo:'/static/applicants-index/index/user.png', 
			companyName:'字节跳动' ,
		},
		{
			title: 'UI设计', 
			salary: '7-10k',
			location:'上海', 
			time:'上5休2', 
			begin:'7月入职', 
			requestList: [
				{ request: '经验1年以上'},
				{ request: '本科以上'}
			],
			companyLogo:'/static/applicants-index/index/user.png', 
			companyName:'字节跳动' ,
		},
		{
			title: 'UI设计', 
			salary: '7-10k',
			location:'上海', 
			time:'上5休2', 
			begin:'7月入职', 
			requestList: [
				{ request: '经验1年以上'},
				{ request: '本科以上'}
			],
			companyLogo:'/static/applicants-index/index/user.png', 
			companyName:'字节跳动' ,
		},
	  ],
      currentSelector: 'recommend',
      cityList: [ '上海', '北京', '广州', '深圳'],
      cityIndex: 0,
      filterList: ['按轮次排序', '按薪资排序', '按招收人数排序', '按发布时间排序'],
      filterIndex: 0,
	  bgc1:'#D9D9D9',
	  bgc2:'#D9D9D9',
	  fontColor1:'#666666',
	  fontColor2:'#666666',
      
    }
  },
  onLoad() {
    this.fetchRecommendations()
    this.fetchJobs()
  },
  methods: {
	  backPage() {
		  uni.navigateBack({
		    delta: 1
		  });
	  },
    async fetchRecommendations() {
      // 从后端获取今日推荐数据
      // const response = await this.$api.getRecommendations()
      // this.recommendationList = response.data
    },
    async fetchJobs() {
      // 从后端获取职位列表
      // const response = await this.$api.getJobs(this.currentSelector)
      // this.jobList = response.data
    },
    deleteJobList(index) {
      this.jobList.splice(index, 1)
      // 可以在这里调用后端接口，同步删除操作
    },
    changeSelector(selector) {
      this.currentSelector = selector
      this.fetchJobs()
    },
    onCityChange(e) {
      this.cityIndex = e.detail.value
      this.fetchJobs()
	  console.log(this.cityIndex)
	  this.bgc1 = '#B9E3D7'
	  this.fontColor1 ='#5BA38E'
    },
    onFilterChange(e) {
      this.filterIndex = e.detail.value
      this.fetchJobs()
	  this.bgc2 = '#B9E3D7'
	  this.fontColor2 ='#5BA38E'
    }
  }
}
</script>

<style scoped>
.factory {
	/* 将页面主体内容设置为 flex 布局，并使用 flex: 1 使其占据除 tabBar 之外的所有可用空间。 */
	display: flex;
	flex-direction: column;
	flex: 1;
	overflow-y: auto;
	
	background-color: #69B29D;
	/* min-height: 100vh; */
	height: 100vh;
	padding: 60rpx 20rpx 0 20rpx;
}

.header {
	display: flex;
	justify-content: space-between;
}
.search-icon {
	width: 48rpx;
	height: 48rpx;
}
.search-bar {
  display: flex;
  align-items: center;
  background-color: #fff;
  width: 75%;
  height: 66rpx;
  border-radius: 40rpx;
  padding: 10rpx 20rpx;
}
.placeholder {
	color: #AEAEAE;
}

.user-avatar, .message-icon {
  width: 66rpx;
  height: 66rpx;
  display: flex; align-items: center; justify-content: center;
  background-color: #FFFFFF;
  border-radius: 50%;
}

.search-input {
  flex: 1;
  margin: 0 20rpx;
}

.search-input input {
  font-size: 28rpx;
}

.recommendation-header {
	display: flex;
	margin: 0rpx 15rpx 20rpx 15rpx;
}
.remain {
	background-color: #FFFFFF;
	border-radius: 20rpx;
	margin-top: 20rpx;
	padding: 15rpx 0;
	/* 占据剩余页面 */
	flex-direction: column;
	flex: 1;
}

.title {
	display: flex;
	margin-left: 15rpx;
	align-items: center;
	color: #004934;
	font-size: 32rpx;
	font-weight: bold;
}

.job-list-selector {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: rgba(214, 238, 231, 0.42);
  border-top-style: dashed;
  border-top-width: 3rpx;
  border-top-color: #69B29D;
  margin-top: 10rpx;
}

.selector-item {
	font-size: 32rpx;
	color: #B3B3B3;
	font-weight: bold;
	padding: 10rpx 0rpx;
	border-bottom: 6rpx solid transparent;
}

.selector-item.active {
  color: #004934;
  border-bottom-color: #69B29D;
}

.filter-options {
  display: flex;
  justify-content: space-between;
}

.picker {
  font-size: 20rpx;
}

.pickerBox {
	display: flex;
	justify-content: center;
	align-items: center;
	width: auto;
	height: 40rpx;
	border-radius: 30rpx;
	padding: 0 15rpx;
	margin: 0 10rpx;
	background-color: #D9D9D9;
}

.job-list {
  padding: 0 15rpx;
}

.job-item {
	height: auto;
	border-radius: 40rpx;
	background-image: url('/static/applicants-index/index/backgroundImg.png');
	background-size: cover; /* 使背景图像覆盖整个元素 */
	background-repeat: no-repeat; /* 禁止背景图像重复 */
	background-position: center; /* 将背景图像居中 */
	margin-top: 20rpx;
	border-bottom: 1rpx solid #eee;
	padding: 20rpx 15rpx;
	box-shadow: 0rpx 5rpx 10rpx 1rpx rgba(0, 0, 0, 0.3);
}

.job-item:last-child {
  border-bottom: none;
}

.line2 {
	width: 30%;
	height: 18rpx;
	margin-left: 34%;
	border-radius: 100rpx;
	background-image: linear-gradient( to bottom, #348D73, #69B29D);
	
}
.jobText {
	margin: 0 30rpx; 
	font-size: 40rpx; 
	color: #004934;
}

.job-title {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 12rpx 0 12rpx 20rpx;
	width: 95%;
	height: 72rpx;
	border-radius: 50rpx;
	margin: 0 auto;
	margin-top: 30rpx;
	margin-bottom: 20rpx;
	background-image: linear-gradient( to right, #9CDAC8, #E8FFF8);
	font-size: 32rpx;
	font-weight: bold;
	box-shadow: 0rpx 5rpx 10rpx 0rpx rgba(0, 0, 0, 0.3);
}

.job-details {
	display: flex;
  font-size: 24rpx;
  color: #004934;
  margin-left: 30rpx;
  margin-bottom: 15rpx;
}
.company-request {
	display: flex;
	align-items: center;
	margin-left: 20rpx;
	margin-bottom: 20rpx;
}
.companyRqt {
	width: auto; 
	height: auto; 
	font-size: 14rpx;
	padding: 0 15rpx;
	border-radius: 6rpx;
	margin: 0 8rpx;
	background-color: #CCEAE1; 
	color: #004934;
}
.company-info {
	display: flex;
	align-items: center;
	margin-top: 10rpx;
	margin-left: 5%;
}
.company-logo {
  width: 70rpx;
  height: 70rpx;
  margin-right: 10rpx;
  vertical-align: middle;
}
</style>