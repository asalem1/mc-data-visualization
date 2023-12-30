import React from 'react';
import './App.css';
import {PageHeader} from './PageHeader';
import {DashboardContextProvider} from './context/dashboard';

function App() {
  return (
    <DashboardContextProvider>
      <div className="app__wrapper">
        <PageHeader />
      </div>
    </DashboardContextProvider>
  );
}

export default App;
