<!--  -->
<template lang='html'>
  <w-container show-header show-back>
    <!-- 顶部栏 -->
    <div slot="header-mid">
      订单管理
    </div>
    <div class="header-right" :class="{'color-blue': isEdit }" slot="header-right" @click="onEdit()">
      {{ isEdit ? '完成' : '管理' }}
    </div>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <orders :current-path="routePath" ref="order"></orders>
    <!-- 正文内容 end -->
  </w-container>
</template>
<script>
import Utils from '@/common/Utils';
import Orders from './components/Orders.vue';

export default {
  data() {
    return {
      routePath: Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'order' }),
      isEdit: false,
    };
  },
  created() {},
  mounted() {
  },
  computed: {},
  components: {
    Orders,
  },
  methods: {
    onEdit() {
      this.isEdit = !this.isEdit;
      this.$refs.cart.onEdit(this.isEdit);
    },
  },
  props: {},
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variable.scss';
.header-right {
  font-size: .12rem;
  color: $color-grey;
}

.color-blue {
  color: $color-blue;
}
</style>