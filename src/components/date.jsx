import { format, parseISO } from 'date-fns';
import { id } from "date-fns/locale";

export default function Date({ dateString, dateFormat }) {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString}>
      {format(date, dateFormat || "d	LLL, yyyy", { locale: id })}
    </time>
  );
}
