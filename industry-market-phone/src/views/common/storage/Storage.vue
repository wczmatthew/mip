<!-- 云仓首页 -->
<template lang='html'>
  <w-container show-header show-back>
    <!-- 顶部栏 -->
    <template #header-mid>
      云仓
    </template>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <!-- 轮播图 -->
    <div class="banner" v-if="banners && banners.length">
      <cube-slide ref="slide" :data="banners">
        <cube-slide-item v-for="(item, index) in banners" :key="index" @click.native="onClickLink(item)" class="banner-item" auto-play>
          <w-img :src="item.imgPath" :err-img="bannerErrImg"/>
        </cube-slide-item>
      </cube-slide>
    </div>
    <!-- 轮播图 end -->

    <!-- 常用功能 -->
    <div class="w-grid-list home-category">
      <div class="item" @click="onScan(1)">
        <div class="img">
          <i class="iconfont icon-ruku"></i>
        </div>
        <p class="sub-title">
          扫码入库
        </p>
      </div>
      <div class="item" @click="toCart()">
        <div class="img">
          <i class="iconfont icon-chuku"></i>
        </div>
        <p class="sub-title">
          产品出库
        </p>
      </div>
      <div class="item" @click="onScan(2)">
        <div class="img">
          <i class="iconfont icon-pandian1"></i>
        </div>
        <p class="sub-title">
          扫码盘点
        </p>
      </div>
      <div class="item" @click="toList(1)">
        <div class="img">
          <i class="iconfont icon-kucun1"></i>
        </div>
        <p class="sub-title">
          库存信息
        </p>
      </div>
    </div>
    <!-- 常用功能 end -->

    <!-- 今日入库 -->
    <div class="w-tableview">
      <div class="top-title">
        今日入库
        <!-- <span class="more">
          更多>
        </span> -->
      </div>
      <div class="cell" v-for="(item, index) in todayList" :key="'today'+index">
        <div class="title">
          {{item.spec}}
        </div>
        <div class="desc">
          {{item.qty}}
        </div>
      </div>
    </div>
    <!-- 今日入库 end -->

    <!-- 本月入库 -->
    <div class="w-tableview">
      <div class="top-title">
        本月入库
        <!-- <span class="more">
          更多>
        </span> -->
      </div>
      <div class="cell" v-for="(item, index) in monthList" :key="'month'+index">
        <div class="title">
          {{item.spec}}
        </div>
        <div class="desc">
          {{item.qty}}
        </div>
      </div>
    </div>
    <!-- 本月入库 end -->
    <!-- 正文内容 end -->
  </w-container>
</template>
<script>
import Utils from '@/common/Utils';
import indexService from '@/services/index.service';
import service from '@/services/order.service';
import loading from '@/assets/loading.gif';

export default {
  data() {
    return {
      categoryList: [
        { title: '扫码入库', icon: 'icon-ruku' },
        { title: '产品出库', icon: 'icon-chuku' },
        { title: '扫码盘点', icon: 'icon-pandian1' },
        { title: '库存信息', icon: 'icon-kucun1' },
      ],
      banners: [],
      bannerErrImg: loading,
      todayList: [],
      monthList: [],
      routePath: Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'storage' }), // 获取当前路由
      scanType: 1, // 1: 入库 2: 盘点
    };
  },
  created() {},
  mounted() {
    this.getData();

    this.getTodayStorageData();
    this.getMonthStorageData();

    window.nativeToProductDetail = (data) => {
      if (!data) return;
      if (this.scanType === 1) {
        // 入库
        this.handleRukuScan(data);
      } else {
        // 盘点
        this.handlePanDianScan(data);
      }
    };
  },
  components: {},
  methods: {
    onClickLink(item) {
      if (!item.url) {
        Utils.showToast('敬请期待');
        return;
      }
      if (item.url.indexOf('http') > -1) {
        try {
          // eslint-disable-next-line
          // native_listen('goToUrl', { url: item.url });
          Utils.saveLocalStorageItem('beforePath', `${this.routePath}/home`);
          this.$router.push({
            path: `${this.routePath}/frame`,
            query: {
              url: item.url,
              title: item.title || '发现',
            },
          });
        } catch (error) {
          console.log('error: ', error);
        }
        return;
      }

      if (item.url.indexOf('/market') === 0) {
        this.$router.push({
          path: item.url,
          query: { title: item.title },
        });
        return;
      }

      this.$router.push({
        path: `${this.routePath}/${item.url}`,
        query: { title: item.title },
      });
    },
    // 获取首页第一屏数据
    async getData() {
      Utils.showLoading();
      const result = await indexService.getIndexData({ userid: Utils.getUserId(this) });
      if (!result) return;
      Utils.hideLoading();
      this.banners = result.banner || [];
      this.$nextTick(() => {
        this.$refs.slide && this.$refs.slide.refresh();
      });
    },
    async getMonthStorageData() {
      const result = await service.getStoreStatisticsMonth({ userid: Utils.getUserId(this) });
      if (!result) return;
      Utils.hideLoading();
      this.monthList = result || [];
    },
    async getTodayStorageData() {
      const result = await service.getStoreStatisticsToday({ userid: Utils.getUserId(this) });
      if (!result) return;
      Utils.hideLoading();
      this.todayList = result || [];
    },
    // 库存盘点
    onScan(type) {
      this.scanType = type;
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
            if (type === 1) {
              // 入库
              this.handleRukuScan(res.resultStr);
            } else {
              // 盘点
              this.handlePanDianScan(res.resultStr);
            }
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
      //   if (type === 1) {
      //     // 入库
      //     this.handleRukuScan(JSON.stringify({ type: 1, url: 'http://10.10.10.20/json/getReceiptBillInfo?deptId=dzswcs00000000000001&billNo=CGS181117000002' }));
      //   } else {
      //     // 盘点
      //     this.handlePanDianScan('0054374648900700028');
      //   }
      // }, 300);

      try {
        // eslint-disable-next-line
        native_listen('scan_product');
      } catch (error) {
        Utils.showToast('敬请期待');
      }
    },
    handleRukuScan(data) {
      if (!data) return;
      try {
        if (typeof JSON.parse(data) === 'object') {
          const obj = JSON.parse(data);
          // 返回的是对象格式
          if (Number(obj.type) === 1) {
            // 入库单操作
            Utils.saveLocalStorageItem('receiveUrl', obj.url || '');
            this.$router.push({
              path: `${this.routePath}/confirmReceive`,
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
    // 入库操作: 扫码获取的是产品信息
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
      // 开单员直接加入采购单
      Utils.showToast('加入购物单成功');
    },
    // 盘点操作: 获取产品信息, 并且调整库存
    async handlePanDianScan(data) {
      if (data.indexOf('CODE_128%2C') === 0) {
        data = data.substr('CODE_128%2C'.length);
      }
      if (data.indexOf('CODE_128=') === 0) {
        data = data.substr('CODE_128='.length);
      }
      // 获取产品信息, 并且调整库存
      Utils.showLoading();
      const result = await service.getProductStore({ userid: Utils.getUserId(this), code: data });
      if (!result) return;
      Utils.hideLoading();

      Utils.showPrompt({
        title: `${result.spec}`,
        placeholder: (result.qty).toString(),
        value: '',
        onConfirm: ({ promptValue }) => {
          if (!promptValue) return;
          console.log(promptValue);
          this.changeStore(result, promptValue);
        },
      });
    },
    async changeStore(item, qty) {
      Utils.showLoading();
      const itemList = [{
        inveQty: qty,
        storeQty: item.qty,
        prodId: item.prodId,
        spec: item.spec,
      }];
      const result = await service.checkWareHouse({ userid: Utils.getUserId(this), itemList: JSON.stringify(itemList) });
      if (!result) return;
      Utils.showToast(`${item.spec}库存盘点成功`);
    },
    toCart() {
      this.$router.push(`${this.routePath}/cart`);
    },
    toList() {
      this.$router.push(`${this.routePath}/storageList`);
    },
  },
};
</script>
<style lang="scss" scoped>
.banner {
  width: 100%;
  min-height: 1.2rem;
  overflow: hidden;
  // padding-top: .44rem;
  max-height: 1.8rem;
  background: #fff;

  .banner-item {
    padding: .1rem $spacing-lr;
    height: 1.45rem;
    @include flex-center;
    img {
      width: 100%;
      height: 100%;
      display: block;
      border-radius: .08rem;
    }
  }
}

.home-category {
  justify-content: space-around;
  background: #fff;
  padding: 0 $spacing-lr;
  padding-top: .15rem;

  // &::after {
  //   content: ' ';
  //   display: block;
  //   width: 100%;
  //   height: 1px;
  //   background: $color-line;
  // }

  .item {
    width: 20%;
    padding: 0;
    padding-top: .01rem;
    padding-bottom: .08rem;
    position: relative;
    overflow: visible;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .img {
      width: 11vw;
      height: 11vw;
      margin: 0 auto;
      border-radius: 11vw;
      @include flex-center;
      @include background-gradient(135deg, #fa71cd, #c471f5);

      .iconfont {
        font-size: .2rem;
        color: #fff;
      }
    }

    &:nth-child(4n+1) .img {
      @include background-gradient(135deg, #fa71cd, #c471f5);
    }

    &:nth-child(4n+2) .img {
      @include background-gradient(135deg, #fee140, #fa709a);
    }

    &:nth-child(4n+3) .img {
      @include background-gradient(135deg, #00f2fe, #4facfe);
    }

    &:nth-child(4n+4) .img {
      @include background-gradient(135deg, #38f9d7, #43e97b);
    }

    .sub-title {
      font-size:  12px;
      text-align: center;
      color: $color-grey-6;
      margin-top: .1rem;
    }

    &.big {
      img {
        height: .42rem !important;
        margin-top: -.1rem;
      }
    } // end big
  }
}

.w-tableview {
  margin-top: .1rem;

  .top-title {
    color: $color-default;
    padding: 0 $spacing-lr;
    padding-left: .1rem;
    height: .4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    &::before {
      content: ' ';
      width: 2px;
      height: 30%;
      background: $color-default;
      position: absolute;
      top: 35%;
      left: $spacing-lr;
    }

    &::after {
      content: ' ';
      width: 98.5%;
      height: 1px;
      background: $color-line;
      position: absolute;
      bottom: 0;
      left: 1.5%;
      transform: scaleY(.5);
    }

    .more {
      color: $color-grey;
    }
  }

  .cell .title {
    max-width: 65%;
  }
}

</style>