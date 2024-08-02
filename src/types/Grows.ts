export interface Grow {
  id: number
  name: string
  description: string
  status?: string
}
export interface GrowState {
  grows: Grow[]
  error: string | null
  isLoaderActive: boolean
  requestProgress: boolean
}
export interface ChangeGrow {
  id: number
}
export interface GrowEdit {
  id_update: number
  name: string
  description: string
}
