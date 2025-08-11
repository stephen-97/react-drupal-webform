import { getWebformProperties } from '@/lib/functions/webform_functions'
import FormDefault from '@/components/webform/form/formDefault/formDefault'
import { TWebform, TWebformStateMessages } from '@/lib/types/form.d'
import { TDeepRequiredClassNames } from '@/lib/types/deepRequired'
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
import { DeepRequired, UseFormProps } from 'react-hook-form'
import { useMemo } from 'react'
import FormMultiStep from '@/components/webform/form/formMultiStep/formMultiStep'

const Webform = ({
  elementsSource,
  valueFormat = {},
  defaultFieldValues = {},
  classNames = {},
  defaultFieldStateMessages = {},
  components,
  onSubmit,
  includeInactiveFieldsInSubmit = true,
}: TWebform) => {
  const yupUseFormProps: UseFormProps = {
    mode: 'onChange',
    reValidateMode: 'onBlur',
  }

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

  const mergedClassNames: TDeepRequiredClassNames = useMemo(
    () =>
      mergeObjects(
        defaultValuesClassnames,
        classNames
      ) as TDeepRequiredClassNames,
    [classNames]
  )

  const { isMultiStep, elementsSources } = getWebformProperties(elementsSource)

  const Form = () => {
    if (isMultiStep) {
      return (
        <FormMultiStep
          yup={{ yupUseFormProps }}
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
        yup={{ yupUseFormProps }}
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
