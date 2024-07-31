export interface Grow {
  id?: number
  name: string
  description: string
  status: string
}
export interface GrowState {
  grows: Grow[]
  error: string | null
  isLoaderActive: boolean
  requestProgress: boolean
}
export interface deleteGrow {
  id: number
}
