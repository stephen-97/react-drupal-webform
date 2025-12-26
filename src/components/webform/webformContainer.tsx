'use client'

import YAML from 'yaml'

require('@/lib/wdyr')

import { Webform } from 'react-drupal-webform'

export type TWebformContainer = {
  elementsSource: string
}

const WebformContainer = ({ elementsSource }: TWebformContainer) => {
  const fakeSubmit = (data: Record<any, string>) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Formulaire soumis avec succès (fake).',
          data,
        })
      }, 3000)
    })
  }

  const handleSubmit = async (formData: Record<any, string>) => {
    return fakeSubmit(formData)
      .then((response: any) => {
        console.log(formData)
        console.log(response.message)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const correctElementsSource = YAML.parse(elementsSource)

  return (
    <Webform elementsSource={correctElementsSource} onSubmit={handleSubmit} />
  )
}

WebformContainer.whyDidYouRender = true
export default WebformContainer
