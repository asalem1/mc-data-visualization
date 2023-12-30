import {Dialog, Heading, Modal, ModalOverlay} from 'react-aria-components';
import React from 'react';
import type {ReactNode} from 'react';
import './overlay.css';

type OverlayProps = {
  isOpen: boolean;
  children: ReactNode | ReactNode[];
};

export function Overlay({children, isOpen}: OverlayProps) {
  return (
    <ModalOverlay
      isOpen={isOpen}
      className={({isEntering, isExiting}) => `
      modal-overlay__wrapper
      ${isEntering ? 'animate-in' : ''}
      ${isExiting ? 'animate-out' : ''}
    `}
    >
      <Modal
        className={({isEntering, isExiting}) => `
        modal-wrapper
        ${isEntering ? 'animate-in' : ''}
        ${isExiting ? 'animate-out' : ''}
      `}
      >
        <Dialog role="alertdialog" className="dialog__wrapper">
          {children}
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}

type HeaderProps = {
  children?: ReactNode;
};

Overlay.Header = ({children}: HeaderProps) => {
  return (
    <Heading slot="title" className="overlay__header-wrapper">
      {children}
    </Heading>
  );
};

type BodyProps = {
  children?: ReactNode;
};

Overlay.Body = ({children}: BodyProps) => {
  return <div className="overlay__body-wrapper">{children}</div>;
};

type FooterProps = {
  children?: ReactNode | ReactNode[];
};

Overlay.Footer = ({children}: FooterProps) => {
  return <div className="overlay-actions__button-wrapper">{children}</div>;
};
