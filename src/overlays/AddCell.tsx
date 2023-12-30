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
import {getClimateCategories} from '../api/climate';
import {Category} from '../types/category';

export const AddCell = () => {
  const {add} = useContext(DashboardContext);
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [chartType, setChartType] = useState(ChartType.LINE);
  const [cellName, setCellName] = useState('');

  const handleNameInput = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setCellName(value);
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
    setCellName('');
    setIsOpen(false);
  };

  const handleClimateCategoryChange = (value: Category) => {
    setSelectedCategory(value);
  };

  const handleSetChartType = (value: ChartType) => {
    setChartType(value);
  };

  const getCategories = useCallback(() => {
    const climateCategories = getClimateCategories();
    setCategories(Array.from(climateCategories));
    handleClimateCategoryChange(climateCategories[0]);
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

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
                name="Heatmap"
                description="Coming Soon"
                isDisabled
                value={ChartType.HEATMAP}
              />
              <RadioItem
                name="Bar Chart"
                description="Coming Soon"
                isDisabled
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
                  name={category}
                  description={category}
                  value={category}
                />
              ))}
            </RadioGroup>
          </Overlay.Body>
          <Overlay.Footer>
            {/* TODO: style these buttons and invalidate on cancel */}
            <Button variant="secondary" onPress={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Create Cell
            </Button>
          </Overlay.Footer>
        </Form>
      </Overlay>
    </>
  );
};