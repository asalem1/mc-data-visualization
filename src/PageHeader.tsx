import React from 'react';
import {Header} from 'react-aria-components';
import './PageHeader.css';
import {AddCell} from './overlays/AddCell';

export const PageHeader = () => {
  return (
    <Header className="page__header">
      <h1>Visualizations</h1>
      <AddCell />
    </Header>
  );
};
