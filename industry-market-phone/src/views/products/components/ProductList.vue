<!-- 产品列表 一行3列 -->
<template lang='html'>
  <!-- 商品列表 -->
  <div class="product-list" :class="{'grid-2-list': listType == 'grid', 'grid-1-list': listType == 'list'}">
    <div v-for="(item, index) in productList" :key="index"
    class="item product" @click="toDetail(item, index)" :class="{'selected': item.isSelect}">
      <div class="img">
        <w-img :src="item.imgPath"></w-img>
      </div>
      <div class="detail">
        <p class="product-title">
          {{item.XHGG}}
        </p>
        <p class="desc">
          <!-- 质量好，价格优惠，统一保证 -->
          {{item.JNR}}
        </p>

        <div class="bottom">
          <div class="left">
            <p class="price">
              <small>￥</small>{{item.DJJ || '0'}}
            </p>
            <!-- <p class="desc">
              库存: (99999)
            </p> -->
          </div>
          <!-- <div class="num">
            <i class="iconfont icon-jian"></i>
            <input type="number">
            <i class="iconfont icon-jia"></i>
          </div> -->
          <button class="red-btn" @click.stop="onAddCart(item)">
            <span v-show="listType == 'list'">加入购物车</span>
            <i class="iconfont icon-cart" v-show="listType == 'grid'"></i>
          </button>
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
      listType: 'list', // grid 一行2个显示, list: 一行一个(列表模式)
      isEdit: false,
      selectProductList: [],
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
      customerId: 'customerId',
    }),
  },
  methods: {
    changeEditType(isEdit) {
      this.isEdit = isEdit;
      if (this.isEdit) {
        this.selectProductList = [];
        this.productList.forEach(item => item.isSelect = false);
      }
    },
    changeListType(listType) {
      this.listType = listType;
    },
    updateList(list) {
      this.productList = list;
    },
    // 查看详情
    toDetail(item, index) {
      if (this.isEdit) {
        // 编辑模式, 选择产品
        const list = this.selectProductList.filter(product => product.id === item.id);
        if (list && list.length) {
          // 已经选择过, 取消选择
          this.selectProductList = this.selectProductList.filter(product => product.id !== item.id);
          this.$emit('select-change', this.selectProductList);
          // this.$set(item, 'isSelect', false);
          item.isSelect = false;
          this.$set(this.productList, index, item);
          return;
        }
        this.selectProductList.push(item);
        item.isSelect = true;
        this.$set(this.productList, index, item);
        this.$emit('select-change', this.selectProductList);
        return;
      }
      this.$router.push(`${this.path}/productDetail?bm=${item.BM}`);
    },
    onAddCart(item) {
      Utils.hideLoading();
      if (!this.customerId) {
        Utils.showAlert({
          title: '提醒',
          content: '您还未绑定经销商, 不能进行下单操作?',
          maskClosable: true,
        });
        return;
      }
      this.$emit('add-cart', item);
    },
    // 加入购物车
    async addCart(item, num) {
      if (item.loading) {
        Utils.showToast('正在加入购物车, 请勿频繁操作');
        return;
      }
      item.loading = true;
      const result = await service.addToShopCarWithClient({ userid: this.userId, bm: item.BM, qty: num, clientId: this.customerId });
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
    padding: .1rem .15rem;
    display: flex;
    align-items: center;
    background: #fff;

    .img {
      width: .8rem;
      height: .8rem;
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
        color: $color-grey;
        margin-top: .05rem;
        font-size: .1rem;
      }

      .price {
        font-size: .18rem;
        font-weight: 700;
        color: $color-red;
        @include text-ellipsis;

        small {
          font-size: .12rem;
          font-weight: 700;
        }
      }

      .bottom {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        margin-top: .2rem;
        // .num {
        //   border: 1px solid $color-line;
        //   width: .9rem;
        //   height: .25rem;
        //   display: flex;

        //   .iconfont {
        //     width: .25rem;
        //     height: .25rem;
        //     text-align: center;
        //     line-height: .25rem;
        //   }

        //   input {
        //     flex: 1;
        //     width: 100%;
        //     height: 100%;
        //     border: 0;
        //     border-left: 1px solid $color-line;
        //     border-right: 1px solid $color-line;
        //     text-align: center;
        //   }
        // }

        .red-btn {
          margin: 0;
          font-size: .1rem;
          width: .8rem;
          height: .25rem;
          border-radius: 0;
        }
      }

    } // end detail

    &.selected {
      background: rgba($color: #ca141d, $alpha: .1);
    }
  } // end item
}

.grid-2-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .product {
    width: 49%;
    flex-direction: column;
    margin-top: .08rem;

    .product-title {
      margin-top: .05rem;
    }

    .detail .bottom {
      margin-top: .1rem;

      .red-btn {
        width: .25rem;
        height: .25rem;
        border-radius: .25rem;
        font-size: .18rem;
        @include flex-center;
      }
    }
    .img {
      height: .7rem;
      border: 0;
    }
  } // end product

} // end grid-2-list

</style>