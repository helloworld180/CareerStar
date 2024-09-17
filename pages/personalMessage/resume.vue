<template>
  <view class="resume">
    <view class="header">
      <image src="../../static/bacePage.png" class="back-icon" @click="backPage"></image>
      <text>生成简历</text>
    </view>
    
    <view class="content">
      <view v-for="(section, index) in sections" :key="index" class="section"><!-- :style="{ backgroundColor:{{ section.backgroundColor }}} -->
        <view class="section-header">{{ section.title }}</view>
        <view class="section-content">
          <view v-for="(item, itemIndex) in section.items" :key="itemIndex" class="info-item">
            <text class="item-label">{{ item.label }}</text>
            <input v-if="item.type === 'input'" v-model="item.value" class="item-input" :placeholder="'请输入' + item.label" placeholder-class="placeholder"/>
            <!-- 毕业时间日期选择器 -->
			<!-- <picker v-else="item.type === 'date'" mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange" class="item-picker">
              <view class="picker-value">{{ date }}</view>
            </picker> -->
			<!-- 性别/城市选择器 -->
			<picker v-else="item.type === 'picker'" :range="item.options" @change="(e) => onPickerChange(e, index, itemIndex)" class="item-picker">
              <view class="picker-value">{{ item.value || '请选择' }}</view>
            </picker>
          </view>
        </view>
      </view>
    </view>
    
    <button class="submit-btn" @click="submitResume">确认生成</button>
    
  </view>
</template>

<script>
export default {
  data() {
	  const currentDate = this.getDate({
	              format: true
	          })
    return {
		date: currentDate,
      sections: [
        {
          title: '基本信息',
		  backgroundColor: '#72BBA6',
          items: [
            { label: '姓名', value: '', type: 'input' },
            { label: '性别', value: '', type: 'picker', options: ['男', '女'] },
            { label: '年龄', value: '', type: 'input' },
            { label: '学历', value: '', type: 'input' },
            { label: '毕业院校', value: '', type: 'input' },
            { label: '联系电话', value: '', type: 'input' },
            { label: '邮箱', value: '', type: 'input' },
          ]
        },
        {
          title: '求职意向',
		  backgroundColor: '#56A991',
          items: [
            { label: '职位', value: '', type: 'input' },
            { label: '城市', value: '', type: 'picker', options: ['上海', '北京', '广州', '深圳'] },
            { label: '期望薪资', value: '', type: 'input' },
          ]
        },
        {
          title: '教育背景',
		  backgroundColor: '#489C84',
          items: [
            { label: '毕业时间', value: '', type: 'input' },
            { label: '专业', value: '', type: 'input' },
            { label: '专业成绩', value: '', type: 'input' },
            { label: '主修课程', value: '', type: 'input' },
          ]
        },
    //     {
    //       title: '个人特长',
		  // backgroundColor: '#458D78',
		  // largeInput: true,
    //       items: [
    //         { label: '特长描述', value: '', type: 'input' , placeholder: '点击此处进行填写' },
    //       ]
    //     },
    //     {
    //       title: '工作经历',
		  // backgroundColor: '#2F7D67',
		  // largeInput: true,
    //       items: [
    //         { label: '工作经历描述', value: '', type: 'input', placeholder: '点击此处进行填写' },
    //       ]
    //     },
      ],
    }
  },
  computed: {
          startDate() {
              return this.getDate('start');
          },
          endDate() {
              return this.getDate('end');
          }
      },
  methods: {
	bindDateChange: function(e) {
	    this.date = e.detail.value
	},
	getDate(type) {
	            const date = new Date();
	            let year = date.getFullYear();
	            let month = date.getMonth() + 1;
	            let day = date.getDate();
	
	            if (type === 'start') {
	                year = year - 60;
	            } else if (type === 'end') {
	                year = year + 2;
	            }
	            month = month > 9 ? month : '0' + month;
	            day = day > 9 ? day : '0' + day;
	            return `${year}-${month}-${day}`;
	},
    backPage() {
      uni.navigateBack({ delta: 1 })
    },
    onPickerChange(e, sectionIndex, itemIndex) {
      this.sections[sectionIndex].items[itemIndex].value = this.sections[sectionIndex].items[itemIndex].options[e.detail.value]
    },
    submitResume() {
      // 实现提交逻辑
	  uni.request({
	  	url:'',
		method:'POST',
		success:function(res){
			console.log(res.data)
			uni.navigateTo({
				url:'/pages/personalMessage/makeResume'
			})
		}
	  })
    }
  }
}
</script>

<style scoped>
.resume {
  padding: 60rpx 30rpx 0 30rpx;
  background-color: #69B29D;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
}

.back-icon {
  width: 48rpx;
  height: 48rpx;
}

.header text {
  color: #fff;
  font-size: 36rpx;
  font-weight: bold;
  margin-left: 33%;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.section {
  background-color: #7FCBB3;
  border-radius: 20rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
}

.section-header {
  font-size: 26rpx;
  color: #fff;
  margin-bottom: 15rpx;
  font-weight: bold;
  padding-left: 10rpx;
}

.section-content {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 15rpx;
  padding: 15rpx;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10rpx;
}

.item-label {
  font-size: 24rpx;
  color: #004934;
  font-weight: bold;
  width: 30%;
}

.item-input, .item-picker {
  width: 70%;
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 10rpx;
  padding: 10rpx;
  
  color: #004934;
  font-size: 28rpx;
}

.placeholder {
  color: rgba(0, 73, 52, 0.73);
}

.picker-value {
  color: #004934;
  font-size: 28rpx;
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