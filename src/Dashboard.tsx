import React, {FunctionComponent, useContext} from 'react';
import {DashboardContext} from './context/dashboard';
import {Cell} from './components/Cell';
import './Dashboard.css';

export const DashboardPage: FunctionComponent = (props) => {
  const {cells} = useContext(DashboardContext);
  // TODO: hook up the delete, and format the climate category

  return (
    <div className="dashboard-page__wrapper">
      {cells.map((cell) => (
        <div key={cell.id} className="dashboard-cell__wrapper">
          <Cell cell={cell} />
        </div>
      ))}
    </div>
  );
};
