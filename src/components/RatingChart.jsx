import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function RatingChart() {
  const watchlist = useSelector((state) => state.watchlist.items);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (watchlist.length > 0) {
      const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      watchlist.forEach(() => {
        const rating = Math.floor(Math.random() * 5) + 1;
        ratingCounts[rating]++;
      });

      setChartData({
        labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
        datasets: [{
          label: 'Movies',
          data: Object.values(ratingCounts),
          backgroundColor: 'rgba(239, 68, 68, 0.7)',
          borderRadius: 8,
        }],
      });
    }
  }, [watchlist]);

  if (!chartData) {
    return <div className="text-center py-12">Add movies to see rating analytics!</div>;
  }

  return (
    <div className="h-96">
      <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
}

export default RatingChart;
