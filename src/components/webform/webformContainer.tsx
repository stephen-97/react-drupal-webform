'use client'

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
        radio: 'value',
        select: 'booleanMap',
        checkboxes: 'keyValue',
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
        fields: {
          textInputs: {
            base: styles.inputBase,
            types: {
              number: styles.number,
            },
          },
          select: {
            select: styles.select,
          },
        },
      }}
      defaultFieldStateMessages={{
        general: {
          errorMessage: 'Error Message is here',
          requiredMessage: 'Field is required NO',
        },
        fields: {
          errorMessages: {
            email: 'Wrong email',
          },
          requiredMessages: {
            textfield: 'The textfield is required',
            textarea: 'Textarea is required',
          },
        },
      }}
    />
  )
}

export default WebformContainer
