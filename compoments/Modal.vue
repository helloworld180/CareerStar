
复制代码
<template>
  <view class="modal-backdrop" @click="close">
    <!-- 点击背景关闭弹窗 -->
    <view class="flex-col section_2 pos" @click.stop>
      <!-- 弹窗内容 -->
      <text class="self-center text_5">错误</text>
      <view class="flex-col self-stretch mt-23">
        <!-- 动态显示传递过来的消息 -->
        <text class="self-center text_7">{{ message }}</text>
        <view class="self-stretch divider"></view>
        <text class="self-center text_8" @click="close">确定</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "Modal",
  props: {
    message: {
      type: String,
      required: true
    }
  },
  methods: {
    close() {
      this.$emit('close'); // 触发关闭事件
    }
  }
};
</script>
<style scoped>
/* 弹窗背景样式 */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明背景 */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 其他样式保持不变 */
.mt-23 {
  margin-top: 2.725vh;
}
.section_2 {
  padding: 1.659vh 0;
  background-image: linear-gradient(180deg, #f0fff3 -63.6%, #b8e3d7 160.8%);
  border-radius: 0.948vh;
  width: 33.886vh;
  position: relative; /* 相对定位，以保持居中 */
}
.pos {
  position: absolute;
  left: 50%;
  top: 35%;
  transform: translateX(-50%);
}
.text_5 {
  color: #004833;
  font-size: 2.37vh;
  font-family: Inter;
  font-weight: 600;
  line-height: 2.23vh;
}
.text_7 {
  color: #5ba28e;
  font-size: 1.896vh;
  font-family: Inter;
  line-height: 1.756vh;
}
.divider {
  margin-top: 2.844vh;
  background-color: #5ba28e;
  height: 0.118vh;
}
.text_8 {
  margin-top: 2.133vh;
  color: #00a172;
  font-size: 1.896vh;
  font-family: Roboto;
  font-weight: 600;
  line-height: 1.794vh;
}
</style>
