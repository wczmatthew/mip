

const Contact = () => import('@/views/my/Contact.vue');
const FeedbackCreate = () => import('@/views/my/feedback/FeedbackCreate.vue');

export default [
  {
    path: 'contact',
    component: Contact,
    children: [
      {
        path: 'createFeedback',
        component: FeedbackCreate,
      },
    ],
  },
];