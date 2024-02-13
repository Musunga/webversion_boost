<template>
  <page :title="i18n.title">
    <div class="help-warp">
      <div class="help-body">
        <div class="help-items" v-if="items.length>0">
          <collapse-item v-for="(item, i) in items" :key="i"
            :value="activeIndex===i"
            :title="`${i+1}、${item.pTitle}`"
            :content="item.pContent"
            @input="onChange(i)"
          >
          </collapse-item>
        </div>
        <result-msg v-else :loading="loading" :text="error" @click="loadList"></result-msg>
      </div>
    </div>
  </page>
</template>

<script>
import { HELP_LIST } from '../../apis/user.js'
import CollapseItem from '../../components/help/collapse_item.vue'
import ResultMsg from '../../components/result/msg.vue'
export default {
  components: {
    CollapseItem,
    ResultMsg
  },
  computed: {
    i18n () {
      return this.$t('help')
    }
  },
  data () {
    return {
      activeIndex: 0,
      loading: false,
      error: '',
      items: []
    }
  },
  methods: {
    onChange (i) {
      this.activeIndex = i
    },
    loadList () {
      this.loading = true
      this.$get(
        HELP_LIST,
        {
          classId: process.env.VUE_APP_HELP
        },
        resp => {
          this.loading = false
          if (resp.list) {
            this.error = ''
            this.items = resp.list
          } else {
            this.error = this.i18n.msg_fail_content
          }
        },
        error => {
          this.loading = false
          this.error = error
        }
      )
    }
  },
  created () {
    this.loadList()
  }
}
</script>

<style>
.help-warp{
  height: 100%;
  position: relative;
}
.help-head{
  position: fixed;
  width: 100%;
  z-index: 998;
  background: rgba(249,249,249,1);
  /* #ifdef H5 */
  top: 88upx;
  /* #endif */
  /* #ifndef H5 */
  top: var(--window-top);
  /* #endif */
}
.help-body{
  position: absolute;
  /* top: 92upx; */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #FFFFFF;
}
.help-items text{
  font-size: 28upx;
  font-weight: 400;
}
</style>
