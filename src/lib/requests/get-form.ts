import {drupal} from "@/lib/drupal"

const getForm = async (alias: string) => {
    return await drupal.request(
        `/jsonapi/node/page/${alias}?` +
        new URLSearchParams({
            include: 'field_form'
        }).toString()
    );
};