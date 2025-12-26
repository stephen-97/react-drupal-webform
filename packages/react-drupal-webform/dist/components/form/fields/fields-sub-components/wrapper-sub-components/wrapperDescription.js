import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import styles from "../wrapper.module.scss";
import cn from 'classnames';
import Description from "../description/description";
const WrapperDescription = ({ components, classNames, field, }) => {
    const CustomDescription = components?.description ?? Description;
    return (_jsx(CustomDescription, { custom_component_wysiwyg: components.wysiwyg, innerProps: {
            className: cn(classNames.general.fieldDescription, styles.wysiwyg, classNames.general.fieldWysiwyg),
        }, processed: (field?.['#description'] ?? field?.['#file_placeholder']) || '' }));
};
export default React.memo(WrapperDescription);
