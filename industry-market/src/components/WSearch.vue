<!-- 搜索框 -->
<template lang='html'>
  <div class="w-search-bar">
    <div class="search-view" ref="searchView">
      <div class="search-content" @click.stop="onInputClick()">
        <i class="iconfont icon-search"></i>
        <input type="search" :disabled="disabled" v-model="keywords"
          :placeholder="placeholder" @keyup.enter="startSearch()">
        <slot name="right-icon"></slot>
        <div class="scan" @click.stop="onScan()" v-if="showScan">
          <i class="iconfont icon-scan"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Utils from '@/common/Utils';

export default {
  data() {
    return {
      marginRight: '0',
      keywords: '',
      inputWidth: 0,
      inputTransition: 'none',
      isLoading: false,
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
    stopProp() {}, // 阻止事件冒泡
    onInputClick() {
      if (!this.disabled) return;
      this.$emit('input-click');
    },
    onScan() {
      try {
        // eslint-disable-next-line
        native_listen('scan');
      } catch (error) {
        Utils.showToast('扫描异常, 请联系管理员');
        // console.log('error: ', error);
      }
    },
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
      // 防止重复点击页面刷新
      if (this.isLoading) return;
      this.isLoading = true;
      // 关闭键盘
      Utils.nativeCloseKeyboard();
      this.$emit('search', { keywords: this.keywords });
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
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
    showScan: { // 是否显示扫描图标
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

  .scan {
    width: .3rem;
    height: 100%;
    position: relative;
    overflow: hidden;
    text-align: right;
    display: flex;
    align-items: center;

    input[type=file] {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
      font-size: 12rem;
      height: 100%;
      width: 100%;
      opacity: 0;
    }
  }
}

.w-search-bar .search-view .search-content {
  background: rgba($color: #fff, $alpha: 0.6);
  width: 100%;
  padding-right: 0;
  padding-left: .05rem;
}

.w-search-bar .search-view .icon-scan {
  width: .3rem;
  text-align: right;
  padding-right: .05rem;
}
</style>