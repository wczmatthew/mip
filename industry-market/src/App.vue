<template>
  <div id="app">
    <!-- 使用动态的 transition name -->
    <transition :name="transitionName" mode="in-out">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Utils from '@/common/Utils';

export default {
  data() {
    return {
      transitionName: '',
      loading: false,
    };
  },
  // watch $route 决定使用哪种过渡
  watch: {
    '$route'(to, from) {
      if (to.path.indexOf('/index') >= 0) {
        this.transitionName = 'slide-right-half';
      } else {
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        this.transitionName = toDepth < fromDepth ? 'slide-right-half' : 'slide-left-half';
      }
    },
  },
  created() {},
  mounted() {
    window.marketingCallback = (type, data) => {
      // eslint-disable-next-line
      // alert('callback: ' + type);
      if (type === 'barcode') {
        // 条码
        this.toProductList(data);
      } else if (type === 'barcodeDetail') {
        // 产品详情页
        this.toDetail(data);
      } else if (type === 'businessCard') {
        // 名片
      }
    };
    // this.$store.dispatch('category/getSortList');
  },
  components: {},
  methods: {
    // 产品详情界面
    toDetail(bm) {
      // const productPath = Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'detail' });

      // if (productPath && this.$route.path === productPath) {
      //   // 在产品列表页面, 扫描完成后重新搜索
      //   this.$store.commit('product/updateProductDetail', { isUpdate: true, bm });
      //   return;
      // }

      // const pathList = this.$route.matched;
      // const index = pathList.findIndex(item => item.path === productPath);
      // if (index >= 0) {
      //   // 浏览历史记录有该界面, 直接返回这一页
      //   const goIndex = index - pathList.length + 1;
      //   this.$router.go(goIndex);
      //   this.$store.commit('product/updateProductDetail', { isUpdate: true, bm });
      //   return;
      // }
      this.$router.push(`${this.$route.path}/detail?bm=${bm}`);
    },
    // 进入产品列表
    toProductList(keywords) {
      this.$store.commit('product/updateKeywords', keywords);
      const productPath = Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'productList' });

      if (productPath && this.$route.path === productPath) {
        // 在产品列表页面, 扫描完成后重新搜索
        return;
      }

      const pathList = this.$route.matched;
      const index = pathList.findIndex(item => item.path === productPath);
      if (index >= 0) {
        // 浏览历史记录有该界面, 直接返回这一页
        const goIndex = index - pathList.length + 1;
        this.$router.go(goIndex);
        return;
      }

      // 没有历史记录进入查询页面
      this.$router.push(`${this.$route.path}/productList`);
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/font/iconfont.css';
@import '~@/styles/common.css';
@import '~@/styles/cube.scss';
@import '~@/styles/variable.scss';

b {
  font-weight: 700;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.slide-up-enter, .slide-down-leave-active {
  opacity: 0;
  -webkit-transform: translate(0, 30%);
  transform: translate(0, 30%);
}
.slide-up-leave-active, .slide-down-enter {
  opacity: 0;
  -webkit-transform: translate(0, 30%);
  transform: translate(0, 30%);
}

.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}

.slide-left-half-enter, .slide-right-half-leave-active {
  opacity: 0;
  -webkit-transform: translate(30%, 0);
  transform: translate(30%, 0);
}
.slide-left-half-leave-active, .slide-right-half-enter {
  opacity: 0;
  -webkit-transform: translate(30%, 0);
  transform: translate(30%, 0);
}

.mint-indicator {
  position: relative;
  z-index: 99;
}

.mint-toast {
  max-width: 90%;
  width: max-content;
}
</style>
