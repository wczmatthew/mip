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
          <button type="button" class="cancle" @click.stop="onCancle()">{{cancleTxt}}</button>
          <button type="button" class="confirm" @click.stop="onConfirm()">{{confirmTxt}}</button>
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
      confirmTxt: '确定',
      cancleTxt: '取消',
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
     * @param confirmTxt 确定按钮文字
     * @param cancleTxt 取消按钮文字
     * @param callback 按钮回调
     * @param shadowClose 点击阴影是否可以关闭
     * @param showBtns 是否显示底部按钮
     */
    show({ title, content, confirmTxt, cancleTxt, callback, shadowClose, showBtns }) {
      this.title = title || '';
      this.content = content || '';
      this.confirmTxt = confirmTxt || '确定';
      this.cancleTxt = cancleTxt || '取消';
      this.callback = callback;
      this.shadowClose = shadowClose || true;
      this.showBtns = showBtns === undefined ? true : showBtns;
      this.isShow = true;
    },
    onCancle() {
      this.isShow = false;
      this.callback && this.callback('cancle');
    },
    onShadowClose() {
      if (!this.shadowClose) return;
      this.onClose();
    },
    onClose() {
      this.isShow = false;
      this.callback && this.callback('close');
    },
    // 点击确定
    onConfirm() {
      this.isShow = false;
      this.callback && this.callback('confirm');
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/components/modal.scss';
</style>