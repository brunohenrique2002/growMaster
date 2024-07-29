export interface PlantsState {
  plants: plant[]
  error: string | null
  isLoaderActive: boolean
  requestProgress: boolean
}
export interface deletePlant {
  id: number
}
export interface dataPlants {
  name: string | null
  status: string
  created: string
  // grow: number
}
