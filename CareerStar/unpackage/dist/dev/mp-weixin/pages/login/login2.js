"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      passwordVisible: "false",
      loginType: "code",
      phone: "",
      code: "",
      password: "",
      cooldown: 0
    };
  },
  methods: {
    // 返回上一页
    backPage() {
      common_vendor.index.navigateBack({
        delta: 1
        // 返回的页面数
      });
    },
    // 是否显示密码
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    switchLoginType(type) {
      this.loginType = type;
    },
    sendCode() {
      if (this.cooldown > 0)
        return;
      console.log("发送验证码到", this.phone);
      this.cooldown = 60;
      this.startCooldown();
    },
    startCooldown() {
      if (this.cooldown > 0) {
        setTimeout(() => {
          this.cooldown--;
          this.startCooldown();
        }, 1e3);
      }
    },
    login() {
      if (this.loginType === "code") {
        console.log("验证码登录", this.phone, this.code);
      } else {
        console.log("密码登录", this.phone, this.password);
      }
    },
    // 去注册页
    gotoRegister() {
      common_vendor.index.navigateTo({
        url: "/pages/login/register"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.backPage && $options.backPage(...args)),
    b: $data.loginType === "code" ? 1 : "",
    c: common_vendor.o(($event) => $options.switchLoginType("code")),
    d: $data.loginType === "password" ? 1 : "",
    e: common_vendor.o(($event) => $options.switchLoginType("password")),
    f: $data.loginType === "code"
  }, $data.loginType === "code" ? {
    g: $data.phone,
    h: common_vendor.o(($event) => $data.phone = $event.detail.value),
    i: $data.code,
    j: common_vendor.o(($event) => $data.code = $event.detail.value),
    k: common_vendor.t($data.cooldown > 0 ? `${$data.cooldown}s后重新发送` : "获取验证码"),
    l: common_vendor.o((...args) => $options.sendCode && $options.sendCode(...args)),
    m: $data.cooldown > 0,
    n: common_vendor.o((...args) => $options.login && $options.login(...args))
  } : {
    o: $data.phone,
    p: common_vendor.o(($event) => $data.phone = $event.detail.value),
    q: $data.passwordVisible ? "password" : "text",
    r: $data.password,
    s: common_vendor.o(($event) => $data.password = $event.detail.value),
    t: $data.passwordVisible ? "../../static/login/eyeOff.png" : "../../static/login/eyeOn.png",
    v: common_vendor.o((...args) => $options.togglePasswordVisibility && $options.togglePasswordVisibility(...args)),
    w: common_vendor.o((...args) => $options.login && $options.login(...args))
  }, {
    x: common_vendor.o((...args) => $options.gotoRegister && $options.gotoRegister(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/我的桌面/projects/CareerStar/pages/login/login2.vue"]]);
wx.createPage(MiniProgramPage);
