<!-- 产品列表 一行3列 -->
<template lang='html'>
  <!-- 商品列表 -->
  <div class="product-list">
    <div v-for="(item, index) in productList" :key="index" class="item" @click="toDetail(item)">
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
@import '~@/styles/components/button.scss';
.product-list {
  position: relative;
  .item {
    width: 100%;
    padding: .05rem .15rem;
    border-bottom: 1px solid $color-line;
    display: flex;
    align-items: center;
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
            text-align: center;
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