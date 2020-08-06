<template>
  <navbar>
    <div slot="left" class="back" @click="backClick">
      <img src="../../../assets/img/common/back.svg" alt />
    </div>
    <div slot="center" class="titles">
      <div
        v-for="(item, index) in titles"
        :key="index"
        @click="titleItemClick(index)"
        :class="{active: index===currentIndex}"
      >{{item}}</div>
    </div>
  </navbar>
</template>

<script>
import Navbar from "components/common/navbar/Navbar";

export default {
  name: "DetailNavbar",
  components: {
    Navbar,
  },
  props: {
    currentIndex: {
      type: Number,
      defult: 0,
    },
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
    };
  },
  methods: {
    titleItemClick(index) {
      this.$emit("titleItemClick", index);
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.titles {
  display: flex;
  justify-content: space-around;
  font-size: 14px;
}
.active {
  color: var(--color-high-text);
}
.back img {
  margin-top: 11px;
}
</style>
