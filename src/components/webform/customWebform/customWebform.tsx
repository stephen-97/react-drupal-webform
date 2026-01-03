'use client'

import YAML from 'yaml'

require('@/lib/wdyr')

import * as yup from 'yup'
import Webform from '../../../../packages/react-drupal-webform/src/components/webform'
import CustomInput from '@/components/webform/custom-components/customInput'
import styles from './customWebform.module.scss'
import CustomLabel from '@/components/webform/custom-components/customLabel'
import CustomStepper from '@/components/webform/custom-components/customStepper'
import CustomMultiStepActions from '@/components/webform/custom-components/customMultiStepActions'
import { TFieldValidate } from '../../../../packages/react-drupal-webform/src/lib/types/components/validate'
import CustomSelect from '@/components/webform/custom-components/customSelect'
import CustomMore from '@/components/webform/custom-components/customMore'
import { TWebformClassNames } from '../../../../packages/react-drupal-webform/src/lib/types/form.d'
import CustomWysiwyg from '@/components/webform/custom-components/customWysiwyg'

export type TWebformContainer = {
  elementsSource: string
}

const CustomWebform = ({ elementsSource }: TWebformContainer) => {
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
      .then((response: any) => {
        console.log(formData)
        console.log(response.message)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const correctElementsSource = YAML.parse(elementsSource)

  const customClassnames: TWebformClassNames = {
    fields: {
      layout: {
        inner: styles.customLayout,
      },
    },
  }

  const customValidators = {
    byId: {
      your_favorite_food_starting_with_a_m: (ctx: TFieldValidate) => {
        const isRequired = Boolean(ctx.field?.['#required'])
        const requiredMessage =
          ctx.field?.['#required_error'] ?? ctx.requiredMessage

        let schema = yup.string()

        if (isRequired) {
          schema = schema.required(requiredMessage)
        }

        return schema.test(
          'starts-with-m',
          'The value must start with the letter "m".',
          (value) => {
            if (!value) return true

            return value.trim().toLowerCase().startsWith('m')
          }
        )
      },
    },
  }

  return (
    <div className={styles.customWebformContainer}>
      <Webform
        elementsSource={correctElementsSource}
        onSubmit={handleSubmit}
        customValidators={customValidators}
        classNames={customClassnames}
        components={{
          input: CustomInput,
          label: CustomLabel,
          multiStepStepper: CustomStepper,
          multiStepActions: CustomMultiStepActions,
          select: CustomSelect,
          more: CustomMore,
          wysiwyg: CustomWysiwyg,
        }}
      />
    </div>
  )
}
export default CustomWebform
