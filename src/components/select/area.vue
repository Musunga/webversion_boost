<template>
  <div>
    <popup-warp :value="value" @input="onInput">
      <div class="select-area-top">
        <span class="select-btn" @click="onInput(false)">{{$t('msg.cancel')}}</span>
        <input class="select-input" type="text" v-model="keyword" :placeholder="$t('msg.keyword')">
        <span class="select-btn" @click="onSelect">{{$t('msg.confirm')}}</span>
      </div>
      <select-column v-if="isview" @select="isSelect" :values="values"></select-column>
    </popup-warp>
  </div>
</template>

<script>
import { PopupWarp } from '../popup'
import SelectColumn from './column'
import { Debounce } from '@/utils/public.js'
import areaCode from '@/utils/area_code.js'
export default {
  components: {
    PopupWarp,
    SelectColumn
  },
  props: {
    value: {
      tepe: Boolean,
      default: false
    }
  },
  watch: {
    keyword: Debounce(function () {
      this.filterCode()
    })
  },
  // computed: {
  //   values () {
  //     let arr = areaCode
  //     return arr.sort((a, b) => {
  //       return a.label.charCodeAt(0) - b.label.charCodeAt(0)
  //     })
  //   }
  // },
  data () {
    return {
      tempVal: '',
      values: [],
      keyword: '',
      isview: true
    }
  },
  methods: {
    onInput (val) {
      console.log(val)
      this.$emit('input', val)
    },
    onSelect () {
      this.$emit('select', this.tempVal.value)
      this.$emit('input', false)
    },
    isSelect (val) {
      this.tempVal = val
    },
    filterCode () {
      this.isview = false
      this.values = areaCode.filter(obj => {
        return obj.label.toLowerCase().indexOf(this.keyword.toLowerCase()) !== -1
      })
      this.$nextTick(() => {
        this.isview = true
      })
    },
    sortCode () {
      let arr = areaCode
      return arr.sort((a, b) => {
        return a.label.charCodeAt(0) - b.label.charCodeAt(0)
      })
    }
  },
  created () {
    this.values = this.sortCode()
  }
}
</script>

<style lang="less">
.select-area-top {
  color: #00ce70;
  font-size: 32px;
  line-height: 80px;
  display: flex;
  justify-content: space-between;
  .select-btn {
    padding: 0 48px;
  }
  .select-input {
    flex: 1;
    font-size: 28px;
    text-align: center;
    border: none;
    outline: none;
  }
}
</style>
