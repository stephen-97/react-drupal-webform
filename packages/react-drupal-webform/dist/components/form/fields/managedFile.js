import { jsx as _jsx } from "react/jsx-runtime";
import FieldContainer from './fields-sub-components/fieldContainer';
import ManagedFile from './fields-elements/managedFile';
const renderManagedFile = (props) => {
    const { fieldKey, field, components, classNamePrefix, unstyled } = props;
    const FieldContainerComponent = components?.fieldContainer ?? FieldContainer;
    const CustomManagedFile = components?.fieldById?.[fieldKey] ?? components?.managedFile ?? ManagedFile;
    return (_jsx(FieldContainerComponent, { field: field, components: components, fieldKey: fieldKey, classNamePrefix: classNamePrefix, unstyled: unstyled, children: _jsx(CustomManagedFile, { ...props }) }, fieldKey));
};
export default renderManagedFile;
