<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'

const auth = useAuthStore(); const route = useRoute(); const router = useRouter()
const menus = computed(() => router.getRoutes().filter(item => item.meta.menu && auth.can(item.meta.permissions as string[])))
function logout() { auth.logout(); router.push('/login') }
</script>
<template>
  <router-view v-if="route.meta.public" />
  <el-container v-else class="shell"><el-aside width="230px"><h2>采购需求工作台</h2><el-menu router :default-active="route.path"><el-menu-item v-for="item in menus" :key="item.path" :index="item.path">{{ item.meta.title }}</el-menu-item></el-menu></el-aside>
  <el-container><el-header><span>{{ route.meta.title }}</span><div><el-tag>{{ auth.role }}</el-tag><el-button link @click="logout">退出</el-button></div></el-header><el-main><router-view /></el-main></el-container></el-container>
</template>
<style scoped>.shell{min-height:100vh}.el-aside{background:#17243c;color:white;padding:16px}.el-header{display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #e5e7eb}.el-main{background:#f5f7fa}</style>
