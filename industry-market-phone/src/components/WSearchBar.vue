<!-- 搜索框 -->
<template lang='html'>
  <div class="w-search-bar">
    <div class="search-view" ref="searchView"
      :style="{'margin-right': marginRight}">
      <div class="search-content" :style="{'width': inputWidth + 'px', transition: inputTransition}">
        <i class="iconfont icon-search-l"></i>
        <w-input type="text" :disabled="disabled" v-model="keywords"
          :placeholder="placeholder" @focus.native="inputFocus" @blur="inputBlur"/>
      </div>
      <button class="txt" ref="searchBtn" @click="startSearch">搜索</button>
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
      this.marginRight = '0';
      this.$nextTick(() => {
        this.inputWidth = this.$refs.searchView.offsetWidth - this.$refs.searchBtn.offsetWidth;
      });
    },
    inputBlur() {
      // this.btnRight = this.keywords ? '0' : '-.4rem';
      this.marginRight = !this.keywords ? '.12rem' : '0';
      this.$nextTick(() => {
        this.inputWidth = !this.keywords && this.$refs.searchView ? this.$refs.searchView.offsetWidth : this.inputWidth;
      });
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
      default: '输入用户名称/公司/部门可进行快速查找',
    },
    disabled: { // input 是否是 disabled 状态
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
@import url('~@/styles/components/searchbar.scss');
</style>