import z from 'zod';

const defaultValues: Partial<HotelDatePickerSchema> = {
 fromDate: null,
 toDate: null,
};

function createHotelDatePickerSchema() {
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
   },
  )
  .refine(
   ({ fromDate, toDate }) => {
    return fromDate?.getTime() !== toDate?.getTime();
   },
   {
    path: ['toDate'],
   },
  );
}

type HotelDatePickerSchema = z.infer<
 ReturnType<typeof createHotelDatePickerSchema>
>;

export type { HotelDatePickerSchema };
export { defaultValues, createHotelDatePickerSchema };
