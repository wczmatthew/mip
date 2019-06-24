<!-- 产品详情 -->
<template lang='html'>
  <w-container show-back show-header show-footer class="product-detail">
    <!-- 顶部栏 -->
    <p slot="header-mid">
      产品详情
    </p>

    <div class="header-right" slot="header-right">
      <w-cart-icon :current-path="routePath" color="blue" class="msg-icon"></w-cart-icon>
    </div>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->

    <div class="product-container">
      <!-- 产品图片 -->
      <div class="product-left">
        <div class="banner-img">
          <w-img :src="product.imgPath" v-if="!firstLoading"></w-img>
        </div>
        <!-- 产品价格, 名称 -->
        <div class="price">
          ￥{{product.DJJ || 0}}
        </div>
        <div class="product-title">
          {{product.XHGG || '暂无'}}
        </div>
        <!-- 产品价格, 名称 end -->
      </div>
      <!-- 产品图片 end -->

      <div class="product-content">
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
      </div>

    </div>

    <!-- 正文内容 end -->

    <!-- 底部栏 -->
    <footer slot="w-footer" class="footer">
      <div class="left">
        <div class="icon" @click="toIndex()">
          <i class="iconfont icon-store"></i>
          <p>首页</p>
        </div>
        <div class="icon" @click="onToggleCollect()">
          <i class="iconfont" :class="[product.isCollect ? 'icon-collect' :
          'icon-notcollect']"></i>
          <p>
            {{product.isCollect ? '取消收藏' : '收藏'}}
          </p>
        </div>
        <div class="icon">
          <i class="iconfont icon-kefu"></i>
          <p>技术支持</p>
        </div>
      </div>

      <div class="btns">
        <button class="light-blue-btn" @click="onAddCart()">
          加入购物车
        </button>
        <!-- <button class="blue-btn">
          立即购买
        </button> -->
      </div>
    </footer>
    <!-- 底部栏 end -->
  </w-container>
</template>
<script>
import Utils from '@/common/Utils';
import service from '@/services/product.service';
import orderService from '@/services/order.service';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      product: {},
      loading: false,
      firstLoading: true,
      routePath: Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'detail' }), // 获取当前路由
    };
  },
  created() {},
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters('user', {
      userId: 'userId',
    }),
  },
  components: {},
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
      const result = await service.getProductDetail({ bm: this.$route.query.bm });
      if (!result) {
        this.firstLoading = false;
        return;
      }
      Utils.hideLoading();
      this.product = result;
      this.product.isCollect = !!this.product.isCollect;
      this.firstLoading = false;
    },
    // 加入购物车
    async onAddCart() {
      if (this.loading) {
        Utils.showToast('正在加入购物车, 请勿频繁操作');
        return;
      }
      this.loading = true;
      const result = await orderService.addCart({ userid: this.userId, bm: this.$route.query.bm, qty: 1 });
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
      this.product.isCollect = true;
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

  .product-container {
    display: flex;
    height: 100%;
    background: #fff;
  }

  .product-left {
    width: 50%;
    border-right: 1px solid $color-line;
    padding-top: .2rem;
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
  }


  .product-content {
    width: 50%;
  }

  .price {
    color: $color-red;
    font-size: 18px;
    @include text-ellipsis;
    padding: .05rem .12rem;
    background: #fff;
  }

  .product-title {
    font-weight: 700;
    @include break-word;
    padding: .05rem .12rem .1rem;
    background: #fff;
    font-size: 18px;
    margin-bottom: .1rem;
  }

  .w-tableview {
    margin-bottom: .1rem;
  }

  .footer {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    padding-right: .12rem;
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
          font-size: .16rem;
        }

        .icon-collect {
          color: $color-yellow;
        }

        p {
          font-size: 10px;
          text-align: center;
        }
      }
    }

    .btns {
      width: 40%;
      height: 40px;
      display: flex;
      border-radius: 40px;
      overflow: hidden;
      button {
        flex: 1;
        border-radius: 0;
        height: 100%;
        font-size: 16px;
      }
    }
  } // end footer
}
</style>