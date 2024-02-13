<template>
  <div>
    <popup-warp :value="value" @input="onInput">
      <div class="select-lang-top">
        <span @click="onInput(false)">{{$t('msg.cancel')}}</span>
        <span @click="onSelect">{{$t('msg.confirm')}}</span>
      </div>
      <select-column @select="isSelect" :values="localeArr"></select-column>
    </popup-warp>
  </div>
</template>

<script>
import { PopupWarp } from '../popup'
import SelectColumn from './column'
import { mapState } from 'vuex'
export default {
  components: {
    PopupWarp,
    SelectColumn
  },
  computed: {
    ...mapState(['localeArr'])
  },
  props: {
    value: {
      tepe: Boolean,
      default: false
    }
  },
  data () {
    return {
      tempVal: ''
    }
  },
  methods: {
    onInput (val) {
      console.log(val)
      this.$emit('input', val)
    },
    onSelect () {
      this.$i18n.locale = this.tempVal.value
      this.$store.commit('lang', this.tempVal.value)
      this.$emit('select', this.tempVal.value)
      this.$emit('input', false)
    },
    isSelect (val) {
      this.tempVal = val
    }
  }
}
</script>

<style lang="less">
.select-lang-top {
  color: #00ce70;
  font-size: 32px;
  line-height: 80px;
  padding: 0 48px;
  display: flex;
  justify-content: space-between;
}
</style>
