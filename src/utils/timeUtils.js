// Calcular diferença de tempo entre duas datas
export const calculateTimeDifference = (startDate, endDate) => {
  const diff = Math.abs(endDate - startDate);
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return {
    days: days,
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60,
    totalSeconds: seconds
  };
};

// Calcular anos, meses e dias de relacionamento
export const calculateRelationshipDuration = (startDateString) => {
  const startDate = new Date(startDateString + 'T00:00:00');
  const now = new Date();
  
  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  let days = now.getDate() - startDate.getDate();
  
  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  const totalDays = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
  
  return { years, months, days, totalDays };
};

// Data-alvo fixa: 01/01/2026 00:00:00
export const TARGET_DATE = new Date('2026-01-01T00:00:00');

// Verificar se já passou da virada
export const hasNewYearPassed = () => {
  return new Date() >= TARGET_DATE;
};
