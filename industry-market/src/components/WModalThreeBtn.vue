<!-- 模态窗 -->
<template lang='html'>
  <transition name="bounce">
    <div class="modal-container" v-show="isShow" @click="onShadowClose()">
      <!-- 窗体 -->
      <div class="modal" @click.stop="stopProp()">
        <!-- 顶部标题 -->
        <div class="modal-title" v-show="title">
          {{title}}
        </div>
        <!-- 顶部标题 end -->

        <!-- 关闭按钮 -->
        <div class="close" @click.stop="onClose()">
          <i class="iconfont icon-close"></i>
        </div>
        <!-- 关闭按钮 end -->

        <!-- 显示内容 -->
        <div class="modal-content">
          {{content}}
          <slot></slot>
        </div>
        <!-- 显示内容 end -->

        <!-- 按钮区域 -->
        <div class="modal-bottom" v-show="showBtns">
          <button type="button" class="cancle" @click.stop="btn1Click()" v-if="btn1Txt">
            {{btn1Txt}}
          </button>
          <button type="button" class="cancle" @click.stop="btn2Click()" v-if="btn2Txt" style="color: #333;">
            {{btn2Txt}}
          </button>
          <button type="button" class="confirm" @click.stop="btn3Click()" v-if="btn3Txt">
            {{btn3Txt}}
          </button>
        </div>
        <!-- 按钮区域 end -->

      </div>
      <!-- 窗体 end -->
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      title: '',
      content: '',
      btn1Txt: '',
      btn2Txt: '',
      btn3Txt: '',
      isShow: false,
      callback: null,
      shadowClose: true,
      showBtns: true,
    };
  },
  created() {},
  mounted() {},
  components: {},
  methods: {
    // 阻止冒泡方法
    stopProp() {},
    /**
     * 显示modal
     * @param title 标题
     * @param content 内容
     * @param btn1Txt 按钮1文字
     * @param btn2Txt 按钮2文字
     * @param btn3Txt 按钮2文字
     * @param callback 按钮回调
     * @param shadowClose 点击阴影是否可以关闭
     */
    show({ title, content, btn1Txt, btn2Txt, btn3Txt, shadowClose, callback }) {
      this.title = title || '';
      this.content = content || '';
      this.btn1Txt = btn1Txt || '';
      this.btn2Txt = btn2Txt || '';
      this.btn3Txt = btn3Txt || '';
      this.callback = callback;
      this.shadowClose = shadowClose || true;
      this.isShow = true;
    },
    btn1Click() {
      this.isShow = false;
      this.callback && this.callback('btn1');
    },
    onShadowClose() {
      if (!this.shadowClose) return;
      this.onClose();
    },
    onClose() {
      this.isShow = false;
      this.callback && this.callback('close');
    },
    btn2Click() {
      this.isShow = false;
      this.callback && this.callback('btn2');
    },
    btn3Click() {
      this.isShow = false;
      this.callback && this.callback('btn3');
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/components/modal.scss';
</style>