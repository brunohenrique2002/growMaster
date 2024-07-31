export interface plant {
  name: string | null
  status: string
  created: string
}
export interface PlantsState {
  plants: plant[]
  error: string | null
  isLoaderActive: boolean
  requestProgress: boolean
}
export interface deletePlant {
  id: number
}
