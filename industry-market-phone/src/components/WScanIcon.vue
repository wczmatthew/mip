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
    if (Utils.checkIsWeixin()) {
      // eslint-disable-next-line
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: '', // 必填，企业号的唯一标识，此处填写企业号corpid
        timestamp: '', // 必填，生成签名的时间戳
        nonceStr: '', // 必填，生成签名的随机串
        signature: '', // 必填，签名，见附录1
        jsApiList: [], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      return;
    }

    window.nativeToProductDetail = (bm) => {
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
          desc: 'scanQRCode desc',
          needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
          success: (res) => {
            // 回调
            console.log(res);
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