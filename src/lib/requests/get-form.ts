import { drupal } from '@/lib/drupal'

const getForm = async (id: string) => {
  const response = await drupal.request(
    `/jsonapi/node/page/${id}?${new URLSearchParams({
      include: 'field_webform',
      'fields[node--page]': 'title,field_webform',
      'fields[webform--webform]': 'drupal_internal__id,title,elements',
    }).toString()}`
  )

  const webforms =
    response.included
      ?.filter((item: any) => item.type === 'webform--webform')
      .map((webform: any) => ({
        id: webform.id,
        title: webform.attributes.title,
        elements: webform.attributes.elements,
      })) ?? []

  return {
    title: response.data.attributes.title,
    webforms, // ← plusieurs formulaires
  }
}
export default getForm
