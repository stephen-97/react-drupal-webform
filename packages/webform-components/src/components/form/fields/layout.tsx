import React from 'react'
import cn from 'classnames'
import styles from './field.module.scss'
import { TFieldWebformObj } from '../../../lib/types/components/field'
import FormFieldRendered from '../formDefault/formFieldRendered'

const renderLayout = (props: TFieldWebformObj) => {
  const { key, field, classNames, components, valueFormat } = props

  const childKeys = Object.keys(field).filter((k) => !k.startsWith('#'))

  return (
    <div key={key} className={cn(styles.container)}>
      {field['#title'] && (
        <div className={cn(styles.containerTitle)}>{field['#title']}</div>
      )}

      <div className={cn(styles.containerInner)}>
        {childKeys.map((childKey, i) => (
          <FormFieldRendered
            key={childKey}
            fieldKey={childKey}
            index={i}
            field={(field as any)[childKey]}
            valueFormat={valueFormat}
            components={components}
            classNames={classNames}
            isMultiStep={false}
          />
        ))}
      </div>
    </div>
  )
}

export default renderLayout
