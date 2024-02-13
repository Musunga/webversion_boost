<template>
  <div class="popup" @touchmove.prevent>
    <!-- 遮罩层动画 -->
    <div class="popup-mask" @click="onClose" v-show="currentValue"></div>
    <!-- <input style="display:none" v-model="currentValue"> -->
    <!-- 显示信息层 -->
    <transition :name="dialogTransition">
      <div class="popup-warp" :class="dialogTransition" v-show="currentValue">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    // 是否显示
    value: {
      type: Boolean,
      default: false
    },
    // 弹窗动画
    dialogTransition: {
      type: String,
      default: 'slide-up'
    },
    // 点击遮罩层关闭弹窗
    hideOnBlur: {
      default: function () {
        return true
      }
    },
    // 禁止页面滚动
    scroll: {
      type: Boolean,
      default: true
    }
  },
  created () {
    if (typeof this.value !== 'undefined') {
      this.currentValue = this.value
    }
  },
  watch: {
    value (val) {
      this.currentValue = val
    },
    currentValue (val) {
      this.$emit(val ? 'on-show' : 'on-hide')
      this.$emit('input', val)
    }
  },
  data () {
    return {
      // 传进来的值
      currentValue: false
    }
  },
  methods: {
    onClose () {
      if (this.hideOnBlur) {
        this.currentValue = false
      }
    }
  }
}
</script>

<style lang="less">
/*遮罩层*/
.popup-mask {
  position: fixed;
  z-index: 899;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}
.popup-warp {
  position: absolute;
  max-width: 100%;
  max-height: 100%;
  background: #ffffff;
  z-index: 900;
}
.slide-up {
  bottom: 0px;
  left: 0px;
  min-width: 100%;
  min-height: 50px;
  transform: translateY(0%);
}
.slide-up-enter-active {
  transition: all 0.3s ease;
}
.slide-up-leave-active {
  transition: all 0.3s ease;
}
.slide-up-enter,
.slide-up-leave-active {
  transform: translateY(100%);
  opacity: 0;
}
.slide-down {
  top: 0px;
  left: 0px;
  min-width: 100%;
  min-height: 50px;
  transform: translateY(0%);
}
.slide-down-enter-active {
  transition: all 0.3s ease;
}
.slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter,
.slide-down-leave-active {
  transform: translateY(-100%);
  opacity: 0;
}
.slide-left {
  top: 0px;
  left: 0px;
  min-width: 50px;
  min-height: 100%;
  transform: translateX(0%);
}
.slide-left-enter-active {
  transition: all 0.3s ease;
}
.slide-left-leave-active {
  transition: all 0.3s ease;
}
.slide-left-enter,
.slide-left-leave-active {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-right {
  top: 0px;
  right: 0px;
  min-width: 50px;
  min-height: 100%;
  transform: translateX(0%);
}
.slide-right-enter-active {
  transition: all 0.3s ease;
}
.slide-right-leave-active {
  transition: all 0.3s ease;
}
.slide-right-enter,
.slide-right-leave-active {
  transform: translateX(100%);
  opacity: 0;
}
</style>
