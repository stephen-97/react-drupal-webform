import React, { useRef, useEffect } from 'react'
import styles from './help.module.scss'
import cn from 'classnames'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import { IHelpProps } from '@/lib/types/components/help'
import { createRoot } from 'react-dom/client'
import Wysiwyg from '@/components/webform/form/fields/fields-special-components/wysiyg'

const Help = ({ innerProps, helps }: IHelpProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!buttonRef.current) return

    if (!helps?.help && !helps?.help_title) return

    const tooltipContainer = document.createElement('div')

    const root = createRoot(tooltipContainer)
    const html = `
      ${helps.help_title ? `<div class="${styles.helpTitle}">${helps.help_title}</div>` : ''}
      ${helps.help || ''}
    `

    root.render(<Wysiwyg processed={html} />)

    tippy(buttonRef.current, {
      content: tooltipContainer,
      allowHTML: true,
      placement: 'top',
      animation: 'fade',
    })
  }, [helps])

  return (
    <button
      className={cn(styles.help)}
      ref={buttonRef}
      aria-hidden={'true'}
      {...innerProps}
    >
      ?
    </button>
  )
}

export default Help
