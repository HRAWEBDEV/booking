'server-only';
import { type Locale } from '@/internalization/app/localization';

type PreviewHotelDictionary = typeof import('./fa.json');

const dictionaries: Record<Locale, () => Promise<PreviewHotelDictionary>> = {
 fa: () => import('./fa.json').then((res) => res.default),
 en: () => import('./fa.json').then((res) => res.default),
};

function getPreviewHotelDictionary({ locale }: { locale: Locale }) {
 return dictionaries[locale]();
}

export type { PreviewHotelDictionary };
export { getPreviewHotelDictionary };
