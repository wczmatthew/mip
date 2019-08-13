<!-- 新增收货地址 -->
<template lang='html'>
  <w-container show-header show-back show-footer>
    <!-- 顶部栏 -->
    <div slot="header-mid">
      编辑收货地址
    </div>
    <div class="header-right" slot="header-right">
    </div>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <address-form ref="addressForm"></address-form>
    <!-- 正文内容 end -->

    <button class="bottom-btn gradient-btn" slot="w-footer" @click="onConfirm()">
      编辑收货地址
    </button>
  </w-container>
</template>
<script>
import Utils from '@/common/Utils';
import { mapGetters } from 'vuex';
import AddressForm from './components/AddressForm.vue';
import service from '@/services/product.service';

export default {
  data() {
    return {
      loading: false,
      addressData: null,
    };
  },
  created() {},
  mounted() {},
  computed: {
    ...mapGetters('address', {
      selectAddress: 'selectAddress',
    }),
  },
  components: {
    AddressForm,
  },
  methods: {
    async getData() {
      Utils.showLoading();
      const result = await service.getBanner({ userid: Utils.getUserId(this) });
      if (!result) return;
      Utils.hideLoading();
      this.addressData = result;
    },
    onConfirm() {
      if (this.loading) return;

      const formData = this.$refs.addressForm.validForm();
      if (!formData.isValid) return;
      this.loading = true;
      formData.id = this.addressData.id;

      // 请求数据

      if (this.selectAddress && this.selectAddress.id === this.addressData.id) {
        // 编辑的是选中的地址
        this.$store.commit('address/updateSelectAddress', formData);
      }

      this.loading = false;
      Utils.showToast('编辑收货地址成功');
      this.$router.back();
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/components/button.scss';
</style>