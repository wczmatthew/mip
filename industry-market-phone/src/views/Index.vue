<template lang='html'>
  <w-container class="index-container">
    <!-- 正文内容 -->
    <!-- 顶部栏 -->
    <div class="w-header">
      <div class="w-header-mid header">
        <div class="city">
          <i class="iconfont icon-location"></i>
          温州
          <i class="iconfont icon-triangle-down"></i>
        </div>
        <w-search class="index-search" disabled @input-click="toSearch()"></w-search>

      </div>
      <div class="header-right">
        <w-scan-icon color="white"></w-scan-icon>
      </div>
    </div>
    <!-- 顶部栏 end -->

    <!-- 轮播图 -->
    <div class="banner" v-if="banners && banners.length">
      <cube-slide ref="slide" :data="banners">
        <cube-slide-item v-for="(item, index) in banners" :key="index" @click.native="clickHandler(item)" class="banner-item">
          <img :src="item.url">
        </cube-slide-item>
      </cube-slide>
    </div>
    <!-- 轮播图 end -->

    <!-- 常用功能 -->
    <div class="categorys">
      <div class="title">
        <div class="line"></div>
        常用功能
        <div class="line"></div>
      </div>

      <div class="w-grid-list">
        <div class="item" v-for="(item, index) in caterotyList" :key="index" @click="onCategoryClick(item)">
          <img :src="item.icon" alt="">
          <p class="sub-title">
            {{ item.title }}
          </p>
        </div>
      </div>
    </div>
    <!-- 常用功能 end -->

    <!-- 菜单 -->
    <div class="menu-list">
      <div class="menu menu-row orange">
        <p class="txt">
          新政速递
        </p>
      </div>
      <div class="menu menu1 red">
        <p class="txt">
          分享领红包
        </p>
        <p class="txt sub-txt">
          抢10元券
        </p>
      </div>
      <div class="menu menu2 blue">
        <p class="txt">
          打卡领积分
        </p>
      </div>
    </div>
    <!-- 菜单 end -->
    <!-- 正文内容 end -->
  </w-container>
</template>
<script>
import WSearch from '@/components/WSearch.vue';
import banner from '@/assets/home/banner.jpg';
import icon1 from '@/assets/home/icon1.png';
import icon2 from '@/assets/home/icon2.png';
import icon3 from '@/assets/home/icon3.png';
import icon4 from '@/assets/home/icon4.png';
import icon5 from '@/assets/home/icon5.png';
import icon6 from '@/assets/home/icon6.png';
import icon7 from '@/assets/home/icon7.png';
import icon8 from '@/assets/home/icon8.png';
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
    };
  },
  created() {},
  mounted() {
    this.caterotyList = [
      { icon: icon1, title: '电器超市', url: '/market?tab=home' },
      { icon: icon8, title: '阳光采购', url: '' },
      { icon: icon2, title: '网上商店' },
      { icon: icon3, title: '帮助文档' },
      { icon: icon4, title: '大客户合作' },
      { icon: icon5, title: '分销专区' },
      { icon: icon6, title: '供应商合作' },
      { icon: icon7, title: '待办事项' },
    ];

    this.getBanner();
  },
  components: {
    WSearch,
  },
  methods: {
    toSearch() {
      this.$router.push('/index/search');
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
      const result = await indexService.getBanner(3);
      Utils.hideLoading();
      if (!result) return;
      this.banners = [...result];
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variable.scss';
.w-container {
  background: #fff;
}

.header {
  width: 100%;
  height: .44rem;
  display: flex;
  align-items: center;

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
}

.banner {
  width: 100%;
  overflow: hidden;

  .banner-item {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    height: 100%;
    min-height: 2rem;
    img {
      width: 100%;
    }
  }
}

.categorys {
  width: 90%;
  margin: 0 auto;
  margin-top: -.4rem;
  border: 1px solid $color-line;
  border-radius: .05rem;
  overflow: hidden;
  position: relative;
  z-index: 10;
  background: #fff;

  .title {
    height: .25rem;
    line-height: .25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: .1rem 0;
    color: $color-blue;
    font-size: .12rem;
    font-weight: 700;

    .line {
      background: $color-blue;
      width: .05rem;
      height: .02rem;
      margin: 0 .1rem;
    }
  }
}

.w-grid-list {
  .item {
    width: 25%;
    padding: 0;
    padding: .08rem 0;
    border: 1px solid $color-line;
    border-left: 0;

    &:active {
      background: #f5f5f5;
    }

    &:nth-child(4n) {
      border-right: 0;
    }

    &:nth-child(n + 5) {
      border-bottom: 0;
      border-top: 0;
    }

    img {
      width: 60%;
      display: block;
      margin: 0 auto;
    }

    .sub-title {
      font-size: .1rem;
      font-weight: 700;
      margin-top: .05rem;
      text-align: center;
    }
  }
}

.menu-list {
  display: flex;
  flex-wrap: wrap;
  padding: 0 .15rem;
  margin-top: .08rem;
  padding-bottom: .1rem;

  .menu {
    position: relative;
    color: #fff;
    padding-top: .12rem;
    border-radius: .05rem;
    overflow: hidden;
    margin-bottom: .1rem;

    &::before,
    &::after {
      content: ' ';
      display: block;
      position: absolute;
      bottom: 0;
      right: 0;
      background: #fff;
      opacity: .32;
      z-index: 1;
    }

    &::before {
      width: .3rem;
      height: .3rem;
    }

    &::after {
      width: .2rem;
      height: .2rem;
      bottom: .05rem;
      right: .05rem;
      border-bottom-right-radius: .05rem;
    }

    .txt {
      width: 100%;
      font-weight: 700;
      text-align: left;
      padding: 0 .1rem;
      font-size: .18rem;
    }

    .sub-txt {
      font-size: .15rem;
      margin-top: .05rem;
    }

    &.red {
      background: linear-gradient(to right, #f4c37b, #ef787c);
    }

    &.blue {
      background: linear-gradient(to right, #34d1f4, #35a6f6);
    }

    &.orange {
      background: linear-gradient(to right bottom, #f8a853, #fbbc4d, #fecc48);
    }
  }

  .menu-row {
    width: 100%;
    height: .7rem;
  }

  .menu1 {
    width: 58%;
    height: .7rem;
    margin-right: 2%;
    margin-bottom: 0;
  }

  .menu2 {
    width: 40%;
    height: .7rem;
    margin-bottom: 0;
  }
}
</style>
<style lang="scss">
.index-container .header-right {
  position: static;
}

.index-container .w-header {
  background: rgba($color: #000000, $alpha: .5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
}

.index-container .w-header::after {
  display: none;
}
.w-header-mid .index-search {
  flex: 1;
}
</style>
