<!-- 分类 -->
<template lang='html'>
  <w-container show-header show-back>
    <!-- 顶部栏 -->
    <!-- 顶部栏 -->
    <w-search class="search" slot="header-mid" show-scan></w-search>
    <div class="header-right" slot="header-right">
      <w-msg-icon color="blue"></w-msg-icon>
      <i class="iconfont icon-cart"></i>
    </div>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <div class="menu-list">
      <div class="menu-item" v-for="(item, index) in menuList" :key="index">
        <div class="menu" @click.stop="toggleMenu(item, index)"
        :class="{'actived': item.isOpen}">
          <span>{{ item.title }}</span>
          <i class="iconfont icon-arrow-down"></i>
        </div>
        <div v-show="item.isOpen" class="sub-list">
          <div class="sub-item" v-for="(subItem, subIndex) in item.list" :key="index + subIndex">
            {{ subItem.title }}
          </div>
        </div>
      </div>
    </div>
    <w-scroll
      ref="scroll"
      class="scroll-view"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp">

      <no-data v-if="noData"></no-data>

      <div class="row">

        <div class="product-list">
          <div class="item">
            <w-img src="https://newsdc.chint.com:8442/sdc-image/LNR/NXBLE-63.jpg"></w-img>
          </div>
          <div class="item">
            <w-img src="https://newsdc.chint.com:8442/sdc-image/LNR/NXBLE-63.jpg"></w-img>
          </div>
          <div class="item">
            <w-img src="https://newsdc.chint.com:8442/sdc-image/LNR/NXBLE-63.jpg"></w-img>
          </div>
        </div>

        <div class="row-bottom">
          <img src="~@/assets/common/shelf-top.png" alt="" class="top">
          <div class="mid">
            <div class="col">
              正泰电器DZ471P-63A
            </div>
            <div class="col">
              正泰电器DZ471P-63A
            </div>
            <div class="col">
              正泰电器DZ471P-63A
            </div>
          </div>
        </div>
      </div>

    </w-scroll>
    <!-- 正文内容 end -->
  </w-container>
</template>
<script>
import WSearch from '@/components/WSearch.vue';

export default {
  data() {
    return {
      menuList: [],
      pageNum: 1,
      pageSize: 10,
      hasNext: true,
      noData: false,
    };
  },
  created() {},
  mounted() {
    for (let i = 0; i < 5; i++) {
      const item = {
        title: `${i + 1}区`,
        list: [],
        isOpen: false,
      };

      for (let j = 0; j < 5; j++) {
        item.list.push({
          title: `${i + 1}区-0${j + 1}`,
        });
      }
      this.menuList.push(item);
    }
  },
  components: {
    WSearch,
  },
  methods: {
    toggleMenu(item) {
      item.isOpen = !item.isOpen;
    },
    // 下拉刷新
    onPullingDown() {
      this.pageNum = 1;
      // this.getData();
    },
    // 上拉加载
    onPullingUp() {
      // if (!this.hasNext) {
      //   // 没有数据
      //   this.$refs.scroll.forceUpdate(true);
      //   return;
      // }
      // this.getData();
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
  width: 25%;
  height: 100%;
  overflow: auto;
  background: $color-blue;
  color: #fff;
  padding-top: .1rem;
  overflow-x: hidden;

  .menu {
    height: .4rem;
    line-height: .4rem;
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
    height: 270px;
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
      height: .35rem;
      background: $color-blue;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .col {
        width: 30%;
        height: .25rem;
        line-height: .25rem;
        color: #fff;
        font-size: .1rem;
        text-align: center;
        box-shadow: inset 0 -0.02rem 0.01rem #80add6;
        border-top: .01rem solid #00182f;
        border-radius: .05rem;
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
      height: .9rem;
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
</style>