'use client'

import YAML from 'yaml'

require('@/lib/wdyr')

import Webform from '../../../../packages/react-drupal-webform/src/components/webform'
import CustomInput from '@/components/webform/custom-components/customInput'
import styles from './customWebform.module.scss'
import CustomLabel from '@/components/webform/custom-components/customLabel'
import CustomStepper from '@/components/webform/custom-components/customStepper'
import CustomMultiStepActions from '@/components/webform/custom-components/customMultiStepActions'
import CustomSelect from '@/components/webform/custom-components/customSelect'
import CustomMore from '@/components/webform/custom-components/customMore'
import CustomWysiwyg from '@/components/webform/custom-components/customWysiwyg'
import { useState } from 'react'
import {
  customClassnames,
  customValidators,
} from '@/components/webform/customWebform/custom-objects'
import CustomWrapper from '@/components/webform/custom-components/customWrapper'
import CustomAction from '@/components/webform/custom-components/customAction'
import CustomHelp from '@/components/webform/custom-components/CustomHelp'

export type TWebformContainer = {
  elementsSource: string
}

const CustomWebform = ({ elementsSource }: TWebformContainer) => {
  const [isSubmitted, setIsSubmitted] = useState(false)
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
    return fakeSubmit(formData)
      .then(() => {
        setIsSubmitted(true)
        console.log(formData)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const correctElementsSource = YAML.parse(elementsSource)

  return (
    <div className={styles.customWebformContainer}>
      <Webform
        elementsSource={correctElementsSource}
        onSubmit={handleSubmit}
        customValidators={customValidators}
        classNames={customClassnames}
        isSubmitted={isSubmitted}
        components={{
          input: CustomInput,
          title: CustomLabel,
          multiStepStepper: CustomStepper,
          multiStepActions: CustomMultiStepActions,
          select: CustomSelect,
          more: CustomMore,
          wysiwyg: CustomWysiwyg,
          action: CustomAction,
          wrapper: CustomWrapper,
          help: CustomHelp,
        }}
      />
    </div>
  )
}
export default CustomWebform
