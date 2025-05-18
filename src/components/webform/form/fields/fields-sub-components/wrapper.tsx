import React from 'react'
import cn from 'classnames'
import styles from './wrapper.module.scss'
import Label from '@/components/webform/form/fields/fields-sub-components/label/label'
import ErrorFieldMessage from '@/components/webform/form/fields/fields-sub-components/errorFieldMessage/errorFieldMessage'
import { IWrapperWebformProps } from '@/lib/types/components/wrapper'
import Description from '@/components/webform/form/fields/fields-sub-components/description/description'
import More from '@/components/webform/form/fields/fields-sub-components/more/more'
import ManagedFileInfo from '@/components/webform/form/fields/fields-sub-components/managedFileInfo/managedFileInfo'
import { getWrapperCategory } from '@/lib/functions/webform_fields_functions/webform_fields_functions'
import { TDrupal_FieldType } from '@/lib/types/components/field'

const DefaultWrapper = ({
  children,
  field,
  classNames,
  isLabel = true,
  stateError = undefined,
  classNameFieldName,
  components,
}: IWrapperWebformProps) => {
  const CustomLabel = components?.label ?? Label
  const CustomErrorFieldMessage =
    components?.errorFieldMessage ?? ErrorFieldMessage
  const CustomDescription = components?.description ?? Description
  const CustomManagedFileInfo = components?.managedFileInfo ?? ManagedFileInfo
  const CustomMore = components?.more ?? More

  const wrapperCategory = getWrapperCategory(
    field['#type'] as TDrupal_FieldType
  )

  console.log(classNames)
  return (
    <div
      className={cn(
        ...(field?.['#attributes']?.class ?? []),
        classNames.wrappers?.byFieldType?.[field['#type']],
        wrapperCategory
          ? classNames.wrappers?.byCategory?.[wrapperCategory]
          : undefined,
        classNames.wrappers?.base,
        {
          [classNames.states.fieldError ?? '']: Boolean(stateError),
        },
        styles.fieldWrapper
      )}
    >
      {isLabel && field?.['#title'] && (
        <CustomLabel
          innerProps={{
            className: classNames.general.fieldLabel,
          }}
          custom_component_help={components.help}
          title={field['#title']}
          isRequired={field?.['#required']}
          innerPropsHelpComponent={{
            innerProps: {
              className: classNames.general.fieldHelp,
            },
            helps: {
              help: field?.['#help'],
              processed_help_title: field?.['#help_title'],
            },
            custom_component_wysiwyg: components.wysiwyg,
          }}
        />
      )}
      {field?.['#field_prefix'] || field?.['#field_suffix'] ? (
        <div className={styles.prefixSuffixContainer}>
          {field?.['#field_prefix'] && <span>{field['#field_prefix']}</span>}
          {children}
          {field?.['#field_suffix'] && <span>{field['#field_suffix']}</span>}
        </div>
      ) : (
        <>{children}</>
      )}
      {(field?.['#description'] || field?.['#file_placeholder']) && (
        <CustomDescription
          custom_component_wysiwyg={components.wysiwyg}
          innerProps={{
            className: cn(
              classNames.general.fieldDescription,
              styles.wysiwyg,
              classNames.general.fieldWysiwyg
            ),
          }}
          processed={
            (field?.['#description'] ?? field?.['#file_placeholder']) || ''
          }
        />
      )}
      {field['#type'] === 'managed_file' && (
        <CustomManagedFileInfo field={field} />
      )}
      {field?.['#more'] && field?.['#more_title'] && (
        <CustomMore
          innerPropsContainer={{
            className: classNames.general.fieldMore,
          }}
          innerPropsWysiwyg={{
            className: cn(styles.wysiwyg, classNames.general.fieldWysiwyg),
            processed: field['#more'],
          }}
          customComponentWysiwyg={components.wysiwyg}
          moreTitle={field['#more_title']}
        />
      )}
      {typeof stateError?.message === 'string' &&
        stateError.message.length > 0 && (
          <CustomErrorFieldMessage
            className={classNames.states?.fieldErrorMessage}
            message={stateError.message}
          />
        )}
    </div>
  )
}
const Wrapper = ({
  children,
  field,
  classNames,
  isLabel = true,
  stateError = undefined,
  classNameFieldName,
  components,
}: IWrapperWebformProps) => {
  const WrapperComponent = components?.wrapper ?? DefaultWrapper

  return (
    <WrapperComponent
      field={field}
      classNames={classNames}
      stateError={stateError}
      classNameFieldName={classNameFieldName}
      isLabel={isLabel}
      components={components}
    >
      {children}
    </WrapperComponent>
  )
}

export { DefaultWrapper }
export default Wrapper
