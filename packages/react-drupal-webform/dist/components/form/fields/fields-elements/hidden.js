import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import cn from 'classnames';
const Hidden = ({ fieldKey, innerProps, className }) => {
    const { control } = useFormContext();
    const { field: fieldController } = useController({
        name: fieldKey,
        control,
    });
    return (_jsx("input", { type: "hidden", id: fieldKey, name: fieldController.name, className: cn(className), value: fieldController.value ?? '', onChange: (e) => fieldController.onChange(e.target.value), ...innerProps }));
};
export default React.memo(Hidden);
