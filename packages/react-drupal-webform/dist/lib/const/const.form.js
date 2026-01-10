import Wysiwyg from '../../components/form/fields/fields-special-components/wysiwyg/wysiwyg';
export const defaultValuesObj = {
    textfield: '',
    textarea: '',
    email: '',
    radios: '',
    checkboxes: [],
    checkbox: false,
    number: '',
    tel: '',
    date: '',
    managed_file: {},
    select: '',
    hidden: '',
};
export const defaultValuesFieldStateMessages = {
    general: {
        errorMessage: '',
        requiredMessage: 'Field "{fieldName}" is required.',
        minLengthMessage: 'Field "{fieldName}" must contain at least {minLength} characters.',
        maxLengthMessage: 'Field "{fieldName}" must contain no more than {maxLength} characters.',
    },
    fields: {
        errorMessages: {
            textfield: '',
            textarea: '',
            email: 'Please enter a valid email address (e.g., name@example.com).',
            number: 'Please enter a number.',
            tel: 'Please enter a valid phone number.',
            date: 'Invalid date format.',
            managed_file: '',
            radios: '',
            hidden: '',
            checkbox: '',
            checkboxes: '',
            select: '',
        },
        requiredMessages: {
            textfield: '',
            textarea: '',
            email: '',
            radios: '',
            checkboxes: '',
            checkbox: '',
            number: '',
            tel: '',
            date: '',
            managed_file: '',
            select: '',
            hidden: '',
        },
        minLengthMessage: {
            textfield: '',
            textarea: '',
            email: '',
            radios: '',
            checkboxes: '',
            checkbox: '',
            number: '',
            tel: '',
            date: '',
            hidden: '',
        },
        maxLengthMessage: {
            textfield: '',
            textarea: '',
            email: '',
            radios: '',
            checkboxes: '',
            checkbox: '',
            number: '',
            tel: '',
            date: '',
            hidden: '',
        },
    },
};
/**
 * export type TDrupalNonValueFieldType =
 *   | 'webform_markup'
 *   | 'webform_actions'
 *   | 'container'
 *   | 'webform_flexbox'
 *   | 'webform_section'
 *   | 'details'
 *   | 'fieldset'
 */
export const defaultValuesClassnames = {
    wrappers: {
        base: '',
        byCategory: {
            textInput: '',
            selectionInput: '',
            booleanInput: '',
        },
        byFieldType: {
            checkbox: '',
            checkboxes: '',
            date: '',
            email: '',
            webform_markup: '',
            textarea: '',
            textfield: '',
            radios: '',
            number: '',
            tel: '',
            select: '',
            managed_file: '',
            webform_actions: '',
            container: '',
            fieldset: '',
            hidden: '',
            details: '',
            webform_section: '',
            webform_flexbox: '',
        },
    },
    general: {
        fieldForm: '',
        fieldLabel: '',
        fieldDescription: '',
        fieldManagedFileInfo: '',
        fieldMore: '',
        fieldHelp: '',
        fieldWysiwyg: '',
    },
    states: {
        fieldError: '',
        fieldErrorMessage: '',
    },
    fields: {
        textInputs: {
            base: '',
            types: {
                text: '',
                email: '',
                number: '',
                tel: '',
                textarea: '',
                textfield: '',
            },
        },
        checkboxes: {
            groupWrapper: '',
            itemWrapper: '',
            input: '',
            label: '',
        },
        checkbox: {
            itemWrapper: '',
            input: '',
            label: '',
        },
        radios: {
            groupWrapper: '',
            itemWrapper: '',
            input: '',
            label: '',
        },
        select: {
            select: '',
            option: '',
        },
        managedFile: {
            input: '',
        },
        markup: {
            base: '',
        },
        layout: {
            wrapper: '',
            title: '',
            inner: '',
        },
    },
    multiStep: {
        stepperContainer: '',
        stepperHeader: '',
        stepperTitle: '',
        stepperCounter: '',
        stepperProgressBarContainer: '',
        stepperProgressBar: '',
        actionsContainer: '',
        actionsButtons: '',
        actionsButtonPrev: '',
        actionsButtonsNext: '',
    },
};
export const components = {
    Wysiwyg: Wysiwyg,
};
