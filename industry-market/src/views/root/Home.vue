<!--  -->
<template lang='html'>
  <div class="home-container">
    <!-- 顶部栏 -->
    <div class="header">
      <w-search class="home-search" disabled show-scan @input-click="toSearch()" style="padding-right: .3rem;"></w-search>
      <!-- <w-msg-icon></w-msg-icon> -->
    </div>
    <!-- 顶部栏 end -->

    <!-- 轮播图 -->
    <div class="banner">
      <div class="banner-item">
        <img src="~@/assets/home/banner-bg.jpg" alt="">
      </div>
    </div>
    <!-- <div class="banner" v-if="banners && banners.length">
      <cube-slide ref="slide" :data="banners">
        <cube-slide-item v-for="(item, index) in banners" :key="index" @click.native="clickHandler(item)" class="banner-item" :auto-play="">
          <img :src="item.url">
        </cube-slide-item>
      </cube-slide>
    </div> -->
    <!-- 轮播图 end -->

    <!-- 常用功能 -->
    <div class="w-grid-list">
      <div class="item" @click="onStartGuid()">
        <img src="~@/assets/home/mode-bg2.png" alt="" class="bg">
        <div class="detail">
          <p>开始导购</p>
        </div>
      </div>
      <!-- <div class="item" @click="toGuide()">
        <img src="~@/assets/home/mode-bg1.png" alt="" class="bg">
        <div class="detail">
          <p>展区导航</p>
        </div>
      </div> -->

      <!-- <div class="item" @click="toProductList()">
        <img src="~@/assets/home/mode-bg2.png" alt="" class="bg">
        <div class="detail">
          <p>智能搜索</p>
        </div>
      </div> -->

      <div class="item" @click="toCustomerChat()">
        <img src="~@/assets/home/mode-bg1.png" alt="" class="bg">
        <div class="detail">
          <p>客户洽谈</p>
        </div>
      </div>

      <!-- <div class="item">
        <img src="~@/assets/home/mode-bg3.png" alt="" class="bg">
        <div class="detail">
          <p>优惠信息</p>
          <p>Preferential</p>
          <p class="underline">Information</p>
        </div>
      </div>

      <div class="item" @click="toCustomers()">
        <img src="~@/assets/home/mode-bg4.png" alt="" class="bg">
        <div class="detail">
          <p>客户洽谈</p>
          <p>Customer</p>
          <p class="underline">Negotiation</p>
        </div>
      </div> -->

    </div>
    <!-- 常用功能 end -->

    <!-- 弹窗 -->
    <w-modal-three-btn ref="guidModal"></w-modal-three-btn>

    <w-modal-three-btn ref="chatModal"></w-modal-three-btn>
    <!-- 弹窗 end -->

  </div>
</template>
<script>
import WSearch from '@/components/WSearch.vue';
import WModalThreeBtn from '@/components/WModalThreeBtn.vue';
import banner from '@/assets/home/banner.png';
import banner2 from '@/assets/home/banner2.jpg';
import Utils from '@/common/Utils';
import indexService from '@/services/index.service';
import orderService from '@/services/order.service';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      banners: [
        {
          url: banner,
          title: '图片1',
        },
        {
          url: banner2,
          title: '图片2',
        },
      ],
      caterotyList: [],
      autoplay: true,
      isToChat: false,
    };
  },
  watch: {
    '$route'(to) {
      // console.log('home route: ', to.path);
      if (to.path === '/market' && to.query.tab === 'home' && this.isToChat && this.selectCustomer && this.selectCustomer.id) {
        // 需要跳转到客户洽谈
        this.$store.commit('customer/updateCustomer', this.selectCustomer);
        this.$router.push('/market/customerEdit?isUpdateTemp=1');
      }

      if (to.path === '/market' && to.query.tab === 'home') {
        this.isToChat = false;
      }
    },
  },
  created() {},
  mounted() {
    // console.log('mounted');
    // Utils.showLoading();
    // this.getBanner();
  },
  computed: {
    ...mapGetters('customer', {
      selectCustomer: 'selectCustomer',
    }),
  },
  components: {
    WSearch,
    WModalThreeBtn,
  },
  methods: {
    toSearch() {
      this.$router.push('/market/search');
    },
    // 客户洽谈
    toCustomerChat() {
      if (!this.$refs.chatModal) return;

      let content = '是否进行客户洽谈';
      let btn3 = '';
      if (this.selectCustomer && this.selectCustomer.id) {
        content = `当前客户为<span class="color-blue"><b>${this.selectCustomer.name}</b></span>, 是否进行客户洽谈?`;
        btn3 = '继续洽谈';
      }

      // 隐藏toast
      Utils.hideLoading();

      this.$refs.chatModal.show({
        title: '提醒',
        content,
        btn1Txt: '切换客户并洽谈',
        btn2Txt: '新增客户并洽谈',
        btn3Txt: btn3,
        shadowClose: true,
        callback: (type) => {
          if (type === 'btn1') {
            // 切换客户
            this.isToChat = true;
            this.$router.push('/market/customers');
          } else if (type === 'btn2') {
            // 新增客户并洽谈
            // 新增临时客户, 开始洽谈
            this.addTempCustomer('chat');
          } else if (type === 'btn3') {
            // 继续当前客户
            this.$store.commit('customer/updateCustomer', this.selectCustomer);
            this.$router.push('/market/customerEdit?isUpdateTemp=1');
          }
        },
      });
    },
    // 开始导购
    onStartGuid() {
      if (!this.$refs.guidModal) return;

      let content = '是否开启新的购物';
      let btn3 = '';
      if (this.selectCustomer && this.selectCustomer.id) {
        content = `当前客户为<span class="color-blue"><b>${this.selectCustomer.name}</b></span>, 确定进行新的导购?`;
        btn3 = '继续导购';
      }

      // 隐藏toast
      Utils.hideLoading();

      this.$refs.guidModal.show({
        title: '提醒',
        content,
        btn1Txt: '切换客户',
        btn2Txt: '新的导购',
        btn3Txt: btn3,
        shadowClose: true,
        callback: (type) => {
          if (type === 'btn1') {
            // 切换客户
            this.$router.push('/market?tab=category');
            setTimeout(() => {
              this.$router.push('/market/customers');
            }, 100);
          } else if (type === 'btn2') {
            // 新的导购
            // 新增临时客户, 开始购物
            this.addTempCustomer();
          } else if (type === 'btn3') {
            // 继续当前客户购物
            this.$router.push('/market?tab=category');
          }
        },
      });
    },
    // 添加临时客户
    async addTempCustomer(type) {
      Utils.showLoading();
      const result = await orderService.addTempClient({ userid: Utils.getUserId(this) });
      if (!result) return;
      Utils.hideLoading();
      // 更新选中客户信息
      this.$store.commit('customer/updateSelectCustomer', result);

      // 切换到洽谈界面
      if (type === 'chat') {
        this.$store.commit('customer/updateCustomer', this.selectCustomer);
        this.$router.push('/market/customerEdit?isUpdateTemp=1');
        return;
      }

      // 切换到分类界面
      this.$router.push('/market?tab=category');
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
    // 点击类目
    onCategoryClick(item) {
      if (item.url) {
        this.$router.push(item.url);
      }
    },
    // 获取首页轮播图
    async getBanner() {
      const result = await indexService.getBanner(5);
      if (!result) return;
      Utils.hideLoading();
      this.banners = [...result];
      this.$nextTick(() => {
        this.$refs.slide && this.$refs.slide.refresh();
      });
    },
    // 传统模式, 产品列表
    toProductList() {
      this.$router.push('/market/productCategory');
      // this.$router.push('/market/productList');
    },
    // 店内模式
    toGuide() {
      this.$router.push('/market?tab=guide');
    },
    // 客户洽谈
    toCustomers() {
      this.$router.push('/market?tab=customer');
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variable.scss';
.home-container {
  background: #404e67;
  height: 100%;
  position: relative;
}

.header {
  position: fixed;
  top: .05rem;
  left: 0;
  width: 100%;
  height: 50px;
  z-index: 20;
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
    font-size: 12px;

    .iconfont {
      margin-left: .03rem;
      font-size: 10px;
    }
  }

}

.banner {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .banner-item {
    img {
      width: 100%;
    }
  }
}

.w-grid-list {
  width: 95%;
  justify-content: space-around;
  position: absolute;
  bottom: 2vh;
  left: 2.5%;

  .item {
    width: 20%;
    padding: 0;
    padding-bottom: .1rem;
    padding-top: .05rem;
    position: relative;
    overflow: hidden;

    &:active {
      opacity: 0.8;
    }

    img.bg {
      width: 100%;
      display: block;
    }

    .detail {
      position: absolute;
      top: 42%;
      left: 15%;
      z-index: 10;
      width: 50%;

      p {
        color: #fff;
        font-size: .1rem;
        margin-bottom: .02rem;

        &.underline::after {
          display: block;
          content: ' ';
          width: 20%;
          height: .02rem;
          background-color: #fff;
          margin-top: .05rem;
          margin-left: .02rem;
        }
      }
    }
  }
}

</style>
<style lang="scss">
.home-search {
  flex: 1;
  margin-left: .1rem;

  .icon-scan {
    color: #fff;
  }
}
</style>