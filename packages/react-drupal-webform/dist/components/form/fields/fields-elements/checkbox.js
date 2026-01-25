import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import cn from 'classnames';
import { useController, useFormContext } from 'react-hook-form';
import { getClassNames, getDataAttributes, } from '../../../../lib/functions/utils_functions';
const Checkbox = ({ fieldKey, field, innerProps, className, ariaDescribedBy, classNamePrefix, unstyled, }) => {
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
        baseCn: cn(className),
    });
    const dataAttributes = getDataAttributes({
        component: 'checkbox',
    });
    return (_jsx("input", { id: fieldKey, name: fieldController.name, type: "checkbox", value: title, checked: Boolean(fieldController.value), onChange: (e) => fieldController.onChange(e.target.checked), className: checkboxClassNames, "aria-describedby": ariaDescribedBy, ...dataAttributes, ...innerProps }));
};
export default React.memo(Checkbox);
