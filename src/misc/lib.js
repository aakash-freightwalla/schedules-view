export function getCalender(minDate, weeks) {
  return Array.from({ length: 7 * weeks }, (_, i) => {
    let offset = minDate.clone().add(i, 'days');
    return {
      day: offset.day(),
      date: offset.date(),
      reference: offset
    };
  });
}
