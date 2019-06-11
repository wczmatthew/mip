
/**
 * 显示提示模态窗
 * @param {*} title 标题, 不显示传空
 * @param {*} content 提示内容
 * @param {*} confirmFunc 点击确定回调
 * @param {*} cancelFunc 点击取消回调, 没有事件触发就不用传
 */
function showModal(title, content, confirmFunc, cancelFunc) {
  var modalDiv = document.createElement('div');
  modalDiv.style.cssText = 'position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 99;';
  document.body.appendChild(modalDiv);

  // 透明背景层
  var modalBg = document.createElement('div');
  modalBg.style.cssText = 'background: #000;filter: alpha(opacity=50);-moz-opacity:0.5;-khtml-opacity:0.5;opacity: 0.5; position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 98;';
  modalBg.onclick = function() {
    modalDiv.remove();
    modalBg.remove();
  };
  modalDiv.appendChild(modalBg);

  var modal = document.createElement('div');
  modal.style.cssText = 'width: 50%;margin: 0 auto;background: #fff; margin-top: 5%; position: relative; z-index: 99;';
  modalDiv.appendChild(modal);

  // 标题
  if (title) {
    var modalTitle = document.createElement('div');
    modalTitle.style.cssText = 'text-align: center;font-size: 18px;padding: 20px;';
    modalTitle.innerHTML = title;
    modal.appendChild(modalTitle);
  }

  // 内容
  var height = modalDiv.clientHeight;
  var modalContent = document.createElement('div');
  modalContent.style.cssText = 'padding: 20px;font-size: 16px;text-align: center; max-height: ' + height * 0.6 + 'px; overflow: auto;';
  modalContent.innerHTML = content;
  modal.appendChild(modalContent);

  // 按钮
  var modalBottom = document.createElement('div');
  modalBottom.style.cssText = 'font-size: 16px;text-align: center; height: 40px; border-top: 1px solid #e6e6e6; margin-top: 20px;';
  modal.appendChild(modalBottom);

  // 确认按钮
  var modalConfirm = document.createElement('input');
  modalConfirm.type = 'button';
  modalConfirm.value = '确认';
  modalConfirm.style.cssText = 'font-size: 16px;text-align: center; height: 40px; border: 0; width: 50%; float: left; color: #005bac; background: #fff; border-right: 1px solid #e6e6e6; display: block; cursor: pointer;';
  modalConfirm.onclick = function() {
    modalDiv.remove();
    modalBg.remove();
    confirmFunc && confirmFunc();
  };;
  modalBottom.appendChild(modalConfirm);
  
  // 取消按钮
  var modalCancle = document.createElement('input');
  modalCancle.type = 'button';
  modalCancle.value = '取消';
  modalCancle.style.cssText = 'font-size: 16px;text-align: center; height: 40px; border: 0; width: 50%; float: left; color: #005bac; background: #fff; display: block; cursor: pointer;';
  modalCancle.onclick = function() {
    modalDiv.remove();
    modalBg.remove();
    cancelFunc && cancelFunc();
  };
  modalBottom.appendChild(modalCancle);

  // 取消浮动
  var modalClear =  document.createElement('div');
  modalClear.style.cssText = 'clear: both;';
  modalBottom.appendChild(modalClear);

  // 计算modal的top
  var modalHeight = modal.clientHeight;
  modal.style.marginTop = (height - modalHeight) / 2 + 'px';
}


/**
 * 显示模态窗 -- 搜索并带显示内容, 不分页
 * @param {*} title 标题, 不显示就传空
 * @param {*} tableList 显示的内容数据
 * @param {*} searchFunc 搜索框调用方法
 * @param {*} callback 双击显示内容后的回调
 */
function showModalTable(title, tableList, searchFunc, callback) {
  var modalDiv = document.createElement('div');
  modalDiv.style.cssText = 'position: fixed; top: 0;left: 0;width: 100%;height: 100%;z-index: 99;';
  document.body.appendChild(modalDiv);

  // 透明背景层
  var modalBg = document.createElement('div');
  modalBg.style.cssText = 'background: #000;filter: alpha(opacity=50);-moz-opacity:0.5;-khtml-opacity:0.5;opacity: 0.5; position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 98;';
  modalBg.onclick = function() {
    modalDiv.remove();
    modalBg.remove();
  };
  modalDiv.appendChild(modalBg);

  var modal = document.createElement('div');
  modal.style.cssText = 'width: 50%;margin: 0 auto;background: #fff; margin-top: 5%; position: relative; z-index: 99;';
  modalDiv.appendChild(modal);

  // 标题
  if (title) {
    var modalTitle = document.createElement('div');
    modalTitle.style.cssText = 'text-align: center;font-size: 18px;padding: 20px;';
    modalTitle.innerHTML = title;
    modal.appendChild(modalTitle);
  }

  // 内容
  var height = modalDiv.clientHeight;
  var modalContent = document.createElement('div');
  modalContent.style.cssText = 'padding: 20px;font-size: 16px;text-align: center; max-height: ' + height * 0.6 + 'px; overflow: auto;';
  modal.appendChild(modalContent);

  // 搜索框
  var searchInput = document.createElement('input');
  searchInput.type = 'text';
  // searchInput.value = ;
  searchInput.style.cssText = 'font-size: 16px; text-align: left; height: 40px; color: #333; background: #fff; border: 1px solid #e6e6e6; display: block; width: 100%; margin-bottom: 20px;';
  searchInput.onkeypress = function() {
    if (event.keyCode == 13) {
      // 按回车之后的回调

      // 显示loading
      modal.getElementsByClassName('modalTable')[0].innerHTML = '';
      var tableDiv = document.createElement('div');
      tableDiv.style.cssText = 'font-size: 16px; text-align: left; padding: 10px; border-bottom: 1px solid #e6e6e6; cursor: pointer;';
      tableDiv.innerHTML = '加载数据中, 请稍后';
      tableDiv.className = 'modalTableLoading';
      tableContent.appendChild(tableDiv);

      searchFunc && searchFunc();
    }
  };
  modalContent.appendChild(searchInput);

  // 显示内容
  var tableContent = document.createElement('div');
  tableContent.className = 'modalTable';
  modalContent.appendChild(tableContent);

  for (var i = 0; i < tableList.length; i++) {
    var item = tableList[i];
    var tableDiv = document.createElement('div');
    tableDiv.style.cssText = 'font-size: 16px; text-align: left; padding: 10px; border-bottom: 1px solid #e6e6e6; cursor: pointer;';
    tableDiv.onmouseenter = function() {
      this.style.background = '#f5f5f5';
    };
    tableDiv.onmouseleave = function() {
      this.style.background = '#fff';
    };
    tableDiv.dataIndex = i;
    tableDiv.ondblclick = function() {
      modalDiv.remove();
      modalBg.remove();
      callback && callback(tableList[this.dataIndex]);
    };
    tableDiv.innerHTML = item;
    tableContent.appendChild(tableDiv);
  }

  // 计算modal的top
  var modalHeight = modal.clientHeight;
  modal.style.marginTop = (height - modalHeight) / 2 + 'px';

  return modal;
}

function updateModalTable(modal, tableList) {
  var tableContent = modal.getElementsByClassName('modalTable')[0];
  modal.getElementsByClassName('modalTable')[0].innerHTML = '';

  for (var i = 0; i < tableList.length; i++) {
    var item = tableList[i];
    var tableDiv = document.createElement('div');
    tableDiv.style.cssText = 'font-size: 16px; text-align: left; padding: 10px; border-bottom: 1px solid #e6e6e6; cursor: pointer;';
    tableDiv.onmouseenter = function() {
      this.style.background = '#f5f5f5';
    };
    tableDiv.onmouseleave = function() {
      this.style.background = '#fff';
    };
    tableDiv.dataIndex = i;
    tableDiv.ondblclick = function() {
      modalDiv.remove();
      modalBg.remove();
      callback && callback(tableList[this.dataIndex]);
    };
    tableDiv.innerHTML = item;
    tableContent.appendChild(tableDiv);
  }
}