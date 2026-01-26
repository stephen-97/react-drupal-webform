import { jsx as _jsx } from "react/jsx-runtime";
import FieldContainer from './fields-sub-components/fieldContainer';
import Radios from './fields-elements/radios';
export const renderRadio = (props) => {
    const { fieldKey, field, components, classNamePrefix, unstyled } = props;
    const FieldContainerComponent = components?.fieldContainer ?? FieldContainer;
    if (!field?.['#options'])
        return null;
    const CustomRadio = components?.fieldById?.[fieldKey] ?? components?.radios;
    return (_jsx(FieldContainerComponent, { field: field, components: components, fieldKey: fieldKey, wrapperElement: "fieldset", classNamePrefix: classNamePrefix, unstyled: unstyled, children: CustomRadio ? _jsx(CustomRadio, { ...props }) : _jsx(Radios, { ...props }) }, fieldKey));
};
