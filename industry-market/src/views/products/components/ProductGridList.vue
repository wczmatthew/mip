<!-- 产品列表 一行3列 -->
<template lang='html'>
  <!-- 商品列表 -->
  <div class="w-grid-list grid-5-list">
    <div class="item product" v-for="(item, index) in productList" :key="'product' + index"  @click="toDetail(item)">
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
  components: {
  },
  computed: {
    ...mapGetters('user', {
      userId: 'userId',
    }),
    ...mapGetters('customer', {
      customer: 'selectCustomer',
    }),
  },
  methods: {
    updateList(list) {
      this.productList = list;
    },
    // 查看详情
    toDetail(item) {
      this.$router.push(`${this.path}/detail?bm=${item.BM}`);
    },
    // 加入购物车
    onAddCart(item) {
      Utils.hideLoading();
      if (!this.customer || !this.customer.id) {
        // 还未选择客户, 提醒导购员先选择用户
        Utils.showConfirm({
          title: '提醒',
          content: '还未选择客户, 是否先选择客户?',
          confirmBtn: '确定',
          cancelBtn: '直接购物',
          maskClosable: false,
          onConfirm: () => {
            this.$router.push(`${this.path}/customers`);
          },
          onCancel: () => {
            // 新增临时客户, 再将产品加入购物车
            this.addTempCustomer(item);
            // this.addProductToCart(item);
          },
        });
        return;
      }
      this.$emit('add-cart', item);
    },
    // 添加临时客户
    async addTempCustomer(item) {
      Utils.showLoading();
      const result = await service.addTempClient({ userid: Utils.getUserId(this) });
      if (!result) return;
      Utils.hideLoading();
      // 更新选中客户信息
      this.$store.commit('customer/updateSelectCustomer', result);
      this.$emit('add-cart', item);
    },
    // 将产品加入到购物车中
    async addProductToCart(item, num) {
      if (item.loading) {
        Utils.showToast(`${item.XHGG}正在加入购物车, 请勿频繁操作`);
        return;
      }
      item.loading = true;
      const result = await service.addToShopCarWithClient({ userid: this.userId, bm: item.BM, qty: num || 1, clientId: this.customer.id });
      item.loading = false;
      if (!result) return;
      Utils.showToast(`${item.XHGG}加入购物车成功`);
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
  padding-top: .1rem;
  padding-left: 2%;

  .product {
    width: 23%;
    background: #fff;
    box-shadow: 0 .05rem .1rem #e6e6e6;
    border-radius: .05rem;
    padding: .05rem 0;
    overflow: hidden;
    margin-right: 2%;
    margin-bottom: .1rem;

    &:nth-child(4n) {
      margin-right: 0;
    }

    .img {
      width: 100%;
      height: .8rem;
      padding: .05rem;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;

      img {
        max-width: 100%;
        height: 100%;
      }
    }

    .title {
      color: $default-color;
      @include text-overflow-muli(2);
      @include break-word;
      margin: .05rem .1rem;
      margin-bottom: 0;
      line-height: 18px;
      overflow: hidden;
      height: 38px;
      font-size: 16px;
      display: flex;
      align-items: center;
    }

    .bottom {
      display: flex;
      align-items: center;

      .price {
        flex: 1;
        color: $color-red;
        font-size: 16px;
        @include text-ellipsis;
        width: 100%;
        padding: 0 .12rem;
      }

      .cart {
        width: .3rem;
        height: .25rem;
        flex-shrink: 0;
        padding-top: .05rem;
        font-size: 20px;
        .iconfont {
          width: .15rem;
          height: .15rem;
          background: $color-blue;
          border-radius: .15rem;
          color: #fff;
          text-align: center;
          line-height: .15rem;
          display: block;
          margin: 0 auto;
        }
      }

    }

  }
} // end w-grid-list

.grid-5-list {

  .product {
    width: 18%;
    margin-right: 2%;

    &:nth-child(4n) {
      margin-right: 2%;
    }

    &:nth-child(5n) {
      margin-right: 0;
    }

    .img {
      height: .6rem;
    }
  } // end product

} // end grid-5-list
</style>