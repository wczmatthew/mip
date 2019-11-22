<template lang='html'>
  <input :type="type" @blur="onBlur()" :value="value" @keyup="onChange" :placeholder="placeholder" :disabled="disabled">
</template>
<script>
import Utils from '@/common/Utils';

export default {
  data() {
    return {
    };
  },
  created() {},
  mounted() {},
  components: {},
  methods: {
    onBlur() {
      Utils.resetWindowScrollTop(document.documentElement.clientHeight);
      this.$emit('blur');
    },
    onChange(e) {
      this.$emit('change', e.target.value);
      this.$emit('keyup', e);
    },
  },
  model: {
    prop: 'value', // prop说:我要在该组件被使用(被父组件调用)时,v-model的值绑定给value
    event: 'change', // event说:我emit(触发)change的时候，参数的值就是父组件v-model收到的值。
  },
  props: {
    type: {
      type: String,
      default: 'text',
    },
    value: {
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
</style>