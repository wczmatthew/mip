<!-- 容器 -->
<template lang='html'>
  <div class='w-container'>
    <!-- 顶部 -->
    <header class="w-header" v-if="showHeader" :class="headerClass">
      <i class="iconfont icon-back header-left" v-if="showBack"
        @click="$router.back();"></i>

      <div class="w-header-mid">
        <slot name="header-mid"></slot>
      </div>

      <slot name="header-right"></slot>
    </header>
    <!-- 顶部 end -->

    <!-- 顶部不可滚动区域 -->
    <slot name="header-other"></slot>
    <!-- 顶部不可滚动区域 end -->

    <!-- 中间内容 -->
    <slot name="w-content" v-if="editContent"></slot>
    <div class="w-content w-scroll" v-else>
      <slot></slot>
    </div>
    <!-- 中间内容 end -->

    <!-- 底部 -->
    <footer class="w-footer" :class="footerClass" v-if="showFooter">
      <slot name="w-footer"></slot>
    </footer>
    <!-- 底部 end -->

    <!-- 子页面 -->
    <transition :name="transitionName" mode="in-out">
      <router-view></router-view>
    </transition>
    <!-- 子页面 end -->
  </div>
</template>
<script>
// import Utils from '@/common/Utils';

export default {
  data() {
    return {
      transitionName: '',
      openMenu: false,
      isIos: navigator.userAgent.toLowerCase().indexOf('iphone') >= 0, // 判断是否为ios
      scrollView: null, // 滚动区域
      scrollContentHeight: 0, // 滚动区域内容高度
    };
  },
  // watch $route 决定使用哪种过渡
  watch: {
    '$route'(to, from) {
      const toDepth = to.path.split('/').length;
      let fromDepth = from.path.split('/').length;
      if (to.path === '/') {
        this.transitionName = 'slide-left';
        return;
      }

      fromDepth = from.path === '/' ? toDepth + 1 : fromDepth;

      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    },
  },
  created() {},
  mounted() {},
  components: {},
  methods: {},
  props: {
    showBack: { // 是否显示返回键
      type: Boolean,
      default: false,
    },
    showHeader: { // 是否显示顶部栏
      type: Boolean,
      default: false,
    },
    headerClass: {
      type: String,
      default: '',
    },
    showFooter: { // 是否显示底部
      type: Boolean,
      default: false,
    },
    editContent: { // 是否自定义content
      type: Boolean,
      default: false,
    },
    footerClass: { // 底部栏样式
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style lang="scss">
</style>