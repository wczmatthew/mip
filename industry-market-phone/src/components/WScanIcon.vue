<!-- 消息图标 -->
<template lang='html'>
  <div class="w-icon" @click.stop="toScan()">
    <i class="iconfont icon-scan-blod" :class="[color]"></i>
    <!-- <p>扫一扫</p> -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Utils from '@/common/Utils';
import service from '@/services/order.service';
import { USER_ROLE } from '@/common/Constants';

export default {
  data() {
    return {
      loading: false,
    };
  },
  created() {},
  mounted() {
    window.nativeToProductDetail = (data) => {
      if (!data) return;
      this.handleScan(data);
    };
  },
  computed: {
    ...mapGetters('user', {
      role: 'role',
      userId: 'userId',
      customerId: 'customerId',
      isBind: 'isBind',
    }),
  },
  components: {},
  methods: {
    // 打开扫一扫界面
    toScan() {
      if (Utils.checkIsWeixin()) {
        // 调用微信扫一扫
        // eslint-disable-next-line
        wx.scanQRCode({
          desc: '扫一扫',
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
          success: (res) => {
            // 回调
            if (!res.resultStr) return;
            // this.$router.push(`${this.currentPath}/productDetail?bm=${res.resultStr}`);
            this.handleScan(res.resultStr);
          },
          error: (res) => {
            if (res.errMsg.indexOf('function_not_exist') > 0) {
              Utils.showToast('版本过低请升级');
            }
          },
        });
        return;
      }

      // TODO: 测试用
      // setTimeout(() => {
      //   // this.handleScan('0054374648900700028');
      //   this.handleScan(JSON.stringify({ type: 1, url: 'http://10.1.110.24:8080/ECP2/json/getReceiptBillInfo?deptId=CQZT0100000000000001&billNo=CGS190617000004' }));
      // }, 300);
      try {
        // eslint-disable-next-line
        native_listen('scan_product');
      } catch (error) {
        Utils.showToast('敬请期待');
      }
    },
    handleScan(data) {
      if (!data) return;
      try {
        if (typeof JSON.parse(data) === 'object') {
          const obj = JSON.parse(data);
          // 返回的是对象格式
          if (Number(obj.type) === 1) {
            // 入库单操作
            Utils.saveLocalStorageItem('receiveUrl', obj.url || '');
            this.$router.push({
              path: `${this.currentPath}/confirmReceive`,
              query: {
                orderId: obj.orderId || '',
                vendorId: obj.vendorId || '',
              },
            });
          }
        } else {
          // 返回的不是jsonobj格式
          this.handleScanProduct(data);
        }
      } catch (error) {
        // 解析失败, 返回的不是jsonobj格式
        this.handleScanProduct(data);
      }
    },
    // 扫码获取的是产品信息
    async handleScanProduct(data) {
      if (data.indexOf('CODE_128%2C') === 0) {
        data = data.substr('CODE_128%2C'.length);
      }
      if (data.indexOf('CODE_128=') === 0) {
        data = data.substr('CODE_128='.length);
      }
      // 先查询产品信息
      const proRes = await service.scanBarcode({ userid: this.userId, code: data });
      if (!proRes) return;
      Utils.hideLoading();
      // 返回的是产品编码
      if (Number(this.role) !== USER_ROLE.user) {
        // 开单员直接加入采购单
        Utils.showToast('加入购物单成功');
        // this.addToCart(proRes);
        return;
      }

      // 其他用户查看产品详情
      this.$router.push(`${this.currentPath}/productDetail?bm=${proRes.prodId}`);
    },
    // 加入购物单
    async addToCart(proRes) {
      if (this.loading) {
        Utils.showToast('正在加入购物单, 请勿频繁操作');
        return;
      }
      this.loading = true;

      Utils.showLoading();
      const result = await service.addToShopCarWithClient({ userid: this.userId, bm: proRes.prodId, qty: proRes.qty || 1, clientId: this.customerId });
      this.loading = false;
      if (!result) return;
      Utils.hideLoading();
      Utils.showToast('加入购物单成功');
    },
  },
  props: {
    color: {
      type: String,
      default: '',
    },
    currentPath: {
      type: String,
      default: '',
    },
  },
};
</script>
<style lang="scss" scoped>


.w-icon {
  width: .4rem;
  height: 100%;
  flex-shrink: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: .23rem;
  line-height: 1;


  .iconfont {
    position: relative;
    width: auto;
    font-size:  20px;
    .point {
      width: .06rem;
      height: .06rem;
      border-radius: .06rem;
      background: $color-red;
      position: absolute;
      right: -.01rem;
      top: 0;
      z-index: 10;
    }

    &.white {
      color: #fff;
    }

    &.blue {
      color: $color-blue;
    }
  }

  p {
    font-size: 10px;
    text-align: center;
    margin-top: .05rem;
  }
}
</style>