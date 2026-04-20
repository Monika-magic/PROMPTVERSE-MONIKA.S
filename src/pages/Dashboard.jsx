import React from 'react';
import StadiumMap from '../components/StadiumMap';
import SmartNavigation from '../components/SmartNavigation';
import WaitTimes from '../components/WaitTimes';
import AlertsOverlay from '../components/AlertsOverlay';
import AIAssistant from '../components/AIAssistant';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="container dashboard-layout">
      <AlertsOverlay />
      
      <div className="dashboard-main">
        <div className="glass-panel map-section animate-slide-up">
          <div className="section-header">
            <h2>Live Stadium Map</h2>
            <div className="legend">
              <span className="legend-item"><span className="status-dot low"></span> Low</span>
              <span className="legend-item"><span className="status-dot medium"></span> Medium</span>
              <span className="legend-item"><span className="status-dot high"></span> High</span>
            </div>
          </div>
          <StadiumMap />
        </div>
      </div>
      
      <div className="dashboard-sidebar">
        <div className="glass-panel sidebar-widget animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <SmartNavigation />
        </div>
        
        <div className="glass-panel sidebar-widget animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <WaitTimes />
        </div>
        
        <div className="glass-panel sidebar-widget animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <AIAssistant />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
