<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules, UploadProps, UploadUserFile } from 'element-plus'
import { ElMessage } from 'element-plus'
import { extractProcurementFields } from '../api/ai'
import { createDraft, updateDraft } from '../api/drafts'

const visible = defineModel<boolean>({ default: false })
const formRef = ref<FormInstance>()
const aiGenerated = ref(false)
const extracting = ref(false)
const saving = ref(false)
const fileList = ref<UploadUserFile[]>([])
const draftId = ref<string>(crypto.randomUUID())
const savedDraftId = ref<string>()
const draftVersion = ref<number>()

const requestForm = reactive({
  rawRequirement: '',
  material: '',
  specification: '',
  quantity: undefined as number | undefined,
  unit: '',
  expectedDeliveryDate: '',
  purpose: '',
  preferredBrand: '',
  preferredSupplier: '',
})

const rules: FormRules = {
  rawRequirement: [
    { required: true, message: '请描述采购需求', trigger: 'blur' },
    { min: 10, message: '采购描述至少 10 个字符', trigger: 'blur' },
  ],
  material: [{ required: true, message: '请选择或确认物料', trigger: 'change' }],
  specification: [{ required: true, message: '请填写规格/型号', trigger: 'blur' }],
  quantity: [{ required: true, message: '请填写采购数量', trigger: 'change' }, { type: 'number', min: 1, message: '数量必须大于 0', trigger: 'change' }],
  unit: [{ required: true, message: '请选择单位', trigger: 'change' }],
  expectedDeliveryDate: [{ required: true, message: '请选择期望交期', trigger: 'change' }],
  purpose: [{ required: true, message: '请填写采购用途', trigger: 'blur' }],
}

const handleFiles: UploadProps['onChange'] = (_, files) => { fileList.value = files }

function reset() {
  formRef.value?.resetFields()
  fileList.value = []
  aiGenerated.value = false
  draftId.value = crypto.randomUUID()
  savedDraftId.value = undefined
  draftVersion.value = undefined
}

function close() {
  visible.value = false
  reset()
}

async function extractWithAi() {
  if (!requestForm.rawRequirement.trim()) {
    ElMessage.warning('请先输入自然语言采购需求')
    return
  }
  extracting.value = true
  try {
    const result = await extractProcurementFields(draftId.value, requestForm.rawRequirement)
    const fields = result.fields
    Object.assign(requestForm, {
      material: fields.material ?? '',
      specification: fields.specification ?? '',
      quantity: fields.quantity ?? undefined,
      unit: fields.unit ?? '',
      expectedDeliveryDate: fields.expectedDeliveryDate ?? '',
      purpose: fields.purpose ?? '',
      preferredBrand: fields.preferredBrand ?? '',
      preferredSupplier: fields.preferredSupplier ?? '',
    })
    aiGenerated.value = true
    const reminder = result.ambiguities[0] ?? (result.missingFields.length ? `仍缺少：${result.missingFields.join('、')}` : '')
    ElMessage.success(reminder ? `AI 已生成候选信息；${reminder}` : 'AI 已生成候选信息，请逐项确认和补充')
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'AI 识别失败，请稍后重试或手工补充'
    ElMessage.error(message)
  } finally {
    extracting.value = false
  }
}

async function saveDraft() {
  const rightFormFields = ['material', 'specification', 'quantity', 'unit', 'expectedDeliveryDate', 'purpose']
  const validRightForm = await formRef.value?.validateField(rightFormFields).then(() => true).catch(() => false)
  if (!validRightForm) return

  saving.value = true
  const payload = {
    rawText: requestForm.rawRequirement,
    fields: {
      material: requestForm.material || null,
      specification: requestForm.specification || null,
      quantity: requestForm.quantity ?? null,
      unit: requestForm.unit || null,
      expectedDeliveryDate: requestForm.expectedDeliveryDate || null,
      purpose: requestForm.purpose || null,
      preferredBrand: requestForm.preferredBrand || null,
      preferredSupplier: requestForm.preferredSupplier || null,
    },
  }
  try {
    const saved = savedDraftId.value && draftVersion.value
      ? await updateDraft(savedDraftId.value, payload, draftVersion.value)
      : await createDraft(payload)
    savedDraftId.value = saved.id
    draftId.value = saved.id
    draftVersion.value = saved.version
    ElMessage.success(`草稿已保存（版本 ${saved.version}）`)
  } catch {
    ElMessage.error('草稿保存失败，请稍后重试')
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <el-dialog v-model="visible" class="purchase-dialog" width="min(1440px, 96vw)" top="3vh" :close-on-click-modal="false" @closed="reset">
    <template #header><div class="dialog-title"><div><h2>新建采购需求</h2><p>先描述需求或上传附件，AI 将整理为待确认的申请字段。</p></div><el-tag type="warning" effect="light">草稿</el-tag></div></template>
    <el-form ref="formRef" :model="requestForm" :rules="rules" label-position="top" class="request-form">
      <div class="workspace">
        <section class="left-pane">
          <div class="section-heading"><span class="step">1</span><div><h3>输入采购需求</h3><p>支持自然语言描述，先不要求完整表单。</p></div></div>
          <el-form-item prop="rawRequirement" label="原始需求">
            <el-input v-model="requestForm.rawRequirement" type="textarea" :rows="8" maxlength="1000" show-word-limit placeholder="例如：下周装配线需要 200 个耐高温轴承，跟上次采购的差不多，品牌优先用原来的。" />
          </el-form-item>
          <div class="upload-block"><div class="field-label">相关附件 <span>选填</span></div><el-upload v-model:file-list="fileList" drag multiple :auto-upload="false" accept=".pdf,.png,.jpg,.jpeg" :on-change="handleFiles"><div class="upload-title">拖入 PDF 或图片，或点击选择文件</div><div class="el-upload__tip">支持规格书、技术参数说明、报价单；单个文件不超过 20 MB。</div></el-upload></div>
          <div class="notice"><b>识别说明</b><span>附件与 AI 提取的内容均为待核实信息，不会自动成为正式采购事实。</span></div>
          <div class="left-actions"><el-button @click="reset">清空内容</el-button><el-button type="primary" :loading="extracting" @click="extractWithAi">开始 AI 识别</el-button></div>
        </section>
        <section class="right-pane">
          <div class="section-heading"><span class="step">2</span><div><h3>确认采购申请单</h3><p>AI 建议已标记来源；带 <b>*</b> 的字段为必填。</p></div></div>
          <div v-if="aiGenerated" class="ai-summary"><span>✦ AI 已提取候选信息</span><small>请核对并补充所有必填字段</small></div>
          <el-form-item prop="material" label="物料"><template #label>物料 <em class="source">{{ aiGenerated ? 'AI 候选 · 待确认' : '等待 AI 识别' }}</em></template><el-input v-model="requestForm.material" placeholder="AI 识别后自动填充"><template #append><el-button>选择物料</el-button></template></el-input></el-form-item>
          <el-form-item prop="specification" label="规格/型号"><template #label>规格/型号 <em class="source">{{ aiGenerated ? 'AI 候选 · 待确认' : '等待 AI 识别' }}</em></template><el-input v-model="requestForm.specification" placeholder="AI 识别后自动填充" /></el-form-item>
          <div class="form-row"><el-form-item prop="quantity" label="数量"><el-input-number v-model="requestForm.quantity" :min="1" :precision="0" controls-position="right" placeholder="AI 识别后填充" /></el-form-item><el-form-item prop="unit" label="单位"><el-select v-model="requestForm.unit" placeholder="AI 识别后填充"><el-option label="个" value="个"/><el-option label="套" value="套"/><el-option label="件" value="件"/></el-select></el-form-item></div>
          <el-form-item prop="expectedDeliveryDate" label="期望交期"><template #label>期望交期 <em class="source">{{ aiGenerated ? '待确认' : '等待 AI 识别' }}</em></template><el-date-picker v-model="requestForm.expectedDeliveryDate" type="date" value-format="YYYY-MM-DD" placeholder="AI 识别后填充或手动选择" :disabled-date="(date: Date) => date < new Date(new Date().setHours(0, 0, 0, 0))" /></el-form-item>
          <el-form-item prop="purpose" label="项目/采购用途"><el-input v-model="requestForm.purpose" placeholder="AI 识别后自动填充"/></el-form-item>
          <el-form-item label="优先品牌"><template #label>优先品牌 <em class="source">{{ aiGenerated ? '历史参考 · 待确认' : '等待 AI 识别' }}</em></template><el-input v-model="requestForm.preferredBrand" placeholder="AI 识别后自动填充" /></el-form-item>
          <el-form-item label="优先供应商"><el-input v-model="requestForm.preferredSupplier" placeholder="AI 识别后自动填充或手动填写"/></el-form-item>
        </section>
      </div>
    </el-form>
    <template #footer><div class="dialog-footer"><el-button @click="close">取消</el-button><el-button type="primary" :loading="saving" @click="saveDraft">保存草稿</el-button></div></template>
  </el-dialog>
</template>

<style scoped>
.dialog-title{display:flex;justify-content:space-between;align-items:flex-start;padding-right:20px}.dialog-title h2{margin:0;font-size:20px}.dialog-title p,.section-heading p{margin:5px 0 0;color:#77839a;font-size:13px}.workspace{display:grid;grid-template-columns:minmax(380px,1fr) minmax(430px,1fr);min-height:630px}.left-pane,.right-pane{padding:22px 28px}.left-pane{background:#f8faff;border-right:1px solid #e4eaf3}.section-heading{display:flex;gap:10px;align-items:flex-start;margin-bottom:21px}.section-heading h3{margin:0;font-size:16px}.section-heading b{color:#d13b3b}.step{display:grid;place-items:center;width:24px;height:24px;border-radius:50%;background:#276fe8;color:#fff;font-weight:700}.field-label{font-weight:600;margin-bottom:8px}.field-label span{font-weight:400;color:#8994a7;font-size:12px}.upload-block :deep(.el-upload){width:100%}.upload-block :deep(.el-upload-dragger){width:100%;padding:25px 15px}.upload-title{font-weight:600;color:#3d4b64}.notice{display:flex;gap:8px;align-items:flex-start;margin-top:18px;padding:11px 12px;border:1px solid #f2dc9e;border-radius:7px;background:#fff9e8;color:#765c18;font-size:12px}.notice span{line-height:1.55}.left-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:20px}.right-pane{background:white}.ai-summary{display:flex;justify-content:space-between;margin-bottom:16px;padding:9px 11px;border-radius:6px;background:#edf5ff;color:#2765bd;font-size:13px}.ai-summary small{color:#6e7b90}.source{margin-left:6px;padding:2px 5px;border-radius:3px;background:#fff3d3;color:#89620b;font-size:11px;font-style:normal;font-weight:400}.form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}.el-date-editor,.el-select,.el-input-number{width:100%}.dialog-footer{display:flex;justify-content:flex-end;gap:8px}.purchase-dialog :deep(.el-dialog__body){padding:0;max-height:82vh;overflow-y:auto}.purchase-dialog :deep(.el-dialog__header){margin:0;padding:22px 28px;border-bottom:1px solid #e8edf4}@media(max-width:840px){.workspace{grid-template-columns:1fr}.left-pane{border-right:0;border-bottom:1px solid #e4eaf3}.purchase-dialog{width:96vw!important}.left-pane,.right-pane{padding:20px}}
</style>
