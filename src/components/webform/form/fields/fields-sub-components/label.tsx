import React from 'react'
import { LabelProps } from 'react-html-props'

interface ILabel {
  title: string
  className?: string
}
const Label = ({ title, className }: ILabel) => {
  return <label className={className}>{title}</label>
}

export type { ILabel }

export default Label
