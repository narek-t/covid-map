import React from 'react';
import CheckBox from 'components/UI/CheckBox';

interface Props {
  globalDisplayMode: boolean;
  handleSetVisibleWorldStat: (checked: boolean) => void;
  handleSetVisibleCountryStats: (checked: boolean) => void;
  visibleWorldStat: boolean;
  visibleCountryStats: boolean;
}

const CheckBoxes = (props: Props) => {
  const {
    globalDisplayMode,
    handleSetVisibleWorldStat,
    handleSetVisibleCountryStats,
    visibleWorldStat,
    visibleCountryStats,
  } = props;
  return (
    <div className="timeseries__header-checkboxes">
      <CheckBox
        id="world"
        label={globalDisplayMode ? 'World Stats' : 'US Stats'}
        onChange={checked => handleSetVisibleWorldStat(checked)}
        checked={visibleWorldStat}
      />
      <CheckBox
        id="country"
        label="Stats by Subject"
        onChange={checked => handleSetVisibleCountryStats(checked)}
        checked={visibleCountryStats}
      />
    </div>
  );
};

export default CheckBoxes;
