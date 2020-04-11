import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import MapBuilder from 'native/MapBuilder';

import './Map.scss';

const MAP_DEFAULT_LAT = 39.3999;
const MAP_DEFAULT_LNG = -8.2245;

const MAP_DEFAULT_US_LAT = 40.50663314;
const MAP_DEFAULT_US_LNG = -98.94877182;

const MAP_DEFAULT_ZOOM = 3;
const MAP_DEFAULT_US_ZOOM = 4;

interface Props {
  sidebarOpened: boolean;
  data: TransformedData[] | null;
  globalDisplayMode: boolean;
  selectedSubject: TransformedData | null;
}

interface State {
  center: {
    lat: number;
    lng: number;
  }
  zoom: number;
}

class CovidMap extends React.PureComponent<Props, State> {
  // @ts-ignore
  Map: MapBuilder;

  containerNode: React.RefObject<HTMLDivElement> = React.createRef();

  constructor(props: Props) {
    super(props);
    this.state = {
      center: {
        lat: props.globalDisplayMode ? MAP_DEFAULT_LAT : MAP_DEFAULT_US_LAT,
        lng: props.globalDisplayMode ? MAP_DEFAULT_LNG : MAP_DEFAULT_US_LNG,
      },
      zoom: props.globalDisplayMode ? MAP_DEFAULT_ZOOM : MAP_DEFAULT_US_ZOOM,
    };
  }

  componentDidMount() {
    const containerNode = this.containerNode.current;
    if (containerNode) {
      const { data, globalDisplayMode } = this.props;
      this.Map = new MapBuilder({
        containerNode,
        data,
        globalDisplayMode,
      });
    }
  }

  componentDidUpdate(prevProps: Props) {
    const {
      sidebarOpened,
      selectedSubject,
      globalDisplayMode,
      data,
    } = this.props;
    if (globalDisplayMode !== prevProps.globalDisplayMode) {
      this.Map.update(data, globalDisplayMode);
    }
    if (sidebarOpened !== prevProps.sidebarOpened) {
      this.Map.resize();
    }
    if (!_.isEqual(selectedSubject, prevProps.selectedSubject) && !_.isNil(selectedSubject)) {
      this.Map.openPopup(selectedSubject.name);
    }
  }


  render() {
    const { sidebarOpened, data } = this.props;
    if (!data) return null;

    return (
      <div
        className={classnames(
          'map',
          'leaflet-ccontainer',
          { 'sidebar-opened': sidebarOpened },
        )}
        ref={this.containerNode}
      />
    );
  }
}

export default CovidMap;
