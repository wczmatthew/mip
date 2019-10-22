<!-- 订单详情 -->
<template lang='html'>
  <w-container show-header show-back :show-footer="orderDetail.billType == 2 || orderDetail.billType == 6 || orderDetail.billType == 1">
    <!-- 顶部栏 -->
    <template #header-mid>
      订单详情
    </template>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <div class="order-container">
      <!-- 付款信息 -->
      <div class="detail">
        <div class="order-status" :class="[getOrderColor()]">
          <div class="title">
            {{getOrderText()}}
            <!-- <i class="iconfont icon-wenjianguanli"></i> -->
            <!-- 订单状态 -->
          </div>
          <div class="desc">
            订单中包含付款减库存商品, 支付完成才会为您预留库存。
          </div>
          <!-- <span class="status" :class="[getOrderColor()]">
            {{getOrderText()}}
          </span> -->
        </div>
        <!-- 地址信息 -->
        <div class="customre-item" v-if="addressInfo && addressInfo.consignee">
          <i class="iconfont icon-location"></i>
          <div class="detail">
            <p class="title">
              {{addressInfo.consignee}}&nbsp;&nbsp;
              <span>{{addressInfo.telephone}}</span>
            </p>
            <div class="location">
              {{addressInfo.province}}{{addressInfo.address}}
            </div>
          </div>
        </div>
        <div class="customre-item" v-else-if="clientName">
          <i class="iconfont icon-location"></i>
          <div class="detail">
            <p class="title">
              {{clientName}}&nbsp;&nbsp;
              <span>{{clientMobile}}</span>
            </p>
            <div class="location">
              {{clientAddress}}
            </div>
          </div>
        </div>
        <!-- 地址信息 end -->

        <!-- 产品信息 -->
        <div class="cart-list">
          <div class="store">
            <i class="iconfont icon-store"></i>
            {{customer.companyName}}
          </div>

          <div class="product-list">
            <div class="product-item" v-for="(item, index) in productList" :key="index">
              <div class="img">
                <w-img :src="item.imgPath"></w-img>
              </div>
              <div class="detail">
                <p class="title">
                  {{item.xhgg || '暂无'}}
                </p>
                <div class="bottom">
                  <div class="nums">
                    x {{item.qty}}
                  </div>
                  <p class="price">
                    ￥{{item.normSum || '0'}}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 产品信息 end -->

        <!-- 其他信息 -->
        <div class="w-tableview">
          <div class="cell">
            <span class="title">
              订单编号:
            </span>
            <span class="desc">
              {{orderDetail.billNo}}
            </span>
          </div>
          <!-- <div class="cell">
            <span class="title">
              订单总价:
            </span>
            <span class="desc price">
              ￥{{orderDetail.totalPrice || 0}}
            </span>
          </div> -->
          <div class="cell">
            <span class="title">
              付款方式:
            </span>
            <span class="desc blue">
              {{orderDetail.payType | getPayTypeStr}}
            </span>
          </div>
          <div class="cell">
            <span class="title">
              相关文件:
            </span>
            <span class="desc" v-if="orderDetail.certType == 1">
              资质文件
            </span>
            <span class="desc" v-else-if="orderDetail.certType == 2">
              发票
            </span>
            <span class="desc" v-else-if="orderDetail.certType == 3">
              出库单
            </span>
            <span class="desc" v-else>
              不需要
            </span>
          </div>
          <div class="cell">
            <span class="title">
              商品数量:
            </span>
            <span class="desc">
              {{orderDetail.totalCount || 0}}
            </span>
          </div>
          <div class="cell">
            <span class="title">
              配送方式:
            </span>
            <span class="desc">
              {{ orderDetail.postType == 1 ? '送货上门' : '门店自提'}}
            </span>
          </div>
          <!-- <div class="cell">
            <span class="title">
              是否缺货
            </span>
            <span class="desc">
              需要订货
            </span>
          </div> -->
          <div class="cell textarea">
            <span class="title">
              备注信息:
            </span>
            <span class="desc">
              {{orderDetail.memo || ''}}
            </span>
          </div>
        </div>
        <!-- 其他信息 end -->

        <!-- 商品总价 -->
        <div class="price-row">
          <!-- <div class="w-underline height-1"></div> -->
          <div class="row">
            <span class="title">
              商品总价:
            </span>
            <span class="desc">￥{{orderDetail.totalPrice || '0'}}</span>
          </div>
          <div class="w-underline height-1"></div>
          <div class="row row2">
            <span class="title">实付金额: </span>
            <span class="price">
              ￥{{orderDetail.totalPrice || '0'}}
            </span>
          </div>
        </div>
        <!-- 商品总价 -->

      </div>
      <!-- 付款信息 end -->

    </div>
    <!-- 正文内容 end -->

    <!-- 底部 -->
    <template #w-footer>
      <footer class="footer">
        <button v-if="orderDetail.billType == 2" @click.stop="onConfirmReceive()" class="plain-red-btn">
          确认收货
        </button>
        <button v-if="orderDetail.billType == 6" @click.stop="onConfirmPay()"  class="plain-red-btn">
          确认付款
        </button>
        <button class="plain-grey-dark-btn" v-if="orderDetail.billType == 1" @click.stop="onCloseOrder()">
          关闭订单
        </button>
      </footer>
    </template>
    <!-- 底部 end -->

  </w-container>
</template>
<script>
import Utils from '@/common/Utils';
import service from '@/services/order.service';

export default {
  data() {
    return {
      totalNum: 0,
      productList: [],
      totalPrice: 0,
      discountPrice: 0,
      tips: '',
      orderDetail: {},
      customer: {},
      addressInfo: {},
      clientName: '',
      clientMobile: '',
      clientAddress: '',
    };
  },
  created() {},
  mounted() {
    this.getData();
  },
  components: {},
  filters: {
    getPayTypeStr(val) {
      let str = '';
      switch (parseInt(val, 10)) {
        case 1:
          str = '在线支付';
          break;
        case 2:
          str = '现金/刷卡';
          break;
        case 3:
          str = '赊销';
          break;
        case 11:
          str = '支付宝支付';
          break;
        case 12:
          str = '微信支付';
          break;
        case 13:
          str = '银联支付';
          break;
        default:
          break;
      }
      return str;
    },
  },
  methods: {
    // 获取订单状态颜色
    getOrderColor() {
      let color = 'red';
      switch (this.orderDetail.billType) {
        case 1:
          color = 'orange';
          break;
        case 2:
          color = 'red';
          break;
        case 3:
          color = 'green';
          break;
        case 4:
          color = 'grey';
          break;
        case 5:
          color = 'grey';
          break;
        default:
          break;
      }
      return color;
    },
    // 获取订单状态文字
    getOrderText() {
      let txt = '已完成';
      switch (this.orderDetail.billType) {
        case 1:
          txt = '待发货';
          break;
        case 2:
          txt = '待收货';
          break;
        case 3:
          txt = '已完成';
          break;
        case 4:
          txt = '售后中';
          break;
        case 5:
          txt = '已关闭';
          break;
        case 6:
          txt = '待付款';
          break;
        default:
          break;
      }
      return txt;
    },
    // 确认付款, 付款成功
    async onConfirmPay() {
      if (this.loading) return;
      this.loading = true;
      Utils.showLoading();
      const result = await service.changeOrderType({ userid: Utils.getUserId(this), orderId: this.orderDetail.billNo, type: 1 });
      Utils.hideLoading();
      this.loading = false;
      if (!result) return;
      Utils.showToast('确认付款成功');
      this.orderDetail.billType = 1;
      this.$store.commit('order/updateOrderData', { item: this.orderDetail });
    },
    // 确认收货
    async onConfirmReceive() {
      if (this.loading) return;
      this.loading = true;
      Utils.showLoading();
      const result = await service.changeOrderType({ userid: Utils.getUserId(this), orderId: this.orderDetail.billNo, type: 3 });
      Utils.hideLoading();
      this.loading = false;
      if (!result) return;
      Utils.showToast('确认收货成功');
      this.orderDetail.billType = 3;
      this.$store.commit('order/updateOrderData', { item: this.orderDetail });
    },
    // 关闭订单
    onCloseOrder() {
      Utils.showConfirm({
        title: '提醒',
        content: '确定关闭该订单?',
        maskClosable: true,
        onConfirm: async () => {
          if (this.loading) return;
          this.loading = true;
          Utils.showLoading();
          const result = await service.changeOrderType({ userid: Utils.getUserId(this), orderId: this.orderDetail.billNo, type: 5 });
          Utils.hideLoading();
          this.loading = false;
          if (!result) return;
          Utils.showToast('关闭订单成功');
          this.orderDetail.billType = 5;
          this.$store.commit('order/updateOrderData', { item: this.orderDetail });
        },
      });
    },
    // 获取购物单数据
    async getData() {
      Utils.showLoading();
      const result = await service.getOrderDetail({ userid: Utils.getUserId(this), orderId: this.$route.query.id });
      Utils.hideLoading();
      if (!result) return;
      this.orderDetail = result;
      this.productList = [...result.itemList];
      this.customer = result.client;
      this.totalNum = result.total;
      this.addressInfo = result.addressInfo || {};
      this.clientName = result.clientName || '';
      this.clientMobile = result.clientMobile || '';
      this.clientAddress = result.clientAddress || '';
    },
  },
};
</script>
<style lang="scss" scoped>
// @import '~@/styles/variable.scss';
@import '~@/styles/components/button.scss';

.product-list .cart-item .nums {
  text-align: center;
  border: 0;
  border-radius: 0;
  display: block;
}

.order-container {
  // height: 100%;
  width: 100%;
  padding-bottom: .1rem;
}

.price {
  font-size:  12px;
  color: $color-red;
  @include text-ellipsis;
}

.cart-list {
  background: #fff;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: .06rem solid $color-bg;
  padding-bottom: .1rem;

  .store {
    display: flex;
    align-items: center;
    padding-left: .1rem;
    color: $color-grey-6;
    @include text-ellipsis;
    height: .3rem;

    .iconfont {
      margin-right: .05rem;
    }

    .icon-store {
      font-size: .16rem;
    }
  } // end store

  // .product-list {
  //   // max-height: 40vh;
  //   // overflow: auto;
  // }

  .product-item {
    display: flex;
    padding: 0 .1rem;
    align-items: center;
    padding-top: .05rem;

    .img {
      width: .4rem;
      height: .4rem;
      overflow: hidden;
      display: flex;
      justify-content: center;
      img {
        height: 100%;
      }
    }

    .detail {
      flex: 1;
      overflow: hidden;
      padding-left: .1rem;
      font-size:  12px;

      .bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        @include text-ellipsis;
        margin-top: .1rem;

        .nums {
          max-width: 30%;
          color: $color-grey;
        }
      } // end bottom
    } // end detail
  } // end product-item

} // end left

.price-row {
  padding-top: .05rem;
  border-top: .1rem solid $color-bg;

  .w-underline {
    margin: 0 .12rem;
    margin-bottom: .1rem;
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    @include text-ellipsis;
    height: .2rem;
    padding: 0 .1rem;
    margin-bottom: .05rem;

    .title {
      color: $color-grey-6;
      font-size: 10px;
    }

    .desc, .price {
      font-size: 14px;
      font-weight: 700;
    }
  }

  .row2 {
    justify-content: flex-end;

    .title {
      margin-right: .05rem;
    }

    .price {
      font-size:  16px;
    }
  }
} // end order-bottom

.detail {
  background: #fff;
  width: 100%;
  overflow: auto;

  .order-status {
    padding: .18rem .12rem;
    border-bottom: .06rem solid $color-bg;
    color: #fff;
    background: $color-gradient1;

    &.green {
      background: #1be491;
    }

    &.orange {
      background: $color-orange;
    }

    &.grey {
      background: #bbb;
    }

    .title {
      display: flex;
      align-items: center;
      font-size: 16px;
      .iconfont {
        font-size:  20px;
        margin-right: .05rem;
      }
    }

    .desc {
      font-size: 10px;
      @include break-word;
      margin-top: .1rem;
    }

    .status {
      font-size: .13rem;
      flex-shrink: 0;
      color: $color-red;

      &.red {
        color: $color-red;
      }

      &.orange {
        color: $color-orange;
      }

      &.grey {
        color: $color-grey;
      }

      &.green {
        color: $color-green;
      }
    }
  }


  .customre-item {
    display: flex;
    align-items: center;
    border-bottom: .06rem solid $color-bg;
    padding: 0 .12rem;

    .icon-location {
      font-size:  20px;
      color: #fff;
      width: .3rem;
      height: .3rem;
      line-height: .3rem;
      border-radius: .3rem;
      text-align: center;
      @include background-left-gradient(#ff4d3e, $color-orange);
    }

    .detail {
      flex: 1;
      overflow: hidden;
      padding: .1rem;

      .title {
        margin-bottom: .05rem;
        span {
          color: $color-grey;
          font-size: .13rem;
        }
      }

      .location {
        @include break-word;
        line-height: .16rem;
      }
    }

    .icon-arrow-right {
      color: $color-grey;
    }
  } // end customer-item

  .w-tableview {
    padding: .05rem 0;
    padding-left: .12rem;
    .cell {
      margin: 0;
      height: .25rem;
      line-height: .25rem;

      &::after {
        display: none;
      }

      .title {
        font-size: 10px;
      }

      .desc {
        color: $color-black;
        text-align: left;
        font-size: 10px;
      }

      .price {
        color: $color-red;
      }
    } // end cell


    .textarea {
      height: auto;
      min-height: .25rem;
      align-items: flex-start;

      .title {
        line-height: .25rem;
      }
      .desc {
        white-space: normal;
        line-height: 20px;
        padding-top: .02rem;
      }
    }

  } // end w-tableview
}

.footer {
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: .05rem;
  height: 100%;

  button {
    display: block;
    width: auto;
    height: .25rem;
    line-height: .25rem;
    margin: 0;

    &.grey {
      color: $color-grey-6;
    }

    &:active {
      background: $color-bg;
    }
  }
}
</style>