import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { MapPin } from 'lucide-react';
import './StadiumMap.css';

const StadiumMap = () => {
  const { zones } = useSimulation();

  const getZoneClass = (zoneId) => {
    const zone = zones[zoneId];
    if (!zone) return '';
    return `stadium-zone zone-${zone.crowdLevel}`;
  };

  return (
    <div className="stadium-map-container">
      <div className="stadium-grid">
        
        {/* Gates Area */}
        <div className="gates-area">
          <div className={getZoneClass('gate-a')} title={`Gate A (Traffic: ${zones['gate-a']?.baseTraffic})`}>
            <span>Gate A</span>
            <MapPin size={16} />
          </div>
          <div className={getZoneClass('gate-b')} title={`Gate B (Traffic: ${zones['gate-b']?.baseTraffic})`}>
            <span>Gate B</span>
            <MapPin size={16} />
          </div>
          <div className={getZoneClass('gate-c')} title={`Gate C (Traffic: ${zones['gate-c']?.baseTraffic})`}>
            <span>Gate C</span>
            <MapPin size={16} />
          </div>
        </div>

        {/* Facilities Area */}
        <div className="facilities-area">
          <div className="facility-col">
            <div className={getZoneClass('food-1')} title={`Food Court 1 (Traffic: ${zones['food-1']?.baseTraffic})`}>
              <span>Food Court 1</span>
            </div>
            <div className={getZoneClass('restroom-1')} title={`Restrooms North (Traffic: ${zones['restroom-1']?.baseTraffic})`}>
              <span>Restrooms (N)</span>
            </div>
          </div>
          
          <div className="pitch-area">
            <div className="pitch">
              <div className="pitch-center"></div>
              <div className="pitch-box left"></div>
              <div className="pitch-box right"></div>
            </div>
          </div>

          <div className="facility-col">
            <div className={getZoneClass('food-2')} title={`Food Court 2 (Traffic: ${zones['food-2']?.baseTraffic})`}>
              <span>Food Court 2</span>
            </div>
            <div className={getZoneClass('restroom-2')} title={`Restrooms South (Traffic: ${zones['restroom-2']?.baseTraffic})`}>
              <span>Restrooms (S)</span>
            </div>
          </div>
        </div>

        {/* Seating Area */}
        <div className="seating-area">
          <div className={getZoneClass('block-a')} title={`Block A (Traffic: ${zones['block-a']?.baseTraffic})`}>
            <span>Block A</span>
          </div>
          <div className={getZoneClass('block-b')} title={`Block B (Traffic: ${zones['block-b']?.baseTraffic})`}>
            <span>Block B</span>
          </div>
          <div className={getZoneClass('block-c')} title={`Block C (Traffic: ${zones['block-c']?.baseTraffic})`}>
            <span>Block C</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StadiumMap;
