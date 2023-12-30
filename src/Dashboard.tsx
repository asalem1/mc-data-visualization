import React, {FunctionComponent, useContext} from 'react';
import {DashboardContext} from './context/dashboard';

export const DashboardPage: FunctionComponent = (props) => {
  const {cells} = useContext(DashboardContext);
  // TODO: hook up the delete, and format the climate category

  return (
    <div className="dashboard-page__wrapper">
      {/* TODO: hook up the visualization cell */}
      {cells.map((cell) => (
        <React.Fragment key={cell.id}>{JSON.stringify(cell)}</React.Fragment>
      ))}
    </div>
  );
};
