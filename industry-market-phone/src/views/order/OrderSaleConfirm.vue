<!-- 开单员 确认订单 -->
<template lang='html'>
  <w-container show-header show-back show-footer ref="saleContainer">
    <!-- 顶部栏 -->
    <template #header-mid>
      销售单
    </template>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->

    <!-- 客户信息 -->
    <div class="customre-item w-underline" @click.stop="onChangeCustomer()">
      <i class="iconfont icon-kehu"></i>
      <div class="detail" v-if="!selectCustomer || !selectCustomer.id">
        请先选择客户信息
      </div>
      <div class="detail" v-else>
        <p class="title">
          {{selectCustomer.name}}&nbsp;&nbsp;
          <span>{{selectCustomer.phone}}</span>
        </p>
        <div class="location">
          <i class="iconfont icon-location"></i>
          {{selectCustomer.address}}
        </div>
      </div>
      <i class="iconfont icon-arrow-right"></i>
    </div>
    <!-- 客户信息 end -->
    <!-- 客户信息 -->
    <!-- <div class="customre-item w-underline">
      <p class="customer-title">
        客户信息
      </p>
      <div class="detail">
        <p class="title">
          <input type="text" v-model.trim="customer.name" placeholder="客户名称">
        </p>
        <p class="title">
          <input type="tel" v-model.trim="customer.phone" placeholder="客户联系方式">
        </p>
        <div class="location">
          <input type="text" v-model.trim="customer.address" placeholder="收货地址">
        </div>
      </div>
    </div> -->
    <!-- 客户信息 end -->

    <!-- 产品列表 -->
    <div class="product-img-list" @click.stop="isOpen = !isOpen" :class="{'open': isOpen}">
      <div class="img-list">
        <div class="item" v-for="(product, productIndex) in selectProducts.slice(0, 3)" :key="'img'+productIndex">
          <div class="img">
            <w-img :src="product.imgPath" alt=""/>
          </div>
          <i class="num">{{product.qty || 0}}</i>
        </div>
      </div>

      <div class="right">
        共{{selectProducts.length}}件
        <i class="iconfont icon-arrow-down"></i>
      </div>
    </div>
    <!-- 产品列表 end -->

    <!-- 产品详细列表 -->
    <div class="product-list" v-show="isOpen">
      <div class="product-item" v-for="(product, productIndex) in selectProducts" :key="'openPro'+productIndex">
        <div class="img">
          <w-img :src="product.imgPath" alt=""/>
        </div>
        <div class="detail">
          <div class="row">
            <span>{{product.spec}}</span>
            <!-- <span class="price">
              ￥{{product.normSum}}
            </span> -->
          </div>
          <div class="row">
            <span class="desc">X{{product.qty || 0}}</span>
            <span class="desc price">
              ￥{{product.discountPrice || product.price}}
              <span class="real-price">
                {{ product.price }}
              </span>
              <button type="button" class="gradient-btn" @click.stop="onChangePrice(product, productIndex)">
                改价
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- 产品详细列表 end -->

    <!-- 其他内容 -->
    <div class="w-tableview">
      <div class="cell">
        <span class="title">
          支付方式
        </span>
        <cube-select
          class="select desc"
          placeholder="请选择支付方式"
          v-model="payMode"
          :options="payModeOptions">
        </cube-select>
      </div>

      <div class="cell">
        <span class="title">
          提货方式
        </span>
        <cube-select
          class="select desc"
          placeholder="请选择提货方式"
          v-model="sendType"
          :options="sendTypeOptions">
        </cube-select>
      </div>

      <div class="cell">
        <span class="title">
          商品金额
        </span>
        <span class="desc price">
          <small>￥</small>
          {{(totalPrice).toFixed(2)}}
        </span>
      </div>

      <div class="cell">
        <span class="title">
          优惠金额
        </span>
        <span class="desc price">
          <small>￥</small>
          {{(totalPrice - payPrice).toFixed(2)}}
        </span>
      </div>

      <div class="cell">
        <span class="title">
          抹零金额
        </span>
        <w-input type="number" class="desc" v-model="reducePrice"/>
      </div>

      <div class="cell textarea-cell">
        <span class="title">
          备注
        </span>
        <div class="desc">
          <!-- <textarea placeholder="请输入备注"></textarea> -->
          <cube-textarea placeholder="请输入备注" :maxlength="200" v-model="tips" @blur="onBlur()"></cube-textarea>
          </div>
        </div>
    </div>
    <!-- 其他内容 end -->

    <!-- 正文内容 end -->

    <template #w-footer>
      <div class="cart-bottom">
        <div class="detail">
          <p class="red bold">
            <span>实付: </span>
            <small>￥</small>
            {{(payPrice - reducePrice).toFixed(2)}}
          </p>
        </div>
        <button type="button" class="orange-btn" @click="onPay()">
          结算
        </button>
      </div>
    </template>
  </w-container>
</template>
<script>
import { mapGetters } from 'vuex';
import Utils from '@/common/Utils';
import service from '@/services/order.service';

export default {
  data() {
    return {
      routePath: Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'confirmSaleOrder' }), // 获取当前路由
      totalPrice: 0, // 实际金额
      payPrice: 0, // 付款金额
      payMode: -1,
      reducePrice: 0, // 抹零金额
      payModeOptions: [
        { text: '支付宝支付', value: 11 },
        { text: '微信支付', value: 12 },
        { text: '银联支付', value: 13 },
      ],
      sendType: -1,
      sendTypeOptions: [
        { text: '送货上门', value: 1 },
        { text: '门店自提', value: 2 },
        { text: '物流配送', value: 3 },
      ],
      isOpen: false,
      tips: '',
      isCreated: false, // 是否已经创建订单
      orderDetail: {},
      customer: { // 客户信息
        name: '',
        phone: '',
        address: '',
      },
      windowHeight: 0,
      scrollTop: 0,
    };
  },
  created() {},
  mounted() {
    this.calcPrice();
    // alert(this.windowHeight); CODE_128%2C
    // 添加 resize 绑定事件
    // window.addEventListener('resize', () => {
    //   // alert(document.documentElement.clientHeight);
    //   if (this.windowHeight === document.documentElement.clientHeight) {
    //     // 键盘收起恢复原状
    //     this.$refs.saleContainer.updateContentScrollTop(this.scrollTop);
    //   } else {
    //     this.scrollTop = this.$refs.saleContainer.getContentScrollTop();
    //   }
    // }, false);
  },
  computed: {
    ...mapGetters('customer', {
      selectCustomer: 'selectCustomer',
    }),
    ...mapGetters('order', {
      selectProducts: 'selectProducts',
    }),
    ...mapGetters('user', {
      customerId: 'customerId',
    }),
  },
  components: {
  },
  watch: {},
  methods: {
    onBlur() {
      Utils.resetWindowScrollTop(document.documentElement.clientHeight);
    },
    onChangeCustomer() {
      this.$router.push(`${this.routePath}/selectCustomer`);
    },
    onChangePrice(item, index) {
      Utils.showPrompt({
        title: '调整单价',
        placeholder: (item.discountPrice || item.price).toString(),
        value: '',
        onConfirm: ({ promptValue }) => {
          if (!promptValue) return;
          this.$store.commit('order/updateSelectProductsByIndex', {
            index,
            product: {
              ...item,
              discountPrice: promptValue,
            },
          });

          this.calcPrice();
        },
      });
    },
    // 计算总金额
    calcPrice() {
      let total = 0;
      this.payPrice = 0;
      this.selectProducts.forEach((item) => {
        total += parseFloat(item.price || 0) * parseInt(item.qty || 1, 10);
        this.payPrice += parseFloat(item.discountPrice || 0) * parseInt(item.qty || 1, 10);
      });
      this.totalPrice = total;
    },
    async onPay() {
      if (this.isCreated) {
        this.changeOrderType();
        return;
      }

      if (!this.selectCustomer || !this.selectCustomer.id) {
        Utils.showToast('请先选择客户');
        return;
      }

      // if (!this.customer.name) {
      //   Utils.showToast('请先输入客户名称');
      //   return;
      // }

      // if (!this.customer.phone) {
      //   Utils.showToast('请先输入客户联系方式');
      //   return;
      // }

      // if (!Utils.checkPhoneNum(this.customer.phone)) {
      //   Utils.showToast('客户联系方式格式不正确, 请重新输入');
      //   return;
      // }

      // if (!this.customer.address) {
      //   Utils.showToast('请先输入客户收货地址');
      //   return;
      // }


      if (this.payMode === -1) {
        Utils.showToast('请先选择付款方式');
        return;
      }

      if (this.sendType === -1) {
        Utils.showToast('请先选择配送方式');
        return;
      }

      const itemList = [];
      this.selectProducts.forEach((item) => {
        itemList.push({
          prodId: item.BM,
          qty: item.qty,
          discountPrice: item.discountPrice,
          discountRate: item.discountRate,
          discountSum: item.discountSum,
        });
      });
      const params = {
        clientId: this.customerId,
        // clientName: this.customer.name,
        // clientMobile: this.customer.phone,
        // clientAddress: this.customer.address,
        userid: Utils.getUserId(this),
        itemList: JSON.stringify(itemList),
        postType: this.sendType, // 配送方式（1送货上门，2门店自提）
        // certType: this.fileMsg, // 相关文件（1资质证书，2发票，3出库单）
        payType: this.payMode,
        memo: this.tips || '',
        oddment: this.reducePrice,
        saleClientId: this.selectCustomer.id,
      };
      Utils.showLoading();
      const result = await service.createSaleOrder(params);
      this.loading = false;
      if (!result) return;

      this.isCreated = true;
      this.orderDetail = result;

      this.changeOrderType();
    },
    async changeOrderType() {
      const result2 = await service.changeOrderType({ userid: Utils.getUserId(this), orderId: this.orderDetail.billId, type: 1 });
      if (!result2) return;
      Utils.hideLoading();
      Utils.showToast('出库成功');
      this.$router.back();
    },
  },
};
</script>
<style lang="scss" scoped>
@import './scss/orderConfirm.scss';

// .customre-item {
//   display: block;
// }

// .customer-title {
//   font-size: 16px;
//   margin-bottom: .05rem;
// }

// .customre-item .detail {
//   padding: 0;
//   input {
//     width: 100%;
//     height: .35rem;
//     border: 1px solid $color-line;
//     border-radius: .05rem;
//     padding-left: .05rem;
//   }
// }

</style>
<style lang="scss">
.w-tableview .cell .desc {

  .cube-input {
    margin-top: .03rem;
  }

  .cube-textarea,
  .cube-input-field {
    text-align: right;
  }

  &.cube-select {
    padding-right: 15px;
  }

  .cube-select-icon {
    right: 0;
  }
}
</style>
