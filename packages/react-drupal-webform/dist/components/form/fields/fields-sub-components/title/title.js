import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cn from 'classnames';
import styles from './title.module.scss';
import Help from '../help/help';
import { getClassNames } from '../../../../../lib/functions/utils_functions';
import { getDataAttributes } from '../../../../../lib/functions/utils_functions';
const Title = (props) => {
    const { field, components, className, fieldKey, innerProps, wrapperElement, classNamePrefix, unstyled, } = props;
    const title = field?.['#title'];
    const isRequired = Boolean(field?.['#required']);
    const showHelp = Boolean(field?.['#help']?.length) || Boolean(field?.['#help_title']?.length);
    const CustomHelp = components?.help ?? Help;
    const isInvisible = field?.['#title_display'] === 'invisible';
    const titleClassNames = getClassNames({
        name: 'title',
        prefix: classNamePrefix,
        unstyled: unstyled,
        modifiers: {
            invisible: isInvisible,
        },
        baseCn: cn(styles.title, className, {
            [styles.isRequired]: isRequired,
            [styles.visuallyHidden]: isInvisible,
        }),
    });
    const dataAttributes = getDataAttributes({
        component: 'title',
    });
    if (wrapperElement === 'label') {
        return (_jsxs("label", { htmlFor: fieldKey, className: titleClassNames, ...dataAttributes, ...innerProps, children: [title, showHelp && (_jsx(CustomHelp, { fieldKey: fieldKey, field: field, components: components, classNamePrefix: classNamePrefix, unstyled: unstyled }))] }));
    }
    return (_jsxs("legend", { className: titleClassNames, ...dataAttributes, ...innerProps, children: [title, showHelp && (_jsx(CustomHelp, { fieldKey: fieldKey, field: field, components: components, classNamePrefix: classNamePrefix, unstyled: unstyled }))] }));
};
export default React.memo(Title);
