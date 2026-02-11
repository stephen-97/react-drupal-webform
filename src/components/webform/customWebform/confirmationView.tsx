import React from 'react'
import cn from 'classnames'
import styles from './confirmationView.module.scss'

const ConfirmationView = () => {
  return (
    <div
      className={cn(styles.submittedMessage)}
      role="status"
      aria-live="polite"
    >
      <div className={styles.header}>
        <span className={styles.icon} aria-hidden="true" />
        <span className={styles.title}>Submission received</span>
      </div>
      <p className={styles.text}>
        Thanks! Your form has been successfully submitted.
      </p>
    </div>
  )
}

export default React.memo(ConfirmationView)
