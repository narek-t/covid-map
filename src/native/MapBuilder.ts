import L, { Map } from 'leaflet';
import _ from 'lodash';
import { getTotalCases, numberWithCommas, extractCases } from 'utils';

const MAP_DEFAULT_LAT = 39.3999;
const MAP_DEFAULT_LNG = -8.2245;

const MAP_DEFAULT_US_LAT = 40.50663314;
const MAP_DEFAULT_US_LNG = -98.94877182;

const MAP_DEFAULT_ZOOM = 3;
const MAP_DEFAULT_US_ZOOM = 4;
const MAP_MIN_ZOOM = 3;
const MAP_MAX_ZOOM = 7;
const MAP_MAX_ZOOM_US = 19;

const MARKER_CONFIG = {
  radius: 10,
  fill: true,
  color: 'rgba(227, 102, 67, .5)',
  weight: 10,
  fillColor: '#e36643',
  fillOpacity: 1,
  id: 'asd',
};

interface Config {
  containerNode: HTMLDivElement;
  data: TransformedData[] | null;
  globalDisplayMode: boolean;
}

class MapBuilder {
  private map: Map;

  private config: Config;

  // @ts-ignore
  private markers: L.CircleMarker<any>[];

  private layerGroup: L.LayerGroup<any>;

  constructor(config: Config) {
    this.config = config;
    const { containerNode, data, globalDisplayMode } = config;
    this.map = new L.Map(containerNode, {
      zoom: globalDisplayMode ? MAP_DEFAULT_ZOOM : MAP_DEFAULT_US_ZOOM,
      maxZoom: MAP_MAX_ZOOM,
      minZoom: MAP_MIN_ZOOM,
      center: {
        lat: globalDisplayMode ? MAP_DEFAULT_LAT : MAP_DEFAULT_US_LAT,
        lng: globalDisplayMode ? MAP_DEFAULT_LNG : MAP_DEFAULT_US_LNG,
      },
      worldCopyJump: true,
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    this.layerGroup = L.layerGroup().addTo(this.map);

    this.update(data, globalDisplayMode);
  }

  getPopup = (
    subject: TransformedData,
    totalConfirmed: number,
    diff: number,
  ) => L.popup()
    .setContent(
      `<div class="popup-country-name">${this.config.globalDisplayMode ? subject.name : subject.combinatedName}</div>
      ${!this.config.globalDisplayMode ? `<div class="data-item__stats-recovered">Population: ${numberWithCommas(Number(subject.population))}</div>` : ''}
      <div class="data-item__stats-confirmed">Confirmed: ${extractCases([totalConfirmed, diff])}</div>
      <div class="data-item__stats-deaths">Deaths: ${extractCases(getTotalCases(subject.timeSeries, 'deaths'))}</div>
      ${this.config.globalDisplayMode ? `<div class="data-item__stats-recovered">Recovered: ${extractCases(getTotalCases(subject.timeSeries, 'recovered'))}</div>` : ''}`,
    );

  createMarkers = (data: TransformedData[] | null) => {
    const markers = _.compact(_.map(data, subject => {
      const [totalConfirmed, diff] = getTotalCases(subject.timeSeries, 'confirmed');
      return totalConfirmed ? L.circleMarker(
        L.latLng(Number(subject.lat), Number(subject.lng)), {
          ...MARKER_CONFIG,
          className: subject.name,
        },
      ).bindPopup(this.getPopup(subject, totalConfirmed, diff)) : null;
    }));

    this.markers = markers;
    this.setMarkers(markers);
  };

  setMarkers = (markers: L.CircleMarker<any>[]) => {
    const { globalDisplayMode } = this.config;
    this.layerGroup.clearLayers();
    L.layerGroup(markers).addTo(this.layerGroup);
    const lat = globalDisplayMode ? MAP_DEFAULT_LAT : MAP_DEFAULT_US_LAT;
    const lng = globalDisplayMode ? MAP_DEFAULT_LNG : MAP_DEFAULT_US_LNG;
    const zoom = globalDisplayMode ? MAP_DEFAULT_ZOOM : MAP_DEFAULT_US_ZOOM;
    this.map.setView(new L.LatLng(lat, lng), zoom);
  };

  resize = () => this.map.invalidateSize();

  openPopup = (name: string) => {
    const circle = _.find(this.markers, marker => marker.options.className === name);
    if (circle) {
      circle.openPopup();
    }
  };

  update = (data: TransformedData[] | null, globalDisplayMode: boolean) => {
    this.config.globalDisplayMode = globalDisplayMode;
    this.map.setMaxZoom(globalDisplayMode ? MAP_MAX_ZOOM : MAP_MAX_ZOOM_US);
    this.createMarkers(data);
  };
}

export default MapBuilder;
