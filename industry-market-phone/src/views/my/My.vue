<!-- 我的 -->
<template lang='html'>
  <div class="my">
    <!-- 右上角图标 -->
    <div class="right-icon1" @click="onLogout()" style="right: .4rem;" v-if="!isWeixin">
      <i class="iconfont icon-logout"></i>
    </div>
    <div class="right-icon1" @click="onSetting()" v-if="!isWeixin">
      <i class="iconfont icon-setting" style="font-weight: 700; font-size: 22px;"></i>
    </div>
    <!-- 右上角图标 end -->
    <!-- 个人信息 -->
    <div class="my-msg">
      <div class="my-card">
        <div class="msg">
          <img src="~@/assets/common/user-logo.png" alt="" class="logo">
          <div class="detail">
            <p class="title">
              {{userData.userName || '--'}}
            </p>
            <p class="desc">
              <!-- 上次登录时间: {{userData.loginTime || '--'}} -->
              {{userData.email}}
            </p>
          </div>
        </div>
        <div class="grid-list">
          <!-- <div class="item">
            <i class="iconfont icon-notcollect">
              <i class="num">99</i>
            </i>
            <p class="tip">我的收藏</p>
          </div> -->
          <div class="item" @click="toCollect()">
            <p class="top-num">
              {{collectCount || 0}}
            </p>
            <p class="tip">
              <!-- <i class="iconfont icon-shuliang"></i> -->
              我的收藏
            </p>
          </div>
          <div class="item">
            <p class="top-num">
              0
            </p>
            <p class="tip">
              <!-- <i class="iconfont icon-shuliang"></i> -->
              最近浏览
            </p>
          </div>
          <div class="item" @click="toAddress()">
            <p class="top-num">
              {{addressCount || 0}}
            </p>
            <p class="tip">
              <!-- <i class="iconfont icon-qian"></i> -->
              收货地址
            </p>
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
        <div class="desc" @click.stop="toOrders()">
          全部订单
          <i class="iconfont icon-arrow-right"></i>
        </div>
      </div>

      <div class="grid-list">
        <div class="item" @click.stop="toOrders(6)">
          <i class="iconfont icon-daifukuan">
            <i class="num" v-if="waitPayCount">{{waitPayCount}}</i>
          </i>
          <p class="tip">待付款</p>
        </div>
        <div class="item" @click.stop="toOrders(1)">
          <i class="iconfont icon-daifahuo">
            <i class="num" v-if="waitGetCount">{{waitGetCount}}</i>
          </i>
          <p class="tip">待发货</p>
        </div>
        <div class="item" @click.stop="toOrders(2)">
          <i class="iconfont icon-daishouhuo">
            <i class="num" v-if="waitPostCount">{{waitPostCount}}</i>
          </i>
          <p class="tip">待收货</p>
        </div>
        <div class="item" @click.stop="toOrders(3)">
          <i class="iconfont icon-daipingjia">
            <!-- <i class="num" v-if="finishCount">{{finishCount}}</i> -->
          </i>
          <p class="tip">已完成</p>
        </div>
        <!-- <div class="item">
          <i class="iconfont icon-tuihuo">
            <i class="num"></i>
          </i>
          <p class="tip">售后/退货</p>
        </div> -->
      </div>
    </div>
    <!-- 我的订单 end -->

    <!-- 其他功能 -->
    <div class="w-tableview">
      <!-- <div class="cell" v-if="role == 1">
        <span class="title">
          出入库记录
        </span>
        <i class="iconfont icon-arrow-right"></i>
      </div> -->
      <div class="cell" v-if="isBind == 0" @click="onBindPhone()">
        <span class="title">
          绑定手机号码
        </span>
        <i class="iconfont icon-arrow-right"></i>
      </div>
    </div>
    <!-- 其他功能 end -->

  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Utils from '@/common/Utils';
import service from '@/services/order.service';
import userService from '@/services/user.service';

export default {
  data() {
    return {
      todayPrice: 0, // 今日收入
      totalPrice: 0, // 总收入
      totalCount: 0, // 今日销售数量
      finishCount: 0, // 订单-已完成数量
      waitGetCount: 0, // 订单-待收货数量
      waitPayCount: 0, // 订单-待付款数量
      waitPostCount: 0, // 订单-待发货数量
      collectCount: 0, // 我的收藏
      addressCount: 0, // 收货地址数量
      userData: {},
      isWeixin: false,
    };
  },
  created() {},
  mounted() {
    Utils.showLoading();
    this.getUserData();
    this.getData();

    this.isWeixin = Utils.checkIsWeixin();
  },
  watch: {
    '$route'(to) {
      if (to.path === '/market' && to.query.tab === 'my') {
        // 进入页面, 重新获取数据
        this.getData();
      }
    },
  },
  computed: {
    ...mapGetters('user', {
      isBind: 'isBind',
      role: 'role',
    }),
  },
  components: {},
  methods: {
    onSetting() {
      // 调用设置界面
      try {
        // eslint-disable-next-line
        native_listen('setting');
      } catch (error) {
        // Utils.showToast('敬请期待');
      }
    },
    // 退出登录
    onLogout() {
      Utils.showConfirm({
        title: '提醒',
        content: '确定退出登录?',
        maskClosable: true,
        onConfirm: () => {
          Utils.removeLocalStorageItem(this.userid, true);
          Utils.removeLocalStorageItem('userId');
          Utils.removeLocalStorageItem('wxopenid', true);
          Utils.removeLocalStorageItem('wxaccessToken', true);
          this.$store.commit('user/updateUserId', '');

          this.$router.push('/login');
        },
      });
    },
    toAddress() {
      this.$router.push('/market/address');
    },
    toCollect() {
      this.$router.push('/market/collections');
    },
    async getUserData() {
      const result = await userService.getUserInfo({ userid: Utils.getUserId(this) });
      if (!result) return;
      this.userData = { ...result };

      if (result.isBind !== undefined) {
        Utils.saveLocalStorageItem('isBind', result.isBind);
        this.$store.commit('user/updateIsBind', result.isBind);
      }
    },
    async getData() {
      const result = await service.getOrderStatisticInfo({ userid: Utils.getUserId(this) });
      Utils.hideLoading();
      if (!result) return;
      // this.todayPrice = (result.todayPrice || 0).toFixed(2);
      // this.totalPrice = (result.totalPrice || 0).toFixed(2);
      // this.totalCount = result.totalCount || 0;
      // this.finishCount = result.finishCount || 0;
      // this.waitGetCount = result.waitGetCount || 0;
      // this.waitPayCount = result.waitPayCount || 0;
      // this.waitPostCount = result.waitPostCount || 0;
      this.collectCount = result.collectCount || 0; // 我的收藏
      this.addressCount = result.addressCount || 0; // 收货地址数量

      // if (this.finishCount > 99) this.finishCount = '99+';
      // if (this.waitGetCount > 99) this.waitGetCount = '99+';
      // if (this.waitPayCount > 99) this.waitPayCount = '99+';
      // if (this.waitPostCount > 99) this.waitPostCount = '99+';
    },
    toOrders(status) {
      if (!status) {
        this.$router.push('/market/order');
        return;
      }
      this.$router.push(`/market/order?status=${status}`);
    },
    toCollection() {
      Utils.showToast('敬请期待');
    },
    onBindPhone() {
      this.$store.commit('user/toggleRegisterModal', true);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/components/button.scss';

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

.right-icon1 {
  position: absolute;
  top: 0;
  right: 0;
  width: .4rem;
  height: .4rem;
  @include flex-center;
  color: #fff;
  .iconfont {
    font-size:  20px;
  }
}

.grid-list {
  display: flex;
  margin-top: .1rem;

  .item {
    flex: 1;
    text-align: center;
    position: relative;
    padding: .1rem 0;

    .top-num {
      text-align: center;
      font-size:  20px;
    }

    .iconfont {
      display: inline-block;
      font-size:  20px;
      color: $color-grey;
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
        font-size: 10px;
        padding: 0 .02rem;
      }
    } // end iconfont

    .tip {
      font-size: 12px;
      margin-top: .05rem;
      display: flex;
      align-items: center;
      justify-content: center;

      .iconfont {
        font-size:  12px;
        margin-right: .05rem;
      }
    }
  }
}

.my-msg {
  border-bottom-left-radius: .2rem;
  border-bottom-right-radius: .2rem;
  padding-bottom: .2rem;
  @include background-left-gradient(#e73b35, #e0252c);

  .my-card {
    width: 100%;
    padding-top: .3rem;
    border-radius: .05rem;
    margin: 0 auto;
    color: #fff;
    .msg {
      display: flex;
      align-items: center;

      .logo {
        width: .5rem;
        height: .5rem;
        border-radius: .5rem;
        margin-left: 8%;
        background: #fff;
      }

      .detail {
        flex: 1;
        padding: 0 .1rem;
        line-height: 1.2;
        @include text-ellipsis;

        .title {
          font-size:  16px;
        }

        .desc {
          font-size:  12px;
          margin-top: .1rem;
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
  padding: 0 .1rem;

  .title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: .01rem solid $color-line;
    height: .4rem;
    line-height: .4rem;
    .title {
      font-weight: 700;
    }

    .desc {
      font-size:  12px;
      color: $color-grey;
      height: 100%;

      &:active {
        opacity: .6;
      }
    }
  } // end title-row
}

.my-order {
  padding-bottom: 0;
  box-shadow: 0 .02rem .05rem #ccc;
  margin-top: -.2rem;
  .grid-list {
    margin-top: 0;
  }

  .grid-list .item .iconfont {
    font-size: .2rem;
    color: $color-grey-6;
  }

  .grid-list .item .iconfont .num {
    min-width: .15rem;
    max-width: .25rem;
    height: .15rem;
    top: -.05rem;
    font-size: 10px;
  }

  .grid-list .item:after {
    display: none;
  }

  .grid-list .item .tip {
    color: $color-grey-6;
    font-size: 10px;

  }
} // end my-order

.my-manage {

  .w-tableview .cell .title {
    display: flex;
    align-items: center;
  }
  .w-tableview .cell .title .iconfont {
    font-size:  20px;
    color: $color-grey;
    margin-right: .1rem;
  }
}

.bottom-btn {
  margin-top: .2rem;
  width: 60%;
  border-radius: .4rem;
}

.w-tableview {
  border-radius: .05rem;
  width: 95%;
  margin: 0 auto;
  margin-top: .15rem;
  box-shadow: 0 0 7px #d4d4d4;
}
</style>