const idMonth = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

export function idDate(date?: Date | null) {
  if (!date) return '';

  return `${date.getDate()} ${idMonth[date.getMonth()]} ${date.getFullYear()}`;
}
