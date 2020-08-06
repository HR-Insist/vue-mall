<template>
  <div id="home">
    <navbar class="home-nav">
      <div slot="center">购物街</div>
    </navbar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControlClone"
      class="tab"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scrollRef"
      :probe-type="3"
      @position="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommendView :recommends="recommends"></recommendView>
      <fashion-view></fashion-view>
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl"></tab-control>
      <goods-list :goods="currentList"></goods-list>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import Navbar from "components/common/navbar/Navbar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FashionView from "./childComps/FashionView";

import { getHomeMultiData, getHomeGoods } from "network/home.js";
import { debounce } from "@/common/utils";
import { backTopMixin } from "@/common/mixin";

export default {
  name: "Home",
  components: {
    Navbar,
    TabControl,
    GoodsList,
    Scroll,
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
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      imageListner: null,
    };
  },
  mixins: [backTopMixin],
  computed: {
    currentList() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    // 请求轮播图和推荐栏目的数据
    if (this.banners.length === 0) {
      this.getHomeData();
      this.getHomeGoods("pop");
      this.getHomeGoods("new");
      this.getHomeGoods("sell");
    }
    // 请求商品数据
  },
  mounted() {
    // 监听事件总线---> 商品图片加载完成
    this.imageListner = () => {
      debounce(this.$refs.scrollRef.refresh, 500)();
    };
    this.$bus.$on("itemImageLoad", this.imageListner);
  },
  activated() {
    // console.log("activated");
    this.$refs.scrollRef.scrollTo(0, this.saveY, 10);
    this.$refs.scrollRef.refresh();
  },
  deactivated() {
    // console.log("deactivated");
    // console.log(this.saveY);
    this.saveY = this.$refs.scrollRef.getScrollY();
    // 离开页面，取消图片加载监听
    this.$bus.$off("itemImageLoad", this.imageListner);
  },
  methods: {
    /**监听事件相关方法 */
    tabClick(index) {
      this.currentType = Object.keys(this.goods)[index];
      this.$refs.tabControl.currentIndex = index;
      this.$refs.tabControlClone.currentIndex = index;
    },
    contentScroll(position) {
      // 判断backTop 是否显示
      this.isShowBackTop = position.y < -1000;
      // 判断tabControl是的需要吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop - 44;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
      this.$refs.scrollRef.finishPullUp();
    },
    swiperImageLoad() {
      // 获取tab-control的offsetTop
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
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
        this.goods[type].list.push(...value.data.list);
        this.goods[type].page++;
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-bottom: 49px; */
  height: calc(100vh - 49px);
}
.home-nav {
  position: relative;
  background-color: var(--color-tint);
  color: #fff;
  z-index: 1;
}
.content {
  height: calc(100% - 44px);
  overflow: hidden;
}
.tab {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  z-index: 2;
}
</style>
