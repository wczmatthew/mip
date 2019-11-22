<!-- tabbar 根目录 -->
<template lang='html'>
  <div class="w-container">
    <div class="w-content">
      <transition-group :name="transitionName" mode="in-out">
        <div class="w-container" key="a">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
        </div>
        <router-view v-if="!$route.meta.keepAlive" key="b"></router-view>
      </transition-group>
    </div>

    <w-tabbar v-show="showTabbar"></w-tabbar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import WTabbar from '@/components/WTabbar.vue';

export default {
  data() {
    return {
      showTabbar: true,
      transitionName: '',
    };
  },
  watch: {
    '$route'(to, from) {
      this.checkTabbar();

      if (to.meta.isTabbar) {
        window.history.pushState(null, null, document.URL);
      }

      if (to.path === '/market' && from.path === '/market/frame') {
        // iframe里面路由的变化会影响到整体路由, 所以从这个页面返回需要替换下路径
        window.history.pushState(null, null, window.location.href);
      }

      if (to.meta.isTabbar) {
        this.transitionName = 'slide-left-half';
      } else if (from.meta.isTabbar) {
        this.transitionName = 'slide-right-half';
      } else {
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        this.transitionName = toDepth < fromDepth ? 'slide-right-half' : 'slide-left-half';
      }

      // console.log('transitionName: ', this.transitionName);
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
    if (this.userId) {
      this.$store.dispatch('user/getCartNum');
    }
    this.checkTabbar();
    this.$store.dispatch('keywords/getHotKeywordList');
    this.$store.dispatch('user/getErweima');
    this.$store.dispatch('user/getUserData');
  },
  components: {
    WTabbar,
    // Home,
    // CartTab,
    // Activity,
    // ProductCategoryTab,
    // My,
    // AnalyzeView,
  },
  methods: {
    checkTabbar() {
      if (this.$route.meta.isTabbar && !this.showTabbar) {
        setTimeout(() => {
          this.showTabbar = true;
        }, 300);
        return;
      }
      this.showTabbar = this.$route.meta.isTabbar;

      if (this.showTabbar && this.userId) {
        this.$store.dispatch('user/getCartNum');
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>