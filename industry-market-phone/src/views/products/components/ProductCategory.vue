<!-- 产品分类 -->
<template lang='html'>
  <div class="product-container">
    <!-- 左侧类目 -->
    <div class="category-list" v-if="menuList && menuList.length">
      <div class="right-line">
        <div class="menu-item" v-for="(item, index) in menuList" :key="index">
          <div class="menu" @click.stop="onChangeShelf(item)" :class="{'actived': selectMenu.sid == item.sid}">
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
          <div class="product" v-for="(product, index) in item.childList" :key="product.sid + index" @click.stop="toSelect(product)">
            <div class="product-item">
              <div class="img">
                <w-img :src="product.imgPath"></w-img>
              </div>
              <p>{{product.bname || '标题缺失, 请联系管理员'}}</p>
            </div>
            <!-- <button class="light-blue-btn" type="button" @click.stop="toSelect(product)" v-if="showSelectBtn">选型</button> -->
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
    toSelect(item) {
      this.$router.push(`${this.currentPath}/productSelect?seriesId=${item.sid}`);
    },
    toDetail(item) {
      this.$store.commit('product/updateKeywords', '');
      this.$router.push(`${this.currentPath}/productList?seriesId=${item.sid}&isSelect=1`);
    },
  },
  props: {
    currentPath: {
      type: String,
      default: '',
    },
    showSelectBtn: { // 是否显示选型按钮
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/components/button.scss';
</style>

<style lang="scss">
@import '~@/styles/variable.scss';

.product-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  background: #fff;

  .category-list {
    min-width: .6rem;
    height: 100%;
    flex-shrink: 0;
    background: #fff;
    padding-top: .05rem;
    overflow: auto;
    position: relative;

    .right-line {
      position: relative;
      min-height: 100%;
    }

    .right-line::after {
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
        color: $color-default;

        &::after {
          content: ' ';
          position: absolute;
          right: 0;
          top: .07rem;
          width: .01rem;
          height: .1rem;
          background: $color-default;
        }
      }
    } // end item

    .menu {
      height: .4rem;
      line-height: .4rem;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: all .3s ease;
      padding: 0 .1rem;

      span {
        font-weight: 700;
        flex: 1;
      }

      .iconfont {
        font-weight: 700;
        margin-left: .05rem;
        transform: rotate(180deg);
        transition: all .3s ease;
      }

      &.actived {
        color: $color-default;
        position: relative;
        &::after {
          content: ' ';
          position: absolute;
          right: 0;
          top: .075rem;
          background: $color-default;
          width: .02rem;
          height: .25rem;
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
        color: $color-default;

        &::after {
          content: ' ';
          position: absolute;
          right: 0;
          top: .07rem;
          width: .01rem;
          height: .1rem;
          background: $color-default;
        }
      }
    } // end sub-item
  } // end category-list

  .product-scroll {
    flex: 1;
    overflow: auto;

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
    // border-bottom: 5px solid #e6e6e6;
    // box-shadow: 0 3px 2px #ccc;

    .product {
      width: .63rem;
      margin-bottom: .08rem;
      margin-right: .06rem;
      display: flex;
      flex-direction: column;
    }

    .product-item {
      width: .63rem;
      padding: .05rem;
      margin-bottom: .06rem;
      background: $color-bg;
      border-radius: .02rem;
      box-shadow: 0 0 .03rem #e6e6e6;
      overflow: hidden;
      flex: 1;

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
          max-height: 100%;
          max-width: 100%;
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

    button {
      width: 70%;
      height: .2rem;
      font-size: 14px;
    }

  } // end product-list
} // end product-container

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
