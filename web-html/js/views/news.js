$(function() {
  // 初始化分页 -- 具体api http://www.jq22.com/yanshi5697
  $(".M-box3").pagination({
    pageCount: 50,
    current: 1,
    jump: true,
    showData: 5,
    coping: true,
    callback: function (api) {
      // console.log(api);
      var currentPage = api.getCurrent();
      console.log('currentPage: ', currentPage);

      // 模拟ajax请求
      updateNewsData();
    }
  });
});

// 查看新闻详情
function toNews(id) {
  console.log('to news: ', id);
  // window.location.href = '' + id;
}

// 更新新闻列表数据
function updateNewsData() {
  $(".news-list .w-loading-mid").show();
  setTimeout(function() {
    // 列表形式的新闻列表
    updateGridNews();

    // 新闻列表
    $('#newList').empty();
    for (var i = 0; i < 8; i++) {
      var data = {
        title: '2018年度培训年会及培训总结表彰大会' + (Math.random() * 10).toFixed(0),
        content: '2019年1月17日，正泰电器股份公司“2018年度培训年会及培训总结表彰大会”于温州科技楼三楼报告厅隆重召开。在大会上，颁授并表彰了21位新晋内训师聘书，表彰了“年度十佳内训师”，4位年度优秀培训管理员，4家年度优秀学习单位，6门“金牌课程”。',
        time: '2019-04-02',
        id: i + 1,
      };
      $('#newList').append(
        '<div class="item hvr-sweep-to-right" onclick="toNews(\''+data.id+'\')">'+
        '  <div class="left">'+
        '    <p>'+ dataFormat(data.time, 'yyyy') +'</p>'+
        '    <p class="desc">'+ dataFormat(data.time, 'MM-dd') +'</p>'+
        '  </div>'+
        '  <div class="detail">'+
        '    <p class="title">' + data.title + '</p>'+
        '    <p class="desc">' + data.content + '</p>'+
        '  </div>'+
        '</div>'
      );
    }

    $(".news-list .w-loading-mid").hide();
  }, 300);
}

/**
 * 动态列表 换一换
 */
function updateGridNews() {
  // 这里做ajax请求
  // 模拟数据
  // 显示loading
  showLoading('dynamicList');
  
  var data = [
    {
      title: '辽宁省政协主席夏德仁调研正泰' + (Math.random() * 100 ).toFixed(0),
      desc: '4月25日下午，辽宁省政协主席夏德仁率队到访正泰杭州滨江园区，就民营企业发展情况进行深入调研。正在参观正泰杭州滨江园区生产流水线',
      imgPath: '../assets/home/img1.jpg',
      id: 11,
    },
    {
      title: '辽宁省政协主席夏德仁调研正泰' + (Math.random() * 100 ).toFixed(0),
      desc: '4月25日下午，辽宁省政协主席夏德仁率队到访正泰杭州滨江园区，就民营企业发展情况进行深入调研。正在参观正泰杭州滨江园区生产流水线',
      id: 1,
    },
    {
      title: '辽宁省政协主席夏德仁调研正泰' + (Math.random() * 100 ).toFixed(0),
      desc: '4月25日下午，辽宁省政协主席夏德仁率队到访正泰杭州滨江园区，就民营企业发展情况进行深入调研。正在参观正泰杭州滨江园区生产流水线',
      imgPath: '../assets/home/img2.jpg',
      id: 1,
    },
    {
      title: '辽宁省政协主席夏德仁调研正泰' + (Math.random() * 100 ).toFixed(0),
      desc: '4月25日下午，辽宁省政协主席夏德仁率队到访正泰杭州滨江园区，就民营企业发展情况进行深入调研。正在参观正泰杭州滨江园区生产流水线',
      id: 1,
    },
    {
      title: '辽宁省政协主席夏德仁调研正泰' + (Math.random() * 100 ).toFixed(0),
      desc: '4月25日下午，辽宁省政协主席夏德仁率队到访正泰杭州滨江园区，就民营企业发展情况进行深入调研。正在参观正泰杭州滨江园区生产流水线',
      id: 1,
    },
    {
      title: '辽宁省政协主席夏德仁调研正泰' + (Math.random() * 100 ).toFixed(0),
      desc: '4月25日下午，辽宁省政协主席夏德仁率队到访正泰杭州滨江园区，就民营企业发展情况进行深入调研。正在参观正泰杭州滨江园区生产流水线',
      id: 1,
    },
  ];


  $("#dynamicList .col1").empty().append(
    '<div class="img">' +
    '  <img src="'+data[0].imgPath+'" alt="">' +
    '</div>' +
    '<div class="detail">' +
    '  <p class="title">' + data[0].title + '</p>' +
    '  <p class="desc">' + data[0].desc + '</p>' +
    '</div>'
  );
  $("#dynamicList .col1").attr('onclick', 'toNews(\''+data[0].id+'\')');

  $("#dynamicList .col2").empty();
  for (var i = 1; i < data.length; i++) {
    var item = data[i];
    var imgs = '';
    if (i == 2) {
      imgs = 
      '<div class="img">'+
        '<img src="'+item.imgPath+'" alt="">'+
      '</div>';
    }

    var itemClass = '';
    if (i == 3 || i == 4) {
      itemClass = 'bg-white';
    }

    if (i == 4) {
      itemClass += ' item-2';
    }
    $("#dynamicList .col2").append(
      '<div class="item hvr-bob '+itemClass+'" onclick="toNews(\''+item.id+'\')">'+
      imgs +
      '  <div class="detail">'+
      '    <p class="title">'+ item.title + '</p>'+
      '    <p class="desc">'+ item.desc + '</p>'+
      '  </div>'+
      '</div>'
    );
  }

  // 模拟请求
  setTimeout(() => {
    hideLoading('dynamicList');
  }, 300);
}