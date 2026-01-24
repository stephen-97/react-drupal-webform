import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cn from 'classnames';
import styles from './title.module.scss';
import Help from '../help/help';
import { getClassNames } from '../../../../../lib/functions/utils_functions';
import { getDataAttributes } from '../../../../../lib/functions/utils_functions';
const Title = (props) => {
    const { field, components, className, fieldKey, innerProps, wrapperElement, classNamePrefix, classNames, } = props;
    const title = field?.['#title'];
    const isRequired = Boolean(field?.['#required']);
    const showHelp = Boolean(field?.['#help']?.length) || Boolean(field?.['#help_title']?.length);
    const CustomHelp = components?.help ?? Help;
    const titleClassNames = getClassNames({
        name: 'fieldTitle',
        prefix: classNamePrefix,
        baseCn: cn(styles.title, className, {
            [styles.isRequired]: isRequired,
        }),
    });
    const dataAttributes = getDataAttributes({
        component: 'title',
    });
    if (wrapperElement === 'label') {
        return (_jsxs("label", { htmlFor: fieldKey, className: titleClassNames, ...dataAttributes, ...innerProps, children: [title, showHelp && (_jsx(CustomHelp, { fieldKey: fieldKey, field: field, components: components, classNames: classNames, classNamePrefix: classNamePrefix }))] }));
    }
    return (_jsxs("legend", { className: titleClassNames, ...dataAttributes, ...innerProps, children: [title, showHelp && (_jsx(CustomHelp, { fieldKey: fieldKey, field: field, components: components, classNames: classNames, classNamePrefix: classNamePrefix }))] }));
};
export default React.memo(Title);
