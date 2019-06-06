// 显示loading
function showLoading(id) {
  $("#" + id).append(
    '<div class="w-loading-mid">'+
    '  <img src="../assets/common/loading-blue.svg" class="loading-img">'+
    '</div>'
  );
}

// 隐藏loading
function hideLoading(id) {
  $("#" + id).find('.w-loading-mid').remove();
}