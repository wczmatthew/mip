<template>
  <div id="app">
    <!-- 使用动态的 transition name -->
    <transition :name="transitionName" mode="in-out">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transitionName: '',
      isFirstEnter: true,
      filterUrls: [
        '/register',
      ],
    };
  },
  // watch $route 决定使用哪种过渡
  watch: {
    '$route'(to, from) {
      if (to.path.indexOf('/index') >= 0) {
        this.transitionName = 'slide-right-half';
      } else if (to.path === '/market') {
        this.transitionName = 'none';
      } else {
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        this.transitionName = toDepth < fromDepth ? 'slide-right-half' : 'slide-left-half';
      }
    },
  },
  created() {},
  mounted() {
  },
  components: {},
  methods: {
  },
};
</script>

<style lang="scss">
@import '~@/styles/font/iconfont.css';
@import '~@/styles/common.css';
@import '~@/styles/cube.scss';

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
