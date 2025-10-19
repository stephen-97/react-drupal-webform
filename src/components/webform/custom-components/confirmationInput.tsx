'use client'

import React from 'react'
import cn from 'classnames'
import { useFormContext, useController } from 'react-hook-form'
import { TFieldRendererProps } from '../../../../packages/webform-components/src/lib/types/components/fieldRenderer'
import styles from './custom.module.scss'

const ConfirmationInput = (props: TFieldRendererProps) => {
  const { fieldKey, field, classNames } = props

  // ✅ Récupération du control RHF
  const { control } = useFormContext()

  // ✅ Connexion du champ au système RHF/Yup
  const { field: fieldController, fieldState } = useController({
    name: fieldKey,
    control,
  })

  return (
    <div className={styles.wrapper}>
      <input
        id={fieldKey}
        name={fieldController.name}
        type="text"
        placeholder={field?.['#placeholder'] ?? 'Saisissez la confirmation...'}
        value={fieldController.value ?? ''}
        // ✅ Gestion du changement via RHF → déclenche la validation Yup
        onChange={(e) => fieldController.onChange(e.target.value)}
        // ✅ Gère le "touched" pour Yup
        onBlur={fieldController.onBlur}
        className={cn(classNames.fields.textInputs.base, styles.input, {
          [styles.error]: fieldState.error,
        })}
        required={field?.['#required']}
      />
    </div>
  )
}

export default ConfirmationInput
