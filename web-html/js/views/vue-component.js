Vue.component('chint-header', {
  data: function () {
    return {
    }
  },
  methods: {
    showLogin: function() {
      // console.log('show login');
      showLoginModal();
    },
    showRegist: function() {
      console.log('show regist');
    },
    onSearch: function() {
      console.log('show onSearch');
    },
    toHelp: function() {
      window.location.href = 'help.html';
    },
  },
  props: {
    index: {
      type: Number,
      default: -1,
    },
  },
  template: 
  '<div class="top-nav">'+
  '  <div class="row-1">'+
  '    <div class="w-container">'+
  '      <div class="left">'+
  '        <i class="iconfont icon-category"></i>'+
  '        采购云'+
  '      </div>'+

  '      <ul class="right">'+
  '        <li>'+
  '          中国站'+
  '          <i class="iconfont icon-triangle-down"></i>'+
  '        </li>'+
  '        <li @click="toHelp()">'+
  '          帮助'+
  '        </li>'+
  '        <li @click="showLogin()">'+
  '          登录'+
  '        </li>'+
  '        <li @click="showRegist()">'+
  '          注册'+
  '        </li>'+
  '      </ul>'+
  '    </div>'+
  '  </div>'+
  '  <div class="w-container">'+
  '    <header class="header">'+
  '      <img src="../assets/common/logo.jpg" alt="" class="logo">'+
  '      <nav class="mid">'+
  '        <a href="index.html" class="item" :class="{actived: index == 0}">'+
  '          首页'+
  '        </a>'+
  '        <a href="inviteBids.html" class="item" :class="{actived: index == 1}">'+
  '          采购中心'+
  '        </a>'+
  '        <a href="news.html" class="item" :class="{actived: index == 2}">'+
  '          采购动态'+
  '        </a>'+
  '        <a href="help.html" class="item" :class="{actived: index == 3}">'+
  '          帮助中心'+
  '        </a>'+
  // '        <a href="service" class="item" :class="{actived: index == 3}">'+
  // '          服务监督'+
  // '        </a>'+
  '      </nav>'+

  '      <div class="search">'+
  '        <input type="text" @click.enter="onSearch()">'+
  '        <i class="iconfont icon-search"></i>'+
  '      </div>'+
  '    </header>'+
  '  </div>'+
  '</div>'
});

Vue.component('chint-footer', {
  data: function () {
    return {
      selectList: [
        { link: 'http://www.chint.com/zh/', title: '正泰集团股份有限公司' },
        { link: 'http://www.chintelectric.com/', title: '浙江正泰电器股份有限公司' },
        { link: 'http://www.chintelectric.com/', title: '正泰电气股份有限公司' },
        { link: 'http://www.chintelc.com/', title: '浙江正泰建筑电器有限公司' },
        { link: 'http://energy.chint.com', title: '浙江正泰新能源开发有限公司' },
        { link: 'http://www.chintim.com/', title: '浙江正泰仪器仪表有限责任公司' },
        { link: 'http://eiot.chint.com', title: '浙江正泰聚能科技有限公司' },
        { link: 'http://energy.chint.com/index.php/dweller/index.html', title: '浙江正泰安能电力系统工程有限公司' },
        { link: 'http://www.zjtyd.com', title: '浙江泰易达物流科技有限公司' },
        { link: 'http://www.simbatt.com/', title: '上海新池能源科技有限公司' },
        { link: 'http://www.astronergy.com/', title: '浙江正泰太阳能科技有限公司' },
        { link: 'http://www.chitic.com/', title: '浙江正泰中自控制工程有限公司' },
        { link: 'http://www.xinhuagroup.com/', title: '上海新华控制技术(集团)有限公司' },
        { link: 'http://www.seari.com.cn/', title: '上海电科电器科技有限公司' },
        { link: 'http://www.noark.cn/', title: '上海诺雅克电气有限公司' },
        { link: 'http://www.chintcable.com', title: '浙江正泰电缆有限公司' },
      ]
    }
  },
  mounted: function() {
    /*pc-底部*/
    $('.footer-select').click(function(){
      $(this).find('.icon-triangle-down').removeClass('icon-triangle-down').addClass('icon-triangle-up');
      $('ul',this).slideToggle()
    });
    $('.footer-select').mouseleave(function(){
      $(this).find('.icon-triangle-up').removeClass('icon-triangle-up').addClass('icon-triangle-down');
      $('ul',this).slideUp();
    });
  },
  methods: {
  },
  template: 
  '<footer>'+
  '  <div class="w-container web-footer">'+
  '    <div class="left">'+
  '      <i class="iconfont icon-call"></i>'+
  '      <div class="detail">'+
  '        <p>云上服务热线</p>'+
  '        <p><b>137-77777777</b></p>'+
  '        <p><b>0577-62877777</b></p>'+
  '        <a href="">采购咨询</a>'+
  '        <a href="">备案服务</a>'+
  '        <a href="">云市场咨询</a>'+
  '      </div>'+
  '    </div>'+
  '    <div class="right">'+
  '      <div class="detail">'+
  '        <p>关于采购云</p>'+
  '        <a href="">了解正泰采购云</a>'+
  '        <a href="">联系我们</a>'+
  '      </div>'+
  '      <div class="detail">'+
  '        <p>友情链接</p>'+
  '        <a href="">正泰天猫商城</a>'+
  '        <a href="">正泰京东商城</a>'+
  '      </div>'+
  '      <div class="detail">'+
  '        <p>正泰网站群</p>'+
  '        <div class="footer-select">'+
  '          <div class="footer_link">'+
  '            <p>正泰集团 <i class="iconfont icon-triangle-down"></i></p>'+
  '            <ul>'+
  '              <li v-for="(item, index) in selectList" :key="index">'+
  '                <a target="_blank" :href="item.link" :title="item.title">'+
  '                  {{item.title}}'+
  '                </a>'+
  '              </li>'+
  '            </ul>'+
  '          </div>'+
  '        </div>'+
  '        <div class="link-list">'+
  '          <a title="分享到新浪微博" class="bds_tsina" data-cmd="tsina">'+
  '            <i class="iconfont icon-weibo"></i>'+
  '          </a>'+
  '          <a title="分享到QQ空间" class="bds_qzone" data-cmd="qzone">'+
  '            <i class="iconfont icon-qqkongjian"></i>'+
  '          </a>'+
  '          <a title="分享到微信" class="bds_weixin" data-cmd="weixin">'+
  '            <i class="iconfont icon-weixin"></i>'+
  '          </a>'+
  '          <a title="邮件订阅" href="http://www.chint.com/zh/index.php/rss/index/type/1.html" class="bds_dingyue">'+
  '            <i class="iconfont icon-dingyue"></i>'+
  '          </a>'+
  '        </div>'+
  '      </div>'+
  '      <div class="code-detail">'+
  '        <div class="code-view hvr-float">'+
  '          <img src="http://www.chint.com/zh/upload/data/201602-26/172603640625003039.jpg" alt="">'+
  '          <p>官方订阅号</p>'+
  '        </div>'+
  '        <div class="code-view hvr-float">'+
  '          <img src="http://www.chint.com/zh/upload/data/201602-26/172539703125009835.jpg" alt="">'+
  '          <p>官方服务号</p>'+
  '        </div>'+
  '      </div>'+
  '    </div>'+
  '  </div>'+
  '</footer>'
});