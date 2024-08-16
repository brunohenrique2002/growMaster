export interface Grow {
  id: number
  name: string
  description: string
  status?: string
}
export interface GrowState {
  grows: Grow[]
  error: string | null
  requestProgress: boolean
  isDeleting: boolean
  deletePromise: Promise<void> | null
}
export interface ChangeGrow {
  id: number
}
export interface GrowEdit {
  id_update: number
  name: string
  description: string
}
