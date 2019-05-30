<!-- 新增客户 -->
<template lang='html'>
  <w-container show-header show-back>
    <!-- 顶部栏 -->
    <div slot="header-mid">
      新增客户信息
    </div>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <customer-form>
      <button class="blue-btn">
        新增客户
      </button>
    </customer-form>
    <!-- 正文内容 end -->

  </w-container>
</template>
<script>
import CustomerForm from './components/CustomerForm.vue';

export default {
  data() {
    return {
    };
  },
  created() {},
  mounted() {},
  components: {
    CustomerForm,
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
@import '~@/styles/components/button.scss';

.blue-btn {
  width: 1.5rem;
  height: .3rem;
  border-radius: .3rem;
  position: fixed;
  bottom: .1rem;
  left: 50%;
  margin-left: -.75rem;
  font-size: .14rem;
}
</style>