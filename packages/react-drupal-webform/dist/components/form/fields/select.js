import { jsx as _jsx } from "react/jsx-runtime";
import { useController, useFormContext } from 'react-hook-form';
import Wrapper from './fields-sub-components/wrapper';
import Select from './fields-elements/select';
export const renderSelect = (props) => {
    const { fieldKey, field, components, classNames } = props;
    const { control } = useFormContext();
    if (!field?.['#options'])
        return null;
    const CustomSelect = components?.fieldById?.[fieldKey] ?? components?.select;
    const controller = useController({ name: fieldKey, control });
    const { fieldState } = controller;
    return (_jsx(Wrapper, { field: field, classNames: classNames, classNameFieldName: "fieldSelect", components: components, stateError: fieldState?.error, fieldKey: fieldKey, children: CustomSelect ? _jsx(CustomSelect, { ...props }) : _jsx(Select, { ...props }) }, fieldKey));
};
