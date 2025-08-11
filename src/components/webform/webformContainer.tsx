'use client'

require('@/lib/wdyr')

import Webform from '@/components/webform/webform'
import styles from './webformContainer.module.scss'
import errorMessageCustom from '@/components/webform/custom-components/errorMessageCustom'

export type TWebformContainer = {
  elementsSource: string
}

const WebformContainer = ({ elementsSource }: TWebformContainer) => {
  const fakeSubmit = (data: Record<any, string>) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Formulaire soumis avec succès (fake).',
          data,
        })
      }, 3000)
    })
  }

  const handleSubmit = async (formData: Record<any, string>) => {
    console.log('result', formData)
    return fakeSubmit(formData)
      .then((response: any) => {
        console.log(response.message)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <Webform
      elementsSource={elementsSource}
      onSubmit={(data) => handleSubmit(data)}
      valueFormat={{
        radios: 'booleanMap',
        select: 'booleanMap',
        checkboxes: 'keyValue',
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
    />
  )
}

WebformContainer.whyDidYouRender = true
export default WebformContainer
