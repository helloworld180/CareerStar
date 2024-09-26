<template>
	<view class="offerList">
		<!-- header -->
		<view class="header">
			<view style="display: flex; align-items: center;">
				<view class="backIcon" @click="backPage">
					<image src="../../static/hr-mine/receive/backPage.png" style="width: 48rpx; height: 48rpx;"></image>
				</view>
				<!-- text -->
				<view class="headerText">浏览记录</view>
				<image src="../../static/applicant-mine/view/rubbish.png" style="width: 48rpx; height: 48rpx; margin-left: 10rpx;" @tap="deleteAll"></image>
			</view>
			
			<!-- 顶部搜索栏 -->
			<view class="search-bar">
				<view class="search-icon">
					<image src="../../static/applicants-index/index/search.png" style="width: 48rpx; height: 48rpx;"></image>
				</view>
			  <view class="search-input">
				<input type="text" placeholder="搜索你的浏览记录" placeholder-class="placeholder"/>
			  </view>
			</view>
			 
		</view>
		
		
		<!-- remain -->
		<view class="remain">
			<!-- 职位列表选择器 -->
			<view class="job-list-selector">
			  <view class="selector-item" :class="{ active: currentSelector === 'resume' }" @click="changeSelector('resume')">简历</view>
			  <view class="selector-item" :class="{ active: currentSelector === 'post' }" @click="changeSelector('post')">帖子</view>
			  
			</view>
			
			<!-- 简历列表 -->
			<view class="job-list" v-if="currentSelector === 'resume'">
				<view class="job-item" v-for="(job, index) in jobList" :key="index">
					<!-- 第一列 -->
					<view>
						<!--  第一行 --> 
						<view class="job-info">
							<view style="width: 40rpx; height: 40rpx; border-radius: 50%; background-color: #edf3f4; box-shadow: inset 0 3rpx 6rpx 1rpx rgba(0, 0, 0, 0.3);"></view>
							<view class="jobTitle">求职：{{ job.title }}</view>	
						</view>
						<!-- 第二行 求职者情况 -->
						<view class="applyInfo">
							<text>{{ job.applySex }}</text>
							<text style="margin-left: 15rpx;">{{ job.applyAge }}</text>
							<text style="margin-left: 15rpx;">{{ job.applySchool }}</text>
							<text style="margin-left: 15rpx;">{{ job.applyMaster }}</text>
						</view>
						<!-- 第三行 tag -->
						<view class="job-tags">
							<text v-for="(tag, tagIndex) in job.tags" :key="tagIndex">{{ tag }}</text>
						</view>
						<!-- 第四行 HR -->
						<view class="recruiter-info">
							<image :src="job.recruiterAvatar" mode="aspectFill"></image>
							<view style="margin-left: 20rpx;">
								<view style="font-size: 28rpx; color: #001549; font-weight: bold;">{{ job.recruiterName }} · 求职</view>
								
								<view style="font-size: 24rpx; color: #4D6A96; margin-top: 5rpx;">{{ job.recruiterTime }}</view>
							</view>
						</view>
					</view>
					
					<!-- 第二列 -->
					<view style="width: 2rpx; background-color: #B9E3D7; margin-left: 5rpx;"></view>
					
					<!-- 第三列 -->
					<view style="margin-left: 25rpx;">
						<!-- 第一行 -->
						<view style="color: #001549; font-size: 28rpx; font-weight: bold; margin-top: 20rpx;">求职意向</view>
						<!-- 第二行 -->
						<view style="color: #001549; font-size: 28rpx; font-weight: bold; margin-top: 15rpx;">
							<view>意向薪资：{{ job.wantSalary }}</view>
							<view>意向城市：{{ job.wantCity }}</view>
						</view>
						<!-- 第三行 -->
						<view style="display: flex; margin-top: 70rpx; margin-left: 35rpx;">
							<view style="font-size: 24rpx; color: #4D6A96;">{{ job.location }}</view>
							<view class="delete-btn" @click="deleteJobList(index)">X</view>
						</view>
					</view>
					
				</view>
			</view>
		
			<!-- 帖子列表 -->
			<view class="job-list" v-else-if="currentSelector === 'post'">
				<view class="post-card" v-for="(post, index) in postList" :key="index">
					
					<view class="user-info">
						<image class="avatar" :src="post.avatarUrl" mode="aspectFill"></image>
						<view class="name-time">
							<text class="username">{{ post.username }} · 求职者</text>
							<text class="post-time">发布于{{ post.postTime }}</text>
						</view>
						<view class="close-btn" @tap="closePost(index)">×</view>
					</view>
					
					<view class="post-content">
						<text class="title">{{ post.title }}</text>
						<text class="content">{{ truncatedContent(post.content) }}</text>
					</view>
					
					<view class="post-detail">
						<text>查看详情</text>
					</view>
					
				</view>
			</view>
					
			<!-- 招聘信息提示窗 -->
			<uni-popup ref="alertDialog" type="dialog" style="display: flex; flex-direction: column;">
				<uni-popup-dialog :type="msgType" cancelText="取消" confirmText="确认" content="确认删除浏览记录？" @confirm="recruitConfirm"
					@close="recruitClose"></uni-popup-dialog>
			</uni-popup>
			
			<!-- 帖子提示窗 -->
			<uni-popup ref="alertPost" type="dialog" style="display: flex; flex-direction: column;">
				<uni-popup-dialog :type="msgType" cancelText="取消" confirmText="确认" content="确认删除浏览记录？" @confirm="postConfirm"
					@close="postClose"></uni-popup-dialog>
			</uni-popup>
			
			<!-- 全部删除提示窗 -->
			<uni-popup ref="alertDelete" type="dialog" style="display: flex; flex-direction: column;">
				<uni-popup-dialog :type="msgType" cancelText="取消" confirmText="确认" content="确认清空浏览记录？" @confirm="deleteConfirm"
					@close="deleteClose"></uni-popup-dialog>
			</uni-popup>
		
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentSelector: 'resume',
				jobList: [
						  {
							title:'平面设计',
							salary:'6-8k',
							applySex:'女',
							applyAge:'24岁',
							applySchool:'福州大学',
							applyMaster:'工商管理专业',
							tags:[ '本科', '包装设计', '广告设计'],
							wantSalary:'8-9k',
							wantCity:'福州',
							recruiterAvatar:'/static/offer.png',
							recruiterName:'徐女士',
							recruiterTime:'七日内发布',
							location:'福州 · 仓山区'
						  },
						  {
						  			title:'平面设计',
						  			salary:'6-8k',
						  			applySex:'女',
						  			applyAge:'24岁',
									applySchool:'福州大学',
									applyMaster:'工商管理专业',
						  			tags:[ '本科', '包装设计', '广告设计'],
									wantSalary:'8-9k',
									wantCity:'福州',
						  			recruiterAvatar:'/static/offer.png',
						  			recruiterName:'徐女士',
						  			recruiterTime:'七日内发布',
									location:'福州 · 仓山区'
						  }
				],
				token:'',
				postList:[
					{
						avatarUrl:'/static/offer.png',
						username:'曾女士',
						postTime:'9:20',
						title:'这是一个小标题',
						likes: 0,
						content:'收到后返回为oh端午活动后i为hi都和我二手动触发到i哈佛导师符号底河湿地和hi哦好i很多覅后卫和覅oh为哈佛i为',
					},
					{
						avatarUrl:'/static/offer.png',
						username:'徐女士',
						postTime:'9:20',
						title:'这是一个小标题',
						likes: 0,
						content:'收到后返回为oh端午活动后i为hi都和我二手动触发到i哈佛导师符号底河湿地和hi哦好i很多覅后卫和覅oh为哈佛i为',
					},
				],
				index: 0,
				indexPost: 0,
			}
		},
		onLoad() {
		  this.fetchRecommendations()
		  this.fetchJobs()
		},
		computed: {
		    truncatedContent(content) {
		      return (content)=>content.length > 50 ? content.slice(0, 50) + '...' : content
		    },
		    likeIconSrc() {
		      return this.isLiked ? '/static/icons/heart-filled.png' : '/static/icons/heart-outline.png'
		    }
		  },
		created() {
		    // this.fetchPostData()
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
			uni.request({
				url:'',
				header: {
				    'Authorization': `Bearer ${this.token}`,
				},
			})
		  },
		  async fetchJobs() {
		    // 从后端获取职位列表
		    // const response = await this.$api.getJobs(this.currentSelector)
		    // this.jobList = response.data
			uni.request({
				url:'',
				header: {
				    'Authorization': `Bearer ${this.token}`,
				},
			})
		  },
		  // 取消招聘信息收藏的函数
		  deleteJobList(index) {
		  			  this.$refs.alertDialog.open()
		  			  this.index = index;
		    // 可以在这里调用后端接口，同步删除操作
		  },
		  recruitConfirm() {
		  				console.log('点击确认')
		  				this.jobList.splice(this.index, 1)
		  			},
		  			recruitClose() {
		  				console.log('点击关闭')
		  			},
		  			
		  changeSelector(selector) {
		    this.currentSelector = selector
		    this.fetchJobs()
		  },
		  // 帖子的函数
		  async fetchPostData() {
		        try {
		          const res = await uni.request({
		            url: `your_api_url/posts/${this.postId}`,
		            method: 'GET'
		          })
		          this.postList = res.data
		          this.isLiked = this.postList.isLikedByUser // 假设后端返回用户是否已点赞的信息
		        } catch (error) {
		          console.error('获取帖子数据失败', error)
		        }
		  },
		  
			// 取消帖子收藏的函数
			closePost(index) {
				// 后端删除该帖子
				this.$refs.alertPost.open()
				this.indexPost = index;
			},
			postConfirm() {
				console.log('点击确认')
				this.postList.splice(this.indexPost, 1)
			},
			postClose() {
				console.log('点击关闭')
			},
			
			// 删除所有浏览记录
			deleteAll() {
			  this.$refs.alertDelete.open()
			},
			deleteConfirm() {
			  console.log('点击确认')
			  if (this.currentSelector === 'resume') {
				  this.jobList = []
				  // 传给后端
				  
			  }else if (this.currentSelector === 'post') {
				  this.postList = []
				  // 传给后端
				  
			  }
			},
			deleteClose() {
				console.log('点击关闭')
			},
			
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
	
	background-color: #6998B2;
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
	margin-left: 25rpx;
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
  background-color: rgba(214, 224, 238, 0.42);
}

.selector-item {
	font-size: 32rpx;
	color: #B3B3B3;
	font-weight: bold;
	padding: 10rpx 0rpx;
	border-bottom: 6rpx solid transparent;
}

.selector-item.active {
  color: #000849;
  border-bottom-color: #4D6A96;
}
	
.job-list {
  padding: 0 15rpx;
}

.job-item {
	display: flex;
	height: auto;
	border-radius: 40rpx;
	background-image: linear-gradient( to bottom, rgba(157, 214, 232, 0.62), #F1F9FF);
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
}

.jobTitle {
	margin-left: 20rpx;
	margin-top: 8rpx;
	font-size: 32rpx;
	color: #001549;
	font-weight: bold;
}
.applyInfo {
	font-size: 26rpx;
	color: #4D6A96;
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
	color: #4D6A96;
}

.job-tags text {
  background-color: #BBDAFF;
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
  color: #4D6A96;
}
/* 帖子的样式 */
.post-card {
  height: auto;
  border-radius: 40rpx;
  margin-top: 20rpx;
  border-bottom: 1rpx solid #eee;
  padding: 20rpx 30rpx;
  box-shadow: 0rpx 5rpx 10rpx 1rpx rgba(0, 0, 0, 0.3);
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 10rpx;
}

.avatar {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.name-time {
  flex: 1;
}

.username {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
}

.post-time {
  font-size: 22rpx;
  color: #707070;
  margin-left: 40rpx;
}

.post-content {
  margin-bottom: 10rpx;
}

.title {
  font-size: 32rpx;
  color: #333;
  line-height: 2;
}

.content {
  font-size: 26rpx;
  color: #707070;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.post-detail {
	display: flex;
	justify-content: flex-end;
	font-size: 26rpx;
	color: #6998B2;
}
</style>
