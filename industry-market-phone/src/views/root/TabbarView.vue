<!-- tabbar 根目录 -->
<template lang='html'>
  <div class="w-container">
    <div class="w-content">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
    <div class="w-footer w-tabbar" v-show="showTabbar">
      <div class="item" v-for="(item, index) in tablist" :key="index"
      :class="{'actived': $route.path == item.url}"
      @click="onChangeTab(index, item)">
        <template v-if="item.url == '/market/index/home'">
          <div class="tab-icon" v-if="$route.path == item.url">
            <img src="~@/assets/common/c.png" alt="" class="">
          </div>
          <i class="iconfont" :class="[item.icon]" v-if="$route.path != '/market/index/home'"></i>
          <p v-if="$route.path != '/market/index/home'">{{item.title}}</p>
        </template>
        <template v-else>
          <i class="iconfont" :class="[item.icon]">
            <i class="num" v-if="item.url == '/market/index/cart' && cartNum > 0">{{cartNum}}</i>
          </i>
          <p>{{item.title}}</p>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
// import Home from '../home/Home.vue';
// import CartTab from '../cart/CartTab.vue';
// import Activity from '../activity/Activity.vue';
// import My from '../my/My.vue';
// import ProductCategoryTab from '../products/ProductCategoryTab.vue';
// import AnalyzeView from '../common/AnalyzeView.vue';

export default {
  data() {
    return {
      tablist: [
        {
          title: '首页',
          icon: 'icon-shouye',
          url: '/market/index/home',
          doubleRefresh: true,
        },
        { title: '分类', icon: 'icon-cgdh', url: '/market/index/categoryTab' },
        {
          title: '发现',
          icon: 'icon-faxian1',
          url: '/market/activity',
          doubleRefresh: true,
        },
        { title: '购物单', icon: 'icon-gouwuche', url: '/market/index/cart' },
        { title: '我的', icon: 'icon-my', url: '/market/index/my' },
      ],
      active: 'home',
      clickNum: 0,
      timer: null,
      fromPath: '',
      showTabbar: true,
    };
  },
  watch: {
    '$route'(to, from) {
      this.checkTabbar();
      // console.log('route from: ', this.fromPath);

      if (to.path === '/market' && from.path === '/market/frame') {
        // iframe里面路由的变化会影响到整体路由, 所以从这个页面返回需要替换下路径
        window.history.pushState(null, null, window.location.href);
      }
    },
    userId() {
      this.$store.dispatch('user/getCartNum');
    },
  },
  computed: {
    ...mapGetters('user', {
      cartNum: 'cartNum',
      userId: 'userId',
    }),
  },
  created() {},
  mounted() {
    this.checkTabbar();
    if (this.userId) {
      this.$store.dispatch('user/getCartNum');
    }
    this.$store.dispatch('keywords/getHotKeywordList');
    this.$store.dispatch('user/getErweima');
  },
  components: {
    // Home,
    // CartTab,
    // Activity,
    // ProductCategoryTab,
    // My,
    // AnalyzeView,
  },
  methods: {
    checkTabbar() {
      // const toPathLength = path.split('/').length;
      this.showTabbar = this.$route.meta.isTabbar;

      if (this.showTabbar && this.userId) {
        this.$store.dispatch('user/getCartNum');
      }
    },
    onChangeTab(index, item) {
      // 判断是否是双击
      this.clickNum += 1;
      if (this.clickNum > 1) {
        this.refreshViews();
        return;
      }

      this.timer = setTimeout(() => {
        this.clickNum = 0;
      }, 300);

      if (this.$route.path === item.url) {
        // 滚动到顶部
        return;
      }
      this.$router.push(item.url);
      window.history.pushState(null, null, document.URL);
      // if (item.tab === 'category') {
      //   this.$refs[item.tab] && this.$refs[item.tab].scrollTop();
      //   this.$refs[item.tab] && this.$refs[item.tab].getSortList();
      // }
    },
    refreshViews() {
      this.clickNum = 0;
      this.$store.commit('user/updateRefreshView', true);
      // if (item.doubleRefresh) {
      //   this.$refs[item.tab] && this.$refs[item.tab].refresh();
      //   // this.$refs.home && this.$refs.home.refresh();
      // }
    },
  },
};
</script>
<style lang="scss" scoped>

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
        font-size: 10px;
        z-index: 10;
        padding: 0 .02rem;
      }
    }
  }
}
</style>