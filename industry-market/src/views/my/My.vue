<!-- 我的 -->
<template lang='html'>
  <div class="my">
    <!-- 顶部栏 -->
    <w-header class="w-header header">
      <div slot="header-mid">
        个人中心
      </div>
      <div class="header-right" slot="header-right">
        <w-msg-icon></w-msg-icon>
      </div>
    </w-header>
    <!-- 顶部栏 end -->

    <!-- 个人信息 -->
    <div class="my-msg">
      <div class="bg"></div>
      <div class="my-card">
        <div class="msg">
          <img src="~@/assets/common/user-logo.png" alt="" class="logo">
          <div class="detail">
            <p class="title">
              绍兴工业超市导购
            </p>
            <p class="desc">
              上次登录时间: 3小时前
            </p>
          </div>
        </div>
        <div class="grid-list">
          <div class="item">
            <i class="iconfont icon-notcollect">
              <i class="num">99</i>
            </i>
            <p class="tip">我的收藏</p>
          </div>
          <div class="item">
            <i class="iconfont icon-shuliang">
              <i class="num">99+</i>
            </i>
            <p class="tip">产品销售数量</p>
          </div>
          <div class="item">
            <i class="iconfont icon-kehu">
              <i class="num">99+</i>
            </i>
            <p class="tip">新增客户</p>
          </div>
          <div class="item">
            <i class="iconfont icon-qian">
              <i class="num">2</i>
            </i>
            <p class="tip">现金收入</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 个人信息 end -->

    <!-- 我的订单 -->
    <div class="card my-order">
      <div class="title-row">
        <div class="title">
          我的订单
        </div>
        <div class="desc">
          查看全部订单
          <!-- <i class="iconfont icon-arrow-right"></i> -->
        </div>
      </div>

      <div class="grid-list">
        <div class="item">
          <i class="iconfont icon-daifukuan">
            <i class="num"></i>
          </i>
          <p class="tip">待付款</p>
        </div>
        <div class="item">
          <i class="iconfont icon-daifahuo">
            <i class="num"></i>
          </i>
          <p class="tip">待发货</p>
        </div>
        <div class="item">
          <i class="iconfont icon-daishouhuo">
            <i class="num"></i>
          </i>
          <p class="tip">待收货</p>
        </div>
        <div class="item">
          <i class="iconfont icon-daipingjia">
            <i class="num"></i>
          </i>
          <p class="tip">待评价</p>
        </div>
        <div class="item">
          <i class="iconfont icon-tuihuo">
            <i class="num"></i>
          </i>
          <p class="tip">售后/退货</p>
        </div>
      </div>
    </div>
    <!-- 我的订单 end -->

    <!-- 管理中心 -->
    <div class="card my-manage">
      <div class="title-row">
        <div class="title">
          管理中心
        </div>
      </div>

      <div class="w-tableview">
        <div class="cell">
          <span class="title">
            <i class="iconfont icon-wenjianguanli"></i>订单管理
          </span>
          <i class="iconfont icon-arrow-right"></i>
        </div>
        <div class="cell">
          <span class="title">
            <i class="iconfont icon-customers"></i>客户管理
          </span>
          <i class="iconfont icon-arrow-right"></i>
        </div>
      </div>
    </div>
    <!-- 管理中心 end -->

  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  created() {},
  mounted() {},
  components: {},
  methods: {},
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variable.scss';

.header {
  background: transparent;
  box-shadow: none;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  color: #fff;

  &::after {
    display: none;
  }
}

.my {
  position: relative;
}

.grid-list {
  display: flex;
  margin-top: .1rem;

  .item {
    flex: 1;
    text-align: center;
    position: relative;
    padding: .1rem 0;

    &:active {
      background: $color-bg;
    }

    &:not(:last-child)::after {
      content: ' ';
      display: block;
      width: 1px;
      height: 70%;
      position: absolute;
      right: 0;
      bottom: 10%;
      background: $color-line;
      transform: scaleX(.5);
    }

    .iconfont {
      display: inline-block;
      font-size: .2rem;
      color: $color-blue;
      position: relative;

      .num {
        position: absolute;
        top: -.06rem;
        left: 75%;
        background: $color-red;
        color: #fff;
        height: .15rem;
        border-radius: .15rem;
        min-width: .15rem;
        text-align: center;
        line-height: .15rem;
        font-size: .1rem;
        padding: 0 .02rem;
      }
    } // end iconfont

    .tip {
      color: $color-grey;
      font-size: .12rem;
      margin-top: .05rem;
    }
  }
}

.my-msg {
  position: relative;
  .bg {
    @include background-left-gradient($color-gradient1, $color-gradient2);
    height: 1.45rem;
  }

  .my-card {
    width: 70%;
    padding-top: .1rem;
    background: #fff;
    border-radius: .05rem;
    margin: 0 auto;
    box-shadow: 0 .02rem .05rem #ccc;
    position: absolute;
    bottom: -20%;
    left: 15%;
    z-index: 10;

    .msg {
      display: flex;
      align-items: center;

      .logo {
        width: .5rem;
        height: .5rem;
        border-radius: .5rem;
        margin-left: 8%;
      }

      .detail {
        flex: 1;
        padding: 0 .1rem;
        @include text-ellipsis;
        .desc {
          font-size: .12rem;
          color: $color-grey;
          margin-top: .05rem;
        }
      } // end detail
    } // end msg
  } // end my-card
} // my-msg

.card {
  background: #fff;
  border-radius: .05rem;
  width: 95%;
  margin: 0 auto;
  margin-top: .1rem;
  padding: .1rem;

  .title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: .01rem solid $color-line;
    height: .3rem;
    .title {
      font-weight: 700;
    }

    .desc {
      font-size: .12rem;
      color: $color-grey;
      height: .3rem;
      line-height: .3rem;
      font-weight: 700;

      &:active {
        opacity: .6;
      }
    }
  } // end title-row
}

.my-order {
  padding-bottom: 0;
  box-shadow: 0 0 .05rem #ccc;

  .grid-list {
    margin-top: 0;
  }

  .grid-list .item .iconfont {
    font-size: .25rem;
  }

  .grid-list .item .iconfont .num {
    width: .1rem;
    min-width: .1rem;
    height: .1rem;
    top: 0;
  }

  .grid-list .item:after {
    display: none;
  }

  .grid-list .item .tip {
    color: $color-black;
  }
} // end my-order

.my-manage {

  .w-tableview .cell .title {
    display: flex;
    align-items: center;
  }
  .w-tableview .cell .title .iconfont {
    font-size: .2rem;
    color: $color-grey;
    margin-right: .1rem;
  }
}
</style>