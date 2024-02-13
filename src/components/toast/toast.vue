<template>
  <span class="popup-toast" v-if="msg"><span>{{msg}}</span></span>
</template>

<script>
export default {
  data () {
    return {
      msg: '',
      config: {
        duration: 4000
      },
      toastTime: null
    }
  },
  methods: {
    show (msg) {
      this.msg = msg
      console.log(this.msg)
      if (this.toastTime) {
        clearTimeout(this.toastTime)
      }
      this.toastTime = setTimeout(() => {
        this.msg = ''
      }, this.config.duration)
    }
  },
  mounted () {
    // this.show()
  }
}
</script>

<style lang="less" scoped>
.popup-toast {
  padding: 18px 32px;
  color: #fff;
  background-color: rgba(1, 1, 1, 0.8);
  border-radius: 15px;
  max-width: 700px;
  z-index: 99999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%)translateY(-50%);
}
</style>
