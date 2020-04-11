import React from 'react';
import classnames from 'classnames';
import ToggleButton from 'components/UI/ToggleButton';
import DataList from 'components/DataList';
import './Sidebar.scss';

interface Props {
  opened: boolean;
  toggleSidebar: () => void;
  data: TransformedData[] | null;
  globalDisplayMode: boolean;
  setSelectedSubject: (subject: TransformedData) => void;
}

const Sidebar = (props: Props) => {
  const {
    opened,
    toggleSidebar,
    globalDisplayMode,
    setSelectedSubject,
    data,
  } = props;
  return (
    <div
      className={classnames(
        'sidebar',
        { opened },
      )}
    >
      <ToggleButton opened={opened} toggleSidebar={toggleSidebar} />
      <div className="sidebar__inner">
        <DataList
          data={data}
          globalDisplayMode={globalDisplayMode}
          setSelectedSubject={setSelectedSubject}
        />
      </div>
    </div>
  );
};

export default Sidebar;
