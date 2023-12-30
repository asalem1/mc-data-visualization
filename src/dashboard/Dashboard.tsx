import React, {FunctionComponent, useContext, useState} from 'react';
import {DashboardContext} from '../context/dashboard';
import {Button} from 'react-aria-components';
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
          <div key={cell.id} className="dashboard-cell__wrapper">
            <Cell cell={cell} />
            <Button
              className="open-dialog__button"
              onPress={() => setSelectedCell(cell)}
            >
              &#128465;
            </Button>
          </div>
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
