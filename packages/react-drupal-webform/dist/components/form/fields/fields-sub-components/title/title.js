import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import Help from '../help/help';
import cn from 'classnames';
import styles from './title.module.scss';
const Title = (props) => {
    const { field, components, className, classNames, fieldKey } = props;
    const showHelp = Boolean(field['#help']?.length) || Boolean(field['#help_title']?.length);
    const CustomHelp = components?.help ?? Help;
    const title = field?.['#title'];
    const isRequired = field?.['#required'];
    if (props.wrapperElement === 'label') {
        return (_jsxs("label", { ...props.innerProps, htmlFor: fieldKey, className: cn(styles.title, className, classNames.general?.fieldTitle, {
                [styles.isRequired]: isRequired,
            }), children: [title, showHelp && (_jsx(CustomHelp, { field: field, classNames: classNames, components: components }))] }));
    }
    return (_jsxs("legend", { ...props.innerProps, className: cn(styles.title, className, props.innerProps?.className, {
            [styles.isRequired]: isRequired,
        }), children: [title, showHelp && (_jsx(CustomHelp, { field: field, classNames: classNames, components: components }))] }));
};
export default React.memo(Title);
