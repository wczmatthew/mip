<!--  -->
<template lang='html'>
  <w-container show-header show-back>
    <!-- 顶部栏 -->
    <template #header-mid>
      {{ $route.query.title || '邀请有礼'}}
    </template>
    <template #header-right>
      <div class="header-right" @click="onShare()">
        <i class="iconfont icon-share"></i>
      </div>
    </template>
    <!-- 顶部栏 end -->
    <!-- 正文内容 -->
    <div class="logo">
      <img src="~@/assets/common/logo.png" alt="">
    </div>

    <p class="logo-title">
      智慧能源解决方案供应商
    </p>

    <img :src="erweima" alt="" class="erweima">

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
    this.$store.dispatch('user/getErweima');
  },
  computed: {
    ...mapGetters('user', {
      erweima: 'erweima',
    }),
  },
  components: {},
  methods: {
    onShare() {
      try {
        // eslint-disable-next-line
        native_listen('share', { userid: Utils.getUserId(this) , key: Utils.getLocalStorageItem('marketKey', true) });
      } catch (error) {
        // console.log('error: ', error);
      }
    },
  },
};
</script>
<style lang="scss" scoped>

.w-container {
  background: #fff;
}
.logo {
  margin: 0 auto;
  margin-top: 15vh;
  width: 50%;
  min-width: .3rem;
  min-height: .3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
  }
}

.logo-title {
  text-align: center;
  line-height: .2rem;
  color: $color-grey;
  font-weight: 700;
  font-size: 12px;
  margin-top: .05rem;
  margin-bottom: 5vh;
}

.erweima {
  width: 50%;
  display: block;
  margin-top: .3rem;
  margin: 0 auto;
}

</style>