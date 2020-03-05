// !
export const dateToFormatYYYYMMDD = (date) => {
  const year = String(date.getFullYear());
  let month = String(date.getMonth() + 1);
  let day = String(date.getDate());

  if(month.length === 1) month = '0' + month;
  if(day.length === 1) day = '0' + day;

  return `${year}-${month}-${day}`;
}

// !
export const dateIncrementDay = (date, countDay) => {
  let newDay = new Date(date.getFullYear(), 
                        date.getMonth(), 
                        date.getDate() + countDay - 1);

  return newDay;
}

// !
export const dateDecrementDay = (date, countDay) => {
  let newDay = new Date(date.getFullYear(), 
                        date.getMonth(), 
                        date.getDate() - countDay + 1);

  return newDay;
}
