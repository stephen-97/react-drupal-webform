import cn from 'classnames'
import styles from './field.module.scss'
import React from 'react'
import { TFieldObj } from '@/lib/types/components/field'
import Loader from '@/components/webform/form/fields/fields-sub-components/loader/loader'

export const renderAction = ({
  field,
  key,
  submitButtonRef,
  formState,
}: TFieldObj) => {
  const { isSubmitting, isValid } = formState || {}

  return (
    <React.Fragment key={key}>
      <button
        className={cn(styles.button, ...(field?.['#attributes']?.class ?? []))}
        type="submit"
        ref={submitButtonRef}
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting && <Loader />}
        {field?.['#submit__label'] ?? 'Submit'}
      </button>
    </React.Fragment>
  )
}
