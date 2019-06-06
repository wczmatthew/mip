<!-- 商城页 -->
<template lang='html'>
  <w-container showHeader showBack>
    <!-- 顶部栏 -->
    <w-search class="search" slot="header-mid" show-scan @search="toSearch" ref="search"></w-search>
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
      this.$router.push(`${this.routePath}/productList?keywords=${keywords}`);
    },
    onPickKeyword(keywords) {
      this.keywords = keywords;
      this.$refs.search.updateKeywords(keywords);
      this.$router.push(`${this.routePath}/productList?keywords=${keywords}`);
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
  font-size: .12rem;
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
    font-size: .12rem;

    &:active {
      color: $color-blue;
    }
  }
}
</style>
