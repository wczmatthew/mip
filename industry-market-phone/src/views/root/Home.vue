<!--  -->
<template lang='html'>
  <div class="w-container">
    <!-- 顶部栏 -->
    <header class="w-header">
      <div class="city">
        <i class="iconfont icon-location"></i>
        温州
        <i class="iconfont icon-triangle-down"></i>
      </div>

      <div class="w-header-mid">
        <w-search class="home-search" disabled show-scan @input-click="toSearch()" style="padding-right: .1rem;"></w-search>
      </div>
      <div class="header-right" slot="header-right">
        <w-scan-icon></w-scan-icon>
      </div>
    </header>
    <!-- 顶部栏 end -->

    <!-- 轮播图 -->
    <div class="banner" v-if="banners && banners.length">
      <cube-slide ref="slide" :data="banners">
        <cube-slide-item v-for="(item, index) in banners" :key="index" @click.native="clickHandler(item)" class="banner-item" :auto-play="autoplay">
          <img :src="item.url">
        </cube-slide-item>
      </cube-slide>
    </div>
    <!-- 轮播图 end -->

    <!-- 常用功能 -->
    <div class="w-grid-list">
      <!-- <div class="item" @click="toGuide()">
        <img src="~@/assets/home/mode-bg1.png" alt="" class="bg">
        <div class="detail">
          <p>店内模式</p>
          <p>Store</p>
          <p class="underline">Mode</p>
        </div>
      </div>

      <div class="item" @click="toProductList()">
        <img src="~@/assets/home/mode-bg2.png" alt="" class="bg">
        <div class="detail">
          <p>传统模式</p>
          <p>Traditional</p>
          <p class="underline">Mode</p>
        </div>
      </div> -->

      <!-- <div class="item">
        <img src="~@/assets/home/mode-bg3.png" alt="" class="bg">
        <div class="detail">
          <p>优惠信息</p>
          <p>Preferential</p>
          <p class="underline">Information</p>
        </div>
      </div>

      <div class="item" @click="toCustomers()">
        <img src="~@/assets/home/mode-bg4.png" alt="" class="bg">
        <div class="detail">
          <p>客户洽谈</p>
          <p>Customer</p>
          <p class="underline">Negotiation</p>
        </div>
      </div> -->

    </div>
    <!-- 常用功能 end -->

  </div>
</template>
<script>
import WSearch from '@/components/WSearch.vue';
import banner from '@/assets/home/banner.png';
import Utils from '@/common/Utils';
import indexService from '@/services/index.service';

export default {
  data() {
    return {
      banners: [
        {
          url: banner,
          title: '图片1',
        },
      ],
      caterotyList: [],
      autoplay: true,
    };
  },
  watch: {
    '$route'(to) {
      if (to.path === '/market' && parseInt(to.query.tab, 10) === 0) {
        this.autoplay = true;
      } else {
        // this.autoplay = false;
      }
      // console.log('autoplay: ', this.autoplay);
      // this.$refs.slide && this.$refs.slide.refresh();
    },
  },
  created() {},
  mounted() {
    this.getBanner();
  },
  components: {
    WSearch,
  },
  methods: {
    toSearch() {
      this.$router.push('/market/search');
    },
    // 点击轮播图
    clickHandler(item) {
      if (!item.goUrl) return;
      if (item.goUrl.indexOf('http') > -1) {
        try {
          // TODO:
          // eslint-disable-next-line
          native_listen('goToUrl', { url: item.goUrl });
        } catch (error) {
          console.log('error: ', error);
        }
        return;
      }

      this.$router.push(item.url);
    },
    // 点击类目
    onCategoryClick(item) {
      if (item.url) {
        this.$router.push(item.url);
      }
    },
    // 获取首页轮播图
    async getBanner() {
      Utils.showLoading();
      const result = await indexService.getBanner(5);
      Utils.hideLoading();
      if (!result) return;
      this.banners = [...result];
      this.$nextTick(() => {
        this.$refs.slide && this.$refs.slide.refresh();
      });
    },
    // 传统模式, 产品列表
    toProductList() {
      this.$router.push('/market/productList');
    },
    // 店内模式
    toGuide() {
      this.$router.push('/market?tab=guide');
    },
    // 客户洽谈
    toCustomers() {
      this.$router.push('/market?tab=customer');
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variable.scss';
.w-container {
  background: #fff;
}

.w-header {
  width: 100%;
  height: .44rem;
  display: flex;
  align-items: center;
  background: rgba($color: #000000, $alpha: .6);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  &::after {
    display: none;
  }

  .city {
    margin: 0 .1rem;
    height: .25rem;
    border-radius: .25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 30%;
    color: #fff;
    flex-shrink: 0;
    font-size: .12rem;

    .iconfont {
      margin-left: .03rem;
      font-size: .1rem;
    }

    .icon-location {
      font-size: .14rem;
      margin-right: .05rem;
    }
  }

  .header-right {
    position: static;
  }
}

.banner {
  width: 100%;
  min-height: 2rem;
  overflow: hidden;

  .banner-item {
    height: 2rem;
    @include flex-center;
    img {
      height: 2rem;
    }
  }
}

.w-grid-list {
  width: 95%;
  margin: 0 auto;
  justify-content: space-around;
  margin-top: .1rem;

  .item {
    width: 45%;
    padding: 0;
    padding-bottom: .1rem;
    padding-top: .05rem;
    position: relative;
    overflow: hidden;

    &:active {
      opacity: 0.8;
    }

    img.bg {
      width: 100%;
      display: block;
    }

    .detail {
      position: absolute;
      top: 30%;
      left: 15%;
      z-index: 10;
      width: 50%;

      p {
        color: #fff;
        font-size: .16rem;
        margin-bottom: .02rem;

        &.underline::after {
          display: block;
          content: ' ';
          width: 20%;
          height: .02rem;
          background-color: #fff;
          margin-top: .05rem;
          margin-left: .02rem;
        }
      }
    }
  }
}

</style>