

const Contact = () => import('@/views/my/Contact.vue');
const FeedbackCreate = () => import('@/views/my/feedback/FeedbackCreate.vue');
const FeedbackList = () => import('@/views/my/feedback/FeedbackList.vue');
const FeedbackDetail = () => import('@/views/my/feedback/FeedbackDetail.vue');

export default [
  {
    path: 'contact',
    component: Contact,
    children: [
      {
        path: 'feedback',
        component: FeedbackList,
        children: [
          {
            path: 'createFeedback',
            component: FeedbackCreate,
          },
          {
            path: 'detail',
            component: FeedbackDetail,
          },
        ],
      },
    ],
  },
];