<template>
  <div class="wrapper" ref="wrapperRef">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      tyep: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    // 创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapperRef, {
      click: true,
      scrollbar: true,
      preventDefault: false,
      tap: true,
      mouseWheel: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });
    // 监听滚动位置
    this.scroll.on("scroll", (position) => {
      // console.log(position);
      this.$emit("position", position);
    });
    // 监听上拉加载事件
    this.scroll.on("pullingUp", () => {
      // console.log("load");
      this.$emit("pullingUp");
    });
  },
  methods: {
    scrollTo(x, y, time = 500) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll.refresh();
    },
  },
};
</script>

<style scoped>
</style>
