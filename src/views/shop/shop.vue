<template>
  <!-- <page title="设备购买"> -->
    <div class="shop-warp">
      <img class="banner" src="../../assets/imgs/product1.jpg" alt="">
      <div class="shop-main">
        <div class="shop-row">
          <span class="title">设备型号:</span>
          <span>天蓝色充电宝</span>
        </div>
        <div class="shop-row">
          <span class="title">单价:</span>
          <span>99元/个</span>
        </div>
        <div class="shop-row">
          <span class="title">购买数量:</span>
          <input type="text" value="1">
          <span style="padding-left: 10px;">个</span>
        </div>
        <div class="shop-row">
          <span class="title">联系人:</span>
          <input type="text">
        </div>
        <div class="shop-row">
          <span class="title">联系电话:</span>
          <input type="text">
        </div>
        <div class="shop-row">
          <span class="title">地址:</span>
          <input type="text">
        </div>
      </div>
      <div class="btn">立即购买</div>
    </div>
  <!-- </page> -->
</template>

<style lang="less">
.shop-warp {
  .banner {
    width: 100%;
  }
  .shop-main {
    margin: 20px 48px;
    padding: 0 24px;
    background-color: #fff;
    border-radius: 20px;
  }
  .shop-row {
    height: 100px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .title {
      padding-right: 20px;
    }
    input {
      flex: 1;
      height: 60px;
      border: 1px solid #E4E7ED;
      font-size: 28px;
      padding: 4px 20px;
    }
  }
  .shop-row + .shop-row {
    border-top: 1px solid #E4E7ED;
  }
}
</style>
