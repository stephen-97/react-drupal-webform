import { jsx as _jsx } from "react/jsx-runtime";
import { useRef, useEffect } from 'react';
import styles from './help.module.scss';
import cn from 'classnames';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import { createRoot } from 'react-dom/client';
import Wysiwyg from '../../fields-special-components/wysiwyg/wysiwyg';
const Help = ({ innerProps, components, field }) => {
    const { className, ...restInnerProps } = innerProps ?? {};
    const buttonRef = useRef(null);
    const CustomWysiwyg = components.wysiwyg ?? Wysiwyg;
    const helps = {
        help: field?.['#help'],
        processed_help_title: field?.['#help_title'],
    };
    useEffect(() => {
        if (!buttonRef.current)
            return;
        if (!helps?.help && !helps?.processed_help_title)
            return;
        const tooltipContainer = document.createElement('div');
        const root = createRoot(tooltipContainer);
        const html = `
      ${helps.processed_help_title ? `<div class="${styles.helpTitle}">${helps.processed_help_title}</div>` : ''}
      ${helps.help || ''}
    `;
        root.render(_jsx(CustomWysiwyg, { source: 'help', processed: html }));
        tippy(buttonRef.current, {
            content: tooltipContainer,
            allowHTML: true,
            placement: 'top',
            animation: 'fade',
        });
    }, [helps]);
    return (_jsx("button", { className: cn(styles.help, className), ref: buttonRef, type: "button", ...restInnerProps, children: "?" }));
};
export default Help;
