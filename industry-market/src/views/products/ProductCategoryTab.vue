<!-- 产品货架页面 -->
<template lang='html'>
  <div class="w-container">
    <!-- 顶部栏 -->
    <w-header :show-back="false">
      <w-search class="search" slot="header-mid" disabled show-scan @input-click="toSearch()"></w-search>
      <div class="header-right" slot="header-right">
        <w-cart-icon color="blue" currentPath="market"></w-cart-icon>
      </div>
    </w-header>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <div class="product-container">
      <!-- 左侧类目 -->
      <div class="category-list" v-if="menuList && menuList.length">
        <div class="right-line">
          <div class="menu-item" v-for="(item, index) in menuList" :key="index">
            <div class="menu" @click.stop="onChangeShelf(item)" :class="{'actived': selectMenu.sid == item.sid}">
              <span>{{ item.bname }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 左侧类目 end -->

      <!-- 产品列表 -->
      <div class="product-scroll">
        <w-loading-row v-show="loadingShelf"></w-loading-row>
        <no-data v-if="!dataList || !dataList.length"></no-data>
        <cube-scroll-nav
          class="product-scroll"
          v-if="!loadingShelf"
          ref="scroll"
          :side="true"
          :data="dataList"
          :current="current">
          <cube-scroll-nav-panel
            v-for="(item, index) in dataList"
            :key="item.sid + index"
            :label="item.sid + index"
            :title="item.bname">
            <p class="title">
              {{ item.bname }}
            </p>
            <div class="product-list">
              <div class="product-item" v-for="(product, index) in item.childList" :key="product.sid + index" @click.stop="toDetail(product)">
                <div class="img">
                  <w-img :src="product.imgPath"></w-img>
                </div>
                <p>{{product.bname || '标题缺失, 请联系管理员'}}</p>
              </div>
            </div>
          </cube-scroll-nav-panel>
        </cube-scroll-nav>
      </div>
      <!-- 产品列表 end -->
    </div>
    <!-- 正文内容 end -->
  </div>
</template>
<script>
import WSearch from '@/components/WSearch.vue';
// import { mapGetters } from 'vuex';
// import service from '@/services/product.service';
import commonService from '@/services/common.service';
import Utils from '@/common/Utils';

export default {
  data() {
    return {
      menuList: [],
      menuIndex: 0,
      subMenuList: [],
      dataList: [],
      current: '',
      bnr: '',
      selectMenu: {},
      loadingShelf: false,
      routePath: '/market', // 获取当前路由
    };
  },
  created() {},
  mounted() {
    this.$store.commit('product/updateKeywords', '');
    this.getSortList();
  },
  watch: {
    '$route'(to) {
      if (to.path === 'market' && to.query.tab === 'category') {
        // 返回到当前界面
        this.$store.commit('product/updateKeywords', '');
      }
    },
  },
  components: {
    WSearch,
  },
  methods: {
    toSearch() {
      this.$router.push(`${this.routePath}/search`);
    },
    toDetail(item) {
      this.$store.commit('product/updateKeywords', '');
      this.$router.push(`${this.routePath}/productList?seriesId=${item.sid}`);
      // if (!item.bm) return;
      // this.$router.push(`/market/detail?bm=${item.bm}`);
    },
    async getSortList() {
      Utils.showLoading();
      const result = await commonService.getNewSortList();
      if (!result) return;
      Utils.hideLoading();
      this.menuList = [...result];

      if (!this.menuList.length) return;

      // 默认选中第一个
      this.menuList[0].isOpen = true;
      this.selectMenu = this.menuList[0];
      this.onChangeShelf(this.selectMenu);
    },
    // 获取产品列表
    onChangeShelf(item) {
      this.loadingShelf = true;
      this.selectMenu = { ...item };
      this.dataList = [...item.childList];
      setTimeout(() => {
        this.loadingShelf = false;
      }, 100);
    },
  },
};
</script>
<style lang="scss" scoped>
.search {
  padding-left: .44rem;
  padding-right: .44rem;
}

</style>
<style lang="scss">
@import '~@/styles/components/productMenu.scss';
.product-container {

  .cube-scroll-nav-bar-item {
    padding: 15px 10px;
  }
}
</style>