<!-- 扫码推荐 -->
<template lang='html'>
  <div class="share-container" ref="posterHtml">
    <img src="@/assets/home/banner.png" alt="" class="banner">
    <p class="title">
      营销云平台
    </p>
    <p class="desc">
      一站式购物平台, 更多优惠尽在官方微信公众号
    </p>

    <div class="code-container">
      <div class="item">
        <img src="@/assets/home/banner.png" alt="">
        <p class="tips">
          公众号
        </p>
      </div>

      <div class="item">
        <img src="@/assets/home/banner.png" alt="">
        <p class="tips">
          APP下载
        </p>
      </div>

      <div class="item">
        <img src="@/assets/home/banner.png" alt="">
        <p class="tips">
          推荐分析
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import QRCode from 'qrcodejs2';
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
    // this.createQrcode();
  },
  components: {
  },
  computed: {
  },
  methods: {
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

      if (document.URL.indexOf('?') > -1) {
        // 已经带参数了
        this.qrcode.makeCode(`${document.URL}&key=${key}&recId=${userid}`);
      } else {
        // 没有带参数
        this.qrcode.makeCode(`${document.URL}?key=${key}&recId=${userid}`);
      }

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

        Utils.hideLoading();
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


.code-container {
  display: flex;
  padding-top: .2rem;

  .item {
    flex: 1;

    img {
      display: block;
      width: 80%;
      background: #f5f5f5;
      margin: 0 auto;
    }

    .tips {
      font-size: 10px;
      color: #666;
      text-align: center;
      margin-top: .1rem;
    }
  }
}

.share-container {
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