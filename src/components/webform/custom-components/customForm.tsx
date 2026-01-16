'use client'

import React from 'react'
import styles from './customForm.module.scss'
import { components } from '../../../../packages/react-drupal-webform/src/lib/const/const.form'
import { FormProps } from '../../../../packages/react-drupal-webform/src/lib/types/components/form'

const CustomForm = (props: FormProps) => {
  return (
    <components.Form
      innerProps={{ 'data-test': 'tests' }}
      className={styles.form}
      {...props}
    ></components.Form>
  )
}

export default React.memo(CustomForm)
