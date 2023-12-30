import {Button} from 'react-aria-components';
import React, {FunctionComponent} from 'react';
import './DeleteCell.css';
import {Overlay} from '../components/overlay';
import {Cell} from '../types/cell';

type Props = {
  cell: Cell;
  isOpen: boolean;
  handleClose: () => void;
  handleDelete: () => void;
};

export const DeleteCellOverlay: FunctionComponent<Props> = ({
  cell,
  handleClose,
  handleDelete,
  isOpen,
}) => {
  return (
    <Overlay isOpen={isOpen}>
      <Overlay.Header>Delete Cell {cell.name}</Overlay.Header>
      <Overlay.Body>
        <p className="overlay-confirmation__text">
          Are you sure you want to delete "{cell.name}"? All contents will be
          permanently destroyed.
        </p>
      </Overlay.Body>
      <Overlay.Footer>
        <Button
          className="dialog-button__action dialog-action__cancel-button"
          onPress={handleClose}
        >
          Cancel
        </Button>
        <Button
          className="dialog-button__action dialog-action__confirm-button"
          onPress={handleDelete}
        >
          Delete
        </Button>
      </Overlay.Footer>
    </Overlay>
  );
};
