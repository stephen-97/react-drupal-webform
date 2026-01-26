import { TFieldValidate } from '../../../../packages/react-drupal-webform/src/lib/types/components/validate'
import * as yup from 'yup'

export const customValidators = {
  byType: {
    webform_height: (ctx: TFieldValidate) => {
      const isRequired = Boolean(ctx.field?.['#required'])
      const requiredMessage =
        ctx.field?.['#required_error'] ?? ctx.requiredMessage

      let schema = yup
        .number()
        .typeError('Height must be a number')
        .min(0, 'Height must be a positive number')

      if (isRequired) {
        schema = schema.required(requiredMessage)
      }

      return schema
    },
  },
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
