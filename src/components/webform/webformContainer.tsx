'use client'

require('@/lib/wdyr')

import Webform from '@/components/webform/webform'
import { UseFormProps } from 'react-hook-form'
import styles from './webformContainer.module.scss'
import errorMessageCustom from '@/components/webform/custom-components/errorMessageCustom'

export type TWebformContainer = {
  elementsSource: string
  confirmationPath: string
}

const WebformContainer = ({
  elementsSource,
  confirmationPath,
}: TWebformContainer) => {
  const yupUseFormProps: UseFormProps = {
    mode: 'onChange',
    reValidateMode: 'onBlur',
  }

  return (
    <Webform
      elementsSource={elementsSource}
      confirmationPath={confirmationPath}
      yup={{ yupUseFormProps }}
      valueFormat={{
        radios: 'booleanMap',
        select: 'key',
        checkboxes: 'booleanMap',
      }}
      defaultFieldValues={{
        textfield: '',
      }}
      components={{
        errorFieldMessage: errorMessageCustom,
      }}
      classNames={{
        wrappers: {
          base: styles.fieldWrapper,
          byCategory: {
            textInput: styles.fieldTextInput,
          },
          byFieldType: {
            textfield: styles.textfield,
          },
        },
        general: {
          fieldLabel: styles.fieldLabel,
        },
        states: {
          fieldError: styles.fieldError,
          fieldErrorMessage: styles.fieldErrorMessage,
        },
      }}
      defaultFieldStateMessages={{
        fields: {
          errorMessages: {
            email: 'Wrong email',
          },
        },
      }}
    />
  )
}

WebformContainer.whyDidYouRender = true
export default WebformContainer
