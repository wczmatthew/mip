<!-- 无数据页面 -->
<template lang='html'>
  <div class="no-data">
    <i class="iconfont icon-no-data"></i>
    <p>{{desc}}</p>
  </div>
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
      default: '暂无数据',
    },
  },
};
</script>
<style lang="scss" scoped>
.icon-no-data {
  font-size: .5rem;
  text-align: center;
  width: 100%;
  display: block;
  color: #999;
  margin-bottom: .1rem;
  margin-top: .1rem;
}
</style>