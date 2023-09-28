import React, {useState, useRef, useEffect}  from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import accesstoken from '../configData/accesstoken';

function Map() {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(11.002);
  const [lat, setLat] = useState(49.952);
  const [zoom, setZoom] = useState(9);

  useEffect(()=>{
    map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: zoom
    });
    map.current.addControl(new mapboxgl.NavigationControl());
   
  },[])



  return (
      <div ref={mapContainer} className="map-container" style={{height:"90%", position:"absolute", width:"100%"}}/>

  )
}

export default Map