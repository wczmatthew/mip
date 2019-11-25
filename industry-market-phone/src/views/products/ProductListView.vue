<!-- 商城页 -->
<template lang='html'>
  <w-container showHeader showBack>
    <!-- 顶部栏 -->
    <template #header-mid>
      <w-search class="search" disabled show-scan @input-click="toSearch()" ref="search"></w-search>
    </template>
    <template #header-right>
      <div class="header-right">
        <w-scan-icon :current-path="routePath"></w-scan-icon>
      </div>
    </template>
    <!-- 顶部栏 end -->

    <!-- 菜单页面 -->
    <template #header-other>
      <sort-tab :tab-list="tabList" @select="onSelectTab" @change-list-type="onChangeListType" @share="onShare()"></sort-tab>
    </template>
    <!-- 菜单页面 end -->

    <w-scroll
      ref="scroll"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp">

      <!-- 商品列表 -->
      <w-loading-row v-if="isLoading"></w-loading-row>
      <no-data v-if="noProduct"></no-data>
      <product-list ref="productList" routePath="productList" v-else @add-cart="addCart"></product-list>
      <!-- 商品列表 end -->

    </w-scroll>

    <!-- 数量弹窗 -->
    <w-num-modal ref="numModal"></w-num-modal>
    <!-- 数量弹窗 end -->

    <!-- 分享海报弹窗 -->
    <share-modal ref="shareModal" ></share-modal>
    <!-- 分享海报弹窗 end -->
  </w-container>
</template>
<script>
import { mapGetters } from 'vuex';
import WSearch from '@/components/WSearch.vue';
import service from '@/services/product.service';
import Utils from '@/common/Utils';
import ProductList from './components/ProductList.vue';
import SortTab from './components/SortTab.vue';
import WNumModal from '@/components/WNumModal.vue';
import ShareModal from '@/components/ShareModal.vue';

export default {
  data() {
    return {
      routePath: Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'productList' }), // 获取当前路由
      productList: [],
      noProduct: false,
      pageNum: 1,
      hasNext: true,
      bnr: '',
      isAsc: '',
      isFirstLoading: false,
      orderByColumn: '',
      isLoading: false,
      tabList: [
        { name: '产品型号', sort: 'asc', column: 'xhgg' },
        { name: '价格', sort: 'none', column: 'djj' },
      ],
    };
  },
  created() {},
  mounted() {
    this.seriesId = this.$route.query.seriesId;
    this.$nextTick(() => {
      this.$refs.search && this.$refs.search.updateKeywords(this.keywords);
    });
    this.isLoading = true;
    this.getData();
  },
  watch: {
    keywords() {
      // console.log('keywords change');
      this.$nextTick(() => {
        this.$refs.search && this.$refs.search.updateKeywords(this.keywords);
      });
      this.isLoading = true;
      this.onPullingDown();
      // this.getData();
    },
  },
  components: {
    WSearch,
    ProductList,
    SortTab,
    WNumModal,
    ShareModal,
  },
  computed: {
    ...mapGetters('product', {
      keywords: 'keywords',
    }),
  },
  methods: {
    onShare() {
      this.$refs.shareModal && this.$refs.shareModal.toggle(true);
    },
    onChangeListType(listType) {
      this.$refs.productList && this.$refs.productList.changeListType(listType);
    },
    addCart(item) {
      this.$refs.numModal.show({
        callback: async (type, num) => {
          if (type !== 'confirm') return;
          // 已经选择了客户, 直接将产品加入购物单
          this.$refs.productList && this.$refs.productList.addCart(item, num);
        },
      });
    },
    toSearch() {
      // 返回上一页搜索页面
      const searchPath = Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'search' });

      const pathList = this.$route.matched;
      const index = pathList.findIndex(item => item.path === searchPath);
      if (index >= 0) {
        // 浏览历史记录有分类界面, 直接返回这一页
        const goIndex = index - pathList.length + 1;
        this.$router.go(goIndex);
        return;
      }

      // 没有历史记录进入查询页面
      this.$router.push(`${this.routePath}/search`);
    },
    onSelectTab(data) {
      // console.log(data);
      this.orderByColumn = data.column || '';
      this.isAsc = data.sort === 'none' ? '' : data.sort;
      this.isLoading = true;
      this.onPullingDown();
    },
    // 下拉刷新
    onPullingDown() {
      this.pageNum = 1;
      this.isFirstLoading = true;
      this.$refs.scroll && this.$refs.scroll.scrollTop();
      this.getData();
    },
    // 上拉加载
    onPullingUp() {
      if (!this.hasNext) {
        // 没有数据
        this.$refs.scroll.forceUpdate(true);
        return;
      }
      this.getData();
    },
    async getData() {
      // Utils.showLoading();
      const params = { pageNum: this.pageNum, pageSize: this.pageSize, keyword: this.keywords, seriesId: this.seriesId, orderByColumn: this.orderByColumn, isAsc: this.isAsc, userid: Utils.getUserId(this) };
      const result = await service.getNewProductList(params);
      this.isLoading = false;
      if (!result) {
        this.noProduct = !this.productList.length;
        this.$refs.scroll && this.$refs.scroll.forceUpdate(true);
        return;
      }

      if (this.pageNum === 1) {
        // 第一页
        this.productList = result.rows || [];
      } else {
        this.productList = this.productList.concat([...result.rows]);
      }

      this.noProduct = !this.productList.length;
      this.hasNext = this.productList.length < result.total;
      if (this.hasNext) {
        this.pageNum += 1;
      }
      this.$nextTick(() => {
        this.$refs.productList && this.$refs.productList.updateList(this.productList);
        this.$refs.scroll && this.$refs.scroll.forceUpdate(true);
      });

      // this.$nextTick(() => {
      //   // 重新计算高度
      //   if (this.$refs.sticky) {
      //     this.$refs.sticky.refresh();
      //   }
      // });
    },
  },
};
</script>
<style lang="scss" scoped>


.search {
  padding-left: .44rem;
}

.header-right {
  position: static;
  .iconfont {
    width: .45rem;
  }
  .icon-cart {
    color: $color-default;
  }
}

.product-header {
  background: #fff;
  border-bottom: 1px solid #f1f1f1;

  .title {
    height: .3rem;
    line-height: .3rem;
    text-align: center;
    font-size:  18px;
    border-bottom: 1px solid #f1f1f1;
  }

  .w-sort-area {
    background: #fff;
  }
}

.scroll-ele {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.slide-item {
  display: flex;
  padding: .1rem 0;

  .item {
    width: 33%;
    height: 20vh;
    min-height: .8rem;
    border-radius: .1rem;
    margin-right: 1%;
    overflow: hidden;
    box-shadow: 0 0 .05rem #ddeeed;

    &:last-child {
      margin-right: 0;
    }
  }

  img {
    width: 100%;
    height: 100%;
  }
}

</style>

<style lang="scss">
.mall-star .cube-rate-item{
  width: .12rem;
}
</style>