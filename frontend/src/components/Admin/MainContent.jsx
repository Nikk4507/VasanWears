import React from 'react';
// Import Chart.js components
import { Bar, Pie } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement
} from 'chart.js';

// Register the required components for Chart.js
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement
);

// --- DUMMY DATA ---
const barChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Monthly Sales ($K)',
      data: [12, 19, 3, 5, 2, 3, 25],
      backgroundColor: 'rgba(99, 102, 241, 0.7)', // Indigo-500 equivalent
      borderColor: 'rgba(99, 102, 241, 1)',
      borderWidth: 1,
      borderRadius: 4, // Makes bars look modern
    },
  ],
};

const pieChartData = {
  labels: ['Electronics', 'Apparel', 'Home Goods', 'Books', 'Tools'],
  datasets: [
    {
      label: 'Sales Volume by Category',
      data: [300, 50, 100, 40, 120],
      backgroundColor: [
        'rgba(99, 102, 241, 0.8)', // Indigo
        'rgba(16, 185, 129, 0.8)', // Green
        'rgba(251, 191, 36, 0.8)', // Yellow
        'rgba(244, 63, 94, 0.8)', // Rose
        'rgba(34, 197, 94, 0.8)', // Emerald
      ],
      borderColor: '#ffffff',
      borderWidth: 2,
    },
  ],
};

// --- CHART COMPONENTS ---

const BarChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          borderDash: [5, 5],
          color: 'rgba(200, 200, 200, 0.2)',
        }
      },
      x: {
        grid: {
          display: false,
        }
      }
    }
  };

  return <Bar options={options} data={barChartData} />;
};

const PieChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right', // Move legend to the side
        labels: {
            usePointStyle: true,
        }
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed);
            }
            return label;
          }
        }
      }
    }
  };

  return <Pie data={pieChartData} options={options} />;
};

// --- MAIN LAYOUT COMPONENT ---

const ChartCard = ({ title, children }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-96 transition-shadow hover:shadow-2xl">
    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">{title}</h3>
    <div className="h-[calc(100%-48px)]">
        {children}
    </div>
  </div>
);

const MainContent = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-extrabold text-gray-900">👋 Welcome to your Dashboard</h2>
      <p className="text-gray-600">A quick overview of your key performance metrics.</p>

      {/* Key Metrics Grid (Beautiful Cards) */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Metric 1: Total Products */}
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-indigo-500 hover:shadow-lg transition-shadow">
          <p className="text-sm font-medium text-gray-500">Total Products</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">1,245</p>
        </div>
        {/* Metric 2: New Customers */}
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500 hover:shadow-lg transition-shadow">
          <p className="text-sm font-medium text-gray-500">New Customers</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">289</p>
        </div>
        {/* Metric 3: Revenue (MTD) */}
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500 hover:shadow-lg transition-shadow">
          <p className="text-sm font-medium text-gray-500">Revenue (MTD)</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">$45,000</p>
        </div>
        {/* Metric 4: Pending Orders */}
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500 hover:shadow-lg transition-shadow">
          <p className="text-sm font-medium text-gray-500">Pending Orders</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">12</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartCard title="Monthly Sales Performance (Bar Chart)">
            <BarChart />
          </ChartCard>
        </div>
        
        <div>
          <ChartCard title="Sales Volume by Category (Pie Chart)">
            <PieChart />
          </ChartCard>
        </div>
      </div>
    </div>
  );
};

export default MainContent;