import { z } from 'zod';
import { ReserveHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/reserve/dictionary';

const defaultValues: Partial<BookingInfoSchema> = {
 firstName: '',
 lastName: '',
 email: '',
 nationalCode: '',
 phoneNumber: '',
 guestInfo: [],
};

function createBookingInfoSchema({ dic }: { dic: ReserveHotelDictionary }) {
 return z
  .object({
   firstName: z.string().min(1),
   lastName: z.string().min(1),
   nationalCode: z.string().min(1),
   phoneNumber: z.string().min(1),
   email: z.literal('').or(z.email()),
   guestInfo: z.array(
    z.object({
     saveAsReserveInfo: z.boolean(),
     firstName: z.string(),
     lastName: z.string(),
     nationalCode: z.string(),
     hasEarlyCheckin: z.boolean(),
     hasLateCheckout: z.boolean(),
     type: z.enum(['inner', 'foreign']),
     gender: z.enum(['male', 'female']),
     removed: z.boolean(),
    }),
   ),
  })
  .superRefine(({ guestInfo }, ctx) => {
   guestInfo.forEach((guest, i) => {
    if (guest.saveAsReserveInfo || guest.removed) return;
    if (!guest.firstName) {
     ctx.addIssue({
      code: 'custom',
      path: [`guestInfo[${i}].firstName`],
     });
    }
    if (!guest.lastName) {
     ctx.addIssue({
      code: 'custom',
      path: [`guestInfo[${i}].lastName`],
     });
    }
    if (!guest.nationalCode) {
     ctx.addIssue({
      code: 'custom',
      path: [`guestInfo[${i}].nationalCode`],
     });
    }
   });
  });
}

type BookingInfoSchema = z.infer<ReturnType<typeof createBookingInfoSchema>>;
export { type BookingInfoSchema, defaultValues, createBookingInfoSchema };
