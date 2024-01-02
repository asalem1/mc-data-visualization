import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Button} from '@adobe/react-spectrum';
import {Button as AriaButton, Form} from 'react-aria-components';
import {Overlay} from '../components/overlay';
import type {ChangeEvent} from 'react';
import {Input} from '../components/input';
import {RadioGroup} from '../components/radio/RadioGroup';
import {RadioItem} from '../components/radio/RadioItem';
import {DashboardContext} from '../context/dashboard';
import {ChartType} from '../types/chart';
import {Cell} from '../types/cell';
import {v4 as uuidv4} from 'uuid';
import {Category} from '../types/category';
import {formatCategory} from '../utils/format';
import useClimateCategories from '../hooks/useClimateCategories';

export const AddCell = () => {
  const {add} = useContext(DashboardContext);
  const {categories} = useClimateCategories();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [chartType, setChartType] = useState(ChartType.LINE);
  const [cellName, setCellName] = useState('');

  const handleNameInput = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setCellName(value);
  };

  const resetState = () => {
    setIsOpen(false);
    setSelectedCategory(categories[0]);
    setCellName('');
    setChartType(ChartType.LINE);
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!selectedCategory) {
      throw new Error('You must select a category');
    }
    event.preventDefault();
    const cell: Cell = {
      category: selectedCategory,
      chartType,
      id: uuidv4(),
      name: cellName,
    };
    add(cell);
    resetState();
  };

  const handleClimateCategoryChange = useCallback((value: Category) => {
    setSelectedCategory(value);
  }, []);

  const handleSetChartType = (value: ChartType) => {
    setChartType(value);
  };

  useEffect(() => {
    if (categories.length > 0) {
      handleClimateCategoryChange(categories[0]);
    }
  }, [categories, handleClimateCategoryChange]);

  return (
    <>
      <Button variant="primary" onPress={() => setIsOpen(true)}>
        Create Cell
      </Button>
      <Overlay isOpen={isOpen}>
        <Overlay.Header>Create Cell</Overlay.Header>
        <Form onSubmit={handleOnSubmit}>
          <Overlay.Body>
            <Input
              autoFocus
              label="Cell name"
              onChange={handleNameInput}
              placeholder="Name this cell"
              value={cellName}
            />
            <RadioGroup
              label="Chart Types"
              isRequired
              value={chartType}
              onChange={handleSetChartType}
            >
              <RadioItem
                name="Line Chart"
                description="Zoomable Line Chart"
                value={ChartType.LINE}
              />
              <RadioItem
                name="Bar Chart"
                description="Zoomable, Paginated Bar Chart"
                value={ChartType.BAR}
              />
            </RadioGroup>
            <RadioGroup
              label="Climate Category"
              isRequired
              onChange={handleClimateCategoryChange}
              value={selectedCategory ?? ''}
            >
              {categories.map((category) => (
                <RadioItem
                  key={category}
                  name={formatCategory(category)}
                  description={`Data associated with the ${formatCategory(
                    category
                  )}`}
                  value={category}
                />
              ))}
            </RadioGroup>
          </Overlay.Body>
          <Overlay.Footer>
            <AriaButton
              className="dialog-button__action dialog-action__cancel-button"
              onPress={resetState}
            >
              Cancel
            </AriaButton>
            <AriaButton
              className="dialog-button__action dialog-action__create-button"
              type="submit"
              isDisabled={cellName === ''}
            >
              Create Cell
            </AriaButton>
          </Overlay.Footer>
        </Form>
      </Overlay>
    </>
  );
};
