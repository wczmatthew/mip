<!-- 数量模态窗 -->
<template lang='html'>
  <transition name="bounce">
    <div class="modal-container" v-show="isShow" @click="onClose()">
      <!-- 窗体 -->
      <div class="modal" @click.stop="stopProp()">
        <!-- 顶部标题 -->
        <div class="modal-title">
          请输入数量
        </div>
        <!-- 顶部标题 end -->

        <!-- 关闭按钮 -->
        <div class="close" @click.stop="onClose()">
          <i class="iconfont icon-close"></i>
        </div>
        <!-- 关闭按钮 end -->

        <!-- 显示内容 -->
        <div class="modal-content">
          <div class="nums">
            <i class="iconfont icon-circle-reduce" @click.stop="onReduce()"></i>
            <w-input type="number" v-model="number"/>
            <i class="iconfont icon-circle-add" @click.stop="onAdd()"></i>
          </div>
        </div>
        <!-- 显示内容 end -->

        <!-- 按钮区域 -->
        <div class="modal-bottom">
          <button type="button" class="cancle" @click.stop="onCancle()">
            取消
          </button>
          <button type="button" class="confirm" @click.stop="onConfirm()">
            确定
          </button>
        </div>
        <!-- 按钮区域 end -->

      </div>
      <!-- 窗体 end -->
    </div>
  </transition>
</template>
<script>
import Utils from '@/common/Utils';

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
      number: 1,
    };
  },
  created() {},
  mounted() {},
  components: {},
  methods: {
    // 阻止冒泡方法
    stopProp() {},
    onReduce() {
      if (this.number <= 1) return;
      this.number -= 1;
    },
    onAdd() {
      this.number += 1;
    },
    /**
     * 显示modal
     * @param callback 按钮回调
     * @param shadowClose 点击阴影是否可以关闭
     * @param number 数量
     */
    show({ number, callback, shadowClose }) {
      // this.title = title || '';
      // this.content = content || '';
      // this.confirmTxt = confirmTxt || '确定';
      // this.cancleTxt = cancleTxt || '取消';
      this.number = number || 1;
      this.callback = callback;
      this.shadowClose = shadowClose || false;
      this.isShow = true;
    },
    onCancle() {
      this.isShow = false;
      this.callback && this.callback('cancle');
    },
    onClose() {
      this.isShow = false;
      this.callback && this.callback('close');
    },
    // 点击确定
    onConfirm() {
      if (!Utils.checkNum(this.number)) {
        Utils.showToast('请输入正整数');
        return;
      }

      this.isShow = false;
      this.callback && this.callback('confirm', this.number);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/components/modal.scss';

.nums {
  width: 80%;
  margin: 0 auto;
  height: .3rem;
  border: 1px solid $color-line;
  display: flex;
  overflow: hidden;
  border-radius: .3rem;

  .iconfont {
    color: $color-default;
    flex-shrink: 0;
    width: .3rem;
    font-size: .3rem;
    line-height: 1;
  }

  input {
    flex: 1;
    display: block;
    overflow: hidden;
    text-align: center;
  }
}
</style>