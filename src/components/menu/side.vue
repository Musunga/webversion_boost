<template>
  <div class="menu-side">
    <div class="menu-side-title">
      <img src="../../assets/imgs/avatar.png" alt="">
      <span v-if="user && user.pname">{{user.pname | decode}}</span>
      <span v-else @click="goRouter('/login')">{{i18n.login_tips}}</span>
    </div>
    <div class="menu-side-row" @click="goRouter('/order')">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" viewBox="0 0 53.356 62.632">
  <g id="Order_Icon" data-name="Order Icon" transform="translate(-154.328 -784.853)">
    <rect id="Rectangle_125" data-name="Rectangle 125" width="50.356" height="54.782" rx="3.759" transform="translate(155.828 791.203)" fill="none" stroke="#383838" stroke-miterlimit="10" stroke-width="3"/>
    <line id="Line_9" data-name="Line 9" x2="27.975" transform="translate(165.84 805.052)" fill="none" stroke="#383838" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"/>
    <line id="Line_10" data-name="Line 10" x2="13.988" transform="translate(165.84 813.446)" fill="none" stroke="#383838" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"/>
    <path id="Path_272" data-name="Path 272" d="M1076.92,3992.774v-4.85H1097.9v4.85" transform="translate(-906.405 -3201.571)" fill="none" stroke="#383838" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
  </g>
</svg>
      <span>{{i18n.order}}</span>
    </div>
    <div class="menu-side-row" @click="goRouter('/setting')">
      <svg xmlns="http://www.w3.org/2000/svg" width="53.356" height="57.782" viewBox="0 0 53.356 57.782">
  <rect id="Rectangle_128" data-name="Rectangle 128" width="50.356" height="54.782" rx="3.759" transform="translate(1.5 1.5)" fill="none" stroke="#383838" stroke-miterlimit="10" stroke-width="3"/>
  <path id="Path_271" data-name="Path 271" d="M1078.493,4943.911l10.27-23.19,10.6,23.19-5-10.933h-18.91" transform="translate(-1060.733 -4905.236)" fill="none" stroke="#383838" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
</svg>

        <span>{{i18n.setting}}</span>
      </div>
      <div class="menu-side-row" @click="goRouter('/help')">
        <svg xmlns="http://www.w3.org/2000/svg" width="53.356" height="57.782" viewBox="0 0 53.356 57.782">
  <g id="faq_icon" data-name="faq icon" transform="translate(-154.328 -1215.126)">
    <rect id="Rectangle_126" data-name="Rectangle 126" width="50.356" height="54.782" rx="3.759" transform="translate(155.828 1216.626)" fill="none" stroke="#383838" stroke-miterlimit="10" stroke-width="3"/>
    <g id="Group_133" data-name="Group 133" transform="translate(-906.405 -3201.571)">
      <line id="Line_16" data-name="Line 16" y2="18.699" transform="translate(1087.41 4431.01)" fill="none" stroke="#383838" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"/>
      <circle id="Ellipse_65" data-name="Ellipse 65" cx="2.061" cy="2.061" r="2.061" transform="translate(1085.349 4456.041)" fill="none" stroke="#383838" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"/>
    </g>
  </g>
</svg>

        <span>{{i18n.help}}</span>
      </div>
    <div class="menu-side-foot">

      <div class="btn" @click="onLogout">
        <span>{{i18n.logout}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['user']),
    i18n () {
      return this.$t('mine')
    }
  },
  methods: {
    onLogout () {
      this.$store.commit('user', null)
      this.$store.commit('token', '')
      this.$router.push('/login')
    },
    goRouter (path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="less">
.menu-side {
  width: 550px;
  &-title {
    font-size: 48px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 80px 0 48px;
    img {
      width: 96px;
      height: 96px;
      border-radius: 50%;
      margin: 0 24px 0 48px;
    }
  }
  &-row {
    font-size: 32px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 100px;
    svg {
      width: 40px;
      height: 40px;
      margin: 0 24px 0 68px;
    }
  }
  &-foot {
    width: 100%;
    position: absolute;
    bottom: 48px;
  }
  .btn {
    position: fixed;
    left: 48px;
    right: 48px;
    bottom: 48px;
    button {
      width: 100%;
      border: none;
      padding: 0;
      margin: 0;
    }
  }
}
</style>
