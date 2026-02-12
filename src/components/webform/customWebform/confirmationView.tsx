import React from 'react'
import cn from 'classnames'
import styles from './confirmationView.module.scss'

type ConfirmationViewProps = {
  data?: Record<string, any> | null
}

const ConfirmationView = ({ data }: ConfirmationViewProps) => {
  return (
    <div
      className={cn(styles.submittedMessage)}
      role="status"
      aria-live="polite"
    >
      <div className={styles.header}>
        <span className={styles.icon} aria-hidden="true" />
        <span className={styles.title}>Form submission preview</span>
      </div>

      <p className={styles.text}>
        The collected form values are displayed below.
      </p>

      {data && (
        <pre className={styles.codeBlock}>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      )}
    </div>
  )
}

export default React.memo(ConfirmationView)
