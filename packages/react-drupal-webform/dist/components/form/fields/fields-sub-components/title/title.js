import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import Help from '../help/help';
import cn from 'classnames';
import styles from './title.module.scss';
const Title = (props) => {
    const { field, components, className, classNames } = props;
    const CustomHelp = components?.help ?? Help;
    const title = field?.['#title'];
    const isRequired = field?.['#required'];
    if (props.wrapperElement === 'label') {
        return (_jsxs("label", { ...props.innerProps, className: cn(styles.label, className, props.innerProps?.className, {
                [styles.isRequired]: isRequired,
            }), children: [title, _jsx(CustomHelp, { field: field, classNames: classNames, components: components })] }));
    }
    return (_jsxs("legend", { ...props.innerProps, className: cn(styles.label, className), children: [title, _jsx(CustomHelp, { field: field, classNames: classNames, components: components })] }));
};
export default React.memo(Title);
