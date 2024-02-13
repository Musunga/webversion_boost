<template>
  <div class="collapse-item-warp">
    <div class="collapse-item-head" :class="{'active': value}" @click="onChange">
      <span class="title">
        {{title}}
      </span>
    </div>
    <div class="collapse-item-body" v-show="value">
      {{content}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default: ''
    }
  },
  methods: {
    onChange () {
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style>
.collapse-item-warp{
  background: #FFFFFF;
}
.collapse-item-warp+.collapse-item-warp{
  border-top: 1px solid rgba(217,217,217,1);
}
.collapse-item-head{
  display: flex;
  align-items: center;
  padding: 30px 34px;
  font-size: 32px;
}
.collapse-item-head.active{
  border-bottom: 1px solid rgba(217,217,217,1);
}
.collapse-item-head span{
  flex: 1;
}
.collapse-item-head:after{
  content: '';
  display: inline-block;
  margin: 10px 0 0 0;
  width: 20px;
  height: 20px;
  border-top: 4px solid #CCCCCC;
  border-right: 4px solid #CCCCCC;
  transform: rotate(-45deg);
  transition: transform 0.5s;
}
.collapse-item-head.active:after{
  transform: rotate(135deg);
  margin: 0px 0px 10px;
}
.collapse-item-body{
  padding: 16px 40px;
  color: rgba(102,102,102,1);
}
</style>
