<template>
  <div id="detail">
    <detail-navbar
      class="detail-nav"
      @titleItemClick="titleItemClick"
      :currentIndex="currentIndex"
      ref="navbarRef"
    ></detail-navbar>
    <scroll class="detail-scroll" ref="scrollRef" @position="contentScroll" :probeType="3">
      <detail-swiper :top-images="topImages" ref="swiperRef"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="paramsRef"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo" ref="commentRef"></detail-comment-info>
      <detail-recommend-info :recommend-list="recommend" ref="recommendRef"></detail-recommend-info>
    </scroll>
    <back-top v-show="isShowBackTop" @click.native="backTop"></back-top>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
import DetailNavbar from "./childComps/DetailNavbar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailRecommendInfo from "./childComps/DetailRecommendInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "network/detail";
import { debounce } from "@/common/utils";
import { backTopMixin } from "@/common/mixin";
import { BACKTOP_DISTANCE } from "@/common/const";

export default {
  name: "Detail",
  components: {
    DetailNavbar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    DetailBottomBar,
    Scroll,
  },
  mixins: [backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: [],
      recommend: [],
      imageListner: null,
      titleTop: [],
      currentIndex: 0,
    };
  },
  created() {
    this._getDetailData();
    this._getRecommend();
  },
  mounted() {
    this.imageListner = () => {
      debounce(this.$refs.scrollRef.refresh, 500)();
    };
    this.$bus.$on("itemImageLoad", this.imageListner);
  },
  destroyed() {
    this.$bus.$off("itemImageLoad", this.imageListner);
  },
  methods: {
    imageLoad() {
      this.$refs.scrollRef.refresh();
      // console.log("DetailImageLoad");
      this._getOffsetTop();
    },
    titleItemClick(index) {
      // console.log(index);
      this.currentIndex = index;
      this.$refs.scrollRef.scrollTo(0, -this.titleTop[index], 100);
    },
    contentScroll(position) {
      // 监听滚动位置，显示对应的title
      for (let i = 0; i < this.titleTop.length - 1; i++) {
        if (
          this.currentIndex !== i &&
          -position.y >= this.titleTop[i] &&
          -position.y < this.titleTop[i + 1]
        ) {
          this.currentIndex = i;
        }
      }
      // 监听backTop的显示
      this.isShowBackTop = -position.y > BACKTOP_DISTANCE;
    },
    addToCart() {
      // 获取购物车需要的信息
      const product = {};
      product.iid = this.iid;
      product.image = this.topImages[0];
      product.desc = this.goods.desc;
      product.price = this.goods.nowPrice;
      product.title = this.goods.title;
      // 将商品添加到购物车（vuex）
      this.$store.dispatch("addProductToCart", product);
    },
    _getDetailData() {
      // 获取商品iid
      this.iid = this.$route.params.iid;
      // 获取详细信息
      getDetail(this.iid).then((value) => {
        console.log(value);
        // 获取顶部轮播图数据
        this.topImages = value.result.itemInfo.topImages;
        // 获取商品信息
        this.goods = new Goods(
          value.result.itemInfo,
          value.result.columns,
          value.result.shopInfo.services
        );
        // 获取店铺信息
        this.shop = new Shop(value.result.shopInfo);
        // 获取商品详细信息
        this.detailInfo = value.result.detailInfo;
        // 获取商品参数信息
        this.paramInfo = new GoodsParam(
          value.result.itemParams.info,
          value.result.itemParams.rule
        );
        // 获取评论信息
        if (value.result.rate?.list?.length) {
          this.commentInfo = value.result.rate.list;
        }
      });
    },
    _getRecommend() {
      // 获取推荐数据
      getRecommend().then((value) => {
        // console.log(value);
        this.recommend = value.data.list;
      });
    },
    _getOffsetTop() {
      this.titleTop.length = 0;
      this.titleTop.push(this.$refs.swiperRef.$el.offsetTop - 44);
      this.titleTop.push(this.$refs.paramsRef.$el.offsetTop - 44);
      this.titleTop.push(this.$refs.commentRef.$el.offsetTop - 44);
      this.titleTop.push(this.$refs.recommendRef.$el.offsetTop - 44);
      this.titleTop.push(Number.MAX_VALUE);
      // console.log(this.titleTop);
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 1;
  background-color: #fff;
  height: 100vh;
  overflow: hidden;
}
.detail-nav {
  position: relative;
  background-color: #fff;
  /* z-index: 10; */
}
.detail-scroll {
  height: calc(100% - var(--nav-bar-height) - var(--tab-bar-height));
  overflow: hidden;
}
</style>
