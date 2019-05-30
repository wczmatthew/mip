<!-- 编辑客户 -->
<template lang='html'>
  <w-container show-header show-back>
    <!-- 顶部栏 -->
    <div slot="header-mid">
      编辑客户信息
    </div>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <customer-form></customer-form>
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
</style>