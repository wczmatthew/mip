<!-- 产品货架页面 -->
<template lang='html'>
  <w-container show-header>
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
          <div class="menu" @click.stop="toggleMenu(item, index)"
          :class="{'actived': item.isOpen}">
            <span>{{ item.name }}</span>
            <i class="iconfont icon-arrow-down"></i>
          </div>
          <div v-show="item.isOpen" class="sub-list">
            <div class="sub-item" v-for="(subItem, subIndex) in item.childList" :key="index + subIndex" :class="{'actived': selectShelf.id == subItem.id}" @click.stop="onChangeShelf(subItem)">
              {{ subItem.name }}
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="category-list">
        <div class="item" v-for="(item, index) in menuList" :key="index" @click="onChangeMainMenu(item, index)"
        :class="{'actived': menuIndex == index}">
          <span>
            {{item.sname}}
          </span>
        </div>
      </div> -->
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
            :key="item.pid + index"
            :label="item.pid + index"
            :title="item.name">
            <p class="title">
              {{ item.name }}
            </p>
            <div class="product-list">
              <div class="product-item" v-show="!item.childList || !item.childList.length">
                <no-data desc="补货中"></no-data>
              </div>
              <div class="product-item" v-for="(product, index) in item.childList" :key="product.id + index">
                <div class="img">
                  <w-img :src="product.imgPath"></w-img>
                </div>
                <p>{{product.xhgg || '标题缺失, 请联系管理员'}}</p>
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
import { mapGetters } from 'vuex';
import service from '@/services/product.service';
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
      selectShelf: {},
      loadingShelf: false,
    };
  },
  created() {},
  mounted() {
    this.getShelfData();
    // 深层数据进行深拷贝
    // try {
    //   const json = JSON.stringify(this.sortList);
    //   this.menuList = JSON.parse(json);
    // } catch (error) {
    //   // console.log(error);
    // }
    // this.onChangeMainMenu({}, 0);
  },
  computed: {
    ...mapGetters('category', {
      sortList: 'sortList',
    }),
  },
  components: {
    WSearch,
  },
  methods: {
    toSearch() {
      this.$router.push('/market/search');
    },
    toggleMenu(item, index) {
      item.isOpen = !item.isOpen;
      this.$set(this.menuList, index, item);
      // this.$set(item, 'isOpen', !item.isOpen);
    },
    // 获取货架信息
    async getShelfData() {
      Utils.showLoading();
      const result = await service.getShelfList({ userid: Utils.getUserId(this) });
      if (!result) {
        this.firstLoading = false;
        return;
      }
      Utils.hideLoading();
      this.menuList = [...result];

      if (!this.menuList.length) return;

      if (this.$route.query.id) {
        // 点击某一个货架进来, 选中对应货架
        const index = this.menuList.findIndex(item => item.id === parseInt(this.$route.query.id, 10));
        if (index < 0) return;
        this.menuList[index].isOpen = true;
        if (this.menuList[index].childList.length) {
          this.selectShelf = this.menuList[index].childList[0];
          this.firstLoading = true;
          this.getProductData();
        }
        return;
      }

      // 默认选中第一个
      this.menuList[0].isOpen = true;
      if (this.menuList[0].childList.length) {
        this.selectShelf = this.menuList[0].childList[0];
        this.loadingShelf = true;
        this.getProductData();
      }
    },
    // 获取产品列表
    onChangeShelf(item) {
      this.selectShelf = { ...item };
      this.loadingShelf = true;
      // setTimeout(() => {
      //   this.$nextTick(() => {
      //     this.$refs.scroll && this.$refs.scroll.refresh();
      //   });
      // }, 300);
      this.getProductData();
    },
    // 获取产品列表
    async getProductData() {
      const result = await service.getNewShelfProductList({ shelfId: this.selectShelf.id });
      setTimeout(() => {
        this.loadingShelf = false;
      }, 300);
      if (!result) return;
      this.dataList = [...result];
      // if (this.dataList.length) {
      //   this.current = this.dataList[0].pid;
      // }
      this.$nextTick(() => {
        this.$refs.scroll && this.$refs.scroll.refresh();
      });
    },
    // changeHandler(label) {
    //   // console.log('changed to:', label);
    // },
    // stickyChangeHandler(current) {
    //   // console.log('sticky-change', current);
    // },
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

    .item {
      font-size: 12px;
      text-align: center;
      height: .24rem;
      line-height: .24rem;
      padding: 0 .05rem;
      @include break-word;
      position: relative;

      &.actived {
        color: $color-blue;

        &::after {
          content: ' ';
          position: absolute;
          right: 0;
          top: .07rem;
          width: .01rem;
          height: .1rem;
          background: $color-blue;
        }
      }
    } // end item

    .menu {
      height: .3rem;
      line-height: .3rem;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all .3s ease;
      padding-left: .05rem;

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
        .iconfont {
          transform: rotate(0deg);
        }
      }
    } // end menu

    .sub-list {
      background: #fff;
      overflow: hidden;
    }

    .sub-item {
      height: .24rem;
      line-height: .24rem;
      padding: 0 .1rem;
      text-align: center;
      background: #fff;
      font-weight: 700;
      position: relative;

      &.actived {
        color: $color-blue;

        &::after {
          content: ' ';
          position: absolute;
          right: 0;
          top: .07rem;
          width: .01rem;
          height: .1rem;
          background: $color-blue;
        }
      }
    } // end sub-item
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
    padding-left: .1rem;
    padding-top: .05rem;
    border-bottom: 5px solid #e6e6e6;
    box-shadow: 0 3px 2px #ccc;

    .product-item {
      width: .63rem;
      padding: .05rem;
      margin-right: .06rem;
      margin-bottom: .06rem;
      background: #fff;
      border-radius: .02rem;
      box-shadow: 0 0 .03rem #e6e6e6;
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
        background: #fff;
        padding: .02rem;

        img {
          height: 100%;
        }
      } // end img

      p {
        font-size: 12px;
        margin-top: .03rem;
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