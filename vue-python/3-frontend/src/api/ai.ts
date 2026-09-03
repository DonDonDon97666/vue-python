import { api } from './client'

export interface ProcurementFields {
  material: string | null
  specification: string | null
  quantity: number | null
  unit: string | null
  expectedDeliveryDate: string | null
  purpose: string | null
  preferredBrand: string | null
  preferredSupplier: string | null
}

interface ExtractionResult {
  jobId: string
  status: 'SUCCEEDED'
  fields: ProcurementFields
  missingFields: string[]
  ambiguities: string[]
}

export async function extractProcurementFields(draftId: string, message: string): Promise<ExtractionResult> {
  const { data } = await api.post<{ data: ExtractionResult }>(`/drafts/${draftId}/ai-extractions`, {
    message,
    clientRequestId: crypto.randomUUID(),
    expectedVersion: 0,
  })
  return data.data
}
