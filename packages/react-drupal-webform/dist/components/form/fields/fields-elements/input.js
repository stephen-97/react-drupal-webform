import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import cn from 'classnames';
import { useController, useFormContext } from 'react-hook-form';
import styles from '../field.module.scss';
import { getAriaDescribedBy, getClassNames, getDataAttributes, getTextLikeInputAttributes, } from '../../../../lib/functions/utils_functions';
const Input = (props) => {
    const { fieldKey, field, classNamePrefix, className, innerProps, unstyled } = props;
    const { control } = useFormContext();
    const { field: fieldController } = useController({
        name: fieldKey,
        control,
    });
    const getFieldType = (() => {
        switch (field?.['#type']) {
            case 'textfield':
                return 'text';
            case 'date':
                return 'date';
            case 'number':
                return 'number';
            case 'email':
                return 'email';
            case 'tel':
                return 'tel';
            default:
                return 'text';
        }
    })();
    const inputClassNames = getClassNames({
        name: 'input',
        prefix: classNamePrefix,
        unstyled: unstyled,
        baseCn: cn(styles.input, className),
    });
    const dataAttributes = getDataAttributes({
        component: 'Input',
    });
    const ariaDescribedBy = getAriaDescribedBy({ fieldKey, field });
    const inputFieldAttributes = getTextLikeInputAttributes(field, getFieldType);
    return (_jsx("input", { id: fieldKey, className: inputClassNames, name: fieldController.name, type: getFieldType, onChange: (e) => fieldController.onChange(e), value: fieldController.value ?? '', "aria-describedby": ariaDescribedBy, ...inputFieldAttributes, ...dataAttributes, ...innerProps }));
};
export default React.memo(Input);
