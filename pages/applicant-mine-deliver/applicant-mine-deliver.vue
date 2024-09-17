<template>
	<view class="offerList">
		<!-- header -->
		<view class="header">
			<view style="display: flex; align-items: center;">
				<view class="backIcon" @click="backPage">
					<image src="../../static/applicant-mine/deliver/backPage.png" style="width: 48rpx; height: 48rpx;"></image>
				</view>
				<!-- text -->
				<view class="headerText">已投递的简历</view>
			</view>
			
			<!-- 顶部搜索栏 -->
			<view class="search-bar">
				<view class="search-icon">
					<image src="../../static/applicants-index/index/search.png" style="width: 48rpx; height: 48rpx;"></image>
				</view>
			  <view class="search-input">
				<input type="text" placeholder="搜索你投递的简历" placeholder-class="placeholder"/>
			  </view>
			</view>
			 
		</view>
		
		
		<!-- remain -->
		<view class="remain">
			<!-- 职位列表选择器 -->
			<view class="job-list-selector">
			  <view class="selector-item" :class="{ active: currentSelector === 'haveRead' }" @click="changeSelector('haveRead')">已读</view>
			  <view class="selector-item" :class="{ active: currentSelector === 'noRead' }" @click="changeSelector('noRead')">未读</view>
			  
			  <!-- 过滤器 -->
			  <view class="filter-options">
				<picker @change="onCityChange" :value="cityIndex" :range="batchList" class="pickerBox" :style="{backgroundColor: bgc1}">
				  <view class="picker" :style="{color:fontColor1}">{{ batchList[cityIndex] }}</view>
				</picker>
				<picker @change="onFilterChange" :value="filterIndex" :range="filterList" class="pickerBox" :style="{backgroundColor: bgc2}">
				  <view class="picker" :style="{color:fontColor2}">{{ filterList[filterIndex] }}</view>
				</picker>
			  </view>
			</view>
			
			<!-- 职位列表 -->
			<view class="job-list">
				<view class="job-item" v-for="(job, index) in jobList" :key="index">
					<!-- 第一行 -->
					<view class="job-info">
						<view style="display: flex;">
							<view style="width: 40rpx; height: 40rpx; border-radius: 50%; background-color: #E4F4F0; box-shadow: inset 0 3rpx 6rpx 1rpx rgba(0, 0, 0, 0.3);"></view>
							<view class="jobTitle">{{ job.title }}</view>
						</view>
						<view class="job-salary">{{ job.salary }}</view>
					</view>
					<!-- 第二行 公司名称 -->
					<view class="companyInfo">
						<text>{{ job.companyName }}</text>
						<text style="margin-left: 20rpx;">{{ job.companySize }}</text>
					</view>
					<!-- 第三行 tag -->
					<view class="job-tags">
						<text v-for="(tag, tagIndex) in job.tags" :key="tagIndex">{{ tag }}</text>
					</view>
					<!-- 第四行 HR -->
					<view class="recruiter-info">
						<image :src="job.recruiterAvatar" mode="aspectFill"></image>
						<view style="margin-left: 20rpx;">
							<view style="font-size: 28rpx; color: #004934; font-weight: bold;">{{ job.recruiterName }} · HR</view>
							<view style="display: flex; justify-content: space-between; align-items: center; margin-top: 5rpx;">
								<view style="font-size: 24rpx; color: #5BA38E;">{{ job.recruiterTime }}</view>
								<view style="font-size: 24rpx; color: #5BA38E; margin-left: 35%;">{{ job.location }}</view>
								<view class="delete-btn" @click="deleteJobList(index)">X</view>
							</view>
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
				currentSelector: 'haveRead',
				batchList: [ '春招', '秋招' ],
				cityIndex: 0,
				filterList: ['按轮次排序', '按薪资排序', '按招收人数排序', '按发布时间排序'],
				filterIndex: 0,
				bgc1:'#D9D9D9',
				bgc2:'#D9D9D9',
				fontColor1:'#666666',
				fontColor2:'#666666',
				jobList: [
						  {
							title:'平面设计',
							salary:'6-8k',
							companyName:'职星星茶饮',
							companySize:'1000-9000人',
							tags:[ '本科', '包装设计', '广告设计'],
							recruiterAvatar:'/static/applicants-index/index/名企大厂.png',
							recruiterName:'徐女士',
							recruiterTime:'七日内发布',
							location:'福州 · 仓山区 · 八一路'
						  },
						  {
						  			title:'平面设计',
						  			salary:'6-8k',
						  			companyName:'职星星茶饮',
						  			companySize:'1000-9000人',
						  			tags:[ '本科', '包装设计', '广告设计'],
						  			recruiterAvatar:'/static/applicants-index/index/名企大厂.png',
						  			recruiterName:'徐女士',
						  			recruiterTime:'七日内发布',
									location:'福州 · 仓山区 · 八一路'
						  }
				]
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
.offerList {
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
.headerText {
	font-size: 36rpx;
	color: #FFFFFF;
	font-weight: bold;
	margin-left: 15rpx;
}
.search-icon {
	width: 48rpx;
	height: 48rpx;
}
.search-bar {
  display: flex;
  align-items: center;
  background-color: #fff;
  width: 51%;
  height: 66rpx;
  border-radius: 40rpx;
  padding: 10rpx 20rpx;
}
.placeholder {
	color: #AEAEAE;
}

.backIcon {
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
	/* 占据剩余页面 */
	flex-direction: column;
	flex: 1;

	border-radius: 20rpx;
	margin-top: 20rpx;
	padding: 0 0 15rpx 0;
	background-image: url('/static/applicant-mine/deliver/bgc.png'); /* 设置背景图像 */
	background-size: cover; /* 使背景图像覆盖整个元素 */
	background-repeat: no-repeat; /* 禁止背景图像重复 */
	background-position: center; /* 将背景图像居中 */
}
.job-list-selector {
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 20rpx;
  background-color: rgba(214, 238, 231, 0.42);
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
	background-image: linear-gradient( to bottom, rgba(157, 232, 211, 0.62), #F1FFF4);
	margin-top: 20rpx;
	border-bottom: 1rpx solid #eee;
	padding: 20rpx 30rpx;
	box-shadow: 0rpx 5rpx 10rpx 1rpx rgba(0, 0, 0, 0.3);
}

.job-item:last-child {
  border-bottom: none;
}

.job-info {
  display: flex;
  justify-content: space-between;
}

.jobTitle {
	margin-left: 20rpx;
	margin-top: 8rpx;
  font-size: 32rpx;
  color: #004934;
  font-weight: bold;
}
.companyInfo {
	font-size: 26rpx;
	color: #4D9681;
	margin-top: 15rpx;
}

.job-salary {
  font-size: 40rpx;
  color: #004934;
  font-weight: bold;
  text-shadow: 0rpx 0rpx 15rpx #FFFFFF;
}

.job-tags {
	margin-top: 20rpx;
	font-size: 12rpx;
	color: #5BA38E;
}

.job-tags text {
  background-color: #B9E3D7;
  padding: 4rpx 20rpx;
  height: 24rpx;
  margin-right: 10rpx;
  border-radius: 40rpx;
}

.recruiter-info {
	display: flex;
	margin-top: 25rpx;
}
.recruiter-info image {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  margin-right: 10rpx;
  vertical-align: middle;
}
.delete-btn {
	margin-left: 10%;
	font-size: 24rpx;
  text-align: center;
  color: #4D9681;
}
</style>
