import { jsx as _jsx } from "react/jsx-runtime";
import { useController, useFormContext } from 'react-hook-form';
export const renderHidden = (props) => {
    const { fieldKey, components } = props;
    const { control } = useFormContext();
    const { field: fieldController } = useController({
        name: fieldKey,
        control,
    });
    const CustomHidden = components?.fieldById?.[fieldKey] ?? components?.hidden;
    if (CustomHidden) {
        return _jsx(CustomHidden, { ...props });
    }
    return (_jsx("input", { type: "hidden", id: fieldKey, name: fieldController.name, value: fieldController.value ?? '', onChange: (e) => fieldController.onChange?.(e) }));
};
