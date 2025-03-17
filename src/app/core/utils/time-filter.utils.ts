export function filterByTime(date: Date, filter: string): boolean {
  const today = new Date();
  switch (filter) {
    case 'year': {
      return date.getFullYear() === today.getFullYear();
    }
    case 'quarter': {
      const currentQuarter = Math.floor(today.getMonth() / 3);
      const transactionQuarter = Math.floor(date.getMonth() / 3);
      return (
        date.getFullYear() === today.getFullYear() &&
        transactionQuarter === currentQuarter
      );
    }
    case 'month': {
      return (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth()
      );
    }
    case 'week': {
      const diff = today.getTime() - date.getTime();
      return diff < 7 * 24 * 60 * 60 * 1000;
    }
    case 'day': {
      return (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
      );
    }
    default: {
      return false;
    }
  }
}
