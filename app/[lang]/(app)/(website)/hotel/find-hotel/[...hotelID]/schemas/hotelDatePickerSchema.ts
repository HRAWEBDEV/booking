import z from 'zod';

const defaultValues: Partial<HotelDatePickerSchema> = {
 fromDate: null,
 toDate: null,
};

function createHotelDatePickerSchema() {
 return z.object({
  fromDate: z.date().nullable(),
  toDate: z.date().nullable(),
 });
}

type HotelDatePickerSchema = z.infer<
 ReturnType<typeof createHotelDatePickerSchema>
>;

export type { HotelDatePickerSchema };
export { defaultValues, createHotelDatePickerSchema };
