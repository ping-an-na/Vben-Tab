import type {RouteRecordRaw} from 'vue-router';

import {BasicLayout, IFrameView} from '#/layouts';
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
        component: () => import('#/views/_core/3dm/3dm1.vue'),
        meta: {
          icon: 'fluent:animal-cat-28-regular',
          title: '一个小猫',
        },
      },
    ],
  },
];

export default routes;
