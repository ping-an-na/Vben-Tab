import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout, IFrameView } from '#/layouts';
// 项目
const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      badgeType: 'normal',
      icon: 'proicons:computer',
      order: 3,
      title: '3D模型',
    },
    name: '3DM',
    path: '/3DM',
    children: [
      {
        name: '3dm1',
        path: '/3DM/3dm1',
        component: IFrameView,
        meta: {
          icon: 'skill-icons:postman',
          component: () => import('#/views/_core/3dm/3dm1.vue'),
          title: '一个小孩子',
        },
      },
    ],
  },
];

export default routes;
