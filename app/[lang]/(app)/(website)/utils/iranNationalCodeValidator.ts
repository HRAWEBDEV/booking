export function isValidIranNationalCode(code: string) {
 if (!/^\d{10}$/.test(code)) return false;
 // Reject repeated digits (e.g. 0000000000, 1111111111, etc.)
 if (/^(\d)\1{9}$/.test(code)) return false;

 const digits = code.split('').map(Number);
 const checkDigit = digits[9];

 let sum = 0;
 for (let i = 0; i < 9; i++) {
  sum += digits[i] * (10 - i);
 }

 const remainder = sum % 11;

 return (
  (remainder < 2 && checkDigit === remainder) ||
  (remainder >= 2 && checkDigit === 11 - remainder)
 );
}
