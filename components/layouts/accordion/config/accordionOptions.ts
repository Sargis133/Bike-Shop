import { I_AccordionOptions } from "~/components/accordion/models/interfaces";
import {I_StringObject} from "~/models/composables/useLocalization/interfaces";

export const accordionOptions = (localization: I_StringObject): I_AccordionOptions[] => {
  return [
    {
      title: localization.categories,
      isShow: false,
      href: `/catalog/categories`,
    },
    {
      title: localization.aboutUs,
      isShow: false,
      href: `/about`,
    },
    {
      title: localization.contacts,
      isShow: false,
      href: `/contacts`,
    },
  ];
};
