<!-- 消息图标 -->
<template lang='html'>
  <div class="w-icon" @click.stop="toScan()">
    <i class="iconfont icon-scan" :class="[color]"></i>
    <!-- <p>扫一扫</p> -->
  </div>
</template>
<script>
import Utils from '@/common/Utils';


export default {
  data() {
    return {
    };
  },
  created() {},
  mounted() {
    window.nativeToProductDetail = (bm) => {
      if (!bm) return;
      this.$router.push(`${this.currentPath}/productDetail?bm=${bm}`);
    };
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
            this.$router.push(`${this.currentPath}/productDetail?bm=${res.resultStr}`);
          },
          error: (res) => {
            if (res.errMsg.indexOf('function_not_exist') > 0) {
              Utils.showToast('版本过低请升级');
            }
          },
        });
        return;
      }
      try {
        // eslint-disable-next-line
        native_listen('scan_product');
      } catch (error) {
        Utils.showToast('敬请期待');
      }
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
@import '~@/styles/variable.scss';

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