<!-- 搜索框 -->
<template lang='html'>
  <div class="w-search-bar">
    <div class="search-content"  ref="searchView" @click.stop="onInputClick()">
      <w-input type="search" :disabled="disabled" v-model="keywords"
        :placeholder="placeholder" @keyup.enter.native="startSearch()"/>
      <i class="iconfont icon-search"></i>
      <slot name="right-icon"></slot>
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
    if (this.$refs.searchView) {
      this.inputWidth = this.$refs.searchView.offsetWidth;

      this.$nextTick(() => {
        if (this.$refs.searchView) {
          this.inputWidth = this.$refs.searchView.offsetWidth;
        }
        this.inputTransition = 'all .3s ease';
      });
    }
  },
  components: {},
  methods: {
    onInputClick() {
      if (!this.disabled) return;
      this.$emit('input-click');
    },
    inputFocus() {
    },
    inputBlur() {
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
      default: '输入您想搜索的产品',
    },
    disabled: { // input 是否是 disabled 状态
      type: Boolean,
      default: false,
    },
    showScan: { // 是否显示扫描图标
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variable.scss';

.w-search-bar {
  width: 100%;
  height: .44rem;
  // background: #fff;
  position: relative;
  padding-top: .09rem;
  color: #333;

  .search-content {
    background: #f5f5f5;
    height: .26rem;
    line-height: .26rem;
    // border: 1px solid $color-line;
    border-radius: .05rem;
    display: flex;
    transition: all .3s ease;
  }

  .iconfont {
    width: .25rem;
    font-size:  18px;
    flex-shrink: 0;
    display: block;
    color: #b9b9b9;
  }

  input {
    flex: 1;
    width: 100%;
    height: .26rem;
    border: 0;
    background: transparent !important;
    font-size: 12px;
    display: block;
    padding-left: .1rem;
  }

  .txt {
    min-width: .4rem;
    height: .44rem;
    color: $color-default;
    border: 0;
    background: #fff;
    flex-shrink: 0;
    font-size:  14px;
    padding: 0 .1rem;
  }
}
</style>