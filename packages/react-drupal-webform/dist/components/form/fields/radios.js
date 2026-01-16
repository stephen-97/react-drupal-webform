import { jsx as _jsx } from "react/jsx-runtime";
import FieldContainer from './fields-sub-components/fieldContainer';
import Radios from './fields-elements/radios';
export const renderRadio = (props) => {
    const { fieldKey, field, classNames, components } = props;
    const FieldContainerComponent = components?.wrapper ?? FieldContainer;
    if (!field?.['#options'])
        return null;
    const CustomRadio = components?.fieldById?.[fieldKey] ?? components?.radios;
    return (_jsx(FieldContainerComponent, { field: field, classNames: classNames, classNameFieldName: "fieldRadio", components: components, fieldKey: fieldKey, wrapperElement: "fieldset", children: CustomRadio ? _jsx(CustomRadio, { ...props }) : _jsx(Radios, { ...props }) }, fieldKey));
};
