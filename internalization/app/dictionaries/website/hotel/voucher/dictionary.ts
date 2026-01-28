'server-only';
import { type Locale } from '@/internalization/app/localization';

type ReserveVoucherDictionary = typeof import('./fa.json');

const dictionaries: Record<Locale, () => Promise<ReserveVoucherDictionary>> = {
 fa: () => import('./fa.json').then((res) => res.default),
 en: () => import('./fa.json').then((res) => res.default),
};

function getReserveVoucherDictionary({ locale }: { locale: Locale }) {
 return dictionaries[locale]();
}

export type { ReserveVoucherDictionary };
export { getReserveVoucherDictionary };
