'server-only';
import { type Locale } from '@/internalization/app/localization';

type FindHotelDictionary = typeof import('./fa.json');

const dictionaries: Record<Locale, () => Promise<FindHotelDictionary>> = {
 fa: () => import('./fa.json').then((res) => res.default),
 en: () => import('./en.json').then((res) => res.default),
};

function getFindHotelDictionary({ locale }: { locale: Locale }) {
 return dictionaries[locale]();
}

export type { FindHotelDictionary };
export { getFindHotelDictionary };
