export function isToday(string) {
    const date = new Date(string);
    const today = new Date();
  

    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }