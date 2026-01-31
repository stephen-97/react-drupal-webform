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
  disableActionButtonWhenInvalid,
}: ActionProps) => {
  const { formState } = useFormContext()
  const { isSubmitting, isValid } = formState

  const isDisabled = disableActionButtonWhenInvalid && !isValid

  const actionClassNames = getClassNames({
    name: 'action',
    prefix: classNamePrefix,
    unstyled: unstyled,
    classNameComponent: className,
    baseCn: cn(styles.button, ...(field?.['#attributes']?.class ?? [])),
  })

  const scrollToFirstInvalidField = () => {
    const firstInvalid = document.querySelector<HTMLElement>(
      'input:invalid, select:invalid, textarea:invalid'
    )

    if (firstInvalid) {
      firstInvalid.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })

      firstInvalid.focus({ preventScroll: true })
    }
  }

  const handleClick = () => {
    if (!isValid) {
      scrollToFirstInvalidField()
    }
  }

  return (
    <button
      type="submit"
      className={actionClassNames}
      disabled={isDisabled}
      onClick={handleClick}
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
