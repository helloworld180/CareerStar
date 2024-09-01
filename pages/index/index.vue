<template>
<view class="flex-col page">
  <view class="flex-col justify-start items-end"><view class="group_2"></view></view>
  <view class="flex-col justify-start relative group_3 mt-69">
    <view class="section"></view>
   
   <!-- 应用淡入效果的图片 -->
   <image
     class="image_5 pos_2 fade-in"
     src="https://ide.code.fun/api/image?token=66d2c97d0412d90011fc4a95&name=36de55e1d296bcb569b5025b5cb3fdaa.png"
   />
    <image
      class="image_4 pos"
      src="https://ide.code.fun/api/image?token=66d2c97d0412d90011fc4a95&name=c604d340bea940c3fede854e3f67fac8.png"
    />
    <image
      class="image_6 pos_3"
      src="https://ide.code.fun/api/image?token=66d2c97d0412d90011fc4a95&name=976edcad48353e7774ef7081ac2c9067.png"
    />
  </view>
</view>
</template>
<script>
export default {
  mounted() {
    // 设置定时器，2秒后跳转到登录页面
    setTimeout(() => {
      // 跳转到登录页面
      uni.navigateTo({
        url: '/pages/login/login2' ,// 替换为你的登录页面路径
		animationType:'pop-in'
      });
    }, 4000);
	
	
	
  }
};
</script>
<style scoped lang="css">
.mt-69 {
  margin-top: 8.175vh;
}

 /* 定义淡入动画 */
  @keyframes fadeIn {
    from {
      opacity: 0; /* 开始时完全透明 */
    }
    to {
      opacity: 1; /* 结束时完全不透明 */
    }
  }

  .fade-in {
    animation: fadeIn 3s ease-in-out forwards; /* 2秒淡入效果 */
  }
.page {
  padding-top: 2.15vh;
  background-image: linear-gradient(180deg, #69b29d -19%);
  background-color: #69b29d;
  border-radius: 3.555vh;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}
.group_2 {
  margin-right: 3.91vh;
  width: 6.872vh;
  height: 1.896vh;
}
.group_3 {
  padding-top: 28.673vh;
}
.section {
  background-image: url('https://ide.code.fun/api/image?token=66d2c97d0412d90011fc4a95&name=845c0fa2e277f2c6a68799be4ef2083c.png');
  background-size: 100% 100%;
  height: 59.024vh;
}
.image_5 {
  width: 100vw;
  height: 140.2564vw;
}
.pos_2 {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
.image_4 {
  width: 98.9744vw;
  height: 100vw;
}
.pos {
  position: absolute;
  left: 0.493vh;
  right: 0;
  top: 0;
}
.image_6 {
  width: 5.332vh;
  height: 9.834vh;
}
.pos_3 {
  position: absolute;
  left: 0;
  bottom: 31.986vh;
}
</style>