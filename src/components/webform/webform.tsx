import { getWebformProperties } from '@/lib/functions/webform_functions'
import FormDefault from '@/components/webform/form/formDefault/formDefault'
import {
  TWebform,
  TWebformClassNames,
  TWebformStateMessages,
} from '@/lib/types/form.d'
import {
  defaultValueFormatObj,
  defaultValuesClassnames,
  defaultValuesFieldStateMessages,
  defaultValuesObj,
} from '@/lib/const/const.form'
import {
  deepMergeDefaults,
  mergeObjects,
} from '@/lib/functions/utils_functions'
import { DeepRequired } from 'react-hook-form'
import { useMemo } from 'react'
import FormMultiStep from '@/components/webform/form/formMultiStep/formMultiStep'

const Webform = ({
  elementsSource,
  yup,
  valueFormat = {},
  defaultFieldValues = {},
  classNames = {},
  defaultFieldStateMessages = {},
  components,
  onSubmit,
  includeInactiveFieldsInSubmit = true,
}: TWebform) => {
  const { yupObject = {}, yupDefaultValues = {} } = yup

  const mergedValueFormat = useMemo(
    () => ({
      ...defaultValueFormatObj,
      ...valueFormat,
    }),
    [valueFormat]
  )

  const mergedDefaultFieldValues = useMemo(
    () => ({
      ...defaultFieldValues,
      ...defaultValuesObj,
    }),
    [defaultFieldValues]
  )

  const mergedDefaultValuesStateMessages = useMemo(
    () =>
      deepMergeDefaults(
        defaultValuesFieldStateMessages,
        defaultFieldStateMessages as Partial<TWebformStateMessages>
      ) as DeepRequired<TWebformStateMessages>,
    [defaultFieldStateMessages]
  )

  const mergedClassNames = useMemo(
    () =>
      mergeObjects(
        defaultValuesClassnames,
        classNames
      ) as Required<TWebformClassNames>,
    [classNames]
  )

  const { isMultiStep, elementsSources } = getWebformProperties(elementsSource)

  const Form = () => {
    if (isMultiStep) {
      return (
        <FormMultiStep
          yup={{ ...yup, yupObject, yupDefaultValues }}
          elementsSource={elementsSources}
          valueFormat={mergedValueFormat}
          defaultFieldValues={mergedDefaultFieldValues}
          defaultFieldStateMessages={mergedDefaultValuesStateMessages}
          classNames={mergedClassNames}
          components={components}
          onSubmit={onSubmit}
          includeInactiveFieldsInSubmit={includeInactiveFieldsInSubmit}
        />
      )
    }

    return (
      <FormDefault
        yup={{ ...yup, yupObject, yupDefaultValues }}
        elementsSource={elementsSources}
        valueFormat={mergedValueFormat}
        defaultFieldValues={mergedDefaultFieldValues}
        defaultFieldStateMessages={mergedDefaultValuesStateMessages}
        classNames={mergedClassNames}
        components={components}
        onSubmit={onSubmit}
        includeInactiveFieldsInSubmit={includeInactiveFieldsInSubmit}
      />
    )
  }

  return <>{elementsSource && <Form />}</>
}

export default Webform
