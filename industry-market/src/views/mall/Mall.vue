<!-- 商城页 -->
<template lang='html'>
  <w-container showHeader showBack>
    <!-- 顶部栏 -->
    <w-search class="search" slot="header-mid">
      <i class="iconfont icon-scan" slot="right-icon"></i>
    </w-search>
    <div class="header-right" slot="header-right">
      <w-msg-icon color="blue"></w-msg-icon>
      <i class="iconfont icon-cart"></i>
    </div>
    <!-- 顶部栏 end -->

    <cube-sticky :pos="scrollY">
      <div class="scroll-ele" @scroll="scrollHandler">
        <!-- 顶部活动区域 -->
        <cube-slide ref="slide" style="height: auto;" :show-dots="false">
          <cube-slide-item class="slide-item">
            <div class="item">
              <img src="../../assets/mall/banner1.png">
            </div>
            <div class="item">
              <img src="../../assets/mall/banner2.png">
            </div>
            <div class="item">
              <img src="../../assets/mall/banner3.png">
            </div>
          </cube-slide-item>
        </cube-slide>
        <!-- 顶部活动区域 -->

        <!-- 菜单栏 -->
        <cube-sticky-ele>
          <mall-tab :tab-list="tabList" @select="onSelectTab"></mall-tab>
        </cube-sticky-ele>
        <!-- 菜单栏 end -->

        <!-- 商品列表 -->
        <div class="w-grid-list">
          <div class="item" v-for="(item, index) in productList" :key="'product' + index">
            <div class="product">
              <div class="img">
                <img :src="item.imgUrl" alt="">
              </div>
              <div class="title">
                {{item.title}}
              </div>
              <div class="price">
                ￥{{item.price || '--'}}
              </div>
            </div>
          </div>
        </div>
        <!-- 商品列表 end -->

        <!-- 优选推荐 -->
        <div class="recom-list">
          <p class="title">
            优选推荐
          </p>
          <div class="list">
            <div class="item" v-for="(item, index) in recommList" :key="'recom' + index">
              <div class="img">
                <img :src="item.imgUrl" alt="">
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
import WMsgIcon from '@/components/WMsgIcon.vue';
import MallTab from './components/MallTab.vue';
import productImg from '@/assets/mall/product.png';

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
      productList: [
        { title: '正泰插座NEA系列1', price: '19.00', imgUrl: productImg },
        { title: '正泰插座NEA系列2', price: '29.00', imgUrl: productImg },
        { title: '正泰插座NEA系列3', price: '19.00', imgUrl: productImg },
        { title: '正泰插座NEA系列4', price: '30.00', imgUrl: productImg },
        { title: '正泰插座NEA系列5', price: '19.00', imgUrl: productImg },
        { title: '正泰插座NEA系列6', price: '19.00', imgUrl: productImg },
        { title: '正泰插座NEA系列7', price: '50.00', imgUrl: productImg },
        { title: '正泰插座NEA系列8', price: '19.00', imgUrl: productImg },
        { title: '正泰插座NEA系列9', price: '19.00', imgUrl: productImg },
      ],
      recommList: [
        {
          title: '正泰插座NEA系列1', star: 4, imgUrl: productImg, labels: ['满100-3', '买2送1', '全国包邮'],
        },
        {
          title: '正泰插座NEA系列2', star: 4, imgUrl: productImg, labels: ['满100-3', '买2送1', '全国包邮'],
        },
      ],
    };
  },
  created() {},
  mounted() {},
  components: {
    WSearch,
    WMsgIcon,
    MallTab,
  },
  methods: {
    scrollHandler(e) {
      this.scrollY = e.currentTarget.scrollTop;
    },
    onSelectTab(data) {
      console.log(data);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variable.scss';

.header-right {
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
        width: 100%;
      }
    }

    .title {
      color: $default-color;
      text-align: right;
      @include text-overflow-muli(2);
      margin: .1rem;
      line-height: .18rem;
      overflow: hidden;
    }

    .price {
      color: $color-red;
      text-align: right;
      font-size: .12rem;
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
    font-size: .16rem;
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
          font-size: .16rem;
          @include text-overflow-muli(2);
          margin-bottom: .1rem;
          color: $default-color;
        }

        .star {
          font-size: .1rem;
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
            font-size: .1rem;
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