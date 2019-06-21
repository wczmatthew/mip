<!-- 确认订单 -->
<template lang='html'>
  <w-container show-header show-back>
    <!-- 顶部栏 -->
    <div slot="header-mid">
      确认订单
    </div>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->

    <!-- 客户信息 -->
    <div class="customre-item w-underline" @click.stop="onChangeCustomer()">
      <i class="iconfont icon-kehu"></i>
      <div class="detail" v-if="!customer || !customer.id">
        请先选择客户
      </div>
      <div class="detail" v-else>
        <p class="title">
          {{customer.name}}&nbsp;&nbsp;
          <span>{{customer.phone}}</span>
        </p>
        <div class="location">
          <i class="iconfont icon-location"></i>
          {{customer.address}}
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
        <span class="desc">
          请选择
        </span>
        <i class="iconfont icon-arrow-down"></i>
      </div>

      <div class="cell">
        <span class="title">
          提货方式
        </span>
        <span class="desc">
          请选择
        </span>
        <i class="iconfont icon-arrow-down"></i>
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

      <div class="cell">
        <span class="title">
          商品金额
        </span>
        <span class="desc price">
          ￥: 118.66
        </span>
      </div>

      <div class="cell">
        <span class="title">
          优惠金额
        </span>
        <span class="desc price">
          ￥: 118.66
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
    </div>
    <!-- 其他内容 end -->

    <!-- 正文内容 end -->
  </w-container>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
    };
  },
  created() {},
  mounted() {},
  computed: {
    ...mapGetters('customer', {
      customer: 'selectCustomer',
    }),
  },
  components: {},
  methods: {},
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variable.scss';

.customre-item {
  display: flex;
  align-items: center;
  padding: 0 .12rem;
  margin-bottom: .1rem;
  background: #fff;

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
        background: $color-blue;
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
    font-weight: 700;
  }

  .cell .title {
    width: 23%;
  }

  .cell .title,
  .cell .desc,
  .cell .iconfont {
    font-weight: 700;
    line-height: .44rem;
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
</style>
<style lang="scss">
.w-tableview .cell .desc {
  .cube-textarea,
  .cube-input-field {
    text-align: right;
  }
}
</style>
