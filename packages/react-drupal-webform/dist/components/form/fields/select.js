import { jsx as _jsx } from "react/jsx-runtime";
import FieldContainer from './fields-sub-components/fieldContainer';
import Select from './fields-elements/select';
export const renderSelect = (props) => {
    const { fieldKey, field, components, classNames, classNamePrefix, unstyled } = props;
    const FieldContainerComponent = components?.fieldContainer ?? FieldContainer;
    if (!field?.['#options'])
        return null;
    const CustomSelect = components?.fieldById?.[fieldKey] ?? components?.select;
    return (_jsx(FieldContainerComponent, { field: field, classNames: classNames, components: components, fieldKey: fieldKey, classNamePrefix: classNamePrefix, unstyled: unstyled, children: CustomSelect ? _jsx(CustomSelect, { ...props }) : _jsx(Select, { ...props }) }, fieldKey));
};
