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

      <!-- <p class="activity-title">
        商城头条
        <span>hot</span>
      </p> -->

      <!-- 类目列表 -->
      <!-- <div class="category-list">
        <div class="item" v-for="(item, index) in categoryList" :key="'ca' + index" @click="toCategory(item)">
          <w-img :src="item.imgPath" alt="" class="bg"/>
          <p>{{item.title}}</p>
        </div>
      </div> -->
      <!-- 类目列表 end -->

      <!-- 活动列表 -->
      <div class="activity-list">
        <div class="item" v-for="(item, index) in activityList" :key="index"  @click="toActivity(item)">
          <img src="~@/assets/common/out.png" alt="" class="icon" v-if="item.validFlag == 0">
          <div class="img">
            <w-img :src="item.url" alt=""/>
          </div>
          <p class="title">
            {{item.title}}
          </p>
          <p class="desc">
            {{item.memo}}
          </p>
          <p class="desc" style="font-size: 10px;">
            {{item.createTime | dateFormat}} ~ {{item.activityEndTime | dateFormat}}
          </p>
        </div>
      </div>
      <!-- 活动列表 end -->
    </div>
  </div>
</template>
<script>
import Utils from '@/common/Utils';
import service from '@/services/common.service';

export default {
  data() {
    return {
      banners: [],
      categoryList: [],
      activityList: [],
    };
  },
  created() {},
  mounted() {
    this.getData();
  },
  watch: {
    '$route'(to) {
      if (to.path === '/market' && to.query.tab === 'gift') {
        this.$nextTick(() => {
          this.$refs.slide && this.$refs.slide.refresh();
        });
      }
    },
  },
  components: {},
  filters: {
    dateFormat(val) {
      return Utils.dateFormat(new Date(val), 'yyyy-MM-dd HH:mm:ss');
    },
  },
  methods: {
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

      this.$router.push(item.url);
    },
    async getData() {
      const result = await service.getActivityPageItem({ userid: Utils.getUserId(this) });
      if (!result) return;
      this.banners = [...result.activityAds];
      this.categoryList = [...result.categoryList];
      this.activityList = [...result.activityList];

      this.$nextTick(() => {
        this.$refs.slide && this.$refs.slide.refresh();
      });
    },
    toCategory(item) {
      if (!item.url) {
        Utils.showToast('敬请期待');
        return;
      }
      this.$router.push(`/market/${item.url}`);
    },
    toActivity(item) {
      this.$router.push(`/market/activieyDetail?id=${item.id}`);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variable.scss';

.w-container {
  background: #fff;
}

.banner {
  width: 100%;
  height: 1.2rem;
  overflow: hidden;

  .banner-item {
    padding: .1rem;
    // height: 1.45rem;
    @include flex-center;
    overflow: hidden;

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
  line-height: .18rem;

  span {
    padding: 0 .07rem;
    background: $color-default;
    color: #fff;
    border-radius: .05rem;
    margin-left: .1rem;
    font-size:  12px;
    font-weight: 700;
  }
}

.category-list {
  display: flex;
  overflow: auto;
  width: 100%;
  margin-bottom: .1rem;
  padding-left: 4vw;

  .item {
    width: 22vw;
    border-radius: .05rem;
    overflow: hidden;
    margin-right: 1.5vw;
    flex-shrink: 0;
    position: relative;

    .bg {
      width: 100%;
      display: block;
    }

    p {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      @include flex-center;
      @include text-ellipsis;
      color: #fff;
      font-size:  12px;
      font-weight: 700;
      background: rgba($color: #000000, $alpha: .2)
    }
  }
}

.activity-list {
  margin-top: .1rem;
  .item {
    margin-bottom: .1rem;
    padding: 0 .12rem;
    position: relative;

    .icon {
      position: absolute;
      top: 0;
      left: .12rem;
      z-index: 10;
      width: .5rem;
    }

    .img {
      width: 100%;
      height: 1.45rem;
      border-radius: .1rem;
      overflow: hidden;
      @include flex-center;
      background: $color-bg;

      img {
        height: 100%;
      }
    }

    .title {
      @include text-ellipsis;
      padding-top: .1rem;
      line-height: .16rem;
    }

    .desc {
      color: $color-grey;
      font-size:  12px;
      @include text-ellipsis;
      line-height: .16rem;
      margin-top: .05rem;
    }
  }
}
</style>