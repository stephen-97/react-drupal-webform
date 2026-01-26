import React, { useRef, useEffect } from 'react'
import styles from './help.module.scss'
import cn from 'classnames'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import { HelpProps } from '../../../../../lib/types/components/help'
import { createRoot } from 'react-dom/client'
import Wysiwyg from '../../fields-special-components/wysiwyg/wysiwyg'
import {
  getClassNames,
  getDataAttributes,
} from '../../../../../lib/functions/utils_functions'

const Help = ({
  innerProps,
  components,
  field,
  className,
  classNamePrefix,
  unstyled,
  fieldKey,
}: HelpProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const CustomWysiwyg = components.wysiwyg ?? Wysiwyg

  const helps = {
    help: field?.['#help'],
    processed_help_title: field?.['#help_title'],
  }
  useEffect(() => {
    if (!buttonRef.current) return

    if (!helps?.help && !helps?.processed_help_title) return

    const tooltipContainer = document.createElement('div')

    const root = createRoot(tooltipContainer)
    const html = `
      ${helps.processed_help_title ? `<div class="${styles.helpTitle}">${helps.processed_help_title}</div>` : ''}
      ${helps.help || ''}
    `

    root.render(
      <CustomWysiwyg
        field={field}
        fieldKey={fieldKey}
        components={components}
        classNamePrefix={classNamePrefix}
        source={'help'}
        processed={html}
        unstyled={unstyled}
      />
    )

    tippy(buttonRef.current, {
      content: tooltipContainer,
      allowHTML: true,
      placement: 'top',
      animation: 'fade',
    })
  }, [helps])

  const buttonClassNames = getClassNames({
    name: 'help',
    prefix: classNamePrefix,
    unstyled: unstyled,
    baseCn: cn(styles.help, className),
  })

  const dataAttributes = getDataAttributes({
    component: 'help',
  })

  return (
    <button
      className={buttonClassNames}
      ref={buttonRef}
      type="button"
      {...dataAttributes}
      {...innerProps}
    >
      ?
    </button>
  )
}

export default Help
