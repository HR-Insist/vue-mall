<template>
  <div id="tabbar">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style>
#tabbar {
  display: flex;
  /* justify-content: space-around; */
  height: 49px;
  width: 100vw;
  background-color: #f6f6f6;
  position: fixed;
  bottom: 0;
  box-shadow: 0 -2px 2px rgba(100, 100, 100, 0.1);
  z-index: 9;
}
</style>
