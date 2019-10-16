<!-- 首页预览 -->
<template lang='html'>
  <home-comp ref="homeContainer" mode="prev"></home-comp>
</template>
<script>
import Utils from '@/common/Utils';
import indexService from '@/services/index.service';
import HomeComp from './components/HomeComp.vue';

export default {
  data() {
    return {
    };
  },
  created() {},
  mounted() {
    this.getData();
  },
  components: {
    HomeComp,
  },
  computed: {
  },
  methods: {
    // 获取首页第一屏数据
    async getData() {
      Utils.showLoading();
      const result = await indexService.getIndexPrevData(this.$route.query.corpid);
      if (!result) return;
      Utils.hideLoading();
      this.$refs.homeContainer && this.$refs.homeContainer.updateFirstData(result);
      this.$refs.homeContainer && this.$refs.homeContainer.updateOtherData(result);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>