<!--  -->
<template lang='html'>
  <div ref="homeContainer" class="w-scrollview">
    <!-- 顶部栏 -->
    <header class="w-header home-header">
      <div class="city">
        <i class="iconfont icon-location"></i>
        温州
        <i class="iconfont icon-triangle-down"></i>
      </div>

      <div class="w-header-mid">
        <w-search class="home-search" disabled show-scan @input-click="toSearch()" style="padding-right: .1rem;" ref="searchView" placeholder="dz47"></w-search>
      </div>
      <div class="header-right" slot="header-right">
        <w-scan-icon current-path="/market"></w-scan-icon>
      </div>
    </header>
    <!-- 顶部栏 end -->

    <!-- 轮播图 -->
    <div class="banner" v-if="banners && banners.length">
      <cube-slide ref="slide" :data="banners">
        <cube-slide-item v-for="(item, index) in banners" :key="index" @click.native="onClickBanner(item)" class="banner-item" :auto-play="autoplay">
          <w-img :src="item.imgPath"/>
        </cube-slide-item>
      </cube-slide>
    </div>
    <!-- 轮播图 end -->

    <!-- 常用功能 -->
    <div class="w-grid-list home-category">
      <div class="item" @click="onClickLink(item)" v-for="(item, index) in categoryList" :key="'category'+index">
        <w-img :src="item.imgPath" alt=""/>
        <p class="sub-title">
          {{item.title}}
        </p>
      </div>
    </div>
    <!-- 常用功能 end -->

    <!-- 新闻 -->
    <div class="news-container">
      <span class="title">商城头条</span>
      <div class="list">
        <cube-slide direction="vertical" :data="news" :show-dots="false" ref="newsSlide">
          <cube-slide-item v-for="(item, index) in news" :key="'news'+index" @click.native="onClickLink(item)">
            <div class="item">
              {{item.title}}
            </div>
          </cube-slide-item>
        </cube-slide>
      </div>
      <!-- <span class="desc">
        更多
      </span> -->
    </div>
    <!-- 新闻 end -->

    <!-- 限时抢购 -->
    <div class="home-row" v-if="buyingProducts">
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
        <div class="item" v-for="(item, index) in buyingProducts.list" :key="index" @click="toProductDetail(item.bm)">
          <div class="detail">
            <div class="img">
              <w-img :src="item.imgPath" alt=""/>
            </div>
            <p class="product-title">
              {{item.title}}
            </p>
          </div>
          <p class="desc">
            ￥{{item.price}}
          </p>
        </div>
      </div>
    </div>
    <!-- 限时抢购 end -->

    <!-- 广告图片 -->
    <div class="banner2" v-if="midAds.imgPath">
      <w-img :src="midAds.imgPath" alt="" @click="onClickBanner(midAds)"/>
    </div>
    <!-- 广告图片 end -->

    <!-- 海报产品列表 -->
    <div class="w-grid-list product-grid2">
      <div class="product product1" v-if="hotPro1.id">
        <p class="title">
          {{hotPro1.title}}
        </p>
        <!-- <p class="desc">
          细腻磨砂材质
        </p> -->
        <p class="price">
          ￥ {{hotPro1.price}} 起
        </p>
        <div class="label">
          {{hotPro1.productType}}
        </div>

        <w-img :src="hotPro1.imgPath" alt="" class="bg"/>
      </div>

      <div class="right-product">
        <div class="product product2" v-if="hotPro2.id">
          <p class="title">
            {{hotPro2.title}}
          </p>
          <!-- <p class="desc">
            好口碑好实力
          </p> -->
          <p class="price">
            ￥ {{hotPro2.price}} 起
          </p>
          <div class="label">
            {{hotPro2.productType}}
          </div>

          <w-img :src="hotPro2.imgPath" alt="" class="bg"/>
        </div>

        <div class="product product3" v-if="hotPro3.id">
          <p class="title">
            {{hotPro3.title}}
          </p>
          <!-- <p class="desc">
            好口碑好实力
          </p> -->
          <p class="price">
            ￥ {{hotPro3.price}} 起
          </p>
          <div class="label">
            {{hotPro3.productType}}
          </div>

          <w-img :src="hotPro3.imgPath" alt="" class="bg"/>
        </div>
      </div>

      <div class="product product2 product4" v-if="hotPro4.id">
        <p class="title">
          {{hotPro4.title}}
        </p>
        <!-- <p class="desc">
          好口碑好实力
        </p> -->
        <p class="price">
          ￥ {{hotPro4.price}} 起
        </p>
        <div class="label">
          {{hotPro4.productType}}
        </div>

        <w-img :src="hotPro4.imgPath" alt="" class="bg"/>
      </div>

      <div class="product product2 product5" v-if="hotPro5.id">
        <p class="title">
          {{hotPro5.title}}
        </p>
        <!-- <p class="desc">
          好口碑好实力
        </p> -->
        <p class="price">
          ￥ {{hotPro5.price}} 起
        </p>
        <div class="label">
          {{hotPro5.productType}}
        </div>

        <w-img :src="hotPro5.imgPath" alt="" class="bg"/>
      </div>
    </div>
    <!-- 海报产品列表 end -->

    <!-- 产品列表 -->
    <div class="w-grid-list product-list">
      <div class="item" v-for="(item, index) in generalProList" :key="'hot'+index" @click="toProductDetail(item.bm)">
        <div class="img">
          <w-img :src="item.imgPath" alt=""/>
        </div>
        <p class="title">
          {{item.title}}
        </p>
        <!-- <p class="desc">
          最高优惠200
        </p> -->
        <p class="price">
          ￥{{item.price || 0}}
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
        <div class="col" v-for="(item, index) in highQualityProList" :key="'high'+index" @click="toProductDetail(item.bm)" :class="[index < 2 ? 'col2' : 'col3']">
          <div class="img">
            <w-img :src="item.imgPath" alt=""/>
            <div class="bottom">
              {{item.productType}}
            </div>
          </div>
          <p class="sub-title">
            {{item.title}}
          </p>
          <p class="price">
            ￥{{item.price}}
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
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      banners: [
        {
          url: banner,
          title: '图片1',
        },
      ],
      buyingProducts: {},
      categoryList: [],
      news: [],
      midAds: {}, // 中间广告
      hotSaleProList: [], // 热门产品
      hotPro1: {},
      hotPro2: {},
      hotPro3: {},
      hotPro4: {},
      hotPro5: {},
      generalProList: [], // 热门下面的产品列表
      highQualityProList: [], // 精品推荐
      autoplay: true,
      hour: 0,
      minute: 0,
      second: 0,
      endDate: '2019-6-17 20:00:00',
      timer: null,
      keywordsTimer: null,
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

        this.$nextTick(() => {
          this.$refs.slide && this.$refs.slide.refresh();
          this.$refs.newsSlide && this.$refs.newsSlide.refresh();
        });
      } else {
        // this.autoplay = false;
      }
      // console.log('autoplay: ', this.autoplay);
      // this.$refs.slide && this.$refs.slide.refresh();
    },
    keywordsList() {
      this.updateKeywords();
    },
  },
  created() {},
  mounted() {
    this.getData();
    this.getOtherData();

    this.keywordsTimer = setInterval(() => {
      this.updateKeywords();
    }, 5000);
  },
  components: {
    WSearch,
  },
  destroyed() {
    clearInterval(this.keywordsTimer);
    this.keywordsTimer = null;
  },
  computed: {
    ...mapGetters('keywords', {
      keywordsList: 'keywordsList',
    }),
  },
  methods: {
    updateKeywords() {
      if (!this.keywordsList.length) return;
      const index = Math.floor(Math.random() * this.keywordsList.length);
      this.$refs.searchView && this.$refs.searchView.updateKeywords(this.keywordsList[index].name);
    },
    scrollTop() {
      this.$refs.homeContainer.scrollTop = 0;
    },
    refresh() {
      this.getData();
      this.getOtherData();
    },
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
    onClickBanner(item) {
      if (!item.url) return;
      if (item.url.indexOf('http') > -1) {
        try {
          // eslint-disable-next-line
          native_listen('goToUrl', { url: item.url });
        } catch (error) {
          console.log('error: ', error);
        }
        return;
      }

      if (item.url.indexOf('/market') === 0) {
        this.$router.push(item.url);
        return;
      }

      this.$router.push(`/market/${item.url}`);
    },
    // 点击类目
    onCategoryClick(item) {
      if (item.url) {
        this.$router.push(item.url);
      }
    },
    // 获取首页第一屏数据
    async getData() {
      Utils.showLoading();
      const result = await indexService.getIndexData({ userid: Utils.getUserId(this) });
      if (!result) return;
      Utils.hideLoading();
      this.banners = result.banner || [];
      this.categoryList = result.category || [];
      this.news = result.news || [];
      this.buyingProducts = result.buyingProducts || null;
      this.midAds = result.midAds || {};
      if (this.buyingProducts && this.buyingProducts.endDate) {
        this.endDate = Utils.dateFormat(new Date(this.buyingProducts.endDate), 'yyyy-MM-dd HH:mm:ss');

        this.timer && clearInterval(this.timer);
        this.timer = setInterval(this.calcTime, 1000);
      }
      this.$nextTick(() => {
        this.$refs.slide && this.$refs.slide.refresh();
        this.$refs.newsSlide && this.$refs.newsSlide.refresh();
      });
    },
    // 获取首页第二屏数据
    async getOtherData() {
      const result = await indexService.getIndexOtherData({ userid: Utils.getUserId(this) });
      if (!result) return;
      this.hotSaleProList = [...result.hotSaleProList];
      this.highQualityProList = [...result.highQualityProList];
      this.generalProList = [...result.generalProList];

      this.hotPro1 = this.hotSaleProList.length > 0 ? this.hotSaleProList[0] : {};
      this.hotPro2 = this.hotSaleProList.length > 1 ? this.hotSaleProList[1] : {};
      this.hotPro3 = this.hotSaleProList.length > 2 ? this.hotSaleProList[2] : {};
      this.hotPro4 = this.hotSaleProList.length > 3 ? this.hotSaleProList[3] : {};
      this.hotPro5 = this.hotSaleProList.length > 4 ? this.hotSaleProList[4] : {};
    },
    onClickLink(item) {
      if (!item.url) {
        Utils.showToast('敬请期待');
        return;
      }
      this.$router.push(`/market/${item.url}`);
    },
    toProductDetail(id) {
      this.$router.push(`/market/productDetail?bm=${id}`);
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
    font-size:  12px;

    .iconfont {
      margin-left: .03rem;
      font-size: 10px;
    }

    .icon-location {
      font-size:  14px;
      margin-right: .05rem;
    }
  }

  .header-right {
    position: static;
  }
}

.banner {
  width: 100%;
  min-height: 1.2rem;
  overflow: hidden;
  padding-top: .44rem;

  .banner-item {
    padding: .1rem;
    height: 1.45rem;
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
      width: 50%;
      display: block;
      margin: 0 auto;
    }

    .sub-title {
      font-size:  12px;
      text-align: center;
      color: $color-grey;
      margin-top: .1rem;
    }
  }
}

.news-container {
  position: relative;
  display: flex;
  align-items: center;
  padding: .1rem .12rem;
  background: #fff;

  &::before {
    content: ' ';
    position: absolute;
    top: 0;
    left: 3%;
    width: 94%;
    height: 1px;
    background: $color-line;
    transform: scaleY(.5);
  }

  .title {
    font-size: 14px;
    font-weight: 700;
  }

  .list {
    flex: 1;
    overflow: hidden;
    height: .3rem;
    line-height: .3rem;
    position: relative;

    &::before {
      content: ' ';
      position: absolute;
      top: .12rem;
      left: .05rem;
      width: .05rem;
      height: .05rem;
      border-radius: 100%;
      background: $color-grey;
    }

    .item {
      padding: 0 .1rem 0 .15rem;
      @include text-ellipsis;
      font-size:  12px;
    }
  }

  .desc {
    font-size:  12px;
    color: $color-grey;
  }
}

.home-row {
  padding: .15rem 0 .1rem;
  @include background-top-gradient(#f7f7f7 90%, #fefefe);
  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size:  16px;
    font-weight: 700;
    margin-bottom: .1rem;
    color: #525252;

    .icon-shandian {
      color: #fb4b2e;
      font-size:  20px;
      margin: 0 .05rem;
    }

    .tip {
      color: $color-grey;
      font-size:  12px;
    }

    .time {
      color: #525252;
      font-size:  18px;
      border-radius: .05rem;
      min-width: .2rem;
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
      font-size:  14px;
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
      width: .8rem;
      padding: 0;
      flex-shrink: 0;
      overflow: hidden;
      margin-left: .1rem;

      .detail {
        background: #fff;
        border-radius: .05rem;
        padding: .08rem 0 .05rem;

        .img {
          width: .55rem;
          height: .6rem;
          // border: 1px solid #f3f3f3;
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
          margin: .05rem .05rem 0;
          font-size: 10px;
          color: $color-grey;
          height: .22rem;
          line-height: .12rem;
          @include flex-center;
        }
      } // end detail

      .desc {
        color: $color-red;
        margin-top: .05rem;
        text-align: center;
        @include text-ellipsis();
        font-size:  12px;
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

    p {
      position: relative;
      z-index: 2;
    }

    .title {
      @include text-overflow-muli(2);
      @include break-word;
      margin-bottom: .07rem;
      position: relative;
      z-index: 2;
    }

    .desc {
      color: $color-grey;
      font-size: 10px;
      @include text-ellipsis();
      margin-bottom: .07rem;
    }

    .price {
      font-size: 10px;
      @include text-ellipsis();
      margin-bottom: .07rem;
    }

    .label {
      background: $color-blue-light;
      color: #fff;
      font-size: 10px;
      padding: .05rem .08rem;
      border-radius: .05rem;
      display: inline-block;
    }

    img.bg {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
  } // end product

  .product1 {
    width: 49%;
    border-top-left-radius: .1rem;
    background: #e4feff;
    min-height: 2.45rem;
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
  } // end product2

  .product3 {
    background: #eff1fe;
    height: 1.2rem;
    overflow: hidden;
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
  background: $color-bg;

  .item {
    width: 32%;
    background: #fff;
    padding: .15rem .1rem;
    border-radius: .05rem;

    .img {
      width: 90%;
      height: .9rem;
      overflow: hidden;
      @include flex-center;
      margin: 0 auto;

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
      font-size:  12px;
    }

    .desc {
      color: $color-grey;
      font-size: 10px;
      @include text-ellipsis();
      margin-bottom: .07rem;
      text-align: center;
    }

    .price {
      font-size: 10px;
      @include text-ellipsis();
      margin-bottom: .07rem;
      text-align: center;
    }
  } // end item
} // end product-list

.product-bottom {
  // background: #fff;
  padding-top: .1rem;

  .title {
    font-size:  18px;
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
      background: #fff;
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
      font-size:  12px;
    }

    .sub-title {
      font-size:  12px;
      @include text-ellipsis();
      text-align: center;
      margin-top: .1rem;
    }

    .price {
      font-size:  12px;
      color: $color-red;
      text-align: center;
      @include text-ellipsis();
      margin: .1rem 0;
    }
  } // end col

  .col2 {
    width: 46vw;
    .img {
      width: 46vw;
      height: 46vw;
    }

    .bottom {
      background: rgba(255, 143, 143, .7);
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 10;
      font-size:  12px;
      color: #fff;
    }

    &:nth-child(2n) {
      margin-right: 0;
      .bottom {
        background: rgba(109, 188, 255, 0.7);
      }
    }
  }

  .col3 {
    width: 30vw;
    margin-left: 2vw;
    margin-right: 0;

    .img {
      width: 30vw;
      height: 30vw;
      background: #fff;
      padding-bottom: .26rem;
      position: relative;
      margin-right: 0;

      img {
        display: block;
      }

      .bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 10;
        font-size:  12px;
      }
    }

    &:nth-child(3n) {
      margin-left: 0;
    }

  }

} // end product-bottom

</style>
<style lang="scss">
.home-header .w-search-bar input {
  color: #ca141d;
  -webkit-text-fill-color: #ca141d;
}
</style>