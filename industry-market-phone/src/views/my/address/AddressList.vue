<!-- 收货地址 -->
<template lang='html'>
  <w-container show-header show-back>
    <!-- 顶部栏 -->
    <template #header-mid>
      收货地址
    </template>
    <!-- 顶部栏 end -->

    <Address :current-path="routePath" ref="address"></Address>
  </w-container>
</template>
<script>
import Utils from '@/common/Utils';
import Address from './components/Address.vue';

export default {
  data() {
    return {
      routePath: Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'address' }),
    };
  },
  created() {
  },
  mounted() {
    this.$refs.address && this.$refs.address.getData();
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