import cn from 'classnames'
import styles from './field.module.scss'
import React from 'react'
import { TFieldObj } from '@/components/webform/form/fields/utils'

export const renderAction = ({
  field,
  key,
  keyForMap,
  submitButtonRef,
  isValid,
}: TFieldObj) => {
  return (
    <React.Fragment key={keyForMap}>
      <button
        className={styles.button}
        type={'submit'}
        ref={submitButtonRef}
        disabled={!isValid}
      >
        {field?.['#submit__label']}
      </button>
    </React.Fragment>
  )
}
