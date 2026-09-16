export interface ConnectedObject {
  id: string
  name: string
  description: string
  category: string
  image?: string
  specs: Record<string, string>
}
