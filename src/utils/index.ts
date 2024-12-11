// Filtering by month
export const getMonthlyData = (data: any) => {
  return data.map((item: any) => ({
    month: item.month,
    totalRegistrations: item.registrations.reduce((a: any, b: any) => a + b, 0),
  }));
};

// Helper function to map month names to numeric values
export const monthToIndex = (month: string) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months.indexOf(month);
};

export const getDailyData = (
  data: { month: string; registrations: number[] }[] | undefined,
  startDate: Date,
  endDate: Date
) => {
  const result: { date: string; registrations: number }[] = [];

  data?.forEach(({ month, registrations }) => {
    const monthIndex = monthToIndex(month);

    registrations.forEach((count, dayIndex) => {
      const currentDate = new Date(2024, monthIndex, dayIndex + 1); // Assuming 2024
      if (currentDate >= startDate && currentDate <= endDate) {
        result.push({
          date: `${month} ${dayIndex + 1}`,
          registrations: count,
        });
      }
    });
  });

  return result;
};
