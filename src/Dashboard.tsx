import React, {FunctionComponent, useContext} from 'react';
import {DashboardContext} from './context/dashboard';
import {Cell} from './components/Cell';

export const DashboardPage: FunctionComponent = (props) => {
  const {cells} = useContext(DashboardContext);
  // TODO: hook up the delete, and format the climate category

  return (
    <div className="dashboard-page__wrapper">
      {cells.map((cell) => (
        <Cell key={cell.id} cell={cell} />
      ))}
    </div>
  );
};
