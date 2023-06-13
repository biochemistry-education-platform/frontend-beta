import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import InitialLayout from '@/layouts/initial/InitialLayout.vue'

// import store from '../stores/user'

const routes = [
  {
    path: '/login/',
    component: InitialLayout,
    children: [       
      {
        path: '',
        name: 'LogIn',
        component: () => import('../views/LogIn.vue')
      }, 
      {
        path: 'signup',
        name: 'SignUp',
        component: () => import('../views/SignUp.vue')
      },

    ]
  },
  {
    path: '/',
    component: MainLayout,
    children: [      
      {
        path: '',
        name: 'Articles',
        component: () => import('../views/dashboard/ArticlesList.vue'),
        // meta: {
        //   requireLogin: true
        // }
      },
      {
        path: 'me',
        name: 'Profile',
        component: () => import('../views/dashboard/ProfilePage.vue'),
        // meta: {
        //   requireLogin: true
        // }
      },

      {
        path: 'articles/add/:type',
        name: 'AddArticle',
        component: () => import('../views/dashboard/AddArticle.vue'),
        // meta: {
        //   requireLogin: true
        // }
      },
      {
        path: 'articles/:id',
        name: 'Article',
        component: () => import('../views/dashboard/Article.vue'),
        // meta: {
        //   requireLogin: true
        // }
      },
      {
        path: 'notification_articles/:id',
        name: 'NotifArticle',
        component: () => import('../views/dashboard/NotifArticle.vue'),
        // meta: {
        //   requireLogin: true
        // }
      },      

      {
        path: 'notes/',
        name: 'Notes',
        component: () => import('../views/dashboard/NotesList.vue'),
        // meta: {
        //   requireLogin: true
        // }
      },
      {
        path: 'notes/:id',
        name: 'Note',
        component: () => import('../views/dashboard/Note.vue'),
        // meta: {
        //   requireLogin: true
        // }
      },
      {
        path: 'favourites',
        name: 'Favourites',
        component: () => import('../views/dashboard/Favourites.vue'),
        // meta: {
        //   requireLogin: true
        // }
      },
      {
        path: 'my_articles',
        name: 'MyArticles',
        component: () => import('../views/dashboard/MyArticles.vue')
        ,
        // meta: {
        //   requireLogin: true
        // }
      },
      {
        path: '/for_checking',
        name: 'ArticlesForChecking',
        component: () => import('../views/dashboard/ArticlesForChecking.vue'),
        // meta: {
        //   requireLogin: true
        // }
      },
    ]
  },
  {
    path: '/:catchAll(.*)*',
    name: 'NotFound',
    component: () => import('../views/dashboard/NotFoundPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
//     next('/log-in')
//   } else {
//     next()
//   }
// })

export default router
