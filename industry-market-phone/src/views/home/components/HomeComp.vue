<!--  -->
<template lang='html'>
  <div ref="home" class="w-scrollview">
    <!-- 顶部栏 -->
    <header class="w-header home-header">
      <div class="header-left">
        <img src="~@/assets/logo.png" alt="">
      </div>
      <!-- <div class="city">
        <i class="iconfont icon-location"></i>
        温州
        <i class="iconfont icon-triangle-down"></i>
      </div> -->

      <div class="w-header-mid">
        <w-search class="home-search" disabled show-scan @input-click="toSearch()" style="padding-right: .1rem;" ref="searchView" placeholder="dz47"></w-search>
      </div>
      <div class="header-right">
        <w-scan-icon current-path="/market"></w-scan-icon>
      </div>
    </header>
    <!-- 顶部栏 end -->

    <!-- 轮播图 -->
    <div class="banner" v-if="banners && banners.length">
      <cube-slide ref="slide" :data="banners">
        <cube-slide-item v-for="(item, index) in banners" :key="index" @click.native="onClickLink(item)" class="banner-item" :auto-play="autoplay">
          <w-img :src="item.imgPath" :err-img="bannerErrImg"/>
        </cube-slide-item>
      </cube-slide>
    </div>
    <!-- 轮播图 end -->

    <!-- 常用功能 -->
    <div class="w-grid-list home-category" v-if="categoryList && categoryList.length">
      <div class="item" @click="onClickLink(item)" v-for="(item, index) in categoryList" :key="'category'+index" :class="{'big': index === 2}">
        <w-img :src="item.imgPath" alt=""/>
        <p class="sub-title">
          {{item.title}}
        </p>
      </div>
    </div>
    <!-- 常用功能 end -->

    <!-- 新闻 -->
    <div class="news-container" v-if="news && news.list && news.list.length">
      <span class="title">{{news.title || '头条'}}</span>
      <div class="list">
        <cube-slide direction="vertical" :data="news.list" :show-dots="false" ref="newsSlide">
          <cube-slide-item v-for="(item, index) in news.list" :key="'news'+index" @click.native="onClickLink(item)">
            <div class="item">
              {{item.title}}
            </div>
          </cube-slide-item>
        </cube-slide>
      </div>
      <span class="desc" @click="toMore()">
        更多
      </span>
    </div>
    <!-- 新闻 end -->

    <!-- 限时抢购 -->
    <div class="home-row" v-if="buyingProducts && buyingProducts.list && buyingProducts.list.length">
      <div class="title">
        热卖
        <i class="iconfont icon-hot"></i>
        <!-- 限时购 -->
        <!-- <i class="iconfont icon-shandian"></i> -->
        <!-- <span class="time">{{hour}}</span>
        <span class="time">{{minute}}</span>
        <span class="time">{{second}}</span>
        <span class="tip">
          后结束
        </span> -->
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
          <p class="desc price">
            ￥{{item.price}}
          </p>
        </div>
      </div>
    </div>
    <!-- 限时抢购 end -->

    <!-- 广告图片 -->
    <div class="banner2" v-if="midAds.imgPath">
      <w-img :src="midAds.imgPath" alt="" @click.native="onClickLink(midAds)"/>
    </div>
    <!-- 广告图片 end -->

    <!-- 海报产品列表 -->
    <div class="w-grid-list product-grid2" v-if="hotSaleProList && hotSaleProList.length">
      <div class="product product1" v-if="hotPro1.id" @click="toProductDetail(hotPro1.bm)">
        <p class="title">
          {{hotPro1.title}}
        </p>
        <!-- <p class="desc">
          细腻磨砂材质
        </p> -->
        <p class="price">
          ￥ {{hotPro1.price}} 起
        </p>
        <div class="label" v-if="hotPro1.adWord">
          {{hotPro1.adWord}}
        </div>

        <w-img :src="hotPro1.imgPath || hotPro1.proImgPath" alt="" class="bg"/>
      </div>

      <div class="right-product">
        <div class="product product2" v-if="hotPro2.id" @click="toProductDetail(hotPro2.bm)">
          <p class="title">
            {{hotPro2.title}}
          </p>
          <!-- <p class="desc">
            好口碑好实力
          </p> -->
          <p class="price">
            ￥ {{hotPro2.price}} 起
          </p>
          <div class="label" v-if="hotPro2.adWord">
            {{hotPro2.adWord}}
          </div>

          <w-img :src="hotPro2.imgPath || hotPro2.proImgPath" alt="" class="bg"/>
        </div>

        <div class="product product3" v-if="hotPro3.id" @click="toProductDetail(hotPro3.bm)">
          <p class="title">
            {{hotPro3.title}}
          </p>
          <!-- <p class="desc">
            好口碑好实力
          </p> -->
          <p class="price">
            ￥ {{hotPro3.price}} 起
          </p>
          <div class="label" v-if="hotPro3.adWord">
            {{hotPro3.adWord}}
          </div>

          <w-img :src="hotPro3.imgPath || hotPro3.proImgPath" alt="" class="bg"/>
        </div>
      </div>

      <div class="product product4" v-if="hotPro4.id" @click="toProductDetail(hotPro4.bm)">
        <p class="title">
          {{hotPro4.title}}
        </p>
        <!-- <p class="desc">
          好口碑好实力
        </p> -->
        <p class="price">
          ￥ {{hotPro4.price}} 起
        </p>
        <div class="label" v-if="hotPro4.adWord">
          {{hotPro4.adWord}}
        </div>

        <w-img :src="hotPro4.imgPath || hotPro4.proImgPath" alt="" class="bg"/>
      </div>

      <div class="product product5" v-if="hotPro5.id" @click="toProductDetail(hotPro5.bm)">
        <p class="title">
          {{hotPro5.title}}
        </p>
        <!-- <p class="desc">
          好口碑好实力
        </p> -->
        <p class="price">
          ￥ {{hotPro5.price}} 起
        </p>
        <div class="label" v-if="hotPro5.adWord">
          {{hotPro5.adWord}}
        </div>

        <w-img :src="hotPro5.imgPath || hotPro5.proImgPath" alt="" class="bg"/>
      </div>
    </div>
    <!-- 海报产品列表 end -->


    <!-- 产品列表 -->
    <div class="w-grid-list product-list">
      <div class="item" @click="toProductDetail(prod.bm)" v-for="(prod, index) in generalProList" :key="'gen'+index">
        <div class="img">
          <w-img :src="prod.imgPath || prod.proImgPath" alt=""/>
        </div>
        <p class="title">
          {{prod.title}}
        </p>
        <!-- <p class="desc">
          最高优惠200
        </p> -->
        <p class="price">
          ￥{{prod.price || 0}}
        </p>
      </div>
    </div>
    <div v-if="otherProdList && otherProdList.length">
      <div v-for="(item, index) in otherProdList" :key="'prod'+index">
        <div class="product-bottom">
          <p class="title">
            {{item.title}}
          </p>

          <div class="w-grid-list">
            <div class="col" v-for="(prod, proIndex) in item.list" :key="'high'+proIndex" @click="toProductDetail(prod.bm)" :class="getProdClass(item.list, proIndex)">
              <div class="img">
                <w-img :src="prod.imgPath || prod.proImgPath" alt=""/>
                <div class="bottom">
                  {{prod.adWord || prod.typeName}}
                </div>
              </div>
              <p class="sub-title">
                {{prod.title}}
              </p>
              <p class="price">
                ￥{{prod.price}}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
    <!-- 产品列表 end -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import WSearch from '@/components/WSearch.vue';
import banner from '@/assets/home/banner.png';
import loading from '@/assets/loading.gif';
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
      bannerErrImg: loading,
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
      otherProdList: [], // 5个图片下面的内容
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
      this.keywordsTimer && clearInterval(this.keywordsTimer);
      if (to.path === '/market' && to.query.tab === 'home') {
        this.autoplay = true;
        this.timer = setInterval(() => {
          this.calcTime();
        }, 1000);

        this.$nextTick(() => {
          this.$refs.slide && this.$refs.slide.refresh();
          this.$refs.newsSlide && this.$refs.newsSlide.refresh();
        });

        this.keywordsTimer = setInterval(() => {
          this.updateKeywords();
        }, 5000);
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
    // 自动登录存储userid有延时, 故这里延时加载
    // setTimeout(() => {
    //   this.getData();
    //   this.getOtherData();
    // }, 300);

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
    // 获取产品列表的布局class
    getProdClass(list, index) {
      // 如果满足 第一行两个, 后面3个一行的格式, 这个样式优先
      // if (list.length > 2 && (list.length - 2) % 3 === 0) {
      //   if (index < 2) return 'col2';

      //   return 'col3';
      // }

      if (list.length % 2 === 0) return 'col2';
      if (list.length % 3 === 0) return 'col3';

      if (index < 2) return 'col2';
      return 'col3';
    },
    updateKeywords() {
      if (!this.keywordsList.length) {
        this.$refs.searchView && this.$refs.searchView.updateKeywords('dz47');
        clearInterval(this.keywordsTimer);
        this.keywordsTimer = null;
        return;
      }
      const index = Math.floor(Math.random() * this.keywordsList.length);
      this.$refs.searchView && this.$refs.searchView.updateKeywords(this.keywordsList[index].name);
    },
    scrollTop() {
      if (!this.$refs.home) return;
      this.$refs.home.scrollTop = 0;
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
    toMore() {
      if (this.mode === 'prev') return;
      this.$router.push('/market?tab=gift');
    },
    toSearch() {
      if (this.mode === 'prev') return;
      this.$router.push('/market/search');
    },
    onClickLink(item) {
      if (this.mode === 'prev') return;

      if (!item.url) {
        Utils.showToast('敬请期待');
        return;
      }
      if (item.url.indexOf('http') > -1) {
        try {
          // eslint-disable-next-line
          // native_listen('goToUrl', { url: item.url });
          Utils.saveLocalStorageItem('beforePath', '/market?tab=home');
          this.$router.push({
            path: '/market/frame',
            query: {
              url: item.url,
              title: item.title || '发现',
            },
          });
        } catch (error) {
          console.log('error: ', error);
        }
        return;
      }

      if (item.url.indexOf('/market') === 0) {
        this.$router.push({
          path: item.url,
          query: { title: item.title },
        });
        return;
      }

      this.$router.push({
        path: `/market/${item.url}`,
        query: { title: item.title },
      });
    },
    // 获取首页第一屏数据
    updateFirstData(result) {
      this.banners = result.banner || [];
      this.categoryList = result.category || [];
      this.news = result.news || {};
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
    updateOtherData(result) {
      this.hotSaleProList = result.hotSaleList || [];
      this.otherProdList = result.otherList || [];
      this.generalProList = result.generalList || [];

      this.hotPro1 = this.hotSaleProList.length > 0 ? this.hotSaleProList[0] : {};
      this.hotPro2 = this.hotSaleProList.length > 1 ? this.hotSaleProList[1] : {};
      this.hotPro3 = this.hotSaleProList.length > 2 ? this.hotSaleProList[2] : {};
      this.hotPro4 = this.hotSaleProList.length > 3 ? this.hotSaleProList[3] : {};
      this.hotPro5 = this.hotSaleProList.length > 4 ? this.hotSaleProList[4] : {};
    },
    // 获取首页第一屏数据
    async getData() {
      Utils.showLoading();
      const result = await indexService.getIndexData({ userid: Utils.getUserId(this) });
      if (!result) return;
      Utils.hideLoading();
      this.banners = result.banner || [];
      this.categoryList = result.category || [];
      this.news = result.news || {};
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
      this.hotSaleProList = result.hotSaleList || [];
      this.otherProdList = result.otherList || [];
      this.generalProList = result.generalList || [];

      this.hotPro1 = this.hotSaleProList.length > 0 ? this.hotSaleProList[0] : {};
      this.hotPro2 = this.hotSaleProList.length > 1 ? this.hotSaleProList[1] : {};
      this.hotPro3 = this.hotSaleProList.length > 2 ? this.hotSaleProList[2] : {};
      this.hotPro4 = this.hotSaleProList.length > 3 ? this.hotSaleProList[3] : {};
      this.hotPro5 = this.hotSaleProList.length > 4 ? this.hotSaleProList[4] : {};
    },
    toProductDetail(id) {
      if (this.mode === 'prev') return;

      this.$router.push(`/market/productDetail?bm=${id}`);
    },
  },
  props: {
    mode: {
      type: String,
      default: '', // prev: 预览模式
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variable.scss';

.w-scrollview {
  padding-top: .44rem;
}

.w-header {
  width: 100%;
  height: .44rem;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  padding-left: .54rem;

  .header-left {
    img {
      height: 70%;
      display: block;
      margin: 15% auto;
    }
  }

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

.price {
  @include text-ellipsis();
  color: $color-red;
  font-size: 14px;
}

.banner {
  width: 100%;
  min-height: 1.2rem;
  overflow: hidden;
  // padding-top: .44rem;
  max-height: 1.8rem;

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
  max-height: .8rem;
  img {
    width: 100%;
    max-height: .8rem;
    display: block;
  }
}

.home-category {
  justify-content: space-around;
  background: #fff;
  padding: 0 .15rem;
  padding-top: .15rem;

  // &::after {
  //   content: ' ';
  //   display: block;
  //   width: 100%;
  //   height: 1px;
  //   background: $color-line;
  // }

  .item {
    width: 20%;
    padding: 0;
    padding-bottom: .08rem;
    position: relative;
    overflow: visible;
    display: flex;
    flex-direction: column;
    justify-content: center;

    img {
      // width: 50%;
      height: .32rem;
      display: block;
      margin: 0 auto;
    }

    .sub-title {
      font-size:  12px;
      text-align: center;
      color: $color-grey-6;
      margin-top: .1rem;
    }

    &.big {
      img {
        height: .42rem !important;
        margin-top: -.1rem;
      }
    } // end big
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
    margin-bottom: .1rem;
    color: #525252;

    .iconfont {
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
    background: #fff;

    p {
      position: relative;
      z-index: 2;
    }

    .title {
      @include text-overflow-muli(2);
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
      margin-bottom: .07rem;
    }

    .label {
      background: $color-blue-light;
      color: #fff;
      font-size: 10px;
      padding: .05rem .08rem;
      border-radius: .05rem;
      display: inline-block;
      max-width: 45%;
      max-height: .28rem;
    }

    img.bg {
      width: 20vw;
      height: 20vw;
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: 1;
    }
  } // end product

  .product1 {
    width: 49%;
    border-top-left-radius: .1rem;
    // background: #f0f2ff;
    min-height: 2.45rem;
    @include background-top-gradient(#ecf2fe, #f2f6ff);

    // .title {
    //   color: #2a96e8;
    // }

    img.bg {
      width: 30vw;
      height: 30vw;
      right: 50%;
      bottom: 10%;
      margin-right: -15vw;
    }
  } // end product1

  .right-product {
    width: 49%;
    margin-left: 2%;
  } // right-product

  .product2 {
    // background: #ebfdfd;
    border-top-right-radius: .1rem;
    height: 1.2rem;
    overflow: hidden;
    @include background-top-gradient(#e5fafd, #f1fdfd);

    // .title {
    //   color: #2b959a;
    // }
  } // end product2

  .product3 {
    // background: #eff1fe;
    height: 1.2rem;
    overflow: hidden;
    @include background-top-gradient(#f0fbff, #f4fcff);

    // .title {
    //   color: #f16959;
    // }
  } // end product3

  .product4 {
    // background: #e7ffff;
    width: 49%;
    height: 1.2rem;
    overflow: hidden;
    @include background-top-gradient(#e7e4f5, #f3f2fa);

    // .title {
    //   color: #9876de;
    // }
  }

  .product5 {
    // background: #ffe9fe;
    width: 49%;
    margin-left: 2%;
    border-radius: 0;
    height: 1.2rem;
    overflow: hidden;
    @include background-top-gradient(#f0fbff, #f4fcff);

    // .title {
    //   color: #4598da;
    // }
  }

} // end product-grid2

.product-list {
  width: 100%;
  padding: .05rem 0;
  background: $color-bg;
  overflow: auto;
  flex-wrap: nowrap;

  .item {
    width: 31vw;
    background: #fff;
    padding: .15rem .1rem .1rem;
    border-radius: .05rem;
    margin-left: 1.8vw;
    flex-shrink: 0;

    .img {
      width: 90%;
      height: .9rem;
      overflow: hidden;
      @include flex-center;
      margin: 0 auto;
      margin-bottom: .05rem;

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
    margin-bottom: .1rem;
  }

  // .w-grid-list {
  //   padding: 0 3vw;
  // }

  .col {
    margin-left: 2.5vw;
    overflow: hidden;

    .img {
      overflow: hidden;
      @include flex-center;
      position: relative;
      background: #fff;
      border-radius: .08rem;
      img {
        width: auto;
        max-width: 100%;
        max-height: 100%;
      }
    }

    .bottom {
      width: 100%;
      height: .22rem;
      line-height: .22rem;
      background: #f0f0f0;
      text-align: center;
      color: #fff;
      @include text-ellipsis();
      color: $color-grey-6;
      font-size: 10px;
    }

    .sub-title {
      font-size:  12px;
      @include text-ellipsis();
      text-align: center;
      margin-top: .1rem;
    }

    .price {
      text-align: center;
      margin: .1rem 0;
    }
  } // end col

  .col2 {
    width: 46vw;
    .img {
      width: 46vw;
      height: 46vw;
      padding: .05rem;
      padding-bottom: .3rem;
    }

    .bottom {
      // background: rgba(255, 143, 143, .7);
      position: absolute;
      bottom: 0;
      left: 0;
      font-size:  12px;
      z-index: 10;
      // color: #fff;
    }

    // &:nth-child(2n) {
    //   margin-right: 0;
    // }
  }

  .col3 {
    width: 30vw;
    margin-left: 2.5vw;
    margin-right: 0;

    .img {
      width: 30vw;
      height: 30vw;
      background: #fff;
      padding: .05rem;
      padding-bottom: .26rem;
      position: relative;
      margin-right: 0;

      .bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 10;
        font-size:  12px;
        height: .2rem;
        line-height: .2rem;
      }
    }

    // &:nth-child(3n) {
    //   margin-left: 0;
    // }

  }

} // end product-bottom

</style>
<style lang="scss">
.home-header .w-search-bar input {
  color: #ca141d;
  -webkit-text-fill-color: #ca141d;
}
</style>