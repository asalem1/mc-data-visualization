import React, {ReactNode} from 'react';
import useLocalStorageState from 'use-local-storage-state';
import {Cell} from '../types/cell';

interface DashboardContextType {
  add: (cell: Cell) => void;
  cells: Cell[];
  remove: (cell: Cell) => void;
}

const DEFAULT_CONTEXT: DashboardContextType = {
  add: (_cell: Cell) => {},
  cells: [],
  remove: (_cell: Cell) => {},
};

export const DashboardContext =
  React.createContext<DashboardContextType>(DEFAULT_CONTEXT);

type DashboardContextProps = {
  children: ReactNode;
};

export const DashboardContextProvider: React.FunctionComponent<
  DashboardContextProps
> = ({children}: DashboardContextProps) => {
  const [cells, setCells] = useLocalStorageState('cells', {
    defaultValue: DEFAULT_CONTEXT.cells,
  });

  const add = (cell: Cell) => {
    setCells((currentCells) => [...currentCells, cell]);
  };

  const remove = (cell: Cell) => {
    const foundIndex = cells.findIndex((c) => c.id === cell.id);
    if (foundIndex !== -1) {
      cells.splice(foundIndex, 1);
    }
    setCells([...cells]);
  };

  return (
    <DashboardContext.Provider
      value={{
        add,
        cells,
        remove,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
