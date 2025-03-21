export function getActualDateGroup(filter: string): string {
  const today = new Date();
  switch (filter) {
    case 'year': {
      return today.getFullYear().toString();
    }
    case 'quarter': {
      const currentQuarter = Math.floor(today.getMonth() / 3) + 1;
      return `le trimestre ${currentQuarter} de ${today.getFullYear()}`;
    }
    case 'month': {
      const month = today.toLocaleString('default', { month: 'long' });
      return `${month} ${today.getFullYear()}`;
    }
    case 'week': {
      const startOfYear = new Date(today.getFullYear(), 0, 1);
      const daysSinceStartOfYear = Math.floor(
        (today.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)
      );
      const currentWeek = Math.ceil((daysSinceStartOfYear + startOfYear.getDay() + 1) / 7);
      return `la semaine ${currentWeek} de ${today.getFullYear()}`;
    }
    case 'day': {
      return 'le ' + today.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
    default: {
      return '';
    }
  }
}
