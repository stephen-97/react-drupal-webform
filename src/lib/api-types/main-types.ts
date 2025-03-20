export type TDrupal_PathData = {
  resolved: string
  isHomePath: boolean
  entity: {
    canonical: string
    type: string
    bundle: string
    id: string
    uuid: string
    path: string
  }
  label: string
  jsonapi: {
    individual: string
    resourceName: string
    pathPrefix: string
    basePath: string
    entryPoint: string
  }
  meta: {
    deprecated: {
      'jsonapi.pathPrefix': string
    }
  }
}
