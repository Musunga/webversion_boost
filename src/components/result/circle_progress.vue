<template>
  <div class="circle-progress">
    <svg width="220" height="220" viewbox="0 0 220 220">
      <circle cx="110" cy="110" r="85" stroke-width="30" stroke="#eeeeee" fill="none"></circle>
      <circle cx="110" cy="110" r="85" stroke-width="30" stroke="#3EAAFF" fill="none" transform="matrix(0,-1,1,0,0,220)" :stroke-dasharray="radian"></circle>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  computed: {
    radian () {
      let percent = this.value / 100
      let perimeter = Math.PI * 2 * 85
      return perimeter * percent + ' ' + perimeter * (1 - percent)
    }
  }
}
</script>

<style>
.circle-progress circle {
    transition: stroke-dasharray .25s;
}
</style>
