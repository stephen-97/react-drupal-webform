import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cn from 'classnames';
import styles from '../field.module.scss';
import { useController, useFormContext } from 'react-hook-form';
import { handleChangeOptionsCheckboxes } from '../../../../lib/functions/webform_fields_functions/webform_fields_functions';
import { getClassNames, getDataAttributes, } from '../../../../lib/functions/utils_functions';
const Checkboxes = ({ fieldKey, field, className, innerProps, itemProps, inputProps, labelProps, ariaDescribedBy, classNamePrefix, unstyled, onChange: onChangeProp, onBlur: onBlurProp, onFocus: onFocusProp, }) => {
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
        unstyled: unstyled,
        classNameComponent: className,
        baseCn: cn(styles.checkboxes),
    });
    const itemClassNames = getClassNames({
        name: 'checkboxesItem',
        prefix: classNamePrefix,
        unstyled: unstyled,
        baseCn: styles.checkbox,
    });
    const inputClassNames = getClassNames({
        name: 'checkboxesInput',
        prefix: classNamePrefix,
        unstyled: unstyled,
        baseCn: styles.field,
    });
    const labelClassNames = getClassNames({
        name: 'checkboxesLabel',
        prefix: classNamePrefix,
        unstyled: unstyled,
        baseCn: styles.labelCheckbox,
    });
    const dataAttributes = getDataAttributes({
        component: 'Checkboxes',
    });
    const handleChange = (option, checked) => {
        const nextValue = Array.isArray(fieldController.value)
            ? [...fieldController.value]
            : [];
        if (checked && !nextValue.includes(option)) {
            nextValue.push(option);
        }
        else if (!checked) {
            const index = nextValue.indexOf(option);
            if (index > -1)
                nextValue.splice(index, 1);
        }
        handleChangeOptionsCheckboxes(option, checked, fieldController);
        onChangeProp?.(nextValue);
    };
    const handleBlur = (e) => {
        fieldController.onBlur();
        onBlurProp?.(e);
    };
    const handleFocus = (e) => {
        onFocusProp?.(e);
    };
    return (_jsx("div", { className: wrapperClassNames, role: "group", ...dataAttributes, ...innerProps, children: optionsObj.map(([optionKey, optionValue], i) => {
            const checked = Array.isArray(fieldController.value)
                ? fieldController.value.includes(optionKey)
                : false;
            const id = `checkboxes-${optionKey.trim()}-${i}`;
            return (_jsxs("div", { className: itemClassNames, ...itemProps, children: [_jsx("input", { id: id, className: inputClassNames, name: fieldController.name, type: "checkbox", value: optionKey, checked: checked, "aria-describedby": ariaDescribedBy, required: i === 0 ? field?.['#required'] : undefined, onChange: (e) => {
                            handleChange(e.target.value, e.target.checked);
                        }, onBlur: handleBlur, onFocus: handleFocus, ...inputProps }), _jsx("label", { htmlFor: id, className: labelClassNames, ...labelProps, children: optionValue })] }, optionKey));
        }) }));
};
export default React.memo(Checkboxes);
