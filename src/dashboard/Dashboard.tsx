import React, {FunctionComponent, useContext, useState} from 'react';
import {DashboardContext} from '../context/dashboard';
import {Cell} from './Cell';
import type {Cell as CellType} from '../types/cell';
import {DeleteCellOverlay} from '../overlays/DeleteCell';
import './Dashboard.css';
import {EmptyDashboardCTA} from './EmptyDashboardCTA';

export const DashboardPage: FunctionComponent = () => {
  const {cells, remove} = useContext(DashboardContext);
  const [selectedCell, setSelectedCell] = useState<CellType | null>(null);

  const handleClose = () => {
    setSelectedCell(null);
  };

  const handleDelete = () => {
    if (selectedCell) {
      remove(selectedCell);
    }
    handleClose();
  };

  return (
    <div className="dashboard-page__wrapper">
      {cells.length ? (
        cells.map((cell) => (
          <Cell
            key={cell.id}
            cell={cell}
            handleDeleteClick={() => setSelectedCell(cell)}
          />
        ))
      ) : (
        <EmptyDashboardCTA />
      )}
      {selectedCell !== null && (
        <DeleteCellOverlay
          cell={selectedCell}
          handleClose={handleClose}
          handleDelete={handleDelete}
          isOpen={Boolean(selectedCell)}
        />
      )}
    </div>
  );
};
