<!-- 商城页 -->
<template lang='html'>
  <w-container showHeader showBack>
    <!-- 顶部栏 -->
    <w-search class="search" slot="header-mid" show-scan disabled
    @input-click="toSearch()"></w-search>
    <div class="header-right" slot="header-right">
      <!-- <w-msg-icon color="blue"></w-msg-icon> -->
      <!-- <i class="iconfont icon-cart"></i> -->
      <w-cart-icon color="blue" :current-path="routePath"></w-cart-icon>
    </div>
    <!-- 顶部栏 end -->

    <cube-sticky :pos="scrollY">
      <div class="scroll-ele" @scroll="scrollHandler">
        <!-- 顶部活动区域 -->
        <div style="min-height: 20vh">
          <cube-slide ref="slide" style="height: auto;" :show-dots="false" v-if="banners.length">
            <cube-slide-item class="slide-item" v-for="(item, index) in banners" :key="index">
              <div class="item" v-for="(banner, subIndex) in item" :key="'sub'+subIndex" @click="clickHandler(item)">
                <img :src="banner.url">
              </div>
            </cube-slide-item>
          </cube-slide>
        </div>
        <!-- 顶部活动区域 -->

        <!-- 菜单栏 -->
        <!-- <cube-sticky-ele>
          <mall-tab :tab-list="tabList" @select="onSelectTab"></mall-tab>
        </cube-sticky-ele> -->
        <!-- 菜单栏 end -->

        <!-- 商品列表 -->
        <no-data v-if="noProduct"></no-data>
        <product-grid-list ref="productList" routePath="mall" v-else></product-grid-list>
        <!-- <div class="w-grid-list" v-else>
          <div class="item" v-for="(item, index) in productList" :key="'product' + index">
            <div class="product">
              <div class="img">
                <img :src="item.imgPath" alt="" @error="imgErr(item)">
              </div>
              <div class="title">
                {{item.XHGG}}
              </div>
              <div class="price">
                ￥{{item.DJJ || '--'}}
              </div>
            </div>
          </div>
        </div> -->
        <!-- 商品列表 end -->

        <!-- 优选推荐 -->
        <div class="recom-list">
          <p class="title">
            优选推荐
          </p>
          <div class="list">
            <div class="item" v-for="(item, index) in recommList" :key="'recom' + index">
              <div class="img">
                <img :src="item.imgPath" alt="">
              </div>

              <div class="detail">
                <p class="sub-title">
                  {{ item.title }}
                </p>
                <div class="star">
                  <cube-rate v-model="item.star" disabled class="mall-star"></cube-rate>
                  <span>{{item.star || '--'}} 分</span>
                </div>
                <div class="labels">
                  <span class="label" v-for="(label, lIndex) in item.labels" :key="'i'+lIndex">
                    {{ label }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 优选推荐 end -->
      </div>

      <!-- 置顶的菜单栏 -->
      <!-- <template slot="fixed">
        <mall-tab :tab-list="tabList"></mall-tab>
      </template> -->
      <!-- 置顶的菜单栏 -->
    </cube-sticky>
  </w-container>
</template>
<script>
import WSearch from '@/components/WSearch.vue';
// import MallTab from './components/MallTab.vue';
import productImg from '@/assets/mall/product.png';
import notFoundImg from '@/assets/404.png';
import service from '@/services/product.service';
import Utils from '@/common/Utils';
import indexService from '@/services/index.service';
import ProductGridList from './components/ProductGridList.vue';

export default {
  data() {
    return {
      scrollY: 0,
      tabList: [
        { title: '综合电器', selectTxt: '' },
        { title: '配电电器', selectTxt: '' },
        { title: '控制电器', selectTxt: '' },
        { title: '驱动电器', selectTxt: '' },
        { title: '继电器', selectTxt: '' },
        { title: '开关电器', selectTxt: '' },
        { title: '电源电器', selectTxt: '' },
        { title: '焊接设备', selectTxt: '' },
      ],
      banners: [],
      productList: [],
      noProduct: false,
      recommList: [
        {
          title: '正泰插座NEA系列1', star: 4, imgPath: productImg, labels: ['满100-3', '买2送1', '全国包邮'],
        },
        {
          title: '正泰插座NEA系列2', star: 4, imgPath: productImg, labels: ['满100-3', '买2送1', '全国包邮'],
        },
      ],
      routePath: Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'mall' }), // 获取当前路由
    };
  },
  created() {},
  mounted() {
    this.getBanner();
    this.getData();
  },
  components: {
    WSearch,
    // MallTab,
    ProductGridList,
  },
  methods: {
    toSearch() {
      this.$router.push('/mall/search');
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
          // console.log('error: ', error);
        }
        return;
      }

      this.$router.push(item.url);
    },
    scrollHandler(e) {
      this.scrollY = e.currentTarget.scrollTop;
    },
    // onSelectTab(data) {
    //   // console.log(data);
    // },
    // 图片加载失败
    imgErr(item) {
      item.imgPath = notFoundImg;
    },
    // 获取首页轮播图
    async getBanner() {
      const result = await indexService.getBanner(4);
      if (!result) return;
      const list = [...result];

      this.banners = [];
      let slide = [];
      list.forEach((item, index) => {
        if (index % 3 === 0 && slide.length) {
          this.banners.push([...slide]);
          slide = [];
        }

        slide.push(item);

        if (index % 3 !== 0 && list.length - 1 === index) {
          this.banners.push([...slide]);
        }
      });

      this.$refs.slide && this.$refs.slide.refresh();
    },
    async getData() {
      Utils.showLoading();
      const result = await service.getTopProducts();
      if (!result) {
        this.noProduct = true;
        return;
      }
      Utils.hideLoading();
      this.productList = result.rows || [];
      this.noProduct = !this.productList.length;
      this.$refs.productList && this.$refs.productList.updateList(this.productList);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variable.scss';
.search {
  padding-left: .44rem;
}

.header-right {
  position: static;
  .iconfont {
    width: .45rem;
  }
  .icon-cart {
    color: $default-color;
  }
}

.scroll-ele {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.slide-item {
  display: flex;
  padding: .1rem 0;

  .item {
    width: 33%;
    height: 20vh;
    min-height: .8rem;
    border-radius: .1rem;
    margin-right: 1%;
    overflow: hidden;
    box-shadow: 0 0 .05rem #ddeeed;

    &:last-child {
      margin-right: 0;
    }
  }

  img {
    width: 100%;
    height: 100%;
  }
}

.w-grid-list {
  .product {
    width: 100%;
    margin: 0 auto;
    background: #fff;
    box-shadow: 0 .05rem .1rem #e6e6e6;
    border-radius: .05rem;
    padding-bottom: .05rem;
    overflow: hidden;

    .img {
      width: 100%;
      height: 30vh;
      min-height: .8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;

      img {
        max-width: 100%;
        max-height: 100%;
      }
    }

    .title {
      color: $default-color;
      text-align: right;
      @include text-overflow-muli(2);
      margin: .1rem;
      line-height: .18rem;
      overflow: hidden;
      height: .32rem;
    }

    .price {
      color: $color-red;
      text-align: right;
      font-size: 12px;
      @include text-ellipsis;
      width: 100%;
      padding: .1rem;
      padding-top: 0;
    }
  }
}

.recom-list {
  padding-bottom: .2rem;
  .title {
    color: $default-color;
    padding-left: .12rem;
    font-size: 16px;
    font-weight: 700;
    margin: .15rem 0;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 .12rem .2rem .52rem;

    .item {
      width: 45%;
      background: #fff;
      border-radius: .05rem;
      box-shadow: 0 .05rem .1rem #e6e6e6;
      position: relative;
      padding-left: .4rem;

      .img {
        width: .8rem;
        height: .63rem;
        position: absolute;
        left: -.4rem;
        top: 50%;
        margin-top: -.32rem;
        display: flex;
        border-radius: .08rem;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }

      .detail {
        padding: .15rem .1rem;

        .sub-title {
          font-size: 16px;
          @include text-overflow-muli(2);
          margin-bottom: .1rem;
          color: $default-color;
        }

        .star {
          font-size: 10px;
          display: flex;
          align-items: center;
          color: $default-color;
          margin-bottom: .1rem;

          span {
            margin-left: .05rem;
          }
        }

        .labels {
          display: flex;
          align-items: center;
          flex-wrap: wrap;

          .label {
            display: block;
            padding: .02rem .05rem;
            border: .01rem solid $default-color;
            border-radius: .05rem;
            font-size: 10px;
            margin-right: 2%;
            color: $default-color;
            margin-bottom: .05rem;
          }
        }
      } // end detail
    }
  }
}

</style>

<style lang="scss">
.mall-star .cube-rate-item{
  width: .12rem;
}
</style>