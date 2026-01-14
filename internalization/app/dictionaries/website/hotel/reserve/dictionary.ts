'server-only';
import { type Locale } from '@/internalization/app/localization';

type ReserveHotelDictionary = typeof import('./fa.json');

const dictionaries: Record<Locale, () => Promise<ReserveHotelDictionary>> = {
 fa: () => import('./fa.json').then((res) => res.default),
 en: () => import('./fa.json').then((res) => res.default),
};

function getReserveHotelDictionary({ locale }: { locale: Locale }) {
 return dictionaries[locale]();
}

export type { ReserveHotelDictionary };
export { getReserveHotelDictionary };
