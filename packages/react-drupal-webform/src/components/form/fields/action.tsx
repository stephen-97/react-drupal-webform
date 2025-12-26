import cn from 'classnames'
import styles from './field.module.scss'
import React from 'react'
import { TFieldWebformObj } from '../../../lib/types/components/field'
import Loader from './fields-sub-components/loader/loader'
import { useFormContext } from 'react-hook-form'

export const renderAction = ({
  field,
  fieldKey,
  submitButtonRef,
}: TFieldWebformObj) => {
  const { formState } = useFormContext()
  const { isSubmitting, isValid } = formState

  return (
    <React.Fragment key={fieldKey}>
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
