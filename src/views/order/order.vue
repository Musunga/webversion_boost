<template>
  <page :title="i18n.title">
    <div class="order-warp">
      <order-item v-for="(item, i) in borrowItems" :key="i" :item="item"></order-item>
      <order-item v-for="(item, i) in finishItems" :key="i" :item="item"></order-item>
    </div>
  </page>
</template>

<script>
import { ORDER_LIST } from '../../apis/user'
import OrderItem from '../../components/order/item'
export default {
  components: {
    OrderItem
  },
  computed: {
    i18n () {
      return this.$t('order')
    },
    borrowItems () {
      return this.items.filter(item => {
        return item.pJiesuanid === 0 && (item.pZujie === 1 || item.pZujie === 4)
      })
    },
    finishItems () {
      return this.items.filter(item => {
        return (item.pZujie !== 1 && item.pZujie !== 4) || item.pJiesuanid === 1
      })
    }
  },
  data () {
    return {
      items: [],
      error: ''
    }
  },
  methods: {
    loadList (page = 1) {
      this.$loading(true)
      this.$get(
        ORDER_LIST,
        {
          page,
          pageSize: 10
        },
        resp => {
          this.$loading(false)
          if (resp.page) {
            this.error = ''
            this.items = resp.page.records
          } else {
            this.error = this.i18n.msg_error
          }
        },
        error => {
          this.$loading(false)
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

<style lang="less">
.order-warp {
  padding: 48px;
}
</style>
