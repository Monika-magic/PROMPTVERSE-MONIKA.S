import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { AlertTriangle, Info } from 'lucide-react';
import './AlertsOverlay.css';

const AlertsOverlay = () => {
  const { alerts } = useSimulation();

  if (alerts.length === 0) return null;

  return (
    <div className="alerts-container">
      {alerts.map((alert, index) => (
        <div key={alert.id} className={`alert-toast alert-${alert.type} animate-slide-up`} style={{ animationDelay: `${index * 0.1}s` }}>
          {alert.type === 'danger' ? <AlertTriangle size={20} /> : <Info size={20} />}
          <span>{alert.message}</span>
        </div>
      ))}
    </div>
  );
};

export default AlertsOverlay;
