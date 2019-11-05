<!-- 云仓首页 -->
<template lang='html'>
  <w-container show-header show-back>
    <!-- 顶部栏 -->
    <template #header-mid>
      云仓
    </template>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <!-- 轮播图 -->
    <div class="banner" v-if="banners && banners.length">
      <cube-slide ref="slide" :data="banners">
        <cube-slide-item v-for="(item, index) in banners" :key="index" @click.native="onClickLink(item)" class="banner-item" auto-play>
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

    <!-- 今日入库 -->
    <div class="w-tableview">
      <div class="top-title">
        今日入库
        <!-- <span class="more">
          更多>
        </span> -->
      </div>
      <div class="cell" v-for="(item, index) in todayList" :key="'today'+index">
        <div class="title">
          {{item.spec}}
        </div>
        <div class="desc">
          {{item.qty}}
        </div>
      </div>
    </div>
    <!-- 今日入库 end -->

    <!-- 本月入库 -->
    <div class="w-tableview">
      <div class="top-title">
        本月入库
        <!-- <span class="more">
          更多>
        </span> -->
      </div>
      <div class="cell" v-for="(item, index) in monthList" :key="'month'+index">
        <div class="title">
          {{item.spec}}
        </div>
        <div class="desc">
          {{item.qty}}
        </div>
      </div>
    </div>
    <!-- 本月入库 end -->
    <!-- 正文内容 end -->
  </w-container>
</template>
<script>
import Utils from '@/common/Utils';
import indexService from '@/services/index.service';
import loading from '@/assets/loading.gif';

export default {
  data() {
    return {
      categoryList: [],
      banners: [],
      bannerErrImg: loading,
      todayList: [],
      monthList: [],
    };
  },
  created() {},
  mounted() {
    this.getData();

    this.todayList = [
      { spec: 'DZ47 WSXISNGK xiSINFO', qty: 200 },
      { spec: 'DZ47 WSXISNGK xiSINFO2', qty: 5000 },
      { spec: 'DZ47 WSXISNGK xiSINFO3', qty: 20000 },
      { spec: 'DZ47 WSXISNGK xiSINFO4', qty: 160 },
      { spec: 'DZ47 WSXISNGK xiSINFO5', qty: 20 },
    ];

    this.monthList = this.todayList;
  },
  components: {},
  methods: {
    // 获取首页第一屏数据
    async getData() {
      Utils.showLoading();
      const result = await indexService.getIndexData({ userid: Utils.getUserId(this) });
      if (!result) return;
      Utils.hideLoading();
      this.banners = result.banner || [];
      this.categoryList = result.category || [];
      // if (this.buyingProducts && this.buyingProducts.endDate) {
      //   this.endDate = Utils.dateFormat(new Date(this.buyingProducts.endDate), 'yyyy-MM-dd HH:mm:ss');

      //   this.timer && clearInterval(this.timer);
      //   this.timer = setInterval(this.calcTime, 1000);
      // }
      this.$nextTick(() => {
        this.$refs.slide && this.$refs.slide.refresh();
        this.$refs.newsSlide && this.$refs.newsSlide.refresh();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.banner {
  width: 100%;
  min-height: 1.2rem;
  overflow: hidden;
  // padding-top: .44rem;
  max-height: 1.8rem;
  background: #fff;

  .banner-item {
    padding: .1rem $spacing-lr;
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

.home-category {
  justify-content: space-around;
  background: #fff;
  padding: 0 $spacing-lr;
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

.w-tableview {
  margin-top: .1rem;

  .top-title {
    color: $color-default;
    padding: 0 $spacing-lr;
    padding-left: .1rem;
    height: .4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    &::before {
      content: ' ';
      width: 2px;
      height: 30%;
      background: $color-default;
      position: absolute;
      top: 35%;
      left: $spacing-lr;
    }

    &::after {
      content: ' ';
      width: 98.5%;
      height: 1px;
      background: $color-line;
      position: absolute;
      bottom: 0;
      left: 1.5%;
      transform: scaleY(.5);
    }

    .more {
      color: $color-grey;
    }
  }

  .cell .title {
    max-width: 65%;
  }
}

</style>