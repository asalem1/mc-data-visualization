import React from 'react';
import './Dashboard';
import {AddCell} from '../overlays/AddCell';

export const EmptyDashboardCTA = () => {
  return (
    <div className="empty-dashboard__wrapper">
      <p>
        This dashboard is empty. It sure would look a lot cooler by adding some
        cells.
      </p>
      <AddCell />
    </div>
  );
};
