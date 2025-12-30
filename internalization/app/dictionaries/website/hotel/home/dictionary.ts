'server-only';
import { type Locale } from '@/internalization/app/localization';

type HotelHomePageDictionary = typeof import('./fa.json');

const dictionaries: Record<Locale, () => Promise<HotelHomePageDictionary>> = {
 fa: () => import('./fa.json').then((res) => res.default),
 en: () => import('./fa.json').then((res) => res.default),
};

function getHotelHomePageDictionary({ locale }: { locale: Locale }) {
 return dictionaries[locale]();
}

export type { HotelHomePageDictionary };
export { getHotelHomePageDictionary };
