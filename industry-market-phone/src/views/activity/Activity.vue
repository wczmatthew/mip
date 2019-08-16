<!-- 活动 -->
<template lang='html'>
  <div class="w-container">
    <!-- 顶部栏 -->
    <header class="w-header">
      <div class="w-header-mid">
        活动
      </div>
    </header>
    <!-- 顶部栏 end -->

    <div class="w-content">
      <!-- 轮播图 -->
      <div class="banner" v-if="banners && banners.length">
        <cube-slide ref="slide" :data="banners">
          <cube-slide-item v-for="(item, index) in banners" :key="index" @click.native="onClickBanner(item)" class="banner-item">
            <w-img :src="item.imgPath"/>
          </cube-slide-item>
        </cube-slide>
      </div>
      <!-- 轮播图 end -->

      <p class="activity-title">
        商城头条
        <span>hot</span>
      </p>

      <!-- 活动列表 -->
      <div class="activity-list">
        <div class="item">
          <div class="img">
            <img src="~@/assets/home/banner.png" alt="">
          </div>
          <p class="title">
            正泰活动1111111
          </p>
          <p class="desc">
            正泰活动描述111111111
          </p>
        </div>
      </div>
      <!-- 活动列表 end -->
    </div>
  </div>
</template>
<script>
import banner from '@/assets/home/banner.png';

export default {
  data() {
    return {
      banners: [
        {
          url: banner,
          title: '图片1',
        },
      ],
    };
  },
  created() {},
  mounted() {},
  components: {},
  methods: {},
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variable.scss';

.w-container {
  background: #fff;
}

.banner {
  width: 100%;
  overflow: hidden;

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

.activity-title {
  font-size: .16rem;
  font-weight: 700;
  @include flex-center;
  padding: .12rem;

  span {
    padding: 0 .05rem;
    background: $color-default;
    color: #fff;
    border-radius: .05rem;
    margin-left: .1rem;
  }
}

.activity-list {
  .item {
    margin-bottom: .1rem;
    padding: 0 .12rem;

    .img {
      width: 100%;
      height: 1.45rem;
      border-radius: .1rem;
      overflow: hidden;
      @include flex-center;

      img {
        width: 100%;
      }
    }

    .title {
      @include text-ellipsis;
      padding-top: .1rem;
      line-height: .16rem;
    }

    .desc {
      color: $color-grey;
      font-size: .12rem;
      @include text-ellipsis;
      line-height: .16rem;
      margin-top: .05rem;
    }
  }
}
</style>