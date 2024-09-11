export const monthInserter = (date: Date, quanty: number) => {
  const newDate = new Date(date);
  const dayOfMonth = newDate.getDate();

  newDate.setDate(1);
  newDate.setMonth(newDate.getMonth() + quanty);
  
  const daysInNewMonth = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate();
  newDate.setDate(Math.min(dayOfMonth, daysInNewMonth));
  
  return newDate;
};
