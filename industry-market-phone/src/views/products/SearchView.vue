<!-- 商城页 -->
<template lang='html'>
  <w-container showHeader showBack>
    <!-- 顶部栏 -->
    <w-search class="search" slot="header-mid" show-scan @search="toSearch" ref="search"></w-search>
    <div class="header-right" slot="header-right">
      <w-scan-icon></w-scan-icon>
    </div>
    <!-- 顶部栏 end -->

    <cube-sticky :pos="scrollY">
      <w-scroll
        ref="scroll"
        class="scroll-view"
        @scroll="scrollHandler"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp">
        <!-- 热门搜索 -->
        <div class="hot-search">
          <p class="title">热门搜索</p>
          <ul class="w-grid-list">
            <li v-for="(item, index) in keywordsList" :key="'key'+index" class="item" @click="onPickKeyword(item)">
              {{item}}
            </li>
          </ul>
        </div>
        <!-- 热门搜索 end -->
        <!-- 搜索结果 -->
        <div class="search-result">
          <span>搜索结果</span>
          <button class="blue-btn" @click="onSelectProduct()">产品选型</button>
        </div>
        <!-- 搜索结果 end -->

        <!-- 筛选 -->
        <cube-sticky-ele ele-key="11">
          <search-sort></search-sort>
        </cube-sticky-ele>
        <!-- 筛选 end -->
        <!-- 产品列表 -->
        <div class="product-list">
          <w-loading-row v-show="showLoading"></w-loading-row>
          <no-data v-show="!showLoading && noProduct"></no-data>
          <div v-for="(item, index) in productList" :key="index" class="item">
            <div class="img">
              <w-img :src="item.imgPath"></w-img>
            </div>
            <div class="detail">
              <p class="product-title">
                {{item.XHGG}}
              </p>
              <p class="desc">
                质量好，价格优惠，统一保证
              </p>
              <p class="price">
                ￥{{item.DJJ || '0'}}
              </p>
              <div class="bottom">
                <div class="num">
                  <i class="iconfont icon-jian"></i>
                  <input type="number">
                  <i class="iconfont icon-jia"></i>
                </div>
                <button class="blue-btn">加入购物车</button>
              </div>
            </div>
          </div>
        </div>
        <!-- 产品列表 end -->
      </w-scroll>
      <template slot="fixed">
        <search-sort></search-sort>
      </template>
    </cube-sticky>
  </w-container>
</template>
<script>
import WSearch from '@/components/WSearch.vue';
import service from '@/services/product.service';
import Utils from '@/common/Utils';
import SearchSort from './components/SearchSort.vue';

export default {
  data() {
    return {
      keywords: '',
      routePath: Utils.getCurrentPath({
        fullPath: this.$route.path,
        currentPath: 'search',
      }), // 获取当前路由
      keywordsList: [
        '接触器',
        '断路器',
        '高压电流互感器',
        '变压器',
        '浴霸产品',
        '电工产品',
      ],
      scrollY: 0,
      pageNum: 1,
      hasNext: true,
      productList: [],
      noProduct: false,
      showLoading: false,
    };
  },
  created() {},
  mounted() {
    this.showLoading = true;
    this.getData();
  },
  components: {
    WSearch,
    SearchSort,
  },
  methods: {
    scrollHandler({ y }) {
      this.scrollY = -y;
    },
    // 开始查询
    toSearch({ keywords }) {
      this.$refs.scroll.scrollTop();
      this.showLoading = true;
      this.keywords = keywords;
      this.onPullingDown();
    },
    // 点击热门关键字
    onPickKeyword(keywords) {
      this.$refs.scroll.scrollTop();
      this.showLoading = true;
      this.keywords = keywords;
      this.$refs.search.updateKeywords(keywords);
      this.onPullingDown();
    },
    // 产品选型
    onSelectProduct() {
      this.$router.push(`${this.routePath}/category`);
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
        this.$refs.scroll && this.$refs.scroll.forceUpdate(true);
        return;
      }
      this.getData();
    },
    async getData() {
      // Utils.showLoading();
      const result = await service.getProductList({ pageNum: this.pageNum, pageSize: 9, keyword: this.keywords, bnr: this.bnr });
      this.showLoading = false;
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
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@/styles/components/button.scss";
.search {
  padding: 0.07rem 0.45rem;
}

.hot-search {
  padding: 0 .05rem 0 .15rem;

  .title {
    font-size: .15rem;
    font-weight: 700;
    height: .44rem;
    line-height: .44rem;
  }

  .w-grid-list {
    .item {
      width: auto;
      padding: .05rem .1rem;
      border: 1px solid $color-line;
      background: #fff;
      border-radius: .05rem;
      display: block;
      margin-bottom: .1rem;
      margin-right: .08rem;
      font-size: .12rem;
      font-weight: 700;
      color: #5e5e5e;

      &.actived {
        border-color: $color-blue;
      }

    }
    .item:active {
      opacity: .7;
    }
  }
}

.search-result {
  margin: 0 .15rem;
  display: flex;
  align-items: center;
  height: .35rem;
  justify-content: space-between;
  font-size: .15rem;
  font-weight: 700;
  border-bottom: 1px solid $color-line;

  span {
    font-weight: 700;
  }

  .blue-btn {
    width: 1rem;
    height: .25rem;
    font-size: .12rem;
    margin: 0;
  }
}

.product-list {
  position: relative;
  .item {
    width: 100%;
    padding: .05rem .15rem;
    border-bottom: 1px solid $color-line;
    display: flex;
    align-items: center;
    margin-bottom: .05rem;
    background: #fff;

    .img {
      width: 1rem;
      height: 1rem;
      border: 1px solid #f3f3f3;
      @include flex-center;
      margin-right: .05rem;
      overflow: hidden;
      flex-shrink: 0;

      img {
        height: 100%;
      }
    }

    .detail {
      flex: 1;
      overflow: hidden;
      font-size: .12rem;

      .product-title {
        @include text-overflow-muli(2);
        @include break-word;
        font-weight: 700;
      }

      .desc {
        color: $color-orange;
        margin-top: .05rem;
        font-size: .1rem;
      }

      .price {
        font-size: .18rem;
        font-weight: 700;
        color: $color-red;
        @include text-ellipsis;
        margin: .1rem 0;
      }

      .bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .num {
          border: 1px solid $color-line;
          width: .9rem;
          height: .25rem;
          display: flex;

          .iconfont {
            width: .25rem;
            height: .25rem;
            text-align: center;
            line-height: .25rem;
          }

          input {
            flex: 1;
            width: 100%;
            height: 100%;
            border: 0;
            border-left: 1px solid $color-line;
            border-right: 1px solid $color-line;
          }
        }

        .blue-btn {
          margin: 0;
          font-size: .1rem;
          width: .8rem;
          height: .25rem;
        }
      }

    } // end detail
  } // end item
}
</style>
