/** Format ISO YYYY-MM-DD like "16th July 2019". */
export function formatLessonDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day) return isoDate;

  const ordinal = (n: number) => {
    const mod100 = n % 100;
    if (mod100 >= 11 && mod100 <= 13) return `${n}th`;
    switch (n % 10) {
      case 1:
        return `${n}st`;
      case 2:
        return `${n}nd`;
      case 3:
        return `${n}rd`;
      default:
        return `${n}th`;
    }
  };

  const monthName = new Date(Date.UTC(year, month - 1, day)).toLocaleString(
    "en-GB",
    { month: "long", timeZone: "UTC" },
  );

  return `${ordinal(day)} ${monthName} ${year}`;
}
