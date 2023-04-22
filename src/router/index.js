import { createRouter, createWebHistory } from 'vue-router'
import TeacherLayout from '@/layouts/TeacherLayout.vue'
import InitialLayout from '@/layouts/InitialLayout.vue'
import HomeView from '../views/HomeView.vue'
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'
import Dashboard from '../views/dashboard/Dashboard.vue'
import MyAccount from '../views/dashboard/MyAccount.vue'
import Clients from '../views/dashboard/Clients.vue'
import Client from '../views/dashboard/Client.vue'
import ArticlesList from '../views/dashboard/ArticlesList.vue'
import Article from '../views/dashboard/Article.vue'
import AddArticle from '../views/dashboard/AddArticle.vue'
import NotesList from '../views/dashboard/NotesList.vue'
import Note from '../views/dashboard/Note.vue'

import store from '../store'

const routes = [
  {
    path: '/',
    component: InitialLayout,
    children: [
      {
        path: '/sign-up',
        name: 'SignUp',
        component: SignUp
      },
      {
        path: '/log-in',
        name: 'LogIn',
        component: LogIn
      },
    ]
  },
  {
    path: '/teacher',
    component: TeacherLayout,
    children: [
      {
        path: '/teacher/articles',
        name: 'Articles',
        component: ArticlesList,
        meta: {
          requireLogin: true
        }
      },
      {
        path: '/teacher/articles/add',
        name: 'AddArticle',
        component: AddArticle,
        meta: {
          requireLogin: true
        }
      },
      {
        path: '/teacher/articles/:id',
        name: 'Article',
        component: Article,
        meta: {
          requireLogin: true
        }
      },
      {
        path: '/teacher/my-account',
        name: 'MyAccount',
        component: MyAccount,
        meta: {
          requireLogin: true
        }
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/clients/:id',
    name: 'Client',
    component: Client,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/clients',
    name: 'Clients',
    component: Clients,
    meta: {
      requireLogin: true
    }
  },
  // {
  //   path: '/dashboard/articles',
  //   name: 'Articles',
  //   component: ArticlesList,
  //   meta: {
  //     requireLogin: true
  //   }
  // },
  // {
  //   path: '/dashboard/articles/add',
  //   name: 'AddArticle',
  //   component: AddArticle,
  //   meta: {
  //     requireLogin: true
  //   }
  // },
  // {
  //   path: '/dashboard/articles/:id',
  //   name: 'Article',
  //   component: Article,
  //   meta: {
  //     requireLogin: true
  //   }
  // },
  {
    path: '/dashboard/notes',
    name: 'Notes',
    component: NotesList,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/notes/:id',
    name: 'Note',
    component: Note,
    meta: {
      requireLogin: true
    }
  },


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
