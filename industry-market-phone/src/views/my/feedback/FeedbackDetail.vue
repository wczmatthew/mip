<!-- 留言 -->
<template lang='html'>
  <w-container show-header show-back show-footer>
    <!-- 顶部栏 -->
    <template #header-mid>
      留言详情
    </template>
    <template #header-right>
      <div class="header-right">
      </div>
    </template>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <div class="feedback-card">

      <div class="title">
        标题: {{ feedback.problemTitle }}
      </div>

      <div class="row1 w-underline">
        <span class="name">
          处理人: {{ feedback.acceptPerson }}
        </span>
        <!-- <span class="name">
          {{ feedback.handleTime | dateFormat }}
        </span> -->
        <span class="status">
          {{ feedback.statusName }}
        </span>
      </div>

      <div class="content">
        {{ feedback.problem }}
      </div>
    </div>
    <!-- 正文内容 end -->
  </w-container>
</template>
<script>
import { mapGetters } from 'vuex';
import Utils from '@/common/Utils';

export default {
  data() {
    return {
    };
  },
  created() {},
  mounted() {
  },
  filters: {
    dateFormat(val) {
      if (!val) return '';
      return Utils.dateFormat(new Date(val), 'yyyy-MM-dd HH:mm:ss');
    },
  },
  computed: {
    ...mapGetters('user', {
      feedback: 'feedback',
    }),
  },
  components: {},
  methods: {
  },
};
</script>
<style lang="scss" scoped>

.feedback-card {
  width: 100%;
  background: #fff;
  padding: 0 $spacing-lr;
  border-radius: .05rem;
  padding-top: .1rem;
  padding-bottom: .2rem;

  .row1 {
    display: flex;
    justify-content: space-between;
    @include text-ellipsis;
    padding: .1rem 0;
    color: $color-grey;
    margin-bottom: .1rem;

    .status {
      color: $color-blue;
    }
  }

  .title {
    padding: .1rem 0 0;
    font-size: 16px;
  }

  .content {
    @include break-word;
  }
}
</style>