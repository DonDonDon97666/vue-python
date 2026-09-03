import { api } from './client'
import type { ProcurementFields } from './ai'

export interface DraftPayload {
  rawText: string
  fields: ProcurementFields
}

export interface SavedDraft extends DraftPayload {
  id: string
  status: 'DRAFT' | 'SUBMITTED'
  version: number
  updatedAt: string
}

export interface DraftListResult {
  items: SavedDraft[]
  total: number
  page: number
  pageSize: number
}

export async function createDraft(payload: DraftPayload): Promise<SavedDraft> {
  const { data } = await api.post<{ data: SavedDraft }>('/drafts', payload)
  return data.data
}

export async function updateDraft(draftId: string, payload: DraftPayload, expectedVersion: number): Promise<SavedDraft> {
  const { data } = await api.patch<{ data: SavedDraft }>(`/drafts/${draftId}`, { ...payload, expectedVersion })
  return data.data
}

export async function getDrafts(status: 'DRAFT' | 'SUBMITTED', page = 1, pageSize = 20): Promise<DraftListResult> {
  const { data } = await api.get<{ data: DraftListResult }>('/drafts', { params: { status, page, pageSize } })
  return data.data
}
