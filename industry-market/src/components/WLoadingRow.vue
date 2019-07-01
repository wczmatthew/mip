<!-- 加载中 -->
<template lang='html'>
  <!-- 加载中 -->
  <div class="w-loading-row">
    <img src="~@/assets/loading-sm.gif" alt="">
    {{desc || '加载中~~'}}
  </div>
  <!-- 加载中 end -->
</template>
<script>
export default {
  data() {
    return {
    };
  },
  created() {},
  mounted() {},
  components: {},
  methods: {},
  props: {
    desc: {
      type: String,
      default: '加载中~~',
    },
  },
};
</script>
<style lang="scss" scoped>
</style>