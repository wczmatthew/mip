var helpData = {
  pageIndex: 1,
  id: 1, // 显示的文档内容
}; // 帮助页面相关参数
$(function() {
  // 初始化第一页数据
  updateFirstData();

  // 初始化菜单栏点击事件
  $("#helpMenu li > span").click(function() {
    var subMenu = $(this).parent().find('.sub-menu');
    $("#helpMenu li").removeClass('actived');
    $(this).parent().addClass('actived');
    if (!subMenu.length) {
      // 没有子菜单需要显示, 直接更新右侧数据
      helpData.id = $(this).parent().attr('data-id');
      updateFirstData();
      return;
    }

    // 有子菜单, 点击为展开关闭事件
    subMenu.slideToggle();
  });

  // 子菜单点击事件
  $("#helpMenu .sub-menu li").click(function() {
    $("#helpMenu .sub-menu li").removeClass('actived');
    $(this).addClass('actived');
    // 子菜单点击, 更新数据
    helpData.id = $(this).attr('data-id');
    updateFirstData();
  });
});

function updateFirstData() {
  console.log('id: ', helpData.id);
  helpData.pageIndex = 1;
  updatePagination(1);
  updateData(); 
}

function updatePagination(current) {
  // 初始化分页 -- 具体api http://www.jq22.com/yanshi5697
  $(".M-box3").pagination({
    pageCount: 50,
    current: current,
    showData: 5,
    coping: true,
    jump: true,
    callback: function (api) {
      // console.log(api);
      helpData.pageIndex = api.getCurrent();
      // console.log('currentPage: ', currentPage);

      // 模拟ajax请求
      updateData();
    }
  });
}

// 更新列表数据
function updateData() {
  $(".w-loading-mid").show();
  setTimeout(function() {
    // 列表数据
    $('#helpList').empty();
    for (var i = 0; i < 8; i++) {
      var data = {
        title: '2018年度培训年会及培训总结表彰大会' + (Math.random() * 10).toFixed(0),
        content: '2019年1月17日，正泰电器股份公司“2018年度培训年会及培训总结表彰大会”于温州科技楼三楼报告厅隆重召开。在大会上，颁授并表彰了21位新晋内训师聘书，表彰了“年度十佳内训师”，4位年度优秀培训管理员，4家年度优秀学习单位，6门“金牌课程”。',
        time: '2019-04-02',
        id: i + 1,
      };
      $('#helpList').append(
        '<div class="item hvr-sweep-to-right" onclick="toDetail(\''+data.id+'\')">'+
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

    $(".w-loading-mid").hide();
  }, 300);
}

// 调整到详情页面
function toDetail(id) {
  
}