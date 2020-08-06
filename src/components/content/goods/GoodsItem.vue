<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" @load="imageLoad" />
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img;
    },
  },
  methods: {
    imageLoad() {
      // console.log("imageLoad");
      this.$bus.$emit("itemImageLoad");
    },
    itemClick() {
      // console.log(this.goodsItem.iid);
      this.$router.push("/detail/" + this.goodsItem.iid);
    },
  },
};
</script>

<style scoped>
.goods-item {
  width: 48%;
  font-size: 12px;
  padding-bottom: 5px;
}
.goods-item img {
  width: 100%;
  border-radius: 5%;
}
.goods-info {
  text-align: center;
}
.goods-info p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}
.goods-info .price {
  color: var(--color-tint);
  margin-right: 20px;
}
.goods-info .collect {
  position: relative;
}
.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
