/**
 * 动态列表 换一换
 */
function exchangeDynamic() {
  // 这里做ajax请求
  // 模拟数据
  // 显示loading
  showLoading('dynamicList');
  
  var data = [
    {
      title: '辽宁省政协主席夏德仁调研正泰' + (Math.random() * 100 ).toFixed(0),
      desc: '4月25日下午，辽宁省政协主席夏德仁率队到访正泰杭州滨江园区，就民营企业发展情况进行深入调研。正在参观正泰杭州滨江园区生产流水线',
      imgPath: '../assets/home/img1.jpg',
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
  setTimeout(function() {
    hideLoading('dynamicList');
  }, 300);
}

// 查看新闻详情
function toNews(id) {
  console.log('to news: ', id);
  // window.location.href = '' + id;
}
