import React, { useRef, useEffect } from 'react'
import styles from './help.module.scss'
import cn from 'classnames'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import { IHelpProps } from '@/lib/types/components/help'
import { createRoot } from 'react-dom/client'
import Wysiwyg from '@/components/webform/form/fields/fields-special-components/wysiwyg/wysiwyg'

const Help = ({ innerProps, custom_component_wysiwyg, helps }: IHelpProps) => {
  const { className, ...restInnerProps } = innerProps ?? {}

  const buttonRef = useRef<HTMLButtonElement>(null)
  const CustomWysiwyg = custom_component_wysiwyg ?? Wysiwyg

  useEffect(() => {
    if (!buttonRef.current) return

    if (!helps?.help && !helps?.processed_help_title) return

    const tooltipContainer = document.createElement('div')

    const root = createRoot(tooltipContainer)
    const html = `
      ${helps.processed_help_title ? `<div class="${styles.helpTitle}">${helps.processed_help_title}</div>` : ''}
      ${helps.help || ''}
    `

    root.render(<CustomWysiwyg processed={html} />)

    tippy(buttonRef.current, {
      content: tooltipContainer,
      allowHTML: true,
      placement: 'top',
      animation: 'fade',
    })
  }, [helps])

  return (
    <button
      className={cn(styles.help, className)}
      ref={buttonRef}
      type="button"
      {...restInnerProps}
    >
      ?
    </button>
  )
}

export default Help
