<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      :key="index"
      :class="['tab-control-item', { active: index === currentIndex }]"
      @click="tabControlItemClick(index)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      defalut: [],
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    tabControlItemClick(index) {
      this.currentIndex = index;
      this.$emit("tabClick", index);
    },
  },
};
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 40px;
  background-color: #fff;
}
.tab-control-item {
  flex: 1;
  height: 100%;
  line-height: 40px;
}
.tab-control-item span {
  padding: 5px;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 2px solid var(--color-high-text);
}
</style>
