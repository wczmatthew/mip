$(function() {
  // 初始化分页 -- 具体api http://www.jq22.com/yanshi5697
  $(".M-box3").pagination({
    pageCount: 50,
    current: 1,
    showData: 5,
    coping: true,
    jump: true,
    callback: function (api) {
      // console.log(api);
      var currentPage = api.getCurrent();
      console.log('currentPage: ', currentPage);

      // 模拟ajax请求
      updateData();
    }
  });
});

// 查看新闻详情
function toNews(id) {
  console.log('to news: ', id);
  // window.location.href = '' + id;
}

// 更新列表数据
function updateData() {
  showLoading('bidList');
  setTimeout(function() {
    // 更新列表数据
    $('#bidList').empty();
    for (var i = 0; i < 8; i++) {
      var data = {
        title: '正泰新能源2019年高性能电池及模组项目招标公告' + (Math.random() * 10).toFixed(0),
        fileList: [
          { title: '正泰新能源2019年高性能电池及模组项目招标公告1.doc', downloadurl: '', previewUrl: '' },
          { title: '正泰新能源2019年高性能电池及模组项目招标公告2.doc', downloadurl: '', previewUrl: '' },
        ],
        time: '2019-04-02 ~ 2019-04-22',
        logo: '../assets/inviteBids/logo.png',
        type: '信息类',
        id: i + 1,
        valid: i % 2 == 0, // 是否可报名
      };

      var fileHtml = '';
      for (var j = 0; j < data.fileList.length; j++) {
        var file = data.fileList[j];
        fileHtml += '<div class="file">'+
        '  <span>'+
        '    <i class="iconfont icon-file"></i>'+
        '    '+ file.title +
        '  </span>'+
        '  <a href="'+ file.downloadurl +'">下载</a>'+
        '  <a href="'+ file.previewUrl +'">预览</a>'+
        '</div>';
      }

      if (data.valid) {
        // 可以报名
        $('#bidList').append(
          '<div class="card">'+
          '  <div class="header"></div>'+
          '  <div class="bids-item">'+
          '    <div class="img">'+
          '      <img src="'+ data.logo +'" alt="">'+
          '    </div>'+
          '    <div class="detail">'+
          '      <p class="title">'+ data.title +'</p>'+
          '      '+ fileHtml +
          '      <div class="bottom">'+
          '        <div class="tips">'+
          '          <span>'+
          '            <i class="iconfont icon-fenlei"></i>'+
          '            '+ data.type +
          '          </span>'+
          '          <span>'+
          '            <i class="iconfont icon-clock"></i>'+
          '            '+ data.time +
          '          </span>'+
          '        </div>'+
          '        <button class="yellow-btn" onclick="onApply(\''+data.id+'\')">立即报名</button>' +
          '      </div>'+
          '    </div>'+
          '  </div>'+
          '</div>'
        );
      } else {
        // 不可报名
        $('#bidList').append(
          '<div class="card card2">'+
          '  <div class="bids-item">'+
          '    <div class="img">'+
          '      <img src="'+ data.logo +'" alt="">'+
          '    </div>'+
          '    <div class="detail">'+
          '      <p class="title">'+ data.title +'</p>'+
          '      '+ fileHtml +
          '      <div class="bottom">'+
          '        <div class="tips">'+
          '          <span>'+
          '            <i class="iconfont icon-fenlei"></i>'+
          '            '+ data.type +
          '          </span>'+
          '          <span>'+
          '            <i class="iconfont icon-clock"></i>'+
          '            '+ data.time +
          '          </span>'+
          '        </div>'+
          '      </div>'+
          '    </div>'+
          '  </div>'+
          '</div>'
        );
      }
    }

    hideLoading('bidList');
  }, 300);
}

// 开始报名
function onApply(id) {
  console.log('报名id: ', id);
}