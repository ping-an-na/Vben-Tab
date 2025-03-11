
import type {RouteRecordRaw} from 'vue-router';

import {BasicLayout, } from '#/layouts';
// 项目
const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      badgeType: 'normal',
      icon: 'cib:js',
      order: 4,
      title: '脚本',
    },
    name: 'ScriptItem',
    path: '/scriptItem',
    children: [
      {
        name: 'i18Script',
        path: '/scriptItem/i18Script',
        component: () => import('#/views/_core/scriptItem/guojihua.vue'),
        meta: {
          icon: 'fluent:code-js-16-filled',
          title: '国际化处理脚本',
        },
      },
      {
        name: 'zhongyiying',
        path: '/scriptItem/zhongyiying',
        component: () => import('#/views/_core/scriptItem/zhongyiying.vue'),
        meta: {
          icon: 'fluent:code-js-16-filled',
          title: '中转英',
        },
      },
      {
        name: 'biaogechuli',
        path: '/scriptItem/biaogechuli',
        component: () => import('#/views/_core/scriptItem/biaogechuli.vue'),
        meta: {
          icon: 'fluent:code-js-16-filled',
          title: '表格处理（查找两个表格）',
        },
      },
    ],
  },
];

export default routes;
