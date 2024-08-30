"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "Hello",
      time: 2
    };
  },
  onLoad() {
    var _this = this;
    setInterval(function() {
      _this.time--;
      if (_this.time == 0) {
        common_vendor.index.navigateTo({
          url: "/pages/login/login2"
        });
      }
    }, 1e3);
  },
  methods: {
    nextPage() {
      common_vendor.index.navigateTo({
        url: "/pages/login/login2"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.nextPage && $options.nextPage(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/我的桌面/projects/CareerStar/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
