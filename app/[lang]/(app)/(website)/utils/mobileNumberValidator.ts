const iranMobileNumberRegex = /^(?:\+98|0)9\d{9}$/;

function isValidIranMobileNumber(phone: string) {
 return iranMobileNumberRegex.test(phone);
}

export { iranMobileNumberRegex, isValidIranMobileNumber };
