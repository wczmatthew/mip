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
    }),
  },
  watch: {
    refreshView() {
      if (this.refreshView !== '/market/home') return;
      this.refresh();
    },
  },
  methods: {
    scrollTop() {
      this.$refs.homeContainer && this.$refs.homeContainer.scrollTop();
    },
    refresh() {
      this.getData();
      if (this.role !== USER_ROLE.manager) {
        this.getOtherData();
      }
      this.scrollTop();
      this.$store.commit('user/updateRefreshView', '');
    },
    // 获取首页第一屏数据
    async getData() {
      const result = await indexService.getIndexData({ userid: Utils.getUserId(this) });
      if (!result) return;
      Utils.hideLoading();
      this.$refs.homeContainer && this.$refs.homeContainer.updateFirstData(result);
      // this.banners = result.banner || [];
      // this.categoryList = result.category || [];
      // this.news = result.news || {};
      // this.buyingProducts = result.buyingProducts || null;
      // this.midAds = result.midAds || {};
      // if (this.buyingProducts && this.buyingProducts.endDate) {
      //   this.endDate = Utils.dateFormat(new Date(this.buyingProducts.endDate), 'yyyy-MM-dd HH:mm:ss');

      //   this.timer && clearInterval(this.timer);
      //   this.timer = setInterval(this.calcTime, 1000);
      // }
      // this.$nextTick(() => {
      //   this.$refs.slide && this.$refs.slide.refresh();
      //   this.$refs.newsSlide && this.$refs.newsSlide.refresh();
      // });
    },
    // 获取首页第二屏数据
    async getOtherData() {
      const result = await indexService.getIndexOtherData({ userid: Utils.getUserId(this) });
      if (!result) return;
      this.$refs.homeContainer && this.$refs.homeContainer.updateOtherData(result);

      // this.hotSaleProList = result.hotSaleList || [];
      // this.otherProdList = result.otherList || [];
      // // this.generalProList = [...result.generalProList];

      // this.hotPro1 = this.hotSaleProList.length > 0 ? this.hotSaleProList[0] : {};
      // this.hotPro2 = this.hotSaleProList.length > 1 ? this.hotSaleProList[1] : {};
      // this.hotPro3 = this.hotSaleProList.length > 2 ? this.hotSaleProList[2] : {};
      // this.hotPro4 = this.hotSaleProList.length > 3 ? this.hotSaleProList[3] : {};
      // this.hotPro5 = this.hotSaleProList.length > 4 ? this.hotSaleProList[4] : {};
    },
  },
};
</script>
<style lang="scss" scoped>
</style>