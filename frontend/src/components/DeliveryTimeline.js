import React from 'react';
import '../styles/DeliveryTimeline.css';

function DeliveryTimeline({ status }) {
  const stages = ['Placed', 'Processing', 'Shipped', 'Delivered'];

  return (
    <div className="timeline">
      {stages.map((stage, index) => (
        <div key={index} className={`timeline-step ${stages.indexOf(status) >= index ? 'active' : ''}`}>
          <div className="circle">{index + 1}</div>
          <p>{stage}</p>
        </div>
      ))}
    </div>
  );
}

export default DeliveryTimeline;
