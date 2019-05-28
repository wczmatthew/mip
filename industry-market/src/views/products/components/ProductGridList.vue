<!-- 产品列表 一行3列 -->
<template lang='html'>
  <!-- 商品列表 -->
  <div class="w-grid-list">
    <div class="item" v-for="(item, index) in productList" :key="'product' + index">
      <div class="product" @click="toDetail(item)">
        <div class="img">
          <!-- <img :src="item.imgPath" alt="" @error="imgErr(item)"> -->
          <w-img :src="item.imgPath"></w-img>
        </div>
        <div class="title">
          {{item.XHGG}}
        </div>
        <div class="price">
          ￥{{item.DJJ || '--'}}
        </div>
      </div>
    </div>
  </div>
  <!-- 商品列表 end -->
</template>
<script>
import Utils from '@/common/Utils';

export default {
  data() {
    return {
      noProduct: false,
      productList: [], // 产品列表数据
      path: '',
    };
  },
  created() {},
  mounted() {
    this.path = Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: this.routePath });
  },
  components: {},
  methods: {
    updateList(list) {
      this.productList = list;
    },
    // 查看详情
    toDetail(item) {
      this.$router.push(`${this.path}/detail?bm=${item.BM}`);
    },
  },
  props: {
    routePath: {
      type: String,
      default: '',
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variable.scss';

.w-grid-list {
  .product {
    width: 100%;
    margin: 0 auto;
    background: #fff;
    box-shadow: 0 .05rem .1rem #e6e6e6;
    border-radius: .05rem;
    padding-bottom: .05rem;
    overflow: hidden;

    .img {
      width: 100%;
      height: 30vh;
      min-height: .8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;

      img {
        max-width: 100%;
        max-height: 100%;
      }
    }

    .title {
      color: $default-color;
      text-align: right;
      @include text-overflow-muli(2);
      margin: .1rem;
      line-height: .18rem;
      overflow: hidden;
      height: .35rem;
    }

    .price {
      color: $color-red;
      text-align: right;
      font-size: .12rem;
      @include text-ellipsis;
      width: 100%;
      padding: .1rem;
      padding-top: 0;
    }
  }
}
</style>