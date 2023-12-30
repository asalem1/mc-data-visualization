import React from 'react';
import './App.css';
import {DashboardPage} from './Dashboard';
import {PageHeader} from './PageHeader';
import {DashboardContextProvider} from './context/dashboard';

function App() {
  return (
    <DashboardContextProvider>
      <div className="app__wrapper">
        <PageHeader />
        <DashboardPage />
      </div>
    </DashboardContextProvider>
  );
}

export default App;
