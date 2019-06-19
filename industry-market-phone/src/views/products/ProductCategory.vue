<!-- 产品分类 -->
<template lang='html'>
  <w-container show-header show-back>
    <!-- 顶部栏 -->
    <div slot="header-mid">产品分类</div>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <div class="menu-list">
      <div class="menu-item" v-for="(item, index) in menuList" :key="index">
        <div class="menu" @click.stop="toggleMenu(item, index)"
        :class="{'actived': menuIndex == index}">
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
    <div class="scroll-view">
      <no-data v-if="noData"></no-data>
      <w-loading-row v-show="firstLoading"></w-loading-row>
      <div class="category-list" v-for="(item, index) in dataList" :key="index">
        <p class="title">
          正泰昆仑系列
        </p>
        <!-- 商品列表 -->
        <div class="sub-title">
          万能式断路器
          <span>
            展开
            <i class="iconfont icon-arrow-down"></i>
          </span>
        </div>
        <div class="product-list">
          <div class="item" v-for="(product, productIndex) in item" :key="productIndex + index" @click="toDetail(product)">
            {{product.xhgg}}
          </div>
        </div>
        <!-- 商品列表 end -->
      </div>
    </div>
    <!-- 正文内容 end -->
  </w-container>
</template>
<script>
import service from '@/services/product.service';
import Utils from '@/common/Utils';

export default {
  data() {
    return {
      menuList: [],
      menuIndex: 0,
      pageNum: 1,
      pageSize: 10,
      hasNext: true,
      noData: false,
      firstLoading: true,
      selectShelf: {},
      dataList: [],
      shelfDataList: [],
      routePath: Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'productCategory' }), // 获取当前路由
    };
  },
  created() {},
  mounted() {
    this.getShelfData();
  },
  components: {
  },
  methods: {
    toSearch() {
      this.$router.push(`${this.routePath}/search`);
    },
    toDetail(item) {
      if (!item.bm) return;
      this.$router.push(`${this.routePath}/productList?bm=${item.bm}`);
    },
    // 获取货架信息
    async getShelfData() {
      Utils.showLoading();
      const result = await service.getShelfList({ userid: Utils.getUserId(this) });
      Utils.hideLoading();
      if (!result) return;
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
      this.menuIndex = index;
      item.isOpen = !item.isOpen;
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
.menu-list {
  float: left;
  width: 25%;
  height: 100%;
  overflow: auto;
  background: #fff;
  padding-top: .1rem;
  overflow-x: hidden;

  .menu {
    height: .4rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      font-size: .15rem;
      line-height: .22rem;
    }

    &.actived {
      color: #277bc5;

      span {
        border-bottom: .02rem solid $color-blue;
      }
    }
  } // end menu
} // end menu-list

.scroll-view {
  height: 100%;
  overflow: auto;
}

.category-list {
  padding: 0 .1rem;

  .title {
    width: 100%;
    height: .4rem;
    line-height: .4rem;
    background: #fff;
    font-size: .18rem;
    text-align: center;
  }

  .sub-title {
    height: .4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: .15rem;

    span {
      color: $color-grey;
      @include flex-center;
      font-size: .13rem;

      .iconfont {
        margin-left: .05rem;
        display: block;
        transition: all .3s ease;
      }

      &.open {
        .iconfont {
          transform: rotate(180deg);
        }
      }
    }
  }

  .product-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      max-width: 100%;
      height: .4rem;
      background: #fff;
      text-align: center;
      line-height: .4rem;
      font-size: .12rem;
      margin-bottom: .1rem;
      padding: 0 .1rem;
    }
  } // end product-list
} // end category-list
</style>