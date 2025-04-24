import React from 'react'
import { components } from '@/lib/const/const.form'
import styles from './custom.module.scss'
import { ILabelWebformProps } from '@/lib/types/components/label'

const LabelCustom = ({ className, ...props }: ILabelWebformProps) => {
  return (
    <components.LabelWebform className={styles.customLabel} {...props}>
      <div>*</div>
    </components.LabelWebform>
  )
}
export default LabelCustom
