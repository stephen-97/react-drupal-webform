<h1 style="color:#1f3a8a;">React Drupal Webform components</h1>




react-drupal-webform is a lightweight React and Next js integration for Drupal Webform.
It allows you to take the Webform structure exported from Drupal (as a Javascript object), load it into a React application, and render the form with full control over its UI.

The library only covers a limited subset of Drupal Webform features and is not a full implementation. Some behaviors and advanced options from Webform are not supported.

Validation for the form is can be with HTML nativer or powered by react-hook-form (and yup).
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
  - Size : ✅
  - Placeholder : ✅
  - Autocomplete : ❌
  - Input Mask : ❌
  - Input hiding : ✅
  - Disabled : ✅
  - Readonly : ✅
  - Prepopulate : ❌

- **Form Validation**
  - Required : ✅
  - Required message : ✅
  - Unique : ❌
  - Pattern : ✅
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

There is some few CSS differences, the react-webform library can provide Yup and RHF (React Hook Form), so the error-handling system can be native to HTML5 or not (validationEngine props).

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

- `elementsSource` – (Required) The webform elements definition. This must be a JavaScript object, so the YAML coming from Drupal must be parsed beforehand.
- `onSubmit` – (Required) A function called when the form is submitted. Can return a promise for async handling.
- `components` – A JavaScript object used to override or extend the default form components.
- `validationEngine` – Defines which validation engine to use. Possible values are `rhf` (React Hook Form) or `html` (HTML native validation). By default it's HTML (Drupal behavior)
- `rhfValidationMode` – (RHF only) Defines when validation is triggered (`onSubmit`, `onBlur`, `onChange`, `all`). By default it's `all`
- `rhfCustomValidators` – (RHF only) Custom Yup validators that can extend or override the default validation rules.
- `rhfDefaultFieldStateMessages` – (RHF only) Default messages used for field states such as errors, required fields, or validation feedback.
- `classNamePrefix` – A prefix applied to all generated CSS class names of the webform elements. Without a prefix, base class names are not rendered by default.
- `includeInactiveFieldsInSubmit` – When enabled, conditionally hidden fields are included in the submitted data (except native hidden inputs).
- `unstyled` – When enabled, disables all default styling and generated class names. So you can style from scratch. 
- `disableActionButtonWhenInvalid` – When enabled, action buttons (submit or next) are automatically disabled when the form is invalid.
- `className` – class of the form element
- `id` – id of the form element


<h3 style="color:#1f3a8a;">Props – components</h3>

`TYPE` - TWebformCustomComponents

- `title` – Renders the title (label) of each field.
- `fieldContainer` – Container wrapping a field and its related elements (label, description, errors).
- `errorFieldMessage` – Displays validation and error messages for a field.
- `confirmationView` – Display of the confirmation view (after the submit).
- `input` – Renders standard input fields (textfield, email, number, tel).
- `managedFile` – Renders a managed file input field.
- `managedFilePreview` – Displays a preview of the uploaded managed file.
- `select` – Renders a select (dropdown) field.
- `checkboxes` – Renders a group of checkbox fields.
- `checkbox` – Renders a single checkbox field.
- `radios` – Renders a group of radio buttons.
- `textarea` – Renders a textarea field.
- `wysiwyg` – Renders all wysiwyg content (for example: help / description / more / markup).
- `help` – Renders the help block associated with a field.
- `description` – Renders the description text of a field.
- `more` – Renders the “more information” block of a field.
- `managedFileInfo` – Displays additional information related to a managed file.
- `multiStepActions` – Renders navigation actions for multi-step forms (next, previous, submit).
- `multiStepStepper` – Renders the stepper indicating progress in a multi-step form.
- `layout` – Layout wrapper used to structure fields and form sections.
- `hidden` – Renders hidden fields.
- `markup` – Renders static markup elements (HTML/text content).



Exemple :


```js
import React, {useState} from 'react';
import Webform from 'react-drupal-webform';
import { getWebform } from './api'
import CustomInput from './CustomInput'
import CustomFirstNameInput from './CustomFirstNameInput'

export default async function App() {
    const correctElementsSource = await getWebform()

    const handleSubmit = async (formData: Record<any, string>) => {
        console.log(formData)
    }

    const customComponents = {
      input: CustomInput,
    }
    
    return (
        <Webform 
            elementsSource={correctElementsSource}
            onSubmit={handleSubmit}
            components={customComponents}
        />
    );
}
```

Here is an example of a custom Input component.
You can import the components constant from the package (which contains the default components) and reuse it while passing your own props:
```js
import React, { useRef } from 'react'
import styles from './customInput.module.scss'
import { useController, useFormContext } from 'react-hook-form'
import cn from 'classnames'
import { components } from '../../../../packages/react-drupal-webform/src/lib/const/const.form'
import { InputProps } from '../../../../packages/react-drupal-webform/src/lib/types/components/input'

const CustomInput = (props: InputProps) => {
  const { field, fieldKey } = props

  const { control } = useFormContext()

  const {
    field: fieldController,
    fieldState: { error },
  } = useController<any>({
    name: fieldKey,
    control,
  })

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleClear = () => {
    fieldController.onChange('')
    inputRef.current?.focus()
  }

  return (
    <div
       className={cn(styles.inputCustomContainer, {
           [styles.error]: error,
       })}
    >
      <components.Input
        {...props}
        className={styles.inputCustom}
        innerRef={(el) => {
            inputRef.current = el
        }}
      />
      <button 
        className={styles.clearButton}
        type="button"
        aria-label={`clear the field "${field?.['#title']}"`}
        onClick={handleClear}
      />
    </div>
  )
}

export default CustomInput
```

<h3 style="color:#1f3a8a;">Props – classNamesPrefix</h3>

The classNamePrefix prop allows you to apply a prefix to all generated CSS class names of the webform elements.
When a prefix is provided, it is automatically prepended to every internal “base” (empty) class name used by the webform.
Without a classNamePrefix, these base classnames are not rendered by default, meaning no automatic classes are applied unless explicitly defined.
This behavior does not apply to wysiwyg content, which always keeps its own classes and is not affected by classNamePrefix.

`TYPE` - string

Example : 

```js
import React, {useState} from 'react';
import Webform from 'react-drupal-webform';
import { getWebform } from './api'
import styles from './webform.module.scss'

export default async function App() {
    const webformData = await getWebform()
    const elementsSource = YAML.parse(webformData.elementsSource)

    const handleSubmit = async (formData: Record<any, string>) => {
        console.log(formData)
    }
    
    return (
        <Webform 
            elementsSource={elementsSource}
            onSubmit={handleSubmit}
            classNamePrefix={'prefix'}
        />
    );
}
```

Here is an example of the class names generated on a fieldContainer, with the prefix used in the previous example (with unstyled: true):
```
<div
  class="prefix-webform-fieldContainer"
  data-type="email"
  data-group-type="input"
  data-component="fieldContainer"
>
  <label
    for="type_a_test_email"
    class="prefix-webform-title"
    data-component="title"
  >
    Type a test email
  </label>

  <input
    id="type_a_test_email"
    class="prefix-webform-input"
    type="email"
    name="type_a_test_email"
    value=""
    aria-describedby="description-type_a_test_email"
    placeholder='For exemple "test@gmail.com"'
    minlength="4"
    maxlength="20"
    data-component="Input"
  />

  <div
    id="description-type_a_test_email"
    class="prefix-webform-wysiwyg prefix-webform-description"
    data-component="description"
  >
    <p>This field have a placeholder.</p>
  </div>
</div>

```

<h3 style="color:#1f3a8a;">Props – rhfDefaultFieldStateMessages</h3>

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


Example :

```js
import React, {useState} from 'react';
import Webform from 'react-drupal-webform';
import { getWebform } from './api'

export default async function App() {
  const webformData = await getWebform()
  const elementsSource = YAML.parse(webformData.elementsSource)

  const handleSubmit = async (formData: Record<any, string>) => {
        console.log(formData)
    }
    
    const defaultFieldsStateMessages = {
      fields: {
        requiredMessages: {
          textfield: (props) => `Field "${props.field["#title"]}" is required. (custom message)`,
        },
      }
    };
    
    return (
        <Webform 
            elementsSource={elementsSource}
            onSubmit={handleSubmit}
            rhfDefaultFieldStateMessages={defaultFieldsStateMessages}
        />
    );
}
```

<h3 style="color:#1f3a8a;">Props – rhfValidationMode</h3>

`TYPE` - 'all' | 'onChange' | 'onBlur' | 'onTouch' | 'onSubmit' | 'all'

  `DEFAULT` - 'all'

The rhfValidationMode prop defines when validation is triggered in React Hook Form, and defaults to 'all'.


<h3 style="color:#1f3a8a;">Props – validationEngine</h3>

`TYPE` - 'rhf' | 'html'

`DEFAULT` - 'html'

Defines which validation system is used, and by default it follows the native HTML validation behavior as implemented in Drupal.

<h3 style="color:#1f3a8a;">Props – unstyled</h3>

`TYPE` - boolean

`DEFAULT` - false

The unstyled prop disables all default, built-in form classes, allowing you to start styling the form completely from scratch.

<h3 style="color:#1f3a8a;">Props – includeInactiveFieldsInSubmit</h3>

`TYPE` - boolean

`DEFAULT` - false


Include fields that inactive (not input hidden !) on the final submit payload.

<h3 style="color:#1f3a8a;">Props – className</h3>

`TYPE` - string

<h3 style="color:#1f3a8a;">Props – id</h3>

`TYPE` - string

<h3 style="color:#1f3a8a;">Props – rhfCustomValidators</h3>

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
  

    const handleSubmit = async (formData: Record<any, string>) => {
        console.log(formData)
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
            onSubmit={handleSubmit}
            customValidators={customValidator}
        />
    );
}
```
