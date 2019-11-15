import Utils from '@/common/Utils';
import { USER_ROLE, MANAGER_PERMISSIONS } from '@/common/Constants';

// 无数据指令
export default {
  permission: {
    bind: (el, binding) => {
      /* eslint-disable */
      checkPermission(el, binding);
    },
    // componentUpdated: (el, binding) => {
    //   toggleNoDataView(el, binding);
    // },
    // unbind: (el) => {
    //   toggleNoDataView(el, { value: false });
    //   el.instance && el.instance.$destroy();
    // },
  },
};

function checkPermission(el, binding) {
  const role = Utils.getLocalStorageItem('role');
  if (role !== USER_ROLE.manager) return;
  
  // 老板权限, 判断是否隐藏
  if (MANAGER_PERMISSIONS[binding.value] === 1) {
    // 隐藏
    el.style.display = 'none';
  }
}