<!--  -->
<template lang='html'>
  <!-- 正文内容 -->
  <div class="cart-container">
    <!-- 购物车信息 -->
    <div class="product-list">
      <w-scroll
        ref="scroll"
        class="scroll-view"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp">

        <no-data v-if="noData"></no-data>
        <div class="cart-item w-underline" v-for="(item, index) in productList" :key="index">
          <div class="radio" @click="onToggleChecked(item, index)">
            <i class="iconfont" :class="[allChecked || item.checked ? 'icon-radio-checked': 'icon-radio']"></i>
          </div>
          <div class="detail">
            <p class="title">
              {{item.spec || '暂无'}}
            </p>
            <p class="price">
              ￥{{item.price || '--'}}
            </p>
          </div>
          <div class="right">
            <div class="nums">
              <i class="iconfont icon-circle-reduce" @click.stop="onReduce(item)"></i>
              <input type="number" v-model="item.qty" @blur="onChangeNum(item)">
              <i class="iconfont icon-circle-add" @click.stop="onAdd(item)"></i>
            </div>
          </div>
        </div>

      </w-scroll>

      <div class="bottom">
        <div class="w-underline height-1"></div>

        <div class="row">
          <div class="radio" @click="onToggleAllChecked()">
            <i class="iconfont" :class="[allChecked ? 'icon-radio-checked': 'icon-radio']"></i>
            <p>全选</p>
          </div>

          <div class="right">
            <p class="bold">合计: {{totalPrice.toFixed(2)}}</p>
            <p class="red small">
              优惠: {{discountPrice.toFixed(2)}}
            </p>
            <p class="red bold">实付: {{(totalPrice - discountPrice).toFixed(2)}}</p>
          </div>
        </div>

        <button type="button" class="blue-btn" v-show="!isEdit" @click="onPay()">
          结账({{selectNum}})
        </button>
        <button type="button" class="red-btn" v-show="isEdit" @click="onDelete()">
          删除
        </button>
      </div>
    </div>
    <!-- 购物车信息 -->

    <!-- 付款信息 -->
    <div class="customer-container">
      <!-- 客户信息 -->
      <div class="customre-item w-underline" @click.stop="onChangeCustomer()">
        <i class="iconfont icon-kehu"></i>
        <div class="detail" v-if="!customer || !customer.id">
          请先选择客户
        </div>
        <div class="detail" v-else>
          <p class="title">
            {{customer.name}}&nbsp;&nbsp;
            <span>{{customer.phone}}</span>
          </p>
          <div class="location">
            <i class="iconfont icon-location"></i>
            {{customer.address}}
          </div>
        </div>
        <i class="iconfont icon-arrow-right"></i>
      </div>
      <!-- 客户信息 end -->

      <!-- 其他信息 -->
      <div class="pay-msg">
        <div class="title">
          支付方式:
        </div>
        <div class="radios">
          <div class="item" @click="payWay = 1">
            <i class="iconfont" :class="[payWay == 1 ? 'icon-radio2-checked' : 'icon-radio']"></i>
            在线支付
          </div>
          <div class="item" @click="payWay = 2">
            <i class="iconfont" :class="[payWay == 2 ? 'icon-radio2-checked' : 'icon-radio']"></i>
            现金刷卡
          </div>
        </div>
      </div>
      <div class="pay-msg">
        <div class="title">
          配送方式:
        </div>
        <div class="radios">
          <div class="item" @click="sendType = 1">
            <i class="iconfont" :class="[sendType == 1 ? 'icon-radio2-checked' : 'icon-radio']"></i>
            送货上门
          </div>
          <div class="item" @click="sendType = 2">
            <i class="iconfont" :class="[sendType == 2 ? 'icon-radio2-checked' : 'icon-radio']"></i>
            门店自提
          </div>
        </div>
      </div>
      <div class="pay-msg">
        <div class="title">
          相关文件:
        </div>
        <div class="radios">
          <div class="item" @click="fileMsg = 1">
            <i class="iconfont" :class="[fileMsg == 1 ? 'icon-radio2-checked' : 'icon-radio']"></i>
            资质证书
          </div>
          <div class="item" @click="fileMsg = 2">
            <i class="iconfont" :class="[fileMsg == 2 ? 'icon-radio2-checked' : 'icon-radio']"></i>
            发票
          </div>
          <div class="item" @click="fileMsg = 3">
            <i class="iconfont" :class="[fileMsg == 3 ? 'icon-radio2-checked' : 'icon-radio']"></i>
            出库单
          </div>
        </div>
      </div>

      <div class="pay-msg">
        <div class="title">
          备<i class="opacity-0">占位</i>注:
        </div>
        <cube-textarea placeholder="请输入..." v-model="tips" :indicator="true" :maxlength="200" class="textarea"></cube-textarea>
      </div>
      <!-- 其他信息 end -->

    </div>
    <!-- 付款信息 end -->

    <!-- 弹窗内容 -->
    <w-modal ref="onlinePayModal">
      <div class="online-pay">
        <p class="price">
          ￥1523
        </p>
        <div class="code-list">
          <div class="code-img">
            <img src="~@/assets/common/code.png" alt="">
          </div>
          <div class="code-img">
            <img src="~@/assets/common/code.png" alt="">
          </div>
        </div>
      </div>
    </w-modal>

    <w-modal ref="offlinePayModal">
      实付金额为<span class="price">￥1250</span>, 请前往柜台完成付款
    </w-modal>

    <w-modal ref="resultModal">
      <div class="pay-success">
        <div class="icon">
          <img src="~@/assets/common/order-success.png" alt="">
        </div>
        <div class="detail">
          <p class="title">
            订单支付成功！
          </p>
          <div class="desc">
            <span class="sub-title">订单号：</span>
            <span class="black">1234567890876654</span>
          </div>
          <div class="desc">
            <span class="sub-title">已付款：</span>
            <span class="price">￥300.00</span>
          </div>
        </div>
      </div>
    </w-modal>
    <!-- 弹窗内容 end -->
  </div>
  <!-- 正文内容 end -->
</template>
<script>
import Utils from '@/common/Utils';
import service from '@/services/order.service';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      totalNum: 0,
      pageNum: 1,
      pageSize: 5,
      productList: [],
      noData: true,
      hasNext: true,
      allChecked: false,
      isEdit: false,
      selectNum: 0,
      totalPrice: 0,
      discountPrice: 0,
      tips: '',
      payWay: -1, // 支付方式
      sendType: -1, // 配送方式
      fileMsg: -1, // 相关文件
      routePath: Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'cart' }),
    };
  },
  created() {},
  mounted() {
    // 清空选中的客户信息
    this.$store.commit('customer/resetSelectCustomer');
    this.onPullingDown();
  },
  watch: {
    '$route'(to) {
      if (to.path === this.currentPath) {
        // 重新进入购物车页面
        this.hasNext = true;
      }
    },
  },
  computed: {
    ...mapGetters('customer', {
      customer: 'selectCustomer',
    }),
  },
  components: {},
  methods: {
    onEdit(isEdit) {
      this.isEdit = isEdit;
    },
    // 全选或者取消全选
    onToggleAllChecked() {
      this.allChecked = !this.allChecked;
      this.productList = this.productList.map((item) => {
        item.checked = this.allChecked;
        return item;
      });

      this.selectNum = this.allChecked ? this.productList.length : 0;

      if (!this.allChecked) {
        this.totalPrice = 0;
        return;
      }
      // 计算选择产品的金额
      this.calcPrice();
    },
    // 选择或者取消选择产品
    onToggleChecked(item, index) {
      item.checked = !item.checked;

      this.$set(this.productList, index, item);

      if (!item.checked && this.allChecked) {
        this.allChecked = false;
      }

      if (item.checked) {
        // 判断是否全部都已经选择
        const list = this.productList.filter(product => !product.checked);
        this.allChecked = !!(!list || !list.length);
      }

      // 判断选择的数量
      const list = this.productList.filter(product => product.checked);
      this.selectNum = list && list.length ? list.length : 0;

      this.calcPrice();
    },
    // 计算总金额
    calcPrice() {
      let total = 0;
      this.productList.forEach((item) => {
        if (item.checked) {
          total += parseFloat(item.price);
        }
      });
      this.totalPrice = total;
    },
    // 下拉刷新
    onPullingDown() {
      this.pageNum = 1;
      this.getData();
    },
    // 上拉加载
    onPullingUp() {
      if (!this.hasNext) {
        // 没有数据
        this.$refs.scroll.forceUpdate(true);
        return;
      }
      this.getData();
    },
    // 获取购物车数据
    async getData() {
      console.log(Utils.getUserId(this));
      const result = await service.getCartList({ userid: Utils.getUserId(this), pageNum: this.pageNum, pageSize: this.pageSize });
      if (!result) return;

      // 判断是否选中
      if (this.allChecked) {
        result.rows = result.rows.map((item) => {
          item.checked = true;
          return item;
        });
      }
      if (this.pageNum === 1) {
        this.productList = [...result.rows];
      } else {
        this.productList = this.productList.concat([...result.rows]);
      }

      // 设置选中数量
      if (this.allChecked) {
        this.selectNum = this.productList.length;
        this.calcPrice();
      }

      this.totalNum = result.total;
      this.$emit('getTotal', this.totalNum);

      this.$refs.productList && this.$refs.productList.updateList(this.productList);
      this.noData = !this.productList.length;
      this.hasNext = this.productList.length < result.total;
      if (this.hasNext) {
        this.pageNum += 1;
      }
      this.$refs.scroll.forceUpdate(true);
    },
    // 数量减少1
    async onReduce(item) {
      if (parseInt(item.qty, 10) === 1) return;
      if (item.loading) {
        Utils.showToast('正在调整数量, 请不要重复操作');
        return;
      }
      item.loading = true;
      const num = item.qty;
      const result = await service.editCartNum({ userid: Utils.getUserId(this), bm: item.BM, qty: num - 1 });
      item.loading = false;
      if (!result) return;
      item.qty = num - 1;
    },
    // 数量增加1
    async onAdd(item) {
      if (item.loading) {
        Utils.showToast('正在调整数量, 请不要重复操作');
        return;
      }
      item.loading = true;
      const num = item.qty;
      const result = await service.editCartNum({ userid: Utils.getUserId(this), bm: item.prodId, qty: num + 1 });
      item.loading = false;
      if (!result) return;
      item.qty = num + 1;
    },
    // 从购物车中删除
    async onDelete() {
      const delList = this.productList.filter(item => item.checked);
      if (!delList || !delList.length) {
        Utils.showToast('请先选择需要删除的产品');
        return;
      }
      if (this.loading) return;
      this.loading = true;
      // 获取需要删除的产品id
      const bm = [];
      delList.forEach((item) => {
        bm.push(item.prodId);
      });
      Utils.showLoading();
      const result = await service.deleteShopCar({ userid: Utils.getUserId(this), bm: bm.toString() });
      this.loading = false;
      Utils.hideLoading();
      if (!result) return;
      this.productList = this.productList.filter(item => !item.checked);
      // this.productList.splice(index, 1);
      Utils.showToast('删除成功');
      // 计算选择产品的金额
      this.calcPrice();
    },
    // 付款
    onPay() {
      const list = this.productList.filter(item => item.checked);
      if (!list || !list.length) {
        Utils.showToast('请先选择结算的产品');
        return;
      }

      if (!this.customer || !this.customer.id) {
        Utils.showToast('请先选择客户');
        return;
      }

      if (this.payWay === -1) {
        Utils.showToast('请先选择付款方式');
        return;
      }

      if (this.sendType === -1) {
        Utils.showToast('请先选择配送方式');
        return;
      }

      if (this.fileMsg === -1) {
        Utils.showToast('请先选择资质文件类型');
        return;
      }
      console.log('start pay');

      if (this.payWay === 1) {
        // 在线支付
        this.$refs.onlinePayModal.show({
          title: '扫描二维码进行付款',
          confirmTxt: '完成付款',
          cancleTxt: '取消付款',
          callback: (res) => {
            if (res !== 'confirm') return;
            // 点击完成付款, 生成订单信息
            this.updateOrder();
          },
        });
        return;
      }

      // 柜台付款
      this.$refs.offlinePayModal.show({
        title: '柜台支付',
        content: '',
        confirmTxt: '完成付款',
        cancleTxt: '取消付款',
        callback: (res) => {
          if (res !== 'confirm') return;
          // 点击完成付款, 生成订单信息
          this.updateOrder();
        },
      });
    },
    // 生成订单
    updateOrder() {
      this.$refs.resultModal.show({
        showBtns: false,
        callback: () => {
          // 将已经付款的产品移除购物车中
          this.productList = this.productList.filter(item => !item.checked);
        },
      });
    },
    // 切换用户
    onChangeCustomer() {
      // 切换用户
      if (!this.currentPath) {
        this.$router.push(`${this.routePath}/customers`);
        return;
      }

      this.$router.push(`${this.currentPath}/customers`);
    },
  },
  props: {
    currentPath: { // 当前路由, 作为组件时需要传
      type: String,
      default: '',
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variable.scss';
@import '~@/styles/components/button.scss';
.color-blue {
  color: $color-blue;
}

.cart-container {
  padding-top: .1rem;
  padding-left: .12rem;
  padding-right: .12rem;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.price {
  font-size: .12rem;
  color: $color-red;
  @include text-ellipsis;
}

.product-list {
  background: #fff;
  height: 100%;
  border-top-right-radius: .05rem;
  border-top-left-radius: .05rem;
  width: 40%;
  display: flex;
  flex-direction: column;

  .scroll-view {
    flex: 1;
  }

  .radio {
    width: .4rem;
    flex-shrink: 0;
    font-size: .2rem;
    display: flex;
    align-items: center;
    justify-content: center;

    .iconfont {
      color: $color-blue;
    }
  }

  .cart-item {
    width: 95%;
    margin: 0 auto;
    display: flex;

    .detail {
      flex: 1;
      overflow: hidden;
      padding: .1rem 0;

      .title {
        color: $color-black;
        @include text-overflow-muli(2);
        margin-bottom: .05rem;
        font-size: .12rem;
        font-weight: 700;
      }
    }

    .right {
      flex-shrink: 0;
      width: 35%;
      display: flex;
      align-items: center;
    }

    .nums {
      width: 100%;
      height: .2rem;
      border: 1px solid $color-line;
      display: flex;
      overflow: hidden;
      border-radius: .2rem;

      .iconfont {
        color: $color-blue;
        flex-shrink: 0;
        width: .2rem;
        font-size: .2rem;
      }

      input {
        flex: 1;
        display: block;
        overflow: hidden;
        text-align: center;
      }
    }
  } // end cart-item

  .bottom {
    width: 95%;
    margin: 0 auto;
    height: 30%;
    flex-shrink: 0;

    .row {
      display: flex;

      .radio {
        height: .4rem;
        flex-direction: column;

        p {
          font-size: .1rem;
          margin-top: .02rem;
          color: $color-grey;
        }
      }

      .right {
        flex: 1;
        padding-left: .1rem;
        text-align: right;
        font-size: .12rem;
        padding-top: .1rem;

        p {
          @include text-ellipsis;
          margin-bottom: .05rem;
        }

        .bold {
          font-weight: 700;
        }

        .small {
          font-size: .1rem;
        }

        .red {
          color: $color-red;
        }
      }

    } // end row

    .blue-btn,
    .red-btn {
      height: .25rem;
      border-radius: .25rem;
      font-size: .14rem;
      width: 55%;
      margin-top: .05rem;
    }
  }
}

.customer-container {
  background: #fff;
  width: 57%;
  height: 100%;
  border-top-right-radius: .05rem;
  border-top-left-radius: .05rem;
  padding-top: .08rem;
  padding-left: .1rem;
  padding-right: .1rem;

  .customre-item {
    display: flex;
    align-items: center;
    padding: 0 .12rem;
    margin-bottom: .1rem;

    .icon-kehu {
      color: $color-blue;
      font-size: .2rem;
    }

    .detail {
      flex: 1;
      overflow: hidden;
      padding: .1rem;

      .title {
        margin-bottom: .05rem;
        span {
          color: $color-grey;
          font-size: .13rem;
        }
      }

      .location {
        @include break-word;
        line-height: .16rem;
      }
    }

    .icon-arrow-right {
      color: $color-grey;
    }
  } // end customer-item

  .pay-msg {
    display: flex;
    color: $color-grey-6;
    font-size: .12rem;

    .title {
      width: .6rem;
      height: .32rem;
      line-height: .32rem;
      flex-shrink: 0;
    }

    .radios {
      display: flex;

      .item {
        padding-right: .08rem;
        padding-left: .02rem;
        height: .32rem;
        display: flex;
        align-items: center;

        &:active {
          opacity: .8;
          background: $color-bg;
        }

        .iconfont {
          margin-right: .06rem;
          color: $color-blue;
        }
      }
    }

    .textarea {
      flex: 1;
      height: .8rem;
      resize: none;
      border: 1px solid $color-line;
      font-size: .12rem;
      border-radius: .05rem;
      margin-top: .05rem;
      overflow: hidden;
    }
  } // end pay-msg
}

.pay-success {
  display: flex;
  align-items: center;
  margin-top: .2rem;
  padding-left: 6%;
  text-align: left;

  .icon {
    width: 30%;
    margin-right: .1rem;
    flex-shrink: 0;

    img {
      width: 100%;
    }
  }

  .detail {
    overflow: hidden;
    flex: 1;

    .title {
      font-size: .16rem;
      color: $color-blue;
      margin-bottom: .1rem;
      font-weight: 700;
    }

    .desc {
      color: $color-grey;
      margin-bottom: .1rem;
      display: flex;

      .sub-title {
        font-size: .13rem;
        flex-shrink: 0;
        min-width: .6rem;
      }

      .black {
        color: $color-black;
      }

      .price {
        font-size: .14rem;
      }
    }
  }
} // end pay-success

.online-pay {
  margin-top: -.1rem;
  .price {
    font-size: .16rem;
    text-align: center;
    margin-bottom: .15rem;
    font-weight: 700;
  }

  .code-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80%;
    margin: 0 auto;

    .code-img {
      width: 45%;
      border-radius: .05rem;
      overflow: hidden;

      img {
        display: block;
        width: 100%;
      }
    }
  }
} // end online-pay
</style>