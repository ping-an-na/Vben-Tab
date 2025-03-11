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
      title: '我的项目',
    },
    name: 'MyProject',
    path: '/myProject',
    children: [
      {
        name: 'myProject',
        path: '/myProject/PostMan',
        component: IFrameView,
        meta: {
          icon: 'skill-icons:postman',
          link: 'https://e8a0fdcd.ruifeng-testmap.pages.dev/guidang',
          title: '类 PostMan 项目',
        },
      },
      {
        name: 'dataScreen',
        path: '/myProject/dataScreen',
        component: IFrameView,
        meta: {
          icon: 'qlementine-icons:screen-16',
          link: 'https://ruifengdatascreen.pages.dev/#/panorama/index',
          title: '数据大屏项目',
        },
      },

      {
        name: 'mapFile',
        path: '/myProject/mapFile',
        component: IFrameView,
        meta: {
          icon: 'solar:map-linear',
          link: 'https://ruifeng-testmap.pages.dev/HomeMap',
          title: '高德+地块+文件',
        },
      },
    ],
  },
];

export default routes;
