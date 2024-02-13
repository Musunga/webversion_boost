<template>
  <div class="result-warp">
    <div class="result-icon">
      <loading v-if="type==='100'" />
      <img v-else-if="type==='404'" src="../../assets/imgs/result_404.png">
      <img v-else-if="type==='410'" src="../../assets/imgs/result_list.png">
      <img v-else-if="type==='500'" src="../../assets/imgs/result_error.png">
      <img v-else-if="type==='502'" src="../../assets/imgs/result_network.png">
      <img v-else-if="type==='400'" src="../../assets/imgs/result_none.png">
      <!-- #endif -->
    </div>
    <div class="result-msg">
      {{text}}
    </div>
    <div class="result-btn" v-if="showButton">
      <button class="btn small" @click="onClick">
        {{loading ? i18n.loading : i18n.refresh}}
      </button>
    </div>
  </div>
</template>

<script>
import Loading from './loading.vue'
export default {
  components: {
    Loading
  },
  props: {
    type: {
      type: String,
      default: '410'
    },
    text: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    showButton: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    i18n () {
      return this.$t('result_msg')
    }
  },
  methods: {
    onClick (event) {
      if (!this.loading) {
        this.$emit('click', event)
      }
    }
  }
}
</script>

<style>
.result-warp{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #FFFFFF;
}
.result-icon{
  padding-top: 200px;
}
.result-msg{
  font-size: 28px;
  font-weight: 400;
  padding: 10px 20px;
  color: rgba(102,102,102,1)
}
.result-icon img{
  width: 360px;
  height: 360px;
}
.result-btn{
  margin: 48px 0;
}
</style>
