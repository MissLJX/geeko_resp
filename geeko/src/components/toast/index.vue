<template>
  <transition name="fade" v-if="isShow">
    <!-- //success warn err default -->
    <div
      class="tip-box"
      :class="{
        success: type == 'success',
        warn: type == 'warn',
        err: type == 'err',
        default: type == 'default',
        customization : type == 'customization'
      }"
      v-if="isShow"
      :style="style1"
    >
      <div class="tip-box-content">
          <span class="iconfont" style="font-size:21px;color:#20b759;margin-right:5px;" v-if="!!style1">&#xe6b7;</span>
          <span>{{ content }}</span>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "tip",
  props: {
    content: {
      //消息内容
      type: String,
      default: "",
    },
    type: {
      //显示类型  success warn err default
      type: String,
      default: "default", //success warn err default
    },
    timer: {
      //显示时间
      type: Number,
      default: 5000,
    },
    style1:{
        type:Object,
        default:null
    }
  },
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    show() {
      //组件显示方法
      this.isShow = true;
      setTimeout(this.hide, this.timer);
    },
    hide() {
      //组件隐藏方法
      this.isShow = false;
      this.remove(); //当被挂载在create.js上是，this.remove()即执行comp.remove()，即从body上移除掉挂载的真实dom，并销毁虚拟dom
    },
  },
};
</script>
<style lang="scss" scoped>
.tip-box {
  position: fixed;
  left: 50%;
  bottom: -100%;
  font-size: 14px;
  border-radius: 10px;
  text-align: center;
  z-index: 9999;
  color: #fff;
  padding: 10px 15px;
  background-color: rgba(34, 34, 34, 0.8);
  border-radius: 4px;
  transition: top .8s;
  transform: translateX(-50%);
  border-radius: 4px;
  .tip-box-content {
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.success {
  background: #67c23a;
  bottom: 130px;
}
.warn {
  background: #e6a23c;
  bottom: 130px;
}
.err {
  background: #e24747;
  bottom: 130px;
}
.default {
  background: #909399;
  bottom: 130px;
}

.customization{
  background-color: rgba(34, 34, 34, 0.8);
	bottom: 130px;
}
</style>
