import { jsx as _jsx } from "react/jsx-runtime";
import FieldContainer from './fields-sub-components/fieldContainer';
const renderDefault = (props) => {
    const { fieldKey, field, components, classNames, classNamePrefix, unstyled } = props;
    const FieldContainerComponent = components?.fieldContainer ?? FieldContainer;
    const CustomField = components?.unsupportedField;
    if (!CustomField) {
        return null;
    }
    return (_jsx(FieldContainerComponent, { field: field, classNames: classNames, components: components, fieldKey: fieldKey, classNamePrefix: classNamePrefix, unstyled: unstyled, children: _jsx(CustomField, { ...props }) }, fieldKey));
};
export default renderDefault;
