<!-- 搜索框 -->
<template lang='html'>
  <div class="w-search-bar">
    <div class="search-view" ref="searchView">
      <div class="search-content">
        <i class="iconfont icon-search"></i>
        <input type="search" :disabled="disabled" v-model="keywords"
          :placeholder="placeholder" @keyup.enter="startSearch()">
        <slot name="right-icon"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      marginRight: '0',
      keywords: '',
      inputWidth: 0,
      inputTransition: 'none',
    };
  },
  created() {
  },
  mounted() {
    this.marginRight = '.12rem';
    this.inputWidth = this.$refs.searchView.offsetWidth;

    this.$nextTick(() => {
      this.inputWidth = this.$refs.searchView.offsetWidth;
      this.inputTransition = 'all .3s ease';
    });
  },
  components: {},
  methods: {
    inputFocus() {
      // this.btnRight = '0';
      // this.marginRight = '0';
      // this.$nextTick(() => {
      //   this.inputWidth = this.$refs.searchView.offsetWidth - this.$refs.searchBtn.offsetWidth;
      // });
    },
    inputBlur() {
      // this.btnRight = this.keywords ? '0' : '-.4rem';
      // this.marginRight = !this.keywords ? '.12rem' : '0';
      // this.$nextTick(() => {
      //   this.inputWidth = !this.keywords && this.$refs.searchView ? this.$refs.searchView.offsetWidth : this.inputWidth;
      // });
    },
    updateKeywords(keywords) {
      this.keywords = keywords;
    },
    /**
     * 开始搜索
     */
    startSearch() {
      this.$emit('search', { keywords: this.keywords });
    },
  },
  props: {
    placeholder: { // input 的空提示文字
      type: String,
      default: '搜索',
    },
    disabled: { // input 是否是 disabled 状态
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/components/searchbar.scss';

.w-search-bar::after {
  display: none;
}

.w-search-bar .search-view {
  margin-left: 0;
  margin-right: 0;
}

.w-search-bar .search-view .search-content {
  background: rgba($color: #fff, $alpha: 0.5);
  width: 100%;
  padding-right: 0;
}
</style>