import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cn from 'classnames';
import styles from '../field.module.scss';
import { useController, useFormContext } from 'react-hook-form';
const Radios = ({ fieldKey, field, classNames, className, innerProps, itemProps, inputProps, labelProps, }) => {
    const { control } = useFormContext();
    if (!field?.['#options'])
        return null;
    const optionsObj = Object.entries(field['#options']);
    const { field: fieldController } = useController({
        name: fieldKey,
        control,
    });
    return (_jsx("div", { className: cn(classNames.fields.radios?.groupWrapper, styles.radiosGroupWrapper, className), role: "radiogroup", ...innerProps, children: optionsObj.map(([optionKey, optionValue], i) => {
            const checked = fieldController.value === optionKey;
            const id = `radios-${optionKey.trim()}-${i}`;
            return (_jsxs("div", { className: cn(classNames.fields.radios?.itemWrapper, styles.radiosItemWrapper), ...itemProps, children: [_jsx("input", { id: id, className: cn(classNames.fields.radios?.input), name: fieldController.name, type: "radio", value: optionKey, checked: checked, onChange: () => fieldController.onChange(optionKey), ...inputProps }), _jsx("label", { htmlFor: id, className: cn(classNames.fields.radios?.label, styles.radioLabel), ...labelProps, children: optionValue })] }, optionKey));
        }) }));
};
export default React.memo(Radios);
