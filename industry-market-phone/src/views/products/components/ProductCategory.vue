<!-- 产品分类 -->
<template lang='html'>
  <div class="product-container">
    <!-- 左侧类目 -->
    <div class="category-list" v-if="menuList && menuList.length">
      <div class="right-line">
        <div class="menu-item" v-for="(item, index) in menuList" :key="index">
          <div class="menu" @click.stop="onChangeShelf(item, index)" :class="{'actived': selectMenu.sid == item.sid}">
            <span>{{ item.bname }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 左侧类目 end -->

    <!-- 产品列表 -->
    <div class="product-scroll">
      <w-loading-row v-show="loadingShelf"></w-loading-row>
      <no-data v-if="!dataList || !dataList.length"></no-data>
      <div
        v-for="(item, index) in dataList"
        :key="item.sid + index"
        :label="item.sid + index"
        :title="item.bname">
        <p class="title">
          {{ item.bname }}
        </p>
        <div class="product-list">
          <div class="product-item" v-for="(product, index) in item.childList" :key="product.sid + index" @click.stop="toSelect(product)">
            <div class="img">
              <w-img :src="product.imgPath"></w-img>
            </div>
            <p>{{product.bname || '标题缺失, 请联系管理员'}}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 产品列表 end -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      menuList: [],
      menuIndex: 0,
      dataList: [],
      selectMenu: {},
      loadingShelf: false,
      current: '',
    };
  },
  created() {},
  mounted() {},
  components: {},
  methods: {
    updateData(data) {
      this.menuList = [...data];

      if (!this.menuList.length) return;

      // 默认选中第一个
      if (this.menuIndex > 0) return;
      this.menuList[0].isOpen = true;
      this.selectMenu = this.menuList[0];
      this.onChangeShelf(this.selectMenu, 0);
    },
    // 获取产品列表
    onChangeShelf(item, index) {
      this.loadingShelf = true;
      this.selectMenu = { ...item };
      this.menuIndex = index;
      this.dataList = [...item.childList];
      setTimeout(() => {
        this.loadingShelf = false;
      }, 100);
    },
    toSelect(item) {
      this.$router.push(`${this.currentPath}/${this.nextPath}?seriesId=${item.sid}`);
    },
  },
  props: {
    currentPath: {
      type: String,
      default: '',
    },
    nextPath: {
      type: String,
      default: 'productSelect',
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/components/button.scss';
@import '~@/styles/components/productMenu.scss';
.product-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  background: #fff;

  .menu {
    position: relative;
    &.actived {
      color: $color-default;

      &::after {
        content: ' ';
        position: absolute;
        right: 0;
        top: 50%;
        width: .02rem;
        height: .2rem;
        margin-top: -.1rem;
        background: $color-default;
      }
    }

  } // end menu

  .product-list {
    border-bottom: 0;
    box-shadow: none;
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
