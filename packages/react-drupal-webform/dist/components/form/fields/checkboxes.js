import { jsx as _jsx } from "react/jsx-runtime";
import FieldContainer from './fields-sub-components/fieldContainer';
import Checkboxes from './fields-elements/checkboxes';
export const renderCheckboxes = (props) => {
    const { fieldKey, field, components, classNames } = props;
    const FieldContainerComponent = components?.fieldContainer ?? FieldContainer;
    if (!field?.['#options'])
        return null;
    const CustomCheckboxes = components?.fieldById?.[fieldKey] ?? components?.checkboxes;
    return (_jsx(FieldContainerComponent, { field: field, classNames: classNames, components: components, fieldKey: fieldKey, wrapperElement: "fieldset", children: CustomCheckboxes ? (_jsx(CustomCheckboxes, { ...props })) : (_jsx(Checkboxes, { ...props })) }, fieldKey));
};
