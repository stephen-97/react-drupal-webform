import { drupal } from '@/lib/drupal'

const getForm = async (id: string) => {
  const response = await drupal.request(
    `/jsonapi/node/page/${id}?${new URLSearchParams({
      include: 'field_form',
      'fields[node--page]': 'title,field_form',
      'fields[webform--webform]': 'drupal_internal__id,title,elements',
    }).toString()}`
  )

  const webform = response.included?.find(
    (item: any) => item.type === 'webform--webform'
  )

  console.log(response)

  return {
    title: response?.data?.attributes?.title,
    webform: {
      id: webform?.id,
      title: webform?.attributes?.title,
      elements: webform?.attributes?.elements,
    },
  }
}
export default getForm
