<!-- 购物单组件 -->
<template lang='html'>
  <div class="cart-container">
    <!-- 购物单内容 -->
    <div class="cart-content">
      <!-- 购物单信息 -->
      <div class="product-list">
        <w-scroll
          ref="scroll"
          class="scroll-view"
          @pulling-down="onPullingDown"
          @pulling-up="onPullingUp">

          <no-data v-if="noData"></no-data>
          <w-loading-row v-show="cartLoading" desc="正在获取购物单产品~~"></w-loading-row>
          <div class="cart-item w-underline" v-for="(item, index) in productList" :key="index">
            <div class="radio" @click="onToggleChecked(item, index)">
              <i class="iconfont" :class="[allChecked || selectProducts[item.id] ? 'icon-radio-checked': 'icon-radio']"></i>
            </div>
            <div class="detail">
              <p class="title">
                {{item.spec || '暂无'}}
              </p>
              <p class="price price-row">
                <span v-if="item.discountPrice != undefined">
                  ￥{{item.discountPrice || 0}}
                </span>
                <span :class="{'grey line-through': item.discountPrice != undefined}">
                  ￥{{item.price || 0}}
                </span>
              </p>
              <p class="price grey" v-show="item.loading">
                获取优惠价格中...
              </p>
              <!-- <p class="price grey line-through" v-show="!item.loading && item.discountPrice != undefined">
                ￥{{item.discountPrice || '--'}}
              </p> -->
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

      </div>
      <!-- 购物单信息 -->

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
            <!-- <div class="location">
              <i class="iconfont icon-location"></i>
              {{customer.address}}
            </div> -->
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
              现金/刷卡
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
        <!-- <div class="pay-msg">
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
        </div> -->

        <div class="pay-msg">
          <div class="title">
            备<i class="opacity-0">占位</i>注:
          </div>
          <cube-textarea placeholder="请输入..." v-model="tips" :indicator="true" :maxlength="200" class="textarea"></cube-textarea>
        </div>
        <!-- 其他信息 end -->

      </div>
      <!-- 付款信息 end -->

    </div>
    <!-- 购物单内容 end -->

    <!-- 底部价格 -->
    <div class="cart-bottom">
      <div class="radio" @click="onToggleAllChecked()">
        <i class="iconfont" :class="[allChecked ? 'icon-radio-checked': 'icon-radio']"></i>全选
      </div>

      <div class="mid">
        抹零: <input type="number" v-model="oddment">
      </div>


      <div class="detail">
        <p class="red bold">
          <span>实付: </span>{{(totalPrice - discountPrice - oddment).toFixed(2)}}
        </p>
        <div class="msg">
          <p class="bold grey">合计: {{totalPrice.toFixed(2)}}</p>
          <p class="red small">
            优惠: {{discountPrice.toFixed(2)}}
          </p>
        </div>
      </div>
      <button type="button" class="blue-btn" v-show="!isEdit" @click="onPay()">
        结账({{selectNum}})
      </button>
      <button type="button" class="red-btn" v-show="isEdit" @click="onDelete()">
        删除
      </button>
    </div>
    <!-- 底部价格 end-->

    <!-- 弹窗内容 -->
    <w-modal ref="onlinePayModal">
      <div class="online-pay">
        <p class="price">
          ￥{{(totalPrice - discountPrice - oddment).toFixed(2)}}
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
      实付金额为<span class="price">￥{{(totalPrice - discountPrice - oddment).toFixed(2)}}</span>, 请前往柜台完成付款
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
            <span class="black">{{orderDetail.billId || '--'}}</span>
          </div>
          <div class="desc">
            <span class="sub-title">已付款：</span>
            <span class="price">￥{{orderDetail.discountPrice || '--'}}</span>
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
      pageSize: 10,
      productList: [],
      selectProducts: {}, // 选择的产品列表
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
      oddment: 0, // 抹零价格
      routePath: Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'cart' }),
      orderDetail: {},
      beforeCustomerId: '',
      beforeCustomerTemp: 0,
      cartLoading: false,
    };
  },
  created() {},
  mounted() {
    this.beforeCustomerId = this.customer ? this.customer.id : '';
    this.cartLoading = true;
    this.onPullingDown();
  },
  watch: {
    '$route'(to) {
      if (to.path === this.currentPath && this.beforeCustomerId !== this.customer.id) {
        // 更换用户后重新进入购物单页面, 重新获取数据
        this.$store.commit('customer/updateSelectRateCustomer');
        this.cartLoading = true;
        this.onPullingDown();
        this.resetData();
      }
    },
    rateCustomer() {
      // console.log('change rate customer');
      if (this.rateCustomer && this.rateCustomer.id) {
        // 重新获取购物车信息
        this.updateCartData();
      }
    },
  },
  computed: {
    ...mapGetters('customer', {
      customer: 'selectCustomer',
      rateCustomer: 'rateCustomer',
    }),
  },
  components: {},
  methods: {
    // 更新购物车的数据
    async updateCartData() {
      Utils.showLoading();
      const requestList = [];

      for (let index = 0; index < this.pageNum; index++) {
        requestList.push(service.getShopCarListByClient({ userid: Utils.getUserId(this), pageNum: index + 1, pageSize: this.pageSize, clientId: this.customer.id }));
      }
      Utils.showLoading();
      Promise.all(requestList).then((resList) => {
        Utils.hideLoading();
        this.productList = [];
        const length = resList.length;
        resList.forEach((result, index) => {
          this.productList = this.productList.concat([...result.rows]);

          if (index === length - 1) {
            // 最后一页, 判断页码等数据
            this.$refs.productList && this.$refs.productList.updateList(this.productList);
            this.$refs.scroll && this.$refs.scroll.forceUpdate(true);
            Utils.showToast('优惠价已更新');
          }
        });
      });
    },
    onEdit(isEdit) {
      this.isEdit = isEdit;
    },
    // 全选或者取消全选
    onToggleAllChecked() {
      if (!this.productList.length) return;
      this.allChecked = !this.allChecked;
      this.productList = this.productList.map((item) => {
        this.selectProducts[item.id] = this.allChecked;
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
    onToggleChecked(item) {
      if (!this.customer.id) {
        Utils.showToast('请先选择客户');
        return;
      }
      this.selectProducts[item.id] = !this.selectProducts[item.id];

      // if (this.selectProducts[item.id]) {
      //   // 勾选产品后, 获取优惠价
      //   this.getCustomerPrice(item, index);
      // } else {
      //   // 计算总价格
      //   this.calcPrice();
      // }

      // 计算总价格
      this.calcPrice();

      if (!this.selectProducts[item.id] && this.allChecked) {
        this.allChecked = false;
      }

      if (this.totalNum === this.productList.length) {
        const list = this.productList.filter(product => !this.selectProducts[product.id]);
        if (this.selectProducts[item.id]) {
          // 最后一页, 判断是否已经全部选择
          this.allChecked = !!(!list || !list.length);
        }
      }

      // 判断选择的数量
      const list = this.productList.filter(product => this.selectProducts[product.id]);
      this.selectNum = list && list.length ? list.length : 0;
    },
    // 获取客户的优惠价格 -- 废弃
    async getCustomerPrice(item, index) {
      item.loading = true;
      this.$set(this.productList, index, item);

      const result = await service.getRate({ userid: Utils.getUserId(this), clientId: this.customer.id, prodId: item.prodId });
      if (!result) {
        item.loading = false;
        return;
      }
      const rate = Math.max(100 - parseFloat(result), 0) / 100;
      item.discountRate = result;
      item.discountPrice = (item.price * rate).toFixed(2);
      item.loading = false;
      this.$set(this.productList, index, item);

      // 计算总价格
      this.calcPrice();
    },
    // 计算总金额
    calcPrice() {
      let total = 0;
      this.productList.forEach((item) => {
        const discountPrice = item.discountPrice || item.price;
        if (this.selectProducts[item.id]) {
          total += parseFloat(discountPrice) * parseInt(item.qty, 10);
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
        this.$refs.scroll && this.$refs.scroll.forceUpdate(true);
        return;
      }
      this.getData();
    },
    // 获取购物单数据
    async getData() {
      if (!this.customer || !this.customer.id) {
        this.cartLoading = false;
        return;
      }
      const result = await service.getShopCarListByClient({ userid: Utils.getUserId(this), pageNum: this.pageNum, pageSize: this.pageSize, clientId: this.customer.id });
      this.cartLoading = false;
      if (!result) return;

      if (this.pageNum === 1 && this.beforeCustomerId !== this.customer.id) {
        // 第一个页, 并且切换了一个客户, 需要重新更新选择数据
        for (const key in this.selectProducts) {
          this.selectProducts[key] = false;
        }
      }

      // 判断是否选中
      if (this.allChecked) {
        result.rows = result.rows.map((item) => {
          this.selectProducts[item.id] = true;
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
      this.$refs.scroll && this.$refs.scroll.forceUpdate(true);
    },
    // 直接调整价格
    async onChangeNum(item) {
      const num = item.qty;
      const result = await service.editCartNum({ userid: Utils.getUserId(this), bm: item.prodId, qty: num, clientId: this.customer.id });
      if (!result) return;
      // 计算总价格
      this.calcPrice();
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
      const result = await service.editCartNum({ userid: Utils.getUserId(this), bm: item.prodId, qty: num - 1, clientId: this.customer.id });
      item.loading = false;
      if (!result) return;
      item.qty = num - 1;

      // 计算总价格
      this.calcPrice();
    },
    // 数量增加1
    async onAdd(item) {
      if (item.loading) {
        Utils.showToast('正在调整数量, 请不要重复操作');
        return;
      }
      item.loading = true;
      const num = item.qty;
      const result = await service.editCartNum({ userid: Utils.getUserId(this), bm: item.prodId, qty: num + 1, clientId: this.customer.id });
      item.loading = false;
      if (!result) return;
      item.qty = num + 1;

      // 计算总价格
      this.calcPrice();
    },
    // 从购物单中删除
    async onDelete() {
      const delList = this.productList.filter(item => this.selectProducts[item.id]);
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
      if (!result) return;
      Utils.hideLoading();

      // 重置全选和选中数量
      this.allChecked = false;
      this.selectNum = 0;

      this.productList = this.productList.filter(item => !this.selectProducts[item.id]);
      // this.productList.splice(index, 1);
      Utils.showToast('删除成功');
      // 计算选择产品的金额
      this.calcPrice();
    },
    // 付款
    onPay() {
      const list = this.productList.filter(item => this.selectProducts[item.id]);
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

      // 判断当前客户是否是临时客户
      if (this.beforeCustomerTemp === 1 && this.customer.isTemp === 0) {
        // 临时客户完善了客户信息, 需要提醒客户是否关联优惠率客户
        this.showRateCustomerModal(list);
        return;
      }

      if (Number(this.customer.isTemp) === 1 && (!this.rateCustomer || !this.rateCustomer.id)) {
        // 临时客户
        Utils.showConfirm({
          title: '提醒',
          content: '是否完善客户信息?',
          confirmBtn: '完善信息',
          cancelBtn: '直接结算',
          showClose: true,
          maskClosable: false,
          onConfirm: () => {
            // 完善客户信息, 进入编辑客户界面
            this.$store.commit('customer/updateCustomer', this.customer);
            this.beforeCustomerTemp = this.customer.isTemp;
            this.$router.push(`${this.currentPath || this.routePath}/customerEdit?isUpdateTemp=1`);
          },
          onCancel: () => {
            // 不完善信息, 选择客户的角色
            this.showRateCustomerModal(list);
          },
        });
        return;
      }

      this.updateOrder(list);
    },
    // 显示是否绑定优惠率客户弹窗
    showRateCustomerModal(list) {
      Utils.showConfirm({
        title: '提醒',
        content: '当前客户无优惠率，是否参照其他客户优惠率结算?',
        confirmBtn: '是',
        cancelBtn: '直接结算',
        showClose: true,
        maskClosable: false,
        onConfirm: () => {
          // 选择关联客户
          this.$router.push(`${this.currentPath || this.routePath}/selectRateCustomer`);
        },
        onCancel: () => {
          // 直接结算
          this.updateOrder(list);
        },
      });
    },
    // 开始付款
    startPay() {
      // 老客户
      if (this.payWay === 1) {
        // 在线支付
        this.$refs.onlinePayModal.show({
          title: '扫描二维码进行付款',
          confirmTxt: '完成付款',
          cancleTxt: '取消付款',
          callback: (res) => {
            // 订单已生成, 移除产品
            this.removeCartProduct();
            this.resetData();
            if (res !== 'confirm') return;
            // 点击完成付款, 生成订单信息
            this.payOrder();
          },
        });
        return;
      }

      // 柜台付款
      this.$refs.offlinePayModal.show({
        title: '现金刷卡',
        content: '',
        confirmTxt: '完成付款',
        cancleTxt: '取消付款',
        callback: (res) => {
          // 订单已生成, 移除产品
          this.removeCartProduct();
          this.resetData();

          if (res !== 'confirm') return;
          // 点击完成付款, 生成订单信息
          this.payOrder();
        },
      });
    },
    removeCartProduct() {
      // 将已经付款的产品移除购物单中
      this.productList = this.productList.filter(item => !this.selectProducts[item.id]);

      for (const key in this.selectProducts) {
        this.selectProducts[key] = false;
      }
    },
    // 订单付款
    async payOrder() {
      Utils.showLoading();
      const result = await service.changeOrderType({ userid: Utils.getUserId(this), orderId: this.orderDetail.billId, type: 1 });
      this.loading = false;
      if (!result) return;
      Utils.hideLoading();

      this.$refs.resultModal.show({
        showBtns: false,
        callback: () => {
          // // 将已经付款的产品移除购物单中
          // this.productList = this.productList.filter(item => !this.selectProducts[item.id]);

          // for (const key in this.selectProducts) {
          //   this.selectProducts[key] = false;
          // }

          this.resetData();
        },
      });
    },
    // 生成订单
    async updateOrder(list) {
      if (this.loading) return;
      this.loading = true;

      const cartList = [];
      list.forEach((item) => {
        cartList.push({
          prodId: item.prodId,
          qty: item.qty,
          discountRate: item.discountRate,
          discountSum: item.discountPrice * item.qty,
          discountPrice: item.discountPrice,
        });
      });

      const params = {
        clientId: this.customer.id,
        userid: Utils.getUserId(this),
        itemList: JSON.stringify(cartList),
        oddment: this.oddment,
        postType: this.sendType, // 配送方式（1送货上门，2门店自提）
        // certType: this.fileMsg, // 相关文件（1资质证书，2发票，3出库单）
        payType: this.payWay,
        memo: this.tips || '',
        rateClientId: this.rateCustomer ? (this.rateCustomer.id || '') : '',
      };
      Utils.showLoading();
      const result = await service.createOrder(params);
      this.loading = false;
      if (!result) return;
      Utils.hideLoading();
      this.orderDetail = result;
      // 判断是否付款
      this.startPay();
      // this.$refs.resultModal.show({
      //   showBtns: false,
      //   callback: () => {
      //     // 将已经付款的产品移除购物单中
      //     this.productList = this.productList.filter(item => !this.selectProducts[item.id]);

      //     for (const key in this.selectProducts) {
      //       this.selectProducts[key] = false;
      //     }

      //     // 计算选择产品的金额
      //     this.calcPrice();

      //     this.resetData();
      //   },
      // });
    },
    // 重置选项数据
    resetData() {
      this.payWay = -1; // 支付方式
      this.sendType = -1; // 配送方式
      this.fileMsg = -1; // 相关文件
      this.oddment = 0; // 抹零价格
      this.selectNum = 0;

      this.totalNum = this.productList.length || 0;
      this.$emit('getTotal', this.totalNum);

      // 计算选择产品的金额
      this.calcPrice();
    },
    // 切换用户
    onChangeCustomer() {
      // 切换用户
      this.beforeCustomerId = this.customer.id || '';
      if (!this.currentPath) {
        this.$router.push(`${this.routePath || this.routePath}/customers`);
        return;
      }

      this.$router.push(`${this.currentPath || this.routePath}/customers`);
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
@import '~@/styles/components/cart.scss';
@import '~@/styles/components/order-modal.scss';
</style>