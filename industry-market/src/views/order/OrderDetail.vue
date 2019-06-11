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
      <div class="left">
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
          <!-- <div class="row">
            <span class="title">运费: </span>
            <span class="price">
              ￥{{discountPrice.toFixed(2)}}
            </span>
          </div>
          <div class="row">
            <span class="title">优惠金额: </span>
            <span class="price">
              ￥{{discountPrice.toFixed(2)}}
            </span>
          </div> -->
          <div class="row">
            <span class="title">实付金额: </span>
            <span class="price">
              ￥{{orderDetail.totalPrice || '--'}}
            </span>
          </div>
        </div>
      </div>
      <!-- 购物车信息 -->

      <!-- 付款信息 -->
      <div class="right">
        <div class="order-status w-underline-1">
          <span class="title">
            <i class="iconfont icon-wenjianguanli"></i>
            订单状态
          </span>
          <span class="status" :class="[getOrderColor()]">
            {{getOrderText()}}
          </span>
        </div>
        <!-- 客户信息 -->
        <div class="customre-item w-underline-1">
          <i class="iconfont icon-kehu"></i>
          <div class="detail">
            <p class="title">
              {{customer.name}}&nbsp;&nbsp;
              <span>{{customer.phone}}</span>
            </p>
            <div class="location">
              <i class="iconfont icon-location"></i>
              {{customer.address}}
            </div>
          </div>
        </div>
        <!-- 客户信息 end -->

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
              付款方式
            </span>
            <span class="desc blue">
              {{orderDetail.payType == 1 ? '在线支付' : '现金刷卡'}}
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
              订单总价
            </span>
            <span class="desc price">
              ￥{{orderDetail.totalPrice || 0}}
            </span>
          </div>
          <div class="cell">
            <span class="title">
              配送方式
            </span>
            <span class="desc">
              门店自提
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
      payWay: -1, // 支付方式
      sendType: -1, // 配送方式
      fileMsg: -1, // 相关文件
      orderDetail: {},
      customer: {},
    };
  },
  created() {},
  mounted() {
    this.getData();
  },
  components: {},
  methods: {
    // 获取订单状态颜色
    getOrderColor() {
      let color = 'blue';
      switch (this.orderDetail.billType) {
        case 1:
          color = 'yellow';
          break;
        case 2:
          color = 'blue';
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
  padding-top: .1rem;
  padding-left: .12rem;
  padding-right: .12rem;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.price {
  font-size: .12rem;
  color: $color-red;
  @include text-ellipsis;
}

.left {
  background: #fff;
  height: 100%;
  border-top-right-radius: .05rem;
  border-top-left-radius: .05rem;
  width: 40%;
  display: flex;
  flex-direction: column;

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

  .product-list {
    flex: 1;
    overflow: auto;
  }

  .product-item {
    display: flex;
    padding: 0 .1rem;
    align-items: center;
    padding-top: .1rem;

    .img {
      width: .6rem;
      height: .6rem;
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
      font-size: .12rem;

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
        font-size: .14rem;
      }
    }
  } // end order-bottom
} // end left

.right {
  background: #fff;
  width: 57%;
  height: 100%;
  border-top-right-radius: .05rem;
  border-top-left-radius: .05rem;
  padding-top: .08rem;
  padding-left: .1rem;
  padding-right: .1rem;
  overflow: auto;

  .order-status {
    height: .35rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: .05rem;

    .title {
      display: flex;
      align-items: center;
      .iconfont {
        font-size: .2rem;
        margin-right: .05rem;
      }
    }

    .status {
      font-size: .13rem;
      flex-shrink: 0;
      color: $color-blue;

      &.red {
        color: $color-red;
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
    padding: 0 .12rem;
    margin-bottom: .1rem;

    .icon-kehu {
      color: $color-blue;
      font-size: .2rem;
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

    .cell {
      margin: 0;
      height: .3rem;

      &::after {
        display: none;
      }
    } // end cell

    .textarea {
      height: auto;
      align-items: flex-start;
      padding-top: .05rem;
      .desc {
        white-space: normal;
      }
    }

  } // end w-tableview
}
</style>