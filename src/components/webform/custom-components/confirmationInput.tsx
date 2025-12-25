'use client'

import React, { useState, useEffect } from 'react'
import cn from 'classnames'
import { useFormContext, useController, useWatch } from 'react-hook-form'
import { TFieldRendererProps } from '../../../../packages/webform-components/src/lib/types/components/fieldRenderer'
import styles from './custom.module.scss'

const AddressAutocompleteInput = (props: TFieldRendererProps) => {
  const { fieldKey, field, classNames } = props
  const { control, setValue } = useFormContext()

  // 🧠 RHF binding
  const { field: fieldController, fieldState } = useController({
    name: fieldKey,
    control,
  })

  // 👁️ Suivi en direct de la latitude/longitude
  const latitude = useWatch({ control, name: 'chantier_latitude' })
  const longitude = useWatch({ control, name: 'chantier_longitude' })

  const [suggestions, setSuggestions] = useState<any[]>([])

  useEffect(() => {
    if (!(window as any).google?.maps?.places) return
  }, [])

  const handleInputChange = async (value: string) => {
    fieldController.onChange(value)
    if (!value) return setSuggestions([])

    const service = new (window as any).google.maps.places.AutocompleteService()
    service.getPlacePredictions({ input: value }, (predictions: any) => {
      setSuggestions(predictions || [])
    })
  }

  const handleSelect = (prediction: any) => {
    const description = prediction.description
    fieldController.onChange(description)
    setSuggestions([])

    // ⚙️ Récupère les coordonnées via Places Details
    const placesService = new (window as any).google.maps.places.PlacesService(
      document.createElement('div')
    )

    placesService.getDetails(
      { placeId: prediction.place_id },
      (place: any, status: any) => {
        if (
          status ===
            (window as any).google.maps.places.PlacesServiceStatus.OK &&
          place?.geometry?.location
        ) {
          const lat = place.geometry.location.lat()
          const lng = place.geometry.location.lng()

          setValue('chantier_latitude', lat)
          setValue('chantier_longitude', lng)
        }
      }
    )
  }

  return (
    <div className={styles.wrapper}>
      <input
        id={fieldKey}
        name={fieldController.name}
        type="text"
        placeholder={field?.['#placeholder'] ?? 'Saisissez une adresse...'}
        value={fieldController.value ?? ''}
        onChange={(e) => handleInputChange(e.target.value)}
        onBlur={fieldController.onBlur}
        className={cn(classNames.fields.textInputs.base, styles.input, {
          [styles.error]: fieldState.error,
        })}
      />

      {/* ✅ Liste de suggestions stylée */}
      {suggestions.length > 0 && (
        <ul className={styles.suggestions}>
          {suggestions.map((s: any) => (
            <li
              key={s.place_id}
              onMouseDown={() => handleSelect(s)}
              className={styles.suggestionItem}
            >
              <strong>{s.structured_formatting.main_text}</strong>
              <small>{s.structured_formatting.secondary_text}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AddressAutocompleteInput
