import {ComponentType} from 'react'
import {AccessorFn, DeepKeys} from '@tanstack/react-table'
import {TableCellType, TableCellOptions} from '@sphereon/ui-components.ssi-react'

export type TabRoute = {
  key: string
  title: string
}

export type TabViewRoute = TabRoute & {
  content: ComponentType<unknown>
}

export type TabNavigationState = {
  index: number
  routes: Array<TabViewRoute>
}

export type ColumnHeader<T> = {
  accessor: AccessorFn<T> | DeepKeys<T>
  type: TableCellType
  label?: string
  opts?: TableCellOptions
}

export type Button = {
  caption: string
  onClick: () => Promise<void>
  icon?: string
  disabled?: boolean
}

export enum LabelTypeEnum {
  ISSUER = 'Issuer',
  VERIFIER = 'Verifier',
}

export type ValueSelection = {
  label: string
  value: string
}

export type SelectedAssetFile = {
  file: File
  permission: AssetFilePermission
}

export enum AssetFilePermission {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export type DetailsRoute = {
  routeId: string
  label: string
  routes?: Array<DetailsRoute>
}

export type KeyValuePair = {
  label: string
  value: string
}

export type SelectionFieldDetail = {
  title?: string
  value: string
}

export type NavigationRoute = {
  target: string
  label: string
}
