import DOMPurify from 'isomorphic-dompurify'
import { TFieldWebformObj } from '../../../lib/types/components/field'
import styles from './field.module.scss'
import cn from 'classnames'

export const renderMarkup = (props: TFieldWebformObj) => {
  const { field, fieldKey, classNames, components } = props

  if (!(field?.['#markup'] && field?.['#markup']?.length > 0)) {
    return null
  }

  const CustomMarkup = components?.fieldById?.[fieldKey] ?? components?.markup

  if (CustomMarkup) {
    return <CustomMarkup {...props} />
  }

  return (
    <div
      key={fieldKey}
      className={cn(
        ...(field?.['#attributes']?.class ?? []),
        classNames.fields.markup.base
      )}
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(field['#markup'], {
          ADD_TAGS: ['iframe'],
          ADD_ATTR: ['target'],
        }),
      }}
    ></div>
  )
}
