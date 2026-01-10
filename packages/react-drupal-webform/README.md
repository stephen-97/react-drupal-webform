<h1 style="color:#1f3a8a;">React Drupal Webform components (Alpha Version)</h1>


> This package is currently in **alpha** and under active development.


react-drupal-webform is a lightweight React and Next js integration for Drupal Webform.
It allows you to take the Webform structure exported from Drupal (as a Javascript object), load it into a React application, and render the form with full control over its UI.

The library only covers a limited subset of Drupal Webform features and is not a full implementation. Some behaviors and advanced options from Webform are not supported.

Validation for the form is powered by Yup.
You can also extend, override, or inject your own custom validation rules.

Somes exemples here : https://react-next-drupal-webform.vercel.app/ 

Github : https://github.com/stephen-97/react-drupal-webform/tree/main/packages/react-drupal-webform

<h2 style="color:#1f3a8a;">Installation and usage</h2>

The easiest way to use react-drupal-webform is to install it from npm and build it into your app with Webpack.

```
yarn add react-drupal-webform
```

Then use it in your app.

<h3 style="color:#1f3a8a;">Version Compatibility</h3>

Tested and validated with:

````
React :

- React `^15`
- react-hook-form `7.54.2`
- Yup `1.6.1`

Drupal : 

- Webform `6.2.9`
````


<h2 style="color:#1f3a8a;">Allowed Webform features from Drupal</h2>

<h3 style="color:#1f3a8a;">Allowed elements '#type'</h3>

- textfield
- textarea
- radios
- webform_actions
- checkbox
- checkboxes
- number
- tel
- select
- email
- date
- webform_markup
- managed_file
- hidden
- fieldset
- container
- details
- webform_flexbox
- webform_section
- wizard_page

<h3 style="color:#1f3a8a;">Allowed element features from Webform Drupal</h3>

IMPORTANT : By using custom components, it becomes possible to extend and customize the behavior of the form by leveraging additional properties.

<h4 style="color:#1f3a8a;">General</h4>

- **Element settings**
  - Title : ✅
  - Allowed number of values : ❌

- **Element description / help / more**
  - Description : ✅
  - Help
    - Help title : ✅
    - Help text : ✅
  - More
    - More title : ✅
    - More text : ✅

- **Form Display**
  - Title Display / Description Display / Help Display : ❌
  - Field prefix / Field Suffix : ✅
  - Min Length / Max length : ✅
  - Size : ❌
  - Placeholder : ✅
  - Autocomplete : ❌
  - Input Mask : ❌
  - Input hiding : ❌
  - Disabled : ❌
  - Readonly : ❌
  - Prepopulate : ❌

- **Form Validation**
  - Required : ✅
  - Required message : ❌
  - Unique : ❌
  - Pattern : ❌
  - Counter : ❌

<h4 style="color:#1f3a8a;">Conditions</h4>

- States : only "Visible". 
- Elements : One / All.
- Trigger : Value is / Value is not.

All others feature are not available.

<h4 style="color:#1f3a8a;">Advanced</h4>

No feature allowed

<h4 style="color:#1f3a8a;">Access</h4>

No feature allowed

<h4 style="color:#1f3a8a;">General (for wizard_page)</h4>

- **Elements settings**
  - Title : ✅

- **Page settings**
  - Previous page button label : ✅
  - Next page button label : ✅

- **Form Display**
  - Open : ❌

<h3 style="color:#1f3a8a;">Differences with the Drupal version</h3>

There is some few CSS differences, the react-webform library uses Yup and RHF (React Hook Form), so the error-handling system is not native to HTML5.

<h3 style="color:#1f3a8a;">Use of React Hook Component</h3>

```js
import React from 'react';
import Webform from 'react-drupal-webform';
import { getWebform } from './api'

export default async function App() {
    const webformElementsSource = await getWebform()

    const handleSubmit = async (formData: Record<any, string>) => {
        console.log(formData)
    }
    
    return (
        <div className="App">
            <Webform
                elementsSource={correctElementsSource}
                onSubmit={handleSubmit}
            />
        </div>
    );
}
```

<h2 style="color:#1f3a8a;">Props</h2>

Common props you may want to specify include:

- `elementsSource` - the elements from de webform (need to be an Javascript object, so parse the YAML from Drupal before )
- `classNames` - Javascript object to apply classnames to wrappes, states, ect...
- `components` - Javascript object to list all components
- `isSubmitted` - Check if the form is submitted or not, for show the confirmation page. 
- `onSubmit` - An async function that is called after submitting the form.
- `showConfirmation` - Show (or not) the confirmation page when isSubmitted is true.
- `includeInactiveFieldsInSubmit` - Includes conditionally hidden fields in the submission result (except hidden inputs).
- `defaultFieldStateMessages` - Default messages for field errors, required fields, etc.
- `customValidators` - custom yup Validator

<h3 style="color:#1f3a8a;">Props – components</h3>

`TYPE` - TWebformCustomComponents

- `label` – Renders the label of each field.
- `wrapper` – Container wrapping a field and its label.
- `errorFieldMessage` – Displays validation and error messages for a field.
- `confirmationView` – Display of the confirmationView (after the submit).
- `input` – Renders standard input fields (textfield, email, number, tel).
- `managedFile` – Renders a managed file input field.
- `managedFilePreview` – Displays a preview of the uploaded managed file.
- `select` – Renders a select (dropdown) field.
- `checkboxes` – Renders a group of checkbox fields.
- `checkbox` – Renders a single checkbox field.
- `radios` – Renders a group of radio buttons.
- `textarea` – Renders a textarea field.
- `wysiwyg` – Renders for all wysiwyg (for exemple on help / Description / more).
- `help` – Renders the help block associated with a field.
- `description` – Renders the description text of a field.
- `more` – Renders the “more information” block of a field.
- `managedFileInfo` – Displays additional information related to a managed file.
- `multiStepActions` – Renders navigation actions for multi-step forms (next, previous, submit).
- `multiStepStepper` – Renders the stepper indicating progress in a multi-step form.
- `layout` – Layout wrapper used to structure fields and form sections.
- `hidden` – Renders hidden fields.
- `markup` – Renders static markup elements (HTML/text content).
- `fieldById` – Allows overriding the renderer for a specific field using its ID.


Warning :

When building (for exemple) a custom Input component (e.g. a field with an action),
className props are not automatically forwarded. They must be explicitly passed down (or not, if you do not want).
Additionally, to properly integrate user input into the form, the component must be connected to React Hook Form (RHF).

Exemple :


```js
import React, {useState} from 'react';
import Webform from 'react-drupal-webform';
import { getWebform } from './api'
import CustomInput from './CustomInput'
import CustomFirstNameInput from './CustomFirstNameInput'

export default async function App() {
    const correctElementsSource = await getWebform()
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = async (formData: Record<any, string>) => {
        setIsSubmitted(true)
    }

    const customComponents = {
      input: CustomInput,
      fieldById: {
        firstname: CustomFirstNameInput,
      },
    }
    
    return (
        <Webform 
            elementsSource={correctElementsSource}
            onSubmit={handleSubmit}
            isSubmitted={isSubmitted}
            components={customComponents}
        />
    );
}
```

And here the exemple of the CustomInput (using RHF) :
```js
import React, { HTMLInputTypeAttribute } from 'react'
import { TFieldWebformObjCustom } from 'react-drupal-webform/src/lib/types/components/fieldWebformObjCustom'
import { useController, useFormContext } from 'react-hook-form'
import cn from 'classnames'
import styles from './custom.module.scss'

const CustomInput = (props: TFieldWebformObjCustom) => {
  const { fieldKey, field } = props

  const { control } = useFormContext()
  const controller = useController<any>({ name: fieldKey, control })
  const { field: fieldController, fieldState } = controller

  const getFieldType: HTMLInputTypeAttribute = (() => {
    switch (field?.['#type']) {
      case 'textfield':
        return 'text'
      case 'date':
        return 'date'
      case 'number':
        return 'number'
      case 'email':
        return 'email'
      case 'tel':
        return 'tel'
      default:
        return 'text'
    }
  })()

  return (
    <input
      id={fieldKey}
      className={cn(styles.customInputs, { [styles.error]: fieldState?.error })}
      name={fieldController.name}
      minLength={field?.['#minlength']}
      maxLength={field?.['#maxlength']}
      placeholder={field?.['#placeholder']}
      type={getFieldType}
      onChange={(e) => fieldController.onChange(e)}
      value={fieldController.value ?? ''}
      required={field?.['#required']}
    />
  )
}

export default CustomInput
```

<h3 style="color:#1f3a8a;">Props – classNames</h3>

The classNames are only available for default css class and scss module class. 
It may not work with tailwind, styled components, MUI, ect...

`TYPE` - TWebformClassNames


- `wrappers` – Class names applied to field wrapper containers.
  - `base` – Base wrapper class applied to all fields.
  - `byCategory` – Wrapper classes based on field category.
    - `textInput` – Wrapper class for text-based inputs.
    - `selectionInput` – Wrapper class for selection inputs (select, radios, checkboxes).
    - `booleanInput` – Wrapper class for boolean inputs (checkbox).
  - `byFieldType` – Wrapper classes mapped to specific Drupal field types.

- `general` – Class names for extra field elements.
  - `fieldLabel` – Class applied to field labels.
  - `fieldDescription` – Class applied to field descriptions.
  - `fieldManagedFileInfo` – Class applied to managed file information blocks.
  - `fieldMore` – Class applied to “more information” blocks.
  - `fieldHelp` – Class applied to help blocks.
  - `fieldWysiwyg` – Class applied to WYSIWYG content.

- `states` – Class names reflecting field states.
  - `fieldError` – Class applied to fields in an error state.
  - `fieldErrorMessage` – Class applied to validation error messages.

- `fields` – Class names applied to specific field types.
  - `textInputs` – Class names for text-based inputs.
    - `base` – Base class applied to all text inputs.
    - `types` – Classes mapped to specific input types (`text`, `email`, `number`, `tel`, `textarea`, `textfield`).
  - `checkboxes` – Class names for checkbox groups.
    - `groupWrapper` – Wrapper class for the checkbox group.
    - `itemWrapper` – Wrapper class for a single checkbox item.
    - `input` – Class applied to the checkbox input element.
    - `label` – Class applied to the checkbox label.
  - `checkbox` – Class names for a single checkbox field.
    - `itemWrapper` – Wrapper class for the checkbox item.
    - `input` – Class applied to the checkbox input element.
    - `label` – Class applied to the checkbox label.
  - `radios` – Class names for radio button groups.
    - `groupWrapper` – Wrapper class for the radio group.
    - `itemWrapper` – Wrapper class for a single radio item.
    - `input` – Class applied to the radio input element.
    - `label` – Class applied to the radio label.
  - `select` – Class names for select fields.
    - `select` – Class applied to the select element.
    - `option` – Class applied to select options.
  - `managedFile` – Class names for managed file fields.
    - `input` – Class applied to the file input element.
  - `markup` – Class names for markup-only elements.
    - `base` – Base class applied to markup content.
  - `layout` – Class names for layout components.
    - `wrapper` – Wrapper class for the layout container.
    - `title` – Class applied to the layout title.
    - `inner` – Class applied to the layout inner content.

- `multiStep` – Class names for multi-step form components.
  - `stepperContainer` – Wrapper class for the stepper component.
  - `stepperHeader` – Class applied to the stepper header.
  - `stepperTitle` – Class applied to the stepper title.
  - `stepperCounter` – Class applied to the step counter.
  - `stepperProgressBarContainer` – Wrapper class for the progress bar container.
  - `stepperProgressBar` – Class applied to the progress bar itself.
  - `actionsContainer` – Wrapper class for step navigation actions.
  - `actionsButtons` – Wrapper class for action buttons.
  - `actionsButtonPrev` – Class applied to the “previous” button.
  - `actionsButtonsNext` – Class applied to the “next” button.

Example : 

```js
import React, {useState} from 'react';
import Webform from 'react-drupal-webform';
import { getWebform } from './api'
import styles from './webform.module.scss'

export default async function App() {
    const webformData = await getWebform()
    const elementsSource = YAML.parse(webformData.elementsSource)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = async (formData: Record<any, string>) => {
        setIsSubmitted(true)
    }
    
    const customClassNames = {
      general: {
        fieldDescription: styles.fieldDescription
      },
      fields: {
        checkboxes: {
          label: styles.labelCheckboxes
        }
      }
    }
    
    return (
        <Webform 
            elementsSource={elementsSource}
            isSubmitted={isSubmitted}
            onSubmit={handleSubmit}
            classNames={customClassNames}
        />
    );
}
```

<h3 style="color:#1f3a8a;">Props – defaultFieldStateMessages</h3>

`TYPE` - TWebformStateMessages

- `general` – Default validation messages applied to all fields.
  - `errorMessage` – Default message displayed when a field fails validation.
  - `requiredMessage` – Default message displayed when a required field is empty.
  - `minLengthMessage`- Default error message displayed when the field value does not meet the minimum length defined in Drupal (when the minimum constraint is enabled). This applies only to field types that support length constraints.
  - `maxLengthMessage`- Default error message displayed when the field value exceeds the maximum length defined in Drupal (when the maximum constraint is enabled). This applies only to field types that support length constraints.

- `fields` – Field-type–specific validation messages.
  - `requiredMessages` – Custom required messages mapped by Drupal field type.
  - `errorMessages` – Custom validation error messages mapped by Drupal field type.
  - `minLengthMessage`- Field-type–specific error message displayed when the value is shorter than the minimum length configured in Drupal (if active). This is applied only to fields that support minimum length validation (e.g. text inputs, textareas).
  - `maxLengthMessage`- Field-type–specific error message displayed when the value exceeds the maximum length configured in Drupal (if active). This is applied only to fields that support maximum length validation.



```js
import React, {useState} from 'react';
import Webform from 'react-drupal-webform';
import { getWebform } from './api'

export default async function App() {
  const webformData = await getWebform()
  const elementsSource = YAML.parse(webformData.elementsSource)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (formData: Record<any, string>) => {
        setIsSubmitted(true)
    }
    
    const defaultFieldsStateMessages = {
      fields: {
        requiredMessages: {
          textfield: 'Field "{fieldName}" is required. (custom message)',
        },
      }
    };
    
    return (
        <Webform 
            elementsSource={elementsSource}
            isSubmitted={isSubmitted}
            onSubmit={handleSubmit}
            defaultFieldStateMessages={defaultFieldsStateMessages}
        />
    );
}
```

Example :

```js
import React, {useState} from 'react';
import Webform from 'react-drupal-webform';
import { getWebform } from './api'

export default async function App() {
    const webformData = await getWebform()
    const elementsSource = YAML.parse(webformData.elementsSource)
    const [isSubmitted, setIsSubmitted] = useState(false)
  
    const handleSubmit = async (formData: Record<any, string>) => {
        setIsSubmitted(true)
    }
    
    const defaultFieldsStateMessages = {
      fields: {
        requiredMessages: {
          textfield: 'Field "{fieldName}" is required. (custom message)',
        },
      }
    };
    
    return (
        <Webform 
            elementsSource={elementsSource}
            isSubmitted={isSubmitted}
            onSubmit={handleSubmit}
            defaultFieldStateMessages={defaultFieldsStateMessages}
        />
    );
}
```

<h3 style="color:#1f3a8a;">Props – includeInactiveFieldsInSubmit</h3>

`TYPE` - boolean

Include fields that inactive (not input hidden !) on the final submit payload.


<h3 style="color:#1f3a8a;">Props – customValidators</h3>

`TYPE` - TWebformCustomValidators

This prop is for used custom validators (using yup object).

If the validation schema is rebuilt, don’t forget that for this field we must handle cases such as required validation, for example.

Example : 

```js
import React from 'react';
import Webform from 'react-drupal-webform';
import * as yup from 'yup'
import { getWebform } from './api'

export default async function App() {
    const webformData = await getWebform()
    const elementsSource = YAML.parse(webformData.elementsSource)
    const [isSubmitted, setIsSubmitted] = useState(false)
  

    const handleSubmit = async (formData: Record<any, string>) => {
        setIsSubmitted(true)
    }
    
    const customValidator = {
      byType: {
        textfield: () => 
          yup.string().min(3, 'Any textfield contain at least 3 characters'),
      },
      byId: {
        firstname: () => 
          yup .string().min(3, 'First name must contain at least 3 characters'),
      },
    }
    
    return (
        <Webform 
            elementsSource={elementsSource}
            isSubmitted={isSubmitted}
            onSubmit={handleSubmit}
            customValidators={customValidator}
        />
    );
}
```
