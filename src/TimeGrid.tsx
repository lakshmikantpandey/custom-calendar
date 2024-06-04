import React from 'react';

interface TimeGridProps {
  resources: { name: string }[];
  onCellClick: (time: string, resource: string) => void;
}

const TimeGrid: React.FC<TimeGridProps> = ({ resources, onCellClick }) => {
  const times = Array.from({ length: 48 }, (_, i) => {
    const hours = String(Math.floor(i / 2)).padStart(2, '0');
    const minutes = i % 2 === 0 ? '00' : '30';
    return `${hours}:${minutes}`;
  });

  return (
    <div className="time-grid">
      <div className="header-row">
        <div className="time-column"></div>
        {resources.map(resource => (
          <div key={resource.name} className="resource-column">{resource.name}</div>
        ))}
      </div>
      {times.map(time => (
        <div key={time} className="time-row">
          <div className="time-cell">{time}</div>
          {resources.map(resource => (
            <div key={resource.name} className="event-cell" onClick={() => onCellClick(time, resource.name)}></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TimeGrid;
