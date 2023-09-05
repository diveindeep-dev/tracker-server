export const formattedToday = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const date = today.getDate();
  const formattedDate = date < 10 ? `0${date}` : date;
  const formatted = `${today.getFullYear()}-${formattedMonth}-${formattedDate}`;
  return formatted;
};
