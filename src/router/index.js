import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import InitialLayout from '@/layouts/initial/InitialLayout.vue'

import store from '../store'

const routes = [
  {
    path: '/initial',
    component: InitialLayout,
    children: [  
      {
        path: '/',
        name: 'SignUp',
        component: () => import('../views/SignUp.vue')
      },
      {
        path: '/log-in',
        name: 'LogIn',
        component: () => import('../views/LogIn.vue')
      },
    ]
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '/me',
        name: 'Profile',
        component: () => import('../views/dashboard/ProfilePage.vue'),
        meta: {
          requireLogin: true
        }
      },
      {
        path: '/articles',
        name: 'Articles',
        component: () => import('../views/dashboard/ArticlesList.vue'),
        meta: {
          requireLogin: true
        }
      },
      {
        path: '/articles/:id',
        name: 'Article',
        component: () => import('../views/dashboard/Article.vue'),
        meta: {
          requireLogin: true
        }
      },
      {
        path: '/notes',
        name: 'Notes',
        component: () => import('../views/dashboard/NotesList.vue'),
        meta: {
          requireLogin: true
        }
      },
      {
        path: '/notes/:id',
        name: 'Note',
        component: () => import('../views/dashboard/Note.vue'),
        meta: {
          requireLogin: true
        }
      },
      // {
      //   path: '/teacher/articles/add',
      //   name: 'TeacherAddArticle',
      //   component: () => import('../views/dashboard/teacher/AddArticle.vue'),
      //   meta: {
      //     requireLogin: true
      //   }
      // },
      // {
      //   path: '/teacher/for_checking',
      //   name: 'TeacherArticlesForChecking',
      //   component: () => import('../views/dashboard/teacher/ArticlesForChecking.vue'),
      //   meta: {
      //     requireLogin: true
      //   }
      // },
      // {
      //   path: '/teacher/for_checking/:id',
      //   name: 'TeacherArticleForChecking',
      //   component: () => import('../views/dashboard/teacher/ArticleForChecking.vue'),
      //   meta: {
      //     requireLogin: true
      //   }
      // },
      // {
      //   path: '/teacher/my_articles',
      //   name: 'TeacherArticles',
      //   component: () => import('../views/dashboard/teacher/MyArticles.vue'),
      //   meta: {
      //     requireLogin: true
      //   }
      // },
      // {
      //   path: '/teacher/my_articles/:id',
      //   name: 'TeacherArticle',
      //   component: () => import('../views/dashboard/teacher/MyArticle.vue'),
      //   meta: {
      //     requireLogin: true
      //   }
      // },
      // {
      //   path: '/teacher/favourites',
      //   name: 'Favourites',
      //   component: () => import('../views/dashboard/Favourites.vue'),
      //   meta: {
      //     requireLogin: true
      //   }
      // },
    ]
  },
  // {
  //   path: '/student',
  //   component: StudentLayout,
  //   children: [
  //     {
  //       path: '/student/me',
  //       name: 'StudentProfile',
  //       component: () => import('../views/dashboard/student/ProfilePage.vue'),
  //       meta: {
  //         requireLogin: true
  //       }
  //     },
  //     {
  //       path: '/student/articles',
  //       name: 'ArticlesPageStudent',
  //       component: () => import('../views/dashboard/student/ArticlesList.vue'),
  //       meta: {
  //         requireLogin: true
  //       }
  //     },
  //     {
  //       path: '/student/articles/:id',
  //       name: 'ArticleStudentPage',
  //       component: () => import('../views/dashboard/student/Article.vue'),
  //       meta: {
  //         requireLogin: true
  //       }
  //     },
  //     {
  //       path: '/student/articles/add',
  //       name: 'StudentAddArticle',
  //       component: () => import('../views/dashboard/student/AddArticle.vue'),
  //       meta: {
  //         requireLogin: true
  //       }
  //     },
  //     {
  //       path: '/student/my_articles',
  //       name: 'StudentArticles',
  //       component: () => import('../views/dashboard/student/MyArticles.vue'),
  //       meta: {
  //         requireLogin: true
  //       }
  //     },
  //     {
  //       path: '/student/my_articles/:id',
  //       name: 'StudentArticle',
  //       component: () => import('../views/dashboard/student/MyArticle.vue'),
  //       meta: {
  //         requireLogin: true
  //       }
  //     },
  //     {
  //       path: '/student/notes',
  //       name: 'Notes',
  //       component: () => import('../views/dashboard/student/NotesList.vue'),
  //       meta: {
  //         requireLogin: true
  //       }
  //     },
  //     {
  //       path: '/student/notes/:id',
  //       name: 'Note',
  //       component: () => import('../views/dashboard/student/Note.vue'),
  //       meta: {
  //         requireLogin: true
  //       }
  //     },
  //     {
  //       path: '/student/favourites',
  //       name: 'Favourites',
  //       component: () => import('../views/dashboard/Favourites.vue'),
  //       meta: {
  //         requireLogin: true
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/science',
  //   component: ScienceLayout,
  //   children: [
  //     {
  //       path: '/science/me',
  //       name: 'StudentProfile',
  //       component: () => import('../views/dashboard/student/ProfilePage.vue'),
  //       meta: {
  //         requireLogin: true
  //       }
  //     },
  //     {
  //       path: '/science/articles',
  //       name: 'Articles',
  //       component: () => import('../views/dashboard/ArticlesList.vue'),
  //       meta: {
  //         requireLogin: true
  //       }
  //     },
  //     {
  //       path: '/science/articles/:id',
  //       name: 'ArticleStudentPage',
  //       component: () => import('../views/dashboard/student/Article.vue'),
  //       meta: {
  //         requireLogin: true
  //       }
  //     },
  //     {
  //       path: '/science/articles/add',
  //       name: 'TeacherAddArticle',
  //       component: () => import('../views/dashboard/teacher/AddArticle.vue'),
  //       meta: {
  //         requireLogin: true
  //       }
  //     },
  //     {
  //       path: '/science/my_articles',
  //       name: 'TeacherArticles',
  //       component: () => import('../views/dashboard/teacher/MyArticles.vue'),
  //       meta: {
  //         requireLogin: true
  //       }
  //     },
  //     {
  //       path: '/science/my_articles/:id',
  //       name: 'TeacherArticle',
  //       component: () => import('../views/dashboard/teacher/MyArticle.vue'),
  //       meta: {
  //         requireLogin: true
  //       }
  //     },
  //     {
  //       path: '/science/for_checking',
  //       name: 'TeacherArticlesForChecking',
  //       component: () => import('../views/dashboard/teacher/ArticlesForChecking.vue'),
  //       meta: {
  //         requireLogin: true
  //       }
  //     },
  //     {
  //       path: '/science/for_checking/:id',
  //       name: 'TeacherArticleForChecking',
  //       component: () => import('../views/dashboard/teacher/ArticleForChecking.vue'),
  //       meta: {
  //         requireLogin: true
  //       }
  //     },
  //     {
  //       path: '/science/notes',
  //       name: 'Notes',
  //       component: () => import('../views/dashboard/student/NotesList.vue'),
  //       meta: {
  //         requireLogin: true
  //       }
  //     },
  //     {
  //       path: '/science/notes/:id',
  //       name: 'Note',
  //       component: () => import('../views/dashboard/student/Note.vue'),
  //       meta: {
  //         requireLogin: true
  //       }
  //     },
  //     {
  //       path: '/science/favourites',
  //       name: 'Favourites',
  //       component: () => import('../views/dashboard/Favourites.vue'),
  //       meta: {
  //         requireLogin: true
  //       }
  //     }
  //   ]
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next('/log-in')
  } else {
    next()
  }
})

export default router
