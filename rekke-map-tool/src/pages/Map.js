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
import { LayerGroup, useMapEvent, useMapEvents } from 'react-leaflet';


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
  const [leftBound, setLeftBound] = useState(0);
  const [dragLeft, setDragLeft] = useState("50vw");
  var map;




  // const options = {
  //   pixelValuesToColorFn: (values) => {
  //     // transforming single value into an rgba color
  //     const nir = values[0];

  //     if (nir === 0) return;
  //     // console.log("nir:", nir);
  //     const r = (nir / 20000) * 255;
  //     const g = 0;
  //     const b = 0;
  //     return `rgba(${r},${g},${b}, 1)`;
  //   },
  //   resolution: 64,
  //   opacity: 1
  // };


  const handleSliderChange = (event) => {
    const sliderValue = parseFloat(event.target.value);
    const mapContainer = document.getElementById("map");
    const mapWidth = mapContainer.offsetWidth;
    const imageWidth = mapWidth * sliderValue;
    const maxLeftBound = mapWidth - imageWidth;
    const newLeftBound = maxLeftBound >= 0 ? maxLeftBound : 0;
    setLeftBound(newLeftBound);
  };

  const recalculateClip = () => {
    //recalculate the clipt of image overlay
    var leafletPane = document.querySelectorAll(".leaflet-map-pane")[0]
    var prognosisEl = document.querySelectorAll(".prognosis")[0]
    var currentEl = document.querySelectorAll(".current")[0]
    var imageStart = parseInt(leafletPane.style.transform.split("(")[1].split("px")[0]) + parseInt(prognosisEl.style.transform.split("(")[1].split("px")[0])
    var dragOverlay = document.querySelector("#drag-overlay")
    if (dragOverlay.style.left != "50vw") {
      if (dragOverlay.style.left.split("px")[0] > imageStart) {
        prognosisEl.style.cssText += `clip:rect(0px,${prognosisEl.style.width},${prognosisEl.style.height},${(window.innerWidth - (imageStart ^ 1)) - (window.innerWidth - dragOverlay.style.left.split("px")[0])}px);`;
        currentEl.style.cssText += `clip:rect(0px,${(window.innerWidth - (imageStart ^ 1)) - (window.innerWidth - dragOverlay.style.left.split("px")[0])}px,${currentEl.style.height},0px);`;
      }
    }
  }

  function MyComponent() {
    map = useMapEvents({
      load: () => recalculateClip(),
      zoom: () => recalculateClip(),
      move: () => recalculateClip()
    },
    );
    // add the image overlays to the map



    return null
  }




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://geo-services.geographie.uni-erlangen.de/api/rekke/getMeta?filename=sim_max_ndvi_ssp_2045-54_ssp1_relChange_vf.json");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        console.log(jsonData)
        setNorthEast(prev => [jsonData['north'] - 0.001, jsonData['east']])
        setSouthWest(prev => [jsonData['south'] - 0.001, jsonData['west']])
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();


  }, [])

  return (
    <>
      <div className="map-container">
        <div className="map-overlay">
          <div className="map-overlay-content">
            <h1>Rekke Map Tool</h1>
            <p>Drag the slider to compare the map with the prognosis</p>
          </div>
          {/* <div className="map-overlay-slider">
            <input type="range" min="0" max="1" step="0.01" defaultValue="0.5" onChange={handleSliderChange} />
          </div> */}

        </div>

        <div className="map" id="map">
          <MapContainer
            center={[49.8333, 11.2]}
            zoom={10}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
            whenCreated={(map) => {
              map.setMaxBounds(bounds);
              map.setMinZoom(map.getBoundsZoom(bounds));
            }}
            zoomControl={true}

          >
            <MyComponent />

            <TileLayer url="https://osm.rrze.fau.de/tiles/{z}/{x}/{y}.png" />

            <LayerGroup
              className="image-overlay"

            >

              <ImageOverlay
                className="prognosis"
                url={"https://geo-services.geographie.uni-erlangen.de/api/rekke/getPng?filename=sim_max_ndvi_ssp_2045-54_ssp1_relChange_vf.png"}
                bounds={bounds}
                opacity={0.9}
                zoomAnimation={false}
                maxZoom={5}
                onZoom={() => {
                  console.log(map.getZoom())
                }
                }

              />
              <ImageOverlay
                className="current"
                url={"https://geo-services.geographie.uni-erlangen.de/api/rekke/getPng?filename=sim_mean_ndvi_ssp_2085-94_ssp5_relChange_vf.png"}
                bounds={bounds}
                opacity={0.7}
                zoomAnimation={false}
                maxZoom={5}
                onZoom={() => {
                  console.log(map.getZoom())
                }
                }
              />
            </LayerGroup>

          </MapContainer>

        </div>

      </div>
      <div className='drag-overlay' id="drag-overlay" style={{ left: dragLeft }}
        onDragStart={() => document.querySelector("#drag-overlay").style.cssText += 'opacity:1'}
        onDragEnd={() => document.querySelector("#drag-overlay").style.cssText += 'opacity:0.5'}
        onDrag={(e) => {
          var leafletPane = document.querySelectorAll(".leaflet-map-pane")[0]
          var prognosisEl = document.querySelectorAll(".prognosis")[0]
          var currentEl = document.querySelectorAll(".current")[0]
          var imageStart = parseInt(leafletPane.style.transform.split("(")[1].split("px")[0]) + parseInt(prognosisEl.style.transform.split("(")[1].split("px")[0])
          var dragOverlay = document.querySelector("#drag-overlay")
          if (e.screenX > imageStart) {
            console.log(prognosisEl.style.height);
            prognosisEl.style.cssText += `clip:rect(0px,${prognosisEl.style.width},${prognosisEl.style.height},${(window.innerWidth - (imageStart ^ 1)) - (window.innerWidth - dragOverlay.style.left.split("px")[0])}px);`;
            // reset the clip of the current image on the right side
            currentEl.style.cssText += `clip:rect(0px,${(window.innerWidth - (imageStart ^ 1)) - (window.innerWidth - dragOverlay.style.left.split("px")[0])}px,${currentEl.style.height},0px);`;
          }
          if (e.screenX != 0) {
            setDragLeft(`${e.screenX}px`);
          }

        }}>

        <div className='drag-middle' />
      </div>
    </>

  )
}

export default MapView

