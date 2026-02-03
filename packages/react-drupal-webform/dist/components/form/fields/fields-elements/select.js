import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cn from 'classnames';
import { useController, useFormContext } from 'react-hook-form';
import styles from '../field.module.scss';
import { handleChangeOptions } from '../../../../lib/functions/webform_fields_functions/webform_fields_functions';
import { getClassNames, getDataAttributes, } from '../../../../lib/functions/utils_functions';
const Select = (props) => {
    const { fieldKey, field, innerProps, className, classNamePrefix, ariaDescribedBy, unstyled, onChange: onChangeProp, onBlur: onBlurProp, onFocus: onFocusProp, } = props;
    const { control } = useFormContext();
    if (!field?.['#options'])
        return null;
    const { field: fieldController } = useController({
        name: fieldKey,
        control,
    });
    const optionsObj = Object.entries(field['#options']);
    const options = field['#sort_options']
        ? [...optionsObj].sort(([, labelA], [, labelB]) => String(labelA).localeCompare(String(labelB), undefined, {
            sensitivity: 'base',
        }))
        : optionsObj;
    const selectClassNames = getClassNames({
        name: 'select',
        prefix: classNamePrefix,
        unstyled: unstyled,
        classNameComponent: className,
        baseCn: cn(styles.select),
    });
    const optionClassNames = getClassNames({
        name: 'selectOption',
        prefix: classNamePrefix,
        unstyled: unstyled,
    });
    const dataAttributes = getDataAttributes({
        component: 'select',
    });
    const handleChange = (e) => {
        const value = e.target.value;
        handleChangeOptions(value, fieldController);
        onChangeProp?.(e);
    };
    const handleBlur = (e) => {
        fieldController.onBlur();
        onBlurProp?.(e);
    };
    const handleFocus = (e) => {
        onFocusProp?.(e);
    };
    return (_jsxs("select", { id: fieldKey, name: fieldController.name, required: field?.['#required'], className: selectClassNames, value: fieldController.value ?? '', onChange: handleChange, onBlur: handleBlur, onFocus: handleFocus, "aria-describedby": ariaDescribedBy, ...dataAttributes, ...props, ...innerProps, children: [_jsx("option", { className: optionClassNames, value: '', children: field?.['#empty_option'] ?? '-- Select an option --' }), options.map(([optionKey, optionValue]) => (_jsx("option", { className: optionClassNames, value: optionKey, children: optionValue }, optionKey)))] }));
};
export default React.memo(Select);
