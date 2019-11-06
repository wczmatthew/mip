<!-- 库存信息 -->
<template lang='html'>
  <w-container show-header show-back>
    <!-- 顶部栏 -->
    <template #header-mid>
      库存信息
    </template>
    <template #header-right>
      <div class="header-right" @click="toSearch()">
        <i class="iconfont icon-search"></i>
      </div>
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

    <!-- 正文内容 -->

    <storage-list-comp ref="storageList"></storage-list-comp>
    <!-- 正文内容 end -->
  </w-container>
</template>
<script>
import { mapGetters } from 'vuex';
import Utils from '@/common/Utils';
import StorageListComp from './StorageListComp.vue';

export default {
  data() {
    return {
      routePath: Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'storageList' }), // 获取当前路由
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.$refs.storageList && this.$refs.storageList.onPullingDown();
    });
  },
  watch: {
    '$route'(to) {
      if (to.path !== this.routePath) return;
      if (!this.editStorageItem) return;
      this.$refs.storageList && this.$refs.storageList.checkItemChange(this.editStorageItem);
    },
  },
  computed: {
    ...mapGetters('storage', {
      editStorageItem: 'editStorageItem',
    }),
  },
  components: {
    StorageListComp,
  },
  methods: {
    toSearch() {
      this.$router.push(`${this.routePath}/search`);
    },
  },
};
</script>
<style lang="scss" scoped>
@import './storagelist.scss';
</style>