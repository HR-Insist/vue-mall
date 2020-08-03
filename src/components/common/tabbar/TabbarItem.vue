<template>
  <div class="tabbar-item" @click="itemClick()">
    <div v-show="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-show="isActive">
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-title"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabbarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "#e7624f"
    }
  },
  data() {
    return {
      // isActive: "true"
    };
  },
  computed: {
    isActive() {
      // console.log("computed", this.$route);
      return this.$route.path.indexOf(this.path) != -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    }
  },
  methods: {
    itemClick() {
      // console.log(this.$router);
      // console.log("methods", this.$route);
      this.$router.replace(this.path);
    }
  }
};
</script>

<style scope>
.tabbar-item {
  flex: 1;
  text-align: center;
  height: 100%;
  font-size: 14px;
}
.tabbar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
}
.active {
  color: #e7624f;
}
</style>