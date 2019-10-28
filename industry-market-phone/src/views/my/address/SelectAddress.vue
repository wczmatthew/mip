<!-- 客户列表 -->
<template lang='html'>
  <w-container show-header show-back>
    <!-- 顶部栏 -->
    <template #header-mid>
      选择收货地址
    </template>
    <!-- 顶部栏 end -->

    <Address :current-path="routePath" is-select ref="address"></Address>
  </w-container>
</template>
<script>
import { mapGetters } from 'vuex';
import Utils from '@/common/Utils';
import Address from './components/Address.vue';

export default {
  data() {
    return {
      routePath: Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'selectAddress' }),
    };
  },
  created() {
  },
  mounted() {
    this.$refs.address && this.$refs.address.getData();
  },
  computed: {
    ...mapGetters('address', {
      selectAddress: 'selectAddress',
    }),
  },
  components: {
    Address,
  },
  methods: {
  },
};
</script>
<style lang="scss" scoped>
</style>