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

      <div class="row1 w-underline">
        <span class="name">
          {{ feedback.acceptPerson }}
        </span>
        <span class="status">
          {{ feedback.finnishFlagName }}
        </span>
      </div>

      <div class="title">
        {{ feedback.problemTitle }}
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

export default {
  data() {
    return {
    };
  },
  created() {},
  mounted() {
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
.w-container {
  background: #fff;
}

.feedback-card {
  width: 100%;
  background: #fff;
  padding: 0 $spacing-lr;
  border-radius: .05rem;
  padding-top: .1rem;

  .row1 {
    display: flex;
    justify-content: space-between;
    @include text-ellipsis;
    padding: .1rem 0;
    color: $color-grey-6;
    margin-bottom: .1rem;

    .status {
      color: $color-blue;
    }
  }

  .title {
    padding: .1rem 0;
    font-size: 16px;
    text-align: center;
    margin-bottom: .1rem;
  }

  .content {
    @include break-word;
  }
}
</style>