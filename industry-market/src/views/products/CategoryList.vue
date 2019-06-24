<!-- 分类 -->
<template lang='html'>
  <w-container show-header show-back>
    <!-- 顶部栏 -->
    <!-- 顶部栏 -->
    <w-search class="search" slot="header-mid" show-scan disabled @input-click="toSearch()"></w-search>
    <div class="header-right" slot="header-right">
      <!-- <w-msg-icon color="blue"></w-msg-icon> -->
      <!-- <i class="iconfont icon-cart"></i> -->
      <w-cart-icon :currentPath="routePath" color="blue"></w-cart-icon>
    </div>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <div class="menu-list">
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
    <div class="scroll-view">

      <no-data v-if="noData"></no-data>
      <w-loading-row v-show="firstLoading"></w-loading-row>
      <div class="row" v-for="(item, index) in dataList" :key="index">

        <!-- 货架商品列表 -->
        <div class="product-list">
          <div class="item" v-for="(product, productIndex) in item" :key="productIndex + index">
            <w-img :src="product.imgPath" v-if="product.xhgg" @click.native.stop="toDetail(product)"></w-img>
            <no-data v-else style="margin-top: -.3rem;" desc="补货中"></no-data>
          </div>
        </div>
        <!-- 货架商品列表 end -->

        <!-- 货架 -->
        <div class="row-bottom">
          <img src="~@/assets/common/shelf-top.png" alt="" class="top">
          <div class="mid">
            <div class="col" v-for="(product, productIndex) in item" :key="productIndex + 'prorow'">
              {{ product.xhgg || product.name }}
            </div>
          </div>
        </div>
        <!-- 货架 end -->

      </div>

    </div>
    <!-- 正文内容 end -->
  </w-container>
</template>
<script>
import WSearch from '@/components/WSearch.vue';
import service from '@/services/product.service';
import Utils from '@/common/Utils';

export default {
  data() {
    return {
      menuList: [],
      pageNum: 1,
      pageSize: 10,
      hasNext: true,
      noData: false,
      firstLoading: true,
      selectShelf: {},
      dataList: [],
      shelfDataList: [],
      routePath: Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'category' }), // 获取当前路由
    };
  },
  created() {},
  mounted() {
    this.getShelfData();
  },
  components: {
    WSearch,
  },
  methods: {
    toSearch() {
      this.$router.push(`${this.routePath}/search`);
    },
    toDetail(item) {
      if (!item.bm) return;
      this.$router.push(`${this.routePath}/detail?bm=${item.bm}`);
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
        this.firstLoading = true;
        this.getProductData();
      }
    },
    toggleMenu(item, index) {
      item.isOpen = !item.isOpen;
      this.$set(this.menuList, index, item);
      // this.$set(item, 'isOpen', !item.isOpen);
    },
    onChangeShelf(item) {
      this.selectShelf = { ...item };
      this.firstLoading = true;
      this.getProductData();
    },
    // 获取货架产品信息
    async getProductData() {
      const result = await service.getShelfProductList({ userid: Utils.getUserId(this), shelfId: this.selectShelf.id });
      this.firstLoading = false;
      if (!result) return;
      // 整理数据
      // 数据整理, 一行3个
      let list = [];
      this.shelfDataList = [];
      result.forEach((item, index) => {
        list.push(item);
        if ((index + 1) % 3 === 0) {
          // 准备下一行的数据
          this.shelfDataList.push([...list]);
          list = [];
        } else if (index === result.length - 1) {
          // 最后一个数据, 未满一行
          this.shelfDataList.push([...list]);
        }
      });

      this.dataList = [...this.shelfDataList];

      this.noData = !this.dataList.length;
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
}

.menu-list {
  float: left;
  width: 18%;
  height: 100%;
  overflow: auto;
  background: $color-blue;
  color: #fff;
  padding-top: .05rem;
  overflow-x: hidden;

  .menu {
    height: .3rem;
    line-height: .3rem;
    text-align: center;
    display: flex;
    align-items: center;
    transition: all .3s ease;

    span {
      flex: 1;
      font-weight: 700;
    }

    .iconfont {
      width: .3rem;
      font-weight: 700;
      transform: rotate(180deg);
      transition: all .3s ease;
    }

    &.actived {
      background: #277bc5;

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
    height: .3rem;
    line-height: .3rem;
    padding: 0 .1rem;
    text-align: center;
    background: #fff;
    color: $color-blue;
    font-weight: 700;

    &.actived {
      background: #4d97da;
      color: #fff;
    }
  } // end sub-item
} // end menu-list

.row {
  padding: 0 .08rem;
  .row-bottom {
    width: 100%;

    img {
      display: block;
      width: 100%;
      height: .06rem;
    }

    .mid {
      width: 100%;
      height: .22rem;
      background: $color-blue;
      display: flex;
      align-items: center;
      .col {
        width: 30%;
        height: .15rem;
        line-height: .15rem;
        color: #fff;
        font-size: 10px;
        text-align: center;
        box-shadow: inset 0 -0.02rem 0.01rem #80add6;
        border-top: .01rem solid #00182f;
        border-radius: .05rem;
        margin-left: 2.5%;
      }
    } // end mid
  } // end row-bottom

  .product-list {
    width: 95%;
    margin: .1rem auto .03rem;
    border-radius: .05rem;
    overflow: hidden;
    background: #fff;
    display: flex;
    box-shadow: 0 0 .05rem #ccc;

    .item {
      width: 33.3%;
      height: .6rem;
      padding: .1rem .05rem;
      overflow: hidden;
      img {
        height: 100%;
        display: block;
        margin: 0 auto;
      }
    }
  }
}

.scroll-view {
  height: 100%;
  overflow: auto;
}
</style>