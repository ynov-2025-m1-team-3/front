import React from 'react';
import BarChartExample from '../components/charts/BarChartExample';
// import PieChartExample from '../components/charts/PieChartExample'; // si tu en as un

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Tableau de bord 📊</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-xl font-semibold mb-2">Bar Chart</h2>
          <BarChartExample />
        </div>

        {/* <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-xl font-semibold mb-2">Pie Chart</h2>
          <PieChartExample />
        </div> */}
      </div>
    </div>
  );
}
