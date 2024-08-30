"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {
    backPage() {
      common_vendor.index.navigateBack({
        delta: 1
        // 返回的页面数
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.backPage && $options.backPage(...args)),
    b: _ctx.phone,
    c: common_vendor.o(($event) => _ctx.phone = $event.detail.value),
    d: _ctx.code,
    e: common_vendor.o(($event) => _ctx.code = $event.detail.value),
    f: common_vendor.t(_ctx.cooldown > 0 ? `${_ctx.cooldown}s后重新发送` : "获取验证码"),
    g: common_vendor.o((...args) => _ctx.sendCode && _ctx.sendCode(...args)),
    h: _ctx.cooldown > 0,
    i: _ctx.passwordVisible ? "password" : "text",
    j: _ctx.password,
    k: common_vendor.o(($event) => _ctx.password = $event.detail.value),
    l: _ctx.passwordVisible ? "../../static/login/eyeOff.png" : "../../static/login/eyeOn.png",
    m: common_vendor.o((...args) => _ctx.togglePasswordVisibility && _ctx.togglePasswordVisibility(...args)),
    n: common_vendor.o((...args) => _ctx.login && _ctx.login(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/我的桌面/projects/CareerStar/pages/login/register.vue"]]);
wx.createPage(MiniProgramPage);
