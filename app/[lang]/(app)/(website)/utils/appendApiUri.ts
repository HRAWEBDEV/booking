export function appendApiUri(uri: string) {
 return `${process.env.NEXT_PUBLIC_API_URI}${uri}`;
}
