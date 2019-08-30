<!-- 订单详情 -->
<template lang='html'>
  <w-container show-header show-back>
    <!-- 顶部栏 -->
    <div slot="header-mid">
      订单详情
    </div>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <!-- 正文内容 -->
    <div class="order-container">
      <!-- 购物车信息 -->
      <!-- <div class="left">
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
                  ￥{{item.normSum || '--'}}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="order-bottom">
          <div class="w-underline height-1"></div>

          <div class="row">
            <span class="title">
              商品总价:
            </span>
            <span class="price">￥{{orderDetail.totalPrice || '--'}}</span>
          </div>
          <div class="row">
            <span class="title">实付金额: </span>
            <span class="price">
              ￥{{orderDetail.totalPrice || '--'}}
            </span>
          </div>
        </div>
      </div> -->
      <!-- 购物车信息 -->

      <!-- 付款信息 -->
      <div class="detail">
        <div class="order-status">
          <span class="title">
            <i class="iconfont icon-wenjianguanli"></i>
            订单状态
          </span>
          <span class="status" :class="[getOrderColor()]">
            {{getOrderText()}}
          </span>
        </div>
        <!-- 客户信息 -->
        <div class="customre-item">
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
        <!-- 客户信息 end -->

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
                    ￥{{item.normSum || '--'}}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="order-bottom">
            <div class="w-underline height-1"></div>

            <div class="row">
              <span class="title">
                商品总价:
              </span>
              <span class="price">￥{{orderDetail.totalPrice || '--'}}</span>
            </div>
            <div class="row">
              <span class="title">实付金额: </span>
              <span class="price">
                ￥{{orderDetail.totalPrice || '--'}}
              </span>
            </div>
          </div>
        </div>
        <!-- 产品信息 end -->

        <!-- 其他信息 -->
        <div class="w-tableview">
          <div class="cell">
            <span class="title">
              订单编号
            </span>
            <span class="desc">
              {{orderDetail.billNo}}
            </span>
          </div>
          <div class="cell">
            <span class="title">
              订单总价
            </span>
            <span class="desc price">
              ￥{{orderDetail.totalPrice || 0}}
            </span>
          </div>
          <div class="cell">
            <span class="title">
              付款方式
            </span>
            <span class="desc blue">
              {{orderDetail.payType | getPayTypeStr}}
            </span>
          </div>
          <div class="cell">
            <span class="title">
              相关文件
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
              商品数量
            </span>
            <span class="desc">
              {{orderDetail.totalCount || 0}}
            </span>
          </div>
          <div class="cell">
            <span class="title">
              配送方式
            </span>
            <span class="desc">
              {{ orderDetail.postType == 1 ? '送货上门' : '门店自提'}}
            </span>
          </div>
          <div class="cell">
            <span class="title">
              是否缺货
            </span>
            <span class="desc">
              需要订货
            </span>
          </div>
          <div class="cell textarea">
            <span class="title">
              备注信息
            </span>
            <span class="desc">
              {{orderDetail.memo || ''}}
            </span>
          </div>
        </div>

        <!-- <div class="pay-msg">
          <div class="title">
            备<i class="opacity-0">占位</i>注:
          </div>
          <cube-textarea placeholder="请输入..." v-model="tips" :indicator="true" :maxlength="200" class="textarea"></cube-textarea>
        </div> -->
        <!-- 其他信息 end -->

    </div>
    <!-- 付款信息 end -->

  </div>
    <!-- 正文内容 end -->
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
    // 获取购物车数据
    async getData() {
      Utils.showLoading();
      const result = await service.getOrderDetail({ userid: Utils.getUserId(this), orderId: this.$route.query.id });
      Utils.hideLoading();
      if (!result) return;
      this.orderDetail = result;
      this.productList = [...result.itemList];
      this.customer = result.client;
      this.totalNum = result.total;
      this.addressInfo = result.addressInfo;
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variable.scss';

.product-list .cart-item .nums {
  text-align: center;
  border: 0;
  border-radius: 0;
  display: block;
}

.order-container {
  height: 100%;
  width: 100%;
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

  .store {
    display: flex;
    align-items: center;
    padding-left: .1rem;
    color: $color-grey-6;
    @include text-ellipsis;
    height: .3rem;
    margin-top: .1rem;

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

  .order-bottom {
    margin-top: .1rem;
    padding-bottom: .1rem;

    .w-underline {
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
      }

      .price {
        font-size:  14px;
      }
    }
  } // end order-bottom
} // end left

.detail {
  background: #fff;
  width: 100%;
  overflow: auto;

  .order-status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .1rem .12rem;
    border-bottom: .06rem solid $color-bg;

    .title {
      display: flex;
      align-items: center;
      .iconfont {
        font-size:  20px;
        margin-right: .05rem;
      }
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
      border-radius: 100%;
      text-align: center;
      @include background-left-gradient($color-gradient1, $color-gradient2);
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
    padding-left: .12rem;
    .cell {
      margin: 0;
      // height: .3rem;

      // &::after {
      //   display: none;
      // }

      .desc {
        color: $color-black;
      }

      .price {
        color: $color-red;
      }
    } // end cell


    .textarea {
      height: auto;
      min-height: .4rem;
      align-items: flex-start;
      padding-top: .05rem;

      .title {
        line-height: .4rem;
      }
      .desc {
        white-space: normal;
      }
    }

  } // end w-tableview
}
</style>