import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cn from 'classnames';
import styles from '../field.module.scss';
import { useController, useFormContext } from 'react-hook-form';
import { handleChangeOptionsCheckboxes } from '../../../../lib/functions/webform_fields_functions/webform_fields_functions';
const Checkboxes = ({ fieldKey, field, classNames, className, innerProps, itemProps, inputProps, titleProps, }) => {
    const { control } = useFormContext();
    if (!field?.['#options'])
        return null;
    const optionsObj = Object.entries(field['#options']);
    const { field: fieldController } = useController({
        name: fieldKey,
        control,
    });
    return (_jsx("div", { className: cn(classNames.fields.checkboxes?.groupWrapper, styles.checkboxes, className), role: "group", ...innerProps, children: optionsObj.map(([optionKey, optionValue], i) => {
            const checked = Array.isArray(fieldController.value)
                ? fieldController.value.includes(optionKey)
                : false;
            const id = `checkboxes-${optionKey.trim()}-${i}`;
            return (_jsxs("div", { className: cn(classNames.fields.checkboxes?.itemWrapper, styles.checkbox), ...itemProps, children: [_jsx("input", { id: id, className: cn(classNames.fields.checkboxes?.input, styles.field), name: fieldController.name, type: "checkbox", value: optionKey, checked: checked, onChange: (e) => handleChangeOptionsCheckboxes(e.target.value, e.target.checked, fieldController), ...inputProps }), _jsx("label", { htmlFor: id, className: cn(classNames.fields.checkboxes?.label, styles.labelCheckbox), ...titleProps, children: optionValue })] }, optionKey));
        }) }));
};
export default React.memo(Checkboxes);
