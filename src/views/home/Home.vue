<template>
  <div id="home">
    <Navbar class="home-nav">
      <div slot="center">购物街</div>
    </Navbar>
    <HomeSwiper :banners="banners"></HomeSwiper>
    <RecommendView :recommends="recommends"></RecommendView>
  </div>
</template>

<script>
import Navbar from "common/navbar/Navbar.vue";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import { getHomeMultiData } from "network/home.js";

export default {
  name: "Home",
  components: {
    Navbar,
    HomeSwiper,
    RecommendView,
  },
  data() {
    return {
      banners: [],
      recommends: [],
    };
  },
  created() {
    getHomeMultiData().then((value) => {
      // console.log(value);
      this.banners = value.data.banner.list;
      this.recommends = value.data.recommend.list;
    });
  },
  methods: {},
};
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
