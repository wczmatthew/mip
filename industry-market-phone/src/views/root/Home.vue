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
        限时抢购
        <span class="time">{{hour}}</span>
        <span class="time">{{minute}}</span>
        <span class="time">{{second}}</span>
      </div>

      <div class="w-grid-list product-grid">
        <div class="item" v-for="(item, index) in productList" :key="index">
          <div class="img">
            <img src="~@/assets/home/banner.jpg" alt="">
          </div>
          <div class="detail">
            <p class="product-title">
              {{item.title}}
            </p>
            <p class="desc">
              质量好，价格优惠
            </p>
            <p class="price">
              ￥ 9.33
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 限时抢购 end -->

    <!-- 正泰精品 -->
    <div class="home-row">
      <div class="title">
        正泰精品
        <span class="icon">hot !</span>
      </div>

      <div class="w-grid-list product-grid">
        <div class="item" v-for="(item, index) in productList" :key="'hot' + index">
          <div class="img">
            <img src="~@/assets/home/banner.jpg" alt="">
          </div>
          <div class="detail">
            <p class="product-title">
              {{item.title}}
            </p>
            <p class="desc">
              质量好，价格优惠
            </p>
            <p class="price">
              ￥ 9.33
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 正泰精品 end -->
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

.home-category {
  margin: 0 .15rem;
  justify-content: space-around;
  margin-top: .1rem;
  border: 1px solid $color-line;
  border-radius: .05rem;
  background: #fff;

  .item {
    width: 25%;
    padding: 0;
    padding-bottom: .08rem;
    position: relative;
    overflow: hidden;
    border-right: 1px solid $color-line;

    &:last-child {
      border: 0;
    }

    img {
      width: 100%;
      display: block;
      margin: 0 auto;
    }

    .sub-title {
      font-size: .1rem;
      font-weight: 700;
      margin-top: -.1rem;
      text-align: center;
    }
  }
}

.home-row {
  margin: .15rem .15rem .2rem;
  .title {
    display: flex;
    align-items: center;
    font-size: .18rem;
    font-weight: 700;
    margin-bottom: .1rem;

    .time {
      background: $color-red;
      color: #fff;
      font-size: .14rem;
      border-radius: .05rem;
      width: .2rem;
      height: .2rem;
      line-height: .2rem;
      text-align: center;
      margin-right: .08rem;
      position: relative;
      &::after {
        content: ":";
        position: absolute;
        right: -.06rem;
        top: 0;
        color: $color-red;
        font-weight: 700;
      }

      &:first-child {
        margin-left: .1rem;
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
    background: #fff;
    border: 1px solid $color-line;
    overflow: hidden;
    border-radius: .05rem;

    .item {
      width: 50%;
      padding: .1rem .05rem .1rem .1rem;
      border-right: 1px solid $color-line;
      border-bottom: 1px solid $color-line;
      display: flex;
      align-items: center;

      &:nth-child(2n) {
        border-right: 0;
      }

      &:nth-last-child(1),
      &:nth-last-child(2) {
        border-bottom: 0;
      }

      .img {
        width: .57rem;
        height: .57rem;
        border: 1px solid #f3f3f3;
        @include flex-center;
        margin-right: .05rem;
        overflow: hidden;
        flex-shrink: 0;

        img {
          width: 100%;
        }
      }

      .detail {
        flex: 1;
        overflow: hidden;
        font-size: .1rem;

        .product-title {
          @include text-overflow-muli(2);
          @include break-word;
        }

        .desc {
          color: $color-orange;
          margin-top: .05rem;
        }

        .price {
          font-size: .15rem;
          font-weight: 700;
          color: $color-red;
          @include text-ellipsis;
          margin-top: .05rem;
        }
      } // end detail
    } // end item
  } // end product-grid
} // end home-row

</style>