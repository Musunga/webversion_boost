<template>
  <page :title="i18n.title">
    <div class="setting-warp">
      <div class="setting-main">
        <div class="setting-row" @click="isLangView = true">
          <span>{{i18n.lang}}</span>
          <span class="setting-row-label">{{locale.label}}</span>
          <img class="right" src="../../assets/imgs/right.png" alt="">
        </div>
      </div>
      <select-lang v-model="isLangView"></select-lang>
    </div>
  </page>
</template>

<script>
import { SelectLang } from '../../components/select'
import { mapGetters } from 'vuex'
export default {
  components: {
    SelectLang
  },
  computed: {
    ...mapGetters(['locale']),
    i18n () {
      return this.$t('setting')
    }
  },
  data () {
    return {
      isLangView: false
    }
  }
}
</script>

<style lang="less">
.setting-warp {
  padding: 48px;
  .setting-main {
    padding: 24px;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.2);
  }
  .setting-row {
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding-right: 40px;
    .right {
      position: absolute;
      width: 36px;
      height: 36px;
      right: 0;
    }
  }
  .setting-row-label {
    color: #727070;
  }
}
</style>
