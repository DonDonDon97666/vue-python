<script setup lang="ts">
import { ref } from 'vue'
import NewPurchaseRequestDialog from '../components/NewPurchaseRequestDialog.vue'

const showNewRequest = ref(false)
</script>

<template>
  <section class="draft-page">
    <div class="page-heading"><div><h1>采购草稿</h1><p>从自然语言或附件开始，逐步形成可提交的采购申请。</p></div><el-button type="primary" size="large" @click="showNewRequest = true">＋ 新建采购需求</el-button></div>
    <el-card shadow="never"><el-empty description="还没有采购草稿。点击右上角“新建采购需求”开始创建。" :image-size="120"/></el-card>
    <NewPurchaseRequestDialog v-model="showNewRequest" />
  </section>
</template>

<style scoped>
.draft-page{max-width:1280px;margin:0 auto}.page-heading{display:flex;align-items:center;justify-content:space-between;margin-bottom:22px}.page-heading h1{margin:0;font-size:24px}.page-heading p{margin:7px 0 0;color:#758198}@media(max-width:600px){.page-heading{align-items:flex-start;gap:12px;flex-direction:column}}
</style>
