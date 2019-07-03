<!-- tabbar 根目录 -->
<template lang='html'>
  <w-container showFooter>
    <!-- 首页 -->
    <home v-show="active == 'home'"></home>
    <!-- 首页 end -->

    <!-- 智能搜索 -->
    <product-category-tab v-show="active == 'category'"></product-category-tab>
    <!-- 智能搜索 end -->

    <!-- 智能设计 -->
    <!-- <product-shelf v-show="active == 'guide'"></product-shelf> -->
    <guide v-show="active == 'guide'"></guide>
    <!-- 智能设计 end -->

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

    <!-- 快捷导航悬浮窗 -->
    <div class="float-nav" v-show="isShowNav">
      <div class="nav-list" :class="{'open': isOpenNav}">
        <!-- <div class="nav-icon icon icon1" @click.stop="toChat()">
          <i class="iconfont icon-chat"></i>
          <p>洽谈</p>
        </div> -->

        <div class="nav-icon icon icon1" @click.stop="toChangeCustomer()">
          <i class="iconfont icon-exchange-user"></i>
          <p>更换客户</p>
        </div>

        <div class="nav-icon icon icon2" @click.stop="toIndex()">
          <i class="iconfont icon-shouye"></i>
          <p>首页</p>
        </div>

        <div class="nav-icon icon icon3" @click.stop="toGuide()">
          <i class="iconfont icon-daogou"></i>
          <p>展区导购</p>
        </div>

        <div class="nav-icon icon icon4" @click.stop="toCategory()">
          <i class="iconfont icon-fenlei"></i>
          <p>类别</p>
        </div>

        <div class="nav-icon icon icon5" @click.stop="toSearch()">
          <i class="iconfont icon-search"></i>
          <p>搜索</p>
        </div>

        <div class="nav-icon" @click.stop="onToggleNav()">
          <transition name="fade">
            <i class="iconfont icon-quick-nav" v-if="!isOpenNav"></i>
            <i class="iconfont icon-close" v-else></i>
          </transition>
          <p>导航</p>
        </div>
      </div>
    </div>
    <!-- 快捷导航悬浮窗 end -->

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
import Utils from '@/common/Utils';
import Home from './Home.vue';
import Guide from './Guide.vue';
import CartTab from '../cart/CartTab.vue';
import CustomerTab from '../customers/CustomerTab.vue';
// import OrderListTab from '../order/OrderListTab.vue';
import ProductCategoryTab from '../products/ProductCategoryTab.vue';
// import ProductShelf from '../products/ProductShelf.vue';
import My from '../my/My.vue';
import { setTimeout } from 'timers';

export default {
  data() {
    return {
      tablist: [
        { title: '首页', icon: 'icon-index', tab: 'home' },
        { title: '智能设计', icon: 'icon-daogou', tab: 'guide' },
        { title: '智能搜索', icon: 'icon-fenlei', tab: 'category' },
        { title: '商机记录', icon: 'icon-customers', tab: 'customer' },
        // { title: '订单进度', icon: 'icon-wenjianguanli', tab: 'order' },
        { title: '购物单', icon: 'icon-gouwuche', tab: 'cart' },
        { title: '我的', icon: 'icon-my', tab: 'my' },
      ],
      active: 'home',
      isOpenNav: false,
      isShowNav: true,
      notShowNavPath: [], // 不需要显示的快捷导航的页面路径
    };
  },
  watch: {
    '$route'(to) {
      if (this.isOpenNav) {
        this.isOpenNav = false;
      }

      this.notShowNavPath = [ // 不需要显示的快捷导航的页面路径
        Utils.getCurrentPath({ fullPath: to.path, currentPath: 'customerNew' }),
        Utils.getCurrentPath({ fullPath: to.path, currentPath: 'customerEdit' }),
        Utils.getCurrentPath({ fullPath: to.path, currentPath: 'chat' }),
        Utils.getCurrentPath({ fullPath: to.path, currentPath: 'customers' }),
      ];

      const index = this.notShowNavPath.findIndex(item => item === to.path);

      if (index > -1) {
        this.isShowNav = false;
      } else if (!this.isShowNav) {
        this.isShowNav = true;
      }

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
    ProductCategoryTab,
    Guide,
    Home,
    CartTab,
    CustomerTab,
    // OrderListTab,
    My,
    // ProductShelf,
  },
  methods: {
    onToggleNav() {
      this.isOpenNav = !this.isOpenNav;
    },
    toIndex() {
      if (this.$route.path === '/market' && this.$route.query.tab === 'home') return;
      this.$router.push('/market?tab=home');
    },
    // 智能设计
    toGuide() {
      if (this.$route.path === '/market' && this.$route.query.tab === 'guide') return;
      this.$router.push('/market?tab=guide');
    },
    // 更换选择的客户
    toChangeCustomer() {
      const path = Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'market/customerSearch' }); // 获取当前路由
      if (this.$route.path === path) {
        // 客户搜索界面
        this.$router.back();
        setTimeout(() => {
          this.$router.push(`${this.$route.path}/customers`);
        }, 100);
        return;
      }
      this.$router.push(`${this.$route.path}/customers`);
    },
    // 跟客户进行洽谈
    toChat() {
      this.$router.push(`${this.$route.path}/chat`);
    },
    // 分类
    toCategory() {
      const path = this.$route.path;
      const searchPath = Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'market' });
      if (path === searchPath && this.$route.query.tab === 'category') return;

      const pathList = this.$route.matched;
      // const index = pathList.findIndex(item => item.path === searchPath);
      // if (index >= 0) {
      //   // 浏览历史记录有分类界面, 直接返回这一页
      //   const goIndex = index - pathList.length + 1;
      //   this.$router.go(goIndex);
      //   return;
      // }

      // 未进入过分类界面, 直接进入分类界面
      if (pathList.length > 1) {
        this.$router.go(-(pathList.length - 1));
        setTimeout(() => {
          if (this.$route.query.tab === 'category') return;
          this.$router.push('/market?tab=category');
        }, 300);
        return;
      }

      this.$router.push('/market?tab=category');
    },
    // 产品列表
    toSearch() {
      // 产品列表
      const path = this.$route.path;
      const searchPath = Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'search' });
      if (path === searchPath) return;

      const pathList = this.$route.matched;
      const index = pathList.findIndex(item => item.path === searchPath);
      if (index >= 0) {
        // 浏览历史记录有产品列表界面, 直接返回这一页
        const goIndex = index - pathList.length + 1;
        this.$router.go(goIndex);
        return;
      }

      // 未进入过产品列表界面, 直接进入产品列表界面
      if (pathList.length > 1) {
        // this.$router.push(`${this.$route.path}/search`);
        this.$router.go(-(pathList.length - 1));
        setTimeout(() => {
          this.$router.push('/market/search');
        }, 300);
        return;
      }

      this.$router.push(`${this.$route.path}/search`);
      // this.$router.push('/market/search');
    },
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
}

.float-nav {
  position: fixed;
  right: .1rem;
  bottom: 28vh;
  z-index: 99;
}

.nav-list {
  position: relative;
  width: .25rem;
  height: .25rem;
  .nav-icon {
    position: absolute;
    right: 0;
    top: 0;
    width: .3rem;
    height: .3rem;
    border-radius: .3rem;
    @include flex-center;
    // @include background-left-gradient($color-gradient1, $color-gradient2);
    background: rgba($color: #000, $alpha: .6);
    flex-direction: column;
    color: #fff;
    overflow: hidden;

    .iconfont {
      font-size: .15rem;
    }

    .icon-close {
      font-size: .14rem;
      font-weight: 700;
      transition: all .3s ease;
      display: block;
    }

    p {
      font-size: 10px;
      margin-top: .02rem;
    }
  } // end nav-icon

  .icon {
    display: none;
  }

  .icon1 {
    top: -188%;
    right: 0;
    // @include background-left-gradient(#20E2D7, #b3ffab);
  } // end icon1

  .icon2 {
    top: -140%;
    right: .35rem;
    // @include background-left-gradient(#ed6ea0, #ec8c69);
  }

  .icon3 {
    top: 0;
    right: .5rem;
    // @include background-left-gradient(#5f72bd, #9b23ea);
  }

  .icon4 {
    top: 140%;
    right: .35rem;
    // @include background-left-gradient(#209cff, #68e0cf);
  }

  .icon5 {
    top: 188%;
    right: 0;
    // @include background-left-gradient(#f794a4, #fdd6bd);
  }

  &.open {
    .icon {
      display: flex;
      animation: scale-animate .5s ease;
    }

    .icon-close {
      transform: rotate(-180deg);
    }
  }

  @keyframes scale-animate {
    0% {
      opacity: 0;
      transform: scale(.5);
    }

    60% {
      opacity: 1;
      transform: scale(1.2)
    }

    100% {
      opacity: 1;
      transform: scale(1)
    }
  }
} // end nav-list
</style>
