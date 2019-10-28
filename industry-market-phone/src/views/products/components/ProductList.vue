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
          {{item.BNR || item.JNR}}
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
            <!-- <span v-show="listType == 'list'">加入购物单</span> -->
            <i class="iconfont icon-cart"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- 商品列表 end -->
</template>
<script>
import { mapGetters } from 'vuex';
import Utils from '@/common/Utils';
import service from '@/services/order.service';

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
      isBind: 'isBind',
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

      if (!this.isBind) {
        Utils.showAlert({
          title: '提醒',
          content: '请先绑定手机号码?',
          maskClosable: false,
          onConfirm: () => {
            this.$store.commit('user/toggleRegisterModal', true);
          },
        });
        return;
      }
      this.$emit('add-cart', item);
    },
    // 加入购物单
    async addCart(item, num) {
      if (item.loading) {
        Utils.showToast('正在加入购物单, 请勿频繁操作');
        return;
      }
      item.loading = true;
      const result = await service.addToShopCarWithClient({ userid: this.userId, bm: item.BM, qty: num, clientId: this.customerId });
      item.loading = false;
      if (!result) return;
      Utils.showToast('加入购物单成功');
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
    position: relative;

    &::after {
      content: " ";
      position: absolute;
      bottom: 0;
      left: 2%;
      width: 96%;
      height: 1px;
      background: $color-line;
      transform: scaleY(.5);
      display: block;
    }

    .img {
      width: .6rem;
      height: .6rem;
      // border: 1px solid #f3f3f3;
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
      font-size: 12px;
      width: 100%;

      .product-title {
        @include text-overflow-muli(2);
        @include break-word;
        font-size: 14px;
      }

      .desc {
        color: $color-grey;
        margin-top: .05rem;
        font-size: 10px;
        margin-top: .1rem;
      }

      .price {
        font-size:  18px;
        font-weight: 700;
        color: $color-red;
        @include text-ellipsis;

        small {
          font-size:  12px;
          font-weight: 700;
        }
      }

      .bottom {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        margin-top: .1rem;

        .red-btn {
          margin: 0;
          font-size: 16px;
          width: .25rem;
          height: .25rem;
          border-radius: .25rem;
          padding: 0;

          .iconfont {
            display: block;
            text-align: center;
            line-height: .25rem;
          }
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
        font-size: 18px;
        padding: 0;
        // @include flex-center;
      }
    }
    .img {
      width: .9rem;
      height: .9rem;
      border: 0;
    }
  } // end product

} // end grid-2-list

</style>