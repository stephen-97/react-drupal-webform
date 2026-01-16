import { jsx as _jsx } from "react/jsx-runtime";
import FieldContainer from './fields-sub-components/fieldContainer';
import Textarea from './fields-elements/textarea';
export const renderTextArea = (props) => {
    const { fieldKey, field, classNames, components } = props;
    const FieldContainerComponent = components?.wrapper ?? FieldContainer;
    const CustomTextArea = components?.fieldById?.[fieldKey] ?? components?.textarea;
    return (_jsx(FieldContainerComponent, { field: field, classNames: classNames, classNameFieldName: "fieldTextarea", components: components, fieldKey: fieldKey, children: CustomTextArea ? _jsx(CustomTextArea, { ...props }) : _jsx(Textarea, { ...props }) }, fieldKey));
};
