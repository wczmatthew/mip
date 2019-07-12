<!--  -->
<template lang='html'>
  <div>
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
    <div class="w-grid-list home-category">
      <div class="item" @click="toCategory()">
        <img src="~@/assets/home/index-icon1.png" alt="">
        <p class="sub-title">
          产品分类
        </p>
      </div>

      <div class="item">
        <img src="~@/assets/home/index-icon2.png" alt="">
        <p class="sub-title">
          洽谈
        </p>
      </div>

      <div class="item">
        <img src="~@/assets/home/index-icon3.png" alt="">
        <p class="sub-title">
          在线设计
        </p>
      </div>

      <div class="item">
        <img src="~@/assets/home/index-icon4.png" alt="">
        <p class="sub-title">
          解决方案
        </p>
      </div>
    </div>
    <!-- 常用功能 end -->

    <!-- 限时抢购 -->
    <div class="home-row">
      <div class="title">
        限时购
        <i class="iconfont icon-shandian"></i>
        <span class="time">{{hour}}</span>
        <span class="time">{{minute}}</span>
        <span class="time">{{second}}</span>
        <span class="tip">
          后结束
        </span>
      </div>

      <div class="w-grid-list product-grid">
        <div class="item" v-for="(item, index) in productList" :key="index">
          <div class="detail">
            <div class="img">
              <img src="~@/assets/home/banner.jpg" alt="">
            </div>
            <p class="product-title">
              {{item.title}}
            </p>
          </div>
          <p class="desc">
            限时9折
          </p>
        </div>
      </div>
    </div>
    <!-- 限时抢购 end -->

    <!-- 广告图片 -->
    <div class="banner2">
      <img src="~@/assets/home/banner2.png" alt="">
    </div>
    <!-- 广告图片 end -->

    <!-- 海报产品列表 -->
    <div class="w-grid-list product-grid2">
      <div class="product product1">
        <p class="title">
          开关插座黑灰色
        </p>
        <p class="desc">
          细腻磨砂材质
        </p>
        <p class="price">
          ￥ 23 起
        </p>
        <div class="label">
          新品
        </div>

        <div class="img">
          <img src="~@/assets/home/product1.png" alt="">
        </div>
      </div>

      <div class="right-product">
        <div class="product product2">
          <p class="title">
            NBE7小型断路器
          </p>
          <p class="desc">
            好口碑好实力
          </p>
          <p class="price">
            ￥ 23 起
          </p>
          <div class="label">
            爆款
          </div>

          <div class="img">
            <img src="~@/assets/home/product2.png" alt="">
          </div>
        </div>

        <div class="product product3">
          <p class="title">
            开关插座黑灰色
          </p>
          <p class="desc">
            细腻磨砂材质
          </p>
          <p class="price">
            ￥ 23 起
          </p>
          <div class="label">
            新品
          </div>

          <div class="img">
            <img src="~@/assets/home/product3.png" alt="">
          </div>
        </div>

      </div>

      <div class="product product2 product4">
        <p class="title">
          NBE7小型断路器
        </p>
        <p class="desc">
          好口碑好实力
        </p>
        <p class="price">
          ￥ 23 起
        </p>
        <div class="label">
          爆款
        </div>

        <div class="img">
          <img src="~@/assets/home/product4.png" alt="">
        </div>
      </div>

      <div class="product product2 product5">
        <p class="title">
          开关插座黑灰色
        </p>
        <p class="desc">
          细腻磨砂材质
        </p>
        <p class="price">
          ￥ 23 起
        </p>
        <div class="label">
          新品
        </div>

        <div class="img">
          <img src="~@/assets/home/product2.png" alt="">
        </div>
      </div>

    </div>
    <!-- 海报产品列表 end -->

    <!-- 产品列表 -->
    <div class="w-grid-list product-list">
      <div class="item">
        <div class="img">
          <img src="~@/assets/home/product1.png" alt="">
        </div>
        <p class="title">
          正泰led灯带
        </p>
        <p class="desc">
          最高优惠200
        </p>
        <p class="price">
          ￥2333
        </p>
      </div>

      <div class="item">
        <div class="img">
          <img src="~@/assets/home/product1.png" alt="">
        </div>
        <p class="title">
          正泰led灯带
        </p>
        <p class="desc">
          最高优惠200
        </p>
        <p class="price">
          ￥2333
        </p>
      </div>

      <div class="item">
        <div class="img">
          <img src="~@/assets/home/product1.png" alt="">
        </div>
        <p class="title">
          正泰led灯带
        </p>
        <p class="desc">
          最高优惠200
        </p>
        <p class="price">
          ￥2333
        </p>
      </div>
    </div>
    <!-- 产品列表 end -->

    <!-- 精品推荐 -->
    <div class="product-bottom">
      <p class="title">
        精品推荐
      </p>

      <div class="w-grid-list">
        <div class="col col2">
          <div class="img">
            <img src="~@/assets/home/product2.png" alt="">
            <div class="bottom">
              标配版到手2433
            </div>
          </div>
          <p class="sub-title">
            卧室灯吸顶灯
          </p>
          <p class="price">
            ￥2433
          </p>
        </div>

        <div class="col col2" style="margin-right: 0;">
          <div class="img">
            <img src="~@/assets/home/product2.png" alt="">
            <div class="bottom">
              标配版到手2433
            </div>
          </div>
          <p class="sub-title">
            卧室灯吸顶灯
          </p>
          <p class="price">
            ￥2433
          </p>
        </div>

        <div class="col col3">
          <div class="img">
            <img src="~@/assets/home/product2.png" alt="">
            <div class="bottom">
              标配版到手2433
            </div>
          </div>
          <p class="sub-title">
            卧室灯吸顶灯
          </p>
          <p class="price">
            ￥2433
          </p>
        </div>

        <div class="col col3">
          <div class="img">
            <img src="~@/assets/home/product2.png" alt="">
            <div class="bottom">
              标配版到手2433
            </div>
          </div>
          <p class="sub-title">
            卧室灯吸顶灯
          </p>
          <p class="price">
            ￥2433
          </p>
        </div>

        <div class="col col3" style="margin-right: 0;">
          <div class="img">
            <img src="~@/assets/home/product2.png" alt="">
            <div class="bottom">
              标配版到手2433
            </div>
          </div>
          <p class="sub-title">
            卧室灯吸顶灯
          </p>
          <p class="price">
            ￥2433
          </p>
        </div>

      </div>
    </div>
    <!-- 精品推荐 end -->
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
      productList: [],
      hour: 0,
      minute: 0,
      second: 0,
      endDate: '2019-6-17 20:00:00',
      timer: null,
    };
  },
  watch: {
    '$route'(to) {
      this.timer && clearInterval(this.timer);
      if (to.path === '/market' && to.query.tab === 'home') {
        this.autoplay = true;
        this.timer = setInterval(() => {
          this.calcTime();
        }, 1000);
      } else {
        // this.autoplay = false;
      }
      // console.log('autoplay: ', this.autoplay);
      // this.$refs.slide && this.$refs.slide.refresh();
    },
  },
  created() {},
  mounted() {
    // this.getBanner();
    console.log('home mounted');

    this.productList = [
      { title: '家用漏保断路器NBE7LE1P+N' },
      { title: '家用漏保断路器NBE7LE1P+N' },
      { title: '家用漏保断路器NBE7LE1P+N' },
      { title: '家用漏保断路器NBE7LE1P+N' },
    ];

    // this.calcTime();
    this.timer && clearInterval(this.timer);
    console.log('timer: ', this.timer);
    this.timer = setInterval(this.calcTime, 1000);
  },
  components: {
    WSearch,
  },
  methods: {
    // 计算结束时间
    calcTime() {
      if (!this.endDate) return;
      // eslint-disable-next-line
      this.endDate = this.endDate.replace(/\-/g, '/');

      const endDate = new Date(this.endDate).getTime();
      const timeDiff = endDate - new Date().getTime();

      // 计算出小时数
      const leave1 = timeDiff % (24 * 3600 * 1000);
      this.hour = Math.floor(timeDiff / (3600 * 1000));
      // 计算相差分钟数
      const leave2 = leave1 % (3600 * 1000);
      this.minute = Math.floor(leave2 / (60 * 1000));
      // 计算相差秒数
      const leave3 = leave2 % (60 * 1000);
      this.second = Math.floor(leave3 / 1000);

      if (this.hour <= 0 && this.minute <= 0 && this.second <= 0) {
        this.timer && clearInterval(this.timer);
      }
      // 格式化时间
      this.minute = this.formatTime(this.minute);
      this.hour = this.formatTime(this.hour);
      this.second = this.formatTime(this.second);
    },
    formatTime(time) {
      if (time <= 0) {
        time = '00';
      } else if (time < 10) {
        time = `0${time}`;
      }
      return time;
    },
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
    toCategory() {
      this.$router.push('/market/productCategory');
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variable.scss';

.w-header {
  width: 100%;
  height: .44rem;
  display: flex;
  align-items: center;
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
  padding-top: .44rem;

  .banner-item {
    padding: .1rem;
    height: 2rem;
    @include flex-center;
    img {
      width: 100%;
      height: 100%;
      display: block;
      border-radius: .08rem;
    }
  }
}

.banner2 {
  margin: .1rem;
  display: block;
  border-radius: .05rem;
  overflow: hidden;
  img {
    width: 100%;
  }
}

.home-category {
  justify-content: space-around;
  background: #fff;
  padding: 0 .15rem;
  padding-top: .1rem;

  // &::after {
  //   content: ' ';
  //   display: block;
  //   width: 100%;
  //   height: 1px;
  //   background: $color-line;
  // }

  .item {
    width: 25%;
    padding: 0;
    padding-bottom: .08rem;
    position: relative;
    overflow: hidden;

    img {
      width: 65%;
      display: block;
      margin: 0 auto;
    }

    .sub-title {
      font-size: .12rem;
      text-align: center;
      color: $color-grey;
      margin-top: .1rem;
    }
  }
}

.home-row {
  padding: .15rem 0 .1rem;
  @include background-top-gradient(#f7f7f7 90%, #fefefe);
  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: .16rem;
    font-weight: 700;
    margin-bottom: .1rem;
    color: #525252;

    .icon-shandian {
      color: #fb4b2e;
      font-size: .2rem;
      margin: 0 .05rem;
    }

    .tip {
      color: $color-grey;
      font-size: .12rem;
    }

    .time {
      color: #525252;
      font-size: .18rem;
      border-radius: .05rem;
      width: .2rem;
      height: .2rem;
      line-height: .2rem;
      text-align: center;
      margin-right: .08rem;
      position: relative;
      font-weight: 700;
      &::after {
        content: ":";
        position: absolute;
        right: -.06rem;
        top: 0;
        color: #525252;
        font-weight: 700;
      }

      &:first-child {
        margin-left: .1rem;
      }

      &:nth-last-child(2)::after {
        display: none;
      }

      &:last-child::after {
        display: none;
      }
    } // end title

    .icon {
      background: $color-red;
      height: .2rem;
      line-height: .2rem;
      font-size: .14rem;
      border-radius: .05rem;
      padding: 0 .08rem;
      margin-left: .1rem;
      color: #fff;
    }
  } // end title

  .product-grid {
    overflow: auto;
    border-radius: .05rem;
    flex-wrap: nowrap;
    width: 100%;

    .item {
      width: .75rem;
      padding: 0;
      flex-shrink: 0;
      overflow: hidden;
      margin-left: .1rem;

      .detail {
        background: #fff;
        border-radius: .05rem;
        padding: .08rem 0 .05rem;

        .img {
          width: .5rem;
          height: .55rem;
          border: 1px solid #f3f3f3;
          @include flex-center;
          overflow: hidden;
          margin: 0 auto;

          img {
            height: 100%;
          }
        }
        .product-title {
          @include text-overflow-muli(2);
          @include break-word;
          margin: .05rem .08rem 0;
          font-size: .1rem;
          color: $color-grey;
        }
      } // end detail

      .desc {
        color: $color-red;
        margin-top: .05rem;
        text-align: center;
        @include text-ellipsis();
        font-size: .12rem;
      }
    } // end item
  } // end product-grid
} // end home-row

.product-grid2 {
  padding: 0 .1rem;
  .product {
    padding: .15rem .15rem .1rem;
    position: relative;
    margin-bottom: .05rem;

    .title {
      @include text-overflow-muli(2);
      @include break-word;
      margin-bottom: .07rem;
    }

    .desc {
      color: $color-grey;
      font-size: .1rem;
      @include text-ellipsis();
      margin-bottom: .07rem;
    }

    .price {
      font-size: .1rem;
      @include text-ellipsis();
      margin-bottom: .07rem;
    }

    .label {
      background: $color-blue-light;
      color: #fff;
      font-size: .1rem;
      padding: .05rem .08rem;
      border-radius: .05rem;
      display: inline-block;
    }

    .img {
      display: block;

      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  } // end product

  .product1 {
    width: 49%;
    border-top-left-radius: .1rem;
    background: #e4feff;

    .img {
      width: 90%;
      margin: .35rem auto 0;
    }
  } // end product1

  .right-product {
    width: 49%;
    margin-left: 2%;
  } // right-product

  .product2 {
    background: #f4fcff;
    border-top-right-radius: .1rem;
    height: 1.2rem;
    overflow: hidden;

    .img {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 60%;
    }
  } // end product2

  .product3 {
    background: #eff1fe;
    height: 1.2rem;
    overflow: hidden;

    .img {
      position: absolute;
      bottom: -10%;
      right: 15%;
      width: 40%;
    }
  } // end product3

  .product4 {
    background: #e7ffff;
    width: 49%;
  }

  .product5 {
    background: #ffe9fe;
    width: 49%;
    margin-left: 2%;
    border-radius: 0;
  }

} // end product-grid2

.product-list {
  padding: .1rem;
  justify-content: space-between;
  background: #fff;

  .item {
    width: 33%;
    background: #f9f9f9;
    padding: .15rem;

    .img {
      width: 100%;
      height: .9rem;
      overflow: hidden;
      @include flex-center;

      img {
        max-width: 100%;
        max-height: 100%;
        display: block;
      }
    }

    .title {
      @include text-overflow-muli(2);
      @include break-word;
      margin-bottom: .07rem;
      text-align: center;
      font-size: .12rem;
      font-weight: 700;
    }

    .desc {
      color: $color-grey;
      font-size: .1rem;
      @include text-ellipsis();
      margin-bottom: .07rem;
      text-align: center;
    }

    .price {
      font-size: .1rem;
      @include text-ellipsis();
      margin-bottom: .07rem;
      text-align: center;
    }
  } // end item
} // end product-list

.product-bottom {
  background: #fff;
  padding-top: .25rem;

  .title {
    font-size: .18rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: .14rem;
  }

  .w-grid-list {
    padding: 0 3vw;
  }

  .col {
    margin-right: 2vw;
    overflow: hidden;

    .img {
      overflow: hidden;
      @include flex-center;
      position: relative;
      background: #f0f0f0;
      border-radius: .05rem;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }

    .bottom {
      width: 100%;
      height: .26rem;
      line-height: .26rem;
      background: #f0f0f0;
      text-align: center;
      color: #fff;
      @include text-ellipsis();
      color: $color-grey;
    }

    .sub-title {
      font-size: .12rem;
      @include text-ellipsis();
      text-align: center;
      margin-top: .1rem;
    }

    .price {
      font-size: .12rem;
      color: $color-red;
      text-align: center;
      @include text-ellipsis();
      margin: .1rem 0;
    }
  } // end col

  .col2 {
    .img {
      width: 46vw;
      height: 46vw;
    }

    .bottom {
      background: rgba($color: #000000, $alpha: .5);
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 10;
      font-size: .12rem;
      color: #fff;
    }
  }

  .col3 {
    .img {
      max-width: 30vw;
      max-height: 30vw;
      display: block;
      background: #c8c9cd;

      .img {
        display: block;
      }
    }
  }

} // end product-bottom

</style>