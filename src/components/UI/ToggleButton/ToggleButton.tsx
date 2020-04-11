import React from 'react';
import { ReactComponent as ChevronLeft } from 'assets/chevron-left.svg';
import { ReactComponent as ChevronRight } from 'assets/chevron-right.svg';
import './ToggleButton.scss';

interface Props {
  opened: boolean;
  toggleSidebar: () => void;
}

const ToggleButton = (props: Props) => {
  const { opened, toggleSidebar } = props;
  return (
    <button
      className="toggle"
      aria-label="Toggle Sidebar"
      onClick={toggleSidebar}
    >
      {opened ? <ChevronLeft /> : <ChevronRight />}
    </button>
  );
};

export default ToggleButton;
