<!--  -->
<template lang='html'>
  <!-- 正文内容 -->
  <div class="cart-container">
    <!-- 购物单信息 -->
    <div class="product-list">
      <w-scroll
        ref="scroll"
        class="scroll-view"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp">

        <no-data v-if="noData"></no-data>
        <w-loading-row v-if="isFirstLoading"></w-loading-row>
        <div v-for="(item, index) in productList" :key="index" class="item">
          <div class="disabled-bg" v-if="item.store <= 0"></div>
          <div class="radio" @click.stop="onToggleChecked(item)">
            <i class="iconfont" :class="[allChecked || selectProducts[item.id] ? 'icon-radio-checked': 'icon-radio']"></i>
          </div>
          <div class="img">
            <w-img :src="item.imgPath"></w-img>
          </div>
          <div class="detail">
            <p class="product-title">
              {{item.spec}}
            </p>
            <p class="desc">
              (库存: {{item.store || 0}})
            </p>
            <div class="bottom">
              <p class="price">
                <small>￥</small>{{item.price || '0'}}
              </p>
              <div class="num" @click.stop="stopProp()">
                <i class="iconfont icon-jian" :class="{'disabled': item.qty == 1}" @click.stop="onReduce(item)"></i>
                <input type="number" v-model="item.qty" @keyup="onChangeNum(item)">
                <i class="iconfont icon-jia" :class="{'disabled': item.qty >= item.store}" @click.stop="onAdd(item)"></i>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="cart-item w-underline" v-for="(item, index) in productList" :key="index">
          <div class="radio" @click="onToggleChecked(item)">
            <i class="iconfont" :class="[allChecked || selectProducts[item.id] ? 'icon-radio-checked': 'icon-radio']"></i>
          </div>
          <div class="detail">
            <div class="img">
              <w-img src="~@/assets/home/banner.jpg"/>
            </div>
            <p class="title">
              {{item.spec || '暂无'}}
            </p>
            <p class="price">
              ￥{{item.price || '--'}}
            </p>
          </div> -->
          <!-- <div class="right">
            <div class="nums">
              <i class="iconfont icon-circle-reduce" @click.stop="onReduce(item)"></i>
              <input type="number" v-model="item.qty" @blur="onChangeNum(item)">
              <i class="iconfont icon-circle-add" @click.stop="onAdd(item)"></i>
            </div>
          </div> -->
        <!-- </div> -->

      </w-scroll>
    </div>
    <!-- 购物单信息 end -->

    <!-- 底部价格 -->
    <div class="cart-bottom">
      <div class="radio" @click="onToggleAllChecked()">
        <i class="iconfont" :class="[allChecked ? 'icon-radio-checked': 'icon-radio']"></i>全选
      </div>

      <div class="detail">
        <p class="red bold">
          <span>合计: </span>{{(totalPrice - discountPrice - reducePrice).toFixed(2)}}
        </p>
        <div class="msg">
          <!-- <p class="bold grey">合计: {{totalPrice.toFixed(2)}}</p> -->
          <p class="red small">
            优惠: {{discountPrice.toFixed(2)}}
          </p>
        </div>
        <!-- <div class="mid">
          抹零: <input type="number" v-model="reducePrice">
        </div> -->
      </div>
      <button type="button" class="orange-btn" v-show="!isEdit" @click="onPay()">
        结算({{selectNum}})
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
          ￥{{(totalPrice - discountPrice).toFixed(2)}}
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
      实付金额为<span class="price">￥{{(totalPrice - discountPrice).toFixed(2)}}</span>, 请前往柜台完成付款
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
            <span class="price">￥{{orderDetail.totalPrice || '--'}}</span>
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
      isFirstLoading: true,
      totalNum: 0,
      pageNum: 1,
      pageSize: 15,
      productList: [],
      selectProducts: {}, // 选择的产品
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
      orderDetail: {},
      reducePrice: 0, // 抹零价格
      isChangeNum: false, // 编辑价格的产品, 用来判断价格修改是否已经执行
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
        // 重新进入购物单页面
        this.hasNext = true;
      }
    },
  },
  computed: {
    ...mapGetters('user', {
      customerId: 'customerId',
    }),
  },
  components: {},
  methods: {
    scrollTop() {
      this.$refs.scroll.scrollTop();
    },
    stopProp() {}, // 阻止事件冒泡
    onEdit(isEdit) {
      this.isEdit = isEdit;
      if (!this.isEdit) {
        // 非编辑状态, 将库存小于等于0的选中产品去除
        this.selectNum = 0;
        this.productList.forEach((item) => {
          if (Number(item.store || 0) <= 0) {
            this.selectProducts[item.id] = false;
          }

          if (Number(item.store || 0) > 0 && this.selectProducts[item.id]) {
            this.selectNum += 1;
          }
        });

        this.calcPrice();
        this.allChecked = this.selectNum === this.totalNum;
      } else if (this.allChecked) {
        // 编辑状态下, 如果是全选就将全部商品选中
        this.productList.forEach((item) => {
          this.selectProducts[item.id] = true;
        });
        this.selectNum = this.productList.length;
        this.calcPrice();
      }
    },
    // 全选或者取消全选
    onToggleAllChecked() {
      if (!this.productList.length) return;
      this.allChecked = !this.allChecked;

      this.selectNum = 0;
      this.productList.forEach((item) => {
        if (this.isEdit || Number(item.store || 0) > 0) {
          this.selectProducts[item.id] = this.allChecked;
          this.selectNum += 1;
        }
      });

      if (!this.allChecked) {
        this.totalPrice = 0;
        return;
      }
      // 计算选择产品的金额
      this.calcPrice();
    },
    // 选择或者取消选择产品
    onToggleChecked(item) {
      // 没有库存不可选中结算
      if (!this.isEdit && Number(item.store || 0) <= 0) return;

      this.selectProducts[item.id] = !this.selectProducts[item.id];

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
    // 计算总金额
    calcPrice() {
      let total = 0;
      this.productList.forEach((item) => {
        const discountPrice = item.discountPrice || item.price || 0;
        if (this.selectProducts[item.id]) {
          total += parseFloat(discountPrice || 0) * parseInt(item.qty || 1, 10);
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
      const result = await service.getShopCarListByClient({ userid: Utils.getUserId(this), pageNum: this.pageNum, pageSize: this.pageSize, clientId: this.customerId });
      this.isFirstLoading = false;
      if (!result) return;

      // if (this.pageNum === 1 && this.beforeCustomerId !== this.customerId) {
      //   // 第一个页, 并且切换了一个客户, 需要重新更新选择数据
      //   for (const key in this.selectProducts) {
      //     this.selectProducts[key] = false;
      //   }
      // }

      // 判断是否选中
      if (this.allChecked) {
        result.rows = result.rows.map((item) => {
          if (Number(item.store || 0) > 0) {
            this.selectProducts[item.id] = true;
          }
          return item;
        });
      }
      if (this.pageNum === 1) {
        this.$refs.productList && this.$refs.productList.updateList([]);
        this.productList = result.rows;
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
    // 数量减少1
    async onReduce(item) {
      if (parseInt(item.qty, 10) === 1) return;
      if (item.loading) {
        Utils.showToast('正在调整数量, 请不要重复操作');
        return;
      }
      item.loading = true;
      const num = item.qty;
      const result = await service.editCartNum({ userid: Utils.getUserId(this), bm: item.prodId, qty: num - 1, clientId: this.customerId });
      item.loading = false;
      if (!result) return;
      item.qty = num - 1;

      // 计算总价格
      this.calcPrice();
    },
    // 数量增加1
    async onAdd(item) {
      if (item.qty >= item.store) return;

      if (item.loading) {
        Utils.showToast('正在调整数量, 请不要重复操作');
        return;
      }
      item.loading = true;
      const num = item.qty;
      const result = await service.editCartNum({ userid: Utils.getUserId(this), bm: item.prodId, qty: num + 1, clientId: this.customerId });
      item.loading = false;
      if (!result) return;
      item.qty = num + 1;

      // 计算总价格
      this.calcPrice();
    },
    onChangeNum(item) {
      Utils.throttle(() => {
        if (this.isChangeNum) return;
        if (item.qty > item.store) {
          item.qty = item.store;
        }
        this.startChangeNum(item);
        this.isChangeNum = true;
      }, 500, { leading: false })();
    },
    // 直接调整价格
    async startChangeNum(item) {
      const num = item.qty;
      const result = await service.editCartNum({ userid: Utils.getUserId(this), bm: item.prodId, qty: num, clientId: this.customerId });
      setTimeout(() => {
        this.isChangeNum = false;
      }, 500);
      if (!result) {
        return;
      }
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
      const result = await service.deleteShopCarWithClient({ userid: Utils.getUserId(this), bm: bm.toString(), clientId: this.customerId });
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

      this.$store.dispatch('user/getCartNum');
    },
    // 付款
    onPay() {
      const list = this.productList.filter(item => this.selectProducts[item.id]);
      if (!list || !list.length) {
        Utils.showToast('请先选择结算的产品');
        return;
      }

      this.$store.commit('order/updateSelectProducts', list);

      this.$router.push(`${this.currentPath || this.routePath}/confirmOrder`);
    },
    toDetail(item) {
      this.$router.push(`${this.currentPath}/productDetail?bm=${item.bm}`);
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
</style>