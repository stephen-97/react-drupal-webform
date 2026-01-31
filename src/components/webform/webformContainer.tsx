'use client'

import YAML from 'yaml'

require('@/lib/wdyr')

import Webform from '../../../packages/react-drupal-webform/src/components/webform'
import { TWebformStateMessages } from '../../../packages/react-drupal-webform/src/lib/types/form.d'
import { useState } from 'react'

export type TWebformContainer = {
  elementsSource: string
}

const WebformContainer = ({ elementsSource }: TWebformContainer) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
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

  const handleSubmit = (formData: Record<any, string>) => {
    setIsSubmitted(true)
    console.log(formData)
  }

  const correctElementsSource = YAML.parse(elementsSource)

  const defaultStateValues: TWebformStateMessages = {
    general: {
      errorMessage: 'Invalid value.',
      requiredMessage: 'This field is required',
    },
    fields: {
      errorMessages: {
        textarea: 'Please enter valid text.',
        email: 'Please enter a valid email address.',
        date: 'Please enter a valid date.',
        radios: 'Please select an option.',
        checkbox: 'This checkbox value is invalid.',
        checkboxes: 'Please select at least one option.',
        select: 'Please select a value.',
        managed_file: 'Please upload a valid file.',
        hidden: '',
      },
      requiredMessages: {
        textarea: 'This textarea is required.',
        email: 'Email is required.',
        number: 'Number is required.',
        tel: 'Phone number is required.',
        date: 'Date is required.',
        radios: 'Please choose one option.',
        checkbox: 'This checkbox must be checked.',
        checkboxes: 'Please select at least one option.',
        select: 'Please select a value.',
        managed_file: 'A file is required.',
        hidden: '',
      },
      minLengthMessages: {
        textfield: (props) => {
          const title = props?.['#title']
          const minLenght = props?.['#minlength']
          return `the field ${title} have a minimum of ${minLenght} characters`
        },
      },
    },
  }

  return (
    <Webform
      elementsSource={correctElementsSource}
      onSubmit={handleSubmit}
      defaultFieldStateMessages={defaultStateValues}
      showConfirmation={true}
      isSubmitted={isSubmitted}
      classNamePrefix={'top'}
      unstyled={false}
      validationMode={'onChange'}
    />
  )
}

export default WebformContainer
