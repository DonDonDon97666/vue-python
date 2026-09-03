import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import LoginView from '../views/LoginView.vue'
import DraftView from '../views/DraftView.vue'
import ApplicationsView from '../views/ApplicationsView.vue'
import MasterDataView from '../views/MasterDataView.vue'

const router = createRouter({ history: createWebHistory(), routes: [
  { path: '/login', component: LoginView, meta: { public: true, title: '登录' } },
  { path: '/', redirect: '/drafts' },
  { path: '/drafts', component: DraftView, meta: { menu: true, title: '采购草稿', permissions: ['buyer'] } },
  { path: '/applications', component: ApplicationsView, meta: { menu: true, title: '采购申请', permissions: ['buyer', 'manager'] } },
  { path: '/master-data', component: MasterDataView, meta: { menu: true, title: '主数据管理', permissions: ['admin'] } },
] })
router.beforeEach(to => { const auth = useAuthStore(); if (to.meta.public) return true; if (!auth.token) return '/login'; if (!auth.can(to.meta.permissions as string[])) return '/applications' })
export default router
