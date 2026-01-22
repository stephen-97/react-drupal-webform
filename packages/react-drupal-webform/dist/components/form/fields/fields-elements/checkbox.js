import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import cn from 'classnames';
import { useController, useFormContext } from 'react-hook-form';
const Checkbox = ({ fieldKey, field, classNames, onBlur, innerProps, className, }) => {
    const { control } = useFormContext();
    const { field: fieldController } = useController({
        name: fieldKey,
        control,
    });
    const title = field?.['#title'];
    return (_jsx("input", { id: fieldKey, name: fieldController.name, type: "checkbox", value: title, checked: Boolean(fieldController.value), onChange: (e) => fieldController.onChange(e.target.checked), onBlur: onBlur, className: cn(classNames.fields.checkbox?.input, className), ...innerProps }));
};
export default React.memo(Checkbox);
