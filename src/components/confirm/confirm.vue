<template>
  <div v-if="isShow" class="popup-show-modal">
    <div class="popup-show-modal-main">
      <div class="popup-show-modal-title" v-if="config.title">{{config.title}}</div>
      <div class="popup-show-modal-content" v-if="config.content">{{config.content}}</div>
      <div class="popup-show-modal-btns">
        <div v-if="config.showCancel" :style="cancelColor" @click="onCancel">{{config.cancelText}}</div>
        <div :style="confirmColor" @click="onConfirm">{{config.confirmText}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    cancelColor () {
      return `color: ${this.config.cancelColor};`
    },
    confirmColor () {
      return `color: ${this.config.confirmColor};`
    }
  },
  data () {
    return {
      isShow: false,
      config: {
        title: '',
        content: '',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#00ce70'
      }
    }
  },
  methods: {
    onCancel () {
      this.isShow = false
    },
    onConfirm () {
      this.isShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.popup-show-modal {
  z-index: 99999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  &-main {
    width: 500px;
    min-height: 220px;
    background-color: #fff;
    border-radius: 16px;
    color: #161616;
    text-align: center;
    border: 2px solid #DCDFE6;
    padding-bottom: 80px;
    position: relative;
  }
  &-title {
    font-size: 32px;
    line-height: 80px;
  }
  &-content {
    font-size: 28px;
    line-height: 40px;
    padding: 20px;
  }

}
</style>
