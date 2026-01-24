import { jsx as _jsx } from "react/jsx-runtime";
import FieldContainer from './fields-sub-components/fieldContainer';
import ManagedFile from './fields-elements/managedFile';
const renderManagedFile = (props) => {
    const { fieldKey, field, components, classNames, classNamePrefix } = props;
    const FieldContainerComponent = components?.fieldContainer ?? FieldContainer;
    const CustomManagedFile = components?.fieldById?.[fieldKey] ?? components?.managedFile ?? ManagedFile;
    return (_jsx(FieldContainerComponent, { field: field, classNames: classNames, components: components, fieldKey: fieldKey, classNamePrefix: classNamePrefix, children: _jsx(CustomManagedFile, { ...props }) }, fieldKey));
};
export default renderManagedFile;
