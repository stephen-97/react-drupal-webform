import { jsx as _jsx } from "react/jsx-runtime";
import FieldContainer from './fields-sub-components/fieldContainer';
import Textarea from './fields-elements/textarea';
export const renderTextArea = (props) => {
    const { fieldKey, field, classNames, components, classNamePrefix } = props;
    const FieldContainerComponent = components?.fieldContainer ?? FieldContainer;
    const CustomTextArea = components?.fieldById?.[fieldKey] ?? components?.textarea;
    return (_jsx(FieldContainerComponent, { field: field, classNames: classNames, components: components, fieldKey: fieldKey, classNamePrefix: classNamePrefix, children: CustomTextArea ? _jsx(CustomTextArea, { ...props }) : _jsx(Textarea, { ...props }) }, fieldKey));
};
