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
        <!-- <div class="circle">
          <w-msg-icon class="msg-icon"></w-msg-icon>
        </div> -->
        <div class="circle">
          <!-- <i class="iconfont icon-cart"></i> -->
          <w-cart-icon :current-path="routePath" class="msg-icon"></w-cart-icon>
        </div>
      </div>
    </header>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->

    <!-- 产品图片 -->
    <div class="banner-img">
      <w-img :src="product.imgPath" v-if="!firstLoading"></w-img>
    </div>
    <!-- 产品图片 end -->

    <!-- 产品价格, 名称 -->
    <div class="product-title">
      {{product.XHGG || '暂无'}}
    </div>
    <div class="price">
      ￥{{product.DJJ || 0}}
    </div>
    <!-- 产品价格, 名称 end -->

    <!-- 规格 -->
    <!-- <div class="w-tableview">
      <div class="cell">
        <div class="title">
          规格选择
        </div>
        <div class="desc">
          已选“32A”“1P”
        </div>
        <i class="iconfont icon-arrow-right"></i>
      </div>
    </div> -->
    <!-- 规格 end -->

    <!-- 产品参数 -->
    <div class="w-tableview">
      <div class="cell">
        <div class="title">
          产品编码
        </div>
        <div class="desc">
          {{product.BM || '--'}}
        </div>
      </div>
      <div class="cell">
        <div class="title">
          单位
        </div>
        <div class="desc">
          {{product.SLDW || '--'}}
        </div>
      </div>
      <div class="cell">
        <div class="title">
          单价
        </div>
        <div class="desc price" style="padding: 0;">
          ￥{{product.DJJ || 0}}
        </div>
      </div>
      <div class="cell">
        <div class="title">
          装箱数
        </div>
        <div class="desc">
          {{product.ZXS || 0}}
        </div>
      </div>
      <div class="cell">
        <div class="title">
          盒装数
        </div>
        <div class="desc">
          {{product.HZS || 0}}
        </div>
      </div>
    </div>
    <!-- 产品参数 -->


    <!-- 正文内容 end -->

    <!-- 底部栏 -->
    <footer slot="w-footer" class="footer">
      <div class="left">
        <div class="icon" @click="toIndex()">
          <i class="iconfont icon-shouye"></i>
          <p>首页</p>
        </div>
        <div class="icon">
          <i class="iconfont icon-gouwuche">
            <i class="num" v-if="cartNum > 0">{{cartNum}}</i>
          </i>
          <p>购物车</p>
        </div>
        <div class="icon icon-star" @click="onToggleCollect()">
          <i class="iconfont" :class="[product.isCollect ? 'icon-collect' :
          'icon-notcollect']"></i>
          <p>
            {{product.isCollect ? '取消收藏' : '收藏'}}
          </p>
        </div>
      </div>

      <div class="btns">
        <button class="orange-btn" @click="onAddCart()">
          加入购物车
        </button>
        <!-- <button class="red-btn">
          立即购买
        </button> -->
      </div>
    </footer>
    <!-- 底部栏 end -->

    <!-- 数量弹窗 -->
    <w-num-modal ref="numModal"></w-num-modal>
    <!-- 数量弹窗 end -->
  </w-container>
</template>
<script>
import Utils from '@/common/Utils';
import service from '@/services/product.service';
import orderService from '@/services/order.service';
import { mapGetters } from 'vuex';
import WNumModal from '@/components/WNumModal.vue';

export default {
  data() {
    return {
      product: {},
      loading: false,
      firstLoading: true,
      routePath: Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'productDetail' }), // 获取当前路由
    };
  },
  created() {},
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters('user', {
      userId: 'userId',
      customerId: 'customerId',
      cartNum: 'cartNum',
    }),
  },
  components: {
    WNumModal,
  },
  methods: {
    toIndex() {
      this.$router.push('/market?tab=home');
    },
    async getData() {
      if (!this.$route.query.bm) {
        Utils.showToast('无法获取改产品详情');
        this.$router.back();
        return;
      }

      this.firstLoading = true;
      Utils.showLoading();
      const result = await service.getProductDetail({ bm: this.$route.query.bm, userid: Utils.getUserId(this) });
      Utils.hideLoading();
      if (!result) {
        this.firstLoading = false;
        return;
      }
      this.product = result;
      this.product.isCollect = !!this.product.isCollect;
      this.firstLoading = false;
    },
    // 加入购物车
    onAddCart() {
      if (!this.customerId) {
        Utils.showAlert({
          title: '提醒',
          content: '您还未绑定经销商, 不能进行下单操作?',
          maskClosable: true,
        });
        return;
      }
      this.$refs.numModal && this.$refs.numModal.show({
        callback: async (type, num) => {
          if (type !== 'confirm') return;
          // 已经选择了客户, 直接将产品加入购物单
          this.startAddCart(num);
        },
      });
    },
    async startAddCart(num) {
      if (this.loading) {
        Utils.showToast('正在加入购物车, 请勿频繁操作');
        return;
      }
      this.loading = true;
      const result = await orderService.addToShopCarWithClient({ userid: this.userId, bm: this.$route.query.bm, qty: num || 1, clientId: this.customerId });
      this.loading = false;
      if (!result) return;
      Utils.showToast('加入购物车成功');
    },
    // 添加收藏或者取消收藏
    onToggleCollect() {
      if (!this.product.isCollect) {
        this.addCollect();
        return;
      }

      this.deleteCollect();
    },
    // 添加收藏
    async addCollect() {
      if (this.loading) {
        Utils.showToast('正在添加到收藏夹, 请勿频繁操作');
        return;
      }
      this.loading = true;
      const result = await orderService.addCollect({ userid: this.userId, bm: this.$route.query.bm });
      this.loading = false;
      if (!result) return;
      // this.product.isCollect = true;
      this.$set(this.product, 'isCollect', true);
      Utils.showToast('添加收藏成功');
    },
    // 取消收藏
    async deleteCollect() {
      if (this.loading) {
        Utils.showToast('正在取消收藏, 请勿频繁操作');
        return;
      }
      this.loading = true;
      const result = await orderService.deleteCollect({ userid: this.userId, bm: this.$route.query.bm });
      this.loading = false;
      if (!result) return;
      this.product.isCollect = false;
      Utils.showToast('取消收藏成功');
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
        width: .3rem;
        height: .3rem;
        background: $color-grey;
        color: #fff;
        text-align: center;
        line-height: .3rem;
        border-radius: .3rem;
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
          width: .3rem;
          height: .3rem;
          background: $color-grey;
          color: #fff;
          text-align: center;
          line-height: .3rem;
          border-radius: .3rem;
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
    padding: .08rem 0;

    img {
      max-width: 100%;
      height: 100%;
    }
  }

  .price {
    color: $color-red;
    font-size: .18rem;
    @include text-ellipsis;
    padding: .05rem .12rem;
    background: #fff;
  }

  .product-title {
    font-weight: 700;
    @include break-word;
    padding: .1rem .12rem .1rem;
    background: #fff;
    font-size: .18rem;
  }

  .w-tableview {
    margin-top: .1rem;
    margin-bottom: .1rem;
  }

  .footer {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    border-top: 1px solid $color-line;

    .left {
      display: flex;
      height: 100%;
      .icon {
        display: block;
        height: 100%;
        text-align: center;
        color: $color-grey;
        padding: 0 .1rem;
        padding-top: .06rem;

        .iconfont {
          display: block;
          margin-bottom: .02rem;
          font-size: .22rem;
          position: relative;

          .num {
            position: absolute;
            top: -.04rem;
            right: -.05rem;
            background: $color-red;
            color: #fff;
            font-size: .1rem;
            min-width: .15rem;
            height: .15rem;
            line-height: .15rem;
            border-radius: .15rem;
          }
        }

        .icon-collect {
          color: $color-red;
        }

        p {
          font-size: .1rem;
          text-align: center;
        }
      }

      .icon-star {
        padding-left: 0;
        padding-right: 0;
        width: .6rem;
      }
    }

    .btns {
      flex: 1;
      height: 100%;
      display: flex;
      overflow: hidden;
      button {
        flex: 1;
        border-radius: 0;
        height: 100%;
        font-size: .14rem;
      }
    }
  } // end footer
}
</style>