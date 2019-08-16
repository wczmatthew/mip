<!-- tabbar 根目录 -->
<template lang='html'>
  <w-container showFooter>
    <!-- 首页 -->
    <home v-show="active == 'home'"></home>
    <!-- 首页 end -->

    <!-- 产品分类 -->
    <product-category-tab v-show="active == 'category'"></product-category-tab>
    <!-- 产品分类 end -->

    <!-- 购物车 -->
    <cart-tab v-show="active == 'cart'" ref="cart" current-path="/market"></cart-tab>
    <!-- 购物车 end -->

    <!-- 活动 -->
    <activity v-show="active == 'gift'"></activity>
    <!-- 活动 end -->


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
        <i class="iconfont" :class="[item.icon]" v-if="item.tab != 'home'">
          <i class="num" v-if="item.tab === 'cart'">1</i>
        </i>
        <p v-if="item.tab != 'home'">{{item.title}}</p>
      </div>
    </div>
  </w-container>
</template>
<script>
import Home from './Home.vue';
import CartTab from '../cart/CartTab.vue';
import Activity from '../activity/Activity.vue';
import My from '../my/My.vue';
import ProductCategoryTab from '../products/ProductCategoryTab.vue';

export default {
  data() {
    return {
      tablist: [
        { title: '首页', icon: 'icon-shouye', tab: 'home' },
        { title: '产品分类', icon: 'icon-cgdh', tab: 'category' },
        { title: '活动', icon: 'icon-gift', tab: 'gift' },
        { title: '购物车', icon: 'icon-gouwuche', tab: 'cart' },
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
    Home,
    CartTab,
    Activity,
    ProductCategoryTab,
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
  overflow: visible;

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

  .item {
    .iconfont {
      position: relative;

      .num {
        background: $color-red;
        color: #fff;
        min-width: .15rem;
        height: .15rem;
        line-height: .15rem;
        border-radius: .15rem;
        position: absolute;
        top: -.02rem;
        left: 58%;
        font-size: .1rem;
        z-index: 10;
        padding: 0 .02rem;
      }
    }
  }
}
</style>