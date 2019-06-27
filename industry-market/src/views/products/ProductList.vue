<!-- 商城页 -->
<template lang='html'>
  <w-container showHeader showBack>
    <!-- 顶部栏 -->
    <w-search class="search" ref="search" slot="header-mid" disabled show-scan @input-click="toSearch()"></w-search>
    <div class="header-right" slot="header-right">
      <!-- <w-msg-icon color="blue"></w-msg-icon> -->
      <!-- <i class="iconfont icon-cart"></i> -->
      <w-cart-icon :current-path="routePath" color="blue"></w-cart-icon>
    </div>
    <!-- 顶部栏 end -->

    <!-- 菜单页面 -->
    <mall-tab :tab-list="tabList" @select="onSelectTab" slot="w-header-other"></mall-tab>
    <!-- 菜单页面 end -->

    <cube-scroll
      ref="scroll"
      :scroll-events="['scroll']"
      :options="options"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp">

      <!-- 商品列表 -->
      <no-data v-show="noProduct"></no-data>
      <w-loading-row v-show="isFirstLoading"></w-loading-row>
      <product-grid-list ref="productList" routePath="productList" v-show="!noProduct" @add-cart="onAddCart"></product-grid-list>
      <!-- 商品列表 end -->

    </cube-scroll>

    <!-- 数量弹窗 -->
    <w-num-modal ref="numModal"></w-num-modal>
    <!-- 数量弹窗 end -->
  </w-container>
</template>
<script>
import WSearch from '@/components/WSearch.vue';
import MallTab from './components/MallTab.vue';
import notFoundImg from '@/assets/404.png';
import service from '@/services/product.service';
import Utils from '@/common/Utils';
import WNumModal from '@/components/WNumModal.vue';
import ProductGridList from './components/ProductGridList.vue';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      options: {
        pullDownRefresh: {
          threshold: 60,
          stop: 40,
          txt: '刷新成功',
        },
        pullUpLoad: {
          threshold: 60,
          txt: { more: '加载完成', noMore: '已加载全部' },
        },
      },
      isFirstLoading: false,
      routePath: Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'productList' }), // 获取当前路由
      tabList: [
        { title: '综合电器', selectTxt: '' },
        { title: '配电电器', selectTxt: '' },
        { title: '控制电器', selectTxt: '' },
        { title: '驱动电器', selectTxt: '' },
        { title: '继电器', selectTxt: '' },
        { title: '开关电器', selectTxt: '' },
        { title: '电源电器', selectTxt: '' },
        { title: '焊接设备', selectTxt: '' },
      ],
      productList: [],
      noProduct: false,
      pageNum: 1,
      pageSize: 20,
      hasNext: true,
      bnr: '',
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.$refs.search && this.$refs.search.updateKeywords(this.keywords);
    });
    this.onPullingDown();
  },
  watch: {
    keywords() {
      // console.log('keywords change');
      this.$nextTick(() => {
        this.$refs.search && this.$refs.search.updateKeywords(this.keywords);
      });
      this.onPullingDown();
      // this.getData();
    },
  },
  computed: {
    ...mapGetters('product', {
      keywords: 'keywords',
    }),
  },
  components: {
    WSearch,
    MallTab,
    ProductGridList,
    WNumModal,
  },
  methods: {
    onAddCart(item) {
      this.$refs.numModal.show({
        callback: async (type, num) => {
          if (type !== 'confirm') return;
          // 已经选择了客户, 直接将产品加入购物车
          this.$refs.productList && this.$refs.productList.addProductToCart(item, num);
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
      this.bnr = data.bnr || '';
      this.onPullingDown();
    },
    // 图片加载失败
    imgErr(item) {
      item.imgPath = notFoundImg;
    },
    // 下拉刷新
    onPullingDown() {
      this.pageNum = 1;
      this.isFirstLoading = true;
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
      const result = await service.getProductList({ pageNum: this.pageNum, pageSize: this.pageSize, keyword: this.keywords, bnr: this.bnr });
      this.isFirstLoading = false;
      if (!result) {
        this.noProduct = !this.productList.length;
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
        this.$refs.scroll.forceUpdate(true);
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
@import '~@/styles/variable.scss';

.search {
  padding-left: .44rem;
}

.header-right {
  position: static;
  .iconfont {
    width: .45rem;
  }
  .icon-cart {
    color: $default-color;
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