import React, { useState, useRef, useEffect } from 'react';
import './Map.css'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import accesstoken from '../configData/accesstoken';
import GeoTIFF, { fromUrl, fromUrls, fromArrayBuffer, fromBlob } from 'geotiff';
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'
import { Marker, Popup, LatLngBounds } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ImageOverlay } from 'react-leaflet/ImageOverlay'
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import GeotiffLayer from './geoTiffLayer';


async function toHTMLImage(geoTiffDataRGB, width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;  // array of RGBA values


  // convert GeoTiff's RGB values to ImageData's RGBA values
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const srcIdx = 3 * i * width + 3 * j;
      const idx = 4 * i * width + 4 * j;
      data[idx] = geoTiffDataRGB[srcIdx];
      data[idx + 1] = geoTiffDataRGB[srcIdx + 1];
      data[idx + 2] = geoTiffDataRGB[srcIdx + 2];
      data[idx + 3] = 255;  // fully opaque
    }
  }
  ctx.putImageData(imageData, 0, 0);

  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      resolve(image);
    };
    image.onerror = reject;
    image.src = canvas.toDataURL();
  });
}

function MapView() {

  const [southWest, setSouthWest] = useState([49.5333, 9.9])
  const [northEast, setNorthEast] = useState([49.9333, 10.7])

  const bounds = new LatLngBounds(southWest, northEast);
  const [dragLeft, setDragLeft] = useState("50vw");
  var map;
  const geoTiffLayerRef = useRef();
  const image = useRef();

  


  const options = {
    pixelValuesToColorFn: (values) => {
      // transforming single value into an rgba color
      const nir = values[0];

      if (nir === 0) return;
      // console.log("nir:", nir);
      const r = (nir / 20000) * 255;
      const g = 0;
      const b = 0;
      return `rgba(${r},${g},${b}, 1)`;
    },
    resolution: 64,
    opacity: 1
  };

  // const tiffUrl = "https://geo-services.geographie.uni-erlangen.de/rekke/getTiff?filename=sim_max_ndvi_ssp_2045-54_ssp1_relChange_vf.tif"

  // async function loadGeoTiff(tif) {
  //   const tiff = await fromUrl(tif).then(
  //     (returnedTif)=>{
  //       image.current = returnedTif.getImage()

  //     }
  //   )
  // }

  function MyComponent() {
    map = useMap()
    console.log('map center:', map.getCenter())
    return null
  }

  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://geo-services.geographie.uni-erlangen.de/rekke/getMeta?filename=sim_max_ndvi_ssp_2045-54_ssp1_relChange_vf.json");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        console.log(jsonData)
        setNorthEast(prev=>[jsonData['north'], jsonData['east']])
        setSouthWest(prev=>[jsonData['south'], jsonData['west']])
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();


  }, [])

  return (
    <>
      

      <MDBBtn tag='a' color='secondary' className='m-1 back-button'>
        <MDBIcon fas icon='fa fa-arrow-left' />
      </MDBBtn>
      <MapContainer
        center={[49.8333, 10.5]}
        zoom={10}
        scrollWheelZoom={true}

      >
        <MyComponent/>

        <TileLayer url="https://osm.rrze.fau.de/tiles/{z}/{x}/{y}.png" />

        {/* <GeotiffLayer options={options} url={tiffUrl}/> */}
        <ImageOverlay
          url={"https://geo-services.geographie.uni-erlangen.de/rekke/getPng?filename=sim_max_ndvi_ssp_2045-54_ssp1_relChange_vf.png"}
          bounds={bounds}
          opacity={0.7}
          zIndex={10}


        />


      </MapContainer>
      <div className='drag-overlay' id="drag-overlay" style={{ left: dragLeft }}
        onDragStart={()=>document.querySelector("#drag-overlay").style.cssText+='opacity:1'}
        onDragEnd={()=>document.querySelector("#drag-overlay").style.cssText+='opacity:0.5'}
        onDrag={(e) => {
          var leafletPane = document.querySelectorAll(".leaflet-map-pane")[0]
          var prognosisEl = document.querySelectorAll(".leaflet-image-layer")[0]
          var imageStart = parseInt(leafletPane.style.transform.split("(")[1].split("px")[0]) +  parseInt(prognosisEl.style.transform.split("(")[1].split("px")[0])
          // console.log(`${paneStart}, ${imageVal}, ${imageStart}`)
          if (e.screenX >imageStart) {
            prognosisEl.style.cssText += `clip:rect(0px,${window.innerWidth}px,${window.innerHeight}px,${(window.innerWidth-(imageStart^1)) - (window.innerWidth - e.screenX)}px);`;
          }
          if(e.screenX!=0){
            setDragLeft(`${e.screenX}px`);

          }

        }}>
          <div className='drag-middle' />

      </div>





    </>

  )
}

export default MapView