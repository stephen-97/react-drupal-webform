import cn from 'classnames'
import styles from './field.module.scss'
import React from 'react'
import { TFieldWebformObj } from '../../../lib/types/components/field'
import Loader from './fields-sub-components/loader/loader'
import { useFormContext } from 'react-hook-form'
import { ActionProps } from '../../../lib/types/components/action'
import { getClassNames } from '../../../lib/functions/utils_functions'

export const Action = ({
  field,
  innerProps,
  className,
  classNamePrefix,
  unstyled,
  components,
  fieldKey,
}: ActionProps) => {
  const { formState } = useFormContext()
  const { isSubmitting, isValid } = formState

  const actionClassNames = getClassNames({
    name: 'action',
    prefix: classNamePrefix,
    unstyled: unstyled,
    baseCn: cn(
      styles.button,
      className,
      ...(field?.['#attributes']?.class ?? [])
    ),
  })

  return (
    <button
      type="submit"
      disabled={!isValid || isSubmitting}
      className={actionClassNames}
      {...innerProps}
    >
      {isSubmitting && (
        <Loader
          components={components}
          field={field}
          fieldKey={fieldKey}
          classNamePrefix={classNamePrefix}
          unstyled={unstyled}
        />
      )}
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
