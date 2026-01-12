import { jsx as _jsx } from "react/jsx-runtime";
import { useController, useFormContext } from 'react-hook-form';
import Wrapper from './fields-sub-components/wrapper';
import Checkboxes from './fields-elements/checkboxes';
export const renderCheckboxes = (props) => {
    const { fieldKey, field, components, classNames } = props;
    const { control } = useFormContext();
    if (!field?.['#options'])
        return null;
    const CustomCheckboxes = components?.fieldById?.[fieldKey] ?? components?.checkboxes;
    const controller = useController({ name: fieldKey, control });
    const { fieldState } = controller;
    return (_jsx(Wrapper, { field: field, classNames: classNames, classNameFieldName: "fieldCheckboxes", stateError: fieldState?.error, components: components, fieldKey: fieldKey, wrapperElement: "fieldset", children: CustomCheckboxes ? (_jsx(CustomCheckboxes, { ...props })) : (_jsx(Checkboxes, { ...props })) }, fieldKey));
};
