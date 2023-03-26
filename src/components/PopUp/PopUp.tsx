import React, { ReactChildren, ReactChild } from 'react';
import ReactDOM from 'react-dom';
import './PopUp.scss';

type PopUpProps = {
  isVisible: boolean;
  onClose: () => void;
  children: ReactChild | ReactChildren;
};

export const PopUp = ({ isVisible, onClose, children }: PopUpProps): JSX.Element => {
  const onClick = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest('.popup-content')) onClose();
  };

  return ReactDOM.createPortal(
    <div className={`popup ${isVisible ? 'active' : ''}`} onClick={onClick} data-testid="popup">
      <div className="popup-body">
        <div className="popup-content">
          <div className="popup-close" onClick={onClose}></div>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('modal') as HTMLElement
  );
};
