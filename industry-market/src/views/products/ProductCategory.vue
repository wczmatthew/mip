<!-- 产品货架页面 -->
<template lang='html'>
  <w-container show-header show-back>
    <!-- 顶部栏 -->
    <w-search class="search" slot="header-mid" disabled show-scan @input-click="toSearch()"></w-search>
    <div class="header-right" slot="header-right">
      <w-cart-icon color="blue"></w-cart-icon>
    </div>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <div class="product-container">
      <!-- 左侧类目 -->
      <div class="category-list">
        <div class="menu-item" v-for="(item, index) in menuList" :key="index">
          <div class="menu" @click.stop="onChangeShelf(item)" :class="{'actived': selectMenu.sid == item.sid}">
            <span>{{ item.bname }}</span>
          </div>
        </div>
      </div>
      <!-- 左侧类目 end -->

      <!-- 产品列表 -->
      <div class="product-scroll">
        <w-loading-row v-show="loadingShelf"></w-loading-row>
        <no-data v-if="!dataList || !dataList.length"></no-data>
        <cube-scroll-nav
          class="product-scroll"
          v-if="!loadingShelf"
          ref="scroll"
          :side="true"
          :data="dataList"
          :current="current">
          <cube-scroll-nav-panel
            v-for="(item, index) in dataList"
            :key="item.sid + index"
            :label="item.sid + index"
            :title="item.bname">
            <p class="title">
              {{ item.bname }}
            </p>
            <div class="product-list">
              <div class="product-item" v-for="(product, index) in item.childList" :key="product.sid + index" @click.stop="toDetail(product)">
                <div class="img">
                  <w-img :src="product.imgPath"></w-img>
                </div>
                <p>{{product.bname || '标题缺失, 请联系管理员'}}</p>
              </div>
            </div>
          </cube-scroll-nav-panel>
        </cube-scroll-nav>
      </div>
      <!-- 产品列表 end -->
    </div>
    <!-- 正文内容 end -->
  </w-container>
</template>
<script>
import WSearch from '@/components/WSearch.vue';
// import { mapGetters } from 'vuex';
// import service from '@/services/product.service';
import commonService from '@/services/common.service';
import Utils from '@/common/Utils';

export default {
  data() {
    return {
      menuList: [],
      menuIndex: 0,
      subMenuList: [],
      dataList: [],
      current: '',
      bnr: '',
      selectMenu: {},
      loadingShelf: false,
      routePath: Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'productCategory' }), // 获取当前路由
    };
  },
  created() {},
  mounted() {
    this.$store.commit('product/updateKeywords', '');
    this.getSortList();
  },
  watch: {
    '$route'(to) {
      // console.log('home route: ', to.path);
      if (to.path === this.routePath) {
        // 返回到当前界面
        this.$store.commit('product/updateKeywords', '');
      }
    },
  },
  components: {
    WSearch,
  },
  methods: {
    toSearch() {
      this.$router.push(`${this.routePath}/search`);
    },
    toDetail(item) {
      this.$store.commit('product/updateKeywords', '');
      this.$router.push(`${this.routePath}/productList?seriesId=${item.sid}`);
      // if (!item.bm) return;
      // this.$router.push(`/market/detail?bm=${item.bm}`);
    },
    async getSortList() {
      Utils.showLoading();
      const result = await commonService.getNewSortList();
      if (!result) return;
      Utils.hideLoading();
      this.menuList = [...result];

      if (!this.menuList.length) return;

      // 默认选中第一个
      this.menuList[0].isOpen = true;
      this.selectMenu = this.menuList[0];
      this.onChangeShelf(this.selectMenu);
    },
    // 获取产品列表
    onChangeShelf(item) {
      this.loadingShelf = true;
      this.selectMenu = { ...item };
      this.dataList = [...item.childList];
      setTimeout(() => {
        this.loadingShelf = false;
      }, 100);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variable.scss';

.search {
  padding-left: .44rem;
  padding-right: .44rem;
}

.product-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  background: #fff;

  .category-list {
    width: .6rem;
    height: 100%;
    flex-shrink: 0;
    background: #fff;
    padding-top: .05rem;
    overflow: auto;
    position: relative;

    &::after {
      content: ' ';
      position: absolute;
      top: 0;
      right: 0;
      width: 1px;
      height: 100%;
      background: #e6e6e6;
      transform: scaleX(0.5);
    }

    .menu {
      height: .3rem;
      line-height: .3rem;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all .3s ease;
      padding-left: .05rem;
      position: relative;

      span {
        font-weight: 700;
      }

      .iconfont {
        font-weight: 700;
        margin-left: .05rem;
        transform: rotate(180deg);
        transition: all .3s ease;
      }

      &.actived {
        color: $color-blue;

        &::after {
          content: ' ';
          position: absolute;
          right: 0;
          top: 50%;
          margin-top: -.05rem;
          width: .01rem;
          height: .1rem;
          background: $color-blue;
        }
      }
    } // end menu

  } // end category-list

  .product-scroll {
    flex: 1;

    .title {
      height: .3rem;
      line-height: .3rem;
      text-align: center;
    }
  }

  .product-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding-left: 2%;
    padding-top: .05rem;

    .product-item {
      width: 15%;
      min-width: .6rem;
      // padding: .05rem;
      margin-right: 1.5%;
      margin-bottom: .1rem;
      // background: #fff;
      border-radius: .02rem;
      // box-shadow: 0 0 .03rem #e6e6e6;
      overflow: hidden;

      .no-data {
        padding: 0;
      }

      .img {
        width: .5rem;
        height: .5rem;
        margin: 0 auto;
        @include flex-center;
        overflow: hidden;
        // background: #fff;
        padding: .02rem;
        border-radius: .05rem;

        img {
          height: 100%;
        }
      } // end img

      p {
        font-size: 12px;
        margin-top: .05rem;
        @include break-word;
        text-align: center;
        line-height: 16px
      }
    }
  } // end product-list
} // end product-container

</style>
<style lang="scss">
.product-container {

  .cube-scroll-wrapper .cube-sticky-fixed {
    display: none;
  }

  .cube-scroll-nav-bar-item {
    padding: 15px 10px;
  }
  .cube-scroll-content {
    min-height: 100%;
  }

  // 标题有bug, 故隐藏掉
  .cube-scroll-nav-panel .cube-sticky-ele {
    height: 1px !important;
    opacity: 0;
  }

  .cube-scroll-nav-panels {
    background: #f5f5f5;
  }
  // .cube-scroll-content,
  // .cube-scroll-list-wrapper {
  //   height: 100%;
  // }

  .cube-scroll-nav-panel-title {
    height: .3rem;
    line-height: .3rem;
    text-align: center;
  }

  .cube-scroll-nav-bar-items {
    &::after {
      content: ' ';
      position: absolute;
      top: 0;
      right: 0;
      width: 1px;
      height: 100%;
      background: #e6e6e6;
      transform: scaleX(0.5);
    }
  }
}
</style>