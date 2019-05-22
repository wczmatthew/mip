<!-- tabbar 根目录 -->
<template lang='html'>
  <div class="w-container">
    <div class="w-content">
     <router-view></router-view>
    </div>
    <div class="w-footer w-tabbar">
      <div class="item" v-for="(item, index) in tablist" :key="index"
      :class="{'actived': activeIndex == index}" @click="onChangeTab(index, item)">
        <i class="iconfont" :class="[item.icon]"></i>
        <p>{{item.title}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tablist: [
        { title: '首页', icon: 'icon-index', path: '/index' },
        { title: '导购页', icon: 'icon-daogou', path: '/guide' },
      ],
      activeIndex: 0,
    };
  },
  created() {},
  mounted() {
    this.initTabActive();
  },
  components: {},
  methods: {
    initTabActive() {
      const path = this.$route.path;
      const index = this.tablist.findIndex(tab => tab.path.includes(path));
      console.log(index);
      this.activeIndex = index < 0 ? 0 : index;
    },
    onChangeTab(index, item) {
      this.activeIndex = index;

      this.$router.push(item.path);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>