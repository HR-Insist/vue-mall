<template>
  <Tabbar>
    <TabbarItem path="/home" activeColor="red">
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" />
      <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" />
      <div slot="item-title">首页</div>
    </TabbarItem>
    <TabbarItem path="/category" activeColor="red">
      <img slot="item-icon" src="~assets/img/tabbar/category.svg" />
      <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" />
      <div slot="item-title">分类</div>
    </TabbarItem>
    <TabbarItem path="shoppingCart" activeColor="red">
      <img slot="item-icon" src="~assets/img/tabbar/cart.svg" />
      <img slot="item-icon-active" src="~assets/img/tabbar/cart_active.svg" />
      <div slot="item-title">购物车</div>
    </TabbarItem>
    <TabbarItem path="profile" activeColor="red">
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg" />
      <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" />
      <div slot="item-title">我的</div>
    </TabbarItem>
  </Tabbar>
</template>

<script>
import Tabbar from "components/common/tabbar/Tabbar";
import TabbarItem from "components/common/tabbar/TabbarItem";
export default {
  name: "MainTabbar",
  components: {
    Tabbar,
    TabbarItem,
  },
};
</script>

<style scoped>
</style>
