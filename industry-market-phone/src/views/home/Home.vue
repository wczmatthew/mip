<!--  -->
<template lang='html'>
  <home-comp ref="homeContainer"></home-comp>
</template>
<script>
import Utils from '@/common/Utils';
import HomeComp from './components/HomeComp.vue';
import indexService from '@/services/index.service';

export default {
  data() {
    return {
    };
  },
  created() {},
  mounted() {
    // 自动登录存储userid有延时, 故这里延时加载
    setTimeout(() => {
      this.getData();
      this.getOtherData();
    }, 300);
  },
  components: {
    HomeComp,
  },
  computed: {
  },
  methods: {
    scrollTop() {
      this.$refs.homeContainer && this.$refs.homeContainer.scrollTop();
    },
    // 获取首页第一屏数据
    async getData() {
      Utils.showLoading();
      const result = await indexService.getIndexData({ userid: Utils.getUserId(this) });
      if (!result) return;
      Utils.hideLoading();
      this.$refs.homeContainer && this.$refs.homeContainer.updateFirstData(result);
      // this.banners = result.banner || [];
      // this.categoryList = result.category || [];
      // this.news = result.news || {};
      // this.buyingProducts = result.buyingProducts || null;
      // this.midAds = result.midAds || {};
      // if (this.buyingProducts && this.buyingProducts.endDate) {
      //   this.endDate = Utils.dateFormat(new Date(this.buyingProducts.endDate), 'yyyy-MM-dd HH:mm:ss');

      //   this.timer && clearInterval(this.timer);
      //   this.timer = setInterval(this.calcTime, 1000);
      // }
      // this.$nextTick(() => {
      //   this.$refs.slide && this.$refs.slide.refresh();
      //   this.$refs.newsSlide && this.$refs.newsSlide.refresh();
      // });
    },
    // 获取首页第二屏数据
    async getOtherData() {
      const result = await indexService.getIndexOtherData({ userid: Utils.getUserId(this) });
      if (!result) return;
      this.$refs.homeContainer && this.$refs.homeContainer.updateOtherData(result);

      // this.hotSaleProList = result.hotSaleList || [];
      // this.otherProdList = result.otherList || [];
      // // this.generalProList = [...result.generalProList];

      // this.hotPro1 = this.hotSaleProList.length > 0 ? this.hotSaleProList[0] : {};
      // this.hotPro2 = this.hotSaleProList.length > 1 ? this.hotSaleProList[1] : {};
      // this.hotPro3 = this.hotSaleProList.length > 2 ? this.hotSaleProList[2] : {};
      // this.hotPro4 = this.hotSaleProList.length > 3 ? this.hotSaleProList[3] : {};
      // this.hotPro5 = this.hotSaleProList.length > 4 ? this.hotSaleProList[4] : {};
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
  max-height: 1.8rem;
  img {
    width: 100%;
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
  width: 100%;
  padding: .1rem 0;
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
    margin-bottom: .14rem;
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