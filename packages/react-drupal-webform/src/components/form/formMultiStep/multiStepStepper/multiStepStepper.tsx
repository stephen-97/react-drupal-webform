import styles from './multiStepStepper.module.scss'
import React from 'react'
import cn from 'classnames'
import { MultiStepStepperProps } from '../../../../lib/types/components/multiStepStepper'
import { useMultiStepContext } from '../multiStepContext'
import {
  getClassNames,
  getDataAttributes,
} from '../../../../lib/functions/utils_functions'

const MultiStepStepper = (props: MultiStepStepperProps) => {
  const {
    multiStepTitleAs = 'span',
    currentStepObj,
    components,
    className,
    classNamePrefix,
  } = props

  const { stepIndex, totalVisibleSteps } = useMultiStepContext()

  const CustomMultiStepStepper = components?.multiStepStepper
  if (CustomMultiStepStepper) {
    return <CustomMultiStepStepper {...props} />
  }

  const TagTitle = multiStepTitleAs
  const title: string | undefined = currentStepObj?.['#title']

  const minPercent = 3
  const maxPercent = 100

  let percent = minPercent
  if (totalVisibleSteps > 1) {
    percent =
      stepIndex === 0
        ? minPercent
        : stepIndex === totalVisibleSteps - 1
          ? maxPercent
          : minPercent +
            ((maxPercent - minPercent) / (totalVisibleSteps - 1)) * stepIndex
  }

  const wrapperClassNames = getClassNames({
    name: 'multiStepStepper',
    prefix: classNamePrefix,
    baseCn: cn(styles.multiStepStepper, className),
  })

  const headerClassNames = getClassNames({
    name: 'multiStepStepperHeader',
    prefix: classNamePrefix,
    baseCn: styles.headerStepperContainer,
  })

  const titleClassNames = getClassNames({
    name: 'multiStepStepperTitle',
    prefix: classNamePrefix,
    baseCn: styles.title,
  })

  const counterClassNames = getClassNames({
    name: 'multiStepStepperCounter',
    prefix: classNamePrefix,
    baseCn: styles.multiStepStepperCounter,
  })

  const progressContainerClassNames = getClassNames({
    name: 'multiStepStepperProgressContainer',
    prefix: classNamePrefix,
    baseCn: styles.progressBarContainer,
  })

  const progressBarClassNames = getClassNames({
    name: 'multiStepStepperProgress',
    prefix: classNamePrefix,
    baseCn: styles.progressBar,
  })

  const dataAttributes = getDataAttributes({
    component: 'multiStepStepper',
  })

  return (
    <div className={wrapperClassNames} {...dataAttributes}>
      <div className={headerClassNames}>
        {title && <TagTitle className={titleClassNames}>{title}</TagTitle>}

        <span className={counterClassNames}>
          {stepIndex + 1}/{totalVisibleSteps}
        </span>
      </div>

      <div className={progressContainerClassNames}>
        <div
          className={progressBarClassNames}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}

export default React.memo(MultiStepStepper)
