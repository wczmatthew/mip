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
        <div class="bottom">
          <div class="price">
            ￥{{item.DJJ || '0'}}
          </div>
          <div class="cart" @click.stop="onAddCart(item)">
            <i class="iconfont icon-cart"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 商品列表 end -->
</template>
<script>
import Utils from '@/common/Utils';
import service from '@/services/order.service';
import { mapGetters } from 'vuex';

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
  computed: {
    ...mapGetters('user', {
      userId: 'userId',
    }),
  },
  methods: {
    updateList(list) {
      this.productList = list;
    },
    // 查看详情
    toDetail(item) {
      this.$router.push(`${this.path}/productDetail?bm=${item.BM}`);
    },
    // 加入购物车
    async onAddCart(item) {
      if (item.loading) {
        Utils.showToast('正在加入购物车, 请勿频繁操作');
        return;
      }
      item.loading = true;
      console.log(this.userId);
      const result = await service.addCart({ userid: this.userId, bm: item.BM, qty: 1 });
      item.loading = false;
      if (!result) return;
      Utils.showToast('加入购物车成功');
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
      @include text-overflow-muli(2);
      margin: .1rem;
      line-height: .18rem;
      overflow: hidden;
      height: .35rem;
    }

    .bottom {
      display: flex;
      align-items: center;

      .price {
        flex: 1;
        color: $color-red;
        font-size: .12rem;
        @include text-ellipsis;
        width: 100%;
        padding: 0 .12rem;
      }

      .cart {
        width: .4rem;
        height: .3rem;
        flex-shrink: 0;
        padding-top: .05rem;
        .iconfont {
          width: .2rem;
          height: .2rem;
          background: $color-blue;
          border-radius: .2rem;
          color: #fff;
          text-align: center;
          line-height: .2rem;
          display: block;
          margin: 0 auto;
        }
      }

    }

  }
}
</style>