<template>
  <div id="cart">
    <navbar class="navbar">
      <div slot="center">购物车({{cartLength}})</div>
    </navbar>
    <scroll class="cart-scroll" ref="scrollRef">
      <cart-list :cart-list="cartList"></cart-list>
    </scroll>
  </div>
</template>

<script>
import Navbar from "components/common/navbar/Navbar";
import Scroll from "components/common/scroll/Scroll";

import CartList from "./childComps/CartList";

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  props: {},
  components: {
    Navbar,
    Scroll,
    CartList,
  },
  computed: {
    // vuex getters 属性   mapGetter辅助函数
    ...mapGetters(["cartLength", "cartList"]),
  },
  activated() {
    this.$refs.scrollRef.refresh();
  },
  methods: {
    // cartListChange() {
    //   this.$refs.scrollRef.refresh();
    // },
  },
};
</script>

<style scoped>
#cart {
  height: calc(100vh - var(--tab-bar-height));
}
.navbar {
  background-color: var(--color-tint);
  color: white;
  font-weight: 600;
}
.cart-scroll {
  height: calc(100% - var(--nav-bar-height));
}
</style>
