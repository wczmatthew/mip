<!-- 商品页面 tabbar -->
<template lang='html'>
  <div class="w-sort-list">
    <div class="item" v-for="(item, index) in tabList" :key="index" @click="onSelect(item)" :class="{'actived': item.sort != 'none'}">
      <span>
        {{ item.name }}
      </span>
      <i class="iconfont" :class="{'icon-falling': item.sort == 'desc', 'icon-ascend': item.sort == 'asc'}" v-if="item.sort != 'none'"></i>
    </div>
    <div class="item icon-item" @click="changeListType()">
      <i class="iconfont" :class="[listType == 'list' ? 'icon-liebiao': 'icon-apps']"></i>
    </div>
    <div class="item icon-item" @click="onShare()">
      <i class="iconfont icon-share2"></i>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      listType: 'list', // list 一行显示, grid: 表格模式
    };
  },
  created() {},
  mounted() {
  },
  components: {},
  methods: {
    onShare() {
      this.$emit('share');
    },
    // 修改列表显示模式
    changeListType() {
      this.listType = this.listType === 'list' ? 'grid' : 'list';
      this.$emit('change-list-type', this.listType);
    },
    // 选择具体内容
    onSelect(item) {
      this.tabList.forEach((tab) => {
        if (tab.name !== item.name) {
          tab.sort = 'none';
        }
      });
      item.sort = item.sort === 'desc' ? 'asc' : 'desc';
      this.$emit('select', item);
    },
  },
  props: {
    tabList: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style lang="scss" scoped>

.w-sort-list .item.actived::after {
  display: none;
}

.w-sort-list .icon-item {
  width: .4rem;
  font-size: 18px;
  flex: none;
}
</style>