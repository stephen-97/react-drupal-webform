import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import Label from '../label/label';
const WrapperLabel = ({ components, innerPropsLabelComponent, classNames, field, fieldKey, }) => {
    const CustomLabel = components?.label ?? Label;
    const props = innerPropsLabelComponent ?? {};
    const { wrapperElement = 'label', innerProps } = props;
    const { custom_component_help, innerPropsHelpComponent, ...rest } = props;
    let computedInnerProps;
    if (wrapperElement === 'label') {
        computedInnerProps = {
            ...(innerProps ?? {}),
            className: innerProps?.className ?? classNames.general.fieldLabel,
            htmlFor: innerProps?.htmlFor ?? fieldKey,
        };
        return (_jsx(CustomLabel, { ...rest, wrapperElement: "label", field: field, fieldKey: fieldKey, innerProps: computedInnerProps, custom_component_help: custom_component_help ?? components.help, innerPropsHelpComponent: innerPropsHelpComponent ?? {
                innerProps: { className: classNames.general.fieldHelp },
                helps: {
                    help: field?.['#help'],
                    processed_help_title: field?.['#help_title'],
                },
                components: components,
            } }));
    }
    computedInnerProps = {
        ...(innerProps ?? {}),
        className: innerProps?.className ?? classNames.general.fieldLabel,
    };
    return (_jsx(CustomLabel, { ...rest, wrapperElement: "legend", fieldKey: fieldKey, innerProps: computedInnerProps, custom_component_help: custom_component_help ?? components.help, field: field, innerPropsHelpComponent: innerPropsHelpComponent ?? {
            innerProps: { className: classNames.general.fieldHelp },
            helps: {
                help: field?.['#help'],
                processed_help_title: field?.['#help_title'],
            },
            components: components,
        } }));
};
export default React.memo(WrapperLabel);
