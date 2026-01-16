import { jsx as _jsx } from "react/jsx-runtime";
import FieldContainer from './fields-sub-components/fieldContainer';
import Select from './fields-elements/select';
export const renderSelect = (props) => {
    const { fieldKey, field, components, classNames } = props;
    const FieldContainerComponent = components?.wrapper ?? FieldContainer;
    if (!field?.['#options'])
        return null;
    const CustomSelect = components?.fieldById?.[fieldKey] ?? components?.select;
    return (_jsx(FieldContainerComponent, { field: field, classNames: classNames, classNameFieldName: "fieldSelect", components: components, fieldKey: fieldKey, children: CustomSelect ? _jsx(CustomSelect, { ...props }) : _jsx(Select, { ...props }) }, fieldKey));
};
