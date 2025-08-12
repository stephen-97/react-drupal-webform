import { string, array } from 'yup'
import { TWebformCustomValidators } from '@/lib/types/form.d'

export const customValidatorObj: TWebformCustomValidators = {
  byId: {
    email: ({ required, requiredMessage, errorMessage }) =>
      string()
        .test(
          'is-gmail-fr',
          'L’email doit être une adresse Gmail en .fr',
          (value) => {
            if (!value) return true
            return value.endsWith('@gmail.fr')
          }
        )
        .email(errorMessage)
        [required ? 'required' : 'notRequired'](requiredMessage)
        .nullable(),

    checkboxes_test: ({ required }) =>
      required
        ? array()
            .of(string())
            .min(1, 'Sélectionnez au moins une option (message custom ID)')
            .required('Champ requis : cochez au moins une case')
        : array().of(string()).notRequired().nullable(),
  },

  byType: {
    email: ({ required, requiredMessage, errorMessage }) =>
      string()
        .test('is-gmail', 'L’email doit être une adresse Gmail', (value) => {
          if (!value) return true
          return value.includes('@gmail.')
        })
        .email(errorMessage)
        [required ? 'required' : 'notRequired'](requiredMessage)
        .nullable(),

    textarea: ({ required, requiredMessage }) =>
      required
        ? string()
            .when('textfield', {
              is: (val: string) => val === 'special',
              then: (schema) =>
                schema.min(
                  10,
                  'Si textfield vaut "special", le textarea doit avoir au moins 10 caractères'
                ),
              otherwise: (schema) =>
                schema.min(3, 'Le champ doit contenir au moins 3 caractères'),
            })
            .required(requiredMessage)
        : string()
            .when('textfield', {
              is: (val: string) => val === 'special',
              then: (schema) =>
                schema.min(
                  10,
                  'Si textfield vaut "special", le textarea doit avoir au moins 10 caractères'
                ),
              otherwise: (schema) =>
                schema.min(3, 'Le champ doit contenir au moins 3 caractères'),
            })
            .notRequired()
            .nullable(),

    textfield: ({ required, requiredMessage }) =>
      required
        ? string()
            .min(4, 'Le champ doit contenir au moins 4 caractères')
            .required(requiredMessage)
        : string()
            .min(4, 'Le champ doit contenir au moins 4 caractères')
            .notRequired()
            .nullable(),

    checkboxes: ({ required }) =>
      required
        ? array()
            .of(string())
            .min(1, 'Vous devez sélectionner au moins une option')
            .required('Veuillez choisir au moins une option')
        : array().of(string()).notRequired().nullable(),
  },
}
