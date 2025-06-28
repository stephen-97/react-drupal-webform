import styles from './multiStepStepper.module.scss'
import React from 'react'
import cn from 'classnames'
import { IMultiStepStepperProps } from '@/lib/types/components/multiStepStepper'

const MultiStepActions = (props: IMultiStepStepperProps) => {
  const {
    step,
    isStepValid,
    multiStepTitleAs = 'span',
    currentStepObj,
    components,
  } = props

  const TagTitle = multiStepTitleAs
  const title: string | undefined = currentStepObj?.['#title']

  return (
    <div className={styles.multiStepStepper}>
      {title && title.length > 0 && (
        <TagTitle className={styles.title}>{title}</TagTitle>
      )}
      <div className={styles.progressBar} />
    </div>
  )
}

export default React.memo(MultiStepActions)
