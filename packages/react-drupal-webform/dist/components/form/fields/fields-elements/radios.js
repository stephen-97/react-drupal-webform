import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cn from 'classnames';
import styles from '../field.module.scss';
import { useController, useFormContext } from 'react-hook-form';
import { getClassNames, getDataAttributes, } from '../../../../lib/functions/utils_functions';
const Radios = ({ fieldKey, field, className, innerProps, itemProps, inputProps, labelProps, ariaDescribedBy, classNamePrefix, unstyled, onChange: onChangeProp, onBlur: onBlurProp, onFocus: onFocusProp, }) => {
    const { control } = useFormContext();
    if (!field?.['#options'])
        return null;
    const optionsObj = Object.entries(field['#options']);
    const { field: fieldController } = useController({
        name: fieldKey,
        control,
    });
    const radiosWrapperClassNames = getClassNames({
        name: 'radiosWrapper',
        prefix: classNamePrefix,
        unstyled: unstyled,
        classNameComponent: className,
        baseCn: cn(styles.radiosGroupWrapper),
    });
    const radiosItemClassNames = getClassNames({
        name: 'radiosItem',
        prefix: classNamePrefix,
        unstyled: unstyled,
        baseCn: styles.radiosItemWrapper,
    });
    const radiosInputClassNames = getClassNames({
        name: 'radiosInput',
        prefix: classNamePrefix,
        unstyled: unstyled,
    });
    const radiosLabelClassNames = getClassNames({
        name: 'radiosLabel',
        prefix: classNamePrefix,
        unstyled: unstyled,
        baseCn: styles.radioLabel,
    });
    const dataAttributes = getDataAttributes({
        component: 'Radios',
    });
    const handleChange = (value) => (e) => {
        fieldController.onChange(value);
        onChangeProp?.(e);
    };
    const handleBlur = (e) => {
        fieldController.onBlur();
        onBlurProp?.(e);
    };
    const handleFocus = (e) => {
        onFocusProp?.(e);
    };
    return (_jsx("div", { className: radiosWrapperClassNames, role: "radiogroup", ...dataAttributes, ...innerProps, children: optionsObj.map(([optionKey, optionValue], i) => {
            const checked = fieldController.value === optionKey;
            const id = `radios-${optionKey.trim()}-${i}`;
            return (_jsxs("div", { className: radiosItemClassNames, ...itemProps, children: [_jsx("input", { id: id, className: radiosInputClassNames, name: fieldController.name, type: "radio", value: optionKey, checked: checked, "aria-describedby": ariaDescribedBy, required: field?.['#required'], onChange: handleChange(optionKey), onBlur: handleBlur, onFocus: handleFocus, ...inputProps }), _jsx("label", { htmlFor: id, className: radiosLabelClassNames, ...labelProps, children: optionValue })] }, optionKey));
        }) }));
};
export default React.memo(Radios);
