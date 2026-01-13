import z from 'zod';
import { type PreviewHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/preview-hotel/dictionary';

const defaultValues: Partial<HotelDatePickerSchema> = {
 fromDate: null,
 toDate: null,
};

function createHotelDatePickerSchema(dic: PreviewHotelDictionary) {
 return z
  .object({
   fromDate: z.date().nullable(),
   toDate: z.date().nullable(),
  })
  .refine(
   ({ fromDate, toDate }) => {
    return Boolean(fromDate && toDate);
   },
   {
    path: ['toDate'],
    message: dic.hotelDatePicker.selectReserveDate,
   },
  )
  .refine(
   ({ fromDate, toDate }) => {
    return fromDate?.getTime() !== toDate?.getTime();
   },
   {
    path: ['toDate'],
    message: dic.hotelDatePicker.selectReserveDate,
   },
  );
}

type HotelDatePickerSchema = z.infer<
 ReturnType<typeof createHotelDatePickerSchema>
>;

export type { HotelDatePickerSchema };
export { defaultValues, createHotelDatePickerSchema };
