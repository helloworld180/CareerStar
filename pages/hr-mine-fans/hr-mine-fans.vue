<template>
  <view class="follow-page">
    <!-- header -->
    <view class="header">
    	<view style="display: flex; align-items: center;">
    		<view class="backIcon" @click="backPage">
    			<image src="../../static/hr-mine/receive/backPage.png" style="width: 48rpx; height: 48rpx;"></image>
    		</view>
    		<!-- text -->
    		<view class="headerText">粉丝</view>
    	</view>
    	<!-- 顶部搜索栏 -->
    	<view class="search-bar">
    		<view class="search-icon">
    			<image src="../../static/applicants-index/index/search.png" style="width: 48rpx; height: 48rpx;"></image>
    		</view>
    	  <view class="search-input">
    		<input type="text" placeholder="搜索我的粉丝" placeholder-class="placeholder"/>
    	  </view>
    	</view>
    </view>

	<view class="remain">
		<!-- 粉丝列表头部 -->
		<view class="follow-header">
			<view class="follow-count">我的粉丝 ({{ followCount }})</view>
			<view class="sort-btn" @tap="showSortOptions">
				{{ currentSort }}
				<image src="../../static/hr-mine/attention/sort.png" style="width: 34rpx; height: 34rpx; margin-left: 10rpx;"></image>
			</view>
		</view>

		<!-- 粉丝列表 -->
		<scroll-view scroll-y class="follow-list" @scrolltolower="loadMore" @refresherrefresh="onRefresh":refresher-enabled="true":refresher-triggered="isRefreshing">
			<view v-for="(item, index) in followList" :key="item.id" class="follow-item":class="{ 'top': item.isTop }">
				<image :src="item.avatar" class="avatar"></image>
				<view class="info">
					<view class="name">{{ item.name }} · {{ item.identity }}</view>
					<view class="description">{{ item.description }}</view>
				</view>
				<view class="action-btn" :class="{ 'mutual': item.isMutual }" @tap="showUnfollowConfirm">
					{{ item.isMutual ? '互相关注' : '已关注' }}
				</view>
			</view>
		</scroll-view>
	</view>
		
    <!-- 排序选项弹窗 -->
    <uni-popup ref="sortPopup" type="bottom">
		<view class="sort-options">
			<view
			  v-for="option in sortOptions"
			  :key="option.value"
			  class="sort-option"
			  @tap="selectSort(option)"
			>
				{{ option.label }}
			</view>
		</view>
    </uni-popup>

    <!-- 取消关注确认弹窗 -->
    <uni-popup ref="unfollowPopup" type="center">
      <view class="unfollow-popup">
        <view class="title">确认不再关注？</view>
        <view class="unfollow-btn-group">
          <button @tap="cancelUnfollow">取消</button>
          <button @tap="confirmUnfollow" class="confirm">确认</button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      followCount: 0,
      currentSort: '综合排序',
      sortOptions: [
			{ label: '综合排序', value: 'comprehensive' },
			{ label: '最近关注', value: 'recent' },
			{ label: '最早关注', value: 'earliest' }
      ],
      followList: [
		  {
			  id:'',
			  isTop:false,
			  avatar:'/static/offer.png',
			  name:'徐女士',
			  identity:'HR',
			  description:'女 · 本科应届生 · 24',
			  isMutual: false,
		  },
		  {
			  id:'',
			  isTop:false,
			  avatar:'/static/offer.png',
			  name:'曾女士',
			  identity:'求职者',
			  description:'女 · 本科应届生 · 24',
			  isMutual: true,
		  }
	  ],
      currentUser: null,
      newRemark: '',
      isRefreshing: false,
      page: 1,
      pageSize: 20,
	  token:'',
    }
  },
  onLoad() {
    // this.fetchFollowList()
  },
  methods: {
    backPage() {
		uni.navigateBack({
		  delta: 1
		});
    },
    async fetchFollowList(refresh = false) {
      try {
        if (refresh) {
          this.page = 1
        }
        const res = await uni.request({
          url: 'your_api_url/follow-list',
          method: 'GET',
          data: {
            page: this.page,
            pageSize: this.pageSize,
            sort: this.currentSort
          }
        })
        if (refresh) {
          this.followList = res.data.list
        } else {
          this.followList = [...this.followList, ...res.data.list]
        }
        this.followCount = res.data.count
        this.page++
      } catch (error) {
        console.error('获取粉丝列表失败', error)
        uni.showToast({
          title: '获取粉丝列表失败',
          icon: 'none'
        })
      }
    },
    showSortOptions() {
      this.$refs.sortPopup.open()
    },
    async selectSort(option) {
      this.currentSort = option.label
      this.$refs.sortPopup.close()
      await this.fetchFollowList(true)
    },
	// 确认不再关注的函数
    showUnfollowConfirm() {
      this.$refs.unfollowPopup.open()
    },
    async confirmUnfollow() {
      try {
        await uni.request({
          url: `your_api_url/unfollow/${this.currentUser.id}`,
          method: 'POST'
        })
        this.followList = this.followList.filter(item => item.id !== this.currentUser.id)
        this.followCount--
        this.$refs.unfollowPopup.close()
      } catch (error) {
        console.error('取消关注失败', error)
        uni.showToast({
          title: '取消关注失败',
          icon: 'none'
        })
      }
    },
    cancelUnfollow() {
      this.$refs.unfollowPopup.close()
    },
    async onRefresh() {
      this.isRefreshing = true
      await this.fetchFollowList(true)
      this.isRefreshing = false
    },
    async loadMore() {
      await this.fetchFollowList()
    }
  }
}
</script>

<style>
.follow-page {
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
	margin-left: 30rpx;
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

.follow-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20rpx;
  padding: 20rpx 40rpx;
  background-color: rgba(238, 242, 248, 1);
}

.follow-count {
  font-size: 32rpx;
  color: #001549;
  font-weight: bold;
}

.sort-btn {
  display: flex;
  align-items: center;
  font-size: 24rpx;
  color: #6998B2;
}

.follow-list {
  height: calc(100vh - 120px);
}

.follow-item {
  display: flex;
  align-items: center;
  padding: 20rpx;
  padding-right: 40rp;
  border-bottom: 2rpx solid #f0f2f5;
}

.avatar {
  width: 90rpx;
  height: 90rpx;
  border-radius: 50%;
  margin-right: 25rpx;
}

.info {
  flex: 1;
}

.name {
  font-size: 28rpx;
  font-weight: bold;
}

.description {
  font-size: 22rpx;
  color: #666666;
  margin-top: 10rpx;
}

.action-btn {
  padding: 5rpx 20rpx;
  border-radius: 40rpx;
  font-size: 24rpx;
  border: 2rpx solid #AEAEAE;
}

.sort-options {
  background-color: #f0f0f0;
  padding: 40rpx 40rpx 100rpx 40rpx;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.sort-option {
  padding: 20rpx 30rpx;
  font-size: 28rpx;
  border-radius: 16rpx;
  border-bottom: 2rpx solid #f0f2f5;
}

/* 确认不再粉丝提示窗 */
.unfollow-popup {
	display: flex;
	flex-direction: column;
	background-color: #fff;
	border-radius: 30rpx;
	padding-top: 40rpx;
	padding-bottom: 20rpx;
}
.unfollow-popup .title {
	font-size: 28rpx;
	font-weight: bold;
	margin: 0 100rpx 30rpx 100rpx;
	text-align: center;
}
.unfollow-btn-group {
	display: flex;
	justify-content: space-between;
	border-top: 2rpx solid #D9D9D9;
	padding-top: 15rpx;
}
.unfollow-btn-group button {
  flex: 1;
  background-color: transparent;
  font-size: 24rpx;
}
button::after{ border: none;} 
.unfollow-btn-group .confirm {
  color: #004934;
  border-left: 2rpx solid #D9D9D9;
  border-radius: 0;
}

</style>