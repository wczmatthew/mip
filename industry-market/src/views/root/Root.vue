<!-- tabbar 根目录 -->
<template lang='html'>
  <w-container showFooter>
    <!-- 首页 -->
    <home v-show="active == 'home'"></home>
    <!-- 首页 end -->

    <!-- 导购页面 -->
    <guide v-show="active == 'guide'"></guide>
    <!-- 导购页面 end -->

    <!-- 购物车 -->
    <cart v-show="active == 'cart'" :show-back="false" ref="cart" current-path="/market"></cart>
    <!-- 购物车 end -->

    <!-- 客户洽谈 -->
    <customer-list v-show="active == 'customer'" :is-tabbar="true" ref="customer" current-path="/market"></customer-list>
    <!-- 客户洽谈 end -->

    <div class="w-tabbar" slot="w-footer">
      <div class="item" v-for="(item, index) in tablist" :key="index"
      :class="{'actived': active == item.tab}" @click="onChangeTab(index, item)">
        <i class="iconfont" :class="[item.icon]"></i>
        <p>{{item.title}}</p>
      </div>
    </div>
  </w-container>
</template>
<script>
import Home from './Home.vue';
import Guide from './Guide.vue';
import Cart from '../cart/Cart.vue';
import CustomerList from '../customers/CustomerList.vue';

export default {
  data() {
    return {
      tablist: [
        { title: '首页', icon: 'icon-index', tab: 'home' },
        { title: '导购页', icon: 'icon-daogou', tab: 'guide' },
        { title: '客户洽谈', icon: 'icon-customers', tab: 'customer' },
        { title: '购物车', icon: 'icon-gouwuche', tab: 'cart' },
      ],
      active: 'home',
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
    Cart,
    CustomerList,
  },
  methods: {
    initTabActive() {
      // const path = this.$route.path;
      // const index = this.tablist.findIndex(tab => tab.path.includes(path));
      // console.log(index);
      this.active = this.$route.query.tab || 'msg';
    },
    onChangeTab(index, item) {
      if (this.active === item.tab) return;
      this.active = item.tab;
      this.$router.push(`/market?tab=${item.tab}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.w-tabbar .item {
  padding-top: .08rem;
}
</style>