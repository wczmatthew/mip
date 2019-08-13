<!-- 产品货架页面 -->
<template lang='html'>
  <w-container show-header show-back>
    <!-- 顶部栏 -->
    <w-search class="search" slot="header-mid" disabled show-scan @input-click="toSearch()"></w-search>
    <!-- <div class="header-right" slot="header-right">
      <w-cart-icon color="blue" :current-path="routePath"></w-cart-icon>
    </div> -->
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <div class="product-container">
      <!-- 左侧类目 -->
      <div class="category-list" ref="menuList">
        <div class="right-line">
          <div class="menu-item" :id="'menu' + index" v-for="(item, index) in menuList" :key="'menuItem' + index">
            <div class="menu" @click.stop="toggleMenu(item, index)"
            :class="{'actived': selectMenu.id == item.id, 'open': item.id == openMenu.id }">
              <span>{{ item.name }}</span>
              <i class="iconfont icon-arrow-down"></i>
            </div>
            <div v-show="item.id == openMenu.id" class="sub-list">
              <div class="sub-item" v-for="(subItem, subIndex) in item.childList" :key="'subMenu' + subItem.id + subIndex" :class="{'actived': selectShelf.id == subItem.id}" @click.stop="onChangeShelf(subItem, item)">
                {{ subItem.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 左侧类目 end -->

      <!-- 产品列表 -->
      <div class="product-scroll">
        <w-loading-row v-show="loadingShelf"></w-loading-row>
        <no-data v-if="!dataList || !dataList.length"></no-data>
        <div class="shelf-container" v-for="(item, index) in dataList" :key="'shelf' + index">
          <p class="title">
            {{ item.name }}
          </p>
          <div class="product-list">
            <div class="product-item" v-show="!item.childList || !item.childList.length">
              <no-data desc="补货中"></no-data>
            </div>
            <div class="product-item" v-for="(product, index) in item.childList" :key="'pro' + product.id + index" @click.stop="toDetail(product)">
              <div class="img">
                <w-img :src="product.imgPath"></w-img>
              </div>
              <p>{{product.xhgg || '标题缺失, 请联系管理员'}}</p>
            </div>
          </div>
        </div>
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
      openMenu: {},
      selectMenu: {},
      loadingShelf: false,
      routePath: Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'guideCategory' }), // 获取当前路由
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
      this.$router.push(`${this.routePath}/search`);
    },
    toDetail(item) {
      if (!item.bm) return;
      this.$router.push(`${this.routePath}/productDetail?bm=${item.bm}`);
    },
    toggleMenu(item) {
      // item.isOpen = !item.isOpen;
      if (item.id === this.openMenu.id) {
        this.openMenu = {};
      } else {
        this.openMenu = { ...item };
      }
      // this.$set(this.menuList, index, item);
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
        // this.menuList[index].isOpen = true;
        this.openMenu = { ...this.menuList[index] };
        if (this.menuList[index].childList.length) {
          this.selectShelf = this.menuList[index].childList[0];
          this.selectMenu = this.menuList[index];
          this.firstLoading = true;
          this.getProductData();
        }

        // 菜单栏滚动到对应位置
        // this.$nextTick(() => {
        //   document.getElementById(`menu${index}`).scrollIntoView();
        // });
        return;
      }

      // 默认选中第一个
      // this.menuList[0].isOpen = true;
      this.openMenu = { ...this.menuList[0] };
      if (this.menuList[0].childList.length) {
        this.selectShelf = this.menuList[0].childList[0];
        this.selectMenu = this.menuList[0];
        this.loadingShelf = true;
        this.getProductData();
      }
    },
    // 获取产品列表
    onChangeShelf(item, menuItem) {
      this.selectShelf = { ...item };
      this.loadingShelf = true;
      this.selectMenu = { ...menuItem };
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
@import '~@/styles/components/productMenu.scss';
.search {
  padding-left: .44rem;
  padding-right: .44rem;
}

</style>
<style lang="scss">
</style>