<!-- 模态窗 -->
<template lang='html'>
  <transition name="bounce">
    <div class="modal-container" v-show="isShow" @click="onClose()">
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
    onClose() {
      if (!this.shadowClose) return;
      this.isShow = false;
      this.callback && this.callback('cancle');
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
@import '~@/styles/variable.scss';
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  background: rgba($color: #000000, $alpha: 0.2);
  display: flex;
  align-items: center;
  justify-content: center;

  .modal {
    background: #fff;
    border-radius: .05rem;
    width: 80%;
    min-height: .3rem;
    position: relative;

    .close {
      position: absolute;
      top: 0;
      right: 0;
      width: .4rem;
      height: .4rem;
      z-index: 1;
      color: $color-grey;
      display: flex;
      justify-content: center;

      .icon-close {
        width: .2rem;
        height: .2rem;
        border-radius: .2rem;
        line-height: .2rem;
        text-align: center;
        font-size: 16px;
        margin-top: .07rem;
      }
    }

    .modal-title {
      text-align: center;
      height: .4rem;
      line-height: .4rem;
      color: $color-blue;
      font-size: 18px;
    }

    .modal-content {
      padding: .15rem .12rem .2rem;
      @include break-word;
      text-align: center;
    }

    .modal-bottom {
      display: flex;

      button {
        width: 50%;
        height: .35rem;
        border: 0;
        position: relative;

        &::after {
          content: ' ';
          position: absolute;
          top: 30%;
          right: 0;
          width: .01rem;
          height: 40%;
          background: $color-line;
        }

        &:nth-last-child()::after {
          display: none;
        }
      }

      .confirm {
        color: $color-blue;
        font-size: 16px;
      }

      .cancle {
        color: $color-grey;
        font-size: 16px;
      }
    } // end modal-bottom

  } // end modal
}

.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0.5);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>