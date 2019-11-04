<!-- 消息图标 -->
<template lang='html'>
  <div class="w-scan" @click.stop="stopProp()">
    <i class="iconfont icon-card-scan" :class="[color]"></i>
    <input type="file" accept="image/*" @change="chagneFile" ref="file" v-if="!isWeixin">
  </div>
</template>
<script>
import Utils from '@/common/Utils';
import service from '@/services/user.service';

export default {
  data() {
    return {
      isWeixin: false,
    };
  },
  created() {},
  mounted() {
    this.isWeixin = Utils.checkIsWeixin();
  },
  components: {},
  methods: {
    stopProp() {
      if (!this.isWeixin) return;
      // 微信浏览器调用微信的方法
      try {
        const _this = this;
        // eslint-disable-next-line
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: (res) => {
            const localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            _this.uploadImageData(localIds);
          },
        });
      } catch (error) {
        console.log(error);
      }
    }, // 阻止事件冒泡
    chagneFile(e) {
      try {
        Utils.showLoading();
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file); // 读出 base64
        reader.onloadend = () => {
          // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
          const dataURL = reader.result;
          // this.uploadImageData(dataURL);
          // 下面压缩处理
          Utils.canvasDataURL({
            path: dataURL,
            options: { quality: 0.9 },
            callback: (res) => {
              this.uploadImageData(res);
            },
          });
        };
      } catch (error) {
        Utils.showToast('解析图片出错');
      }
    },
    async uploadImageData(data) {
      const result = await service.uploadImageData({ imgData: data });
      this.$refs.file.value = '';
      if (!result) {
        this.$emit('upload', { type: 'fail' });
        return;
      }
      Utils.hideLoading();
      if (result.result_list && result.result_list.length) {
        const res = result.result_list[0];
        if (Number(res.code) !== 0) {
          Utils.showToast('解析出错, 请更换名片后再试');
          return;
        }

        Utils.showToast('解析名片成功');
        this.$emit('upload', { type: 'success', data: res.data || [] });
      } else {
        Utils.showToast('解析图片出错');
        this.$emit('upload', { type: 'fail' });
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


.w-scan {
  width: .4rem;
  height: 100%;
  flex-shrink: 0;
  position: relative;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  line-height: 1;

  input[type=file] {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    font-size: 12rem;
    height: 100%;
    width: 100%;
    opacity: 0;
  }

  .iconfont {
    position: relative;
    width: auto;
    color: $color-blue-light;

    &.white {
      color: #fff;
    }

    &.blue {
      color: $color-blue;
    }
  }
}
</style>