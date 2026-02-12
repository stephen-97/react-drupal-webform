'use client'

import { useState, useMemo } from 'react'
import YAML from 'yaml'

import { TWebformStateMessages } from '../../../packages/react-drupal-webform/src/lib/types/form'
import Webform from '../../../packages/react-drupal-webform/src/components/webform'
import ConfirmationView from '@/components/webform/customWebform/confirmationView'

export type TWebformContainer = {
  elementsSource: string
  validationEngine?: 'rhf' | 'html'
}

const WebformContainer = ({
  elementsSource,
  validationEngine = 'html',
}: TWebformContainer) => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedData, setSubmittedData] = useState<Record<
    string,
    any
  > | null>(null)

  const correctElementsSource = useMemo(
    () => YAML.parse(elementsSource),
    [elementsSource]
  )

  const handleSubmit = (formData: Record<string, any>) => {
    setSubmittedData(formData)
    setIsSubmitted(true)
  }

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
          const minLength = props?.['#minlength']
          return `The field ${title} must have a minimum of ${minLength} characters.`
        },
      },
    },
  }

  if (isSubmitted && submittedData) {
    return <ConfirmationView data={submittedData} />
  }

  return (
    <Webform
      elementsSource={correctElementsSource}
      onSubmit={handleSubmit}
      rhfDefaultFieldStateMessages={defaultStateValues}
      classNamePrefix="prefix"
      unstyled={false}
      validationEngine={validationEngine}
      rhfValidationMode="all"
    />
  )
}

export default WebformContainer
