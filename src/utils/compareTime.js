export const compareDates = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  const options = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Jerusalem' };
  
  const formattedD1 = d1.toLocaleDateString('en-CA', options); // "YYYY-MM-DD"
  const formattedD2 = d2.toLocaleDateString('en-CA', options); // "YYYY-MM-DD"


  return formattedD1 === formattedD2;
};

export const isCurrentSmallerThanNextFetch = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  const options = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Jerusalem' };
  
  const formattedD1 = d1.toLocaleDateString('en-CA', options); 
  const formattedD2 = d2.toLocaleDateString('en-CA', options); 


  return formattedD1 < formattedD2;
}




export function formatDate(dateStr) {
  const date = new Date(dateStr);
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' };
  return date.toLocaleDateString('en-US', options);
}

export const isCurrentBiggerThanNextFetch = (currentDate, NextFetchDate) => {
  const d1 = new Date(currentDate);
  const d2 = new Date(NextFetchDate);

  const options = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Jerusalem' };
  
  const formattedD1 = d1.toLocaleDateString('en-CA', options); 
  const formattedD2 = d2.toLocaleDateString('en-CA', options); 


  return formattedD1 > formattedD2;
};

export const normalizeDate = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

export function getSundayOfWeek(dateString) {
  try {
    const date = new Date(dateString);
    const dayOfWeek = date.getDay(); 
    const daysToSunday = (7 - dayOfWeek) % 7; 
    const sundayDate = new Date(date.getTime() + daysToSunday * 24 * 60 * 60 * 1000); 
    return sundayDate.toISOString().split('T')[0] + 'T00:00:00.000Z';
  } catch (error) {
    return "Invalid date format";
  }
}