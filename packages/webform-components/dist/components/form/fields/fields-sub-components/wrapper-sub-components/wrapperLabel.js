import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import Label from "../label/label";
const WrapperLabel = ({ components, innerPropsLabelComponent, classNames, field, fieldKey, }) => {
    var _a, _b, _c, _d;
    const CustomLabel = (_a = components === null || components === void 0 ? void 0 : components.label) !== null && _a !== void 0 ? _a : Label;
    const props = innerPropsLabelComponent !== null && innerPropsLabelComponent !== void 0 ? innerPropsLabelComponent : {};
    const { wrapperElement = 'label', innerProps } = props;
    const { title, isRequired, custom_component_help, innerPropsHelpComponent, ...rest } = props;
    let computedInnerProps;
    if (wrapperElement === 'label') {
        computedInnerProps = {
            ...(innerProps !== null && innerProps !== void 0 ? innerProps : {}),
            className: (_b = innerProps === null || innerProps === void 0 ? void 0 : innerProps.className) !== null && _b !== void 0 ? _b : classNames.general.fieldLabel,
            htmlFor: (_c = innerProps === null || innerProps === void 0 ? void 0 : innerProps.htmlFor) !== null && _c !== void 0 ? _c : fieldKey,
        };
        return (_jsx(CustomLabel, { ...rest, wrapperElement: "label", title: title !== null && title !== void 0 ? title : field['#title'], innerProps: computedInnerProps, isRequired: isRequired !== null && isRequired !== void 0 ? isRequired : field === null || field === void 0 ? void 0 : field['#required'], custom_component_help: custom_component_help !== null && custom_component_help !== void 0 ? custom_component_help : components.help, innerPropsHelpComponent: innerPropsHelpComponent !== null && innerPropsHelpComponent !== void 0 ? innerPropsHelpComponent : {
                innerProps: { className: classNames.general.fieldHelp },
                helps: {
                    help: field === null || field === void 0 ? void 0 : field['#help'],
                    processed_help_title: field === null || field === void 0 ? void 0 : field['#help_title'],
                },
                custom_component_wysiwyg: components.wysiwyg,
            } }));
    }
    computedInnerProps = {
        ...(innerProps !== null && innerProps !== void 0 ? innerProps : {}),
        className: (_d = innerProps === null || innerProps === void 0 ? void 0 : innerProps.className) !== null && _d !== void 0 ? _d : classNames.general.fieldLabel,
    };
    return (_jsx(CustomLabel, { ...rest, wrapperElement: "legend", title: title !== null && title !== void 0 ? title : field['#title'], innerProps: computedInnerProps, isRequired: isRequired !== null && isRequired !== void 0 ? isRequired : field === null || field === void 0 ? void 0 : field['#required'], custom_component_help: custom_component_help !== null && custom_component_help !== void 0 ? custom_component_help : components.help, innerPropsHelpComponent: innerPropsHelpComponent !== null && innerPropsHelpComponent !== void 0 ? innerPropsHelpComponent : {
            innerProps: { className: classNames.general.fieldHelp },
            helps: {
                help: field === null || field === void 0 ? void 0 : field['#help'],
                processed_help_title: field === null || field === void 0 ? void 0 : field['#help_title'],
            },
            custom_component_wysiwyg: components.wysiwyg,
        } }));
};
export default React.memo(WrapperLabel);
//# sourceMappingURL=wrapperLabel.js.map