import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useController, useFormContext } from 'react-hook-form';
import Wrapper from './fields-sub-components/wrapper';
import Checkbox from './fields-elements/checkbox';
import Title from './fields-sub-components/title/title';
import styles from '../fields/field.module.scss';
export const renderCheckbox = (props) => {
    const { fieldKey, field, classNames, components } = props;
    const { control } = useFormContext();
    const CustomCheckbox = components?.fieldById?.[fieldKey] ?? components?.checkbox;
    const { fieldState } = useController({
        name: fieldKey,
        control,
    });
    const CustomLabel = components?.title ?? Title;
    const title = field?.['#title'];
    return (_jsx(Wrapper, { field: field, classNames: classNames, classNameFieldName: "fieldCheckboxes", stateError: fieldState?.error, isLabel: false, components: components, fieldKey: fieldKey, children: CustomCheckbox ? (_jsx(CustomCheckbox, { ...props })) : (_jsxs(_Fragment, { children: [_jsx(Checkbox, { ...props }), title && (_jsx(CustomLabel, { wrapperElement: "label", fieldKey: fieldKey, components: components, classNames: classNames, field: field, className: styles.checkboxLabel }))] })) }, fieldKey));
};
