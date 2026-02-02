function ConvertToLocalDate(date: string | undefined) {
 if (!date) return '';
 const utcDate = new Date(date).toLocaleDateString('fa-IR');
 return utcDate;
}

export { ConvertToLocalDate };
