'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useMultiStepContext } from '../../../../packages/webform-components/src/components/form/formMultiStep/multiStepContext'
const CustomMultiStepActions = () => {
  const { trigger, formState, getValues } = useFormContext()
  const { stepIndex, setStepIndex, totalSteps } = useMultiStepContext()

  const onPrev = () => {
    setStepIndex((prev) => Math.max(prev - 1, 0))
  }

  const onNext = async () => {
    const valid = await trigger()
    console.log('Current values:', getValues())
    if (valid) {
      setStepIndex((prev) => Math.min(prev + 1, totalSteps - 1))
    }
  }

  return (
    <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
      {stepIndex > 0 && (
        <button
          type="button"
          onClick={onPrev}
          disabled={formState.isSubmitting}
          style={{ padding: '0.5rem 1rem', background: '#eee' }}
        >
          Prev
        </button>
      )}

      <button
        type="button"
        onClick={onNext}
        disabled={formState.isSubmitting}
        style={{ padding: '0.5rem 1rem', background: '#333', color: '#fff' }}
      >
        {formState.isSubmitting
          ? 'Loading...'
          : stepIndex === totalSteps - 1
            ? 'Submit'
            : 'Next'}
      </button>
    </div>
  )
}

export default CustomMultiStepActions
