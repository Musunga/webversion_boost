<template>
  <div class="popup-loading">
    <img src="../../assets/imgs/loading.png" alt="">
  </div>
</template>

<style lang="less">
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.popup-loading {
  z-index: 99999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 100px;
    width: 100px;
    animation: rotate linear 2s infinite;
  }
}
</style>
