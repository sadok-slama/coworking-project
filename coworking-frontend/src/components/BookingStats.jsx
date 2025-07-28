import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';
import { getBookingStats } from '../services/api';

export default function BookingStats() {
  const pieChartRef = useRef(null);
  const pieChartInstance = useRef(null);
  const [stats, setStats] = useState({
    dailyAverage: 0,
    monthlyTotal: 0,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const fetchDataAndRenderCharts = async () => {
      try {
        const response = await getBookingStats();
        const data = response.data;
        
        setStats({
          dailyAverage: data.dailyAverage,
          monthlyTotal: data.monthlyTotal,
          isLoading: false,
          error: null
        });
        
        // Vérifier que la référence existe et que les données sont valides
        if (pieChartRef.current && data.packNames && data.packCounts) {
          if (pieChartInstance.current) {
            pieChartInstance.current.destroy();
          }
          
          const ctx = pieChartRef.current.getContext('2d');
          
          pieChartInstance.current = new Chart(ctx, {
            type: 'doughnut',
            data: {
              labels: data.packNames,
              datasets: [{
                data: data.packCounts,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.7)',
                  'rgba(54, 162, 235, 0.7)',
                  'rgba(255, 206, 86, 0.7)',
                  'rgba(75, 192, 192, 0.7)',
                  'rgba(153, 102, 255, 0.7)',
                ],
                borderWidth: 1
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'right',
                },
                tooltip: {
                  callbacks: {
                    label: function(context) {
                      const label = context.label || '';
                      const value = context.raw || 0;
                      const total = context.dataset.data.reduce((a, b) => a + b, 0);
                      const percentage = Math.round((value / total) * 100);
                      return `${label}: ${value} (${percentage}%)`;
                    }
                  }
                }
              }
            }
          });
        }
      } catch (error) {
        console.error('Erreur stats réservations:', error);
        setStats({
          dailyAverage: 0,
          monthlyTotal: 0,
          isLoading: false,
          error: error.message || 'Erreur de chargement'
        });
      }
    };

    fetchDataAndRenderCharts();

    return () => {
      if (pieChartInstance.current) {
        pieChartInstance.current.destroy();
      }
    };
  }, []);

  if (stats.isLoading) {
    return <div className="text-center py-4">Chargement des statistiques...</div>;
  }

  if (stats.error) {
    return <div className="alert alert-danger">{stats.error}</div>;
  }

  return (
    <div className="row">
      <div className="col-md-6">
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">Statistiques des Réservations</h5>
            <div className="d-flex justify-content-between">
              <div>
                <p className="mb-1">Moyenne quotidienne:</p>
                <h3 className="text-primary">{stats.dailyAverage.toFixed(1)}</h3>
              </div>
              <div>
                <p className="mb-1">Total mensuel:</p>
                <h3 className="text-success">{stats.monthlyTotal}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div style={{ position: 'relative', height: '250px' }}>
          <canvas ref={pieChartRef}></canvas>
        </div>
      </div>
    </div>
  );
}