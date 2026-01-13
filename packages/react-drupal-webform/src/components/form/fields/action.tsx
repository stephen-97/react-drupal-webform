import cn from 'classnames'
import styles from './field.module.scss'
import React from 'react'
import { TFieldWebformObj } from '../../../lib/types/components/field'
import Loader from './fields-sub-components/loader/loader'
import { useFormContext } from 'react-hook-form'
import { ActionProps } from '../../../lib/types/components/action'

const Action = ({ field, innerProps }: ActionProps) => {
  const { formState } = useFormContext()
  const { isSubmitting, isValid } = formState

  return (
    <button
      type="submit"
      disabled={!isValid || isSubmitting}
      className={cn(styles.button, ...(field?.['#attributes']?.class ?? []))}
      {...innerProps}
    >
      {isSubmitting && <Loader />}
      {field?.['#submit__label'] ?? 'Submit'}
    </button>
  )
}

export const renderAction = (props: TFieldWebformObj) => {
  const { fieldKey, components } = props

  const CustomAction = components?.fieldById?.[fieldKey] ?? components?.action

  if (CustomAction) {
    return <CustomAction {...props} />
  }

  return (
    <React.Fragment key={fieldKey}>
      <Action {...props} />
    </React.Fragment>
  )
}
