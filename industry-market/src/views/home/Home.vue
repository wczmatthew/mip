<!--  -->
<template lang='html'>
  <w-container>
    <!-- 顶部栏 -->
    <div class="header">
      <div class="city">
        温州
        <i class="iconfont icon-triangle-down"></i>
      </div>
      <w-search class="search">
        <i class="iconfont icon-scan" slot="right-icon"></i>
      </w-search>
      <div class="msg">
        <i class="iconfont icon-xiaoxi">
          <i class="point"></i>
        </i>
      </div>
    </div>
    <!-- 顶部栏 end -->

    <!-- 轮播图 -->
    <div class="banner">
      <cube-slide ref="slide" :data="banners">
        <cube-slide-item v-for="(item, index) in banners" :key="index" @click.native="clickHandler(item, index)" class="banner-item">
          <img :src="item.imgUrl">
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
      <div class="menu menu1 red">
        <p class="txt">
          分享领红包
        </p>
        <p class="txt">
          抢10元券
        </p>
      </div>
      <div class="menu menu2 blue">
        <p class="txt">
          打卡领积分
        </p>
      </div>
      <div class="menu menu3 orange">
        <p class="txt">
          新政速递
        </p>
      </div>
    </div>
    <!-- 菜单 end -->

  </w-container>
</template>
<script>
import WSearch from '@/components/WSearch.vue';
import banner from '@/assets/home/banner.png';
import banner2 from '@/assets/home/banner2.jpg';
import icon1 from '@/assets/home/icon1.png';
import icon2 from '@/assets/home/icon2.png';
import icon3 from '@/assets/home/icon3.png';
import icon4 from '@/assets/home/icon4.png';
import icon5 from '@/assets/home/icon5.png';
import icon6 from '@/assets/home/icon6.png';
import icon7 from '@/assets/home/icon7.png';
import icon8 from '@/assets/home/icon8.png';
import icon9 from '@/assets/home/icon9.png';

export default {
  data() {
    return {
      banners: [
        {
          imgUrl: banner,
          title: '图片1',
          url: '',
        },
        {
          imgUrl: banner2,
          title: '图片2',
          url: '',
        },
      ],
      caterotyList: [],
    };
  },
  created() {},
  mounted() {
    this.caterotyList = [
      { icon: icon1, title: '导购界面' },
      { icon: icon2, title: '订单管理' },
      { icon: icon3, title: '客户管理' },
      { icon: icon4, title: '二维码' },
      { icon: icon5, title: '待办事项' },
      { icon: icon6, title: '库存管理' },
      { icon: icon7, title: '系统设置' },
      { icon: icon8, title: '门店管理' },
      { icon: icon9, title: '帮助文档' },
    ];
  },
  components: {
    WSearch,
  },
  methods: {
    // 点击轮播图
    clickHandler(item, index) {
      console.log(item, ' ', index);
    },
    // 点击类目
    onCategoryClick(item) {
      console.log(item);
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: .44rem;
  z-index: 99;
  display: flex;
  padding-left: .15rem;
  align-items: center;

  .city {
    padding: 0 .1rem;
    background: rgba($color: #000000, $alpha: 0.6);
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
  }

  .search {
    flex: 1;

    .w-search-bar .search-view .iconfont {
      color: #fff;
    }
  }

  .icon-scan {
    color: #fff;
  }

  .msg {
    width: .4rem;
    height: 100%;
    flex-shrink: 0;
    position: relative;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: .22rem;

    .iconfont {
      position: relative;
      .point {
        width: .06rem;
        height: .06rem;
        border-radius: .06rem;
        background: $color-red;
        position: absolute;
        right: -.01rem;
        top: 0;
        z-index: 10;
      }
    }

  }
}

.banner {
  width: 100%;
  height: 1.4rem;
  overflow: hidden;

  .banner-item {
    img {
      width: 100%;
    }
  }
}

.categorys {
  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: .1rem 0;
    color: #695852;

    .line {
      background: $color-line;
      width: .6rem;
      height: .01rem;
      margin: 0 .1rem;
    }
  }
}

.w-grid-list {
  width: 80%;
  margin: 0 auto;

  .item {
    width: 16.66%;
    padding: 0;
    padding-bottom: .1rem;
    padding-top: .05rem;

    &:active {
      background: #f5f5f5;
    }

    img {
      width: 50%;
      display: block;
      margin: 0 auto;
    }

    .sub-title {
      font-size: .1rem;
      font-weight: 700;
      margin-top: .1rem;
      text-align: center;
    }
  }
}

.menu-list {
  display: flex;
  flex-wrap: wrap;
  padding: 0 .15rem;
  margin-top: .1rem;

  .menu {
    position: relative;
    color: #fff;
    padding-top: .08rem;

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
      width: 30%;
      height: 60%;
    }

    &::after {
      width: 26%;
      height: 50%;
    }

    .txt {
      width: 45%;
      font-weight: 700;
      margin-top: .1rem;
      text-align: right;
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

  .menu1 {
    width: 49%;
    height: .9rem;
    margin-right: 1%;
  }

  .menu2 {
    width: 24.5%;
    height: .9rem;
    margin-right: 1%;

    &::before {
      width: 33%;
      height: 40%;
    }

    &::after {
      width: 26%;
      height: 30%;
    }

    .txt {
      width: 100%;
      text-align: left;
      padding-left: 10%;
    }
  }

  .menu3 {
    width: 24.5%;
    height: .9rem;

    &::before {
      width: 33%;
      height: 40%;
    }

    &::after {
      width: 26%;
      height: 30%;
    }

    .txt {
      width: 100%;
      text-align: left;
      padding-left: 10%;
    }
  }
}
</style>