<template>
  <div class="loading-warp">
    <div class="loading-border">
      <div class="loading-border-warp">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="loading-dot"></div>
  </div>
</template>

<style lang="less">
.loading{
  &-warp{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 33px 0;
  }
  &-border{
    background: #347DFF;
    height: 240px;
    width: 400px;
    border-radius: 24px;
    &-warp{
      border-radius: 10px;
      display: flex;
      margin: 40px;
      height: 140px;
      padding: 10px 0 10px 10px;
      width: 320px;
      background: #ffffff;
      & div{
        display: inline-block;
        width: 60px;
        margin: 0 10px;
        height: 100%;
        border-radius: 4px;
        background: #347DFF;
        animation: load 2s linear infinite;
      }
      & div:nth-child(2){
        animation-delay: 0.5s;
      }
      & div:nth-child(3){
        animation-delay: 1s;
      }
      & div:nth-child(4){
        animation-delay: 1.5s;
      }
    }
  }
  &-dot{
    background: #347DFF;
    height: 100px;
    width: 24px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
}
@keyframes load{
  0%{
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
}
</style>
