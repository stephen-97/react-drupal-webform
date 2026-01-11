import { jsx as _jsx } from "react/jsx-runtime";
import { useController, useFormContext } from 'react-hook-form';
import Wrapper from './fields-sub-components/wrapper';
import Input from './fields-elements/input';
const renderInput = (props) => {
    const { fieldKey, field, components, classNames } = props;
    const { control } = useFormContext();
    const CustomInput = components?.fieldById?.[fieldKey] ?? components?.input;
    const controller = useController({ name: fieldKey, control });
    const { fieldState } = controller;
    return (_jsx(Wrapper, { field: field, classNames: classNames, classNameFieldName: "fieldInput", stateError: fieldState?.error, components: components, fieldKey: fieldKey, children: CustomInput ? _jsx(CustomInput, { ...props }) : _jsx(Input, { ...props }) }, fieldKey));
};
export default renderInput;
