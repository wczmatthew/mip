<!-- tabbar 根目录 -->
<template lang='html'>
  <w-container showFooter>
    <!-- 首页 -->
    <home v-show="activeIndex == 0"></home>
    <!-- 首页 end -->

    <!-- 导购页面 -->
    <guide v-show="activeIndex == 1"></guide>
    <!-- 导购页面 end -->

    <div class="w-tabbar" slot="w-footer">
      <div class="item" v-for="(item, index) in tablist" :key="index"
      :class="{'actived': activeIndex == index}" @click="onChangeTab(index, item)">
        <i class="iconfont" :class="[item.icon]"></i>
        <p>{{item.title}}</p>
      </div>
    </div>
  </w-container>
</template>
<script>
import Home from './Home.vue';
import Guide from './Guide.vue';

export default {
  data() {
    return {
      tablist: [
        { title: '首页', icon: 'icon-index', tab: 0 },
        { title: '导购页', icon: 'icon-daogou', tab: 1 },
      ],
      activeIndex: 0,
    };
  },
  watch: {
    '$route'(to) {
      if (to.path === '/market') {
        this.initTabActive();
      }
    },
  },
  created() {},
  mounted() {
    this.initTabActive();
  },
  components: {
    Guide,
    Home,
  },
  methods: {
    initTabActive() {
      // const path = this.$route.path;
      // const index = this.tablist.findIndex(tab => tab.path.includes(path));
      // console.log(index);
      this.activeIndex = parseInt(this.$route.query.tab || 0, 10);
    },
    onChangeTab(index, item) {
      this.activeIndex = index;
      this.$router.push(`/market?tab=${item.tab}`);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>