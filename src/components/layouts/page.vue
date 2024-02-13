<template>
  <div class="page" :style="{'padding-top': safeArea.top + 'px'}">
    <div class="page-nav">
      <slot name="nav">
      </slot>
    </div>
    <div v-if="hasHead" class="page-head" :style="{'padding-top': safeArea.top + 'px'}">
      <div v-if="title" class="page-head-default">
        <img src="../../assets/imgs/back.png" alt="" @click="onBack">
        {{title}}
      </div>
      <slot name="head">
      </slot>
    </div>
    <div class="page-body">
      <slot></slot>
    </div>
    <div class="page-foot" v-if="hasFoot">
      <slot name="foot"></slot>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    showBack: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapState(['safeArea']),
    hasHead () {
      return this.$slots.head || this.title
    },
    hasFoot () {
      return this.$slots.foot
    }
  },
  methods: {
    onBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less">
.page{
  &-head{
    background: #3ca2fc;
    position: fixed;
    z-index: 99;
    top: 0;
    width: 100%;
    font-size: 36px;
    &-default {
      height: 88px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #FFFFFF;
      img {
        height: 40px;
        width: 40px;
        position: absolute;
        left: 32px;
      }
    }
  }
  &-head+&-body{
    padding-top: 88px;
  }
  &-foot{
    background: #FFFFFF;
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
</style>
