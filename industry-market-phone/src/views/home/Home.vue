<!--  -->
<template lang='html'>
  <w-container>
    <home-comp ref="homeContainer"></home-comp>
  </w-container>
</template>
<script>
import { mapGetters } from 'vuex';
import Utils from '@/common/Utils';
import HomeComp from './components/HomeComp.vue';
import indexService from '@/services/index.service';
import { USER_ROLE } from '@/common/Constants';

export default {
  data() {
    return {
    };
  },
  created() {},
  mounted() {
    // 自动登录存储userid有延时, 故这里延时加载
    setTimeout(() => {
      Utils.showLoading();
      this.getData();
      if (this.role !== USER_ROLE.manager) {
        this.getOtherData();
      }
    }, 300);
  },
  components: {
    HomeComp,
  },
  computed: {
    ...mapGetters('user', {
      refreshView: 'refreshView',
      role: 'role',
      homeScrollTop: 'homeScrollTop',
    }),
  },
  activated() {
    this.$nextTick(() => {
      this.$refs.homeContainer.updateScrollTop(this.homeScrollTop);
    });
  },
  watch: {
    refreshView() {
      if (this.refreshView !== '/market/home') return;
      this.refresh();
    },
  },
  methods: {
    scrollTop() {
      this.$store.commit('user/updateHomeScrollTop', 0);
      this.$refs.homeContainer && this.$refs.homeContainer.scrollTop();
    },
    refresh() {
      this.$nextTick(() => {
        this.scrollTop();
      });

      this.getData();
      if (this.role !== USER_ROLE.manager) {
        this.getOtherData();
      }
      this.$store.commit('user/updateRefreshView', '');
    },
    // 获取首页第一屏数据
    async getData() {
      const result = await indexService.getIndexData({ userid: Utils.getUserId(this) });
      if (!result) return;
      Utils.hideLoading();
      this.$refs.homeContainer && this.$refs.homeContainer.updateFirstData(result);
    },
    // 获取首页第二屏数据
    async getOtherData() {
      const result = await indexService.getIndexOtherData({ userid: Utils.getUserId(this) });
      if (!result) return;
      this.$refs.homeContainer && this.$refs.homeContainer.updateOtherData(result);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>