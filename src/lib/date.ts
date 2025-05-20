export default function isValidDateString(dateString:string) {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}
