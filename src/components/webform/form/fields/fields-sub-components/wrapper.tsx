import cn from 'classnames'
import styles from './wrapper.module.scss'
import { TElementSource } from '@/lib/types/field'
import { ReactElement } from 'react'
import { TWebformClassNameFields, TWebformClassNames } from '@/lib/types/form.d'
import Label from '@/components/webform/form/fields/fields-sub-components/label'

interface IWrapper {
  children: ReactElement
  isLabel?: boolean
  className?: string
  field: TElementSource
  classNames: Required<TWebformClassNames>
  classNameFieldName: keyof Required<TWebformClassNameFields>
  stateError?: boolean
}
const Wrapper = ({
  children,
  field,
  classNames,
  isLabel = true,
  stateError = false,
  classNameFieldName,
}: IWrapper) => {
  return (
    <div
      className={cn(
        ...(field?.['#attributes']?.class ?? []),
        classNames.types[field['#type']],
        classNames.fields?.[classNameFieldName],
        classNames.general.fieldWrapper,
        {
          [classNames.states.fieldError ?? '']: stateError,
        },
        styles.fieldWrapper
      )}
    >
      {isLabel && field?.['#title'] && (
        <Label
          className={classNames.general.fieldLabel}
          title={field['#title']}
        />
      )}
      {children}
    </div>
  )
}

export default Wrapper
