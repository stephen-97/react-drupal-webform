import React from 'react'

interface ILabel {
  title: string
}
const Label = ({ title }: ILabel) => {
  return <label>{title}</label>
}

export default Label
