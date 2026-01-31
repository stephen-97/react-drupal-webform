import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import DOMPurify from 'isomorphic-dompurify';
import cn from 'classnames';
import styles from './wysiwyg.module.scss';
import { getClassNames, getDataAttributes, } from '../../../../../lib/functions/utils_functions';
const Wysiwyg = ({ processed, as: Element = 'div', className, classNamePrefix, innerProps, unstyled, }) => {
    const wysiwygClassNames = getClassNames({
        name: 'wysiwyg',
        prefix: classNamePrefix,
        unstyled: unstyled,
        classNameComponent: className,
        baseCn: cn(styles.wysiwyg),
    });
    const dataAttributes = getDataAttributes({
        component: 'wysiwyg',
    });
    return (_jsx(Element, { className: wysiwygClassNames, dangerouslySetInnerHTML: {
            __html: DOMPurify.sanitize(processed, {
                ADD_TAGS: ['iframe'],
                ADD_ATTR: ['target'],
            }),
        }, ...dataAttributes, ...innerProps }));
};
export default React.memo(Wysiwyg);
