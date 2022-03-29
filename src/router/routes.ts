import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'speech-app',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      {
        name: 'find-word-app',
        path: '/app',
        component: () => import('src/pages/FindWordApp.vue'),
      },
      {
        name: 'find-word',
        path: '/',
        component: () => import('src/pages/FindWord.vue'),
      },
      {
        name: 'repeat-words',
        path: '/repeat-words',
        component: () => import('src/pages/RepeatWord.vue'),
      },
      {
        name: 'shit',
        path: '/shit',
        component: () => import('src/pages/Shit.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
