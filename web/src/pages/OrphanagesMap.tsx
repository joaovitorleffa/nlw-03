import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import api from '../services/api';

import 'leaflet/dist/leaflet.css';
import mapMarkerImg from '../images/map-marker.svg';
import '../styles/pages/orphanages-map.css';
import mapIcon from '../utils/mapIcon';

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

const OrphanagesMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  
  useEffect(() => {
    api
      .get('/orphanages')
      .then(res => {
        const orphanages = res.data;
        setOrphanages(orphanages);
      });
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy"/>
          <h2>Escolha um orfanatono mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>
        <footer>
          <strong>Torres</strong>
          <span>Rio Grande do Sul</span>
        </footer>
      </aside>
      <Map 
        center={[-29.3420576,-49.7499418]} 
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer 
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
        />
        {orphanages.map(orphanage => {
          return (
            <Marker
              key={orphanage.id}
              icon={mapIcon}
              position={[orphanage.latitude, orphanage.longitude]}
            >
              <Popup
                closeButton={false}
                minWidth={240}
                maxWidth={240}
                className="map-popup"
              >
                {orphanage.name}
                <Link to={`/orphanage/${orphanage.id}`}>
                  <FiArrowRight size="20" color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          )
        })}
      </Map>
      <Link to="/orphanage/create" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;