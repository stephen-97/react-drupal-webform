import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cn from 'classnames';
import { useController, useFormContext } from 'react-hook-form';
import styles from '../field.module.scss';
import { handleChangeOptions } from '../../../../lib/functions/webform_fields_functions/webform_fields_functions';
import { getClassNames, getDataAttributes, } from '../../../../lib/functions/utils_functions';
const Select = ({ fieldKey, field, innerProps, className, classNamePrefix, ariaDescribedBy, }) => {
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
        baseCn: cn(styles.select, className),
    });
    const optionClassNames = getClassNames({
        name: 'selectOption',
        prefix: classNamePrefix,
    });
    const dataAttributes = getDataAttributes({
        component: 'select',
    });
    return (_jsxs("select", { id: fieldKey, name: fieldController.name, required: field?.['#required'], className: selectClassNames, value: fieldController.value ?? '', onChange: (e) => handleChangeOptions(e.target.value, fieldController), "aria-describedby": ariaDescribedBy, ...dataAttributes, ...innerProps, children: [_jsx("option", { className: optionClassNames, value: field?.['#empty_value'] ?? '', children: field?.['#empty_option'] ?? '-- Select an option --' }), options.map(([optionKey, optionValue]) => (_jsx("option", { className: optionClassNames, value: optionKey, children: optionValue }, optionKey)))] }));
};
export default React.memo(Select);
