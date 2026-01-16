import { TFieldWebformObj } from '../../../lib/types/components/field'
import cn from 'classnames'
import Wysiwyg from './fields-special-components/wysiwyg/wysiwyg'
import { MarkupProps } from '../../../lib/types/components/markup'

const Markup = (props: MarkupProps) => {
  const { field, classNames, components, className } = props

  const markup = field?.['#markup']
  if (!markup?.length) return null

  const WysiwygComponent = components?.wysiwyg ?? Wysiwyg

  return (
    <div
      className={cn(
        ...(field?.['#attributes']?.class ?? []),
        classNames.fields.markup.base,
        className
      )}
    >
      <WysiwygComponent processed={markup} source="markup" />
    </div>
  )
}

export const renderMarkup = (props: TFieldWebformObj) => {
  const { fieldKey, field, components } = props

  if (!field?.['#markup']?.length) return null

  const MarkupComponent =
    components?.fieldById?.[fieldKey] ?? components?.markup ?? Markup

  return <MarkupComponent {...props} />
}

export default Markup
