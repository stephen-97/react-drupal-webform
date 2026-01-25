import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import cn from 'classnames';
import { useController, useFormContext } from 'react-hook-form';
import styles from '../field.module.scss';
import { getClassNames, getDataAttributes, } from '../../../../lib/functions/utils_functions';
const Textarea = ({ fieldKey, field, className, innerProps, classNamePrefix, ariaDescribedBy, unstyled, }) => {
    const { control } = useFormContext();
    const { field: fieldController } = useController({
        name: fieldKey,
        control,
    });
    const textareaClassNames = getClassNames({
        name: 'textarea',
        prefix: classNamePrefix,
        unstyled: unstyled,
        baseCn: cn(styles.field, styles.textarea, className),
    });
    const dataAttributes = getDataAttributes({
        component: 'Textarea',
    });
    return (_jsx("textarea", { id: fieldKey, name: fieldController.name, minLength: field?.['#minlength'], maxLength: field?.['#maxlength'], rows: field?.['#rows'] ?? 10, placeholder: field?.['#placeholder'], required: field?.['#required'], value: fieldController.value ?? '', onChange: (e) => fieldController.onChange(e.target.value), className: textareaClassNames, "aria-describedby": ariaDescribedBy, ...dataAttributes, ...innerProps }));
};
export default React.memo(Textarea);
