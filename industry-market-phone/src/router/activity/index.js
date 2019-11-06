
// 首页路由
const activityDetail = () => import('@/views/activity/ActivityDetail.vue');
const activity = () => import('@/views/activity/Activity.vue');

export default [
  {
    path: 'activity',
    component: activity,
    meta: { keepAlive: true, isTabbar: true },
    children: [
      {
        path: 'activieyDetail',
        component: activityDetail,
      },
    ],
  },
];