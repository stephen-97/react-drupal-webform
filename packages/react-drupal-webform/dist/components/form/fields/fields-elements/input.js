import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import cn from 'classnames';
import { useController, useFormContext } from 'react-hook-form';
import styles from '../field.module.scss';
import { getAriaDescribedBy, getClassNames, getDataAttributes, getTextLikeInputAttributes, } from '../../../../lib/functions/utils_functions';
const Input = (props) => {
    const { fieldKey, field, classNamePrefix, className, innerProps, unstyled, validationEngine, onChange: onChangeProp, onBlur: onBlurProp, onFocus: onFocusProp, } = props;
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
        classNameComponent: className,
        baseCn: cn(styles.input),
    });
    const dataAttributes = getDataAttributes({
        component: 'Input',
    });
    const ariaDescribedBy = getAriaDescribedBy({ fieldKey, field });
    const inputFieldAttributes = getTextLikeInputAttributes(field, getFieldType);
    const applyWebformNativeValidation = (e, field) => {
        const input = e.currentTarget;
        input.setCustomValidity('');
        if (input.validity.valid) {
            return;
        }
        if (input.validity.patternMismatch && field?.['#pattern_error']) {
            input.setCustomValidity(field['#pattern_error']);
        }
        else if (input.validity.valueMissing && field?.['#required_error']) {
            input.setCustomValidity(field['#required_error']);
        }
    };
    const resetWebformNativeValidation = (input) => {
        if (validationEngine !== 'html')
            return;
        input.setCustomValidity('');
    };
    const handleChange = (e) => {
        if (validationEngine === 'html') {
            resetWebformNativeValidation(e.currentTarget);
        }
        fieldController.onChange(e);
        onChangeProp?.(e);
    };
    const handleBlur = (e) => {
        fieldController.onBlur();
        onBlurProp?.(e);
    };
    const handleFocus = (e) => {
        onFocusProp?.(e);
    };
    const handleInvalid = (e) => {
        if (validationEngine !== 'html')
            return;
        applyWebformNativeValidation(e, field);
    };
    return (_jsx("input", { id: fieldKey, className: inputClassNames, name: fieldController.name, type: getFieldType, value: fieldController.value ?? '', readOnly: field?.['#readonly'], "aria-describedby": ariaDescribedBy, onChange: handleChange, onBlur: handleBlur, onFocus: handleFocus, onInvalid: handleInvalid, ...inputFieldAttributes, ...dataAttributes, ...innerProps }));
};
export default React.memo(Input);
