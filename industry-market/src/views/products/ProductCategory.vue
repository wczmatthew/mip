<!-- 产品类目页面 -->
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
        <div class="item" v-for="(item, index) in menuList" :key="index" @click="onChangeMainMenu(item, index)"
        :class="{'actived': menuIndex == index}">
          <span>
            {{item.sname}}
          </span>
        </div>
      </div>
      <!-- 左侧类目 end -->

      <!-- 产品列表 -->
      <cube-scroll-nav
        class="product-scroll"
        ref="scroll"
        :side="true"
        :data="subMenuList"
        :current="current"
        @change="changeHandler"
        @sticky-change="stickyChangeHandler">
        <!-- <ul class="category-list" slot="prepend">
          <li class="item" v-for="(item, index) in subMenuList" :key="index">
            {{item.title}}
          </li>
        </ul> -->
        <cube-scroll-nav-panel
          v-for="(item, index) in subMenuList"
          :key="item.sname + index"
          :label="item.sname + index"
          :title="item.sname">
          <div class="product-list">
            <div class="product-item" v-for="product in dataList" :key="product.XHGG">
              <div class="img">
                <w-img :src="product.imgPath"></w-img>
              </div>
              <p>{{product.XHGG}}</p>
              <!-- <img :src="food.icon">
              <p>{{food.name}}</p> -->
            </div>
          </div>
        </cube-scroll-nav-panel>
      </cube-scroll-nav>
      <!-- 产品列表 end -->
    </div>
    <!-- 正文内容 end -->
  </w-container>
</template>
<script>
import WSearch from '@/components/WSearch.vue';
import { mapGetters } from 'vuex';
import service from '@/services/product.service';

export default {
  data() {
    return {
      menuList: [
        { title: '综合电器' },
        { title: '配电电器' },
        { title: '控制电器' },
        { title: '驱动电器' },
        { title: '继电器' },
        { title: '开关电器' },
        { title: '电源电器' },
        { title: '焊接设备' },
      ],
      menuIndex: 0,
      subMenuList: [],
      dataList: [],
      current: '综合电器',
      bnr: '',
    };
  },
  created() {},
  mounted() {
    // 深层数据进行深拷贝
    try {
      const json = JSON.stringify(this.sortList);
      this.menuList = JSON.parse(json);
    } catch (error) {
      // console.log(error);
    }
    this.onChangeMainMenu({}, 0);
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
    // 修改主菜单
    onChangeMainMenu(item, index) {
      this.menuIndex = index;
      console.log(item);
      this.subMenuList = this.menuList[index].childList;
      this.getData();

      // this.subMenuList = [
      //   { title: '继电器' },
      //   { title: '断路器' },
      //   { title: '接触器' },
      //   { title: '整流器' },
      // ];
      // this.dataList = [
      //   { title: '继电器', list: ['继电器1111', '继电器2222'] },
      //   { title: '断路器', list: ['断路器1111', '断路器2222'] },
      //   { title: '接触器', list: ['接触器1111', '接触器2222'] },
      //   { title: '整流器', list: ['整流器1111', '整流器2222'] },
      // ];
      this.$nextTick(() => {
        this.$refs.scroll.refresh();
      });
    },
    async getData() {
      // Utils.showLoading();
      const result = await service.getProductList({ pageNum: 1, pageSize: 12, bnr: this.bnr });
      this.isFirstLoading = false;
      if (!result) {
        this.noProduct = !this.dataList.length;
        return;
      }

      this.dataList = result.rows || [];

      this.$nextTick(() => {
        // this.$refs.scroll.forceUpdate(true);
        this.$refs.scroll.refresh();
      });

      // this.$nextTick(() => {
      //   // 重新计算高度
      //   if (this.$refs.sticky) {
      //     this.$refs.sticky.refresh();
      //   }
      // });
    },
    changeHandler(label) {
      console.log('changed to:', label);
    },
    stickyChangeHandler(current) {
      console.log('sticky-change', current);
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
  background: #fff;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;

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
  } // end category-list

  .product-scroll {
    flex: 1;
  }

  .product-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding-left: .1rem;
    padding-top: .05rem;

    .product-item {
      width: .63rem;
      padding: .05rem;
      margin-right: .06rem;
      margin-bottom: .06rem;
      background: $color-bg;
      border-radius: .02rem;
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
        margin-top: .05rem;
        @include break-word;
      }
    }
  } // end product-list
} // end product-container

</style>
<style lang="scss">
.product-container {
  .cube-scroll-content {
    min-height: 100%;
  }
  // .cube-scroll-content,
  // .cube-scroll-list-wrapper {
  //   height: 100%;
  // }

  .cube-scroll-nav-panel-title {
    height: .3rem;
    line-height: .3rem;
    text-align: center;
    background: #fff;
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