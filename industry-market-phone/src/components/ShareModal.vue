<!-- 绑定弹窗 -->
<template lang='html'>
  <transition name="slide-up-toggle">
    <div class="w-container modal-container" v-show="isShow">
      <div class="header-right" @click="onClose()">
        <i class="iconfont icon-close"></i>
      </div>

      <div class="w-content">
        <div style="position: relative;">
          <div class="share-container" ref="posterHtml">
            <img src="@/assets/home/banner.png" alt="" class="banner">
            <p class="title">
              营销云平台
            </p>
            <p class="desc">
              一站式购物平台, 更多优惠尽在官方微信公众号
            </p>
            <div class="code-img" ref="qrcodeDiv">
            </div>

            <p class="tip">
              扫码立即查看
            </p>
          </div>

          <img :src="posterImg" alt="" class="poster-img" v-show="posterImg">

        </div>

        <p class="bottom-title">
          长按图片保存
        </p>
        <p class="bottom-desc">
          您的朋友会为购买到优质的产品而感谢您
        </p>
      </div>
    </div>
  </transition>
</template>
<script>
import QRCode from 'qrcodejs2';
// import DomToImage from 'dom-to-image';
import html2canvas from 'html2canvas';
import Utils from '@/common/Utils';

export default {
  data() {
    return {
      slideName: 'slide-up',
      isShow: false,
      posterImg: '', // 最终生成的海报图片
      qrcode: null,
    };
  },
  created() {},
  mounted() {
  },
  components: {
  },
  computed: {
  },
  methods: {
    toggle(isShow) {
      this.isShow = isShow;
      this.slideName = isShow ? 'slide-up' : 'slide-down';
      if (this.isShow) {
        Utils.showLoading();

        setTimeout(() => {
          this.createQrcode();
        }, 300);
      }
    },
    onClose() {
      this.toggle(false);
      this.$emit('close');
    },
    // 生成二维码
    createQrcode() {
      if (!this.qrcode) {
        this.qrcode = new QRCode(this.$refs.qrcodeDiv, {
          colorDark: '#000000',
          colorLight: '#ffffff',
          width: this.$refs.qrcodeDiv.clientWidth - 5,
          height: this.$refs.qrcodeDiv.clientWidth - 5,
          correctLevel: QRCode.CorrectLevel.L,
        });
      }
      const key = Utils.getLocalStorageItem('marketKey', true);
      const userid = Utils.getLocalStorageItem('userId');
      this.qrcode.clear();

      const url = `${window.location.origin}${window.location.pathname}#/?key=${key}&recId=${userid}`;

      this.qrcode.makeCode(url);

      // TODO: 分享路径调整
      // const url = `${window.location.origin}${window.location.pathname}#/?key=${key}&recId=${userid}&path=${this.$route.path}&pathQuery=${JSON.stringify(this.$route.query)}`;

      this.qrcode.makeCode(url);

      this.$nextTick(() => {
        setTimeout(() => {
          this.createPoster();
        }, 500);
      });
    },
    // 生成海报
    createPoster() {
      // DomToImage.toPng(this.$refs.posterHtml).then((dataUrl) => {
      //   this.posterImg = dataUrl;
      //   Utils.hideLoading();
      // }).catch((error) => {
      //   console.error('oops, something went wrong!', error);
      //   Utils.hideLoading();
      // });
      const vm = this;
      // // const domObj = document.getElementById('posterHtml');
      html2canvas(this.$refs.posterHtml, {
        useCORS: true,
        allowTaint: true, // 允许加载跨域的图片
        // logging: false,
        letterRendering: true,
        tainttest: true, // 检测每张图片都已经加载完成
        // onclone(doc) {
        //   // console.log(doc);
        //   // const e = doc.querySelector('#posterHtml');
        //   // e.style.display = 'block';
        //   vm.showPoster = true;
        // },
      }).then((canvas) => {
        // 在微信里,可长按保存或转发
        vm.posterImg = canvas.toDataURL('image/png');

        Utils.hideLoading();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/components/button.scss';
@import '~@/styles/components/modal.scss';

.modal-container {
  background: #fff;
}

.slide-up-toggle-enter-active {
  transition: all .3s ease;
}
.slide-up-toggle-enter, .slide-up-toggle-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(100%);
}

.header-right {
  width: .3rem;
  height: .3rem;
  border-radius: .3rem;
  line-height: .3rem;
  font-size: .18rem;
  border: 1px solid $color-grey-6;
  overflow: hidden;
  text-align: center;
  color: $color-grey-6;
  position: fixed;
  right: .1rem;
  top: .1rem;
  z-index: 10;
}

.bottom-title {
  text-align: center;
  font-size: 16px;
  margin-top: .2rem;
  margin-bottom: .08rem;
}

.bottom-desc {
  text-align: center;
  font-size: 14px;
}

.poster-img {
  position: absolute;
  top: 0;
  left: 10%;
  width: 80%;
  display: block;
  z-index: 10;
}

</style>

<style lang="scss">
.share-container {
  width: 80%;
  margin: 8vh auto 0;
  box-shadow: 0 0 5px #ccc;
  background: #fff;
  padding-bottom: .3rem;
  position: relative;
  overflow: hidden;

  .banner {
    width: 100%;
    display: block;
    margin-bottom: .2rem;
  }

  .title {
    font-size: 16px;
    text-align: center;
    margin-bottom: .1rem;
  }

  .desc {
    font-size: 12px;
    text-align: center;
  }

  .code-img {
    width: 40%;
    border: 1px solid #e6e6e6;
    display: block;
    margin: .2rem auto .1rem;
    padding: 2.5px;

    img {
      display: block;
      width: 100%;
    }
  }

  .tip {
    font-size: 10px;
    color: #666;
    text-align: center;
  }
}
</style>