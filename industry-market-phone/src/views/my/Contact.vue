<!-- 联系我们 -->
<template lang='html'>
  <w-container show-header show-back>
    <!-- 顶部栏 -->
    <template #header-mid>
      {{ $route.query.title || '联系我们'}}
    </template>
    <!-- 顶部栏 end -->
    <div v-if="role == manager">
      <!-- 老板界面 -->
      <div class="logo">
        <img src="~@/assets/common/logo.png" alt="">
      </div>

      <p class="logo-title">
        渠道信息化支持团队
      </p>

      <p class="contact-title">
        服务时间: 法定工作日 8:00 ~ 16:30
      </p>

      <p class="contact-title">
        日常运维咨询
      </p>
      <w-img :src="contactData.headImg" class="contact-img"></w-img>
      <p class="contact-title">
        {{contactData.name}}
      </p>
      <a :href="'tel:'+contactData.phone" class="tel">
        <i class="iconfont icon-kefu"></i>
        {{contactData.phone}}
        <template v-if="contactData.shortTel">
          转 {{contactData.shortTel}}
        </template>
      </a>

      <!-- <p class="contact-title">
        非服务时间运维咨询: {{contactData.name}}
      </p>
      <w-img :src="contactData.headImg" class="contact-img"></w-img>
      <a href="tel:13777777777" class="tel">
        <i class="iconfont icon-kefu"></i>
        {{contactData.phone}}
      </a> -->


      <button class="gradient-blue-btn concat-btn" @click="toContact()">留言</button>
    </div>
    <div v-else>
      <!-- 非管理员/老板界面 -->
      <div class="logo" style="width: 20%">
        <img src="~@/assets/logo2.png" alt="">
      </div>

      <p class="logo-title">
        {{ companyName }}
      </p>

      <p class="contact-title">
        服务时间: 法定工作日 8:00 ~ 16:00
      </p>

      <p class="contact-title" style="margin-top: .3rem">
        售前/售后咨询:
      </p>
      <a href="tel:4008177777" class="tel">
        <i class="iconfont icon-kefu"></i>
        400 817 7777
      </a>

      <p class="contact-title">
        平台应用运维咨询:
      </p>
      <a href="tel:13777777777" class="tel">
        <i class="iconfont icon-kefu"></i>
        13777777777 转 709377
      </a>
    </div>
  </w-container>
</template>
<script>
import { mapGetters } from 'vuex';
import { USER_ROLE } from '@/common/Constants';
import Utils from '@/common/Utils';
import service from '@/services/user.service';

export default {
  data() {
    return {
      manager: USER_ROLE.manager,
      routePath: Utils.getCurrentPath({ fullPath: this.$route.path, currentPath: 'contact' }), // 获取当前路由
      contactData: {},
    };
  },
  created() {},
  mounted() {
    if (this.role === this.manager) {
      this.getData();
    }
  },
  computed: {
    ...mapGetters('user', {
      role: 'role',
    }),
  },
  components: {},
  methods: {
    toContact() {
      this.$router.push(`${this.routePath}/feedback`);
    },
    async getData() {
      Utils.showLoading();
      const result = await service.getOperationsPhone({ userid: Utils.getUserId(this) });
      if (!result) return;
      Utils.hideLoading();
      this.contactData = result || {};
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/components/button.scss';
.w-container {
  background: #fff;
}

.concat-btn {
  width: 50%;
  font-size: 16px;
  margin-top: .2rem;
}

.contact-img {
  width: 20%;
  display: block;
  margin: .1rem auto 0;
}

.logo {
  margin: 0 auto;
  margin-top: 5vh;
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

.contact-title {
  text-align: center;
  padding: 0 .12rem;
  line-height: 1.2;
  font-size: 16px;
  margin-top: .2rem;
}

.tel {
  margin: .1rem auto;
  border: 1px solid $color-blue;
  color: $color-blue;
  width: fit-content;
  min-height: .25rem;
  border-radius: .25rem;
  @include flex-center;
  font-size: 16px;
  padding: .05rem .1rem;
  max-width: 80%;
  @include break-word;

  .iconfont {
    margin-right: .1rem;
    font-size: 20px;
  }
}

</style>