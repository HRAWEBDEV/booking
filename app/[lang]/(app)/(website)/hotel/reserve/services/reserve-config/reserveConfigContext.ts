import { use, createContext } from 'react';
import { OutOfContext } from '@/utils/OutOfContext';

interface ReserveConfig {
 test: string;
}

const reserveConfigContext = createContext<ReserveConfig | null>(null);

function useReserveConfig() {
 const val = use(reserveConfigContext);
 if (!val) throw new OutOfContext('reserveConfigContext');
 return val;
}

export type { ReserveConfig };
export { reserveConfigContext, useReserveConfig };
