<template>
  <div id="app">
    <router-view />
    <popup-loading v-if="loading"></popup-loading>
  </div>
</template>

<script>
import { PopupLoading } from './components/popup'
import { mapState } from 'vuex'
export default {
  components: {
    PopupLoading
  },
  computed: {
    ...mapState(['loading'])
  }
}
</script>

<style lang="less">
body {
  background: #EFEFEF;
  padding: 0;
  margin: 0;
  height: 100vh;
  color: #333333;
}
#app {
  font-size: 28px;
}
.btn {
  height: 86px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  background: #383838;
  font-size: 32px;
  border-radius: 20px;
}
</style>
