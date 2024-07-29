export interface dataGrows {
  id?: number
  name: string
  description: string
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
