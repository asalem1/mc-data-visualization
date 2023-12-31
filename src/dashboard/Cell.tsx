import React, {useCallback, useEffect, useRef, useState} from 'react';
import ApexCharts from 'apexcharts';
import {Button} from 'react-aria-components';
import type {Cell as CellType} from '../types/cell';
import {getClimateDataByCategory} from '../api/climate';
import {ChartType} from '../types/chart';
import {getOptionsByChartType} from '../utils/graph';
import './Cell.css';

type Props = {
  cell: CellType;
  handleDeleteClick: () => void;
};

const BAR_COLUMNS_PER_PAGE = 100;

export const Cell = ({cell, handleDeleteClick}: Props) => {
  const chartRef = useRef(null);

  const [cellData, setCellData] = useState({
    data: [] as number[],
    dates: [] as string[],
  });
  const [hasMountedGraph, setHasMountedGraph] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  // const [chartInstance, setChartInstance] = useState<ApexCharts | null>(null);

  const getCellData = useCallback(() => {
    const response = getClimateDataByCategory(cell);
    setCellData(response);
  }, [cell]);

  useEffect(() => {
    getCellData();
  }, [cell.id]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const triggerMountOnEvent = () => {
    setHasMountedGraph(true);
  };

  useEffect(() => {
    let options: any = {};
    if (cell.chartType === ChartType.LINE) {
      options = getOptionsByChartType(
        cell,
        cellData.data,
        cellData.dates,
        triggerMountOnEvent
      );
    }
    if (cell.chartType === ChartType.BAR) {
      const startIndex = (currentPage - 1) * BAR_COLUMNS_PER_PAGE;
      const endIndex = startIndex + BAR_COLUMNS_PER_PAGE;
      const data = cellData.data.slice(startIndex, endIndex);
      const dates = cellData.dates.slice(startIndex, endIndex);
      options = getOptionsByChartType(cell, data, dates, triggerMountOnEvent);
    }

    // if (chartInstance && hasMountedGraph) {
    //   // @ts-ignore
    //   // chartInstance.updateOptions(options);
    // } else {
    const chart = new ApexCharts(chartRef.current, options);
    if (chart && cellData.data.length) {
      chart.render();
      // setChartInstance(chart);
    }
  }, [
    cellData,
    cell,
    cell.chartType,
    currentPage,
    hasMountedGraph,
    // chartInstance,
  ]);

  return (
    <div className="dashboard-cell__wrapper">
      <div ref={chartRef} />
      <div className="dashboard-cell__actions">
        <Button className="open-dialog__button" onPress={handleDeleteClick}>
          &#128465;
        </Button>
        {cell.chartType === ChartType.BAR && (
          <div className="dashboard-cell__pagination-wrapper">
            <span style={{margin: '0 10px'}}>Page {currentPage}</span>
            <Button
              className="open-dialog__button"
              isDisabled={currentPage === 1}
              onPress={handlePrevPage}
            >
              &larr;
            </Button>
            <Button
              className="open-dialog__button"
              isDisabled={
                currentPage * BAR_COLUMNS_PER_PAGE >= cellData.data.length
              }
              onPress={handleNextPage}
            >
              &rarr;
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
