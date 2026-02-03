import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { getClassNames, getDataAttributes, } from '../../../../lib/functions/utils_functions';
const Checkbox = (props) => {
    const { fieldKey, field, innerProps, className, ariaDescribedBy, classNamePrefix, unstyled, onChange: onChangeProp, onBlur: onBlurProp, onFocus: onFocusProp, } = props;
    const { control } = useFormContext();
    const { field: fieldController } = useController({
        name: fieldKey,
        control,
    });
    const title = field?.['#title'];
    const checkboxClassNames = getClassNames({
        name: 'checkbox',
        prefix: classNamePrefix,
        unstyled: unstyled,
        classNameComponent: className,
    });
    const dataAttributes = getDataAttributes({
        component: 'checkbox',
    });
    const handleChange = (e) => {
        fieldController.onChange(e.target.checked);
        if (onChangeProp) {
            onChangeProp(e);
        }
    };
    const handleBlur = (e) => {
        fieldController.onBlur();
        if (onBlurProp) {
            onBlurProp(e);
        }
    };
    const handleFocus = (e) => {
        if (onFocusProp) {
            onFocusProp(e);
        }
    };
    return (_jsx("input", { id: fieldKey, name: fieldController.name, type: "checkbox", value: title, checked: Boolean(fieldController.value), onChange: handleChange, onBlur: handleBlur, onFocus: handleFocus, required: field?.['#required'], className: checkboxClassNames, "aria-describedby": ariaDescribedBy, ...dataAttributes, ...props, ...innerProps }));
};
export default React.memo(Checkbox);
