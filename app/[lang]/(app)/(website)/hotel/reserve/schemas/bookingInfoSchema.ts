import { z } from 'zod';

const defaultValues: Partial<BookingInfoSchema> = {
 reserveFirstName: '',
 reserveLastName: '',
 reserveEmail: '',
 reserveNationalCode: '',
 reservePhoneNumber: '',
 guestInfo: [],
};

function createBookingInfoSchema() {
 return z.object({
  reserveFirstName: z.string().min(1),
  reserveLastName: z.string().min(1),
  reserveNationalCode: z.string().min(1),
  reservePhoneNumber: z.string().min(1),
  reserveEmail: z.literal('').or(z.email()),
  guestInfo: z.array(
   z.object({
    sameAsReserveInfo: z.boolean().default(false),
    hasHalfCheckin: z.boolean().default(false),
    hasHalfCheckout: z.boolean().default(false),
    guestFirstName: z.string(),
    guestLastName: z.string(),
    guestNationalCode: z.string(),
    guestType: z.enum(['normal', 'foreign']).default('normal'),
    gender: z.enum(['male', 'female']).default('male'),
   }),
  ),
 });
}

type BookingInfoSchema = z.infer<ReturnType<typeof createBookingInfoSchema>>;
export { type BookingInfoSchema, defaultValues, createBookingInfoSchema };
