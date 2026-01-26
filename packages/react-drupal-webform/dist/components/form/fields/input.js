import { jsx as _jsx } from "react/jsx-runtime";
import FieldContainer from './fields-sub-components/fieldContainer';
import Input from './fields-elements/input';
const renderInput = (props) => {
    const { fieldKey, field, components, classNamePrefix, unstyled } = props;
    const FieldContainerComponent = components?.fieldContainer ?? FieldContainer;
    const CustomInput = components?.fieldById?.[fieldKey] ?? components?.input;
    return (_jsx(FieldContainerComponent, { field: field, components: components, fieldKey: fieldKey, classNamePrefix: classNamePrefix, unstyled: unstyled, children: CustomInput ? _jsx(CustomInput, { ...props }) : _jsx(Input, { ...props }) }, fieldKey));
};
export default renderInput;
