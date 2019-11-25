<!-- 扫码推荐 -->
<template lang='html'>
  <div class="share-container2" ref="posterHtml">
    <img :src="companyShareImg" alt="" class="banner">
    <p class="title">
      营销云平台
    </p>
    <p class="desc">
      一站式购物平台, 更多优惠尽在官方微信公众号
    </p>

    <div class="code-container2">
      <div class="item">
        <div class="img">
          <img :src="wxPlatQrImg" alt="">
        </div>
        <p class="tips">
          公众号
        </p>
      </div>

      <div class="item">
        <div class="img">
          <img :src="appDownUrl" alt="">
        </div>
        <p class="tips">
          APP下载
        </p>
      </div>

      <div class="item">
        <div class="img" ref="qrcodeDiv"></div>
        <p class="tips">
          扫码分享
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import QRCode from 'qrcodejs2';
import html2canvas from 'html2canvas';
import Utils from '@/common/Utils';
import service from '@/services/user.service';

export default {
  data() {
    return {
      slideName: 'slide-up',
      isShow: false,
      posterImg: '', // 最终生成的海报图片
      qrcode: null,
      companyShareImg: '', // 公司图片
      appDownUrl: '', // app下载
      wxPlatQrImg: '', // 公众号
    };
  },
  created() {},
  mounted() {
    this.createQrcode();
    this.getData();
  },
  components: {
  },
  computed: {
  },
  methods: {
    async getData() {
      Utils.showLoading();
      const result = await service.getBossShareInfo({ userid: Utils.getUserId(this) });
      if (!result) return;
      Utils.hideLoading();
      this.companyShareImg = result.companyShareImg;
      this.appDownUrl = result.appDownUrl;
      this.wxPlatQrImg = result.wxPlatQrImg;
    },
    onClose() {
      this.toggle(false);
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

      const link = `${window.location.origin}${window.location.pathname}#/?key=${key}&recId=${userid}`;
      this.qrcode.makeCode(link);

      this.$nextTick(() => {
        setTimeout(() => {
          this.createPoster();
        }, 500);
      });
    },
    // 生成海报
    createPoster() {
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
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/components/button.scss';

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
  left: 0;
  width: 100%;
  display: block;
  z-index: 10;
}


.code-container2 {
  display: flex;
  padding-top: .2rem;

  .item {
    flex: 1;

    .img {
      display: block;
      width: 27vw;
      height: 27vw;
      margin: 0 auto;

      img {
        width: 100%;
      }
    }

    .tips {
      font-size: 10px;
      color: #666;
      text-align: center;
      margin-top: .1rem;
    }
  }
}

.share-container2 {
  width: 100%;
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
}
</style>
<style lang="scss">
.code-container2 {
  .item .img {
    img {
      width: 100%;
      margin: 0;
    }
  }
}
</style>