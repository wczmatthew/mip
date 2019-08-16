<!-- 确认订单 -->
<template lang='html'>
  <w-container show-header show-back show-footer>
    <!-- 顶部栏 -->
    <div slot="header-mid">
      确认订单
    </div>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->

    <!-- 客户信息 -->
    <div class="customre-item w-underline" @click.stop="onChangeAddress()">
      <i class="iconfont icon-kehu"></i>
      <div class="detail" v-if="!selectAddress || !selectAddress.id">
        请先选择收货地址
      </div>
      <div class="detail" v-else>
        <p class="title">
          {{selectAddress.consignee}}&nbsp;&nbsp;
          <span>{{selectAddress.telephone}}</span>
        </p>
        <div class="location">
          <i class="iconfont icon-location"></i>
          {{selectAddress.province}} {{selectAddress.address}}
        </div>
      </div>
      <i class="iconfont icon-arrow-right"></i>
    </div>
    <!-- 客户信息 end -->

    <!-- 产品列表 -->
    <div class="product-img-list">
      <div class="img-list">
        <div class="item">
          <div class="img">
            <w-img></w-img>
          </div>
          <i class="num">1</i>
        </div>
        <div class="item">
          <div class="img">
            <w-img></w-img>
          </div>
          <i class="num">300</i>
        </div>
      </div>

      <div class="right">
        共32件
        <i class="iconfont icon-arrow-down arrow-up"></i>
      </div>
    </div>
    <!-- 产品列表 end -->

    <!-- 产品详细列表 -->
    <!-- 产品详细列表 end -->

    <!-- 其他内容 -->
    <div class="w-tableview">
      <div class="cell">
        <span class="title">
          支付方式
        </span>
        <cube-select
          class="select desc"
          placeholder="请选择支付方式"
          v-model="payMode"
          :options="payModeOptions">
        </cube-select>
      </div>

      <div class="cell">
        <span class="title">
          提货方式
        </span>
        <cube-select
          class="select desc"
          placeholder="请选择提货方式"
          v-model="sendType"
          :options="sendTypeOptions">
        </cube-select>
      </div>

      <div class="cell">
        <span class="title">
          商品金额
        </span>
        <span class="desc price">
          <small>￥</small> 118.66
        </span>
      </div>

      <div class="cell">
        <span class="title">
          优惠金额
        </span>
        <span class="desc price">
          <small>￥</small> 118.66
        </span>
      </div>

      <div class="cell">
        <span class="title">
          抹零金额
        </span>
        <!-- <input type="number" class="desc"> -->
        <div class="desc">
          <cube-input type="number" placeholder="请输入抹零金额"></cube-input>
        </div>
      </div>

      <div class="cell textarea-cell">
        <span class="title">
          备注
        </span>
        <div class="desc">
          <!-- <textarea placeholder="请输入备注"></textarea> -->
          <cube-textarea placeholder="请输入备注" :maxlength="200"></cube-textarea>
        </div>
      </div>
    </div>
    <!-- 其他内容 end -->

    <!-- 正文内容 end -->

    <div class="cart-bottom" slot="w-footer">
      <div class="detail">
        <p class="red bold">
          <span>实付: </span>
          <small>￥</small>
          {{(totalPrice).toFixed(2)}}
        </p>
      </div>
      <button type="button" class="orange-btn" @click="onPay()">
        结算
      </button>
    </div>
  </w-container>
</template>
<script>
import { mapGetters } from 'vuex';
import Utils from '@/common/Utils';
import service from '@/services/order.service';

export default {
  data() {
    return {
      routePath: Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'confirmOrder' }), // 获取当前路由
      totalPrice: 0,
      payMode: -1,
      payModeOptions: [
        { text: '在线支付', value: 1 },
        { text: '现金/刷卡', value: 2 },
        { text: '赊销', value: 3 },
      ],
      sendType: -1,
      sendTypeOptions: [
        { text: '送货上门', value: 1 },
        { text: '门店自提', value: 2 },
        { text: '物流配送', value: 3 },
      ],
    };
  },
  created() {},
  mounted() {
    this.getDefaultAddress();
  },
  computed: {
    ...mapGetters('address', {
      selectAddress: 'selectAddress',
    }),
  },
  components: {},
  methods: {
    // 获取默认地址
    async getDefaultAddress() {
      Utils.showLoading();
      const result = await service.getDefaultAddress({ userid: Utils.getUserId(this) });
      if (!result) return;
      Utils.hideLoading();
      this.$store.commit('address/updateSelectAddress', result);
    },
    onChangeAddress() {
      this.$router.push(`${this.routePath}/selectAddress`);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/components/button.scss';

.customre-item {
  display: flex;
  align-items: center;
  padding: .1rem .12rem;
  margin-bottom: .1rem;
  background: #fff;

  .icon-kehu {
    color: $color-black;
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

.product-img-list {
  margin-bottom: .1rem;
  padding: .1rem 0 .1rem .12rem;
  background: #fff;
  display: flex;

  .img-list {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    .item {
      width: .6rem;
      height: .6rem;
      position: relative;
      margin-right: .1rem;
      margin-bottom: .1rem;

      .img {
        width: .6rem;
        height: .6rem;
        overflow: hidden;
        border: 1px solid $color-line;
        @include flex-center;
        img {
          height: .6rem;
        }
      }

      .num {
        height: .15rem;
        min-width: .15rem;
        color: #fff;
        font-size: .1rem;
        border-radius: .15rem;
        padding: 0 .02rem;
        @include flex-center;
        position: absolute;
        top: -.06rem;
        right: -.06rem;
        z-index: 1;
        background: $color-red;
      }
    } // end item
  } // end img-list

  .right {
    padding: 0 .1rem;
    font-weight: 700;
    display: flex;
    align-items: center;

    .iconfont {
      transition: all .3s ease;
      font-weight: 700;
      margin-left: .05rem;
    }

    .arrow-up {
      transform: rotate(-180deg);
    }
  }

} // end product-img-list

.w-tableview {
  .cell {
    margin-left: 0;
    padding-left: .12rem;
  }

  .cell .title {
    width: 23%;
    font-weight: 700;
  }

  .cell .iconfont {
    font-weight: 700;
  }

  .cell .title,
  .cell .desc,
  .cell .iconfont {
    line-height: .44rem;
    color: $color-black;
  }

  .cell .price {
    color: $color-red;
  }

  .textarea-cell {
    height: auto;
    padding: .1rem .12rem;
    textarea {
      height: .6rem;
      border: 0;
      width: 100%;
      line-height: .2rem;
      padding: .1rem 0;

    }
  }
} // end w-tableview


.cart-bottom {
  width: 100%;
  height: 100%;
  border-top: 1px solid $color-line;
  background: #fff;
  display: flex;
  position: relative;
  z-index: 10;

  .mid {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: .12rem;

    input {
      width: .3rem;
      height: .15rem;
      border: 1px solid $color-line;
      text-align: center;
      margin-left: .05rem;
      margin-top: .05rem;
    }
  }


  .detail {
    flex: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 0 .12rem;

    p {
      @include text-ellipsis;
      margin-bottom: .05rem;

      span {
        color: $color-grey;
      }
    }

    .grey {
      color: $color-grey-6;
    }

    .bold {
      font-weight: 700;
    }

    .small {
      font-size: .1rem;
    }

    .red {
      color: $color-red;
    }
  }

  .orange-btn,
  .red-btn {
    height: 100%;
    border-radius: 0;
    font-size: .14rem;
    width: 40%;
    flex-shrink: 0;
  }

  .orange-btn {
    @include background-left-gradient(#e43d2e, $color-red);
  }
} // cart-bottom
</style>
<style lang="scss">
.w-tableview .cell .desc {

  .cube-input {
    margin-top: .03rem;
  }

  .cube-textarea,
  .cube-input-field {
    text-align: right;
  }
}
</style>
