/* Чистые функции работы с датой. */

// сегодняшняя дата в формате input[type="date"] (гггг-мм-дд)
export function todayIso(now: Date = new Date()): string {
  return (
    now.getFullYear() +
    "-" +
    ("0" + (now.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + now.getDate()).slice(-2)
  );
}

// перевод даты из гггг-мм-дд в дд.мм.гггг
export function formatDate(isoDate?: string | false): string {
  if (!isoDate) {
    return "";
  }

  const parts = isoDate.split("-");

  if (parts.length !== 3) {
    return isoDate;
  }

  return parts[2] + "." + parts[1] + "." + parts[0];
}
