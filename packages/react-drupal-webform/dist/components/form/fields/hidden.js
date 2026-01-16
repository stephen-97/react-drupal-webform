import { jsx as _jsx } from "react/jsx-runtime";
import Hidden from './fields-elements/hidden';
export const renderHidden = (props) => {
    const { fieldKey, components } = props;
    const CustomHidden = components?.fieldById?.[fieldKey] ?? components?.hidden;
    if (CustomHidden) {
        return _jsx(CustomHidden, { ...props });
    }
    return _jsx(Hidden, { ...props });
};
