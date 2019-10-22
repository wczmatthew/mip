<!-- tabbar 根目录 -->
<template lang='html'>
  <w-container showFooter>
    <!-- 首页 -->
    <home v-show="active == 'home'" ref="home"></home>
    <!-- 首页 end -->

    <!-- 产品分类 -->
    <product-category-tab v-show="active == 'category'" ref="category"></product-category-tab>
    <!-- 产品分类 end -->

    <!-- 购物单 -->
    <cart-tab v-show="active == 'cart'" ref="cart" current-path="/market"></cart-tab>
    <!-- 购物单 end -->

    <!-- 活动 -->
    <activity v-show="active == 'gift'" ref="gift"></activity>
    <!-- 活动 end -->


    <!-- 个人中心 -->
    <my v-show="active == 'my'" ref="my"></my>
    <!-- 个人中心 end -->

    <template #w-footer>
      <div class="w-tabbar">
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
          <template v-else>
            <i class="iconfont" :class="[item.icon]">
              <i class="num" v-if="item.tab === 'cart' && cartNum > 0">{{cartNum}}</i>
            </i>
            <p>{{item.title}}</p>
          </template>
        </div>
      </div>
    </template>
  </w-container>
</template>
<script>
import { mapGetters } from 'vuex';
import Home from '../home/Home.vue';
import CartTab from '../cart/CartTab.vue';
import Activity from '../activity/Activity.vue';
import My from '../my/My.vue';
import ProductCategoryTab from '../products/ProductCategoryTab.vue';

export default {
  data() {
    return {
      tablist: [
        { title: '首页', icon: 'icon-shouye', tab: 'home' },
        { title: '分类', icon: 'icon-cgdh', tab: 'category' },
        { title: '发现', icon: 'icon-faxian1', tab: 'gift' },
        { title: '购物单', icon: 'icon-gouwuche', tab: 'cart' },
        { title: '我的', icon: 'icon-my', tab: 'my' },
      ],
      active: 'home',
      clickNum: 0,
      timer: null,
      fromPath: '',
    };
  },
  watch: {
    '$route'(to, from) {
      this.fromPath = from.path;
      // console.log('route from: ', this.fromPath);

      if (to.path === '/market' && from.path === '/market/frame') {
        // iframe里面路由的变化会影响到整体路由, 所以从这个页面返回需要替换下路径
        window.history.pushState(null, null, window.location.href);
        console.log('123123');
      }

      if (to.path === '/market') {
        this.initTabActive();

        if (this.userId) {
          this.$store.dispatch('user/getCartNum');
        }
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
    this.initTabActive();
    if (this.userId) {
      this.$store.dispatch('user/getCartNum');
    }
    this.$store.dispatch('keywords/getHotKeywordList');
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
      // 判断是否是双击
      this.clickNum += 1;
      if (this.clickNum > 1) {
        this.refreshViews(item);
        return;
      }

      this.timer = setTimeout(() => {
        this.clickNum = 0;
      }, 300);

      if (this.active === item.tab) {
        // 滚动到顶部
        if (item.tab === 'my') return;
        this.$refs[item.tab] && this.$refs[item.tab].scrollTop();
        return;
      }
      this.active = item.tab;
      this.$router.push(`/market?tab=${item.tab}`);
      window.history.pushState(null, null, document.URL);

      if (item.tab === 'category') {
        this.$refs[item.tab] && this.$refs[item.tab].scrollTop();
        this.$refs[item.tab] && this.$refs[item.tab].getSortList();
      }
    },
    refreshViews(item) {
      this.clickNum = 0;
      if (item.tab === 'home') {
        this.$refs.home && this.$refs.home.refresh();
      }
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
        font-size: 10px;
        z-index: 10;
        padding: 0 .02rem;
      }
    }
  }
}
</style>