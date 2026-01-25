import { TFieldWebformObj } from '../../../lib/types/components/field'
import FieldContainer from './fields-sub-components/fieldContainer'
import Radios from './fields-elements/radios'

export const renderRadio = (props: TFieldWebformObj) => {
  const { fieldKey, field, classNames, components, classNamePrefix, unstyled } =
    props
  const FieldContainerComponent = components?.fieldContainer ?? FieldContainer

  if (!field?.['#options']) return null

  const CustomRadio = components?.fieldById?.[fieldKey] ?? components?.radios

  return (
    <FieldContainerComponent
      field={field}
      classNames={classNames}
      components={components}
      key={fieldKey}
      fieldKey={fieldKey}
      wrapperElement="fieldset"
      classNamePrefix={classNamePrefix}
      unstyled={unstyled}
    >
      {CustomRadio ? <CustomRadio {...props} /> : <Radios {...props} />}
    </FieldContainerComponent>
  )
}
