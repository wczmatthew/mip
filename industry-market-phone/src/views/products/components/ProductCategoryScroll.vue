<!-- 产品分类 -->
<template lang='html'>
  <div class="product-container">
    <!-- 左侧类目 -->
    <div class="category-list" v-if="menuList && menuList.length">
      <div class="right-line">
        <div class="menu-item" v-for="(item, index) in menuList" :key="index">
          <div class="menu" @click.stop="onChangeShelf(index)" :class="{'actived': selectMenu.sid == item.sid}">
            <span>{{ item.bname }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 左侧类目 end -->

    <!-- 产品列表 -->
    <div class="product-scroll productCategoryContainer">
      <w-loading-row v-show="loadingShelf"></w-loading-row>
      <no-data v-if="!dataList || !dataList.length"></no-data>
      <cube-scroll
        ref="productScroll"
        :scroll-events="['scroll']"
        @scroll="onScrollHandle">

        <div
          v-for="(data, i) in dataList"
          :key="'parent' + i"
          :class="'product' + i">

          <!-- 广告 -->
          <div class="banner">
            <w-img :src="banner.advImgPath" v-for="(banner, adIndex) in data.advInfo" :key="'ad'+adIndex" @load.native="updateMenuY()" @click.native="onClickLink(banner)"></w-img>
          </div>
          <!-- 广告 end -->
          <div
            v-for="(item, index) in data.childList"
            :key="item.sid + index"
            :label="item.sid + index"
            :title="item.bname">
            <!-- 广告 -->
            <div class="banner">
              <w-img :src="itemBanner.advImgPath" v-for="(itemBanner, itemBannerIndex) in item.advInfo" :key="'ad'+itemBannerIndex" @load.native="updateMenuY()" @click.native="onClickLink(itemBanner)"></w-img>
            </div>
            <!-- 广告 end -->
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

        <div :style="{'height': emptyHeight + 'px'}" style="width: 100%;"></div>
      </cube-scroll>
    </div>
    <!-- 产品列表 end -->
  </div>
</template>
<script>
import Utils from '@/common/Utils';

export default {
  data() {
    return {
      menuList: [],
      menuIndex: 0,
      dataList: [],
      selectMenu: {},
      loadingShelf: false,
      current: '',
      menuYList: [], // 存放菜单栏对应的产品list的Y值
      emptyHeight: 0,
    };
  },
  created() {},
  mounted() {},
  components: {},
  methods: {
    onClickLink(item) {
      if (!item.url) {
        // Utils.showToast('敬请期待');
        return;
      }
      if (item.url.indexOf('http') > -1) {
        try {
          // eslint-disable-next-line
          // native_listen('goToUrl', { url: item.url });
          Utils.saveLocalStorageItem('beforePath', `${this.routePath}/home`);
          this.$router.push({
            path: `${this.routePath}/frame`,
            query: {
              url: item.url,
              title: item.title || '发现',
            },
          });
        } catch (error) {
          console.log('error: ', error);
        }
        return;
      }

      if (item.url.indexOf('/market') === 0) {
        this.$router.push({
          path: item.url,
          query: { title: item.title },
        });
        return;
      }

      this.$router.push({
        path: `${this.routePath}/${item.url}`,
        query: { title: item.title },
      });
    },
    onScrollHandle(pos) {
      // console.log(pos.y);
      let selectMenuIndex = 0;
      if (pos.y < 0) {
        this.menuYList.forEach((y, index) => {
          if (-pos.y > (y - 5)) {
            selectMenuIndex = index;
          }
        });
      }

      this.selectMenu = this.menuList[selectMenuIndex];
    },
    scrollTop() {
      this.$refs.productScroll.scrollTo(0, 0, 300, 'ease');
    },
    updateData(data) {
      if (!data || !data.length) return;
      // 数据整理
      this.menuList = [];
      this.dataList = [];
      data.forEach((item) => {
        this.menuList.push({
          bname: item.bname,
          sid: item.sid,
          psid: item.psid,
        });

        this.dataList.push({
          advInfo: item.advInfo || [],
          childList: item.childList || [],
        });
      });

      // this.menuList = [...data];

      // if (!this.menuList.length) return;

      // 默认选中第一个
      if (this.menuIndex > 0) return;
      this.scrollTop();
      // this.onChangeShelf(this.selectMenu, 0);

      this.updateMenuY();
    },
    updateMenuY() {
      // 延时300毫秒再去计算高度, 不然会有误差, 暂时还不知道什么原因, 可能是渲染有点延时
      this.$nextTick(() => {
        const container = Utils.getLastElementByClassName('productCategoryContainer');
        if (!container) return;

        this.menuYList = [];
        for (let i = 0; i < this.dataList.length; i++) {
          if (Utils.getLastElementByClassName(`product${i}`, container)) {
            this.menuYList.push(Utils.getLastElementByClassName(`product${i}`, container).offsetTop);
          } else {
            this.menuYList.push(0);
          }
        }

        // 判断最后一个类目是否填充满整屏, 若没有填充满那么最后一个类目无法选中, 需要手动填充到整屏
        if (!Utils.getLastElementByClassName(`product${this.dataList.length - 1}`, container)) return;
        const scrollHeight = container.clientHeight;
        const lastHeight = Utils.getLastElementByClassName(`product${this.dataList.length - 1}`, container).clientHeight;
        if (scrollHeight <= lastHeight) return;
        this.emptyHeight = scrollHeight - lastHeight - 5;
      });
    },
    // 获取产品列表
    onChangeShelf(index) {
      this.$refs.productScroll.scrollTo(0, -this.menuYList[index], 300, 'ease');
    },
    toSelect(item) {
      this.$store.commit('product/updateKeywords', '');
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

  .banner {
    width: 100%;
    padding-top: .06rem;

    img {
      width: 95%;
      margin: 0 auto;
      display: block;
      border-radius: .05rem;
    }
  }
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
