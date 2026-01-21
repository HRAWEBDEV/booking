import { z } from 'zod';
import { ReserveHotelDictionary } from '@/internalization/app/dictionaries/website/hotel/reserve/dictionary';
import { isValidIranNationalCode } from '../../../utils/iranNationalCodeValidator';
import { isValidIranMobileNumber } from '../../../utils/mobileNumberValidator';

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
   nationalCode: z
    .string()
    .min(1, dic.reserveInfo.reserveForm.fillRequiredInfo)
    .refine(
     isValidIranNationalCode,
     dic.reserveInfo.reserveForm.invalidNationalCode,
    ),
   phoneNumber: z
    .string()
    .min(1, dic.reserveInfo.reserveForm.fillRequiredInfo)
    .refine(
     isValidIranMobileNumber,
     dic.reserveInfo.reserveForm.invalidMobileNumber,
    ),
   email: z.literal('').or(z.email()),
   guestInfo: z.array(
    z.object({
     saveAsReserveInfo: z.boolean(),
     firstName: z.string(),
     lastName: z.string(),
     nationalCode: z
      .string()
      .refine(
       isValidIranNationalCode,
       dic.reserveInfo.reserveForm.invalidNationalCode,
      ),
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
      message: dic.reserveInfo.reserveForm.fillRequiredInfo,
     });
    }
    if (!guest.lastName) {
     ctx.addIssue({
      code: 'custom',
      path: [`guestInfo[${i}].lastName`],
      message: dic.reserveInfo.reserveForm.fillRequiredInfo,
     });
    }
    if (!guest.nationalCode) {
     ctx.addIssue({
      code: 'custom',
      path: [`guestInfo[${i}].nationalCode`],
      message: dic.reserveInfo.reserveForm.fillRequiredInfo,
     });
    }
    if (!isValidIranNationalCode(guest.nationalCode)) {
     ctx.addIssue({
      code: 'custom',
      path: [`guestInfo[${i}].nationalCode`],
      message: dic.reserveInfo.reserveForm.invalidNationalCode,
     });
    }
   });
  });
}

type BookingInfoSchema = z.infer<ReturnType<typeof createBookingInfoSchema>>;
export { type BookingInfoSchema, defaultValues, createBookingInfoSchema };
