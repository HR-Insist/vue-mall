<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" />
  </div>
</template>

<script>
export default {
  name: "BackTop",
};
</script>

<style scoped>
.back-top {
  position: fixed;
  bottom: 55px;
  right: 8px;
  z-index: 2;
}
.back-top img {
  width: 43px;
  height: 43px;
}
</style>
