import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cn from 'classnames';
import styles from '../field.module.scss';
import { useController, useFormContext } from 'react-hook-form';
import { handleChangeOptionsCheckboxes } from '../../../../lib/functions/webform_fields_functions/webform_fields_functions';
import { getClassNames, getDataAttributes, } from '../../../../lib/functions/utils_functions';
const Checkboxes = ({ fieldKey, field, className, innerProps, itemProps, inputProps, labelProps, ariaDescribedBy, classNamePrefix, }) => {
    const { control } = useFormContext();
    if (!field?.['#options'])
        return null;
    const optionsObj = Object.entries(field['#options']);
    const { field: fieldController } = useController({
        name: fieldKey,
        control,
    });
    const wrapperClassNames = getClassNames({
        name: 'checkboxesWrapper',
        prefix: classNamePrefix,
        baseCn: cn(styles.checkboxes, className),
    });
    const itemClassNames = getClassNames({
        name: 'checkboxesItem',
        prefix: classNamePrefix,
        baseCn: styles.checkbox,
    });
    const inputClassNames = getClassNames({
        name: 'checkboxesInput',
        prefix: classNamePrefix,
        baseCn: styles.field,
    });
    const labelClassNames = getClassNames({
        name: 'checkboxesLabel',
        prefix: classNamePrefix,
        baseCn: styles.labelCheckbox,
    });
    const dataAttributes = getDataAttributes({
        component: 'Checkboxes',
    });
    return (_jsx("div", { className: wrapperClassNames, role: "group", ...dataAttributes, ...innerProps, children: optionsObj.map(([optionKey, optionValue], i) => {
            const checked = Array.isArray(fieldController.value)
                ? fieldController.value.includes(optionKey)
                : false;
            const id = `checkboxes-${optionKey.trim()}-${i}`;
            return (_jsxs("div", { className: itemClassNames, ...itemProps, children: [_jsx("input", { id: id, className: inputClassNames, name: fieldController.name, type: "checkbox", value: optionKey, checked: checked, "aria-describedby": ariaDescribedBy, onChange: (e) => handleChangeOptionsCheckboxes(e.target.value, e.target.checked, fieldController), ...inputProps }), _jsx("label", { htmlFor: id, className: labelClassNames, ...labelProps, children: optionValue })] }, optionKey));
        }) }));
};
export default React.memo(Checkboxes);
