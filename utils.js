export const formattedToday = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formatted = `${today.getFullYear()}-${formattedMonth}-${today.getDate()}`;

  return formatted;
};
