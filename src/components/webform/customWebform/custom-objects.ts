import { TFieldValidate } from '../../../../packages/react-drupal-webform/src/lib/types/components/validate'
import styles from './customWebform.module.scss'
import { TWebformClassNames } from '../../../../packages/react-drupal-webform/src/lib/types/form.d'
import * as yup from 'yup'

export const customClassnames: TWebformClassNames = {
  fields: {
    layout: {
      inner: styles.customLayout,
    },
  },
  general: {
    fieldMore: styles.customMore,
  },
}

export const customValidators = {
  byId: {
    your_favorite_fruit: (ctx: TFieldValidate) => {
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
