import React, { JSX } from 'react'
import Label from '@/components/webform/form/fields/fields-sub-components/label/label'
import { TWrapperLabelWebformProps } from '@/lib/types/components/wrapperLabel'

const WrapperLabel = ({
  components,
  innerPropsLabelComponent,
  classNames,
  field,
  fieldKey,
}: TWrapperLabelWebformProps) => {
  const CustomLabel = components?.label ?? Label

  const props = innerPropsLabelComponent ?? {}

  type LabelOrLegendProps =
    | { wrapperElement: 'label'; innerProps?: JSX.IntrinsicElements['label'] }
    | { wrapperElement: 'legend'; innerProps?: JSX.IntrinsicElements['legend'] }

  const { wrapperElement = 'label', innerProps } = props as LabelOrLegendProps

  const {
    title,
    isRequired,
    custom_component_help,
    innerPropsHelpComponent,
    ...rest
  } = props

  let computedInnerProps:
    | JSX.IntrinsicElements['label']
    | JSX.IntrinsicElements['legend']

  if (wrapperElement === 'label') {
    computedInnerProps = {
      ...(innerProps ?? {}),
      className: innerProps?.className ?? classNames.general.fieldLabel,
      htmlFor:
        (innerProps as JSX.IntrinsicElements['label'])?.htmlFor ?? fieldKey,
    }
    return (
      <CustomLabel
        {...(rest as Omit<typeof rest, 'wrapperElement'>)}
        wrapperElement="label"
        title={title ?? field['#title']}
        innerProps={computedInnerProps as JSX.IntrinsicElements['label']}
        isRequired={isRequired ?? field?.['#required']}
        custom_component_help={custom_component_help ?? components.help}
        innerPropsHelpComponent={
          innerPropsHelpComponent ?? {
            innerProps: { className: classNames.general.fieldHelp },
            helps: {
              help: field?.['#help'],
              processed_help_title: field?.['#help_title'],
            },
            custom_component_wysiwyg: components.wysiwyg,
          }
        }
      />
    )
  }
  computedInnerProps = {
    ...(innerProps ?? {}),
    className: innerProps?.className ?? classNames.general.fieldLabel,
  }
  return (
    <CustomLabel
      {...(rest as Omit<typeof rest, 'wrapperElement'>)}
      wrapperElement="legend"
      title={title ?? field['#title']}
      innerProps={computedInnerProps as JSX.IntrinsicElements['legend']}
      isRequired={isRequired ?? field?.['#required']}
      custom_component_help={custom_component_help ?? components.help}
      innerPropsHelpComponent={
        innerPropsHelpComponent ?? {
          innerProps: { className: classNames.general.fieldHelp },
          helps: {
            help: field?.['#help'],
            processed_help_title: field?.['#help_title'],
          },
          custom_component_wysiwyg: components.wysiwyg,
        }
      }
    />
  )
}

export default WrapperLabel
