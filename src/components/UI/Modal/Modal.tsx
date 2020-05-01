import React, { ReactChild } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import './Modal.scss';

interface Props {
  show: boolean;
  onClose: () => void;
  className?: string;
  children: ReactChild;
}

const element = document.getElementById('modal-hook') as HTMLDivElement;

const Modal = (props: Props) => {
  const { className, children, onClose } = props;
  const closeHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
  };
  const content = (
    <div
      className={classnames(
        'modal',
        className,
      )}
    >
      <div className="backdrop" onClick={e => closeHandler(e)} />
      <div className="modal__inner">
        <button className="modal-close" onClick={e => closeHandler(e)}>X</button>
        {children}
      </div>
    </div>
  );
  return ReactDOM.createPortal(content, element);
};

export default Modal;
