import { TFieldWebformObj } from '../../../lib/types/components/field'
import Hidden from './fields-elements/hidden'

export const renderHidden = (props: TFieldWebformObj) => {
  const { fieldKey, components } = props

  const CustomHidden = components?.fieldById?.[fieldKey] ?? components?.hidden

  if (CustomHidden) {
    return <CustomHidden {...props} />
  }

  return <Hidden {...props} />
}
