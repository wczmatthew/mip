<!-- 分类 -->
<template lang='html'>
  <w-container show-header show-back>
    <!-- 顶部栏 -->
    <div slot="header-mid">产品选型</div>
    <!-- 顶部栏 end -->

    <!-- 名称 -->
    <div slot="w-header-other">
      <div class="category-detail">
        <p class="title">
          NXA16N04-MD3-AC220/230/240
        </p>
        <div class="bottom">
          <p class="price">
            ￥ 11460.00
          </p>
          <div class="nums">
            数量: <input type="number" v-model="numbers">
          </div>
        </div>
      </div>

      <div class="category-nav">
        
      </div>

    </div>
    <!-- 名称 end -->
  </w-container>
</template>
<script>
// import service from '@/services/product.service';
import Utils from '@/common/Utils';

export default {
  data() {
    return {
      numbers: 1,
      hasNext: true,
      noData: false,
      dataList: [],
      routePath: Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'detail' }), // 获取当前路由
    };
  },
  created() {},
  mounted() {
  },
  components: {
  },
  methods: {
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variable.scss';
.category-detail {
  background: #fff;
  font-size: .15rem;
  @include break-word;
  padding: .1rem .15rem;

  .title {
    margin-bottom: .15rem;
    @include text-overflow-muli(3);
  }

  .bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .price {
      color: $color-red;
      @include text-ellipsis;
    }

    .nums {
      flex-shrink: 0;
      width: 1rem;
      text-align: right;
    }

    input {
      border: 1px solid $color-line;
      width: .5rem;
      height: .2rem;
      text-align: center;
    }
  }
}
</style>