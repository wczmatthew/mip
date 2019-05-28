<!--  -->
<template lang='html'>
  <w-container show-footer class="product-detail">
    <!-- 顶部栏 -->
    <header class="header">
      <div class="back" @click="$router.back();">
        <i class="iconfont icon-back"></i>
      </div>
      <p class="header-mid"></p>

      <div class="header-right">
        <div class="circle">
          <w-msg-icon class="msg-icon"></w-msg-icon>
        </div>
        <div class="circle">
          <i class="iconfont icon-cart"></i>
        </div>
      </div>
    </header>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->

    <!-- 产品图片 -->
    <div class="banner-img">
      <w-img :src="product.imgPath"></w-img>
    </div>
    <!-- 产品图片 end -->

    <!-- 产品价格, 名称 -->
    <div class="price">
      ￥6.18-128
    </div>
    <div class="product-title">
      正泰空气开关NBE7小型断路器63A总空开家用1P短路保护空调电闸
    </div>
    <!-- 产品价格, 名称 end -->

    <!-- 规格 -->
    <div class="w-tableview">
      <div class="cell">
        <div class="title">
          规格选择
        </div>
        <div class="desc">
          已选“32A”“1P”
        </div>
        <i class="iconfont icon-arrow-right"></i>
      </div>
    </div>
    <!-- 规格 end -->


    <!-- 正文内容 end -->

    <!-- 底部栏 -->
    <footer slot="w-footer" class="footer">
      <div class="left">
        <div class="icon">
          <i class="iconfont icon-store"></i>
          <p>首页</p>
        </div>
        <div class="icon">
          <i class="iconfont icon-collect"></i>
          <p>已收藏</p>
        </div>
        <div class="icon">
          <i class="iconfont icon-kefu"></i>
          <p>技术支持</p>
        </div>
      </div>

      <div class="btns">
        <button class="light-blue-btn">
          加入购物车
        </button>
        <button class="blue-btn">
          立即购买
        </button>
      </div>
    </footer>
    <!-- 底部栏 end -->
  </w-container>
</template>
<script>
import Utils from '@/common/Utils';
import service from '@/services/product.service';

export default {
  data() {
    return {
      product: {},
    };
  },
  created() {},
  mounted() {
    this.getData();
  },
  components: {},
  methods: {
    async getData() {
      Utils.showLoading();
      const result = await service.getProductDetail(this.$route.query.bm);
      Utils.hideLoading();
      if (!result) return;
      this.product = result;
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variable.scss';
@import '~@/styles/components/button.scss';

.product-detail {

  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: .44rem;
    display: flex;

    .back {
      width: .44rem;
      height: 100%;
      @include flex-center;

      .iconfont {
        width: .25rem;
        height: .25rem;
        background: $color-grey;
        color: #fff;
        text-align: center;
        line-height: .25rem;
        border-radius: .25rem;
      }
    } // end back

    .header-mid {
      flex: 1;
      text-align: center;
      line-height: .44rem;
    }

    .header-right {
      display: flex;
      padding-right: .1rem;

      .circle {
        width: .4rem;
        height: .44rem;
        @include flex-center;
        .iconfont,
        .msg-icon {
          width: .25rem;
          height: .25rem;
          background: $color-grey;
          color: #fff;
          text-align: center;
          line-height: .25rem;
          border-radius: .25rem;
          font-size: .2rem;
        }
      }
    }
  }

  .banner-img {
    width: 100%;
    height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;

    img {
      max-width: 100%;
      height: 100%;
    }
  }

  .price {
    color: $color-red;
    font-size: .18rem;
    @include text-ellipsis;
    padding: .05rem .12rem .1rem;
    background: #fff;
  }

  .product-title {
    font-weight: 700;
    @include break-word;
    padding: .05rem .12rem;
    background: #fff;
    font-size: .18rem;
  }

  .w-tableview {
    margin-top: .1rem;
  }

  .footer {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    padding-right: .12rem;

    .left {
      display: flex;
      .icon {
        display: block;
        text-align: center;
        color: $color-grey;
        padding: .06rem .1rem;

        .iconfont {
          display: block;
          margin-bottom: .05rem;
          font-size: .25rem;
        }

        .icon-collect {
          color: $color-yellow;
        }

        p {
          font-size: .12rem;
          text-align: center;
        }
      }
    }

    .btns {
      width: 40%;
      height: .3rem;
      display: flex;
      border-radius: .3rem;
      overflow: hidden;
      button {
        width: 50%;
        border-radius: 0;
        height: 100%;
        font-size: .14rem;
      }
    }
  } // end footer
}
</style>