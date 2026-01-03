import { TFieldWebformObj } from '../../../lib/types/components/field'
import cn from 'classnames'
import Wysiwyg from './fields-special-components/wysiwyg/wysiwyg'

export const renderMarkup = (props: TFieldWebformObj) => {
  const { field, fieldKey, classNames, components } = props

  if (!field?.['#markup']?.length) {
    return null
  }

  const CustomMarkup = components?.fieldById?.[fieldKey] ?? components?.markup

  if (CustomMarkup) {
    return <CustomMarkup {...props} />
  }

  const CustomWysiwyg = components?.wysiwyg

  if (CustomWysiwyg) {
    return (
      <CustomWysiwyg
        processed={field['#markup']}
        source="markup"
        className={cn(
          ...(field?.['#attributes']?.class ?? []),
          classNames.fields.markup.base
        )}
      />
    )
  }

  return (
    <Wysiwyg
      processed={field['#markup']}
      source="markup"
      className={cn(
        ...(field?.['#attributes']?.class ?? []),
        classNames.fields.markup.base
      )}
    />
  )
}
