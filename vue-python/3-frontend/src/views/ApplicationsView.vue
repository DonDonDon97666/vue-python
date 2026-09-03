<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { getDrafts, type SavedDraft } from '../api/drafts'

type RecordStatus = 'DRAFT' | 'SUBMITTED'
const activeStatus = ref<RecordStatus>('DRAFT')
const records = ref<SavedDraft[]>([])
const loading = ref(false)
const total = ref(0)
const page = ref(1)
const pageSize = 20

async function loadRecords() {
  loading.value = true
  try {
    const result = await getDrafts(activeStatus.value, page.value, pageSize)
    records.value = result.items
    total.value = result.total
  } catch {
    records.value = []
    total.value = 0
    ElMessage.error('采购记录加载失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

function changeStatus(status: string | number) {
  activeStatus.value = status as RecordStatus
  page.value = 1
}

function changePage(nextPage: number) {
  page.value = nextPage
  loadRecords()
}

watch(activeStatus, loadRecords)
onMounted(loadRecords)
</script>

<template>
  <section class="applications-page">
    <div class="page-heading"><div><h1>采购申请</h1><p>查看仍可编辑的采购草稿，以及已经正式提交的采购申请。</p></div><el-button :loading="loading" @click="loadRecords">刷新</el-button></div>
    <el-card shadow="never">
      <el-tabs :model-value="activeStatus" @tab-change="changeStatus">
        <el-tab-pane label="采购草稿" name="DRAFT"><template #label>采购草稿 <el-badge :value="activeStatus === 'DRAFT' ? total : undefined" :hidden="activeStatus !== 'DRAFT' || total === 0"/></template></el-tab-pane>
        <el-tab-pane label="已提交" name="SUBMITTED"><template #label>已提交 <el-badge :value="activeStatus === 'SUBMITTED' ? total : undefined" :hidden="activeStatus !== 'SUBMITTED' || total === 0"/></template></el-tab-pane>
      </el-tabs>
      <el-table v-loading="loading" :data="records" empty-text="暂无记录" style="width:100%">
        <el-table-column label="采购需求" min-width="280"><template #default="{ row }"><div class="raw-text">{{ row.rawText }}</div><small>{{ row.id }}</small></template></el-table-column>
        <el-table-column label="物料" min-width="180"><template #default="{ row }">{{ row.fields.material || '待 AI 识别/补充' }}</template></el-table-column>
        <el-table-column label="数量" width="120"><template #default="{ row }">{{ row.fields.quantity ? `${row.fields.quantity} ${row.fields.unit || ''}` : '待补充' }}</template></el-table-column>
        <el-table-column label="状态" width="110"><template #default="{ row }"><el-tag :type="row.status === 'DRAFT' ? 'warning' : 'success'">{{ row.status === 'DRAFT' ? '草稿' : '已提交' }}</el-tag></template></el-table-column>
        <el-table-column label="最后保存时间" width="190"><template #default="{ row }">{{ new Date(row.updatedAt).toLocaleString('zh-CN', { hour12: false }) }}</template></el-table-column>
      </el-table>
      <div v-if="total > pageSize" class="pagination"><el-pagination background layout="prev, pager, next" :current-page="page" :page-size="pageSize" :total="total" @current-change="changePage"/></div>
    </el-card>
  </section>
</template>

<style scoped>
.applications-page{max-width:1280px;margin:0 auto}.page-heading{display:flex;justify-content:space-between;align-items:center;margin-bottom:22px}.page-heading h1{margin:0;font-size:24px}.page-heading p{margin:7px 0 0;color:#758198}.raw-text{line-height:1.5}.el-table small{display:block;margin-top:3px;color:#8b96a8;font-family:ui-monospace,monospace;font-size:11px}.pagination{display:flex;justify-content:flex-end;margin-top:18px}@media(max-width:600px){.page-heading{align-items:flex-start;gap:12px;flex-direction:column}}
</style>
