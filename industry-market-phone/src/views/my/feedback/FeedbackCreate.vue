<!-- 留言 -->
<template lang='html'>
  <w-container show-header show-back>
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
        <div class="cell">
          <span class="title">
            姓名
          </span>
          <w-input type="text" class="desc" placeholder="请输入姓名" v-model.trim="name"/>
        </div>

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
          <w-input type="text" class="desc" placeholder="请输入QQ" v-model.trim="title"/>
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
    <template #w-footer>
      <button class="bottom-btn blue-btn">
        提交
      </button>
    </template>
  </w-container>
</template>
<script>
import Utils from '@/common/Utils';

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
  components: {},
  methods: {
    onBlur() {
      Utils.resetWindowScrollTop(document.documentElement.clientHeight);
    },
  },
};
</script>
<style lang="scss" scoped>
.w-tableview .cell textarea.desc {
  border: 0;
  height: .5rem;
  background-color: transparent;
  resize: none;
  margin: .08rem 0;
}
</style>