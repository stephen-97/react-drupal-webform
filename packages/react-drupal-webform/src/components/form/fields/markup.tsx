import { TFieldWebformObj } from '../../../lib/types/components/field'
import cn from 'classnames'
import Wysiwyg from './fields-special-components/wysiwyg/wysiwyg'
import { MarkupProps } from '../../../lib/types/components/markup'
import {
  getClassNames,
  getDataAttributes,
} from '../../../lib/functions/utils_functions'

const Markup = (props: MarkupProps) => {
  const {
    field,
    fieldKey,
    components,
    className,
    classNamePrefix,
    innerProps,
    unstyled,
  } = props

  const markup = field?.['#markup']
  if (!markup?.length) return null

  const WysiwygComponent = components?.wysiwyg ?? Wysiwyg

  const markupClassNames = getClassNames({
    name: 'markup',
    prefix: classNamePrefix,
    unstyled: unstyled,
    classNameComponent: className,
    baseCn: cn(...(field?.['#attributes']?.class ?? [])),
  })

  const dataAttributes = getDataAttributes({
    component: 'markup',
  })

  return (
    <div className={markupClassNames} {...innerProps} {...dataAttributes}>
      <WysiwygComponent
        classNamePrefix={classNamePrefix}
        processed={markup}
        fieldKey={fieldKey}
        field={field}
        components={components}
        unstyled={unstyled}
        source="markup"
      />
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
