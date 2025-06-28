'use client'

import styles from './multiStepActions.module.scss'
import stylesField from '../../fields/field.module.scss'
import React from 'react'
import cn from 'classnames'
import { IMultiStepActionsProps } from '@/lib/types/components/multiStepActions'

const MultiStepActions = (props: IMultiStepActionsProps) => {
  const {
    step,
    previousButtonLabel,
    isStepValid,
    nextButtonLabel,
    goPrev,
    components,
  } = props

  const CustomMultiStepActions = components?.multiStepActions

  if (CustomMultiStepActions) {
    return <CustomMultiStepActions {...props} />
  }

  return (
    <div className={styles.multiStepActions}>
      {step > 0 && (
        <button
          className={cn(stylesField.button, styles.button)}
          type="button"
          onClick={goPrev}
        >
          {previousButtonLabel && previousButtonLabel.length > 0
            ? previousButtonLabel
            : 'prev'}
        </button>
      )}
      <button
        className={cn(stylesField.button, styles.button)}
        disabled={!isStepValid}
        type="submit"
      >
        {nextButtonLabel && nextButtonLabel?.length > 0
          ? nextButtonLabel
          : 'Next'}
      </button>
    </div>
  )
}

export default React.memo(MultiStepActions)
