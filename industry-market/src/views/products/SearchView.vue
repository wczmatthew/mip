<!-- 商城页 -->
<template lang='html'>
  <w-container showHeader showBack>
    <!-- 顶部栏 -->
    <w-search class="search" slot="header-mid" show-scan @search="toSearch" ref="search"></w-search>
    <div class="header-right" slot="header-right" @click.stop="toAll()">
      全部
    </div>
    <!-- 顶部栏 end -->

    <!-- 热门词汇 -->
    <p class="title">
      热门
    </p>

    <div class="grid-list">
      <div class="item" v-for="(item, index) in keywordsList" :key="index" @click="onPickKeyword(item)">
        {{item}}
      </div>
    </div>
    <!-- 热门词汇 end -->
  </w-container>
</template>
<script>
import WSearch from '@/components/WSearch.vue';
// import service from '@/services/product.service';
import Utils from '@/common/Utils';

export default {
  data() {
    return {
      keywords: '',
      routePath: Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'search' }), // 获取当前路由
      keywordsList: ['接触器', '断路器', '高压电流互感器', '变压器', '浴霸产品', '电工产品'],
    };
  },
  created() {},
  mounted() {
    // this.getData();
  },
  components: {
    WSearch,
  },
  methods: {
    toSearch({ keywords }) {
      // this.$router.push(`${this.routePath}/productList?keywords=${keywords}`);
      this.toProductList(keywords);
    },
    toAll() {
      this.toProductList('');
    },
    onPickKeyword(keywords) {
      this.keywords = keywords;
      this.$refs.search.updateKeywords(keywords);
      this.toProductList(keywords);
      // this.$router.push(`${this.routePath}/productList?keywords=${keywords}`);
    },
    toProductList(keywords) {
      // 返回上一页搜索页面
      this.$store.commit('product/updateKeywords', keywords);
      const productPath = Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'productList' });

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
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variable.scss';
.search {
  padding: 0 .45rem;
}

.title {
  font-size: 12px;
  color: $color-grey;
  padding: .2rem .15rem;
}

.grid-list {
  display: flex;
  align-items: center;
  padding: 0 .15rem;

  .item {
    padding: .05rem .1rem;
    border-radius: .05rem;
    background: #fff;
    box-shadow: 0 0 .05rem #ccc;
    margin-bottom: .1rem;
    margin-right: .1rem;
    font-size: 12px;

    &:active {
      color: $color-blue;
    }
  }
}
</style>
