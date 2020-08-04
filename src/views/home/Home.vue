<template>
  <div id="home">
    <navbar class="home-nav">
      <div slot="center">购物街</div>
    </navbar>
    <scroll
      class="content"
      ref="scrollRef"
      :probe-type="3"
      @position="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners"></home-swiper>
      <recommendView :recommends="recommends"></recommendView>
      <fashion-view></fashion-view>
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick"></tab-control>
      <goods-list :goods="currentList"></goods-list>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import Navbar from "common/navbar/Navbar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FashionView from "./childComps/FashionView";

import { getHomeMultiData, getHomeGoods } from "network/home.js";

export default {
  name: "Home",
  components: {
    Navbar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
    HomeSwiper,
    RecommendView,
    FashionView,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
    };
  },
  computed: {
    currentList() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    this.getHomeData();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    /**监听事件相关方法 */
    tabClick(index) {
      // console.log(index);
      this.currentType = Object.keys(this.goods)[index];
    },
    backTop() {
      // console.log("backTop");
      this.$refs.scrollRef.scrollTo(0, 0, 300);
    },
    contentScroll(position) {
      // console.log(position);
      if (position.y < -1000) {
        this.isShowBackTop = true;
      } else {
        this.isShowBackTop = false;
      }
    },
    loadMore() {
      // console.log("load");
      this.getHomeGoods(this.currentType);
      this.$refs.scrollRef.finishPullUp();
    },

    /**网络请求相关方法 */
    // 请求轮播图和推荐的数据
    getHomeData() {
      getHomeMultiData().then((value) => {
        // console.log(value);
        this.banners = value.data.banner.list;
        this.recommends = value.data.recommend.list;
      });
    },
    // 请求商品展示列表的数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((value) => {
        // console.log(value);
        this.goods[type].list.push(...value.data.list);
        this.goods[type].page++;
      });
    },
  },
};
</script>

<style scoped>
#home {
  padding: 44px 0 49px;
}
.home-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--color-tint);
  color: #fff;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 43px;
  z-index: 2;
}
.content {
  height: calc(100vh - 44px - 49px);
  overflow: hidden;
}
</style>
