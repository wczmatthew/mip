<!-- tabbar 根目录 -->
<template lang='html'>
  <w-container showFooter>
    <!-- 首页 -->
    <home v-show="active == 'home'"></home>
    <!-- 首页 end -->

    <!-- 导购页面 -->
    <!-- <guide v-show="active == 'guide'"></guide> -->
    <!-- 导购页面 end -->

    <!-- 购物车 -->
    <cart-tab v-show="active == 'cart'" ref="cart" current-path="/market"></cart-tab>
    <!-- 购物车 end -->

    <!-- 客户洽谈 -->
    <customer-tab v-show="active == 'customer'" ref="customer" current-path="/market"></customer-tab>
    <!-- 客户洽谈 end -->

    <!-- 订单管理 -->
    <!-- <order-list-tab v-show="active == 'order'" ref="order" current-path="/market"></order-list-tab> -->
    <!-- 订单管理 end -->

    <!-- 个人中心 -->
    <my v-show="active == 'my'" ref="my"></my>
    <!-- 个人中心 end -->

    <div class="w-tabbar" slot="w-footer">
      <div class="item" v-for="(item, index) in tablist" :key="index"
      :class="{'actived': active == item.tab}"
      @click="onChangeTab(index, item)">
        <template v-if="item.tab == 'home'">
          <div class="tab-icon" v-if="active == item.tab">
            <img src="~@/assets/common/c.png" alt="" class="">
          </div>
          <i class="iconfont" :class="[item.icon]" v-if="active != 'home'"></i>
          <p v-if="active != 'home'">{{item.title}}</p>
        </template>
        <i class="iconfont" :class="[item.icon]" v-if="item.tab != 'home'"></i>
        <p v-if="item.tab != 'home'">{{item.title}}</p>
      </div>
    </div>
  </w-container>
</template>
<script>
import Home from './Home.vue';
// import Guide from './Guide.vue';
import CartTab from '../cart/CartTab.vue';
import CustomerTab from '../customers/CustomerTab.vue';
// import OrderListTab from '../order/OrderListTab.vue';
import My from '../my/My.vue';

export default {
  data() {
    return {
      tablist: [
        { title: '首页', icon: 'icon-shouye', tab: 'home' },
        // { title: '导购页', icon: 'icon-daogou', tab: 'guide' },
        { title: '购物车', icon: 'icon-gouwuche', tab: 'cart' },
        { title: '客户洽谈', icon: 'icon-customers', tab: 'customer' },
        // { title: '订单管理', icon: 'icon-wenjianguanli', tab: 'order' },
        { title: '我的', icon: 'icon-my', tab: 'my' },
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
    // Guide,
    Home,
    CartTab,
    CustomerTab,
    // OrderListTab,
    My,
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
@import '~@/styles/variable.scss';
.w-tabbar {
  background: #fff;

  .tab-icon {
    width: .3rem;
    height: .3rem;
    background: $color-default;
    box-shadow: 0 0 5px $color-default;
    margin: .03rem auto;
    border-radius: .3rem;
    overflow: hidden;
    @include flex-center;

    img {
      width: auto;
      height: 58%;
      margin: 0;
    }
  }
}
</style>