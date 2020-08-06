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
      default: 1,
    },
    click: {
      type: Boolean,
      default: true,
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
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapperRef, {
        click: this.click,
        scrollbar: true,
        preventDefault: false,
        tap: true,
        mouseWheel: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
      });

      // 监听滚动位置
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on("scroll", (position) => {
          // console.log(position);
          this.$emit("position", position);
        });
      }
      // 监听上拉加载事件
      if (this.pullUpLoad) {
        this.scroll.on("pullingUp", () => {
          // console.log("load");
          this.$emit("pullingUp");
        });
      }
    });
  },
  methods: {
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },

    refresh() {
      setTimeout(() => {
        this.scroll && this.scroll.refresh();
      }, 20);
      // console.log("-----");
    },
    getScrollY() {
      return this.scroll?.y;
    },
  },
};
</script>

<style scoped>
.wrapper {
  overflow: hidden;
}
</style>
