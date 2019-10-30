<!-- 客户列表 -->
<template lang='html'>
  <w-container show-header show-back>
    <!-- 顶部栏 -->
    <template #header-mid>
      <w-search class="search" show-scan @search="toSearch" ref="search"></w-search>
    </template>
    <!-- 顶部栏 end -->

    <template #header-other>
      <div class="storage-header">
        <div class="row1">
          产品型号
        </div>
        <div class="row2">
          单位
        </div>
        <div class="row2">
          数量
        </div>
      </div>
    </template>

    <storage-list-comp ref="listComp"></storage-list-comp>
  </w-container>
</template>
<script>
import Utils from '@/common/Utils';
import WSearch from '@/components/WSearch.vue';
import StorageListComp from './StorageListComp.vue';

export default {
  data() {
    return {
      routePath: Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'search' }),
      keywords: '',
    };
  },
  created() {
  },
  mounted() {
  },
  components: {
    WSearch,
    StorageListComp,
  },
  methods: {
    // 开始查询
    toSearch({ keywords }) {
      this.keywords = keywords;
      this.$refs.listComp && this.$refs.listComp.onPullingDown(keywords);
    },
  },
};
</script>
<style lang="scss" scoped>
@import './storagelist.scss';
.search {
  padding: .09rem .45rem;
  padding-right: .2rem;
}

</style>