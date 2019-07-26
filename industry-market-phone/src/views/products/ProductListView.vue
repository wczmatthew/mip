<!-- 商城页 -->
<template lang='html'>
  <w-container showHeader showBack>
    <!-- 顶部栏 -->
    <w-search class="search" ref="search" slot="header-mid" show-scan @search="onSearch"></w-search>
    <div class="header-right" slot="header-right">
      <!-- <w-cart-icon :current-path="routePath" color="blue"></w-cart-icon> -->
    </div>
    <!-- 顶部栏 end -->

    <!-- 菜单页面 -->
    <div class="product-header" slot="header-other">
      <p class="title">开关</p>
      <search-sort></search-sort>
      <!-- <mall-tab :tab-list="tabList" @select="onSelectTab"></mall-tab> -->
    </div>
    <!-- 菜单页面 end -->

    <cube-scroll
      ref="scroll"
      :scroll-events="['scroll']"
      :options="options"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp">

      <!-- 商品列表 -->
      <no-data v-if="noProduct"></no-data>
      <product-list ref="productList" routePath="productList" v-else></product-list>
      <!-- 商品列表 end -->

    </cube-scroll>
  </w-container>
</template>
<script>
import WSearch from '@/components/WSearch.vue';
import notFoundImg from '@/assets/404.png';
import service from '@/services/product.service';
import Utils from '@/common/Utils';
import ProductList from './components/ProductList.vue';
import SearchSort from './components/SearchSort.vue';

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
      hasNext: true,
      keywords: '',
      bnr: '',
    };
  },
  created() {},
  mounted() {
    this.keywords = this.$route.query.keywords || '';
    this.$nextTick(() => {
      this.$refs.search && this.$refs.search.updateKeywords(this.keywords);
    });
    this.getData();
  },
  components: {
    WSearch,
    SearchSort,
    ProductList,
  },
  methods: {
    onSearch({ keywords }) {
      // console.log('keywords: ', keywords);
      this.keywords = keywords;
      this.onPullingDown();
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
      const result = await service.getProductList({ pageNum: this.pageNum, pageSize: 9, keyword: this.keywords, bnr: this.bnr });
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

      this.$refs.productList && this.$refs.productList.updateList(this.productList);
      this.noProduct = !this.productList.length;
      this.hasNext = this.productList.length < result.total;
      if (this.hasNext) {
        this.pageNum += 1;
      }
      this.$nextTick(() => {
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
    font-size: .18rem;
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