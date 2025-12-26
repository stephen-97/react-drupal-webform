import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import DOMPurify from 'isomorphic-dompurify';
import cn from 'classnames';
import styles from './wysiwyg.module.scss';
const Wysiwyg = ({ processed, as: Element = 'div', className, }) => {
    return (_jsx(Element, { className: cn(className, styles.wysiwyg), dangerouslySetInnerHTML: {
            __html: DOMPurify.sanitize(processed, {
                ADD_TAGS: ['iframe'],
                ADD_ATTR: ['target'],
            }),
        } }));
};
export default React.memo(Wysiwyg);
