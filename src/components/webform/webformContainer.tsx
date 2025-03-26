'use client'

import Webform from '@/components/webform/webform'
import { useForm, UseFormReturn } from 'react-hook-form'
import { useYupValidationResolver } from '@/lib/functions/webform_yup_functions/webform_yup_functions'
import * as yup from 'yup'

export type TWebform = {
  elementsSource: string
  confirmationPath: string
}

const WebformContainer = ({ elementsSource, confirmationPath }: TWebform) => {
  const yupObject = {}
  const defaultValues = {}

  const resolver: any = useYupValidationResolver(yup.object(yupObject))

  const yupReturn: UseFormReturn<any> = useForm<typeof defaultValues>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues,
    resolver: resolver,
  })

  console.log(yupReturn)

  return (
    <Webform
      elementsSource={elementsSource}
      confirmationPath={confirmationPath}
      yup={{ yupReturn, yupObject, defaultValues }}
    />
  )
}

export default WebformContainer
