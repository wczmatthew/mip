<!-- 商城页 -->
<template lang='html'>
  <w-container showHeader showBack class="search-container">
    <!-- 顶部栏 -->
    <template #header-mid>
      <w-search class="search" show-scan @search="toSearch" ref="search"></w-search>
    </template>
    <template #header-right>
      <div class="header-right">
        <w-cart-icon :current-path="routePath"></w-cart-icon>
      </div>
    </template>
    <!-- 顶部栏 end -->

    <!-- 热门搜索 -->
    <div class="hot-search">
      <p class="title">热门搜索</p>
      <ul class="w-grid-list">
        <li v-for="(item, index) in keywordsList" :key="'key'+index" class="item" @click="onPickKeyword(item.name)">
          {{item.name}}
        </li>
      </ul>
    </div>
    <!-- 热门搜索 end -->
    <!-- 搜索结果 -->
    <div class="search-result">
      <button class="red-btn" @click="onSelectProduct()">产品选型</button>
    </div>
    <!-- 搜索结果 end -->
  </w-container>
</template>
<script>
import { mapGetters } from 'vuex';
import WSearch from '@/components/WSearch.vue';
import Utils from '@/common/Utils';

export default {
  data() {
    return {
      keywords: '',
      routePath: Utils.getCurrentPath({
        fullPath: this.$route.path,
        currentPath: 'search',
      }), // 获取当前路由
      // keywordsList: [
      //   { name: '接触器' },
      //   { name: '断路器' },
      //   { name: '高压电流互感器' },
      //   { name: '变压器' },
      //   { name: '浴霸产品' },
      //   { name: '电工产品' },
      // ],
      pageNum: 1,
    };
  },
  created() {},
  mounted() {
    this.$store.dispatch('keywords/getHotKeywordList');
  },
  components: {
    WSearch,
  },
  computed: {
    ...mapGetters('keywords', {
      keywordsList: 'keywordsList',
    }),
  },
  methods: {
    // 开始查询
    toSearch({ keywords }) {
      // this.$refs.scroll.scrollTop();
      // this.showLoading = true;
      this.keywords = keywords;
      // this.onPullingDown();
      this.$refs.search.updateKeywords(keywords);
      this.toProductList(keywords);
    },
    // 点击热门关键字
    onPickKeyword(keywords) {
      // this.$refs.scroll.scrollTop();
      this.showLoading = true;
      this.keywords = keywords;
      this.$refs.search.updateKeywords(keywords);
      this.toProductList(keywords);
    },
    toProductList(keywords) {
      // 返回上一页搜索页面
      this.$store.commit('product/updateKeywords', keywords);
      const productPath = Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'productList' });

      setTimeout(() => {
        this.loading = false;
      }, 500);

      const pathList = this.$route.matched;
      const index = pathList.findIndex(item => item.path === productPath);
      if (index >= 0) {
        // 浏览历史记录有分类界面, 直接返回这一页
        const goIndex = index - pathList.length + 1;
        this.$router.go(goIndex);
        return;
      }

      // 没有历史记录进入查询页面
      this.$router.push(`${this.routePath}/productList`);
    },
    // 产品选型
    onSelectProduct() {
      const productPath = Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'category' });
      const pathList = this.$route.matched;
      const index = pathList.findIndex(item => item.path === productPath);
      if (index >= 0) {
        // 浏览历史记录有分类界面, 直接返回这一页
        const goIndex = index - pathList.length + 1;
        this.$router.go(goIndex);
        return;
      }
      this.$router.push(`${this.routePath}/category`);
    },
    // // 下拉刷新
    // onPullingDown() {
    //   this.pageNum = 1;
    //   this.getData();
    // },
    // // 上拉加载
    // onPullingUp() {
    //   if (!this.hasNext) {
    //     // 没有数据
    //     this.$refs.scroll && this.$refs.scroll.forceUpdate(true);
    //     return;
    //   }
    //   this.getData();
    // },
    // async getData() {
    //   // Utils.showLoading();
    //   const result = await service.getProductList({ pageNum: this.pageNum, pageSize: 9, keyword: this.keywords, bnr: this.bnr });
    //   this.showLoading = false;
    //   if (!result) {
    //     this.noProduct = !this.productList.length;
    //     return;
    //   }

    //   if (this.pageNum === 1) {
    //     // 第一页
    //     this.productList = result.rows || [];
    //   } else {
    //     this.productList = this.productList.concat([...result.rows]);
    //   }

    //   this.$refs.productList && this.$refs.productList.updateList(this.productList);
    //   this.noProduct = !this.productList.length;
    //   this.hasNext = this.productList.length < result.total;
    //   if (this.hasNext) {
    //     this.pageNum += 1;
    //   }
    //   this.$nextTick(() => {
    //     this.$refs.scroll && this.$refs.scroll.forceUpdate(true);
    //   });
    // },
  },
};
</script>
<style lang="scss" scoped>
@import "~@/styles/components/button.scss";
.search {
  padding: 0.09rem 0.45rem;
}

.hot-search {
  padding: 0 .05rem 0 .15rem;
  background: #fff;

  .title {
    font-size: 15px;
    // font-weight: 700;
    height: .44rem;
    line-height: .44rem;
  }

  .w-grid-list {
    .item {
      width: auto;
      padding: .05rem .1rem;
      background: $color-bg;
      border-radius: .05rem;
      display: block;
      margin-bottom: .1rem;
      margin-right: .08rem;
      font-size: 12px;
      // font-weight: 700;
      color: #5e5e5e;

      &.actived {
        background: $color-default;
        color: #fff;
      }

    }
    .item:active {
      opacity: .7;
    }
  }
}

.search-result {
  padding: .1rem .15rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 15px;
  font-weight: 700;
  border-bottom: 1px solid $color-line;
  background: #fff;

  span {
    font-weight: 700;
  }

  .red-btn {
    width: 1rem;
    height: .25rem;
    line-height: .25rem;
    font-size:  12px;
    margin: 0;
  }
}

</style>