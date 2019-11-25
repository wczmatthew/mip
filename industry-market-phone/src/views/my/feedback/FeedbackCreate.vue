<!-- 留言 -->
<template lang='html'>
  <w-container show-header show-back show-footer>
    <!-- 顶部栏 -->
    <template #header-mid>
      留言
    </template>
    <template #header-right>
      <div class="header-right">
      </div>
    </template>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <form autocomplete="off">
      <div class="w-tableview">
        <!-- <div class="cell">
          <span class="title">
            姓名
          </span>
          <w-input type="text" class="desc" placeholder="请输入姓名" v-model.trim="name"/>
        </div> -->

        <div class="cell">
          <span class="title">
            QQ
          </span>
          <w-input type="text" class="desc" placeholder="请输入QQ" v-model.trim="qq"/>
        </div>

        <div class="cell">
          <span class="title">
            标题
          </span>
          <w-input type="text" class="desc" placeholder="请输入标题" v-model.trim="title"/>
        </div>

        <div class="cell textarea-cell">
          <span class="title">
            描述
          </span>
          <div class="desc" style="padding: .05rem 0;">
            <cube-textarea placeholder="请输入描述" :maxlength="200" v-model="content" @blur="onBlur()"></cube-textarea>
          </div>
        </div>

      </div>

    </form>
    <!-- 正文内容 end -->
    <button slot="w-footer" class="bottom-btn gradient-blue-btn" @click="onConfirm()">
      提交
    </button>
  </w-container>
</template>
<script>
import { mapGetters } from 'vuex';
import Utils from '@/common/Utils';
import service from '@/services/user.service';

export default {
  data() {
    return {
      content: '', // 描述
      qq: '',
      name: '',
      title: '',
    };
  },
  created() {},
  mounted() {},
  computed: {
    ...mapGetters('user', {
      userData: 'userData',
    }),
  },
  components: {},
  methods: {
    onBlur() {
      Utils.resetWindowScrollTop(document.documentElement.clientHeight);
    },
    async onConfirm() {
      if (!this.qq) {
        Utils.showToast('请输入qq');
        return;
      }

      if (!this.title) {
        Utils.showToast('请输入标题');
        return;
      }

      if (!this.content) {
        Utils.showToast('请输入描述');
        return;
      }

      Utils.showLoading();
      const result = await service.submitFeedback({
        loginName: this.userData.loginName,
        problem: this.content,
        title: this.title,
        qq: this.qq,
      });
      if (!result) return;
      Utils.showToast('留言成功');
      this.$router.back();
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/components/button.scss';
.w-tableview .cell textarea.desc {
  border: 0;
  height: .5rem;
  background-color: transparent;
  resize: none;
  margin: .08rem 0;
}
</style>