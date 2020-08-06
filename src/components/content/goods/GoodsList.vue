<template>
  <div class="goods">
    <!-- <h3>商品列表</h3> -->
    <goods-item v-for="(item, index) in goods" :key="index" :goods-item="item"></goods-item>
  </div>
</template>

<script>
import GoodsItem from "./GoodsItem";
export default {
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      default: [],
    },
  },
  components: {
    GoodsItem,
  },
  methods: {},
};
</script>

<style scoped>
.goods {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  /* padding: 2px; */
  justify-content: space-evenly;
}
</style>
