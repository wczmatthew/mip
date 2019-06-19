<!-- 分类 -->
<template lang='html'>
  <w-container show-header show-back show-footer>
    <!-- 顶部栏 -->
    <div slot="header-mid">产品选型</div>
    <!-- 顶部栏 end -->

    <!-- 名称 -->
    <div slot="w-header-other">
      <div class="category-detail">
        <p class="title">
          NXA16N04-MD3-AC220/230/240
        </p>
        <div class="bottom">
          <p class="price">
            ￥ 11460.00
          </p>
          <div class="nums">
            数量: <input type="number" v-model="numbers">
          </div>
        </div>
      </div>

      <!-- 导航栏 -->
      <div class="category-nav">
        <div class="nav" @click="tabIndex=0" :class="{'actived': tabIndex == 0}">
          本体
        </div>
        <div class="nav" @click="tabIndex=1" :class="{'actived': tabIndex == 1}">
          附件
        </div>
        <div class="nav" @click="toDetail()">
          产品详情
        </div>

        <div class="right">
          下浮率
          <input type="number">
          %
        </div>
      </div>
      <!-- 导航栏 end -->
    </div>
    <!-- 名称 end -->

    <!-- 主体 -->
    <div class="main-content" key="main" v-if="tabIndex == 0">
      <div class="row">
        <p class="title">
          <i class="iconfont icon-triangle-down"></i>
          壳架电流等级
        </p>
        <div class="list">
          <div class="item">
            16:1600A(04-16)
          </div>
          <div class="item">
            16:1600A(04-16)
          </div>
          <div class="item">
            16:1600A(04-16)
          </div>
        </div>
      </div>
    </div>
    <!-- 主体 -->

    <!-- 附件 -->
    <div class="sub-content" key="sub" v-else>
      附件内容, 暂定
    </div>
    <!-- 附件 end -->

    <!-- 底部栏 -->
    <footer slot="w-footer" class="footer">
      <div class="left">
        <div class="icon" @click="toIndex()">
          <i class="iconfont icon-shouye"></i>
          <p>首页</p>
        </div>
        <div class="icon">
          <i class="iconfont icon-gouwuche">
            <i class="num">10</i>
          </i>
          <p>购物车</p>
        </div>
        <div class="icon" @click="onToggleCollect()" style="min-width: .5rem;">
          <i class="iconfont" :class="[isCollect ? 'icon-collect' :
          'icon-notcollect']"></i>
          <p>
            {{isCollect ? '取消收藏' : '收藏'}}
          </p>
        </div>
      </div>

      <div class="btns">
        <button class="light-blue-btn" @click="onAddCart()">
          加入购物车
        </button>
        <button class="blue-btn">
          立即购买
        </button>
      </div>
    </footer>
    <!-- 底部栏 end -->
  </w-container>
</template>
<script>
// import service from '@/services/product.service';
import Utils from '@/common/Utils';

export default {
  data() {
    return {
      tabIndex: 0,
      isCollect: false,
      numbers: 1,
      hasNext: true,
      noData: false,
      dataList: [],
      routePath: Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'detail' }), // 获取当前路由
    };
  },
  created() {},
  mounted() {
  },
  components: {
  },
  methods: {
    // 查看产品详情
    toDetail() {
      this.$router.push(`${this.routePath}/productDetail?bm=${this.$route.query.bm}`);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/components/button.scss';
.category-detail {
  background: #fff;
  font-size: .15rem;
  @include break-word;
  padding: .1rem .15rem;

  .title {
    margin-bottom: .15rem;
    @include text-overflow-muli(3);
  }

  .bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .price {
      color: $color-red;
      @include text-ellipsis;
    }

    .nums {
      flex-shrink: 0;
      width: 1rem;
      text-align: right;
    }

    input {
      border: 1px solid $color-line;
      width: .5rem;
      height: .2rem;
      text-align: center;
    }
  }
} // end category-detail

.category-nav {
  background: #2fa0ec;
  width: 100%;
  height: .35rem;
  display: flex;

  .nav {
    padding: 0 .15rem;
    height: .35rem;
    line-height: .35rem;
    flex-shrink: 0;
    color: #fff;

    &.actived {
      background: $color-blue;
    }

    &:active {
      opacity: .6;
    }
  }

  .right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: .12rem;
    color: #fff;
    padding-right: .1rem;

    input {
      width: 40%;
      border: 1px solid $color-line;
      margin: 0 .03rem;
      text-align: center;
    }
  }
} // end category-nav

.main-content {
  min-height: 100%;
  .row {
    padding: .1rem .15rem;

    .title {
      font-size: .18rem;
      display: flex;
      align-items: center;
      margin-bottom: .1rem;
      padding-top: .05rem;

      .iconfont {
        transform: rotate(-90deg);
        color: $color-blue;
        margin-right: .05rem;
        font-size: .14rem;
      }
    } // end title

    .list {
      display: flex;
      flex-wrap: wrap;

      .item {
        padding: .05rem .1rem;
        background: #fff;
        border: 1px solid $color-line;
        font-size: .13rem;
        margin-bottom: .05rem;
        margin-right: .1rem;

        &.actived {
          background: $color-blue;
          color: #fff;
        }
      }
    }
  } // end row
} // end main-content

.sub-content {
  min-height: 100%;
  padding: .1rem .15rem;
}

.footer {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-top: 1px solid $color-line;

  .left {
    display: flex;
    height: 100%;
    flex-shrink: 0;
    .icon {
      display: block;
      height: 100%;
      text-align: center;
      color: $color-grey;
      padding: 0 .1rem;
      padding-top: .06rem;

      .iconfont {
        display: block;
        margin-bottom: .02rem;
        font-size: .22rem;
        position: relative;

        .num {
          position: absolute;
          top: -.04rem;
          right: -.05rem;
          background: $color-red;
          color: #fff;
          font-size: .1rem;
          min-width: .15rem;
          height: .15rem;
          line-height: .15rem;
          border-radius: .15rem;
        }
      }

      .icon-collect {
        color: $color-yellow;
      }

      p {
        font-size: .1rem;
        text-align: center;
      }
    }
  }

  .btns {
    flex: 1;
    height: 100%;
    display: flex;
    overflow: hidden;
    button {
      flex: 1;
      border-radius: 0;
      height: 100%;
      font-size: .14rem;
    }
  }
} // end footer
</style>