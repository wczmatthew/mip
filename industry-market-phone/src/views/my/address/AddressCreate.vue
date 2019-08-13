<!-- 新增收货地址 -->
<template lang='html'>
  <w-container show-header show-back show-footer>
    <!-- 顶部栏 -->
    <div slot="header-mid">
      新增收货地址
    </div>
    <div class="header-right" slot="header-right">
    </div>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <address-form ref="addressForm"></address-form>
    <!-- 正文内容 end -->

    <button class="bottom-btn gradient-btn" slot="w-footer" @click="onConfirm()">
      新增收货地址
    </button>
  </w-container>
</template>
<script>
import Utils from '@/common/Utils';
import AddressForm from './components/AddressForm.vue';

export default {
  data() {
    return {
      loading: false,
    };
  },
  created() {},
  mounted() {},
  components: {
    AddressForm,
  },
  methods: {
    onConfirm() {
      if (this.loading) return;
      const formData = this.$refs.addressForm.validForm();
      if (!formData.isValid) return;
      this.loading = true;

      // 请求数据

      this.loading = false;
      Utils.showToast('新增收货地址成功');
      this.$router.back();
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/components/button.scss';
</style>